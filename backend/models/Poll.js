const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 }
    }
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // optional duplicate vote protection
});

module.exports = mongoose.model("Poll", pollSchema);

