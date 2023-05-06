const { User, Pet, Product, Order } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
// add stripe for transactions

const resolvers = {
  Query: {
    
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('pets');
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    pet: async (parent, { id }) => {
      return Pet.findById(id).populate('owner');
    },

    products: async (parent, { category, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }
      if (name) {
        params.name = { $regex: name, $options: 'i' };
      }
      return Product.find(params);
    },

    product: async (parent, { id }) => {
      return Product.findById(id).populate('category');
    },
  },
  
  // create query for checkout using stripe

  Mutation: {

    addUser: async (parent, { username, email, password, role }) => {
      const user = await User.create({ username, email, password, role });
      const token = signToken(user);

      return { token, user };
    },

    // mutation for adding an order
    order: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },

    // mutation to update products
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },

    // mutation for login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPW = await user.isCorrectPassword(password);

      if (!correctPW) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(user);
      return { token, user };
    },
    
    // mutation to add your pet
    addPet: async (parent, { name, breed, age, type, image }, context) => {
    if (context.user) {
    const pet = await Pet.create({ name, breed, age, type, owner: context.user._id, image });

    return pet;
  }

  throw new AuthenticationError('You need to be logged in!');
},

  },
};



module.exports = resolvers;


