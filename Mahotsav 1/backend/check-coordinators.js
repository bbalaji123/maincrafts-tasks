require('dotenv').config();
const mongoose = require('mongoose');
const Coordinator = require('./models/Coordinator');

async function checkCoordinators() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const coordinators = await Coordinator.find({});
    
    console.log(`Total coordinators: ${coordinators.length}`);
    
    if (coordinators.length > 0) {
      console.log('\nExisting coordinators:');
      coordinators.forEach(coord => {
        console.log(`  - Username: ${coord.username}, Name: ${coord.firstName} ${coord.lastName}, Active: ${coord.isActive}`);
      });
    } else {
      console.log('No coordinators found! Creating a test coordinator...');
      
      // Create a test coordinator using the model (password will be hashed automatically)
      const newCoordinator = new Coordinator({
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User', 
        email: 'admin@mahotsav.com',
        password: 'admin123',
        department: 'Administration',
        role: 'admin',
        isActive: true
      });
      
      await newCoordinator.save();
      
      console.log('✅ Created test coordinator:');
      console.log('   Username: admin');
      console.log('   Password: admin123');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCoordinators();