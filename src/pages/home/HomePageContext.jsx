import "./home-page.css";
import RestaurantCard, {
  withPromotedLabel,
} from "../../components/restaurant-card/RestaurantCard";
import ShimmerRestaurantCard from "../../components/shimmer-ui-card/ShimmerRestaurantCard";
import { useRestaurants } from "../../context/RestaurantContext";

const HomePageContext = () => {
  const { restaurants, setRestaurants } = useRestaurants();

  // unique key for each restaurant
  const uniqueKey = (restaurant) => {
    return restaurant?.info?.id + Math.random();
  };

  // high order component to add promoted label
  const PromotedRestaurantCard = withPromotedLabel(RestaurantCard);

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
          <div className="restaurants-grid" data-testid="restaurants-grid">
            {
              // if the restaurant data is not available, return a loading state
              restaurants?.length === 0
                ? Array(10)
                    .fill(null)
                    .map((_, index) => {
                      return (
                        <ShimmerRestaurantCard
                          key={`shimmer-${index}`}
                          data-testid="no-results-message"
                        />
                      );
                    })
                : restaurants?.map((restaurant) => {
                    return (
                      <div
                        key={uniqueKey(restaurant)}
                        data-testid="restaurant-card"
                      >
                        {restaurant?.info?.promoted ? (
                          <PromotedRestaurantCard
                            restaurant={restaurant?.info}
                          />
                        ) : (
                          <RestaurantCard restaurant={restaurant?.info} />
                        )}
                      </div>
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
