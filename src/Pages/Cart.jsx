import { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items on mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const grouped = groupItems(cart);
    setCartItems(grouped);
  }, []);

  // Group duplicate items by name and add quantity
  const groupItems = (items) => {
    const grouped = {};
    items.forEach((item) => {
      if (grouped[item.name]) {
        grouped[item.name].quantity += 1;
      } else {
        grouped[item.name] = { ...item, quantity: 1 };
      }
    });
    return Object.values(grouped);
  };

  // Handle remove
  const removeItem = (itemToRemove) => {
    let fullCart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = fullCart.findIndex((item) => item.name === itemToRemove.name);
    if (index > -1) {
      fullCart.splice(index, 1); // remove one instance
      localStorage.setItem("cart", JSON.stringify(fullCart));
      setCartItems(groupItems(fullCart));
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="category-container">
      <h2 className="category-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="product-grid">
            {cartItems.map((item, idx) => (
              <div key={idx} className="product-card">
                <img src={item.image} alt={item.name} className="product-image" />
                <h3 className="product-name">{item.name}</h3>
                <p className="product-price">{item.price}</p>
                <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="total-summary">
            <h3>Total Price: ₹{totalPrice.toLocaleString()}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
