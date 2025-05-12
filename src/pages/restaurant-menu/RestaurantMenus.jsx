import ShimmerRestaurantMenus from "../../components/shimmer-ui-card/ShimmerRestaurantMenus";
import { useContext, useEffect, useState } from "react";
import { AlertCircle, Filter, ShoppingCart, Star } from "lucide-react";
import {
  RESTAURANT_IMAGE_URI,
  RESTAURANT_MENU_API_URI,
} from "../../utils/constants";
import "./restaurant-menu.css";
import { useParams } from "react-router-dom";
import CartContext from "../../context/CartContext";

const RestaurantMenus = () => {
  const { restaurantId } = useParams();
  const [restaurantMenuCuisines, setRestaurantMenuCuisines] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const data = await fetch(
          `${RESTAURANT_MENU_API_URI}${restaurantId}&catalog_qa=undefined&query=Biryani&submitAction=ENTER`
        );

        //  847177
        const json = await data.json();

        setRestaurantInfo(json?.data?.cards[2]?.card?.card?.info);
        setRestaurantMenuCuisines(json?.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };
    fetchMenus();
  }, []);

  // ?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card?.itemCards;

  if (restaurantMenuCuisines === null) {
    return <ShimmerRestaurantMenus />;
  }

  //   const { itemCards } =
  //     restaurantMenuCuisines?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
  //       ?.cards[1]?.card?.card ??
  //     mockRestaurants?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
  //       ?.card?.card;

  const { itemCards } =
    restaurantMenuCuisines?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards[1]?.card?.card;

  const handleAddToCart = (cuisine) => {
    addToCart({
      ...cuisine,
      restaurantName: restaurantInfo?.name,
    });
  };

  const getUniqueCategories = () => {
    const categories = itemCards?.map(
      (cuisine) => cuisine?.card?.info?.category
    );
    return [...new Set(categories)];
  };

  //   const { id, name, imageId, description, price } =
  //     restaurantMenuCuisines?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
  //       ?.cards[6]?.card?.card?.itemCards[0]?.card?.info;

  return (
    <div className="restaurant-details-page">
      <div className="container">
        <div className="restaurant-header">
          <div className="restaurant-info">
            <h1 className="restaurant-name">{restaurantInfo?.name}</h1>
            <div className="restaurant-rating">
              <Star
                size={20}
                className={
                  restaurantInfo?.avgRating >= 4
                    ? "star-filled"
                    : "star-outline"
                }
              />
              <span>{restaurantInfo?.avgRating?.toFixed(1)} </span>
            </div>
            <p className="restaurant-description">
              {restaurantInfo?.cuisines?.join(", ")}
              <br />
            </p>
          </div>
          <div className="restaurant-image-container">
            <img
              src={`${RESTAURANT_IMAGE_URI}${restaurantInfo?.cloudinaryImageId}`}
              alt={restaurantInfo?.name}
              className="restaurant-image"
            />
          </div>
        </div>

        <div className="menu-section">
          <h2 className="menu-title">Our Menu</h2>
          <div className="category-filter">
            {getUniqueCategories()?.map((category) => (
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

          {itemCards?.length > 0 ? (
            <div className="cuisines-grid">
              {itemCards?.map((cuisine) => (
                <div className="cuisine-card" key={cuisine?.card?.info?.id}>
                  <div className="cuisine-image">
                    <img
                      src={`${RESTAURANT_IMAGE_URI}${cuisine?.card?.info?.imageId}`}
                      alt={cuisine?.card?.info?.name}
                    />
                  </div>
                  <div className="cuisine-content">
                    <h3 className="cuisine-name">
                      {cuisine?.card?.info?.name}
                    </h3>
                    <p className="cuisine-description">
                      {cuisine?.card?.info?.description}
                    </p>
                    <div className="cuisine-footer">
                      <span className="cuisine-price">
                        ${" "}
                        {cuisine?.card?.info?.defaultPrice / 80 ||
                          cuisine?.card?.info?.price / 80}
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
          ) : (
            <div className="no-cuisines-container">
              <div className="no-cuisines-icon">
                <AlertCircle size={48} />
              </div>
              <h3>No items found in {activeCategory}</h3>
              <p>We couldn't find any menu items in this category.</p>
              <div className="no-cuisines-actions">
                <button
                  className="reset-filter-btn"
                  onClick={() => setActiveCategory("All")}
                >
                  <Filter size={16} />
                  View All Categories
                </button>
              </div>
              <div className="no-cuisines-suggestion">
                <p>
                  Try selecting a different category from the options above.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenus;
