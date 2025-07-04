const User = require("../models/User");
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware'den gelir
    const { name, bio } = req.body;

    if (!name) {
      return res.status(400).json({ message: "İsim zorunludur." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          bio: bio || "",
        },
      },
      { new: true }
    ).select("-password -passwordHash");

    res.json({
      message: "Profil başarıyla güncellendi.",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};
