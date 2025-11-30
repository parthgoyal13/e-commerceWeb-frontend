import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemToCart,
  fetchCart,
  updateCartQuantity,
} from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems: cart, loading } = useSelector((state) => state.cart);

  const handleIncrease = (product) => {
    const updatedProduct = { ...product, quantity: 1 };
    dispatch(addItemToCart(updatedProduct));
    toast.success(`${product.name} quantity increased`);
  };

  const handleDecrease = (product) => {
    if (product.quantity > 1) {
      dispatch(
        updateCartQuantity({ _id: product._id, quantity: product.quantity - 1 })
      );
      toast.info(`${product.name} quantity decreased`);
    } else {
      dispatch(removeItemToCart(product._id));
      toast.warn(`${product.name} removed from cart`);
    }
  };

  const handleRemove = (product) => {
    dispatch(removeItemToCart(product._id));
    toast.error(`${product.name} removed from cart`);
  };

  const handleMoveToWishlist = (product) => {
    dispatch(addToWishlist(product));
    dispatch(removeItemToCart(product._id));
    toast.success(`${product.name} moved to wishlist`);
  };

  const totalPrice = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  useEffect(() => {
    toast.info("Cart loaded");
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">My Cart ({cart.length})</h2>
        {cart.length === 0 && !loading ? (
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-sm">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-cart-x" style={{ color: "#075985", fontSize: "3rem", marginBottom: "1rem" }}></i>
                  <h5 className="mb-2">Your cart is empty</h5>
                  <p className="text-muted mb-3">Add some products to your cart!</p>
                  <Link to="/shop" className="btn" style={{
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
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row justify-content-between">
            <div className="col-md-7">
              {loading ? (
                <div className="text-center">
                  <p>Loading your cart items...</p>
                </div>
              ) : (
                cart.map((product) => (
                  <div
                    key={product._id}
                    className="card shadow-sm mb-3"
                  >
                    <div className="card-body p-3">
                      <div className="d-flex align-items-start">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="me-3 rounded"
                          style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                        <div className="flex-grow-1">
                          <h5 className="mb-2">{product.name}</h5>
                          <p className="fw-bold fs-5 mb-2">
                            ₹{product.price}
                            <span className="text-muted text-decoration-line-through fs-6 ms-2">
                              ₹3999
                            </span>
                          </p>

                          <div className="d-flex align-items-center mb-3">
                            <span className="me-2 text-muted">Quantity:</span>
                            <button
                              className="btn btn-sm"
                              style={{
                                backgroundColor: "#075985",
                                color: "#ffffff",
                                borderColor: "#075985",
                                width: "30px",
                                height: "30px",
                                padding: "0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#0c4a6e";
                                e.target.style.borderColor = "#0c4a6e";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#075985";
                                e.target.style.borderColor = "#075985";
                              }}
                              onClick={() => handleDecrease(product)}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <span className="mx-3 fw-bold">{product.quantity}</span>
                            <button
                              className="btn btn-sm"
                              style={{
                                backgroundColor: "#075985",
                                color: "#ffffff",
                                borderColor: "#075985",
                                width: "30px",
                                height: "30px",
                                padding: "0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#0c4a6e";
                                e.target.style.borderColor = "#0c4a6e";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#075985";
                                e.target.style.borderColor = "#075985";
                              }}
                              onClick={() => handleIncrease(product)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                          <div className="d-flex gap-2 flex-wrap">
                            <button
                              className="btn btn-sm"
                              style={{
                                backgroundColor: "#dc3545",
                                color: "#ffffff",
                                borderColor: "#dc3545",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#c82333";
                                e.target.style.borderColor = "#c82333";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#dc3545";
                                e.target.style.borderColor = "#dc3545";
                              }}
                              onClick={() => handleRemove(product)}
                            >
                              <i className="bi bi-trash me-1"></i>
                              Remove
                            </button>
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
                              onClick={() => handleMoveToWishlist(product)}
                            >
                              <i className="bi bi-heart me-1"></i>
                              Move to Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-receipt me-2" style={{ color: "#075985" }}></i>
                    Price Details
                  </h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Price ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                    <span className="fw-bold">₹{totalPrice}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Delivery Charges</span>
                    <span className="fw-bold">₹499</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold mb-3 fs-5">
                    <span>TOTAL AMOUNT</span>
                    <span style={{ color: "#075985" }}>₹{(totalPrice + 499).toFixed(0)}</span>
                  </div>
                  <Link to="/checkout" className="text-decoration-none">
                    <button
                      className="btn w-100"
                      style={{
                        backgroundColor: "#075985",
                        color: "#ffffff",
                        borderColor: "#075985",
                      }}
                      disabled={loading || cart.length === 0}
                      onMouseEnter={(e) => {
                        if (!loading && cart.length > 0) {
                          e.target.style.backgroundColor = "#0c4a6e";
                          e.target.style.borderColor = "#0c4a6e";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading && cart.length > 0) {
                          e.target.style.backgroundColor = "#075985";
                          e.target.style.borderColor = "#075985";
                        }
                      }}
                    >
                      <i className="bi bi-arrow-right-circle me-2"></i>
                      Proceed to Checkout
                    </button>
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

export default Cart;
