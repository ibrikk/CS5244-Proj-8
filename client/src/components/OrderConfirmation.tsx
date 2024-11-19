import { useNavigate } from "react-router-dom";
import "../assets/css/OrderConfirmation.css";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <h2>Order Confirmed!</h2>
        <p>
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        {/* <p>
          Order Number: <strong>{orderNumber}</strong>
        </p> */}
        {/* <p>A confirmation email has been sent to your email address.</p> */}
        <button onClick={() => navigate("/")} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
