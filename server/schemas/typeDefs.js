const { gql } = require('apollo-server');

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
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    order(_id: ID!): Product
    user: User
    Pet: Pet
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, role: String!): Auth
    addPet(name: String!, breed: String!, age: Int!, type: String!, owner: ID!): Pet
  }
`;

module.exports = typeDefs;