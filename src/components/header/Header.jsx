import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../search-bar/SearchBar";
import { ShoppingCart, Menu, X } from "lucide-react";
import "./header.css";
import CartContext from "../../context/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

        <Link to="/cart" className="cart-icon">
          <ShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
