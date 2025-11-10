import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user && !error && success) {
      const timer = setTimeout(() => {
        navigate("/profile");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, error, success, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      setSuccess(true);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
        onClick={handleClose}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="flex-grow-1">
                <h5 className="modal-title">Login</h5>
                <span className="d-block">Get access to your Orders, Wishlist and Recommendations</span>
              </div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    className="form-control"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">Login successful!</div>
                )}
                <div className="d-grid">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={handleClose}></div>
    </>
  );
};

export default LoginPage;
