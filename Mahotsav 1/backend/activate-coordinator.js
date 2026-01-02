const mongoose = require('mongoose');
const Coordinator = require('./models/Coordinator');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mahotsavvignan2025_db_user:mYzQ87sgJ3vKbh0L@events.nghtwjg.mongodb.net/?appName=Events';

async function activateCoordinator() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find and list all coordinators
    const coordinators = await Coordinator.find({});
    console.log('\n📋 Current coordinators:');
    coordinators.forEach(coord => {
      console.log(`  - ${coord.username} (${coord.email}) - Active: ${coord.isActive}`);
    });

    // Activate all coordinators (especially admin)
    const result = await Coordinator.updateMany(
      {},
      { $set: { isActive: true } }
    );

    console.log(`\n✅ Activated ${result.modifiedCount} coordinator(s)`);

    // Verify
    const updated = await Coordinator.find({});
    console.log('\n📋 Updated coordinators:');
    updated.forEach(coord => {
      console.log(`  - ${coord.username} (${coord.email}) - Active: ${coord.isActive}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

activateCoordinator();
