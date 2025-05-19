import { useState, useEffect, useRef, useCallback } from "react";
import { Search } from "lucide-react";
import "./searchbar.css";
import { RESTAURANT_IMAGE_URI } from "../../utils/constants";
import { useRestaurants } from "../../context/RestaurantContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const debounceTimeOutRef = useRef(null);
  const { restaurants } = useRestaurants();
  const navigate = useNavigate();

  // debounce function to delay the search input
  const debounce = useCallback((value) => {
    if (debounceTimeOutRef.current) {
      clearTimeout(debounceTimeOutRef.current);
    }
    debounceTimeOutRef.current = setTimeout(() => {
      setDebouncedQuery(value);
      setShowSuggestions(true);
    }, 300);
  }, []);

  useEffect(() => {
    // Filter suggestions based on query
    if (debouncedQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = restaurants?.filter((item) =>
      item?.info?.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    // Remove duplicates based on name
    const uniqueIds = new Set();
    const uniquefilteredId = filtered.filter((item) => {
      const name = item?.info?.name;
      if (uniqueIds.has(name)) {
        return false; // Skip duplicate
      }
      uniqueIds.add(name);
      return true; // Keep unique item
    });
    setSuggestions(uniquefilteredId);
    setShowSuggestions(true);
  }, [debouncedQuery, restaurants]);

  // cleanup function to clear the timeout
  useEffect(() => {
    return () => {
      if (debounceTimeOutRef.current) {
        clearTimeout(debounceTimeOutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    // setQuery(e.target.value);
    const value = e.target.value;
    setQuery(value);
    debounce(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion?.info?.name);
    //  navigate to the item page
    navigate(`/restaurant/${suggestion?.info?.id}`);
    setShowSuggestions(false);
    setSuggestions([]);
    setQuery("");
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search restaurants, food, recipes..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          className="search-input"
        />
        <button
          className="search-button"
          onClick={() => setShowSuggestions(true)}
        >
          <Search size={20} />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.info.name}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <img
                src={
                  suggestion?.info?.cloudinaryImageId
                    ? `${RESTAURANT_IMAGE_URI}${suggestion?.info?.cloudinaryImageId}`
                    : suggestion?.info?.cloudinaryImageId
                }
                alt={suggestion?.info?.name}
                className="suggestion-image"
              />
              <span className="suggestion-name">{suggestion.info.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
