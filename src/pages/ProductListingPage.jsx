import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
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
    } else if (category === "Home") {
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

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Products in {category}</h2>

        <div className="row">
          <div className="col-12 d-md-none">
            <button
              className="btn btn-outline-secondary w-100 mb-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#filterCollapse"
              aria-expanded="false"
              aria-controls="filterCollapse"
            >
              Filters
            </button>
          </div>

          <div
            className="col-md-3"
            style={{ maxWidth: "250px", background: "white" }}
          >
            <div id="filterCollapse" className="collapse d-md-block">
              <div className="p-3 border bg-light position-relative">
                <h3>Filters</h3>
                <Link
                  className="d-block text-end"
                  onClick={() => dispatch(clearFilters())}
                >
                  Clear filter
                </Link>

                <section className="mb-3 position-relative">
                  <h5>Price</h5>
                  <div className="d-flex justify-content-between position-relative w-100">
                    <span className="position-absolute start-0 translate-middle-x text-muted fw-light">
                      50
                    </span>
                    <span className="position-absolute start-50 translate-middle-x text-muted fw-light">
                      150
                    </span>
                    <span className="position-absolute start-100 translate-middle-x text-muted fw-light">
                      200
                    </span>
                  </div>
                  <input
                    type="range"
                    className="form-range w-100 mt-3"
                    min="50"
                    max="200"
                    step="10"
                    value={price}
                    onChange={(e) => dispatch(setPrice(Number(e.target.value)))}
                  />
                  <p>Selected Price: {price}</p>
                </section>

                <section className="mb-3">
                  <h5>Sub Category</h5>
                  {["Summer", "Winter", "Formal"].map((sub) => (
                    <div key={sub}>
                      <input
                        type="checkbox"
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
                      />{" "}
                      {sub}
                    </div>
                  ))}
                </section>

                <section className="mb-3">
                  <h5>Rating</h5>
                  {[5, 4, 3, 2].map((rate) => (
                    <div key={rate}>
                      <input
                        type="radio"
                        name="rating"
                        value={rate}
                        checked={rating === rate}
                        onChange={() => dispatch(setRating(rate))}
                      />{" "}
                      {"⭐".repeat(rate)}
                    </div>
                  ))}
                </section>

                <section className="mb-3">
                  <h5>Sort by Price</h5>
                  <input
                    type="radio"
                    name="sortByPrice"
                    value="lowToHigh"
                    checked={sortByPrice === "lowToHigh"}
                    onChange={(e) => dispatch(setSortByPrice(e.target.value))}
                  />{" "}
                  Low to High <br />
                  <input
                    type="radio"
                    name="sortByPrice"
                    value="highToLow"
                    checked={sortByPrice === "highToLow"}
                    onChange={(e) => dispatch(setSortByPrice(e.target.value))}
                  />{" "}
                  High to Low
                </section>
              </div>
            </div>
          </div>

          <div className="col-md-9 card px-3 py-3">
            <div className="row">
              {status === "loading" ? (
                <h4 className="text-center">Loading products...</h4>
              ) : error ? (
                <h4 className="text-danger text-center">Error: {error}</h4>
              ) : products.length === 0 ? (
                <h4 className="text-center">No products found.</h4>
              ) : (
                products.map((product) => (
                  <div className="col-md-4 mb-4" key={product._id}>
                    <div className="card h-100 position-relative">
                      <Link
                        to={`/product/${product._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <img
                          src={product.image}
                          className="card-img-top img-fluid"
                          alt="productImg"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </Link>

                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{product.name}</h5>
                        <p>Price: {product.price}</p>
                        <p>Rating: {product.rating} ⭐</p>

                        {isInCart(product.name) ? (
                          <button
                            className="btn btn-success me-2"
                            onClick={() => navigate("/cart")}
                          >
                            Go to Cart
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </button>
                        )}

                        <button
                          className="btn btn-light position-absolute top-0 end-0 m-2"
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
                                : "bi bi-heart"
                            }
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListingPage;
