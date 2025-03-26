import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";

const ProductListingPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [subcategory, setSubcategory] = useState([]);

  const products = [
    // Men Category
    {
      id: 1,
      name: "Men's Jacket",
      category: "Men",
      subcategory: "Winter",
      price: 50,
      rating: 4,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/i/w/p/l-frml-st2-mayan-original-imah8yb2dgztshzs.jpeg?q=70",
    },
    {
      id: 2,
      name: "Men's T-shirt",
      category: "Men",
      subcategory: "Summer",
      price: 45,
      rating: 4,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/i/w/p/l-frml-st2-mayan-original-imah8yb2dgztshzs.jpeg?q=70",
    },
    {
      id: 3,
      name: "Men's Sweatshirt",
      category: "Men",
      subcategory: "Winter",
      price: 40,
      rating: 4,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/i/w/p/l-frml-st2-mayan-original-imah8yb2dgztshzs.jpeg?q=70",
    },
    {
      id: 4,
      name: "Men's Formal Shirt",
      category: "Men",
      subcategory: "Formal",
      price: 55,
      rating: 5,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/i/w/p/l-frml-st2-mayan-original-imah8yb2dgztshzs.jpeg?q=70",
    },

    // Women Category
    {
      id: 5,
      name: "Women's Dress",
      category: "Women",
      subcategory: "Formal",
      price: 60,
      rating: 5,
      image: "https://m.media-amazon.com/images/I/81gJiroZOcL._SY879_.jpg",
    },
    {
      id: 6,
      name: "Women's Kurti",
      category: "Women",
      subcategory: "Formal",
      price: 55,
      rating: 4,
      image: "https://m.media-amazon.com/images/I/81gJiroZOcL._SY879_.jpg",
    },
    {
      id: 7,
      name: "Women's Saree",
      category: "Women",
      subcategory: "Formal",
      price: 70,
      rating: 5,
      image: "https://m.media-amazon.com/images/I/81gJiroZOcL._SY879_.jpg",
    },
    {
      id: 8,
      name: "Women's Top",
      category: "Women",
      subcategory: "Summer",
      price: 45,
      rating: 4,
      image: "https://m.media-amazon.com/images/I/81gJiroZOcL._SY879_.jpg",
    },

    // Kids Category
    {
      id: 9,
      name: "Kids T-shirt",
      category: "Kids",
      subcategory: "Summer",
      price: 20,
      rating: 3,
      image: "https://m.media-amazon.com/images/G/31/img2020/img21/Kids/9.png",
    },
    {
      id: 10,
      name: "Kids Hoodie",
      category: "Kids",
      subcategory: "Winter",

      price: 30,
      rating: 5,
      image: "https://m.media-amazon.com/images/G/31/img2020/img21/Kids/9.png",
    },
    {
      id: 11,
      name: "Kids Jeans",
      category: "Kids",
      subcategory: "Formal",
      price: 25,
      rating: 4,
      image: "https://m.media-amazon.com/images/G/31/img2020/img21/Kids/9.png",
    },
    {
      id: 12,
      name: "Kids Shorts",
      category: "Kids",
      subcategory: "Summer",
      price: 18,
      rating: 4,
      image: "https://m.media-amazon.com/images/G/31/img2020/img21/Kids/9.png",
    },

    // Electronics Category
    {
      id: 13,
      name: "Smartphone",
      category: "Electronics",
      price: 500,
      rating: 5,
      image: "https://dummyimage.com/600x400/000/fff&text=Smartphone",
    },
    {
      id: 14,
      name: "Laptop",
      category: "Electronics",
      price: 1000,
      rating: 5,
      image: "https://dummyimage.com/600x400/000/fff&text=Laptop",
    },
    {
      id: 15,
      name: "Headphones",
      category: "Electronics",
      price: 80,
      rating: 4,
      image: "https://dummyimage.com/600x400/000/fff&text=Headphones",
    },
    {
      id: 16,
      name: "Smartwatch",
      category: "Electronics",
      price: 150,
      rating: 5,
      image: "https://dummyimage.com/600x400/000/fff&text=Smartwatch",
    },
  ];

  const selectedCategory = category;

  const filteredProducts = products.filter(
    (product) =>
      (category === "Home" || product.category === category) &&
      (price === 0 || product.price <= price) &&
      (rating === 0 || product.rating === rating) &&
      (subcategory.length === 0 || subcategory.includes(product.subcategory))
  );

  const handleSubcategoryChange = (e) => {
    const value = e.target.value;
    setSubcategory((prev) =>
      prev.includes(value)
        ? prev.filter((sub) => sub !== value)
        : [...prev, value]
    );
  };

  const handleCartClick = (product) => {
    if (cart.find((item) => item.id === product.id)) {
      navigate("/cart");
    } else {
      setCart([...cart, product]);
    }
  };

  const handleWishlistClick = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const handleClearFilterClick = () => {
    setRating(0);
    setPrice(0);
    setSubcategory([]);
  };

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
                onClick={() => handleClearFilterClick()}
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
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <div className="">
                  <span>50</span>
                  <span>150</span>
                  <span>200</span>
                </div>
                <p>Selected Price: {price}</p>
              </section>
              <section className="mb-3">
                <h5>Category</h5>
                <input
                  type="checkbox"
                  value="Summer"
                  checked={subcategory.includes("Summer")}
                  onChange={handleSubcategoryChange}
                />{" "}
                Summer <br />
                <input
                  type="checkbox"
                  value="Winter"
                  checked={subcategory.includes("Winter")}
                  onChange={handleSubcategoryChange}
                />{" "}
                Winter <br />
                <input
                  type="checkbox"
                  value="Formal"
                  checked={subcategory.includes("Formal")}
                  onChange={handleSubcategoryChange}
                />{" "}
                Formal <br />
              </section>
              <section className="mb-3">
                <h5>Rating</h5>
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  checked={rating === 5}
                  onChange={(e) => setRating(Number(e.target.value))}
                />{" "}
                ⭐⭐⭐⭐⭐ <br />
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  checked={rating === 4}
                  onChange={(e) => setRating(Number(e.target.value))}
                />{" "}
                ⭐⭐⭐⭐ <br />
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  checked={rating === 3}
                  onChange={(e) => setRating(Number(e.target.value))}
                />{" "}
                ⭐⭐⭐ <br />
              </section>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row">
              {filteredProducts.map((product) => (
                <div className="col-md-4 mb-4" key={product.id}>
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
                      <button
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
