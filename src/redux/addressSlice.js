import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/address`;

export const fetchAddresses = createAsyncThunk(
  "address/fetch",
  async (userId) => {
    const response = await axios.get(`${url}/user/${userId}`);
    return response.data;
  }
);

export const createAddress = createAsyncThunk(
  "address/create",
  async (data) => {
    const response = await axios.post(url, data);
    return response.data;
  }
);

export const removeAddress = createAsyncThunk("address/delete", async (id) => {
  await axios.delete(`${url}/${id}`);
  return id;
});

export const editAddress = createAsyncThunk(
  "address/update",
  async ({ id, updatedData }) => {
    const response = await axios.put(`${url}/${id}`, updatedData);
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    selectedAddress: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.addresses = action.payload;
    });
    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.addresses.push(action.payload);
      state.selectedAddress = action.payload;
    });
    builder.addCase(removeAddress.fulfilled, (state, action) => {
      state.addresses = state.addresses.filter(
        (addr) => addr._id !== action.payload
      );
    });
    builder.addCase(editAddress.fulfilled, (state, action) => {
      const updated = action.payload;
      state.addresses = state.addresses.map((addr) =>
        addr._id === updated._id ? updated : addr
      );
    });
  },
});
export const { selectAddress } = addressSlice.actions;

export default addressSlice.reducer;
