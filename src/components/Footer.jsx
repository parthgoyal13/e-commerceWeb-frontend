import { Link } from "react-router-dom";
import "./Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: "bi-facebook",
      url: "https://www.facebook.com",
    },
    {
      name: "Instagram",
      icon: "bi-instagram",
      url: "https://www.instagram.com",
    },
    {
      name: "Twitter",
      icon: "bi-twitter",
      url: "https://www.twitter.com",
    },
    {
      name: "Pinterest",
      icon: "bi-pinterest",
      url: "https://www.pinterest.com",
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/", icon: "bi-house" },
    { name: "Shop", path: "/products/Shop", icon: "bi-bag" },
    { name: "About Us", path: "#", icon: "bi-info-circle" },
    { name: "Contact", path: "#", icon: "bi-envelope" },
  ];

  const customerService = [
    { name: "My Account", path: "/profile", icon: "bi-person" },
    { name: "My Orders", path: "/order", icon: "bi-receipt" },
    { name: "Wishlist", path: "/wishlist", icon: "bi-heart" },
    { name: "Cart", path: "/cart", icon: "bi-cart" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "#", icon: "bi-shield-check" },
    { name: "Terms & Conditions", path: "#", icon: "bi-file-text" },
    { name: "Returns & Refunds", path: "#", icon: "bi-arrow-return-left" },
    { name: "Shipping Policy", path: "#", icon: "bi-truck" },
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <div className="footer-widget">
                <h5 className="footer-title">
                  <i className="bi bi-shop me-2"></i>
                  About Us
                </h5>
                <p className="footer-description">
                  Your trusted destination for quality products. We offer the best deals and exceptional customer service.
                </p>
                <div className="social-media">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="social-link"
                    >
                      <i className={`bi ${social.icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <div className="footer-widget">
                <h5 className="footer-title">
                  <i className="bi bi-link-45deg me-2"></i>
                  Quick Links
                </h5>
                <ul className="footer-links">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      {link.path.startsWith("/") ? (
                        <Link to={link.path}>
                          <i className={`bi ${link.icon} me-2`}></i>
                          {link.name}
                        </Link>
                      ) : (
                        <a href={link.path}>
                          <i className={`bi ${link.icon} me-2`}></i>
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <div className="footer-widget">
                <h5 className="footer-title">
                  <i className="bi bi-headset me-2"></i>
                  Customer Service
                </h5>
                <ul className="footer-links">
                  {customerService.map((link, index) => (
                    <li key={index}>
                      {link.path.startsWith("/") ? (
                        <Link to={link.path}>
                          <i className={`bi ${link.icon} me-2`}></i>
                          {link.name}
                        </Link>
                      ) : (
                        <a href={link.path}>
                          <i className={`bi ${link.icon} me-2`}></i>
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <div className="footer-widget">
                <h5 className="footer-title">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Legal
                </h5>
                <ul className="footer-links">
                  {legalLinks.map((link, index) => (
                    <li key={index}>
                      {link.path.startsWith("/") ? (
                        <Link to={link.path}>
                          <i className={`bi ${link.icon} me-2`}></i>
                          {link.name}
                        </Link>
                      ) : (
                        <a href={link.path}>
                          <i className={`bi ${link.icon} me-2`}></i>
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
              <p className="copyright-text mb-0">
                Copyright © {new Date().getFullYear()} <span className="brand-name">NGW</span>. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="copyright-text mb-0">
                Designed & Developed with <i className="bi bi-heart-fill text-danger"></i> by{" "}
                <a href="#" target="_blank" rel="noopener noreferrer" className="developer-link">
                  NGW
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

