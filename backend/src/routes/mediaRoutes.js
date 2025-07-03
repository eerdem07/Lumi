const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorizeArtist = require("../middleware/authorizeArtist");
const upload = require("../utils/upload");
const trackFileController = require("../controllers/trackFileController");

router.get("/:trackId/file", trackFileController.getTrackFile);

// Yükleme
router.post(
  "/upload-audio",
  auth,
  authorizeArtist,
  upload.single("audioFile"),
  trackFileController.uploadTrackAudio
);

// Silme
router.delete(
  "/:trackId",
  auth,
  authorizeArtist,
  trackFileController.deleteTrack
);

module.exports = router;
