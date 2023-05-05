const db = require('../config/connection');
const { User, Pet } = require('../models');

// maybe having issue with requiring Pet model
// maybe having issue with enum seeding, need to test/research

const petSeeds = require('./petSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
    try {
      // drop all data before seeding 
      await Pet.deleteMany({});
      await User.deleteMany({});
  
      await User.create(userSeeds);
  
      for (let i = 0; i < petSeeds.length; i++) {
        const { _id, owner } = await Pet.create(petSeeds[i]);
        const user = await User.findOneAndUpdate(
          // using pet ower's name in pet seed data to find username in user model
          { username: owner },
          // using arry of pets in model user
          {
            $push: {
              pet: _id,
            },
          }
        );
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('Data seeded 🌱🌱🌱');
    process.exit(0);
  });