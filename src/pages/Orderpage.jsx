import React from "react";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className="container mt-5 text-center">
      <h4>Order Review</h4>
      {message && <p className="mt-3 alert alert-info">{message}</p>}
    </div>
  );
};

export default OrderPage;
