const Apparel = () => {
  const products = [
    { name: "Nike Sports Tee", price: "₹2,499", image: "/images/apparel1.jpg" },
    { name: "Athletic Track Jacket", price: "₹3,999", image: "/images/apparel2.jpg" },
  ];

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="category-container">
      <h2 className="category-title">Apparel</h2>
      <div className="product-grid">
        {products.map((item, idx) => (
          <div key={idx} className="product-card">
            <img src={item.image} alt={item.name} className="product-image" />
            <h3 className="product-name">{item.name}</h3>
            <p className="product-price">{item.price}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apparel;
