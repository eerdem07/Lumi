const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const playlistController = require("../controllers/playlistController");

// Çalma listesi oluştur
router.post("/", auth, playlistController.createPlaylist);

// Çalma listesine müzik ekle
router.post("/:playlistId/tracks", auth, playlistController.addTrackToPlaylist);

// Çalma listesinden müzik sil
router.delete(
  "/:playlistId/tracks/:trackId",
  auth,
  playlistController.removeTrackFromPlaylist
);

// Çalma listesini sil
router.delete("/:playlistId", auth, playlistController.deletePlaylist);

module.exports = router;
