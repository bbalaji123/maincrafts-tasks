require('dotenv').config();
const mongoose = require('mongoose');

async function inspectParticipants() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'events'
    });
    
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log('\n=== Available Collections ===');
    collections.forEach(c => console.log(c.name));
    
    // Get registrations to see what events people have registered for
    const registrations = await db.collection('registrations').find({}).limit(2).toArray();
    console.log('\n=== Sample Registrations ===');
    console.log(JSON.stringify(registrations, null, 2));
    
    // Check if there's an events field in registrations
    const regWithEvents = await db.collection('registrations').findOne({ 
      $or: [
        { events: { $exists: true } },
        { registeredEvents: { $exists: true } }
      ]
    });
    console.log('\n=== Registration with Events ===');
    console.log(JSON.stringify(regWithEvents, null, 2));
    
    await mongoose.connection.close();
    console.log('\nConnection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

inspectParticipants();
