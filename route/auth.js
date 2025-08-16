// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const admin = require("../firebaseAdmin");
const router = express.Router();

// router.post("/signup", async (req, res) => {
//     const { name, email, password } = req.body;
    
//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: "Email already exist" });
//         const hashedPassword = await bcrypt.hash(password, 10);
//         // const newUser = new User({ name, email, password: hashedPassword,   profileImage: undefined });
// const defaultImage = "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png";
// const newUser = new User({
//   name,
//   email,
//   password: hashedPassword,
//   profileImage: defaultImage, // 👈 this is the fix
// });
//     // await newUser.save();
//     // res.status(201).json({ message: "Signup successful", user: { name, email } });
//     await newUser.save();
// res.status(201).json({ message: "Signup successful", user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// // router.post("/signup", async (req, res) => {
// //   const { name, email, password } = req.body;

// //   try {
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) return res.status(400).json({ message: "Email already exist" });

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // const defaultImage = "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png";
// //     // const newUser = new User({
// //     //   name,
// //     //   email,
// //     //   password: hashedPassword,
// //     //   profileImage: defaultImage,
// //     // });
// //     const defaultImage = "https://www.pngmart.com/files/23/Profile-PNG-Photo.png";
// // const newUser = new User({
// //   name,
// //   email,
// //   password: hashedPassword,
// //   profileImage: defaultImage, // <-- Always set this
// // });

// //     await newUser.save();
// //     // res.status(201).json({ message: "Signup successful", user: newUser });
// //     res.status(201).json({
// //   message: "Signup successful",
// //   user: {
// //     _id: newUser._id,
// //     name: newUser.name,
// //     email: newUser.email,
// //     profileImage: newUser.profileImage,
// //   },
// // });

// //   } catch (error) {
// //     res.status(500).json({ message: "Something went wrong" });
// //   }
// // });
// // SIGNUP ROUTE
// // backend/routes/auth.js
// router.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "Email already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const defaultImage = "https://www.pngmart.com/files/23/Profile-PNG-Photo.png";
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       profileImage: defaultImage,
//     });

//     const savedUser = await newUser.save();

//     res.status(201).json({
//       message: "Signup successful",
//       user: {
//         _id: savedUser._id|| "68611e091ca488db23e60422",
//         name: savedUser.name,
//         email: savedUser.email,
//         profileImage: savedUser.profileImage,
//       },
//     });
//   } catch (error) {
//     console.error("❌ Error during signup:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });
// backend/routes/auth.js
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultImage = "https://www.pngmart.com/files/23/Profile-PNG-Photo.png";
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileImage: defaultImage,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        profileImage: savedUser.profileImage,
      },
    });
  } catch (error) {
    console.error("❌ Error during signup:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// Google Login Route
router.post("/google-login", async (req, res) => {
  const { idToken } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);

    const { email, name, picture } = decoded;
    let user = await User.findOne({ email });

    if (!user) {
      // Create user if not exists
      user = new User({
        name,
        email,
        password: "", // No password for Google
        profileImage: picture || "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png",
      });
      await user.save();
    }

    res.status(200).json({
      message: "Google login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("❌ Google Login Error:", error);
    res.status(401).json({ message: "Unauthorized - Invalid ID token" });
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



