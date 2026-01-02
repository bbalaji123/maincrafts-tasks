require('dotenv').config();
const mongoose = require('mongoose');
const Registration = require('./models/Registration');

async function checkChitti() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME
    });

    // Find CHITTI in registrations
    const chittiReg = await Registration.findOne({ userId: 'MH26000224' });
    
    if (!chittiReg) {
      console.log('CHITTI not found in registrations');
      await mongoose.connection.close();
      return;
    }

    console.log('=== CHITTI Registration ===');
    console.log('Name:', chittiReg.name);
    console.log('UserId:', chittiReg.userId);
    console.log('Payment Status:', chittiReg.paymentStatus);
    console.log('User Type:', chittiReg.userType);
    console.log('Participation Type:', chittiReg.participationType);

    // Check participants collection
    const db = mongoose.connection.db;
    const chittiParticipant = await db.collection('participants').findOne({ userId: 'MH26000224' });
    
    if (chittiParticipant) {
      console.log('\n=== CHITTI in Participants Collection ===');
      console.log('Has registeredEvents:', chittiParticipant.registeredEvents ? 'YES' : 'NO');
      if (chittiParticipant.registeredEvents) {
        console.log('Events:', JSON.stringify(chittiParticipant.registeredEvents, null, 2));
      }
    } else {
      console.log('\n=== CHITTI NOT found in participants collection ===');
    }

    // Now simulate what the API returns
    const participantsWithEvents = await db.collection('participants')
      .find({ 
        userId: 'MH26000224',
        registeredEvents: { $exists: true, $ne: [] }
      })
      .toArray();
    
    const participantEventsMap = {};
    participantsWithEvents.forEach(p => {
      if (p.registeredEvents && p.registeredEvents.length > 0) {
        participantEventsMap[p.userId] = p.registeredEvents.map(e => ({
          eventName: e.eventName,
          eventType: e.eventType,
          category: e.category,
          fee: e.fee,
          registeredAt: e.registeredAt
        }));
      }
    });

    const registeredEvents = participantEventsMap['MH26000224'] || [];
    const eventNames = registeredEvents.map(e => e.eventName);

    console.log('\n=== What API Should Return ===');
    console.log('eventNames:', eventNames);
    console.log('registeredEvents:', JSON.stringify(registeredEvents, null, 2));

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkChitti();
