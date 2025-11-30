import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addItemToCart, updateCartQuantity } from "../redux/cartSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    toast("Wishlist loaded successfully");
  }, []);

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">My Wishlist</h2>
        {wishlist.length === 0 ? (
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-sm">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-heart" style={{ color: "#075985", fontSize: "3rem", marginBottom: "1rem" }}></i>
                  <h5 className="mb-2">Your wishlist is empty</h5>
                  <p className="text-muted mb-0">Start adding products to your wishlist!</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            {wishlist.map((product) => {
              const cartItem = cart.find((item) => item._id === product._id);
              return (
                <div className="col-md-4 mb-4" key={product._id}>
                  <div className="card shadow-sm h-100">
                    <img
                      src={product.image}
                      className="card-img-top img-fluid"
                      alt={product.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="fw-bold fs-5 mb-3">
                        ₹{product.price}
                      </p>
                      <div className="mt-auto d-flex gap-2 flex-wrap">
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#dc3545",
                            color: "#ffffff",
                            borderColor: "#dc3545",
                            flex: "1",
                            minWidth: "100px",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#c82333";
                            e.target.style.borderColor = "#c82333";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#dc3545";
                            e.target.style.borderColor = "#dc3545";
                          }}
                          onClick={() => {
                            dispatch(removeFromWishlist(product._id));
                            toast.warn(`${product.name} removed from wishlist`);
                          }}
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
                            flex: "1",
                            minWidth: "100px",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#0c4a6e";
                            e.target.style.borderColor = "#0c4a6e";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#075985";
                            e.target.style.borderColor = "#075985";
                          }}
                          onClick={() => {
                            if (cartItem) {
                              dispatch(
                                updateCartQuantity({
                                  _id: product._id,
                                  quantity: cartItem.quantity + 1,
                                })
                              );
                              toast.info(
                                `${product.name} quantity increased in cart`
                              );
                            } else {
                              dispatch(addItemToCart({ ...product, quantity: 1 }));
                              toast.success(`${product.name} added to cart`);
                            }
                          }}
                        >
                          <i className="bi bi-cart-plus me-1"></i>
                          {cartItem
                            ? `Qty (${cartItem.quantity})`
                            : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
