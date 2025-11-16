import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { logout } from "../redux/userAuthSlice";
import NGWLogo from "../assets/NGW_Next_Gen_Wear_logo.svg";
import Navigation from "./Navigation";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const loginDropdownRef = useRef(null);
  const loginButtonRef = useRef(null);

  const { products } = useSelector((state) => state.products);
  const { user, token } = useSelector((state) => state.auth);
  const searchResults = products.slice(0, 8);
  const isLoggedIn = !!user && !!token; 

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
      if (
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target) &&
        loginButtonRef.current &&
        !loginButtonRef.current.contains(event.target)
      ) {
        setShowLoginDropdown(false);
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
        <div className="container-fluid d-flex align-items-center">
          <Link className="navbar-brand ms-5" to="/">
            <img src={NGWLogo} alt="NGW - Next Gen Wear" height="90" />
          </Link>
          <div className="flex-grow-1 d-flex justify-content-center position-relative mx-3">
            <div className="position-relative w-100" style={{ maxWidth: "600px" }}>
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
            <div className="navbar-nav d-flex align-items-center ms-3">
              <div className="position-relative nav-link me-3">
                <button
                  ref={loginButtonRef}
                  className="d-flex align-items-center gap-2 text-dark text-decoration-none p-0 border-0 bg-transparent w-100"
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-person"></i>
                  <span>{isLoggedIn ? (user?.firstName || user?.email || "Account") : "Login"}</span>
                  <i className={`bi ${showLoginDropdown ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                </button>
                {showLoginDropdown && (
                  <div
                    ref={loginDropdownRef}
                    className="position-absolute start-0 mt-2 bg-white border rounded shadow-sm"
                    style={{ minWidth: "250px", zIndex: 1000 }}
                  >
                    {!isLoggedIn ? (
                      <>
                        <div className="p-3 d-flex justify-content-between align-items-center">
                          <span>New customer?</span>
                          <Link
                            to="/signup"
                            className="text-primary text-decoration-none border border-primary rounded px-3 py-1"
                            onClick={() => setShowLoginDropdown(false)}
                          >
                            Sign Up
                          </Link>
                        </div>
                        <hr className="my-0" />
                        <Link
                          to="/login"
                          className="d-flex align-items-center gap-3 p-3 text-decoration-none text-dark border-bottom"
                          onClick={() => setShowLoginDropdown(false)}
                          style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <i className="bi bi-box-arrow-in-right"></i>
                          <span>Login</span>
                        </Link>
                        <Link
                          to="/profile"
                          className="d-flex align-items-center gap-3 p-3 text-decoration-none text-dark border-bottom"
                          onClick={() => {
                            setShowLoginDropdown(false);
                            if (!isLoggedIn) {
                              navigate("/login");
                            }
                          }}
                          style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <i className="bi bi-person"></i>
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/order"
                          className="d-flex align-items-center gap-3 p-3 text-decoration-none text-dark border-bottom"
                          onClick={() => {
                            setShowLoginDropdown(false);
                            if (!isLoggedIn) {
                              navigate("/login");
                            }
                          }}
                          style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <i className="bi bi-box"></i>
                          <span>Orders</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          className="d-flex align-items-center gap-3 p-3 text-decoration-none text-dark"
                          onClick={() => {
                            setShowLoginDropdown(false);
                            if (!isLoggedIn) {
                              navigate("/login");
                            }
                          }}
                          style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <i className="bi bi-heart"></i>
                          <span>Wishlist</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          className="d-flex align-items-center gap-3 p-3 text-decoration-none text-dark border-bottom"
                          onClick={() => setShowLoginDropdown(false)}
                          style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <i className="bi bi-person"></i>
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/order"
                          className="d-flex align-items-center gap-3 p-3 text-decoration-none text-dark border-bottom"
                          onClick={() => setShowLoginDropdown(false)}
                          style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <i className="bi bi-box"></i>
                          <span>Orders</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          className="d-flex align-items-center gap-3 p-3 text-decoration-none text-dark border-bottom"
                          onClick={() => setShowLoginDropdown(false)}
                          style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <i className="bi bi-heart"></i>
                          <span>Wishlist</span>
                        </Link>
                        <button
                          className="d-flex align-items-center gap-3 p-3 w-100 text-start border-0 bg-transparent text-dark"
                          onClick={() => {
                            dispatch(logout());
                            setShowLoginDropdown(false);
                            navigate("/");
                          }}
                          style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <i className="bi bi-box-arrow-right"></i>
                          <span>Logout</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              <Link className="nav-link d-flex align-items-center gap-1 me-3" to="/cart">
                <i className="bi bi-cart"></i>
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Navigation />
    </header>
  );
};
export default Header;
