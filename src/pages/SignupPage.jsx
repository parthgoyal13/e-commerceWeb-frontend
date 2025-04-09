import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            className="form-control mb-2"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="form-control mb-2"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
          <input
            className="form-control mb-2"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="btn btn-success" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          {success && (
            <div className="alert alert-success mt-2">
              Signup successful! Redirecting to login...
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default SignupPage;
