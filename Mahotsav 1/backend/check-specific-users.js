require('dotenv').config();
const mongoose = require('mongoose');

const userIds = ['MH26000215', 'MH26000218', 'MH26000142', 'MH26000100'];

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME
    });

    const db = mongoose.connection.db;
    
    console.log('\n=== Checking specific users ===\n');
    
    for (const userId of userIds) {
      const participant = await db.collection('participants').findOne({ userId });
      
      if (participant) {
        console.log(`\n${userId}:`);
        console.log('Has registeredEvents:', participant.registeredEvents ? 'YES' : 'NO');
        if (participant.registeredEvents && participant.registeredEvents.length > 0) {
          console.log('Events:', participant.registeredEvents.map(e => e.eventName).join(', '));
        }
      } else {
        console.log(`\n${userId}: NOT FOUND in participants collection`);
      }
    }
    
    // Also check registrations collection
    console.log('\n\n=== Checking registrations collection ===\n');
    for (const userId of userIds) {
      const registration = await db.collection('registrations').findOne({ userId });
      
      if (registration) {
        console.log(`\n${userId}:`);
        console.log('User Type:', registration.userType);
        console.log('Participation Type:', registration.participationType);
        console.log('Payment Status:', registration.paymentStatus);
      }
    }
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkUsers();
