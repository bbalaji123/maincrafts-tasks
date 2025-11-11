const mongoose = require('mongoose');

const DownloadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  resourceTitle: { type: String, required: true },
  resourceUrl: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Download', DownloadSchema);
