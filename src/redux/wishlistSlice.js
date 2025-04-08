import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://e-commerce-web-backend-alpha.vercel.app/wishlist";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const response = await axios.get(url);
    return response.data;
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (product) => {
    const response = await axios.post(url, {
      products: [{ productId: product._id }],
    });

    // Return the original product to store in Redux
    return product;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (id) => {
    await axios.delete(`${url}/${id}`);
    return id;
  }
);
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload.flatMap((w) =>
          w.products.map((p) => ({ ...p.productId }))
        );
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;
