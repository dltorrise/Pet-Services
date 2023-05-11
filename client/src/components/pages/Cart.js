import React from 'react';
//this is the cart page and will be used to display the cart

// import { useQuery } from '@apollo/client';
const prices = {
    dogwalking: 20,
    birdSitting:30,
    catSitting: 40,
}
const Cart = () => { 
    const services= localStorage.getItem('service')    
    return (
        <div>
            <h1>Cart</h1> 
            {services} - ${prices[services]}
        </div>
    )
}
export default Cart

//it needs be storaged in the local storage
// it maybe better to complete services page and create system so the produts can be added to the cart
// create a checkout page