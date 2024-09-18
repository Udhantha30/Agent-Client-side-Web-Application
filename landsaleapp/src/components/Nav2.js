import React, { useState, useEffect, useRef } from "react";
import "../css/Nav2.css";
import { useLocation } from "react-router-dom";

const Nav2 = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const location = useLocation();
  const { filteredResults } = location.state;
  const dropdownRef = useRef(null);

  const uniqueLocations = [
    ...new Set(filteredResults.map((property) => property.cityortown)),
  ];
  const locationsString = uniqueLocations.join(" , ");

  const uniquePropertyType = [
    ...new Set(filteredResults.map((property) => property.type)),
  ];
  const PropertyString = uniquePropertyType.join(" , ");

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      // Attach event listener when dropdown is visible
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div className="nav-con-1">
      <div className="nav-con-2">
        <div className="nav-con-2-i">
          <i className="ri-map-pin-line"></i> {locationsString}
        </div>
        <div className="nav-con-2-ii">
          <i className="ri-community-line"></i>
          {PropertyString}
        </div>
        <div className="nav-con-2-v">
          <i class="ri-heart-line"></i> Save
        </div>

        <div className="nav-con-2-iv">
          <i className="ri-filter-line"></i> Filter
        </div>

        <div
          className="nav-con-2-iii"
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          <i className="ri-sort-desc"></i> Sort By
          <i
            className={
              isDropdownVisible ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
            }
          ></i>
        </div>
      </div>
      {isDropdownVisible && (
        <div className="dropdown" ref={dropdownRef}>
          <ul>
            <li>Highest Price</li>
            <li>Lowest Price</li>
            <li>Newest Listed</li>
            <li>Oldest Listed</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav2;
