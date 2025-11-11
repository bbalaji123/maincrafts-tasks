const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');

// create feedback (requires auth)
router.post('/', auth, async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    const userId = req.user && req.user.id;
    if (!courseId || !rating) return res.status(400).json({ error: 'Missing fields' });
    const f = new Feedback({ userId, courseId, rating, comment });
    const saved = await f.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// list feedback for a course
router.get('/', async (req, res) => {
  try {
    const { courseId } = req.query;
    const filter = {};
    if (courseId) filter.courseId = courseId;
    const items = await Feedback.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
