require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');
const Coordinator = require('./models/Coordinator');
const fs = require('fs');
const path = require('path');

async function importEventsFromJSON() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Find a coordinator to assign to events
    let coordinator = await Coordinator.findOne();
    if (!coordinator) {
      console.log('⚠️  No coordinator found, creating default coordinator...');
      coordinator = await Coordinator.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        department: 'Administration',
        isActive: true
      });
      console.log('✅ Created default coordinator');
    }

    // Read the registration.json file from frontend/public
    const jsonPath = path.join(__dirname, '..', 'frontend', 'public', 'registration.json');
    const rawData = fs.readFileSync(jsonPath);
    const data = JSON.parse(rawData);

    // Delete existing events
    await Event.deleteMany({});
    console.log('🗑️  Cleared existing events');

    const eventsToCreate = [];
    let currentCategory = '';

    // Process Sports Events
    if (data.Sports && Array.isArray(data.Sports)) {
      console.log(`\n📋 Processing ${data.Sports.length} sports entries...`);
      
      data.Sports.forEach((item, index) => {
        if (!item || !item.Event) return;
        
        // Update category if present
        if (item.Category) {
          currentCategory = item.Category.replace(/\n/g, ' ').trim();
        }
        
        const eventName = item.Event.trim();
        if (eventName && eventName.length > 0) {
          eventsToCreate.push({
            title: eventName,
            description: `${currentCategory} - ${eventName}`,
            category: 'sports',
            eventDate: new Date('2026-02-15'),
            registrationStartDate: new Date('2026-01-05'),
            registrationEndDate: new Date('2026-02-10'),
            venue: 'Sports Complex',
            maxParticipants: 100,
            currentParticipants: 0,
            coordinatorId: coordinator._id,
            status: 'published',
            isActive: true
          });
        }
      });
    }

    // Reset category for Culturals
    currentCategory = '';

    // Process Cultural Events
    if (data.Culturals && Array.isArray(data.Culturals)) {
      console.log(`📋 Processing ${data.Culturals.length} cultural entries...`);
      
      data.Culturals.forEach((item, index) => {
        if (!item) return;
        
        // Skip header rows
        if (item.Column1 === 'S.No' || item['Prize money for Performing arts, Visual arts, Fashion'] === 'Event') {
          return;
        }
        
        // Update category if present
        if (item['5'] && item['5'] !== 'Category') {
          currentCategory = item['5'].trim();
        }
        
        // Get event name from the specific column
        const eventName = item['Prize money for Performing arts, Visual arts, Fashion'];
        
        if (eventName && typeof eventName === 'string' && eventName.length > 0 && 
            eventName !== 'Total cash prize estimate' && 
            eventName !== 'No of mementoes required') {
          
          eventsToCreate.push({
            title: eventName.trim(),
            description: `${currentCategory} - ${eventName.trim()}`,
            category: 'cultural',
            eventDate: new Date('2026-02-20'),
            registrationStartDate: new Date('2026-01-05'),
            registrationEndDate: new Date('2026-02-15'),
            venue: 'Main Auditorium',
            maxParticipants: 50,
            currentParticipants: 0,
            coordinatorId: coordinator._id,
            status: 'published',
            isActive: true
          });
        }
      });
    }

    console.log(`\n📊 Total events to create: ${eventsToCreate.length}`);
    
    if (eventsToCreate.length === 0) {
      console.log('⚠️  No events found to import');
      process.exit(0);
    }

    // Insert all events
    const createdEvents = await Event.insertMany(eventsToCreate);
    console.log(`✅ Successfully created ${createdEvents.length} events`);
    
    // Show summary
    const sportsCount = createdEvents.filter(e => e.category === 'sports').length;
    const culturalCount = createdEvents.filter(e => e.category === 'cultural').length;
    
    console.log('\n📊 Event Summary:');
    console.log(`   🏃 Sports Events: ${sportsCount}`);
    console.log(`   🎭 Cultural Events: ${culturalCount}`);
    console.log(`   📅 Total Events: ${createdEvents.length}`);
    
    // Show some sample events
    console.log('\n📝 Sample Sports Events:');
    createdEvents
      .filter(e => e.category === 'sports')
      .slice(0, 5)
      .forEach(e => console.log(`   - ${e.title}`));
    
    console.log('\n📝 Sample Cultural Events:');
    createdEvents
      .filter(e => e.category === 'cultural')
      .slice(0, 5)
      .forEach(e => console.log(`   - ${e.title}`));
    
    console.log('\n✨ Database import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing events:', error);
    process.exit(1);
  }
}

importEventsFromJSON();
