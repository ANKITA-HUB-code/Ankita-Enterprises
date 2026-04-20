// src/Pages/Dashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtected = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/protected", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(res.data.message);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchProtected();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="logo">
          <a href="/"><img src="/images/brand_logo.png" alt="logo" /></a>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li className="dropdown-wrapper" ref={dropdownRef}>
            <span
              className="dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Shop ▶
            </span>
            {dropdownOpen && (
              <ul className="dropdown-menu right-dropdown">
                <li><Link to="/shoes" onClick={() => setDropdownOpen(false)}>Shoes</Link></li>
                <li><Link to="/apparel" onClick={() => setDropdownOpen(false)}>Apparel</Link></li>
                <li><Link to="/accessories" onClick={() => setDropdownOpen(false)}>Accessories</Link></li>
                <li><Link to="/NewArrivals" onClick={() => setDropdownOpen(false)}>New Arrivals</Link></li>
              </ul>
            )}
          </li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <section className="dashboard-content">
        <h1>Welcome back to Ankita's space ~ where Creativity meets Code</h1>
        <p className="auth-msg">{message}</p>

        <Link to="/cart" className="btn cart-btn">🛒 Go to Cart</Link>

        <div className="cards-container">
          <div className="card">
            <h2>My Orders</h2>
            <p>Track your recent purchases and deliveries.</p>
          </div>
          <div className="card">
            <h2>Wishlist</h2>
            <p>See what products you saved for later.</p>
          </div>
          <div className="card">
            <h2>Account Settings</h2>
            <p>Update your personal info and preferences.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
