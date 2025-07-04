const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const playlistController = require("../controllers/playlistController");

router.post("/", auth, playlistController.createPlaylist);

router.post("/:playlistId/tracks", auth, playlistController.addTrackToPlaylist);

router.delete(
  "/:playlistId/tracks/:trackId",
  auth,
  playlistController.removeTrackFromPlaylist
);

router.delete("/:playlistId", auth, playlistController.deletePlaylist);

module.exports = router;
