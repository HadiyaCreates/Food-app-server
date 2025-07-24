
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profileImage: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png",
  },
});

module.exports = mongoose.model("User", userSchema);
