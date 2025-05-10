import { useState, useEffect, use } from "react";
import "./home-page.css";
import { mockRestaurants } from "../../utils/mockData";
import RestaurantCard from "../../components/restaurant-card/RestaurantCard";
import { RESTAURANT_API_URI } from "../../utils/constants";
import axios from "axios";
import ShimmerRestaurantCard from "../../components/shimmer-ui-card/ShimmerRestaurantCard";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);

  // the useEffect callback function is executed after the component mounts or renders
  useEffect(() => {
    console.log("first useEffect");
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

  console.log("home page render"); // this will be printed every time the component is re-rendered

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
            {
              // if the restaurant data is not available, return a loading state
              restaurants.length === 0
                ? Array(10)
                    .fill("")
                    .map((_, index) => {
                      return <ShimmerRestaurantCard key={`shimmer-${index}`} />;
                    })
                : restaurants.map((restaurant) => {
                    return (
                      <RestaurantCard
                        key={restaurant?.info?.id}
                        restaurant={restaurant}
                      />
                    );
                  })
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
