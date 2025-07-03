const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const auth = require("../middleware/auth"); // JWT auth middleware, senin kodunda olabilir

// 1. Müzik Arama
router.get("/search", trackController.searchTracks);

// 2. Müzik Çalma
router.get("/:id/play", trackController.playTrack);

// 3. Müzik Durdurma (log)
router.post("/:id/pause", auth, trackController.pauseTrack);

// 4. Müzik Beğenme (like/unlike)
router.post("/:id/like", auth, trackController.likeTrack);

// 5. Müzik Değiştirme (log)
router.post("/change", auth, trackController.changeTrack);

router.get("/all", trackController.getAllTracks);

router.get("/liked", auth, trackController.getLikedTracks);

module.exports = router;
