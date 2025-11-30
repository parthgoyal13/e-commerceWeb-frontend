import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import {
  fetchProducts,
  setPrice,
  setRating,
  setSubcategory,
  setSortByPrice,
  clearFilters,
} from "../redux/productsSlice";
import { fetchCart, addItemToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, searchTerm } = useParams();

  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.cartItems);

  const { products, status, error, price, rating, subcategory, sortByPrice } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (searchTerm) {
      dispatch(
        fetchProducts({
          search: searchTerm,
          price,
          rating,
          subcategory,
          sort: sortByPrice,
        })
      );
    } else if (category === "Home" || category === "Shop") {
      dispatch(
        fetchProducts({ price, rating, subcategory, sort: sortByPrice })
      );
    } else {
      dispatch(
        fetchProducts({
          category,
          price,
          rating,
          subcategory,
          sort: sortByPrice,
        })
      );
    }
  }, [dispatch, category, searchTerm, price, rating, subcategory, sortByPrice]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart({ ...product }));
    toast.success(`${product.name} added to cart!`);
  };

  const isInCart = (name) => {
    return cart.some((item) => item.name === name);
  };

  const hasActiveFilters = price > 0 || rating > 0 || subcategory.length > 0 || sortByPrice !== "";

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">
          {category === "Shop" ? "All Products" : `Products in ${category}`}
        </h2>

        <div className="row">
          <div className="col-12 d-md-none mb-3">
            <button
              className="btn w-100"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#filterCollapse"
              aria-expanded="false"
              aria-controls="filterCollapse"
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
              <i className="bi bi-funnel me-2"></i>
              Filters
            </button>
          </div>

          <div className="col-md-3 mb-4 mb-md-0">
            <div id="filterCollapse" className="collapse d-md-block">
              <div className="card shadow-sm">
                <div className="card-header bg-white border-bottom-0 pb-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">
                      <i className="bi bi-funnel-fill me-2" style={{ color: "#075985" }}></i>
                      Filters
                    </h5>
                    {hasActiveFilters && (
                      <button
                        className="btn"
                        onClick={() => {
                          dispatch(clearFilters());
                          toast.info("Filters cleared");
                        }}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "#ffffff",
                          borderColor: "#dc3545",
                          fontSize: "0.7rem",
                          padding: "0.25rem 0.5rem",
                          lineHeight: "1.2",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#c82333";
                          e.target.style.borderColor = "#c82333";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#dc3545";
                          e.target.style.borderColor = "#dc3545";
                        }}
                      >
                        <i className="bi bi-x-circle" style={{ fontSize: "0.7rem" }}></i>
                        <span className="ms-1">Clear</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="card-body p-4">
                  <section className="mb-4 pb-4 border-bottom">
                    <h6 className="fw-bold mb-3 d-flex align-items-center">
                      <i className="bi bi-currency-rupee me-2" style={{ color: "#075985", fontSize: "1.1rem" }}></i>
                      Price Range
                    </h6>
                    <div className="px-2">
                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted small fw-semibold">₹50</span>
                        <span className="text-muted small fw-semibold">₹150</span>
                        <span className="text-muted small fw-semibold">₹200</span>
                      </div>
                      <input
                        type="range"
                        className="form-range"
                        style={{ accentColor: "#075985" }}
                        min="50"
                        max="200"
                        step="10"
                        value={price}
                        onChange={(e) => dispatch(setPrice(Number(e.target.value)))}
                      />
                      <div className="mt-3 text-center">
                        <span className="badge px-3 py-2" style={{ backgroundColor: "#075985", color: "#ffffff", fontSize: "0.9rem" }}>
                          <i className="bi bi-currency-rupee me-1"></i>
                          {price}
                        </span>
                      </div>
                    </div>
                  </section>

                  <section className="mb-4 pb-4 border-bottom">
                    <h6 className="fw-bold mb-3 d-flex align-items-center">
                      <i className="bi bi-tags-fill me-2" style={{ color: "#075985", fontSize: "1.1rem" }}></i>
                      Sub Category
                    </h6>
                    <div className="d-flex flex-column gap-2 px-2">
                      {["Summer", "Winter", "Formal"].map((sub) => (
                        <div key={sub} className="form-check p-2 rounded" style={{ backgroundColor: subcategory.includes(sub) ? "rgba(7, 89, 133, 0.1)" : "transparent", transition: "all 0.2s" }}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`subcategory-${sub}`}
                            value={sub}
                            checked={subcategory.includes(sub)}
                            onChange={(e) =>
                              dispatch(
                                setSubcategory({
                                  subcategory: sub,
                                  checked: e.target.checked,
                                })
                              )
                            }
                            style={{ accentColor: "#075985", cursor: "pointer" }}
                          />
                          <label className="form-check-label" htmlFor={`subcategory-${sub}`} style={{ cursor: "pointer", userSelect: "none" }}>
                            {sub}
                          </label>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mb-4 pb-4 border-bottom">
                    <h6 className="fw-bold mb-3 d-flex align-items-center">
                      <i className="bi bi-star-fill me-2" style={{ color: "#075985", fontSize: "1.1rem" }}></i>
                      Rating
                    </h6>
                    <div className="d-flex flex-column gap-2 px-2">
                      {[5, 4, 3, 2].map((rate) => (
                        <div key={rate} className="form-check p-2 rounded" style={{ backgroundColor: rating === rate ? "rgba(7, 89, 133, 0.1)" : "transparent", transition: "all 0.2s" }}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="rating"
                            id={`rating-${rate}`}
                            value={rate}
                            checked={rating === rate}
                            onChange={() => dispatch(setRating(rate))}
                            style={{ accentColor: "#075985", cursor: "pointer" }}
                          />
                          <label className="form-check-label d-flex align-items-center" htmlFor={`rating-${rate}`} style={{ cursor: "pointer", userSelect: "none" }}>
                            <span className="me-2">
                              {Array(rate).fill(0).map((_, i) => (
                                <i key={i} className="bi bi-star-fill text-warning"></i>
                              ))}
                            </span>
                            <span className="text-muted small">({rate} stars & above)</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mb-0">
                    <h6 className="fw-bold mb-3 d-flex align-items-center">
                      <i className="bi bi-sort-down me-2" style={{ color: "#075985", fontSize: "1.1rem" }}></i>
                      Sort by Price
                    </h6>
                    <div className="d-flex flex-column gap-2 px-2">
                      <div className="form-check p-2 rounded" style={{ backgroundColor: sortByPrice === "lowToHigh" ? "rgba(7, 89, 133, 0.1)" : "transparent", transition: "all 0.2s" }}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="sortByPrice"
                          id="sort-low"
                          value="lowToHigh"
                          checked={sortByPrice === "lowToHigh"}
                          onChange={(e) => dispatch(setSortByPrice(e.target.value))}
                          style={{ accentColor: "#075985", cursor: "pointer" }}
                        />
                        <label className="form-check-label d-flex align-items-center" htmlFor="sort-low" style={{ cursor: "pointer", userSelect: "none" }}>
                          <i className="bi bi-arrow-up me-2" style={{ color: "#075985" }}></i>
                          Low to High
                        </label>
                      </div>
                      <div className="form-check p-2 rounded" style={{ backgroundColor: sortByPrice === "highToLow" ? "rgba(7, 89, 133, 0.1)" : "transparent", transition: "all 0.2s" }}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="sortByPrice"
                          id="sort-high"
                          value="highToLow"
                          checked={sortByPrice === "highToLow"}
                          onChange={(e) => dispatch(setSortByPrice(e.target.value))}
                          style={{ accentColor: "#075985", cursor: "pointer" }}
                        />
                        <label className="form-check-label d-flex align-items-center" htmlFor="sort-high" style={{ cursor: "pointer", userSelect: "none" }}>
                          <i className="bi bi-arrow-down me-2" style={{ color: "#075985" }}></i>
                          High to Low
                        </label>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="card shadow-sm px-3 py-3">
              <div className="row">
                {status === "loading" ? (
                  <div className="col-12 text-center py-5">
                    <div className="spinner-border text-primary" role="status" style={{ color: "#075985" }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading products...</p>
                  </div>
                ) : error ? (
                  <div className="col-12">
                    <div className="alert alert-danger" role="alert">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Error: {error}
                    </div>
                  </div>
                ) : products.length === 0 ? (
                  <div className="col-12 text-center py-5">
                    <i className="bi bi-inbox" style={{ color: "#075985", fontSize: "3rem", marginBottom: "1rem" }}></i>
                    <h5 className="mb-2">No products found</h5>
                    <p className="text-muted">Try adjusting your filters or search terms.</p>
                  </div>
                ) : (
                  products.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                      <div className="card shadow-sm h-100 position-relative">
                        <Link
                          to={`/product/${product._id}`}
                          className="text-decoration-none text-dark"
                        >
                          <img
                            src={product.image}
                            className="card-img-top img-fluid"
                            alt={product.name}
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        </Link>

                        <button
                          className="btn btn-sm position-absolute top-0 end-0 m-2"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            border: "none",
                            borderRadius: "50%",
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                          }}
                          onClick={() => {
                            if (
                              wishlist.some((item) => item._id === product._id)
                            ) {
                              dispatch(removeFromWishlist(product._id));
                              toast.info(
                                `${product.name} removed from wishlist.`
                              );
                            } else {
                              dispatch(addToWishlist(product));
                              toast.success(
                                `${product.name} added to wishlist!`
                              );
                            }
                          }}
                        >
                          <i
                            className={
                              wishlist.some((item) => item._id === product._id)
                                ? "bi bi-heart-fill text-danger"
                                : "bi bi-heart text-dark"
                            }
                          ></i>
                        </button>

                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="fw-bold fs-5 mb-2">
                            <i className="bi bi-currency-rupee me-1"></i>
                            {product.price}
                          </p>
                          <p className="mb-3">
                            <i className="bi bi-star-fill text-warning me-1"></i>
                            {product.rating} Rating
                          </p>

                          <div className="mt-auto">
                            {isInCart(product.name) ? (
                              <button
                                className="btn w-100"
                                style={{
                                  backgroundColor: "#28a745",
                                  color: "#ffffff",
                                  borderColor: "#28a745",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = "#218838";
                                  e.target.style.borderColor = "#218838";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = "#28a745";
                                  e.target.style.borderColor = "#28a745";
                                }}
                                onClick={() => navigate("/cart")}
                              >
                                <i className="bi bi-cart-check me-2"></i>
                                Go to Cart
                              </button>
                            ) : (
                              <button
                                className="btn w-100"
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
                                onClick={() => handleAddToCart(product)}
                              >
                                <i className="bi bi-cart-plus me-2"></i>
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
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

export default ProductListingPage;
