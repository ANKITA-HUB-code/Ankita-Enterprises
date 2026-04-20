// src/Components/Footer.jsx
import React from "react";

const Footer = React.forwardRef((props, ref) => {
  return (
    <footer ref={ref} className="footer">
      <h2>Contact Us</h2>
      <p>Email: ankitanandi@gmail.com</p>
      <p>Phone: +1 800 123 4567</p>
      <p>Address: 123 Nike Street, USA</p>
    </footer>
  );
});

export default Footer;
