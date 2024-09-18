import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Nav.css";
import Logo from "../assets/logo.png";

const Nav = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const dropdownRef = useRef(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  return (
    <div className="content-0">
      <div className="content-1">
        <div className="content-2">
          <img src={Logo} alt="logo" />
        </div>
        <div className="content-3">
          <div className="content-3-a" onClick={() => handleMenuClick("buy")}>
            Buy
          </div>
          <div className="content-3-a" onClick={() => handleMenuClick("rent")}>
            Rent
          </div>
          <div
            className="content-3-a"
            onClick={() => handleMenuClick("housePrices")}
          >
            House Prices
          </div>
          <div
            className="content-3-a"
            onClick={() => handleMenuClick("findAgent")}
          >
            Find Agent
          </div>
          <div
            className="content-3-a"
            onClick={() => handleMenuClick("commercial")}
          >
            Commercial
          </div>
          <div
            className="content-3-a"
            onClick={() => handleMenuClick("inspire")}
          >
            Inspire
          </div>
          <div
            className="content-3-a"
            onClick={() => handleMenuClick("overseas")}
          >
            Overseas
          </div>
        </div>
        <div className="content-4">
          <button>
            <i className="ri-user-3-line"></i>Sign In
          </button>
        </div>
      </div>
      {activeMenu && (
        <div className="dropdown-container" ref={dropdownRef}>
          <i className="ri-close-line close-icon" onClick={() => setActiveMenu(null)}></i>
          {activeMenu === "buy" && (
            <div className="dropdown-links">
              <Link to="/buy-link-1">Buy Link 1</Link>
              <Link to="/buy-link-2">Buy Link 2</Link>
            </div>
          )}
          {activeMenu === "rent" && (
            <div className="dropdown-links">
              <Link to="/rent-link-1">Rent Link 1</Link>
              <Link to="/rent-link-2">Rent Link 2</Link>
              <Link to="/rent-link-3">Rent Link 3</Link>
            </div>
          )}
          {activeMenu === "housePrices" && (
            <div className="dropdown-links">
              <Link to="/rent-link-1">House Prices Link 1</Link>
              <Link to="/rent-link-2">House Prices Link 2</Link>
              <Link to="/rent-link-3">House Prices Link 3</Link>
            </div>
          )}
          {activeMenu === "findAgent" && (
            <div className="dropdown-links">
              <Link to="/rent-link-1">Rent Link 1</Link>
              <Link to="/rent-link-2">Rent Link 2</Link>
              <Link to="/rent-link-3">Rent Link 3</Link>
            </div>
          )}
          {activeMenu === "commercial" && (
            <div className="dropdown-links">
              <Link to="/rent-link-1">Rent Link 1</Link>
              <Link to="/rent-link-2">Rent Link 2</Link>
              <Link to="/rent-link-3">Rent Link 3</Link>
            </div>
          )}
          {activeMenu === "inspire" && (
            <div className="dropdown-links">
              <Link to="/rent-link-1">Rent Link 1</Link>
              <Link to="/rent-link-2">Rent Link 2</Link>
              <Link to="/rent-link-3">Rent Link 3</Link>
            </div>
          )}
          {activeMenu === "overseas" && (
            <div className="dropdown-links">
              <Link to="/rent-link-1">Overseas Link 1</Link>
              <Link to="/rent-link-2">Overseas Link 2</Link>
              <Link to="/rent-link-3">Overseas Link 3</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
