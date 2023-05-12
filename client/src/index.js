import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthService from './utils/auth'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import App from "./App";
import Cart from "./components/pages/Cart";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Signup from "./components/pages/Signup";

const httpLink = createHttpLink({
  uri: '/graphql'
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

export default function Index() {
return (
<BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route index element={<App />} />
          <Route path= 'cart' element={ AuthService.loggedIn() ? <Cart /> : <Navigate to="/login"/> } />
          <Route path= 'profile' element={ AuthService.loggedIn() ? <Profile /> : <Navigate to="/login"/> } />
          <Route path= 'login' element={<Login />} />
          <Route path= 'signup' element={<Signup />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
);
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index/>);

