import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import propertiesData from "../properties.json";
import "../css/Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = (searchType) => {
    if (!searchQuery.trim()) {
      setErrorMessage("Please enter a city or town to search.");
      return;
    }

    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(searchQuery)) {
      setErrorMessage("Invalid input. Only English letters are allowed.");
      return;
    }

    const filteredProperties = propertiesData.filter(
      (property) =>
        property.cityortown.toLowerCase().includes(searchQuery.toLowerCase()) &&
        property.searchprotype === searchType
    );

    if (filteredProperties.length === 0) {
      setErrorMessage(
        "Couldn't find the location you entered. Please try another location."
      );
      return;
    }

    if (searchType === "sale") {
      navigate("/property-for-sale", {
        state: { filteredProperties, searchQuery },
      });
    } else if (searchType === "rent") {
      navigate("/property-to-rent", {
        state: { filteredProperties, searchQuery },
      });
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const regex = new RegExp(query, "i");
      const filteredSuggestions = propertiesData
        .map((property) => property.cityortown)
        .filter((city) => regex.test(city))
        .filter((city, index, self) => self.indexOf(city) === index);

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  const highlightMatch = (suggestion, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    const parts = suggestion.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <Nav />
      <div className="container-1">
        <div className="container-2">
          <div className="container-3">
            <div>
              <div className="container-3-a">
                <p>Believe in finding it</p>
              </div>
              <div className="container-3-b">
                <p>with SL's largest choice of homes</p>
              </div>
              <div className="container-3-c">
                <p>Search Properties for sale and to rent</p>
                <div className="container-3-c-1">
                  <input
                    type="text"
                    placeholder="Search City or Town (Ex: Colombo, Gampaha)"
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleSearch("sale")}>For sale</button>
                  <button onClick={() => handleSearch("rent")}>To rent</button>
                </div>
                {suggestions.length > 0 && (
                  <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {highlightMatch(suggestion, searchQuery)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {errorMessage && (
                <div className="error-container">
                  <div className="error-container-1">
                    <i
                      className="ri-close-fill"
                      onClick={closeErrorMessage}
                    ></i>
                  </div>
                  <div className="error-container-2">
                    <p>{errorMessage}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
