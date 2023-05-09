import { gql } from '@apollo/client';
// jwt-decode needs to be in package.json on client side

// check if we need to update product 

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

// need to check on category
export const ADD_ORDER = gql`
  mutation order($products: [ID]!) {
    order(product: $product) {
      purchaseDate
      product {
        _id
        service
        petTypes
        image
        price
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation addPet(
    $name: String!
    $breed: String!
    $age: Int!
    $type: String!
    $owner: ID!
  ) {
    addPet(
      name: $name
      breed: $breed
      age: $age
      type: $type
      owner: $owner
    ) {
      pet {
        _id
      }
    }
  }
`;

