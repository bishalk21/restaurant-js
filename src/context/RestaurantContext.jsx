import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { RESTAURANT_API_URI } from "../utils/constants";
import { mockRestaurants } from "../utils/mockData";

// Create the context with default values
const RestaurantContext = createContext({
  restaurants: [],
  isLoading: true,
  error: null,
  refetchRestaurants: () => {},
});

// Custom hook to use the restaurant context
export const useRestaurants = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurants must be used within a RestaurantProvider");
  }
  return context;
};

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurants = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(RESTAURANT_API_URI);

      const data = response?.data?.data?.cards;

      data?.forEach((item) => {
        if (item?.card?.card?.["@type"]?.includes("v2.GridWidget")) {
          const gridItems =
            item?.card?.card?.gridElements?.infoWithStyle?.restaurants;
          if (gridItems) {
            gridItems.forEach((restaurant) => {
              restaurant.info.id = restaurant.info.id;
              restaurant.info.promoted = true; // Add the promoted property
            });
          }
          setRestaurants((prevRestaurants) => [
            ...prevRestaurants,
            ...(gridItems || []),
          ]);
        } else if (item?.card?.card?.["@type"]?.includes("RestaurantInfo")) {
          const restaurant = item?.card?.card?.info;
          restaurant.promoted = false; // Add the promoted property
          setRestaurants((prevRestaurants) => [...prevRestaurants, restaurant]);
        }
      });
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      setError("Failed to fetch restaurants. Please try again later.");
      setRestaurants(mockRestaurants);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch restaurants when the provider mounts
  useEffect(() => {
    fetchRestaurants();
    // Fetch restaurants when the component mounts
    // fetchRestaurants();
    // Cleanup function to reset state if needed
    return () => {
      setRestaurants([]);
      setIsLoading(true);
      setError(null);
    };
  }, []);

  // Create the context value object
  const contextValue = {
    restaurants,
    isLoading,
    error,
    refetchRestaurants: fetchRestaurants,
    setRestaurants,
  };

  return (
    <RestaurantContext.Provider value={contextValue}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;
