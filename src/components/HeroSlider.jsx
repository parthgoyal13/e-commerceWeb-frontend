import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import "./HeroSlider.css";
import slider1 from "../assets/slider/slider-1.jpg";
import slider2 from "../assets/slider/slider-2.jpg";
import slider3 from "../assets/slider/slider-3.jpg";

const HeroSlider = () => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      backgroundImage: slider1,
      textAlign: "text-center",
      subtitle: "PRODUCTS",
      title: "The beauty of nature is hidden in details.",
      buttonText: "Shop Now",
      buttonLink: "/products",
    },
    {
      id: 2,
      backgroundImage: slider2,
      textAlign: "text-left",
      subtitle: "NEW COLLECTION",
      title: "Style that speaks to your soul.",
      buttonText: "Explore",
      buttonLink: "/products",
    },
    {
      id: 3,
      backgroundImage: slider3,
      textAlign: "text-right",
      subtitle: "TRENDING NOW",
      title: "Discover elegance in every piece.",
      buttonText: "Shop Now",
      buttonLink: "/products",
    },
  ];

  const settings = {
    infinite: true,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnFocus: false,
    pauseOnHover: false,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setActiveSlide(next);
    },
    customPaging: (i) => (
      <div className="custom-dot"></div>
    ),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  useEffect(() => {
    const slideItems = document.querySelectorAll(".slider-item");
    slideItems.forEach((item, index) => {
      if (index === activeSlide) {
        const animatedElements = item.querySelectorAll(
          "[data-animation-in]"
        );
        animatedElements.forEach((el) => {
          el.classList.remove("animate__animated", "animate__fadeInUp");
          // Force reflow
          void el.offsetWidth;
          const duration = el.getAttribute("data-duration-in") || "0.3";
          const delay = el.getAttribute("data-delay-in") || "0";
          el.style.animationDuration = `${duration}s`;
          el.style.animationDelay = `${delay}s`;
          el.classList.add("animate__animated", "animate__fadeInUp");
        });
      } else {
        const animatedElements = item.querySelectorAll(
          "[data-animation-in]"
        );
        animatedElements.forEach((el) => {
          el.classList.remove("animate__animated", "animate__fadeInUp");
        });
      }
    });
  }, [activeSlide]);

  return (
    <div className="hero-slider">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="slider-item th-fullpage hero-area"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
              }}
            >
              <div className="container">
                <div className="row">
                  <div className={`col ${slide.textAlign}`}>
                    <p
                      data-animation-in="fadeInUp"
                      data-duration-in=".3"
                      data-delay-in=".1"
                    >
                      {slide.subtitle}
                    </p>
                    <h1
                      data-animation-in="fadeInUp"
                      data-duration-in=".3"
                      data-delay-in=".5"
                    >
                      {slide.title}
                    </h1>
                    <Link
                      to={slide.buttonLink}
                      className="slider-btn"
                      data-animation-in="fadeInUp"
                      data-duration-in=".3"
                      data-delay-in=".8"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const CustomPrevArrow = ({ onClick }) => {
  const handleClick = (e) => {
    const button = e.currentTarget;
    button.classList.add("clicked");
    setTimeout(() => {
      button.classList.remove("clicked");
    }, 200);
    onClick && onClick(e);
  };

  return (
    <button
      type="button"
      className="slick-arrow slick-prev"
      onClick={handleClick}
      aria-label="Previous slide"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 15L7.5 10L12.5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

const CustomNextArrow = ({ onClick }) => {
  const handleClick = (e) => {
    const button = e.currentTarget;
    button.classList.add("clicked");
    setTimeout(() => {
      button.classList.remove("clicked");
    }, 200);
    onClick && onClick(e);
  };

  return (
    <button
      type="button"
      className="slick-arrow slick-next"
      onClick={handleClick}
      aria-label="Next slide"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 5L12.5 10L7.5 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default HeroSlider;

