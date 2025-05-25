import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { RestaurantProvider } from "../context/RestaurantContext";
import { useOnlineStatus } from "../context/OnlineStatus";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import Header from "../components/header/Header";
// import CartContext from "../context/CartContext";
import Footer from "../components/footer/Footer";
import OfflinePage from "../pages/not-found/OfflinePage";
import SuspenseFallback from "../components/suspense-fallback/SuspenseFallback";

const HomePage = lazy(() => import("../pages/home/HomePageContext"));
const CartPage = lazy(() => import("../pages/cart/CartPage"));
const RestaurantMenus = lazy(() =>
  import("../pages/restaurant-menu/RestaurantMenus")
);
const AboutPage = lazy(() => import("../pages/about/AboutPage"));
const ContactPage = lazy(() => import("../pages/contact/ContactPage"));
import { useSelector } from "react-redux";

export const MainLayout = () => {
  const [cartItems, setCartItems] = useState([]);
  const isOnline = useOnlineStatus();
  const [retryCount, setRetryCount] = useState(0);

  const cart = useSelector((store) => store.cart);
  const cartItemsFromStore = cart.items;

  // Check if cart items are available in local storage
  // If not, use the cart items from the Redux store
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (storedCartItems.length > 0) {
      setCartItems(storedCartItems);
    } else {
      setCartItems(cartItemsFromStore);
    }
  }, [cartItemsFromStore, retryCount]);

  // Store cart items in local storage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // const addToCart = (item) => {
  //   // Generate a unique cart item ID to prevent duplicate keys
  //   const cartItemId = `${item.id}_${Date.now()}`; // date.now() = current timestamp(in milliseconds)
  //   const itemWithUniqueId = {
  //     ...item,
  //     cartItemId, // Add a unique cartItemId for each cart item
  //   };
  //   setCartItems([...cartItems, itemWithUniqueId]);
  // };

  // const removeFromCart = (cartItemId) => {
  //   setCartItems(cartItems.filter((item) => item.cartItemId !== cartItemId));
  // };

  // const clearCart = () => {
  //   setCartItems([]);
  // };

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
        {/* <CartContext.Provider
          value={{ cartItems, addToCart, removeFromCart, clearCart }}
        > */}
        {/* value passed in provider like from cartItems */}
        <div className="app">
          <Header />
          <Outlet />
          <Footer />
        </div>
        {/* </CartContext.Provider> */}
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
        element: (
          <Suspense fallback={<SuspenseFallback type="home-page" />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<SuspenseFallback type="home-page" />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:restaurantId",
        element: (
          <Suspense fallback={<SuspenseFallback type="restaurant-recipe" />}>
            <RestaurantMenus />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<SuspenseFallback type="cart" />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<SuspenseFallback type="about" />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<SuspenseFallback type="contact" />}>
            <ContactPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default appRouter;
