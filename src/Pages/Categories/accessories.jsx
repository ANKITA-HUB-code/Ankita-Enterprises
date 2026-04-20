const Accessories = () => {
  const products = [
    { name: "Nike Cap", price: "₹1,299", image: "/images/accessory1.jpg" },
    { name: "Gym Duffle Bag", price: "₹2,199", image: "/images/accessory2.jpg" },
  ];

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="category-container">
      <h2 className="category-title">Accessories</h2>
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

export default Accessories;
