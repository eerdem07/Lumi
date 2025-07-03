const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "artist", "admin"],
      default: "user",
    },
    profilePictureUrl: {
      type: String,
      default:
        "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png",
    },
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    likedTracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
    bio: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
