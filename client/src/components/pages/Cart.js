import React, { useState } from 'react';
//this is the cart page and will be used to display the cart
import { useCart } from '../../utils/CartContext'
import { Link } from 'react-router-dom';

const Cart = () => {
    const { clearCart, cartContents } = useCart()
    console.log(cartContents)
    return (
        <div id="cart-container">
            <Link to="/" id="home-button-cart">	&lt;-- Back to Home</Link>
            <Link to="/profile" id="profile-button-cart">	Go to your Profile --&gt;</Link>
            <h1 id="cart-title">Cart</h1>
            <div id="item-container">
                {cartContents.map((item) => (
                    <h3 class="cart-item">{item}</h3>
                ))}
            </div>
            {cartContents.length ? (<div id="cart-buttons"><button id="empty-cart-button" onClick={() => {clearCart()
            alert("Your cart has been emptied.")
                document.location.reload()}}>Empty Cart</button><br></br><button id="purchase-button" onClick={() => {clearCart()
            alert("Thank you for your purchase!")
                document.location.reload()}}>Purchase</button></div>) : (<p id="cart-message">There is nothing in your cart!</p>)}

        </div>   
    )  
}  
  
 
export default Cart
