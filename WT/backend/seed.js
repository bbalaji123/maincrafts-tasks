const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Course = require('./models/Course');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/elearn';

const sample = [
  { title: 'Intro to Algebra', subject: 'Mathematics', difficulty: 'Beginner', description: 'Basic algebra concepts and problem solving.', instructor: 'Dr. A. Kumar', duration: '4h', tags: ['algebra','math','foundations'], rating: 4.2, resources: [ { title: 'Algebra Basics (PDF)', url: 'https://example.com/algebra.pdf', type: 'pdf' } ] },
  { title: 'Calculus I', subject: 'Mathematics', difficulty: 'Intermediate', description: 'Limits, derivatives and integrals.', instructor: 'Prof. L. Zhang', duration: '6h', tags: ['calculus','math'], rating: 4.5, resources: [ { title: 'Calculus Lecture (Video)', url: 'https://example.com/calculus.mp4', type: 'video' } ] },
  { title: 'Introduction to Biology', subject: 'Science', difficulty: 'Beginner', description: 'Cell structure, DNA basics, and ecosystems.', instructor: 'Dr. S. Patel', duration: '3.5h', tags: ['biology','life-science'], rating: 4.1, resources: [ { title: 'Biology Notes', url: 'https://example.com/bio.pdf', type: 'pdf' } ] },
  { title: 'Data Structures', subject: 'Computer Science', difficulty: 'Intermediate', description: 'Arrays, lists, trees and basic algorithms.', instructor: 'Ms. E. Rivera', duration: '5h', tags: ['data-structures','algorithms'], rating: 4.6, resources: [ { title: 'DS Cheatsheet', url: 'https://example.com/ds.pdf', type: 'pdf' } ] },
  { title: 'Advanced Algorithms', subject: 'Computer Science', difficulty: 'Advanced', description: 'Graph algorithms, DP and optimizations.', instructor: 'Dr. M. Ochoa', duration: '8h', tags: ['algorithms','advanced'], rating: 4.7, resources: [ { title: 'Graphs (PDF)', url: 'https://example.com/graphs.pdf', type: 'pdf' } ] },
  { title: 'Physics — Mechanics', subject: 'Science', difficulty: 'Intermediate', description: 'Newtonian mechanics and kinematics.', instructor: 'Dr. R. Singh', duration: '5h', tags: ['physics','mechanics'], rating: 4.3, resources: [ { title: 'Mechanics Notes', url: 'https://example.com/mechanics.pdf', type: 'pdf' } ] },
  { title: 'Organic Chemistry Basics', subject: 'Science', difficulty: 'Intermediate', description: 'Fundamentals of organic molecules and reactions.', instructor: 'Prof. J. Lee', duration: '6h', tags: ['chemistry','organic'], rating: 4.0, resources: [ { title: 'Organic Chem Slides', url: 'https://example.com/organic.pdf', type: 'pdf' } ] },
  { title: 'Introduction to Psychology', subject: 'Humanities', difficulty: 'Beginner', description: 'Foundations of psychological science.', instructor: 'Dr. H. Gomez', duration: '3h', tags: ['psychology','behavior'], rating: 4.2, resources: [ { title: 'Psychology Intro (Video)', url: 'https://example.com/psych.mp4', type: 'video' } ] },
  { title: 'World History: Modern Era', subject: 'Humanities', difficulty: 'Intermediate', description: 'Key events from 1700 to present.', instructor: 'Prof. A. Novak', duration: '4.5h', tags: ['history','modern'], rating: 4.1, resources: [ { title: 'Timeline PDF', url: 'https://example.com/history.pdf', type: 'pdf' } ] },
  { title: 'English Composition', subject: 'Language', difficulty: 'Beginner', description: 'Essays, grammar and persuasive writing.', instructor: 'Ms. K. Osei', duration: '3h', tags: ['writing','composition'], rating: 4.0, resources: [ { title: 'Writing Guide', url: 'https://example.com/writing.pdf', type: 'pdf' } ] },
  { title: 'Spanish for Beginners', subject: 'Language', difficulty: 'Beginner', description: 'Basic Spanish vocabulary and conversation.', instructor: 'Mr. P. Alvarez', duration: '3.5h', tags: ['language','spanish'], rating: 4.4, resources: [ { title: 'Vocabulary List', url: 'https://example.com/spanish.pdf', type: 'pdf' } ] },
  { title: 'Intro to Databases', subject: 'Computer Science', difficulty: 'Beginner', description: 'Relational databases, SQL basics.', instructor: 'Dr. N. Shah', duration: '4h', tags: ['databases','sql'], rating: 4.3, resources: [ { title: 'SQL Exercises', url: 'https://example.com/sql.pdf', type: 'pdf' } ] },
  { title: 'Web Development: HTML & CSS', subject: 'Computer Science', difficulty: 'Beginner', description: 'Build modern responsive webpages.', instructor: 'Ms. L. Fernandez', duration: '3h', tags: ['web','html','css'], rating: 4.5, resources: [ { title: 'HTML/CSS Workshop', url: 'https://example.com/web.pdf', type: 'pdf' } ] },
  { title: 'React Fundamentals', subject: 'Computer Science', difficulty: 'Intermediate', description: 'Components, state, and hooks.', instructor: 'Mr. D. Kim', duration: '5h', tags: ['react','frontend'], rating: 4.6, resources: [ { title: 'React Cheatsheet', url: 'https://example.com/react.pdf', type: 'pdf' } ] },
  { title: 'Node.js & Express', subject: 'Computer Science', difficulty: 'Intermediate', description: 'Server-side JavaScript and REST APIs.', instructor: 'Dr. S. Banerjee', duration: '5h', tags: ['node','backend'], rating: 4.4, resources: [ { title: 'Node Workshop', url: 'https://example.com/node.pdf', type: 'pdf' } ] },
  { title: 'Linear Algebra', subject: 'Mathematics', difficulty: 'Advanced', description: 'Vectors, matrices, eigenvalues.', instructor: 'Prof. O. Mensah', duration: '7h', tags: ['linear-algebra','math'], rating: 4.5, resources: [ { title: 'Linear Algebra Notes', url: 'https://example.com/linear.pdf', type: 'pdf' } ] },
  { title: 'Statistics & Probability', subject: 'Mathematics', difficulty: 'Intermediate', description: 'Descriptive stats and probability theory.', instructor: 'Dr. Y. Ibrahim', duration: '5h', tags: ['statistics','probability'], rating: 4.3, resources: [ { title: 'Statistics Notes', url: 'https://example.com/stats.pdf', type: 'pdf' } ] },
  { title: 'Machine Learning Basics', subject: 'Computer Science', difficulty: 'Advanced', description: 'Intro to supervised and unsupervised learning.', instructor: 'Dr. A. Bose', duration: '8h', tags: ['ml','ai'], rating: 4.7, resources: [ { title: 'ML Overview', url: 'https://example.com/ml.pdf', type: 'pdf' } ] },
  { title: 'Digital Marketing', subject: 'Business', difficulty: 'Beginner', description: 'Basics of SEO, SEM, and social media marketing.', instructor: 'Ms. R. Chen', duration: '3h', tags: ['marketing','seo'], rating: 4.0, resources: [ { title: 'Marketing Guide', url: 'https://example.com/marketing.pdf', type: 'pdf' } ] },
  { title: 'Project Management', subject: 'Business', difficulty: 'Intermediate', description: 'Agile methodologies and scrum basics.', instructor: 'Mr. J. Carter', duration: '4h', tags: ['project-management','agile'], rating: 4.2, resources: [ { title: 'PM Template', url: 'https://example.com/pm.pdf', type: 'pdf' } ] }
];

mongoose.connect(MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(async ()=>{
    console.log('Connected to Mongo, seeding sample courses...');
    await Course.deleteMany({});
    const inserted = await Course.insertMany(sample);
    console.log('Inserted', inserted.length, 'courses');
    process.exit(0);
  })
  .catch(err=>{
    console.error(err); process.exit(1);
  });
