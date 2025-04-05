import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  selectAddress,
  updateAddress,
} from "../redux/addressSlice";
import Header from "../components/Header";

const Address = () => {
  const dispatch = useDispatch();
  const { addresses, selectedAddress } = useSelector((state) => state.address);
  const [newAddress, setNewAddress] = useState("");

  const handleAddAddress = () => {
    if (newAddress.trim() !== "") {
      dispatch(addAddress({ id: Date.now(), address: newAddress }));
      setNewAddress("");
    }
  };
  return (
    <>
      <Header />
      <div>
        <h2>Manage Address</h2>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Enter new address"
        />
        <button onClick={handleAddAddress}>Add Address</button>

        <ul>
          {addresses.map((addr) => (
            <li key={addr.id}>
              {addr.address}
              <button onClick={() => dispatch(selectAddress(addr))}>
                Select
              </button>
              <button onClick={() => dispatch(deleteAddress(addr.id))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        {selectedAddress && <p>Selected Address: {selectedAddress.address}</p>}
      </div>
    </>
  );
};
export default Address;
