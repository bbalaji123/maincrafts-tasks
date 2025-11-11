const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'change_me_in_env';

// register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const u = new User({ name, email, passwordHash: hash });
    const saved = await u.save();
    const token = jwt.sign({ id: saved._id, email: saved.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: { id: saved._id, name: saved.name, email: saved.email }, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
    const u = await User.findOne({ email });
    if (!u) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, u.passwordHash || '');
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: u._id, email: u.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: u._id, name: u.name, email: u.email }, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// list users (admin use)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash').limit(200);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
