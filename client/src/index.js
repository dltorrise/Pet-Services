import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Cart from "./components/pages/Cart";
import Login from "./components/pages/Login"
import Profile from "./components/pages/Profile"
import Signup from "./components/pages/Signup"
import { ApolloProvider } from "@apollo/client";
import AuthService from './utils/auth'

export default function Index() {
return (
<BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route { AuthService.loggedIn() ? path= 'cart' : path='login'} element={<Cart />} />
        <Route path= 'login' element={<Login />} />
        <Route { AuthService.loggedIn() ? path= 'profile' : path='login'} element={<Profile />} />
        <Route path= 'sign-up' element={<Signup />} />
      </Routes>
    </BrowserRouter>
);
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index/>);



