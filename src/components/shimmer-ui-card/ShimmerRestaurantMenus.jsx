import "./shimmer-restaurant-menus.css";

const ShimmerRestaurantMenus = () => {
  // Create an array of shimmer cuisine cards
  const shimmerCuisineCards = Array(6)
    .fill()
    .map((_, index) => (
      <div key={`shimmer-cuisine-${index}`} className="shimmer-cuisine-card">
        <div className="shimmer-cuisine-image"></div>
        <div className="shimmer-cuisine-content">
          <div className="shimmer-cuisine-name"></div>
          <div className="shimmer-cuisine-description"></div>
          <div className="shimmer-cuisine-description short"></div>
          <div className="shimmer-cuisine-footer">
            <div className="shimmer-cuisine-price"></div>
            <div className="shimmer-cuisine-button"></div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="restaurant-details-page">
      <div className="container">
        <div className="shimmer-restaurant-header">
          <div className="shimmer-restaurant-info">
            <div className="shimmer-restaurant-name"></div>
            <div className="shimmer-restaurant-rating"></div>
            <div className="shimmer-restaurant-description"></div>
            <div className="shimmer-restaurant-description short"></div>
          </div>
          <div className="shimmer-restaurant-image-container"></div>
        </div>

        <div className="shimmer-menu-section">
          <div className="shimmer-menu-title"></div>

          <div className="shimmer-category-filter">
            {Array(4)
              .fill()
              .map((_, index) => (
                <div
                  key={`shimmer-category-${index}`}
                  className="shimmer-category-button"
                ></div>
              ))}
          </div>

          <div className="shimmer-cuisines-grid">{shimmerCuisineCards}</div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerRestaurantMenus;
