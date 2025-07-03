const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: Number, required: false },
    album: { type: String, required: true },
    artist: {
      type: String,
      required: false,
    },
    genre: { type: String, required: true },
    audioUrl: { type: String, required: true },
    coverImageUrl: { type: String, required: false },
    releaseDate: { type: Date, required: false, default: Date.now },
    artistName: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", trackSchema);
