import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../redux/userAuthSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";

function UserProfile() {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, user, token]);

  const getInitials = (name) => {
    if (!name) return "?";
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">User Profile</h2>
        
        {loading && (
          <div className="text-center">
            <p>Loading profile...</p>
          </div>
        )}

        {error && (
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Error: {error}
              </div>
            </div>
          </div>
        )}

        {!loading && !error && !user && (
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="alert alert-info" role="alert">
                <i className="bi bi-info-circle me-2"></i>
                No user profile available.
              </div>
            </div>
          </div>
        )}

        {user && (
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#075985",
                        color: "#ffffff",
                        fontSize: "1.8rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {getInitials(user.name)}
                    </div>
                    <h4 className="mb-0">{user.name}</h4>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <div className="d-flex align-items-start mb-2">
                      <i className="bi bi-envelope me-3 mt-1" style={{ color: "#075985", fontSize: "1.2rem", flexShrink: 0 }}></i>
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <small className="text-muted d-block mb-1">Email</small>
                        <strong className="d-block" style={{ wordBreak: "break-word" }}>{user.email || "Not provided"}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-start mb-2">
                      <i className="bi bi-telephone me-3 mt-1" style={{ color: "#075985", fontSize: "1.2rem", flexShrink: 0 }}></i>
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <small className="text-muted d-block mb-1">Phone</small>
                        <strong className="d-block">{user.phone || "Not provided"}</strong>
                      </div>
                    </div>
                  </div>

                  {user.createdAt && (
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-calendar-check me-3" style={{ color: "#075985", fontSize: "1.2rem" }}></i>
                        <div>
                          <small className="text-muted d-block">Member Since</small>
                          <strong>{new Date(user.createdAt).toLocaleDateString("en-US", { 
                            year: "numeric", 
                            month: "long", 
                            day: "numeric" 
                          })}</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-top">
                    <div className="d-grid gap-2">
                      <button
                        className="btn"
                        style={{
                          backgroundColor: "#075985",
                          color: "#ffffff",
                          borderColor: "#075985",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#0c4a6e";
                          e.target.style.borderColor = "#0c4a6e";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#075985";
                          e.target.style.borderColor = "#075985";
                        }}
                        disabled
                      >
                        <i className="bi bi-pencil me-2"></i>
                        Edit Profile (Coming Soon)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
