require('dotenv').config();
const mongoose = require('mongoose');

async function checkParticipantStructure() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test'
    });
    
    console.log('✅ Connected to test database');
    
    const db = mongoose.connection.db;
    
    // Get a sample participant with full details
    const participant = await db.collection('participants').findOne({});
    console.log('\n=== Sample Participant Document ===');
    console.log(JSON.stringify(participant, null, 2));
    
    // Get a sample registration
    const registration = await db.collection('registrations').findOne({});
    console.log('\n=== Sample Registration Document ===');
    console.log(JSON.stringify(registration, null, 2));
    
    await mongoose.connection.close();
    console.log('\n✅ Done');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkParticipantStructure();
