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
import { useNavigate } from "react-router-dom";

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
    if (editId) {
      dispatch(editAddress({ id: editId, updatedData: formData }));
    } else {
      dispatch(createAddress({ ...formData, userId }));
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
  };

  const handleSelectAddress = (addr) => {
    dispatch(selectAddress(addr));
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="mt-4">Manage Address</h2>

        {/* Address Form */}
        <div className="card p-3 mb-4">
          <h4>{editId ? "Edit Address" : "Add New Address"}</h4>
          <div className="row">
            {Object.entries(formData).map(([key, value]) => (
              <div className="col-md-6 mb-2" key={key}>
                <input
                  className="form-control"
                  name={key}
                  placeholder={`Enter ${key}`}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <button onClick={handleAddOrUpdate} className="btn btn-success mt-2">
            {editId ? "Save Changes" : "Add Address"}
          </button>
        </div>

        {/* Address List */}
        <div className="card p-3">
          <h4>Saved Addresses</h4>
          <ul className="list-group">
            {addresses.map((addr) => (
              <li className="list-group-item" key={addr._id}>
                <strong>{addr.name}</strong> <br />
                {addr.street}, {addr.city}, {addr.state} - {addr.zipCode},{" "}
                {addr.country} <br />
                Phone: {addr.phoneNumber}
                <div className="mt-2">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleSelectAddress(addr)}
                  >
                    Deliver to this address
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => dispatch(removeAddress(addr._id))}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(addr)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Address Preview */}
        {selectedAddress && (
          <p className="mt-3 text-success">
            Selected Address: {selectedAddress.name}, {selectedAddress.street},{" "}
            {selectedAddress.city}, {selectedAddress.state} -{" "}
            {selectedAddress.zipCode}, {selectedAddress.country}
          </p>
        )}
      </div>
    </>
  );
};

export default Address;
