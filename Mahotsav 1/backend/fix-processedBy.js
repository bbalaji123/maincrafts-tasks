require('dotenv').config();
const mongoose = require('mongoose');
const Registration = require('./models/Registration');

async function fixProcessedBy() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Balaji's user ID
    const balajiId = new mongoose.Types.ObjectId('6951fdb3843611df68b65896');

    // Update registrations with null processedBy
    const result = await Registration.updateMany(
      { paymentStatus: 'paid', processedBy: null },
      { $set: { processedBy: balajiId } }
    );

    console.log('Updated', result.modifiedCount, 'registrations to balaji');

    // Verify
    const paid = await Registration.find({ paymentStatus: 'paid', processedBy: balajiId }).select('name paidAmount paymentMethod');
    console.log('\nBalaji processed payments:');
    let total = 0;
    paid.forEach(r => {
      console.log('-', r.name, ':', r.paidAmount, r.paymentMethod);
      total += r.paidAmount || 0;
    });
    console.log('\nTotal amount:', total);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixProcessedBy();
