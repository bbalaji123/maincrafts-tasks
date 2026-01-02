require('dotenv').config();
const mongoose = require('mongoose');
const Registration = require('./models/Registration');

async function testAPI() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME
    });

    console.log('Connected to database:', process.env.DB_NAME);

    const query = {
      $or: [
        { paymentStatus: 'unpaid' },
        { paymentStatus: 'pending' },
        { paymentStatus: 'failed' }
      ]
    };

    const unpaidRegistrations = await Registration.find(query)
      .sort({ createdAt: -1 })
      .limit(10);

    console.log(`\nFound ${unpaidRegistrations.length} unpaid registrations\n`);

    // Now fetch events for these users
    const userIds = unpaidRegistrations.map(r => r.userId);
    const db = mongoose.connection.db;
    
    const participantsWithEvents = await db.collection('participants')
      .find({ 
        userId: { $in: userIds },
        registeredEvents: { $exists: true, $ne: [] }
      })
      .toArray();
    
    console.log(`Found ${participantsWithEvents.length} participants with events\n`);
    
    // Create map
    const participantEventsMap = {};
    participantsWithEvents.forEach(p => {
      if (p.registeredEvents && p.registeredEvents.length > 0) {
        participantEventsMap[p.userId] = p.registeredEvents.map(e => ({
          eventName: e.eventName,
          eventType: e.eventType,
          category: e.category,
          fee: e.fee
        }));
      }
    });

    // Display results
    console.log('=== First 5 participants with their events ===\n');
    for (let i = 0; i < Math.min(5, unpaidRegistrations.length); i++) {
      const reg = unpaidRegistrations[i];
      const events = participantEventsMap[reg.userId] || [];
      const eventNames = events.map(e => e.eventName);
      
      console.log(`${i + 1}. ${reg.name} (${reg.userId})`);
      console.log(`   Payment Status: ${reg.paymentStatus}`);
      console.log(`   User Type: ${reg.userType} / ${reg.participationType}`);
      console.log(`   Events (${events.length}):`, eventNames.length > 0 ? eventNames.join(', ') : 'NONE');
      console.log('');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testAPI();
