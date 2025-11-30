import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddresses,
  createAddress,
  removeAddress,
  selectAddress,
  editAddress,
} from "../redux/addressSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses, selectedAddress } = useSelector((state) => state.address);

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  const [editId, setEditId] = useState(null);
  const userId = "66127d19dd41eaf6c32d7b62";

  useEffect(() => {
    dispatch(fetchAddresses(userId));
  }, [dispatch, userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!formData.name || !formData.street || !formData.city || !formData.state || !formData.zipCode || !formData.country) {
      toast.warn("Please fill in all required fields");
      return;
    }

    if (editId) {
      dispatch(editAddress({ id: editId, updatedData: formData }));
      toast.success("Address updated successfully");
    } else {
      dispatch(createAddress({ ...formData, userId }));
      toast.success("Address added successfully");
    }
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
    });
    setEditId(null);
  };

  const handleEdit = (addr) => {
    setFormData({ ...addr });
    setEditId(addr._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectAddress = (addr) => {
    dispatch(selectAddress(addr));
    toast.success("Address selected for delivery");
    navigate("/checkout");
  };

  const handleDelete = (addrId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(removeAddress(addrId));
      toast.success("Address deleted successfully");
    }
  };

  const getFieldLabel = (key) => {
    const labels = {
      name: "Full Name",
      street: "Street Address",
      city: "City",
      state: "State",
      zipCode: "Zip Code",
      country: "Country",
      phoneNumber: "Phone Number",
    };
    return labels[key] || key;
  };

  const getFieldIcon = (key) => {
    const icons = {
      name: "bi-person",
      street: "bi-house",
      city: "bi-building",
      state: "bi-geo-alt",
      zipCode: "bi-mailbox",
      country: "bi-globe",
      phoneNumber: "bi-telephone",
    };
    return icons[key] || "bi-pencil";
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">Manage Addresses</h2>

        <div className="row justify-content-center mb-5">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">
                  <i className={`bi ${editId ? "bi-pencil" : "bi-plus-circle"} me-2`} style={{ color: "#075985" }}></i>
                  {editId ? "Edit Address" : "Add New Address"}
                </h5>
                <div className="row">
                  {Object.entries(formData).map(([key, value]) => (
                    <div className="col-md-6 mb-3" key={key}>
                      <label htmlFor={key} className="form-label">
                        <i className={`bi ${getFieldIcon(key)} me-2`} style={{ color: "#075985" }}></i>
                        {getFieldLabel(key)}
                        {key !== "phoneNumber" && <span className="text-danger">*</span>}
                      </label>
                      <input
                        id={key}
                        className="form-control"
                        name={key}
                        placeholder={`Enter ${getFieldLabel(key).toLowerCase()}`}
                        value={value}
                        onChange={handleChange}
                        required={key !== "phoneNumber"}
                      />
                    </div>
                  ))}
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button
                    onClick={handleAddOrUpdate}
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
                  >
                    <i className={`bi ${editId ? "bi-check-circle" : "bi-plus-circle"} me-2`}></i>
                    {editId ? "Save Changes" : "Add Address"}
                  </button>
                  {editId && (
                    <button
                      onClick={() => {
                        setFormData({
                          name: "",
                          street: "",
                          city: "",
                          state: "",
                          zipCode: "",
                          country: "",
                          phoneNumber: "",
                        });
                        setEditId(null);
                      }}
                      className="btn btn-outline-secondary"
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <h5 className="fw-bold mb-4">
              <i className="bi bi-bookmark-heart me-2" style={{ color: "#075985" }}></i>
              Saved Addresses ({addresses.length})
            </h5>
            {addresses.length === 0 ? (
              <div className="card shadow-sm">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-inbox" style={{ color: "#075985", fontSize: "3rem", marginBottom: "1rem" }}></i>
                  <h6 className="mb-2">No saved addresses</h6>
                  <p className="text-muted mb-0">Add your first address above to get started!</p>
                </div>
              </div>
            ) : (
              <div className="row">
                {addresses.map((addr) => (
                  <div className="col-md-6 mb-4" key={addr._id}>
                    <div className={`card shadow-sm h-100 ${selectedAddress?._id === addr._id ? "border border-primary" : ""}`}>
                      <div className="card-body p-4">
                        {selectedAddress?._id === addr._id && (
                          <div className="badge bg-primary mb-2">
                            <i className="bi bi-check-circle me-1"></i>
                            Selected
                          </div>
                        )}
                        <div className="d-flex align-items-start mb-3">
                          <i className="bi bi-person me-3 mt-1" style={{ color: "#075985", fontSize: "1.2rem", flexShrink: 0 }}></i>
                          <div className="flex-grow-1">
                            <h6 className="fw-bold mb-2">{addr.name}</h6>
                            <p className="mb-1 small">
                              <i className="bi bi-house me-2" style={{ color: "#075985" }}></i>
                              {addr.street}
                            </p>
                            <p className="mb-1 small">
                              <i className="bi bi-geo-alt me-2" style={{ color: "#075985" }}></i>
                              {addr.city}, {addr.state} - {addr.zipCode}
                            </p>
                            <p className="mb-1 small">
                              <i className="bi bi-globe me-2" style={{ color: "#075985" }}></i>
                              {addr.country}
                            </p>
                            {addr.phoneNumber && (
                              <p className="mb-0 small">
                                <i className="bi bi-telephone me-2" style={{ color: "#075985" }}></i>
                                {addr.phoneNumber}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="d-flex gap-2 flex-wrap mt-3 pt-3 border-top">
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#075985",
                              color: "#ffffff",
                              borderColor: "#075985",
                              flex: "1",
                              minWidth: "120px",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#0c4a6e";
                              e.target.style.borderColor = "#0c4a6e";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "#075985";
                              e.target.style.borderColor = "#075985";
                            }}
                            onClick={() => handleSelectAddress(addr)}
                          >
                            <i className="bi bi-check-circle me-1"></i>
                            Select
                          </button>
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#ffc107",
                              color: "#000000",
                              borderColor: "#ffc107",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#e0a800";
                              e.target.style.borderColor = "#e0a800";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "#ffc107";
                              e.target.style.borderColor = "#ffc107";
                            }}
                            onClick={() => handleEdit(addr)}
                          >
                            <i className="bi bi-pencil me-1"></i>
                            Edit
                          </button>
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#dc3545",
                              color: "#ffffff",
                              borderColor: "#dc3545",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#c82333";
                              e.target.style.borderColor = "#c82333";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "#dc3545";
                              e.target.style.borderColor = "#dc3545";
                            }}
                            onClick={() => handleDelete(addr._id)}
                          >
                            <i className="bi bi-trash me-1"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Address;
