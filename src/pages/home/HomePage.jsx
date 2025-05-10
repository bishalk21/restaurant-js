import { useState, useEffect, use } from "react";
import "./home-page.css";
import { mockRestaurants } from "../../utils/mockData";
import RestaurantCard from "../../components/restaurant-card/RestaurantCard";
import { RESTAURANT_API_URI } from "../../utils/constants";
import axios from "axios";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    try {
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
      console.log("Error fetching restaurant data:", error);
      setRestaurants(mockRestaurants);
    }
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <h1>Discover the Authentic Taste of Nepal</h1>
          <p>
            Explore traditional recipes and find the best restaurants near you
          </p>
        </div>
      </section>

      <section className="top-rated-restro">
        <div className="container btn-restro-container">
          <button
            className="restaurant-filter-btns"
            onClick={() => {
              const topRatedRestaurants = restaurants.filter(
                (restaurant) => restaurant?.info.avgRating >= 4.5
              );
              setRestaurants(topRatedRestaurants);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </section>

      <section className="popular-cuisines">
        <div className="container"></div>
      </section>

      <section className="featured-restaurants">
        <div className="container">
          <h2 className="section-title">Featured Restaurants</h2>
          <div className="restaurants-grid">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant?.info.id}
                restaurant={restaurant}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
