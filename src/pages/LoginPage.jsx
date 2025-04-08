// LoginPage.jsx
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

  // ✅ Only redirect to profile after a successful login (not just if user exists)
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
    setSuccess(false); // reset
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      setSuccess(true); // ✅ set success only if login succeeded
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control mb-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          {success && (
            <div className="alert alert-success mt-2">Login successful!</div>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
