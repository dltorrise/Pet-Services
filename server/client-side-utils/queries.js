import { gql } from '@apollo/client';
// jwt-decode needs to be in package.json on client side

// need to add query checkout? 

// query products by category
// question: do we need this?
export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      service
      petTypes
      image
      price
      category {
        _id
      }
    }
  }
`;

// has category defined here
export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

// may need to query orders too
export const QUERY_USER = gql`
  {
    user {
        username
        email
        role
        pets {
            _id
            name
            breed
            age
            type
            image
        }
      }
    }
  }
`;

export const QUERY_PET = gql`
  {
    pets {
            _id
            name
            breed
            age
            type
            owner
            image
        }
  }
`;

// query all orders by user
// need relationship between User and Order model
export const QUERY_ALL_ORDERS = gql`
  {
    
  }
`;
