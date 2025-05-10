import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import "./searchbar.css";
import { RESTAURANT_IMAGE_URI } from "../../utils/constants";

const SearchBar = ({ restaurants }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  // const { cloudinaryImageId } = restaurants?.info;

  useEffect(() => {
    // Filter suggestions based on query
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = restaurants.filter((item) =>
      item?.info?.name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
  }, [query]);

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
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion?.info?.name);
    setShowSuggestions(false);
    // Here you would typically navigate to the item page
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
              key={suggestion.info.id}
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
