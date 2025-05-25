import { Link } from "react-router-dom";
import { Star, Timer } from "lucide-react";
import "./restaurant-card.css";
import { RESTAURANT_IMAGE_URI } from "../../utils/constants";

const RestaurantCard = ({ restaurant }) => {
  const { id, name, cloudinaryImageId, cuisines, avgRating, sla } = restaurant;

  return (
    <div className="restaurant-card" data-testid="restaurant-card">
      <div className="restaurant-image">
        <img
          src={
            cloudinaryImageId && cloudinaryImageId?.includes("unsplash")
              ? `${cloudinaryImageId}`
              : `${RESTAURANT_IMAGE_URI}${cloudinaryImageId}`
          }
          alt={name}
        />
      </div>
      <div className="restaurant-content">
        <h3 className="restaurant-name">{name}</h3>
        <div className="rating-delivery-time">
          <div className="restaurant-rating">
            <Star
              size={16}
              className={avgRating >= 4 ? "star-filled" : "star-outline"}
            />
            <span>{avgRating?.toFixed(1)}</span>
          </div>

          <div className="delivery-time">
            <Timer size={16} className="timer-icon" />{" "}
            <span>{sla?.lastMileTravel ? `${sla?.slaString}` : "N/A"}</span>
          </div>
        </div>
        <p className="restaurant-description">{cuisines?.join(", ")}</p>
        <Link to={`/restaurant/${id}`} className="view-menu-btn">
          View Menu
        </Link>
      </div>
    </div>
  );
};

// high order component
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="promoted-wrapper">
        <div className="promoted-label">
          <span data-testid="promoted-wrapper">Promoted</span>
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
