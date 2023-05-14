import "./App.css";
import React, { useState, Fragment, createContext } from 'react';
import Map from "./components/Map";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Modal from './components/pages/Modal';
import Profile from './components/pages/Profile';
import Cart from './components/pages/Cart'
import AuthService from './utils/auth'
import { QUERY_USER } from './utils/queries'
import { useQuery, useMutation } from '@apollo/client';
import { useCart } from './utils/CartContext';

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
          <div className="container">
            <div id="branding">
              <h1>
                <span className="highlight">Pet</span> Services
              </h1>
            </div>
            <nav>


              <ul class="current">

                {AuthService.loggedIn() ? (
                  <div id="homepage-intro">
                    <li className="current">
                      {loading ?
                        <a href="/profile">
                          Hello!
                        </a>
                        :
                        <a href="/profile">
                          Hello, {data.user.username}!
                        </a>
                      }
                    </li>
                    <br></br>
                    <li className="current" onClick={() => { AuthService.logout() }}>
                      Logout
                    </li>
                  </div>
                )
                  :
                  (
                    <div>
                      <li className="current">
                        <button
                          className=''
                          onClick={() => setModal(true)}
                        >
                          Sign up/Log in
                        </button>
                      </li>
                    </div>)}

                <li className="current">
                  <a href="/">Home</a>

                </li>
                <li className="current">
                  <Link to="/cart">Cart</Link>
                  <img
                    src="https://cdn.vectorstock.com/i/1000x1000/70/12/add-to-cart-icon-adding-shopping-cart-vector-28487012.webp"
                    width="20"
                    height="20"
                    alt="Shopping cart"
                  />
                </li>  
              </ul>
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
                src="https://www.banfield.com/-/media/Project/Banfield/Main/en/Wellness_at_Banfield/Puppy_Hub/Puppy_Hub_6-7_months/0994_18_Banner_Animation_new.gif?rev=690d3ae4ca624d2f92f38ae5fd80ea7f"
                width="150"
                height="150"
              // For testing purposes only
              // onClick = { () => {
              //   addToCart("Dog Walking - $10/hour")
              //   alert("Dog Walking Added to Cart");
              // }}
              />
              {AuthService.loggedIn() ? (<div><p onClick={() => {
                addToCart("Dog Walking - $10/hour")
                alert("Dog Walking Added to Cart");
              }}>Add to Cart</p></div>) : (null)}
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
              {AuthService.loggedIn() ? (<div><p onClick={() => {
                addToCart("Pet Sitting - $15/hour")
                alert("Pet Sitting Added to Cart");
              }}>Add to Cart</p></div>) : (null)}
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
              {AuthService.loggedIn() ? (<div><p onClick={() => {
                addToCart("Pet Grooming - $10/hour")
                alert("Pet Grooming Added to Cart");
              }}>Add to Cart</p></div>) : (null)}
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
              {AuthService.loggedIn() ? (<div><p onClick={() => {
                addToCart("Animal Boarding - $20/night")
                alert("Animal Boarding Added to Cart");
              }}>Add to Cart</p></div>) : (null)}
            </div>
          </div>
        </section>
        {/* <!-- Mission statment --> */}
        <section id="mission">
          <h4 className="h4title">Our Mission</h4>
          <div className="container5">
            <p>
              Our mission is to provide the best pet services to our guests. We
              strive to satisfy your pet necessity. We are a team of dedicated pet
              lovers who want to make sure your pets are taken care of. We are
              here to help you find the best pet service.
            </p>
          </div>
        </section>
        <div className="row">
          <div className="column right"></div>

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
        <ModalContext.Provider value={{ showModal, setModal, switchModal, flipSwitchModal }}>
          <Modal />
        </ ModalContext.Provider>
      </>
    </Fragment>
  );
}

export default App;
