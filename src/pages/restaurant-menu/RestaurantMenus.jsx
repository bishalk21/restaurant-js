import ShimmerRestaurantMenus from "../../components/shimmer-ui-card/ShimmerRestaurantMenus";
import { useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Clock, Leaf, Plus, Star } from "lucide-react";
import {
  RESTAURANT_IMAGE_URI,
  RESTAURANT_MENU_API_URI,
} from "../../utils/constants";
import "./restaurant-menu.css";
import { useParams } from "react-router-dom";
import CartContext from "../../context/CartContext";

const RestaurantMenus = () => {
  const { restaurantId } = useParams();
  const [restaurantMenuCuisines, setRestaurantMenuCuisines] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const data = await fetch(
          `${RESTAURANT_MENU_API_URI}${restaurantId}&catalog_qa=undefined&query=Biryani&submitAction=ENTER`
        );

        //  847177
        const json = await data.json();

        json?.data?.cards?.forEach((item) => {
          if (item?.card?.card?.["@type"]?.includes("v2.Restaurant")) {
            const restaurant = item?.card?.card?.info;
            setRestaurantInfo(restaurant);
          }

          if (item?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
            const restaurant = item?.groupedCard?.cardGroupMap?.REGULAR?.cards;
            const resCuisines = allCuisines(restaurant);
            setRestaurantMenuCuisines(resCuisines);

            const initialExpandedCategoriesState = {};
            resCuisines?.forEach((category) => {
              initialExpandedCategoriesState[category?.title] = true;
            });
            setExpandedCategories(initialExpandedCategoriesState);
          }
        });
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenus();
  }, [restaurantId]);

  // ?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card?.itemCards;

  const allCuisines = (data) => {
    const categories = [];

    data?.forEach((item) => {
      if (item?.card?.card?.["@type"]?.includes("ItemCategory")) {
        const categoryTitle = item?.card?.card?.title;
        const cuisines = item?.card?.card?.itemCards?.map((cuisine) => {
          const info = cuisine?.card?.info;
          return {
            id: info?.id,
            name: info?.name,
            imageId: info?.imageId,
            description: info?.description,
            price: info?.defaultPrice / 80 || info?.price / 80,
            ratings: info.ratings?.aggregatedRating?.rating || "",
            inStock: info?.inStock === 1,
          };
        });

        if (cuisines && cuisines?.length > 0) {
          categories.push({
            title: categoryTitle,
            cuisines: cuisines,
          });
        }
      } else if (item.card?.card?.["@type"]?.includes("NestedItemCategory")) {
        const categoryTitle = item.card.card.title;
        const subCategories = item.card.card.categories.map((subCategory) => {
          const subCategoryTitle = subCategory?.title;
          const items = subCategory?.itemCards?.map((itemCard) => {
            const info = itemCard.card.info;
            return {
              id: info.id,
              name: info.name,
              description: info.description || "",
              price: info.price / 100, // Convert price from paise to rupees
              isVeg: info.isVeg === 1,
              imageId: info.imageId,
              ratings: info.ratings?.aggregatedRating?.rating || "",
              inStock: info.inStock === 1,
            };
          });
          return {
            title: subCategoryTitle,
            cuisines: items,
          };
        });
        categories.push({
          title: categoryTitle,
          cuisines: subCategories,
        });
      }
    });
    return categories;
  };

  //   const { itemCards } =
  //     restaurantMenuCuisines?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
  //       ?.cards[1]?.card?.card ??
  //     mockRestaurants?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
  //       ?.card?.card;

  // const { itemCards } =
  //   restaurantMenuCuisines?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
  //     ?.cards[2]?.card?.card;

  const handleAddToCart = (cuisine) => {
    addToCart({
      ...cuisine,
      restaurantName: restaurantInfo?.name,
    });
  };

  const handleToggleCategory = (categoryTitle) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryTitle]: !prevState[categoryTitle],
    }));
  };

  const filterCuisines = (cuisines) => {
    if (activeCategory === "All") {
      return cuisines;
    }
    if (activeCategory === "Veg") {
      return cuisines.filter((cuisine) => cuisine?.isVeg);
    }

    if (activeCategory === "nonveg") {
      return cuisines.filter((cuisine) => !cuisine?.isVeg);
    }
  };

  //   const { id, name, imageId, description, price } =
  //     restaurantMenuCuisines?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
  //       ?.cards[6]?.card?.card?.itemCards[0]?.card?.info;

  if (isLoading || !restaurantMenuCuisines) {
    return <ShimmerRestaurantMenus />;
  }

  return (
    <div className="restaurant-menu-page">
      <div className="container">
        {/* Restaurant Header */}
        <div className="restaurant-header">
          <div className="restaurant-info">
            <h1 className="restaurant-name">{restaurantInfo?.name}</h1>
            <p className="restaurant-cuisines">
              {restaurantInfo?.cuisines.join(", ")}
            </p>
            <p className="restaurant-address">{restaurantInfo?.areaName}</p>
            <div className="restaurant-meta">
              <div className="meta-item">
                <Star
                  size={16}
                  className={
                    restaurantInfo?.avgRating >= 4
                      ? "star-filled meta-icon"
                      : "star-outline meta-icon"
                  }
                />
                <span>{restaurantInfo?.avgRating?.toFixed(1)} </span>
              </div>
              <div className="meta-item">
                <Clock size={16} className="meta-icon" />
                <span>{restaurantInfo?.sla?.deliveryTime} mins</span>
              </div>
              <div className="meta-item">
                <span> {restaurantInfo?.costForTwoMessage}</span>
              </div>
            </div>
          </div>
          <div className="restaurant-image-container">
            <img
              src={`${RESTAURANT_IMAGE_URI}${restaurantInfo?.cloudinaryImageId}`}
              alt={restaurantInfo?.name}
              className="restaurant-image"
            />
          </div>
        </div>

        {/* Menu Filters */}
        <div className="menu-filters">
          <button
            className={`filter-button ${
              activeCategory === "All" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("All")}
          >
            All
          </button>
          <button
            className={`filter-button ${
              activeCategory === "veg" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("veg")}
          >
            <Leaf size={16} className="veg-icon" />
            Veg Only
          </button>
          <button
            className={`filter-button ${
              activeCategory === "nonveg" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("nonveg")}
          >
            Non-Veg
          </button>
        </div>

        {/* Menu Categories */}
        <div className="menu-categories">
          {restaurantMenuCuisines?.map((category) => (
            <div key={category?.title} className="menu-category">
              <div
                className="category-header"
                onClick={() => handleToggleCategory(category?.title)}
              >
                <h2 className="category-title">{category?.title}</h2>
                <span className="category-toggle">
                  {expandedCategories[category?.title] ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </span>
              </div>

              {expandedCategories[category?.title] && (
                <div className="category-content">
                  {category?.subCategories ? (
                    // Render nested subcategories
                    category?.subCategories.map((subCategory) => (
                      <div key={subCategory?.title} className="subcategory">
                        <h3 className="subcategory-title">
                          {subCategory?.title}
                        </h3>
                        <div className="items-row">
                          {filterCuisines(subCategory?.cuisines).map((item) => (
                            <div key={item.id} className="menu-item">
                              {item.imageId && (
                                <div className="item-image">
                                  <img
                                    src={`${RESTAURANT_IMAGE_URI}${item.imageId}`}
                                    alt={item.name}
                                    onError={(e) => {
                                      e.target.src =
                                        "/placeholder.svg?height=100&width=100";
                                    }}
                                  />
                                </div>
                              )}
                              <div className="item-details">
                                {item.isVeg ? (
                                  <span className="veg-indicator"></span>
                                ) : (
                                  <span className="nonveg-indicator"></span>
                                )}
                                <h3 className="item-name">{item.name}</h3>
                                <div className="item-price">
                                  ₹{item.price.toFixed(2)}
                                </div>
                                {item.ratings && (
                                  <div className="item-rating">
                                    <Star size={12} />
                                    <span>{item.ratings}</span>
                                  </div>
                                )}
                                {item.description && (
                                  <p className="item-description">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                              <div className="item-actions">
                                <button
                                  className="add-button"
                                  onClick={() => handleAddToCart(item)}
                                  disabled={!item.inStock}
                                >
                                  <Plus size={16} />
                                  {item.inStock ? "Add" : "Out of Stock"}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    // Render regular category items
                    <div className="items-row">
                      {filterCuisines(category?.cuisines)?.map((item) => (
                        <div key={item?.id} className="menu-item">
                          {item.imageId && (
                            <div className="item-image">
                              <img
                                src={`${RESTAURANT_IMAGE_URI}${item.imageId}`}
                                alt={item.name}
                                onError={(e) => {
                                  e.target.src =
                                    "/placeholder.svg?height=100&width=100";
                                }}
                              />
                            </div>
                          )}
                          <div className="item-details">
                            {item?.isVeg ? (
                              <span className="veg-indicator"></span>
                            ) : (
                              <span className="nonveg-indicator"></span>
                            )}
                            <h3 className="item-name">{item?.name}</h3>
                            <div className="item-price">
                              ₹{item?.price.toFixed(2)}
                            </div>
                            {item.ratings && (
                              <div className="item-rating">
                                <Star size={12} />
                                <span>{item?.ratings}</span>
                              </div>
                            )}
                            {item?.description && (
                              <p className="item-description">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <div className="item-actions">
                            <button
                              className="add-button"
                              onClick={() => handleAddToCart(item)}
                              disabled={!item.inStock}
                            >
                              <Plus size={16} />
                              {item.inStock ? "Add" : "Out of Stock"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenus;
