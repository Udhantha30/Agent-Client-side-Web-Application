import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/SearchPage.css";
import Nav from "../components/Nav";

const PropertyForSale = () => {
  const location = useLocation();
  const { filteredProperties, searchQuery } = location.state;
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("Any");
  const [selectedMinPrice, setSelectedMinPrice] = useState("No Min");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("No Max");
  const [selectedMinBedrooms, setSelectedMinBedrooms] = useState("No Min");
  const [selectedMaxBedrooms, setSelectedMaxBedrooms] = useState("No Max");
  const [dateAdded, setDateAdded] = useState("");
  const [postCode, setPostCode] = useState("");
  const [noResults, setNoResults] = useState(false);

  const uniqueLocations = [
    ...new Set(filteredProperties.map((property) => property.cityortown)),
  ];

  const handleFindProperties = () => {
    const filteredResults = filteredProperties.filter((property) => {
      const matchesLocation =
        selectedLocation === "" ||
        property.cityortown.toLowerCase() === selectedLocation.toLowerCase();
      const matchesPropertyType =
        selectedPropertyType === "Any" ||
        property.type.toLowerCase() === selectedPropertyType.toLowerCase();
      const matchesPrice =
        (selectedMinPrice === "No Min" ||
          parseInt(property.price.replace(/,/g, "")) >=
            parseInt(selectedMinPrice.replace(/,/g, ""))) &&
        (selectedMaxPrice === "No Max" ||
          parseInt(property.price.replace(/,/g, "")) <=
            parseInt(selectedMaxPrice.replace(/,/g, "")));
      const matchesBedrooms =
        (selectedMinBedrooms === "No Min" ||
          parseInt(property.bedrooms) >= parseInt(selectedMinBedrooms)) &&
        (selectedMaxBedrooms === "No Max" ||
          parseInt(property.bedrooms) <= parseInt(selectedMaxBedrooms));
      const matchesDateAdded =
        !dateAdded || new Date(property.dateAdded) >= new Date(dateAdded);
      const matchesPostCode = !postCode || property.postcode === postCode;

      return (
        matchesLocation &&
        matchesPropertyType &&
        matchesPrice &&
        matchesBedrooms &&
        matchesDateAdded &&
        matchesPostCode
      );
    });

    if (filteredResults.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
      navigate("/result-property-to-sale", {
        state: { filteredResults },
      });
    }
  };

  return (
    <>
      <Nav />
      <div className="con-1">
        <div className="con-2">
          <div className="con-3">
            <h2>Properties for Sale</h2>
            <h3>
              {filteredProperties.length} places matched with "{searchQuery}"
            </h3>
          </div>
          <div className="con-4">
            <div className="con-5">
              <div className="con-5-a">
                <div className="con-5-a-1">
                  <label htmlFor="dropdown-location">
                    Choose Your Location:
                  </label>
                </div>
                <div className="con-5-a-2">
                  {/* Unique city or town names for dropdown options */}
                  <select
                    id="dropdown-location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">Any</option>
                    {uniqueLocations.map((location, index) => (
                      <option key={index} value={location}>
                        {location.charAt(0).toUpperCase() + location.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="con-5-b">
                <div className="con-5-a-1 marg">
                  <label htmlFor="dropdown-property-type">Property Type:</label>
                </div>
                <div className="con-5-a-2">
                  <select
                    id="dropdown-property-type"
                    value={selectedPropertyType}
                    onChange={(e) => setSelectedPropertyType(e.target.value)}
                  >
                    <option value="Any">Any</option>
                    <option value="House">House</option>
                    <option value="Flat / Apartments">Flat / Apartments</option>
                    <option value="Land">Land</option>
                    <option value="Commercial Property">
                      Commercial Property
                    </option>
                    <option value="Bungalows">Bungalows</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="con-5">
              <div className="con-5-a">
                <div className="con-5-a-1">
                  <label htmlFor="dropdown-min-price">Price Range (Rs):</label>
                </div>
                <div className="con-5-a-2 twodrop">
                  <select
                    id="dropdown-min-price"
                    value={selectedMinPrice}
                    onChange={(e) => setSelectedMinPrice(e.target.value)}
                  >
                    <option value="No Min">No Min</option>
                    <option value="300,000">300,000</option>
                    <option value="425,000">425,000</option>
                    <option value="650,000">650,000</option>
                    <option value="700,000">700,000</option>
                    <option value="800,000">800,000</option>
                  </select>
                  <select
                    id="dropdown-max-price"
                    value={selectedMaxPrice}
                    onChange={(e) => setSelectedMaxPrice(e.target.value)}
                  >
                    <option value="No Max">No Max</option>
                    <option value="350,000">350,000</option>
                    <option value="400,000">400,000</option>
                    <option value="700,000">700,000</option>
                    <option value="900,000">900,000</option>
                    <option value="1,000,000">1,000,000</option>
                  </select>
                </div>
              </div>

              <div className="con-5-b">
                <div className="con-5-a-1 marg">
                  <label htmlFor="dropdown-min-bedrooms">
                    No. of Bedrooms:
                  </label>
                </div>
                <div className="con-5-a-2 twodrop">
                  <select
                    id="dropdown-min-bedrooms"
                    value={selectedMinBedrooms}
                    onChange={(e) => setSelectedMinBedrooms(e.target.value)}
                  >
                    <option value="No Min">No Min</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <select
                    id="dropdown-max-bedrooms"
                    value={selectedMaxBedrooms}
                    onChange={(e) => setSelectedMaxBedrooms(e.target.value)}
                  >
                    <option value="No Max">No Max</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="con-5">
              <div className="con-5-a">
                <div className="con-5-a-1">
                  <label htmlFor="date-picker">Added to Site:</label>
                </div>
                <div className="con-5-a-2">
                  <input
                    type="date"
                    id="date-picker"
                    className="date-picker"
                    value={dateAdded}
                    onChange={(e) => setDateAdded(e.target.value)}
                  />
                </div>
              </div>
              <div className="con-5-b">
                <div className="con-5-a-1 marg">
                  <label htmlFor="post-code">Post Code:</label>
                </div>
                <div className="con-5-a-2 twodrop">
                  <input
                    type="text"
                    id="post-code"
                    placeholder="Ex: 12520,11000"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="con-5 search-bttn">
              <button onClick={handleFindProperties}>Find Properties</button>
            </div>
          </div>
        </div>
      </div>

      {noResults && (
        <div className="error-con">
          <i className="ri-close-line" onClick={() => setNoResults(false)}></i>
          <p>No properties matched your search criteria.</p>
          <button onClick={() => setNoResults(false)}>Filter Again</button>
        </div>
      )}
    </>
  );
};

export default PropertyForSale;
