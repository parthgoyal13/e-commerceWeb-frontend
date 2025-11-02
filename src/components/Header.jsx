import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import NGWLogo from "../assets/NGW_Next_Gen_Wear_logo.svg";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const { products } = useSelector((state) => state.products);
  const searchResults = products.slice(0, 8); // Limit to 8 results

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchInput.trim().length >= 2) {
      const debounceTimer = setTimeout(() => {
        dispatch(fetchProducts({ search: searchInput }));
        setShowDropdown(true);
      }, 300);

      return () => clearTimeout(debounceTimer);
    } else {
      setShowDropdown(false);
    }
  }, [searchInput, dispatch]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleResultClick = (product) => {
    navigate(`/product/${product._id}`);
    setSearchInput("");
    setShowDropdown(false);
  };

  const handleInputFocus = () => {
    if (searchInput.trim().length >= 2 && searchResults.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchInput.trim()) {
      navigate(`/search/${searchInput}`);
      setSearchInput("");
      setShowDropdown(false);
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={NGWLogo} alt="NGW - Next Gen Wear" height="90" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <div className="container-fluid position-relative mb-2 mb-lg-0">
                <div className="position-relative w-100">
                  <i 
                    className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary small"
                    style={{ pointerEvents: "none", zIndex: 1 }}
                  ></i>
                  <input
                    ref={inputRef}
                    className="form-control ps-5"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchInput}
                    onChange={handleSearchChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                  />
                  {showDropdown && searchResults.length > 0 && (
                    <div 
                      ref={dropdownRef} 
                      className="position-absolute start-0 end-0 w-100 bg-white border rounded shadow-sm overflow-auto mt-1"
                      style={{ top: "100%", maxHeight: "400px", zIndex: 1000 }}
                    >
                      {searchResults.map((product, index) => (
                        <div
                          key={product._id}
                          className={`d-flex align-items-center p-3 border-bottom ${index === searchResults.length - 1 ? 'border-bottom-0' : ''}`}
                          onClick={() => handleResultClick(product)}
                          style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="me-3 rounded"
                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                          />
                          <div className="flex-grow-1">
                            <div className="fw-bold text-dark mb-1 small">{product.name}</div>
                            <div className="small" style={{ color: "#4285f4" }}>
                              in {product.category}
                              {product.subcategory && ` > ${product.subcategory}`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/signup">
                Sign
              </Link>
              <Link className="nav-link" to="/wishlist">
                Wishlist
              </Link>
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
