const Track = require("../models/Track");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const User = require("../models/User");
const redisClient = require("../services/redisClient");

exports.getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find({}).populate("artist", "name");
    const tracksWithArtistName = tracks.map((track) => {
      const t = track.toObject();
      t.artist = t.artist && t.artist.name ? t.artist.name : t.artist;
      return t;
    });

    res.status(200).json(tracksWithArtistName);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.searchTracks = async (req, res) => {
  try {
    const { q, genre } = req.query;
    if (!q && !genre) {
      return res
        .status(400)
        .json({ message: "Arama için q veya genre parametresi gerekli." });
    }

    let filter = {};
    if (q) filter.$or = [{ title: { $regex: q, $options: "i" } }];

    if (genre) filter.genre = { $regex: genre, $options: "i" };

    // Artist/Album arama
    let artistIds = [],
      albumIds = [];
    if (q) {
      artistIds = await Artist.find({
        name: { $regex: q, $options: "i" },
      }).select("_id");
      if (artistIds.length) filter.$or.push({ artist: { $in: artistIds } });

      albumIds = await Album.find({
        name: { $regex: q, $options: "i" },
      }).select("_id");
      if (albumIds.length) filter.$or.push({ album: { $in: albumIds } });
    }

    const tracks = await Track.find(filter)
      .populate("artist", "name")
      .populate("album", "name")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(tracks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// --- 2. Müzik Çalma ---
exports.playTrack = async (req, res) => {
  try {
    const trackId = req.params.id;
    const track = await Track.findById(trackId)
      .populate("artist", "name")
      .populate("album", "name");

    if (!track) {
      return res.status(404).json({ message: "Şarkı bulunamadı." });
    }

    return res.json({
      _id: track._id,
      title: track.title,
      artist: track.artist,
      album: track.album,
      duration: track.duration,
      genre: track.genre,
      audioUrl: track.audioUrl,
      coverImageUrl: track.coverImageUrl,
      releaseDate: track.releaseDate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// --- 3. Müzik Durdurma (Loglama için) ---
exports.pauseTrack = async (req, res) => {
  try {
    const trackId = req.params.id;
    const userId = req.user.id;
    const { currentTime } = req.body;
    console.log(`User ${userId} paused track ${trackId} at ${currentTime}s`);
    // Not: Gerçek uygulamada DB'ye yazabilirsin
    return res.json({ message: "Durdurma olayı kaydedildi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// --- 4. Müzik Beğenme ---
exports.likeTrack = async (req, res) => {
  try {
    const trackId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });

    const alreadyLiked = user.likedTracks.includes(trackId);

    if (alreadyLiked) {
      user.likedTracks.pull(trackId);
      await user.save();
      return res.json({
        liked: false,
        message: "Şarkı beğenmekten vazgeçildi.",
      });
    } else {
      user.likedTracks.push(trackId);
      await user.save();
      return res.json({ liked: true, message: "Şarkı beğenildi." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// --- 5. Müzik Değiştirme (Loglama için) ---
exports.changeTrack = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fromTrackId, toTrackId, previousTrackElapsed } = req.body;
    console.log(
      `User ${userId} switched from ${fromTrackId} to ${toTrackId} after ${previousTrackElapsed}s`
    );
    res.json({ message: "Müzik değiştirme kaydedildi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.getLikedTracks = async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `liked_tracks:${userId}`;

    // Önce Redis’te var mı diye bak
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      // Varsa, direkt cache’den dön
      return res.json(JSON.parse(cached));
    }

    // Yoksa, DB’den al ve cache’e yaz
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });

    const likedTracks = await Track.find({ _id: { $in: user.likedTracks } })
      .populate("artist", "name")
      .populate("album", "name")
      .sort({ createdAt: -1 });

    // Cache’e kaydet (örnek: 1 saat süreli)
    await redisClient.set(cacheKey, JSON.stringify(likedTracks), {
      EX: 3600, // 1 saat (3600 sn)
    });

    res.json(likedTracks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// exports.getLikedTracks = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const user = await User.findById(userId);
//     if (!user)
//       return res.status(404).json({ message: "Kullanıcı bulunamadı." });

//     const likedTracks = await Track.find({ _id: { $in: user.likedTracks } })
//       .populate("artist", "name")
//       .populate("album", "name")
//       .sort({ createdAt: -1 });

//     res.json(likedTracks);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Sunucu hatası" });
//   }
// };
