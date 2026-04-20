import React, { useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Navigation from "./Components/Navigation";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";   
import Dashboard from "./Pages/Dashboard"; 

import Shoes from "./Pages/Categories/Shoes";
import Apparel from "./Pages/Categories/Apparel";
import Accessories from "./Pages/Categories/Accessories";
import NewArrivals from "./Pages/Categories/NewArrivals";
import Cart from "./Pages/Cart";
import PrivateRoute from "./Components/PrivateRoute";



const App = () => {
  const footerRef = useRef(null);
  const location = useLocation();

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Hide Navigation and Footer on dashboard
  const hideNavFooter = ["/dashboard"];

  const shouldHide = hideNavFooter.includes(location.pathname.toLowerCase());

  return (
    <div>
      {!shouldHide && <Navigation onContactClick={scrollToFooter} />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/category/shoes" element={<Shoes />} />
<Route path="/category/apparel" element={<Apparel />} />
<Route path="/category/accessories" element={<Accessories />} />
<Route path="/category/new arrivals" element={<NewArrivals />} />
<Route path="/cart" element={<Cart />} />
<Route
  path="/cart"
  element={
    <PrivateRoute>
      <Cart />
    </PrivateRoute>
  }
/>



      </Routes>

      {!shouldHide && <Footer ref={footerRef} />}
    </div>
  );
};

export default App;
