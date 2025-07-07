const express = require("express");
const router = express.Router();
const serverStatusController = require("../controllers/serverStatusController");

router.get("/isServerActive", serverStatusController.isServerActive);

module.exports = router;
