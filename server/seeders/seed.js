const db = require('../config/connection');
const { User, Pet, Product, Order } = require('../models');

const petSeeds = require('./petSeeds.json');
const userSeeds = require('./userSeeds.json');
const productSeeds = require('./productSeeds.json');

db.once('open', async () => {
    try {
      // drop all data before seeding 
      await Pet.deleteMany({});
      await User.deleteMany({});
      await Product.deleteMany({});
      await Order.deleteMany({});

      await Product.create(productSeeds);

      await User.create(userSeeds);
      
      for (let i = 0; i < petSeeds.length; i++) {
        const { _id, owner } = await Pet.create(petSeeds[i]);
        const user = await User.findOneAndUpdate(
          // using pet ower's name in pet seed data to find username in user model
          { username: owner },
          // using arry of pets in model user
          {
            $push: {
              pets: _id,
            },
          }
        );
      }

      //seeding mock orders by product type (one each)
      const productTypes = await Product.find({});
      for (let i = 0; i < productTypes.length; i++) {
        await Order.create({
          purchaseDate: Date.now(),
          products: [{
            product: productTypes[i]._id,
            quantity: 1,
          }]
        })
      }

    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('Data seeded 🌱🌱🌱');
    process.exit(0);
  });