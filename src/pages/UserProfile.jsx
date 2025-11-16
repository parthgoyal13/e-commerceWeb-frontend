import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../redux/userAuthSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

function UserProfile() {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("User:", user);
    console.log("Token:", token);

    if (token && !user) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, user, token]);

  return (
    <div>
      <Header />

      {loading && <p>Loading profile...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && !user && <p>No user profile available.</p>}

      {user && (
        <>
          <h2>User Profile</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
        </>
      )}
      <Footer />
    </div>
  );
}

export default UserProfile;
