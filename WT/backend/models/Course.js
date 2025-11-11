const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ['pdf','video','link','doc'], default: 'link' }
}, { _id: false });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subject: { type: String, required: true, index: true },
  difficulty: { type: String, enum: ['Beginner','Intermediate','Advanced'], default: 'Beginner', index: true },
  description: { type: String },
  resources: { type: [ResourceSchema], default: [] },
  downloads: { type: Number, default: 0 },
  // new metadata fields
  instructor: { type: String, default: 'Staff' },
  duration: { type: String, default: '' }, // e.g. '3h 20m'
  tags: { type: [String], default: [] },
  rating: { type: Number, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
