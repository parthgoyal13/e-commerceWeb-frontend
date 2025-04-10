import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const OrderPage = () => {
  const { order, loading, error } = useSelector((state) => state.orders || {});

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h4 className="text-center">Order Review</h4>

        {loading && <p className="text-center">Placing your order...</p>}
        {error && <p className="text-center text-danger">Error: {error}</p>}

        {order ? (
          <>
            <div className="alert alert-success text-center mt-3">
              Order Placed Successfully!
            </div>

            <div className="mt-4 mb-4">
              <h5>Delivery Address:</h5>
              <p>
                {order.address?.name}, {order.address?.street},{" "}
                {order.address?.city}, {order.address?.state} -{" "}
                {order.address?.zipCode}, {order.address?.country}
                <br />
                Phone: {order.address?.phoneNumber}
              </p>
            </div>

            <div className="row">
              {order.products.map((product, index) => {
                console.log("Product image URL:", product.image);
                return (
                  <div className="col-md-4 mb-4" key={index}>
                    <div className="card shadow-sm h-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="card-img-top"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">
                          Quantity: {product.quantity}
                          <br />
                          Price: ₹{product.price}
                          <br />
                          Total: ₹{product.price * product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <h5>Total Amount Paid: ₹{order.totalAmount}</h5>
              <p>
                Order Status: <strong>{order.status}</strong>
              </p>
            </div>
          </>
        ) : (
          <p className="text-center mt-4">No order details available.</p>
        )}
      </div>
    </>
  );
};

export default OrderPage;
