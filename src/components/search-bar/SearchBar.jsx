import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import "./searchbar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Mock data for suggestions
  const mockSuggestions = [
    { id: 1, type: "restaurant", name: "Nepali Kitchen" },
    { id: 2, type: "restaurant", name: "Himalayan Flavors" },
    { id: 3, type: "food", name: "Momo" },
    { id: 4, type: "food", name: "Dal Bhat" },
    { id: 5, type: "recipe", name: "Chicken Curry" },
    { id: 6, type: "recipe", name: "Sel Roti" },
  ];

  useEffect(() => {
    // Filter suggestions based on query
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = mockSuggestions.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
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
    setQuery(suggestion.name);
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
        <button className="search-button">
          <Search size={20} />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="suggestion-type">{suggestion.type}</span>
              <span className="suggestion-name">{suggestion.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
