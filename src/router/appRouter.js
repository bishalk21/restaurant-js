import { createBrowserRouter, Outlet } from "react-router-dom";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/contact/ContactPage";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import Header from "../components/header/Header";
import { AuthProvider } from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { mockRestaurants } from "../utils/mockData";
import { RESTAURANT_API_URI } from "../utils/constants";
import {
  RestaurantProvider,
  useRestaurants,
} from "../context/RestaurantContext";
import HomePageContext from "../pages/home/HomePageContext";
import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  return (
    <AuthProvider>
      <RestaurantProvider>
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
          <div className="app">
            <Header />
            <Outlet />
            <Footer />
          </div>
        </CartContext.Provider>
      </RestaurantProvider>
    </AuthProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePageContext />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
]);

export default appRouter;
