const NewArrivals = () => {
  const products = [
    { name: "Nike Air Zoom Alpha", price: "₹11,499", image: "/images/new1.jpg" },
    { name: "Seamless Yoga Set", price: "₹3,599", image: "/images/new2.jpg" },
  ];

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="category-container">
      <h2 className="category-title">New Arrivals</h2>
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

export default NewArrivals;
