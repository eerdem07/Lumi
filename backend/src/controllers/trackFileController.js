const {
  uploadFile,
  deleteFile,
  getPublicUrl,
} = require("../services/gcsServices");
const Track = require("../models/Track");
const mm = require("music-metadata");
const User = require("../models/User");

const { downloadFile } = require("../services/gcsServices");

/**
 * @desc Track audio dosyasını stream olarak döner (GCS proxy)
 * @route GET /api/media/:trackId/file
 * @access Public veya Auth isteğe bağlı
 */
exports.getTrackFile = async (req, res) => {
  try {
    const { trackId } = req.params;
    const track = await Track.findById(trackId);
    if (!track) return res.status(404).json({ message: "Şarkı bulunamadı." });

    const filename = track.audioUrl.split("/").slice(-2).join("/");

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${track.title}.mp3"`
    );

    const readStream = downloadFile(filename);
    readStream.pipe(res);
    readStream.on("error", (err) => {
      console.error(err);
      res.status(500).json({ message: "Dosya indirilemedi." });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

/**
 * @desc Track audio dosyası yükle ve Track oluştur
 * @route POST /api/tracks/upload-audio
 * @access Artist & Admin
 */

exports.uploadTrackAudio = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Ses dosyası gerekli." });

    const { buffer, originalname, mimetype } = req.file;
    const destination = `tracks/${Date.now()}_${originalname}`;
    const audioUrl = await uploadFile(destination, buffer, mimetype);

    // duration hesapla
    const metadata = await mm.parseBuffer(buffer, mimetype);
    const duration = Math.round(metadata.format.duration);

    // Formdan gelen zorunlu alanlar
    const { title, album, genre, coverImageUrl } = req.body;
    if (!title || !album || !genre || !coverImageUrl) {
      return res.status(400).json({ message: "Zorunlu alanlar eksik." });
    }

    // Kullanıcı adını DB'den çek
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    // Track DB kaydı
    const newTrack = await Track.create({
      title,
      duration,
      album,
      artist: req.user.id, // ObjectId
      artistName: user.name, // Kullanıcının adı string
      genre,
      audioUrl,
      coverImageUrl,
    });

    res.status(201).json({
      message: "Şarkı başarıyla yüklendi.",
      track: newTrack,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || err });
  }
};

/**
 * @desc Track sil
 * @route DELETE /api/tracks/:trackId
 * @access Artist (sadece kendi şarkısı) & Admin (herkesi silebilir)
 */
exports.deleteTrack = async (req, res) => {
  try {
    const { trackId } = req.params;
    const user = req.user;

    const track = await Track.findById(trackId);
    if (!track) return res.status(404).json({ message: "Şarkı bulunamadı." });

    // Sadece kendi şarkısını silebilir (admin hepsini)
    if (user.role !== "admin" && String(track.artist) !== String(user.id)) {
      return res
        .status(403)
        .json({ message: "Bu şarkıyı silmeye yetkiniz yok." });
    }

    // GCS'den sil
    const filename = track.audioUrl.split("/").slice(-2).join("/"); // "tracks/..." kısmı
    await deleteFile(filename);

    // DB'den sil
    await Track.findByIdAndDelete(trackId);

    res.json({ message: "Şarkı ve dosya başarıyla silindi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Silme sırasında hata oluştu." });
  }
};
