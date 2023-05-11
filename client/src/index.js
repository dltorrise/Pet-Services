import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import App from "./App";
import Cart from "./components/pages/Cart";
import Login from "./components/pages/Login"
import Profile from "./components/pages/Profile"
import Signup from "./components/pages/Signup"
<<<<<<< HEAD
import { ApolloProvider } from "@apollo/client";
import AuthService from './utils/auth'
=======

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
>>>>>>> 85030ad6a3ba4932e3a90bb5bd20b047e81f337d

export default function Index() {
return (
<BrowserRouter>
<<<<<<< HEAD
      <Routes>
        <Route index element={<App />} />
        <Route { AuthService.loggedIn() ? path= 'cart' : path='login'} element={<Cart />} />
        <Route path= 'login' element={<Login />} />
        <Route { AuthService.loggedIn() ? path= 'profile' : path='login'} element={<Profile />} />
        <Route path= 'sign-up' element={<Signup />} />
      </Routes>
=======
      <ApolloProvider client={client}>
        <Routes>
          <Route index element={<App />} />
          <Route path= 'cart' element={<Cart />} />
          <Route path= 'login' element={<Login />} />
          <Route path= 'profile' element={<Profile />} />
          <Route path= 'signup' element={<Signup />} />
        </Routes>
      </ApolloProvider>
>>>>>>> 85030ad6a3ba4932e3a90bb5bd20b047e81f337d
    </BrowserRouter>
);
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index/>);

