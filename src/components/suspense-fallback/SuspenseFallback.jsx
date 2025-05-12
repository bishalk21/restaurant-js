import { Loader } from "lucide-react";
import "./suspense-fallback.css";

const SuspenseFallback = ({ type = "default", count = 1 }) => {
  const restaurantCount = 4;
  const recipeCount = 6;
  // Different fallback types for different components
  const renderFallbackContent = () => {
    switch (type) {
      case "home-page":
        return (
          <div className="home-page-fallback">
            {/* Hero Section Skeleton */}
            <div className="hero-section-skeleton">
              <div className="container">
                <div className="hero-content-skeleton">
                  <div className="hero-title-skeleton"></div>
                  <div className="hero-subtitle-skeleton"></div>
                </div>
              </div>
            </div>

            {/* Search Results Info Skeleton (conditionally shown) */}
            <div className="search-results-skeleton">
              <div className="container">
                <div className="search-title-skeleton"></div>
                <div className="search-subtitle-skeleton"></div>
              </div>
            </div>

            {/* Featured Restaurants Section Skeleton */}
            <section className="restaurants-section-skeleton">
              <div className="container">
                <div className="section-title-skeleton"></div>

                <div className="restaurants-grid-skeleton">
                  {Array(restaurantCount)
                    .fill()
                    .map((_, index) => (
                      <div
                        key={`restaurant-skeleton-${index}`}
                        className="restaurant-card-skeleton"
                      >
                        <div className="restaurant-image-skeleton"></div>
                        <div className="restaurant-content-skeleton">
                          <div className="restaurant-name-skeleton"></div>
                          <div className="restaurant-rating-skeleton"></div>
                          <div className="restaurant-description-skeleton"></div>
                          <div className="restaurant-description-skeleton short"></div>
                          <div className="restaurant-button-skeleton"></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>

            {/* Popular Recipes Section Skeleton */}
            <section className="recipes-section-skeleton">
              <div className="container">
                <div className="section-title-skeleton"></div>

                <div className="recipes-grid-skeleton">
                  {Array(recipeCount)
                    .fill()
                    .map((_, index) => (
                      <div
                        key={`recipe-skeleton-${index}`}
                        className="recipe-card-skeleton"
                      >
                        <div className="recipe-image-skeleton"></div>
                        <div className="recipe-content-skeleton">
                          <div className="recipe-title-skeleton"></div>
                          <div className="recipe-rating-skeleton"></div>
                          <div className="recipe-description-skeleton"></div>
                          <div className="recipe-description-skeleton short"></div>
                          <div className="recipe-actions-skeleton">
                            <div className="recipe-button-skeleton"></div>
                            <div className="recipe-button-skeleton small"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Load More Button Skeleton */}
                <div className="load-more-skeleton">
                  <div className="load-more-button-skeleton"></div>
                </div>
              </div>
            </section>
          </div>
        );

      case "restaurant-card":
        return Array(count)
          .fill()
          .map((_, index) => (
            <div
              key={`skeleton-restaurant-${index}`}
              className="skeleton-restaurant-card"
            >
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-rating"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-description short"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          ));

      case "restaurant-recipe":
        return Array(count)
          .fill()
          .map((_, index) => (
            <div
              key={`skeleton-recipe-${index}`}
              className="skeleton-recipe-card"
            >
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-rating"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-description short"></div>
                <div className="skeleton-actions">
                  <div className="skeleton-button"></div>
                  <div className="skeleton-button small"></div>
                </div>
              </div>
            </div>
          ));

      case "details-page":
        return (
          <div className="skeleton-details-page">
            <div className="skeleton-header">
              <div className="skeleton-info">
                <div className="skeleton-title large"></div>
                <div className="skeleton-rating"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-description"></div>
              </div>
              <div className="skeleton-image large"></div>
            </div>
            <div className="skeleton-section">
              <div className="skeleton-section-title"></div>
              <div className="skeleton-tabs">
                {Array(4)
                  .fill()
                  .map((_, index) => (
                    <div key={`tab-${index}`} className="skeleton-tab"></div>
                  ))}
              </div>
              <div className="skeleton-grid">
                {Array(6)
                  .fill()
                  .map((_, index) => (
                    <div key={`item-${index}`} className="skeleton-item">
                      <div className="skeleton-item-image"></div>
                      <div className="skeleton-item-content">
                        <div className="skeleton-item-title"></div>
                        <div className="skeleton-item-description"></div>
                        <div className="skeleton-item-description short"></div>
                        <div className="skeleton-item-footer">
                          <div className="skeleton-item-price"></div>
                          <div className="skeleton-item-button"></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      case "cart":
        return (
          <div className="skeleton-cart">
            <div className="skeleton-cart-title"></div>
            <div className="skeleton-cart-content">
              <div className="skeleton-cart-items">
                {Array(3)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={`cart-item-${index}`}
                      className="skeleton-cart-item"
                    >
                      <div className="skeleton-cart-item-image"></div>
                      <div className="skeleton-cart-item-details">
                        <div className="skeleton-cart-item-title"></div>
                        <div className="skeleton-cart-item-description"></div>
                      </div>
                      <div className="skeleton-cart-item-price"></div>
                      <div className="skeleton-cart-item-action"></div>
                    </div>
                  ))}
              </div>
              <div className="skeleton-cart-summary">
                <div className="skeleton-summary-title"></div>
                <div className="skeleton-summary-row"></div>
                <div className="skeleton-summary-row"></div>
                <div className="skeleton-summary-row"></div>
                <div className="skeleton-summary-row large"></div>
                <div className="skeleton-summary-button"></div>
              </div>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="about-page-fallback">
            <div className="container">
              {/* Page Title Skeleton */}
              <div className="page-title-skeleton"></div>

              {/* Our Story Section Skeleton */}
              <section className="about-section-skeleton">
                <div className="section-title-skeleton"></div>
                <div className="text-block-skeleton">
                  <div className="text-line-skeleton"></div>
                  <div className="text-line-skeleton"></div>
                  <div className="text-line-skeleton"></div>
                  <div className="text-line-skeleton"></div>
                  <div
                    className="text-line-skeleton"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="text-block-skeleton">
                  <div className="text-line-skeleton"></div>
                  <div className="text-line-skeleton"></div>
                  <div className="text-line-skeleton"></div>
                  <div
                    className="text-line-skeleton"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </section>

              {/* Our Mission Section Skeleton */}
              <section className="about-section-skeleton">
                <div className="section-title-skeleton"></div>
                <div
                  className="text-line-skeleton"
                  style={{ width: "70%" }}
                ></div>
                <div className="list-skeleton">
                  {Array(4)
                    .fill()
                    .map((_, index) => (
                      <div
                        key={`list-item-${index}`}
                        className="list-item-skeleton"
                      >
                        <div className="list-bullet-skeleton"></div>
                        <div className="list-text-skeleton"></div>
                      </div>
                    ))}
                </div>
              </section>

              {/* Team Section Skeleton */}
              <section className="about-section-skeleton">
                <div className="section-title-skeleton"></div>
                <div className="team-grid-skeleton">
                  {Array(3)
                    .fill()
                    .map((_, index) => (
                      <div
                        key={`team-member-${index}`}
                        className="team-member-skeleton"
                      >
                        <div className="team-photo-skeleton"></div>
                        <div className="team-name-skeleton"></div>
                        <div className="team-role-skeleton"></div>
                      </div>
                    ))}
                </div>
              </section>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="contact-page-fallback">
            <div className="container">
              {/* Page Title Skeleton */}
              <div className="page-title-skeleton"></div>

              <div className="contact-content-skeleton">
                {/* Contact Info Section Skeleton */}
                <div className="contact-info-skeleton">
                  <div className="section-title-skeleton"></div>
                  <div className="text-block-skeleton">
                    <div className="text-line-skeleton"></div>
                    <div className="text-line-skeleton"></div>
                    <div
                      className="text-line-skeleton"
                      style={{ width: "80%" }}
                    ></div>
                  </div>

                  <div className="contact-details-skeleton">
                    {/* Address Skeleton */}
                    <div className="contact-item-skeleton">
                      <div className="contact-icon-skeleton"></div>
                      <div className="contact-text-skeleton"></div>
                    </div>

                    {/* Phone Skeleton */}
                    <div className="contact-item-skeleton">
                      <div className="contact-icon-skeleton"></div>
                      <div
                        className="contact-text-skeleton"
                        style={{ width: "60%" }}
                      ></div>
                    </div>

                    {/* Email Skeleton */}
                    <div className="contact-item-skeleton">
                      <div className="contact-icon-skeleton"></div>
                      <div
                        className="contact-text-skeleton"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Business Hours Skeleton */}
                  <div className="hours-skeleton">
                    <div className="hours-title-skeleton"></div>
                    <div className="hours-line-skeleton"></div>
                    <div className="hours-line-skeleton"></div>
                    <div className="hours-line-skeleton"></div>
                  </div>
                </div>

                {/* Contact Form Skeleton */}
                <div className="contact-form-skeleton">
                  <div className="section-title-skeleton"></div>

                  <div className="form-group-skeleton">
                    <div className="form-label-skeleton"></div>
                    <div className="form-input-skeleton"></div>
                  </div>

                  <div className="form-group-skeleton">
                    <div className="form-label-skeleton"></div>
                    <div className="form-input-skeleton"></div>
                  </div>

                  <div className="form-group-skeleton">
                    <div className="form-label-skeleton"></div>
                    <div className="form-input-skeleton"></div>
                  </div>

                  <div className="form-group-skeleton">
                    <div className="form-label-skeleton"></div>
                    <div className="form-textarea-skeleton"></div>
                  </div>

                  <div className="form-button-skeleton"></div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="fallback-loader">
            <Loader className="spinner" size={40} />
            <p>Loading...</p>
          </div>
        );
    }
  };

  return <div className="suspense-fallback">{renderFallbackContent()}</div>;
};

export default SuspenseFallback;
