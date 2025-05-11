import { useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import Header from "./header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import Footer from "./footer/Footer";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/contact/ContactPage";
import { RESTAURANT_API_URI } from "../utils/constants";
import { mockRestaurants } from "../utils/mockData";
import axios from "axios";

const AppLayout = () => {
  const [cartItems, setCartItems] = useState([]);

  const [restaurants, setRestaurants] = useState([]);

  // the useEffect callback function is executed after the component mounts or renders

  // the array of dependencies is used to control when the effect runs
  // if any of the values in the array change, the effect will run again
  // if the array is empty, the effect will only run once when the component mounts
  // if the array is not empty, the effect will run whenever any of the values in the array change
  // if the array is not provided, the effect will run after every render

  useEffect(() => {
    // console.log("first useEffect");
    // when home page is loaded, the home page is rendered
    // the useEffect callback function is executed after the component mounts or renders
    try {
      // fetch restaurant data from the API
      // axios is a promise-based HTTP client for the browser and Node.js
      axios.get(RESTAURANT_API_URI).then((response) => {
        const data =
          response?.data?.data?.cards[4]?.card?.card?.gridElements
            ?.infoWithStyle?.restaurants;

        if (data) {
          setRestaurants(data);
        } else {
          setRestaurants(mockRestaurants);
          console.log("No restaurant data found in the response.");
        }
      });
    } catch (error) {
      setRestaurants(mockRestaurants);
      console.log("Error fetching restaurant data:", error);
    }
  }, []);

  // useEffect(() => {
  // using async/await
  // const fetchRestaurants = async () => {
  //   try {
  //     const data = await fetch(RESTAURANT_API_URI);
  //     const json = await data.json();
  //     const restaurants =
  //       json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  //         ?.restaurants;
  //     if (restaurants) {
  //       setRestaurants(restaurants);
  //     } else {
  //       console.log("No restaurant data found in the response.");
  //     }
  //   } catch (error) {
  //     console.log("Error fetching restaurant data:", error);
  //   }
  // };
  //   fetchRestaurants();
  // }, []);

  // console.log("home page render"); // this will be printed every time the component is re-rendered

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      <div className="app">
        <Header restaurants={restaurants} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                restaurants={restaurants}
                setRestaurants={setRestaurants}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </CartContext.Provider>
  );
};

export default AppLayout;
