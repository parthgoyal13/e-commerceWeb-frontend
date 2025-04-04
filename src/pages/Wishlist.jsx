import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/wishlistSlice";
import Header from "../components/Header";
import { addItemToCart, updateCartQuantity } from "../redux/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.cartItems);

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
                    className="card-img-top"
                    alt="product"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p>Price: {product.price}</p>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => dispatch(toggleWishlist(product))}
                    >
                      Remove from Wishlist
                    </button>
                    <button
                      className="btn btn-primary"
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
                        } else {
                          dispatch(addItemToCart({ ...product, quantity: 1 }));
                        }
                      }}
                    >
                      {cart.find((item) => item._id === product._id)
                        ? `Increase Quantity (${
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
