require('dotenv').config();
const mongoose = require('mongoose');

async function checkEventData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    
    // Check participants with registeredEvents
    const partsWithEvents = await db.collection('participants').find({ 
      registeredEvents: { $exists: true, $not: { $size: 0 } } 
    }).limit(3).toArray();
    console.log('\n📋 Participants with registeredEvents:', partsWithEvents.length);
    if (partsWithEvents.length > 0) {
      console.log('Sample:', JSON.stringify(partsWithEvents[0], null, 2));
    }
    
    // Check if there's any event-related data linking userId to events
    const allParticipants = await db.collection('participants').find({}).limit(5).toArray();
    console.log('\n📋 All participants sample:');
    allParticipants.forEach(p => {
      console.log(`  ${p.userId}: registeredEvents=${JSON.stringify(p.registeredEvents || [])}`);
    });
    
    // Check registrations for any event field
    const regs = await db.collection('registrations').find({}).limit(5).toArray();
    console.log('\n📋 Registrations - checking for event fields:');
    regs.forEach(r => {
      console.log(`  ${r.userId}: participationType=${r.participationType}, userType=${r.userType}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkEventData();
