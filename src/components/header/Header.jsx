import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import "./header.css";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import SearchBar from "../search-bar/SearchBar";
import LoginModal from "../login-modal/LoginModal";

const Header = ({ restaurants }) => {
  const { cartItems } = useContext(CartContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
          <SearchBar restaurants={restaurants} />
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
          <SearchBar restaurants={restaurants} />
        </div>

        <div className="header-actions">
          {isLoggedIn ? (
            <div className="user-menu">
              <div className="user-info">
                <User size={20} />
                <span className="user-name">{user.name}</span>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                <LogOut size={20} />
                <span className="logout-text">Logout</span>
              </button>
            </div>
          ) : (
            <button className="login-button" onClick={openLoginModal}>
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
