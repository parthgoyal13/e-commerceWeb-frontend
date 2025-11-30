import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [manualToken, setManualToken] = useState("");

  const API = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/userAuth`;
  const urlToken = searchParams.get("token");
  const token = urlToken || manualToken;

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new one.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validate token
    if (!token) {
      setError("Invalid reset link. Please request a new one.");
      return;
    }

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending reset password request...");
      console.log("API:", `${API}/reset-password`);
      console.log("Token:", token ? "Present" : "Missing");
      
      const res = await axios.post(`${API}/reset-password`, {
        token,
        newPassword,
      });
      
      console.log("Reset password response:", res.data);
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Reset password error:", err);
      console.error("Error response:", err.response?.data);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error ||
        "Failed to reset password. The link may have expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">Reset Password</h2>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card p-4">
              {!urlToken && (
                <div className="mb-3">
                  <label htmlFor="resetToken" className="form-label">
                    Reset Token
                  </label>
                  <input
                    id="resetToken"
                    className="form-control"
                    type="text"
                    placeholder="Paste your reset token here"
                    value={manualToken}
                    onChange={(e) => setManualToken(e.target.value)}
                  />
                  <small className="text-muted">
                    If the token wasn't detected from the URL, paste it here
                  </small>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <div className="position-relative">
                    <input
                      id="newPassword"
                      className="form-control"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      style={{ paddingRight: "40px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        border: "none",
                        background: "none",
                        padding: "0 10px",
                        color: "#6c757d",
                        textDecoration: "none",
                        zIndex: 10,
                        cursor: "pointer",
                        outline: "none"
                      }}
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      <i className={showNewPassword ? "bi bi-eye-slash" : "bi bi-eye"} style={{ fontSize: "18px" }}></i>
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="position-relative">
                    <input
                      id="confirmPassword"
                      className="form-control"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      style={{ paddingRight: "40px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        border: "none",
                        background: "none",
                        padding: "0 10px",
                        color: "#6c757d",
                        textDecoration: "none",
                        zIndex: 10,
                        cursor: "pointer",
                        outline: "none"
                      }}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"} style={{ fontSize: "18px" }}></i>
                    </button>
                  </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {message && (
                  <div className="alert alert-success">
                    {message} Redirecting to login...
                  </div>
                )}
                <div className="d-grid mb-3">
                  <button
                    className="btn"
                    type="submit"
                    disabled={loading || !token}
                    style={{
                      backgroundColor: loading || !token ? "#6c757d" : "#075985",
                      color: "#ffffff",
                      borderColor: loading || !token ? "#6c757d" : "#075985",
                      cursor: loading || !token ? "not-allowed" : "pointer"
                    }}
                    onMouseEnter={(e) => {
                      if (!loading && token) {
                        e.target.style.backgroundColor = "#0c4a6e";
                        e.target.style.borderColor = "#0c4a6e";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading && token) {
                        e.target.style.backgroundColor = "#075985";
                        e.target.style.borderColor = "#075985";
                      }
                    }}
                    onClick={(e) => {
                      if (!token) {
                        e.preventDefault();
                        setError("Invalid reset link. Please request a new one.");
                      }
                    }}
                  >
                    {loading ? "Resetting..." : !token ? "Invalid Link" : "Reset Password"}
                  </button>
                </div>
                {!token && (
                  <div className="alert alert-warning">
                    <strong>No reset token found.</strong> Please use the link from your email or request a new password reset.
                  </div>
                )}
              </form>
              <div className="text-center">
                <Link to="/login" className="text-decoration-none">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;

