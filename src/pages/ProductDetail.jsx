import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/productsSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { addItemToCart, updateCartQuantity } from "../redux/cartSlice";
import Header from "../components/Header";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.cartItems);

  const { product, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (status === "loading") {
    return <h2>Loading product details...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }
  if (!product) {
    return <h2>Product not found.</h2>;
  }
  const cartItem = cart.find((item) => item._id === product._id);

  const isInWishlist = wishlist.some((item) => item._id === product._id);
  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row align-items-start">
          <div className="col-md-6 position-relative">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
            />

            <button
              className="btn bg-white shadow border rounded-circle position-absolute d-flex align-items-center justify-content-center"
              onClick={handleWishlistToggle}
              style={{
                top: "20px",
                right: "20px",
                width: "50px",
                height: "50px",
                borderColor: "#ccc",
                zIndex: 2,
              }}
              title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <i
                className={
                  isInWishlist
                    ? "bi bi-heart-fill text-danger fs-4"
                    : "bi bi-heart text-secondary fs-4"
                }
              ></i>
            </button>
          </div>

          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p className="fw-bold text-success">Price: ₹{product.price}</p>
            <p>Rating: {product.rating} ⭐</p>
            <p>Description: {product.description}</p>

            <button
              className="btn btn-primary me-2"
              onClick={() => {
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
              {cartItem
                ? `Increase Quantity (${cartItem.quantity})`
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
