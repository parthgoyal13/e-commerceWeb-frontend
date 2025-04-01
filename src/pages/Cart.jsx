import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
} from "../redux/cartSlice";
import Header from "../components/Header";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const handleIncrease = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrease = (product) => {
    if (product.quantity > 1) {
      dispatch(
        updateCartQuantity({ _id: product._id, quantity: product.quantity - 1 })
      );
    } else {
      dispatch(removeFromCart(product));
    }
  };

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const totalPrice = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center">My Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="row">
            {cart.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p>Price: ₹{product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleDecrease(product)}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleIncrease(product)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => handleRemove(product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="mt-4 p-3 border rounded shadow">
            <h4>Total Price: ₹{totalPrice.toFixed(2)}</h4>
            <button className="btn btn-success">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
