import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import CartContext from "../../context/CartContext";
import { RESTAURANT_IMAGE_URI } from "../../utils/constants.js";
import "./cart.css";

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item?.card?.info?.price,
    0
  );

  // Calculate delivery fee (free over $30)
  const deliveryFee = subtotal > 30 ? 0 : 4.99;

  // Calculate tax (8.5%)
  const tax = subtotal * 0.085;

  // Calculate total
  const total = subtotal + deliveryFee + tax;

  const handleRemoveItem = (item) => {
    removeFromCart(item?.card?.info?.id);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      alert("Checkout successful! Your order has been placed.");
      // In a real app, you would redirect to a confirmation page
      setIsCheckingOut(false);
    }, 2000);
  };

  // Group cart items by restaurant
  const itemsByRestaurant = cartItems.reduce((groups, item) => {
    const restaurantName = item.restaurantName || "Unknown Restaurant";
    if (!groups[restaurantName]) {
      groups[restaurantName] = [];
    }
    groups[restaurantName].push(item);
    return groups;
  }, {});

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">
          <ShoppingCart size={28} className="cart-icon" />
          Your Cart
        </h1>

        {cartItems?.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items">
              {Object.entries(itemsByRestaurant).map(
                ([restaurantName, items]) => (
                  <div key={restaurantName} className="restaurant-group">
                    <h2 className="restaurant-name">{restaurantName}</h2>

                    {items?.map((item) => (
                      <div key={item?.card?.info?.id} className="cart-item">
                        <div className="item-image">
                          <img
                            src={
                              `${RESTAURANT_IMAGE_URI}${item?.card?.info?.imageId}` ||
                              "/placeholder.svg?height=80&width=80"
                            }
                            alt={item?.card?.info?.name}
                          />
                        </div>
                        <div className="item-details">
                          <h3 className="item-name">
                            {item?.card?.info?.name}
                          </h3>
                          <p className="item-description">
                            {item?.card?.info?.description}
                          </p>
                        </div>
                        <div className="item-price">
                          ${item?.card?.info?.price?.toFixed(2)}
                        </div>
                        <button
                          className="remove-item-btn"
                          onClick={() => handleRemoveItem(item)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                className={`checkout-btn ${isCheckingOut ? "loading" : ""}`}
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>Processing...</>
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="continue-shopping">
                <Link to="/">Continue Shopping</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={80} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/" className="start-shopping-btn">
              Start Shopping
            </Link>
            <div className="empty-cart-suggestions">
              <h3>You might be interested in:</h3>
              <div className="suggestion-links">
                <Link to="/">Popular Restaurants</Link>
                <Link to="/">Featured Recipes</Link>
                <Link to="/">Special Offers</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
