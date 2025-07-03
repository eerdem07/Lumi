const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role, profilePictureUrl } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return next(new AppError(400, "e-posta zaten kayıtlı."));

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      passwordHash: hashedPassword,
      role: role || "user",
      profilePictureUrl: profilePictureUrl || "",
    });
    ("");
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new AppError("Kullanıcı bulunamadı.", 400));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new AppError("Şifre yanlış.", 400));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePictureUrl: user.profilePictureUrl,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  return res.status(200).json({ message: "Başarıyla çıkış yapıldı." });
};
