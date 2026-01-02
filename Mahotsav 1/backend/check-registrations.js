require('dotenv').config();
const mongoose = require('mongoose');

async function checkRegistrations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    
    // Check registrations collection - find unpaid ones
    const registrations = await db.collection('registrations').find({
      $or: [
        { paymentStatus: 'unpaid' },
        { paymentStatus: 'pending' }
      ]
    }).limit(5).toArray();
    
    console.log(`\n📋 Sample unpaid registrations: ${registrations.length}`);
    
    registrations.forEach((reg, index) => {
      console.log(`\n--- Registration ${index + 1} ---`);
      console.log('  userId:', reg.userId);
      console.log('  name:', reg.name);
      console.log('  college:', reg.college);
      console.log('  paymentStatus:', reg.paymentStatus);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkRegistrations();
