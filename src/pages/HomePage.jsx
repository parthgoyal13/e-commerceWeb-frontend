import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import { Link } from "react-router-dom";

const HomePage = () => {
  const clothingCategories = ["Men", "Women", "Kids", "Home"];

  return (
    <>
      <Header />
     
      <div className="container">
        {/* <h1 className="mt-4">Welcome to our Clothing Store</h1> */}

        <div className="row">
          {clothingCategories.map((category) => (
            <div className="col-md-3 mb-4" key={category}>
              <Link
                to={`/products/${category}`}
                className="text-decoration-none"
              >
                <div className="text-center">
                  <h5 className="card-title fw-bold">{category}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* <div className="row">
          <div className="col-md-6">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://rukminim2.flixcart.com/fk-p-flap/100/100/image/7d00c12f49d57c1b.jpg?q=50"
                    className="img-fluid rounded py-1 px-1"
                    alt="Product"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <small className="text-body-secondary">New Arrivals</small>
                    <h5>Summer collection</h5>
                    <p className="card-text">
                      Check out our best summer collection to stay stylish this
                      season.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/BAU/Winterflip/Rec/ShopMen/Pc/SBC_3._CB544052119_.png"
                    className="img-fluid rounded py-1 px-1"
                    alt="Product"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <small className="text-body-secondary">New Arrivals</small>
                    <h5>Winter collection</h5>
                    <p className="card-text">
                      Check out our best winter collection to stay warm in style
                      this season.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <HeroSlider />
    </>
  );
};

export default HomePage;
