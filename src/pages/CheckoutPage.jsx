import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../redux/orderSlice";
import { clearCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const selectedAddress = useSelector((state) => state.address.selectedAddress);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharges = 499;
  const finalAmount = totalAmount + deliveryCharges;

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.warn("Please select a delivery address.");
      return;
    }

    const orderData = {
      userId: "66127d19dd41eaf6c32d7b62",
      products: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount: finalAmount,
      address: selectedAddress,
    };

    dispatch(placeOrder(orderData))
      .unwrap()
      .then(() => {
        dispatch(clearCart());
        toast.success("Order Placed Successfully");
        navigate("/order", {
          state: { message: "Order Placed Successfully" },
        });
      })
      .catch((error) => {
        console.error("Failed to place order:", error);
        toast.error("Failed to place order. Please try again.");
        navigate("/order", {
          state: { message: "Order Placement Failed. Please try again." },
        });
      });
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">Checkout</h2>
        <div className="row">
          <div className="col-md-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-geo-alt me-2" style={{ color: "#075985" }}></i>
                  Delivery Address
                </h5>
                {selectedAddress ? (
                  <div className="p-3 border rounded" style={{ backgroundColor: "#f8f9fa" }}>
                    <div className="d-flex align-items-start">
                      <i className="bi bi-person me-3 mt-1" style={{ color: "#075985", fontSize: "1.2rem", flexShrink: 0 }}></i>
                      <div className="flex-grow-1">
                        <h6 className="fw-bold mb-2">{selectedAddress.name}</h6>
                        <p className="mb-1">
                          <i className="bi bi-house me-2" style={{ color: "#075985" }}></i>
                          {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zipCode}
                        </p>
                        <p className="mb-1">
                          <i className="bi bi-globe me-2" style={{ color: "#075985" }}></i>
                          {selectedAddress.country}
                        </p>
                        {selectedAddress.phoneNumber && (
                          <p className="mb-0">
                            <i className="bi bi-telephone me-2" style={{ color: "#075985" }}></i>
                            {selectedAddress.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    No address selected. Please select a delivery address.
                  </div>
                )}

                <Link to="/address" className="text-decoration-none">
                  <button
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#075985",
                      color: "#ffffff",
                      borderColor: "#075985",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#0c4a6e";
                      e.target.style.borderColor = "#0c4a6e";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#075985";
                      e.target.style.borderColor = "#075985";
                    }}
                  >
                    <i className="bi bi-pencil me-2"></i>
                    Manage Addresses
                  </button>
                </Link>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-bag-check me-2" style={{ color: "#075985" }}></i>
                  Order Items ({cartItems.length})
                </h5>
                {cartItems.length === 0 ? (
                  <p className="text-muted text-center">No items in cart.</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item._id} className="d-flex align-items-start mb-3 pb-3 border-bottom">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="me-3 rounded"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="fw-bold mb-2">{item.name}</h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="mb-1 fw-bold">
                              ₹{item.price} <span className="text-muted">× {item.quantity}</span>
                            </p>
                            <p className="mb-0 text-muted small">
                              Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm sticky-top" style={{ top: "20px" }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-receipt me-2" style={{ color: "#075985" }}></i>
                  Order Summary
                </h5>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Price ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                  <span className="fw-bold">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Delivery Charges</span>
                  <span className="fw-bold">₹{deliveryCharges}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold mb-4 fs-5">
                  <span>TOTAL AMOUNT</span>
                  <span style={{ color: "#075985" }}>₹{finalAmount.toFixed(2)}</span>
                </div>
                <button
                  className="btn w-100"
                  style={{
                    backgroundColor: cartItems.length === 0 || !selectedAddress ? "#6c757d" : "#075985",
                    color: "#ffffff",
                    borderColor: cartItems.length === 0 || !selectedAddress ? "#6c757d" : "#075985",
                  }}
                  onClick={handlePlaceOrder}
                  disabled={cartItems.length === 0 || !selectedAddress}
                  onMouseEnter={(e) => {
                    if (cartItems.length > 0 && selectedAddress) {
                      e.target.style.backgroundColor = "#0c4a6e";
                      e.target.style.borderColor = "#0c4a6e";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (cartItems.length > 0 && selectedAddress) {
                      e.target.style.backgroundColor = "#075985";
                      e.target.style.borderColor = "#075985";
                    }
                  }}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Place Order
                </button>
                {(!selectedAddress || cartItems.length === 0) && (
                  <p className="text-muted small text-center mt-2 mb-0">
                    {!selectedAddress && cartItems.length === 0
                      ? "Please select an address and add items to cart"
                      : !selectedAddress
                      ? "Please select a delivery address"
                      : "Your cart is empty"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
