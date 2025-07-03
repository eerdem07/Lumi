const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const playlistSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);
