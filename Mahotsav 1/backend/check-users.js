require('dotenv').config();
const mongoose = require('mongoose');

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📋 Available collections:');
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // Check users collection
    const users = await db.collection('users').find({}).limit(5).toArray();
    console.log(`\n👥 Users collection: ${users.length} sample records`);
    
    if (users.length > 0) {
      console.log('\nSample user structure:');
      console.log(JSON.stringify(users[0], null, 2));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkUsers();
