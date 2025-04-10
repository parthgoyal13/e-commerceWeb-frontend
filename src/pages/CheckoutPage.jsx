import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../redux/orderSlice";
import { clearCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const selectedAddress = useSelector((state) => state.address.selectedAddress);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
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
      totalAmount,
      address: selectedAddress,
    };

    dispatch(placeOrder(orderData))
      .unwrap()
      .then(() => {
        dispatch(clearCart());
        alert("Order Placed Successfully");
        navigate("/order", {
          state: { message: "Order Placed Successfully" },
        });
      })
      .catch((error) => {
        console.error("Failed to place order:", error);
        alert("Failed to place order. Please try again.");
        navigate("/order", {
          state: { message: "Order Placement Failed. Please try again." },
        });
      });
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center">Checkout</h2>
        <div className="row">
          <div className="col-md-8">
            <h4>Delivery Address</h4>
            {selectedAddress ? (
              <div>
                <p>
                  {selectedAddress.name}, {selectedAddress.street},{" "}
                  {selectedAddress.city}, {selectedAddress.state},{" "}
                  {selectedAddress.zipCode}, {selectedAddress.country}
                </p>
              </div>
            ) : (
              <p>No address selected.</p>
            )}

            <Link to="/address">
              <button className="btn btn-outline-primary mt-2 mb-2">
                Manage Addresses
              </button>
            </Link>
            <br />
            {cartItems.map((item) => (
              <div key={item._id} className="card mb-3">
                <div className="card-body">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />

                  <h5 className="card-title">{item.name}</h5>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h4>Total Amount: ₹{totalAmount.toFixed(2)}</h4>

            <button
              className="btn btn-success mt-3"
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0 || !selectedAddress}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
