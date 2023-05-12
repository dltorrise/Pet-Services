import React, { useState } from 'react';
//this is the cart page and will be used to display the cart
import { useCart } from '../../utils/CartContext'

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
        <div>
            <h1>Cart</h1>
            <ul>
                {cartContents.map((item) => (
                    <li>{item}</li>
                ))}
            </ul>
            {cartContents.length ? (<button onClick={() => {clearCart()
                document.location.reload()}}>Purchase</button>) : (<p>There is nothing in your cart!</p>)}
        </div>   
    )  
}  
  
 
export default Cart