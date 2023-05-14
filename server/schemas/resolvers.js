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

    // order: async (parent, { _id }, context) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id).populate({
    //       path: 'orders.products',
    //       populate: 'category'
    //     });

    //     return user.orders.id(_id);
    //   }

    //   throw new AuthenticationError('Not logged in');
    // },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },

  Mutation: {

    addUser: async (parent, { username, email, password, role }) => {
      const user = await User.create({ username, email, password, role });
      const token = signToken(user);

      return { token, user };
    },

    // mutation for adding an order
    order: async (parent, { purchaseDate, products }, context) => {
      if (context.user) {
        const orderProducts = await Promise.all(products.map(productId => Product.findById(productId)));
    
        const order = new Order({
          purchaseDate: purchaseDate,
          products: orderProducts.map(product => ({
            product: product._id,
            quantity: product.quantity,
          }))
        });
    
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
    const pet = await Pet.create({ name, breed, age, type, image, owner: context.user.username });

    await User.findOneAndUpdate(
      { _id: context.user._id },
      { $push: { pets: pet._id } }
    );

    return pet;
  }

  throw new AuthenticationError('You need to be logged in!');
},

  },
};

module.exports = resolvers;