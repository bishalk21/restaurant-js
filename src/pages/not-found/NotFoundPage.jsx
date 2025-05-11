import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import "./not-found-page.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1>Page Not Found</h1>
          <p className="error-message">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="illustration">
            <img
              src="/placeholder.svg?height=250&width=250"
              alt="Page not found illustration"
              className="error-illustration"
            />
          </div>

          <div className="action-buttons">
            <Link to="/" className="home-button">
              <Home size={18} />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="back-button"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>

          <div className="suggested-links">
            <h2>You might be interested in:</h2>
            <ul>
              <li>
                <Link to="/">Explore our restaurants</Link>
              </li>
              <li>
                <Link to="/about">Learn about us</Link>
              </li>
              <li>
                <Link to="/contact">Contact our team</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
