import "./shimmer-restaurant-card.css";

const ShimmerRestaurantCard = () => {
  return (
    <div className="shimmer-restaurant-card">
      <div className="shimmer-image"></div>
      <div className="shimmer-content">
        <div className="shimmer-title"></div>
        <div className="shimmer-rating"></div>
        <div className="shimmer-description"></div>
        <div className="shimmer-description short"></div>
        <div className="shimmer-button"></div>
      </div>
    </div>
  );
};

export default ShimmerRestaurantCard;
