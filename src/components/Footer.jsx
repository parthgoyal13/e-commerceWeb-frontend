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

  const menuLinks = [
    { name: "CONTACT", path: "#" },
    { name: "SHOP", path: "/products/Shop" },
    { name: "Pricing", path: "#" },
    { name: "PRIVACY POLICY", path: "#" },
  ];

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <ul className="social-media">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <i className={`bi ${social.icon}`}></i>
                  </a>
                </li>
              ))}
            </ul>

            <ul className="footer-menu">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  {link.path.startsWith("/") ? (
                    <Link to={link.path}>{link.name}</Link>
                  ) : (
                    <a href={link.path}>{link.name}</a>
                  )}
                </li>
              ))}
            </ul>

            <p className="copyright-text">
              Copyright ©2024, Designed & Developed by{" "}
              <a href="" target="_blank" rel="noopener noreferrer">
                NGW
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

