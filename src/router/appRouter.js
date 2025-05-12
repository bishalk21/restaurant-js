import { lazy, Suspense, useState } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { RestaurantProvider } from "../context/RestaurantContext";
import { useOnlineStatus } from "../context/OnlineStatus";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import Header from "../components/header/Header";
import CartContext from "../context/CartContext";
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
