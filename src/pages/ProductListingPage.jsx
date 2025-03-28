import { useParams, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import {
  setSubcategory,
  setPrice,
  setRating,
  clearFilters,
} from "../redux/filtersSlice";

import Header from "../components/Header";

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products, status, error } = useSelector((state) => state.products);
  const { price, rating, subcategory } = useSelector((state) => state.filters);
  const selectedCategory = category;
  const filteredProducts = products.filter(
    (product) =>
      (category === "Home" || product.category === category) &&
      (price === 0 || product.price <= price) &&
      (rating === 0 || product.rating === rating) &&
      (subcategory.length === 0 || subcategory.includes(product.subcategory))
  );

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
        <h2 className="text-center mb-4">Products in {selectedCategory}</h2>

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
              <section className="mb-3">
                <h5>Price</h5>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  onChange={(e) => dispatch(setPrice(Number(e.target.value)))}
                />
                <div className="">
                  <span>50</span>
                  <span>150</span>
                  <span>200</span>
                </div>
                <p>Selected Price: {price}</p>
              </section>
              <section className="mb-3">
                <h5>Sub Category</h5>
                <input
                  type="checkbox"
                  value="Summer"
                  onChange={(e) => dispatch(setSubcategory(e.target.value))}
                />{" "}
                Summer <br />
                <input
                  type="checkbox"
                  value="Winter"
                  onChange={(e) => dispatch(setSubcategory(e.target.value))}
                />{" "}
                Winter <br />
                <input
                  type="checkbox"
                  value="Formal"
                  onChange={(e) => dispatch(setSubcategory(e.target.value))}
                />{" "}
                Formal <br />
              </section>
              <section className="mb-3">
                <h5>Rating</h5>
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  onChange={() => dispatch(setRating(5))}
                />{" "}
                ⭐⭐⭐⭐⭐ <br />
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  onChange={() => dispatch(setRating(4))}
                />{" "}
                ⭐⭐⭐⭐ <br />
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  onChange={() => dispatch(setRating(3))}
                />{" "}
                ⭐⭐⭐ <br />
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  onChange={() => dispatch(setRating(2))}
                />{" "}
                ⭐⭐ <br />
              </section>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row">
              {filteredProducts.map((product) => (
                <div className="col-md-4 mb-4" key={product._id}>
                  <div className="card">
                    <img
                      src={product.image}
                      className="card-img-top img-fluid"
                      alt="productImg"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p>Price: {product.price}</p>
                      <p>Rating: {product.rating} ⭐</p>
                      {/* <button
                        className="btn btn-primary me-2"
                        onClick={() => handleCartClick(product)}
                      >
                        {cart.find((item) => item.id === product.id)
                          ? "Go to Cart"
                          : "Add to Cart"}
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleWishlistClick(product)}
                      >
                        Add to Wishlist
                      </button> */}
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
