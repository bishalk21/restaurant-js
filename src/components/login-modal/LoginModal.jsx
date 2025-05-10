import { useState, useContext, useRef, useEffect } from "react";
import { X } from "lucide-react";
import AuthContext from "../../context/AuthContext";
import "./login-modal.css";

const LoginModal = ({ isOpen, onClose }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const modalRef = useRef(null);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Restore scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (isLoginForm) {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password length validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // In a real app, you would send this data to your backend
    // For now, we'll just simulate a successful login/signup
    if (isLoginForm) {
      // Simulate login
      login({
        email: formData.email,
        name: formData.email.split("@")[0], // Use part of email as name for demo
      });
    } else {
      // Simulate signup and then login
      login({
        email: formData.email,
        name: formData.name,
      });
    }

    // Close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="login-modal" ref={modalRef}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <h2>{isLoginForm ? "Login" : "Sign Up"}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLoginForm && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="submit-button">
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="form-switch">
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}
          <button className="switch-button" onClick={toggleForm}>
            {isLoginForm ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
