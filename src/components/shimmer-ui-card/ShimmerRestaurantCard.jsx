import { useRef } from "react";
import "./shimmer-restaurant-card.css";

const ShimmerRestaurantCard = () => {
  const cardRef = useRef(null);

  return (
    <div className="shimmer-card" ref={cardRef}>
      <div className="shimmer-img"></div>
      <div className="shimmer-details">
        <div className="shimmer-name"></div>
        <div className="shimmer-cuisines"></div>
        <div className="shimmer-meta">
          <div className="shimmer-rating"></div>
          <div className="shimmer-delivery-time"></div>
          <div className="shimmer-price"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerRestaurantCard;
