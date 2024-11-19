import React, { ChangeEvent, useContext, useState } from "react";

import "../assets/css/CheckoutPopUp.css";
import { Barcode } from "lucide-react";
import { CustomerForm, ServerErrorResponse, months, years } from "../Types";
import {
  asDollarsAndCents,
  calculateTotalQuantity,
  isCreditCard,
  isMobilePhone,
  isvalidEmail,
  subtotal,
} from "../Util";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPopup: React.FC = () => {
  const now = new Date();
  const nowYear = now.getFullYear();
  const VATAX = 5.3;

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCheckout = () => setIsOpen(!isOpen);

  const { cart, dispatch } = useContext(CartContext);

  const [formData, setFormData] = useState<CustomerForm>({
    name: "",
    address: "",
    phone: "",
    email: "",
    ccNumber: "",
    ccExpiryMonth: 0,
    ccExpiryYear: 0,
  });

  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ccNumberError, setCcNumberError] = useState("");
  // const [ccExpiryMonthError, setCcExpiryMonthError] = useState("");
  // const [ccExpiryYearError, setCcExpiryYearError] = useState("");

  // const [errors, setErrors] = useState<ServerErrorResponse>({
  //   reason: "",
  //   message: "",
  //   fieldName: "",
  //   error: false,
  // });

  enum CheckoutStatus {
    Pending = "PENDING",
    Error = "ERROR",
    OK = "OK",
  }

  const [checkoutStatus, setCheckOutStatus] = useState<CheckoutStatus | "">("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    validateField(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        if (value.length < 4 || value.length > 45) {
          setNameError("Name must be at least 4 characters long!");
        } else {
          setNameError("");
        }
        break;
      case "email":
        if (!isvalidEmail(value)) {
          setEmailError("Invalid email address!");
        } else {
          setEmailError("");
        }
        break;
      case "address":
        if (value.length < 10) {
          setAddressError("Address must be at least 10 characters long!");
        } else {
          setAddressError("");
        }
        break;
      case "phone":
        if (!isMobilePhone(value)) {
          setPhoneError("Phone number mis not valid!");
        } else {
          setPhoneError("");
        }
        break;
      case "ccNumber":
        if (!isCreditCard(value)) {
          setCcNumberError("Card number is not valid!");
        } else {
          setCcNumberError("");
        }
        break;
      case "ccExpiryMonth":
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: parseInt(value, 10),
        }));
        break;
      case "ccExpiryYear":
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: parseInt(value, 10),
        }));
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof CustomerForm] as string);
      if (
        (formData[key as keyof CustomerForm] as string).length === 0 ||
        (key === "name" && nameError) ||
        (key === "address" && addressError) ||
        (key === "phone" && phoneError) ||
        (key === "email" && emailError) ||
        (key === "ccNumber" && ccNumberError)
      ) {
        isValid = false;
      }
    });
    return isValid;
  };

  const submitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setCheckOutStatus(CheckoutStatus.Pending);
      setTimeout(() => {
        setCheckOutStatus(CheckoutStatus.OK);
        setTimeout(() => {
          navigate("/confirmation");
        }, 1000);
      }, 1000);
      // Send the data to your server
      dispatch({ type: "CLEAR" });
    } else {
      setCheckOutStatus(CheckoutStatus.Error);
      console.log("Form has errors");
    }
  };

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

        <form
          onSubmit={(e) => submitOrder(e)}
          method="post"
          className="checkout-form"
        >
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="fname"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <> {nameError && <div className="error"> {nameError}</div>}</>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="faddress"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <> {addressError && <div className="error"> {addressError}</div>}</>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="fphone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <> {phoneError && <div className="error"> {phoneError}</div>}</>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="femail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <> {emailError && <div className="error"> {emailError}</div>}</>

          <div className="form-group">
            <label htmlFor="ccNumber">Credit Card</label>
            <input
              id="ccNumber"
              type="text"
              name="ccNumber"
              value={formData.ccNumber}
              onChange={handleInputChange}
            />
          </div>
          <> {ccNumberError && <div className="error"> {ccNumberError}</div>}</>

          <div className="form-group">
            <label htmlFor="ccExpiryMonth">Expiry Month</label>
            <select
              className="checkout-select"
              id="ccExpiryMonth"
              name="ccExpiryMonth"
              value={formData.ccExpiryMonth}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Month
              </option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ccExpiryYear">Expiry Year</label>
            <select
              className="checkout-select"
              id="ccExpiryYear"
              name="ccExpiryYear"
              value={formData.ccExpiryYear}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {nowYear + year}
                </option>
              ))}
            </select>
          </div>

          <div className="total-border">
            <div className="total-container">
              <div className="items-b4tax-price">
                <span>Items ({calculateTotalQuantity(cart)}): &nbsp;</span>
                <span>{asDollarsAndCents(subtotal(cart))}</span>
              </div>
              <div className="surcharge">
                <span>Surcharge: &nbsp;</span>
                <span>{asDollarsAndCents((subtotal(cart) * VATAX) / 100)}</span>
              </div>
              <div className="total-text-price">
                <span>Total: &nbsp;</span>
                <span>
                  {asDollarsAndCents(
                    subtotal(cart) + (subtotal(cart) * VATAX) / 100
                  )}
                </span>
              </div>
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
