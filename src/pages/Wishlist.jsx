import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addItemToCart, updateCartQuantity } from "../redux/cartSlice";
import Header from "../components/Header";
import { toast } from "react-toastify";

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
      <div className="container mt-4">
        <h2 className="text-center">My Wishlist</h2>
        <div className="row">
          {wishlist.length === 0 ? (
            <p className="text-center">Your wishlist is empty.</p>
          ) : (
            wishlist.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top img-fluid"
                    alt="product"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p>Price: {product.price}</p>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => {
                        dispatch(removeFromWishlist(product._id));
                        toast.warn(`${product.name} removed from wishlist`);
                      }}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        const cartItem = cart.find(
                          (item) => item._id === product._id
                        );
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
                      {cart.find((item) => item._id === product._id)
                        ? `Increase Qty (${
                            cart.find((item) => item._id === product._id)
                              .quantity
                          })`
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
