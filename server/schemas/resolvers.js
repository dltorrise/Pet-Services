const { User, Pet, Product, Order } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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

    products: async (parent, { service, name }) => {
      const params = {};
      if (service) {
        params.service = service;
      }
      if (name) {
        params.name = { $regex: name, $options: 'i' };
      }
      return Product.find(params);
    },

    product: async (parent, { id }) => {
      return Product.findById(id).populate('service');
    },

    order: async (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const order = await Order.findById(id).populate('products.product');
      if (!order) {
        throw new Error('Order not found');
      }
      if (order.user.toString() !== context.user._id.toString()) {
        throw new ForbiddenError('You are not authorized to access this order');
      }
      return order;
    },

    checkout: async (parent, { products }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const user = await User.findById(context.user._id);
      if (!user) {
        throw new Error('User not found');
      }
      const lineItems = products.map(product => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      }));
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });
      return {
        sessionId: session.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      };
    },
  },

  Mutation: {

    addUser: async (parent, { username, email, password, role }) => {
      const user = await User.create({ username, email, password, role });
      const token = signToken(user);

      return { token, user };
    },

    // mutation for adding an order
    order: async (parent, { products }, context) => {
      if (context.user) {
        const orderProducts = products.map(product => ({
          product: product._id,
          quantity: product.quantity,
        }));
        const order = new Order({ products: orderProducts });
    
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