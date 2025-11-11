const express = require('express');
const router = express.Router();
const Download = require('../models/Download');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// Record a download (requires auth)
router.post('/', auth, async (req, res) => {
  try {
    const { courseId, resourceTitle, resourceUrl } = req.body;
    const userId = req.user && req.user.id;
    if (!courseId || !resourceTitle || !resourceUrl) return res.status(400).json({ error: 'Missing fields' });
    const d = new Download({ userId, courseId, resourceTitle, resourceUrl });
    const saved = await d.save();
    // increment course downloads
    await Course.findByIdAndUpdate(courseId, { $inc: { downloads: 1 } });
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// list downloads (admin)
router.get('/', auth, async (req, res) => {
  try {
    const items = await Download.find().sort({ timestamp: -1 }).limit(200);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
