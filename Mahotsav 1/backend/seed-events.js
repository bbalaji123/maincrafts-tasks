require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');
const Coordinator = require('./models/Coordinator');

async function seedEvents() {
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

    // Delete existing events
    await Event.deleteMany({});
    console.log('🗑️  Cleared existing events');

    // Create sample events
    const sampleEvents = [
      // Sports Events
      {
        title: 'Cricket Tournament',
        description: 'Inter-college cricket tournament with exciting matches and prizes',
        category: 'sports',
        eventDate: new Date('2026-02-15'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-02-10'),
        venue: 'Cricket Ground',
        maxParticipants: 100,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      },
      {
        title: 'Football Championship',
        description: 'Competitive football championship for all college teams',
        category: 'sports',
        eventDate: new Date('2026-02-20'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-02-15'),
        venue: 'Football Stadium',
        maxParticipants: 80,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      },
      {
        title: 'Basketball 3v3',
        description: 'Fast-paced 3v3 basketball competition',
        category: 'sports',
        eventDate: new Date('2026-02-25'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-02-20'),
        venue: 'Basketball Court',
        maxParticipants: 60,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      },
      {
        title: 'Badminton Singles & Doubles',
        description: 'Individual and team badminton competition',
        category: 'sports',
        eventDate: new Date('2026-03-01'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-02-25'),
        venue: 'Indoor Sports Complex',
        maxParticipants: 50,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      },
      {
        title: 'Table Tennis Championship',
        description: 'Table tennis competition with singles and doubles events',
        category: 'sports',
        eventDate: new Date('2026-03-05'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-03-01'),
        venue: 'Indoor Sports Hall',
        maxParticipants: 40,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      },
      
      // Cultural Events
      {
        title: 'Classical Dance Performance',
        description: 'Showcase traditional Indian classical dance forms',
        category: 'cultural',
        eventDate: new Date('2026-02-18'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-02-12'),
        venue: 'Main Auditorium',
        maxParticipants: 50,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      },
      {
        title: 'Western Dance Competition',
        description: 'Modern and contemporary dance competition',
        category: 'cultural',
        eventDate: new Date('2026-02-22'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-02-17'),
        venue: 'Open Air Theatre',
        maxParticipants: 60,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      },
      {
        title: 'Solo Singing Competition',
        description: 'Individual singing competition - Classical & Western',
        category: 'cultural',
        eventDate: new Date('2026-02-26'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-02-21'),
        venue: 'Music Hall',
        maxParticipants: 70,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      },
      {
        title: 'Group Band Performance',
        description: 'Live band competition with original and cover songs',
        category: 'cultural',
        eventDate: new Date('2026-03-02'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-02-26'),
        venue: 'Main Stage',
        maxParticipants: 40,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      },
      {
        title: 'Drama & Theatre Competition',
        description: 'Short play and drama performance competition',
        category: 'cultural',
        eventDate: new Date('2026-03-06'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-03-02'),
        venue: 'Drama Theatre',
        maxParticipants: 50,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      },
      {
        title: 'Stand-up Comedy',
        description: 'Open mic comedy competition',
        category: 'cultural',
        eventDate: new Date('2026-03-08'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-03-05'),
        venue: 'Comedy Club',
        maxParticipants: 30,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      },
      {
        title: 'Fashion Show',
        description: 'College fashion show with creative themes',
        category: 'cultural',
        eventDate: new Date('2026-03-10'),
        registrationStartDate: new Date('2026-01-05'),
        registrationEndDate: new Date('2026-03-07'),
        venue: 'Ramp Stage',
        maxParticipants: 60,
        currentParticipants: 0,
        coordinatorId: coordinator._id,
        status: 'published',
        isActive: true
      }
    ];

    const createdEvents = await Event.insertMany(sampleEvents);
    console.log(`✅ Successfully created ${createdEvents.length} events`);
    
    // Show summary
    const sportsCount = createdEvents.filter(e => e.category === 'sports').length;
    const culturalCount = createdEvents.filter(e => e.category === 'cultural').length;
    
    console.log('\n📊 Event Summary:');
    console.log(`   🏃 Sports Events: ${sportsCount}`);
    console.log(`   🎭 Cultural Events: ${culturalCount}`);
    console.log(`   📅 Total Events: ${createdEvents.length}`);
    
    console.log('\n✨ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding events:', error);
    process.exit(1);
  }
}

seedEvents();
