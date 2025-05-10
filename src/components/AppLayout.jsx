import { useState } from "react";
import CartContext from "../context/CartContext";
import Header from "./header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import Footer from "./footer/Footer";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/contact/ContactPage";
import { AuthProvider } from "../context/AuthContext";

const AppLayout = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  return (
    <AuthProvider>
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
        <div className="app">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </CartContext.Provider>
    </AuthProvider>
  );
};

export default AppLayout;
