import { gql } from '@apollo/client';

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
    $role: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      role: $role
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
    $age: String!
    $type: String!
    $image: String
  ) {
    addPet(
      name: $name
      breed: $breed
      age: $age
      type: $type
      image: $image
    ) {
      _id
      age
      breed
      image
      name
    }
  }
`;

