const mongoose = require("mongoose");
const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    genre: { type: String, required: true },
    coverImageUrl: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);
