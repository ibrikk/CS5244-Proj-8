import React, { useState } from "react";

import "../assets/css/CheckoutPopUp.css";
import { Barcode } from "lucide-react";

const CheckoutPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCheckout = () => setIsOpen(!isOpen);

  return (
    <div>
      <button onClick={toggleCheckout} className="open-checkout-btn">
        Checkout &nbsp; <Barcode />
      </button>

      {isOpen && <div className="overlay" onClick={toggleCheckout}></div>}

      <div className={`checkout-panel ${isOpen ? "open" : ""}`}>
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button
            onClick={toggleCheckout}
            className="close-btn"
            aria-label="Close checkout"
          >
            &times;
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="checkout-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Ibrahim Khalilov"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="ibrahimk@vt.edu"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              placeholder="123 Main St, Virginia, United States"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="card">Card Number</label>
            <input
              id="card"
              type="text"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiry">Expiry Date</label>
              <input id="expiry" type="text" placeholder="MM/YY" required />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input id="cvv" type="text" placeholder="123" required />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPopup;
