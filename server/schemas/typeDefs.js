const { gql } = require('apollo-server');

const typeDefs = gql`

  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
    pets: [Pet!]
  }

  type Pet {
    petId: ID!
    name: String!
    breed: String!
    description: String
    age: Int!
    type: String!
    owner: User!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser(id: ID!): User
    getPet(id: ID!): Pet
    getAllPets: [Pet!]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, role: String!): Auth
    addPet(name: String!, breed: String!, age: Int!, type: String!, owner: ID!): Pet
  }
`;

module.exports = typeDefs;
