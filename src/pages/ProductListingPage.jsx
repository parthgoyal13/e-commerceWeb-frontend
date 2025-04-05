import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { toggleWishlist } from "../redux/wishlistSlice";
import {
  fetchProducts,
  setPrice,
  setRating,
  setSubcategory,
  setSortByPrice,
  clearFilters,
} from "../redux/productsSlice";
import {
  fetchCart,
  addItemToCart,
  removeItemToCart,
  updateCartQuantity,
} from "../redux/cartSlice";

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();

  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.cartItems);

  const { products, status, error, price, rating, subcategory, sortByPrice } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (category === "Home") {
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
  }, [dispatch, category, price, rating, subcategory, sortByPrice]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart({ ...product })); // ✅ action dispatch
  };

  const isInCart = (name) => {
    return cart.some((item) => item.name === name);
  };

  if (status === "loading") {
    return <h2>Loading products...</h2>;
  }
  if (error) {
    return <h2>Error: {error}</h2>;
  }
  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Products in {category}</h2>

        <div className="row">
          <div className="col-md-3">
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
                <br />
              </section>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row">
              {" "}
              {products.map((product) => (
                <div className="col-md-4 mb-4 flex" key={product._id}>
                  <div className="card h-100">
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

                      {isInCart(product.name) ? ( // ✅ match by name here
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListingPage;
