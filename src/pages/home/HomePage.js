import { useState, useEffect } from "react";
import "./home-page.css";
import { mockRestaurants } from "../../utils/mockData";
import RestaurantCard from "../../components/restaurant-card/RestaurantCard";

const HomePage = () => {
  const [restaurants] = useState(mockRestaurants);

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

      <section className="featured-restaurants">
        <div className="container">
          <h2 className="section-title">Featured Restaurants</h2>
          <div className="restaurants-grid">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
