const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    role: String!
    pets: [Pet!]
  }

  type Pet {
    _id: ID
    name: String!
    breed: String!
    description: String
    age: Int!
    type: String!
    owner: User!
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    products: [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    user: User
    pet: Pet
    checkout: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, role: String!): Auth
    addPet(name: String!, breed: String!, age: Int!, type: String!, owner: ID!): Pet
    order(purchaseDate: String!, products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
  }
`;

module.exports = typeDefs;
