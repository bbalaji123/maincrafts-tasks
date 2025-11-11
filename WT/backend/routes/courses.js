const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Create course
router.post('/', async (req, res) => {
  try {
    const c = new Course(req.body);
    const saved = await c.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read list with optional filters: subject, difficulty, q (search)
router.get('/', async (req, res) => {
  try {
    const { subject, difficulty, q } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (difficulty) filter.difficulty = difficulty;
    if (q) filter.$or = [
      { title: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') }
    ];
    const courses = await Course.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const c = await Course.findById(req.params.id);
    if (!c) return res.status(404).json({ error: 'Not found' });
    res.json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update course
router.put('/:id', async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
