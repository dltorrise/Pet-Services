import "./App.css";
import Map from "./components/Map";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login'
import Profile from './components/pages/Profile';
import Cart from './components/pages/Cart'
import AuthService from './utils/auth'
import { QUERY_USER } from './utils/queries'
import { useQuery, useMutation } from '@apollo/client';

function App() {
  const { loading, data } = useQuery(QUERY_USER);
  return (
    
    <>
      <header>
        <div class="container">
          <div id="branding">
            <h1>
              <span class="highlight">Pet</span> Services
            </h1>
          </div>
          <nav   >
          {AuthService.loggedIn() ? (<div><li><a href="/profile">Hello, {data.user.username}!</a></li><li onClick = {() => {AuthService.logout()}}>Logout</li></div>) : (<div><li class="current"><a href="/login">Login</a></li><li class="current"><a href="/sign-up">Sign up</a></li></div>)}
              <li class="current">
                <a href="/home">Home</a>
              </li>
              <li class="current">
                <a href="/login">Login</a>
              </li>
              <li class="current">
                <a href="/sign-up">Sign up</a>
              </li>
              <li class="current">
                <a href="/cart">Cart</a>
                {/* may need to change php extention */}
                {/* php and react dont work together */}
                {/* /react router  */}
                <img
                  src="https://cdn.vectorstock.com/i/1000x1000/70/12/add-to-cart-icon-adding-shopping-cart-vector-28487012.webp
             "
                  width="20"
                  height="20"
                />
              </li>
          </nav>
        </div>
      </header>

      <div className="row">
        <section id="showcase">
          <div class="container2">
            <h1>Find a Pet Service</h1>
            <Map />
          </div>
        </section>

        <section id="newsletter">
          <div class="container3">
            <h1>Subscribe to our newsletter</h1>
            <form>
              <input type="email" placeholder="Enter Email..." />
              <button type="submit" class="button_1">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* our services  */}
      <h2 class="h2title">Our Services Include</h2>
      <section id="box">
        {/* <!-- <h2 class="h2title">Our Services Include</h2> --> */}
        <div class="container4">
          <div class="box">
            <h3>Dog Walking</h3>
            <img
              class="servicebox"
              src="https://www.banfield.com/-/media/Project/Banfield/Main/en/Wellness_at_Banfield/Puppy_Hub/Puppy_Hub_6-7_months/0994_18_Banner_Animation_new.gif?rev=690d3ae4ca624d2f92f38ae5fd80ea7f"
              width="150"
              height="150"
              onClick = {() => {
                localStorage.setItem("service", "dogwalking");
                alert("Dog Walking Service Added to Cart");
              }}
            />
          </div>
          <div class="box">
            <h3>Pet Sitting</h3>
            <img
              class="servicebox"
              src="https://thumbs.dreamstime.com/b/cute-cartoon-cat-sitting-smiling-little-vector-illustration-sketch-152283646.jpg"
              width="150"
              height="150"
              onClick = {() => {
                localStorage.setItem("service", "catSitting");
                alert("cat sitting added to cart");
              }}
            />
            {/* <!-- <p>Find a cat sitter near you</p> --> */}
          </div>
          {/* <div class="box">
            <h3>Bird Sitting</h3>
            <img
              class="servicebox"
              src="https://cdn.dribbble.com/users/330915/screenshots/1551973/media/3c192a543807b62e9597129e7bdb0950.gif
          "
              width="150"
              height="150"
            />
          </div> */}
          <div class="box">
            <h3>Pet Grooming</h3>
            <img
              class="servicebox"
              src="https://thumbs.dreamstime.com/b/dog-grooming-logo-design-template-pawprint-comb-scissors-vector-clipart-drawing-isolated-illustration-white-background-217266808.jpg"
              width="150"
              height="150"
            />
          </div>
          {/* <div class="box">
            <h3>Trainer</h3>
            <img
              class="servicebox"
              src="https://cdn.dribbble.com/users/1771704/screenshots/10736771/media/47e460e65f4055417eb9683e66b41fe7.gif"
              width="150"
              height="150"
            />
          </div> */}
          <div class="box">
            <h3>Animal Boarding</h3>
            <img
              class="servicebox"
              src="https://www.universityplacevet.com/wp-content/uploads/sites/13/2018/10/logobig.png"
              width="150"
              height="150"
            />
          </div>
        </div>
      </section>
      {/* <!-- Mission statment --> */}

      <section id="mission">
        <h4 class="h4title">Our Mission</h4>
        <div class="container5">
          <p>
            Our mission is to provide the best pet services to our guests. We
            strive to satisfy your pet necessity. We are a team of dedicated pet
            lovers who want to make sure your pets are taken care of. We are
            here to help you find the best pet service.
          </p>
        </div>
      </section>
      <div class="row">
        <div class="column right"></div>

        <div class="column left"></div>
      </div>
      {/* <!-- footer --> */}
      <footer>
        <div class="Contact">
          <p>Contact Us</p>
          <p class="address">Address: 345 Pet ave Chicago, USA 63445</p>
          <p class="phone">Phone: 123-456-7890</p>
          <p class="email">
            Email: <a href="mailto:INFO@PETRUS.ORG">INFO@PETSRUS.ORG</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
