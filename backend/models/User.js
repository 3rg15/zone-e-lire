const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String, // URL to avatar image
    default: "https://i.imgur.com/default-avatar.png",
  },
  bio: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
