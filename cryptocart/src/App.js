import React, { useEffect, useState } from "react";
import "./App.css"

const App = () => {
  const [cryptoCurrency, setCryptoCurrency] = useState([
    { name: "Bitcoin", price: 40000, quantity: 0 },
    { name: "Ethereum", price: 2800, quantity: 0 },
    { name: "Litecoin", price: 150, quantity: 0 },
  ]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleQuantityClick = (index) => {
    const updatedCryptoCurrency = [...cryptoCurrency];
    updatedCryptoCurrency[index].quantityInputVisible = true;
    setCryptoCurrency(updatedCryptoCurrency);
  };

  const addtoCart = (index) => {
    const object = { ...cryptoCurrency[index] };

    if (!object.quantity || object.quantity <= 0) {
      setErrorMessage("Please enter a valid quantity.");
      return;
    }
    setErrorMessage("");

    const existingCartItem = cart.find((item) => item.name === object.name);
    if (existingCartItem) {
      existingCartItem.quantity = object.quantity;
      existingCartItem.totalPrice = object.quantity * object.price;
      setCart([...cart]);
    } else {
      const newItem = {
        ...object,
        totalPrice: object.quantity * object.price,
      };
      setCart([...cart, newItem]);
    }
  };

  const removeCartItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cart]);

  return (
    <>
      <div className="crypto-main">
        <h1>Crypto Purchase Interface</h1>
        <div className="crypto-container">
          {cryptoCurrency.map((crypto, index) => (
            <div key={index}>
              <div className="crypto_name_price">
                <h4>{crypto.name}</h4>
                <h6>${crypto.price}</h6>
              </div>
              <div className="crypto_name_price">
                {crypto.quantityInputVisible ? (
                  <input
                    type="number"
                    placeholder="Quantity"
                    onChange={(e) => {
                      const updatedCryptoCurrency = [...cryptoCurrency];
                      updatedCryptoCurrency[index].quantity = parseInt(
                        e.target.value
                      );
                      setCryptoCurrency(updatedCryptoCurrency);
                    }}
                  />
                ) : (
                  <button onClick={() => handleQuantityClick(index)}>
                    Quantity
                  </button>
                )}
                <button onClick={() => addtoCart(index)}>Buy</button>
              </div>
            </div>
          ))}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <h2>Your Cart</h2>
        <div>
          {cart.length === 0 ? (
            <p>Your Cart Is Empty</p>
          ) : (
            <div className="crypto-container">
              {cart.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="crypto_name_price">
                      <h4>{item.name}</h4>
                      <button onClick={() => removeCartItem(index)}>
                        remove
                      </button>
                    </div>
                    <div className="crypto_name_price">
                      <p>Quantity: {item.quantity}</p>
                      <p>Total Price: {item.totalPrice}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {totalPrice > 0 && <p>Total Cart Price: ${totalPrice}</p>}
      </div>
    </>
  );
};

export default App;
