import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    selectedAddress: null,
  },
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action) => {
      const { id, updatedData } = action.payload;
      state.addresses = state.addresses.map((addr) =>
        addr.id === id ? { ...addr, ...updatedData } : addr
      );
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload
      );
    },
    selectAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});
export const { addAddress, updateAddress, deleteAddress, selectAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
