import React, { useState } from 'react';
//this is the cart page and will be used to display the cart
import { useCart } from '../../utils/CartContext'
import { Link } from 'react-router-dom';

// import { useQuery } from '@apollo/client';
// const prices = {
//     dogWalking: 20,
//     petSitting:30,
//     petGrooming: 40,
//     animalBoarding: 20,
// }

const Cart = () => {
    const { clearCart, cartContents } = useCart()
    console.log(cartContents)
    return (
        <div id="cart-container">
            <h1 id="cart-title">Cart</h1>
            <div id="item-container">
                {cartContents.map((item) => (
                    <h3 class="cart-item">{item}</h3>
                ))}
            </div>
            {cartContents.length ? (<button id="purchase-button" onClick={() => {clearCart()
            alert("Thank you for your purchase!")
                document.location.reload()}}>Purchase</button>) : (<p id="cart-message">There is nothing in your cart!</p>)}
                  <Link to="/" id="home-button-cart">	&lt;-- Back to Home</Link>
                  <Link to="/profile" id="profile-button-cart">	Go to your Profile --&gt;</Link>
        </div>   
    )  
}  
  
 
export default Cart
