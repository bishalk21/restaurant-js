import { createBrowserRouter, Outlet } from "react-router-dom";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/contact/ContactPage";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import Header from "../components/header/Header";
import { AuthProvider } from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { RestaurantProvider } from "../context/RestaurantContext";
import HomePageContext from "../pages/home/HomePageContext";
import { useState } from "react";
import Footer from "../components/footer/Footer";
import RestaurantMenus from "../pages/restaurant-menu/RestaurantMenus";
import { useOnlineStatus } from "../context/OnlineStatus";
import OfflinePage from "../pages/not-found/OfflinePage";
import CartPage from "../pages/cart/CartPage";

const MainLayout = () => {
  const [cartItems, setCartItems] = useState([]);
  const isOnline = useOnlineStatus();
  const [retryCount, setRetryCount] = useState(0);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  const handleRetry = () => {
    // Force a re-render to check online status again
    setRetryCount((prev) => prev + 1);
  };

  if (!isOnline) {
    return <OfflinePage onRetry={handleRetry} />;
  }

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
        path: "/home",
        element: <HomePageContext />,
      },
      {
        path: "/restaurant/:restaurantId",
        element: <RestaurantMenus />,
      },
      {
        path: "/cart",
        element: <CartPage />,
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
