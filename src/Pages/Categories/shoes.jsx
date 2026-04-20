import { useEffect, useState } from "react";

const Shoes = () => {
  const products = [
    { name: "Nike Air Max 270", price: "₹9,999", image: "/images/shoe1.jpg" },
    { name: "Nike Revolution 6", price: "₹4,299", image: "/images/shoe2.jpg" },
  ];

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="category-container">
      <h2 className="category-title">Shoes</h2>
      <div className="product-grid">
        {products.map((item, idx) => (
          <div key={idx} className="product-card flex flex-col bg-white rounded shadow p-4">
            <div className="h-60 w-full overflow-hidden mb-3 flex justify-center items-center">
              <img
                src={item.image}
                alt={item.name}
                className="product-image"
              />
            </div>
            <h3 className="product-name text-lg font-medium">{item.name}</h3>
            <p className="product-price text-gray-600">{item.price}</p>
            <button
              className="add-to-cart-btn mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shoes;
