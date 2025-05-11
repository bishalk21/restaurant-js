import "./home-page.css";
import RestaurantCard from "../../components/restaurant-card/RestaurantCard";
import ShimmerRestaurantCard from "../../components/shimmer-ui-card/ShimmerRestaurantCard";
import { useRestaurants } from "../../context/RestaurantContext";

const HomePageContext = () => {
  const { restaurants, setRestaurants } = useRestaurants();
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

export default HomePageContext;
