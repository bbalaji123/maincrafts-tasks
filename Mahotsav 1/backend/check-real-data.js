require('dotenv').config();
const mongoose = require('mongoose');

async function checkRealData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'events'
    });
    
    console.log('✅ Connected to MongoDB');
    
    const adminDb = mongoose.connection.db.admin();
    
    // List all databases
    const { databases } = await adminDb.listDatabases();
    console.log('\n=== Available Databases ===');
    databases.forEach(db => {
      console.log(`- ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });
    
    // Check each database for collections
    for (const dbInfo of databases) {
      if (dbInfo.name === 'admin' || dbInfo.name === 'config' || dbInfo.name === 'local') continue;
      
      console.log(`\n=== Checking database: ${dbInfo.name} ===`);
      const db = mongoose.connection.client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();
      
      for (const col of collections) {
        const count = await db.collection(col.name).countDocuments({});
        console.log(`  - ${col.name}: ${count} documents`);
        
        // If it has documents, show a sample
        if (count > 0 && count < 100) {
          const sample = await db.collection(col.name).findOne({});
          console.log(`    Sample: ${JSON.stringify(sample).substring(0, 200)}...`);
        }
      }
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkRealData();
