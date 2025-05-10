import { useState } from "react";
import CartContext from "../context/CartContext";
import Header from "./header/Header";
import { BrowserRouter, Routes } from "react-router-dom";

const AppLayout = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      <div className="app">
        <BrowserRouter>
          <Header />
          <Routes></Routes>
        </BrowserRouter>
      </div>
    </CartContext.Provider>
  );
};

export default AppLayout;
