import { gql } from '@apollo/client';
// jwt-decode needs to be in package.json on client side

// need to add query checkout - stripe ?

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

// for Stripe?
// export const QUERY_CHECKOUT = gql`
//   query getCheckout($products: [ID]!) {
//     checkout(products: $products) {
//       session
//     }
//   }
// `;

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

// check on this
// export const QUERY_CATEGORIES = gql`
//   {
//     categories {
//       _id
//       name
//     }
//   }
// `;

// can use this to query order history and pet/owner profile/ possibly service provider profile 
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
