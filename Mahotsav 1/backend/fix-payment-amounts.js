const mongoose = require('mongoose');
const Registration = require('./models/Registration');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mahotsavvignan2025_db_user:mYzQ87sgJ3vKbh0L@events.nghtwjg.mongodb.net/?appName=Events';

async function fixPaymentAmounts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all registrations
    const registrations = await Registration.find({});
    console.log(`\n📊 Found ${registrations.length} registrations`);

    let updated = 0;
    for (const registration of registrations) {
      let correctAmount = 0;
      
      // Calculate correct amount based on userType and participationType
      if (registration.userType === 'visitor') {
        correctAmount = 200;
      } else if (registration.userType === 'participant') {
        if (registration.participationType === 'sports') {
          correctAmount = 350;
        } else if (registration.participationType === 'cultural') {
          correctAmount = 350;
        } else if (registration.participationType === 'both') {
          correctAmount = 350;
        }
      }

      // Only update if different
      if (registration.paymentAmount !== correctAmount) {
        registration.paymentAmount = correctAmount;
        await registration.save();
        updated++;
        console.log(`  ✓ Updated ${registration.userId || registration.registerId}: ${registration.userType} - ${registration.participationType} → ₹${correctAmount}`);
      }
    }

    console.log(`\n✅ Updated ${updated} registrations`);
    console.log(`✓ ${registrations.length - updated} registrations were already correct`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixPaymentAmounts();
