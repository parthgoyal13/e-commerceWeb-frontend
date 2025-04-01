import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/productsSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import { addToCart, updateCartQuantity } from "../redux/cartSlice";
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

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} className="img-fluid" />
        <p>Price: {product.price}</p>
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
              dispatch(addToCart({ ...product, quantity: 1 }));
            }
          }}
        >
          {cartItem
            ? `Increase Quantity (${cartItem.quantity})`
            : "Add to Cart"}
        </button>

        <button
          className={
            wishlist.some((item) => item._id === product._id)
              ? "btn btn-danger"
              : "btn btn-warning"
          }
          onClick={() => dispatch(toggleWishlist(product))}
        >
          {wishlist.some((item) => item._id === product._id)
            ? "Remove from Wishlist"
            : "Add to Wishlist"}
        </button>
      </div>
    </>
  );
};
export default ProductDetail;
