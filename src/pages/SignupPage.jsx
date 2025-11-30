import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/userAuthSlice";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(signupUser(form));
      if (signupUser.fulfilled.match(resultAction)) {
        setSuccess(true);
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Signup</h2>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card p-4">
              <p className="text-center text-muted mb-4">
                Create your account to get started
              </p>
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    className="form-control"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    id="phone"
                    className="form-control"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    Signup successful! Redirecting to login...
                  </div>
                )}
                <div className="d-grid mb-3">
                  <button
                    className="btn"
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "#075985",
                      color: "#ffffff",
                      borderColor: "#075985"
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.target.style.backgroundColor = "#0c4a6e";
                        e.target.style.borderColor = "#0c4a6e";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.target.style.backgroundColor = "#075985";
                        e.target.style.borderColor = "#075985";
                      }
                    }}
                  >
                    {loading ? "Signing up..." : "Signup"}
                  </button>
                </div>
              </form>
              <div className="text-center">
                <p className="mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
