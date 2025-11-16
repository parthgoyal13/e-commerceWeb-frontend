import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRefs = useRef({});
  const hoverTimers = useRef({});

  const menuItems = [
    {
      name: "Home",
      path: "/",
      hasDropdown: false,
    },
    {
      name: "Shop",
      path: "/products/Shop",
      hasDropdown: true,
      items: [
        {
          columns: [
            {
              title: "Shop",
              links: [
                { name: "Shop", path: "/products/Shop" },
                { name: "Men", path: "/products/Men" },
                { name: "Women", path: "/products/Women" },
                { name: "Kids", path: "/products/Kids" },
              ],
            },
            {
              title: "Layout",
              links: [
                { name: "Product Details", path: "/product" },
                { name: "Shop With Sidebar", path: "#" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Pages",
      path: "#",
      hasDropdown: true,
      isMegaMenu: true,
      items: [
        {
          columns: [
            {
              title: "Introduction",
              links: [
                { name: "Contact", path: "#" },
                { name: "About", path: "#" },
                { name: "404", path: "#" },
                { name: "Coming Soon", path: "#" },
                { name: "FAQ", path: "#" },
              ],
            },
            {
              title: "Dashboard",
              links: [
                { name: "User Interface", path: "#" },
                { name: "Orders", path: "/order" },
                { name: "Address", path: "/address" },
                { name: "Profile Details", path: "/profile" },
              ],
            },
            {
              title: "Utility",
              links: [
                { name: "Login", path: "/login" },
                { name: "Signin", path: "/signup" },
                { name: "Forget Password", path: "#" },
                { name: "Checkout", path: "/checkout" },
                { name: "Cart", path: "/cart" },
                { name: "Pricing", path: "#" },
                { name: "Confirmation", path: "#" },
              ],
            },
          ],
        },
      ],
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path !== "#") {
      if (path === "/products/Shop" || path === "/product") {
        return (
          location.pathname.startsWith("/products") ||
          location.pathname.startsWith("/product/") ||
          location.pathname === "/cart" ||
          location.pathname === "/checkout"
        );
      }
      return location.pathname.startsWith(path);
    }
    return false;
  };

  const handleNavItemMouseEnter = (menuName) => {
    if (hoverTimers.current[`${menuName}-close`]) {
      clearTimeout(hoverTimers.current[`${menuName}-close`]);
      delete hoverTimers.current[`${menuName}-close`];
    }

    if (hoverTimers.current[`${menuName}-open`]) {
      clearTimeout(hoverTimers.current[`${menuName}-open`]);
      delete hoverTimers.current[`${menuName}-open`];
    }

    hoverTimers.current[`${menuName}-open`] = setTimeout(() => {
      setOpenDropdowns((prev) => ({ ...prev, [menuName]: true }));
    }, 350);
  };

  const handleNavItemMouseLeave = (menuName) => {
    if (hoverTimers.current[`${menuName}-open`]) {
      clearTimeout(hoverTimers.current[`${menuName}-open`]);
      delete hoverTimers.current[`${menuName}-open`];
    }

    hoverTimers.current[`${menuName}-close`] = setTimeout(() => {
      setOpenDropdowns((prev) => ({ ...prev, [menuName]: false }));
    }, 150);
  };

  const handleDropdownMouseEnter = (menuName) => {
    if (hoverTimers.current[`${menuName}-close`]) {
      clearTimeout(hoverTimers.current[`${menuName}-close`]);
      delete hoverTimers.current[`${menuName}-close`];
    }
    if (hoverTimers.current[`${menuName}-open`]) {
      clearTimeout(hoverTimers.current[`${menuName}-open`]);
      delete hoverTimers.current[`${menuName}-open`];
    }
    setOpenDropdowns((prev) => ({ ...prev, [menuName]: true }));
  };

  const handleDropdownMouseLeave = (menuName) => {
    hoverTimers.current[`${menuName}-close`] = setTimeout(() => {
      setOpenDropdowns((prev) => ({ ...prev, [menuName]: false }));
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideNav = event.target.closest('.nav-item.has-dropdown');
      if (!clickedInsideNav) {
        Object.keys(dropdownRefs.current).forEach((menuName) => {
          if (
            dropdownRefs.current[menuName] &&
            !dropdownRefs.current[menuName].contains(event.target)
          ) {
            setOpenDropdowns((prev) => ({ ...prev, [menuName]: false }));
          }
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.keys(hoverTimers.current).forEach((key) => {
        if (hoverTimers.current[key]) {
          clearTimeout(hoverTimers.current[key]);
        }
      });
    };
  }, []);

  useEffect(() => {
    setOpenDropdowns({});
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderDropdown = (item, menuName) => {
    if (!item.hasDropdown || !item.items) return null;

    const isOpen = openDropdowns[menuName];
    const dropdownClass = item.isMegaMenu ? "mega-menu" : "dropdown-menu";

    return (
      <div
        ref={(el) => (dropdownRefs.current[menuName] = el)}
        className={`dropdown-slide ${dropdownClass} ${isOpen ? "open" : ""} ${menuName === "shop" ? "shop-dropdown" : ""}`}
        onMouseEnter={() => handleDropdownMouseEnter(menuName)}
        onMouseLeave={() => handleDropdownMouseLeave(menuName)}
      >
        <div className="dropdown-content">
          {item.items.map((dropdownItem, idx) => (
            <div key={idx} className="dropdown-columns">
              {dropdownItem.columns.map((column, colIdx) => (
                <div key={colIdx} className="dropdown-column">
                  {column.title && <h6 className="dropdown-title">{column.title}</h6>}
                  {column.isImage ? (
                    <div className="dropdown-image">
                      <div className="image-placeholder">Image</div>
                    </div>
                  ) : (
                    <ul className="dropdown-list">
                      {column.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link
                            to={link.path}
                            className="dropdown-link"
                            onClick={() => {
                              setOpenDropdowns({});
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="menu">
      <nav className="navbar navigation">
        <div className="container-fluid">
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="menu-title">Main Menu</span>
          </button>
          <ul className={`nav navbar-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            {menuItems.map((item, index) => {
              const menuName = item.name.toLowerCase();
              const active = isActive(item.path);

              return (
                <li
                  key={index}
                  className={`nav-item ${active ? "active" : ""} ${
                    item.hasDropdown ? "has-dropdown" : ""
                  }`}
                  onMouseEnter={() => item.hasDropdown && handleNavItemMouseEnter(menuName)}
                  onMouseLeave={() => item.hasDropdown && handleNavItemMouseLeave(menuName)}
                >
                  {item.hasDropdown ? (
                    <Link
                      to={item.path !== "#" ? item.path : "#"}
                      className="nav-link dropdown-toggle"
                      onClick={(e) => {
                        if (window.innerWidth <= 768) {
                          e.preventDefault();
                          setOpenDropdowns((prev) => ({
                            ...prev,
                            [menuName]: !prev[menuName],
                          }));
                        }
                       
                        if (item.path === "#") {
                          e.preventDefault();
                        }
                      }}
                    >
                      {item.name}
                      <span className="dropdown-icon-wrapper">
                        <i className="bi bi-chevron-down dropdown-icon"></i>
                      </span>
                    </Link>
                  ) : (
                    <Link
                      to={item.path}
                      className="nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                  {item.hasDropdown && renderDropdown(item, menuName)}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Navigation;

