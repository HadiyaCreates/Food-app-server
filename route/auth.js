// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exist" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Signup successful", user: { name, email } });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  res.status(200).json({ user });
});

router.put("/profile-image/:id", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profileImage: imageUrl },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Profile image update failed" });
  }
});

// UPDATE USER PROFILE
router.put("/update", async (req, res) => {
  const { email, name, password, profileImage } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (password) user.password = password;
    if (profileImage) user.profileImage = profileImage;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;



