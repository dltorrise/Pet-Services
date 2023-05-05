const { User, Pet } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getUser: async (parent, { id }) => {
      return User.findById(id);
    },
    getPet: async (parent, { id }) => {
      return Pet.findById(id);
    },
    getAllPets: async () => {
      return Pet.find({});
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

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


