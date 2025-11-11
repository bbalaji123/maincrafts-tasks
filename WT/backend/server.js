const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/elearn';

// Models
const User = require('./models/User');
const Course = require('./models/Course');
const Download = require('./models/Download');
const Feedback = require('./models/Feedback');

// Routes
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const downloadsRouter = require('./routes/downloads');
const feedbackRouter = require('./routes/feedback');

app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/downloads', downloadsRouter);
app.use('/api/feedback', feedbackRouter);

app.get('/', (req, res) => res.json({ status: 'ok', message: 'E-Learning API' }));

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });
