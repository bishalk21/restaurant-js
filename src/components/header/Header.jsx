import { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  ShoppingBag,
  Heart,
  Clock,
  Settings,
} from "lucide-react";
import "./header.css";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import SearchBar from "../search-bar/SearchBar";
import LoginModal from "../login-modal/LoginModal";
import { useOnlineStatus } from "../../context/OnlineStatus";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const onlineStatus = useOnlineStatus();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    // Close the mobile menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link to="/" className="logo">
          <h1>Hamro Bhojan</h1>
        </Link>

        <div className="mobile-search">
          <SearchBar />
        </div>

        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="desktop-search">
          <SearchBar />
        </div>

        <div className="header-actions">
          {isLoggedIn && onlineStatus ? (
            <div className="user-menu-container" ref={userMenuRef}>
              <button
                className="user-menu-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
                <ChevronDown
                  size={16}
                  className={`dropdown-icon ${isUserMenuOpen ? "open" : ""}`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <div className="user-dropdown-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-dropdown-info">
                      <span className="user-dropdown-name">{user.name}</span>
                      <span className="user-dropdown-email">{user.email}</span>
                    </div>
                  </div>

                  <div className="user-dropdown-divider"></div>

                  <ul className="user-dropdown-menu">
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User size={16} />
                        <span>My Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ShoppingBag size={16} />
                        <span>My Orders</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/favorites"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Heart size={16} />
                        <span>Favorites</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/history"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Clock size={16} />
                        <span>Order History</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </Link>
                    </li>
                  </ul>

                  <div className="user-dropdown-divider"></div>

                  <button className="logout-button" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="login-button"
              onClick={openLoginModal}
              disabled={!onlineStatus}
            >
              Login
            </button>
          )}

          <Link to="/cart" className="cart-icon">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </header>
  );
};

export default Header;
