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
      <div className="container mt-5">
        <h3 className="text-center fw-bold mb-4">MY CART ({cart.length})</h3>
        {cart.length === 0 && !loading ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="row justify-content-between">
            <div className="col-md-7">
              {loading ? (
                <p className="text-center">Loading your cart items...</p>
              ) : (
                cart.map((product) => (
                  <div
                    key={product._id}
                    className="d-flex border rounded p-3 mb-3 shadow-sm align-items-start"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="me-3"
                      style={{ width: "150px", height: "auto" }}
                    />
                    <div>
                      <h5>{product.name}</h5>
                      <p className="fw-bold fs-5">
                        ₹{product.price}{" "}
                        <span className="text-muted text-decoration-line-through fs-6">
                          ₹3999
                        </span>
                      </p>

                      <div className="d-flex align-items-center mb-2">
                        <span className="me-2">Quantity:</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleDecrease(product)}
                        >
                          -
                        </button>
                        <span className="mx-2">{product.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleIncrease(product)}
                        >
                          +
                        </button>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleRemove(product)}
                        >
                          Remove From Cart
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleMoveToWishlist(product)}
                        >
                          Move to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="col-md-4">
              <div className="border rounded p-4 shadow">
                <h5 className="fw-bold mb-3">PRICE DETAILS</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Price ({cart.length} item)</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Delivery Charges</span>
                  <span>₹499</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>TOTAL AMOUNT</span>
                  <span>₹{(totalPrice + 499).toFixed(0)}</span>
                </div>
                <Link to="/checkout">
                  <button
                    className="btn btn-primary w-100"
                    disabled={loading || cart.length === 0}
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </Link>
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
