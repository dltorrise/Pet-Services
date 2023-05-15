import "./App.css";
import React, { useState, Fragment, createContext } from "react";
import Map from "./components/Map";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Modal from "./components/pages/Modal";
import Profile from "./components/pages/Profile";
import Cart from "./components/pages/Cart";
import AuthService from "./utils/auth";
import { QUERY_USER } from "./utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useCart } from "./utils/CartContext";

// default value
export const ModalContext = createContext();

function App() {
  const [showModal, setModal] = useState(false);
  const [switchModal, flipSwitchModal] = useState(false);
  // console.log(switchModal);

  const { addToCart } = useCart();
  const { loading, data } = useQuery(QUERY_USER);

  return (
    <Fragment>
      <>
      <header>
  <div class="container">
    <nav class="navbar">
      <div class="navbar-left">
        <h1>
          <span class="highlight">Pet Services</span>
        </h1>
      </div>
      <div class="navbar-right">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/cart">Cart</a>
          </li>
          {AuthService.loggedIn() ? (
            <li>
              <div class="homepage-intro">
                <span>
                  {loading ? (
                    <a href="/profile">
                      Hello!
                    </a>
                  ) : (
                    <a href="/profile">
                      Hello, {data.user.username}!
                    </a>
                  )}
                </span>
                <span onClick={() => { AuthService.logout() }}>
                  Logout
                </span>
              </div>
            </li>
          ) : null}
          {!AuthService.loggedIn() && (
            <li>
              <button class="" onClick={() => setModal(true)}>
                Sign up/Log in
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  </div>
</header>

        <div id="body">
          <div className="row">
            <section id="showcase">
              <div className="container2">
                <h1>Find a Pet Service</h1>
                <Map />
              </div>
            </section>

            <section id="newsletter">
              <div className="container3">
                <h1>Subscribe to our newsletter</h1>
                <form>
                  <input type="email" placeholder="Enter Email..." />
                  <button type="submit" className="button_1">
                    Subscribe
                  </button>
                </form>
              </div>
            </section>
          </div>

          {/* our services  */}
          <h2 className="h2title">Our Services Include</h2>
          <section id="box">
            {/* <!-- <h2 className="h2title">Our Services Include</h2> --> */}
            <div className="container4">
              <div className="box">
                <h3>Dog Walking</h3>
                <img
                  className="servicebox"
                  src="https://media.istockphoto.com/id/1303755155/vector/girl-walking-her-dog-silhouette.jpg?s=612x612&w=0&k=20&c=2vRYlAlmNccKkjucyi_NmSHxuNqDHrGz2oRSZ8qvDBU="
                  width="150"
                  height="150"
                  // For testing purposes only
                  // onClick = { () => {
                  //   addToCart("Dog Walking - $10/hour")
                  //   alert("Dog Walking Added to Cart");
                  // }}
                />
                {AuthService.loggedIn() ? (
                  <div className="service">
                    <p
                      onClick={() => {
                        addToCart("Dog Walking - $10/hour");
                        alert("Dog Walking Added to Cart");
                      }}
                    >
                      Add to Cart
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="box">
                <h3>Pet Sitting</h3>
                <img
                  className="servicebox"
                  src="https://thumbs.dreamstime.com/b/cute-cartoon-cat-sitting-smiling-little-vector-illustration-sketch-152283646.jpg"
                  width="150"
                  height="150"
                  alt="Pet sitting representing a service"
                  // For testing purposes only
                  // onClick = { () => {
                  //   addToCart("Pet Sitting - $15/hour")
                  //   alert("Pet Sitting Added to Cart");
                  // }}
                />
                {AuthService.loggedIn() ? (
                  <div className="service">
                    <p
                      onClick={() => {
                        addToCart("Pet Sitting - $15/hour");
                        alert("Pet Sitting Added to Cart");
                      }}
                    >
                      Add to Cart
                    </p>
                  </div>
                ) : null}
              </div>
              <div class="box">
                <h3>Pet Grooming</h3>
                <img
                  className="servicebox"
                  src="https://thumbs.dreamstime.com/b/dog-grooming-logo-design-template-pawprint-comb-scissors-vector-clipart-drawing-isolated-illustration-white-background-217266808.jpg"
                  width="150"
                  height="150"
                  alt="Pet grooming representing a service"
                  // For testing purposes only
                  // onClick = { () => {
                  //   addToCart("Pet Grooming - $10/hour")
                  //   alert("Pet Grooming Added to Cart");
                  // }}
                />
                {AuthService.loggedIn() ? (
                  <div className="service">
                    <p
                      onClick={() => {
                        addToCart("Pet Grooming - $10/hour");
                        alert("Pet Grooming Added to Cart");
                      }}
                    >
                      Add to Cart
                    </p>
                  </div>
                ) : null}
              </div>
              <div class="box">
                <h3>Animal Boarding</h3>
                <img
                  className="servicebox"
                  src="https://www.universityplacevet.com/wp-content/uploads/sites/13/2018/10/logobig.png"
                  width="150"
                  height="150"
                  alt="Animal boarding representing a service"
                  // For testing purposes only
                  // onClick = { () => {
                  //   addToCart("Animal Boarding - $20/night")
                  //   alert("Animal Boarding Added to Cart");
                  // }}
                />
                {AuthService.loggedIn() ? (
                  <div className="service">
                    <p
                      onClick={() => {
                        addToCart("Animal Boarding - $20/night");
                        alert("Animal Boarding Added to Cart");
                      }}
                    >
                      Add to Cart
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <div className="row">
            <div className="column right"></div>
            {/* <!-- Mission statment --> */}
            <section id="mission">
              <h4 className="h4title">Our Mission</h4>
              <div className="container5">
                <p>
                  Our mission is to provide the best pet services to our guests.
                  We strive to satisfy your pet necessity. We are a team of
                  dedicated pet lovers who want to make sure your pets are taken
                  care of. We are here to help you find the best pet service.
                </p>
              </div>
            </section>
            <div className="column left"></div>
          </div>
        </div>
        {/* <!-- footer --> */}
        <footer>
          <div className="Contact">
            <p>Contact Us</p>
            <p className="address">Address: 345 Pet ave Chicago, USA 63445</p>
            <p className="phone">Phone: 123-456-7890</p>
            <p className="email">
              Email: <a href="mailto:INFO@PETRUS.ORG">INFO@PETSRUS.ORG</a>
            </p>
          </div>
        </footer>
        <ModalContext.Provider
          value={{ showModal, setModal, switchModal, flipSwitchModal }}
        >
          <Modal />
        </ModalContext.Provider>
      </>
    </Fragment>
  );
}

export default App;
