const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const auth = require("../middleware/auth");

router.get("/search", trackController.searchTracks);

router.get("/:id/play", trackController.playTrack);

router.post("/:id/pause", auth, trackController.pauseTrack);

router.post("/:id/like", auth, trackController.likeTrack);

router.post("/change", auth, trackController.changeTrack);

router.get("/all", trackController.getAllTracks);

router.get("/liked", auth, trackController.getLikedTracks);

module.exports = router;
