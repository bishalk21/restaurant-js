import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import "./not-found-page.css";
import { useRouteError } from "react-router-dom";

const NotFoundPage = () => {
  const error = useRouteError();
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-alert-triangle error-illustration"
              width="100"
              height="100"
              alt={error?.statusText || "Page Not Found"}
            >
              <path d="M10.29 3.86L1.29 20.14A2 2 0 0 0 3.14 22h17.72a2 2 0 0 0 1.85-1.86L13.71 3.86a2 2 0 0 0-3.42-1.72z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12" y2="17"></line>
            </svg>
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
