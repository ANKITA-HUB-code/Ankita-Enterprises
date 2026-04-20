// src/Components/Navigation.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navigation = ({ onContactClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const isLoginPage = location.pathname === "/login";
  const isLoggedIn = !!localStorage.getItem("token");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = [
    { label: "Shoes", path: "/category/shoes" },
    { label: "Apparel", path: "/category/apparel" },
    { label: "Accessories", path: "/category/accessories" },
    { label: "New Arrivals", path: "/category/new arrivals" }
  ];

  const handleClick = () => {
    if (isLoginPage) navigate("/register");
    else navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <nav className="container nav-bar">
      <div className="logo">
        <a href="/"><img src="/images/brand_logo.png" alt="logo" /></a>
      </div>

      <ul className="nav-links">
        <li><Link to="/dashboard">Menu</Link></li>

        <li className="dropdown-wrapper" ref={dropdownRef}>
          <button className="btn secondary-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            Category ▸
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link to={cat.path} onClick={() => setDropdownOpen(false)}>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        <li><a href="#" onClick={onContactClick}>Contact</a></li>
      </ul>

      <div className="nav-buttons">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn">Logout</button>
        ) : (
          <button onClick={handleClick} className="btn">
            {isLoginPage ? "Sign Up" : "Login"}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
