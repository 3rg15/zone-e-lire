const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new poll
router.post("/", authMiddleware, async (req, res) => {
  try {
    const poll = new Poll({
      question: req.body.question,
      options: req.body.options,
      createdBy: req.userId
    });
    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Vote on a poll
router.post("/:id/vote", authMiddleware, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    // Optional duplicate vote protection
    if (poll.voters.includes(req.userId)) {
      return res.status(400).json({ error: "You have already voted on this poll" });
    }

    const optionIndex = req.body.optionIndex;
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: "Invalid option index" });
    }

    poll.options[optionIndex].votes += 1;
    poll.voters.push(req.userId);
    await poll.save();

    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all polls
router.get("/", async (req, res) => {
  const polls = await Poll.find().sort({ createdAt: -1 });
  res.json(polls);
});

// Get poll results
router.get("/:id/results", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    const results = {
      question: poll.question,
      options: poll.options.map(opt => ({
        text: opt.text,
        votes: opt.votes
      }))
    };

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


// Get a single poll by ID
router.get("/:id", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
