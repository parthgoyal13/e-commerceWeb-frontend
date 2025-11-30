import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const OrderPage = () => {
  const { order, loading, error } = useSelector((state) => state.orders || {});

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">Order Review</h2>

        {loading && (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Placing your order...</p>
          </div>
        )}

        {error && (
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Error: {error}
              </div>
            </div>
          </div>
        )}

        {order ? (
          <>
            <div className="row justify-content-center mb-4">
              <div className="col-md-8 col-lg-6">
                <div className="alert alert-success text-center" role="alert">
                  <i className="bi bi-check-circle me-2"></i>
                  <strong>Order Placed Successfully!</strong>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-12">
                <div className="card shadow-sm">
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-3">
                      <i className="bi bi-geo-alt me-2" style={{ color: "#075985" }}></i>
                      Delivery Address
                    </h5>
                    <div className="p-3 border rounded" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="d-flex align-items-start">
                        <i className="bi bi-person me-3 mt-1" style={{ color: "#075985", fontSize: "1.2rem", flexShrink: 0 }}></i>
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-2">{order.address?.name}</h6>
                          <p className="mb-1">
                            <i className="bi bi-house me-2" style={{ color: "#075985" }}></i>
                            {order.address?.street}, {order.address?.city}, {order.address?.state} - {order.address?.zipCode}
                          </p>
                          <p className="mb-1">
                            <i className="bi bi-globe me-2" style={{ color: "#075985" }}></i>
                            {order.address?.country}
                          </p>
                          {order.address?.phoneNumber && (
                            <p className="mb-0">
                              <i className="bi bi-telephone me-2" style={{ color: "#075985" }}></i>
                              {order.address?.phoneNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-12">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-bag-check me-2" style={{ color: "#075985" }}></i>
                  Order Items ({order.products?.length || 0})
                </h5>
                <div className="row">
                  {order.products?.map((product, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                      <div className="card shadow-sm h-100">
                        <div className="card-body p-3">
                          <div className="d-flex align-items-start">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="me-3 rounded"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-2">{product.name}</h6>
                              <p className="mb-1 small text-muted">
                                <i className="bi bi-box-seam me-1"></i>
                                Quantity: {product.quantity}
                              </p>
                              <p className="mb-1 small">
                                <i className="bi bi-currency-rupee me-1"></i>
                                Price: ₹{product.price}
                              </p>
                              <p className="mb-0 fw-bold">
                                <i className="bi bi-calculator me-1" style={{ color: "#075985" }}></i>
                                Subtotal: ₹{(product.price * product.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-5">
                <div className="card shadow-sm">
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-3">
                      <i className="bi bi-receipt me-2" style={{ color: "#075985" }}></i>
                      Order Summary
                    </h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Total Items</span>
                      <span className="fw-bold">{order.products?.length || 0}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Order Status</span>
                      <span className={`badge ${order.status === 'completed' ? 'bg-success' : order.status === 'pending' ? 'bg-warning' : 'bg-info'}`}>
                        {order.status || 'Processing'}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold mb-3 fs-5">
                      <span>TOTAL AMOUNT</span>
                      <span style={{ color: "#075985" }}>₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="d-grid gap-2">
                      <Link to="/products/Shop" className="btn" style={{
                        backgroundColor: "#075985",
                        color: "#ffffff",
                        borderColor: "#075985",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#0c4a6e";
                        e.target.style.borderColor = "#0c4a6e";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#075985";
                        e.target.style.borderColor = "#075985";
                      }}>
                        <i className="bi bi-arrow-left-circle me-2"></i>
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : !loading && !error && (
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-sm">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-inbox" style={{ color: "#075985", fontSize: "3rem", marginBottom: "1rem" }}></i>
                  <h6 className="mb-2">No order details available</h6>
                  <p className="text-muted mb-3">Your order information will appear here once an order is placed.</p>
                  <Link to="/products/Shop" className="btn" style={{
                    backgroundColor: "#075985",
                    color: "#ffffff",
                    borderColor: "#075985",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#0c4a6e";
                    e.target.style.borderColor = "#0c4a6e";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#075985";
                    e.target.style.borderColor = "#075985";
                  }}>
                    <i className="bi bi-bag me-2"></i>
                    Start Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;
