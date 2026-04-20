import { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const categories = ["Shoes", "Apparel", "Accessories", "New Arrivals"];

  return (
    <main className="hero container">
      <div className="hero-content">
        <h1>YOU<br /> DESERVE <br /> THE BEST</h1>
        <p>
          Where style meets serenity.....<br/>
          ~Soft textures. Rich tones. Lasting impressions.<br/>
          You weren’t made to blend in!
        </p>
        <div className="hero-button">
          <Link to="/category/shoes" className="btn">Shop Now</Link>


          <div className="dropdown-wrapper">
            <button className="btn secondary-btn" onClick={toggleDropdown}>
              Category ▾
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                {categories.map((cat, index) => (
                  <li key={index}>
                    <Link to={`/category/${cat.toLowerCase()}`} onClick={() => setDropdownOpen(false)}>
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="shopping">
          <p>Also Available On</p>
        </div>
        <div className="brand-icons">
          <img src="/images/amazon.png" alt="Amazon logo" />
          <img src="/images/flipkart.png" alt="Flipkart logo" />
        </div>
      </div>
      <div className="hero-image">
        <img src="/images/shoe_image.png" alt="Shoe" />
      </div>
    </main>
  );
};

export default Hero;
