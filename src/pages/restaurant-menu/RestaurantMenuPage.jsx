import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import CartContext from "../../context/CartContext";
import { mockRestaurants } from "../../utils/mockData";
import "./restaurant-menu.css";
import ShimmerRestaurantMenus from "../../components/shimmer-ui-card/ShimmerRestaurantMenus";

const RestaurantMenuPage = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredCuisines, setFilteredCuisines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Simulate API call with a delay
    const fetchRestaurant = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Find the restaurant by id
        const foundRestaurant = mockRestaurants.find(
          (r) => r?.info?.id === parseInt(restaurantId)
        );
        if (foundRestaurant) {
          setRestaurant(foundRestaurant?.info);
          setFilteredCuisines(foundRestaurant.info?.items);
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  useEffect(() => {
    if (restaurant) {
      if (activeCategory === "All") {
        setFilteredCuisines(restaurant?.items);
      } else {
        setFilteredCuisines(
          restaurant?.items.filter(
            (cuisine) => cuisine.category === activeCategory
          )
        );
      }
    }
  }, [activeCategory, restaurant]);

  const handleAddToCart = (cuisine) => {
    addToCart({
      ...cuisine,
      restaurantName: restaurant.name,
    });
  };

  const getUniqueCategories = () => {
    if (!restaurant) return [];
    const categories = restaurant?.items.map((cuisine) => cuisine.category);
    return ["All", ...new Set(categories)];
  };

  if (isLoading) {
    return <ShimmerRestaurantMenus />;
  }

  if (!restaurant) {
    return <div className="error-message">Restaurant not found</div>;
  }

  return (
    <div className="restaurant-details-page">
      <div className="container">
        <div className="restaurant-header">
          <div className="restaurant-info">
            <h1 className="restaurant-name">{restaurant.name}</h1>
            <div className="restaurant-rating">
              <Star
                size={20}
                className={
                  restaurant?.avgRating >= 4 ? "star-filled" : "star-outline"
                }
              />
              <span>{restaurant?.avgRating.toFixed(1)} </span>
            </div>
            <p className="restaurant-description">{restaurant?.description}</p>
          </div>
          <div className="restaurant-image-container">
            <img
              src={restaurant?.cloudinaryImageId}
              alt={restaurant.name}
              className="restaurant-image"
            />
          </div>
        </div>

        <div className="menu-section">
          <h2 className="menu-title">Our Menu</h2>

          <div className="category-filter">
            {getUniqueCategories().map((category) => (
              <button
                key={category}
                className={`category-button ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="cuisines-grid">
            {filteredCuisines.map((cuisine) => (
              <div key={cuisine.id} className="cuisine-card">
                <div className="cuisine-image">
                  <img src={cuisine?.cloudinaryImageId} alt={cuisine.name} />
                </div>
                <div className="cuisine-content">
                  <h3 className="cuisine-name">{cuisine.name}</h3>
                  <p className="cuisine-description">{cuisine.description}</p>
                  <div className="cuisine-footer">
                    <span className="cuisine-price">
                      ${cuisine.price.toFixed(2)}
                    </span>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(cuisine)}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenuPage;
