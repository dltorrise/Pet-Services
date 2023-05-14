import React, { useState, useContext } from 'react';

//creates cartContext
export const CartContext = React.createContext()
export const useCart = () => useContext(CartContext)

export default function CartProvider({ children }) {

    const [cartContents, setCart] = useState([])

    const addToCart = (item) => {
        console.log("item was added: ", item)
        setCart([...cartContents, item]);
        console.log(cartContents)
      };

    const clearCart = () => {
        console.log("purchase button was clicked")
        setCart([])
    }  
    
    //   const removeFromCart = (item) => {
    //     const updatedCartContents = cartContents.filter((item) => cartContents.id !== id);
    //     setCars(updatedCarList);
    //   };

    return(
        <CartContext.Provider value={{ addToCart, cartContents, clearCart }}>
        {children}
      </CartContext.Provider>
    )
}