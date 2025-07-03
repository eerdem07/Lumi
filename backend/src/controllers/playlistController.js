const Playlist = require("../models/Playlist");
const User = require("../models/User");

// 1. Çalma Listesi Oluştur
exports.createPlaylist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, isPublic, tracks } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Başlık ve açıklama zorunlu." });
    }

    const playlist = await Playlist.create({
      title,
      description,
      userId,
      tracks: tracks || [],
      isPublic: isPublic ?? false,
    });

    // Kullanıcının playlists alanına ekle
    await User.findByIdAndUpdate(userId, {
      $push: { playlists: playlist._id },
    });

    res.status(201).json({
      message: "Çalma listesi başarıyla oluşturuldu.",
      playlist,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// 2. Çalma Listesine Müzik Ekle
exports.addTrackToPlaylist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { playlistId } = req.params;
    const { trackId } = req.body;

    if (!trackId) return res.status(400).json({ message: "Track ID gerekli." });

    const playlist = await Playlist.findOne({ _id: playlistId, userId });
    if (!playlist)
      return res
        .status(404)
        .json({ message: "Çalma listesi bulunamadı veya yetkisiz." });

    if (playlist.tracks.includes(trackId)) {
      return res
        .status(400)
        .json({ message: "Bu müzik zaten çalma listesinde var." });
    }

    playlist.tracks.push(trackId);
    await playlist.save();

    res.json({ message: "Müzik çalma listesine eklendi.", playlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// 3. Çalma Listesinden Müzik Sil
exports.removeTrackFromPlaylist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { playlistId, trackId } = req.params;

    const playlist = await Playlist.findOne({ _id: playlistId, userId });
    if (!playlist)
      return res
        .status(404)
        .json({ message: "Çalma listesi bulunamadı veya yetkisiz." });

    const trackIndex = playlist.tracks.indexOf(trackId);
    if (trackIndex === -1) {
      return res
        .status(404)
        .json({ message: "Müzik bu çalma listesinde yok." });
    }

    playlist.tracks.splice(trackIndex, 1);
    await playlist.save();

    res.json({ message: "Müzik çalma listesinden silindi.", playlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// 4. Çalma Listesi Sil
exports.deletePlaylist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { playlistId } = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist)
      return res.status(404).json({ message: "Çalma listesi bulunamadı." });

    if (playlist.userId.toString() !== userId && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Bu çalma listesini silmeye yetkiniz yok." });
    }

    await playlist.deleteOne();
    await User.findByIdAndUpdate(userId, { $pull: { playlists: playlistId } });

    res.json({ message: "Çalma listesi silindi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
