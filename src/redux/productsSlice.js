import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://e-commerce-web-backend-alpha.vercel.app/products";

// Fetch products with filtering & sorting
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ category, subcategory, price, rating, sort } = {}) => {
    const queryParams = new URLSearchParams();

    if (category) queryParams.append("category", category);
    if (subcategory) queryParams.append("subcategory", subcategory);
    if (price) queryParams.append("price", price);
    if (rating) queryParams.append("rating", rating);
    if (sort) queryParams.append("sort", sort);

    const response = await axios.get(`${url}?${queryParams.toString()}`);
    return response.data;
  }
);

// Fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const response = await axios.get(`${url}/${productId}`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    status: "idle",
    productStatus: "idle",
    error: null,
    price: 0,
    rating: 0,
    subcategory: [],
    sortByPrice: "",
  },
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSubcategory: (state, action) => {
      const { subcategory, checked } = action.payload;
      if (checked) {
        state.subcategory.push(subcategory);
      } else {
        state.subcategory = state.subcategory.filter(
          (sub) => sub !== subcategory
        );
      }
    },
    setSortByPrice: (state, action) => {
      state.sortByPrice = action.payload;
    },
    clearFilters: (state) => {
      state.price = 0;
      state.rating = 0;
      state.subcategory = [];
      state.sortByPrice = "";
    },
  },
  extraReducers: (builder) => {
    // Handle fetching all products
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Handle fetching a single product
    builder.addCase(fetchProductById.pending, (state) => {
      state.productStatus = "loading";
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.productStatus = "succeeded";
      state.product = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.productStatus = "failed";
      state.error = action.error.message;
    });
  },
});
export const {
  setPrice,
  setRating,
  setSubcategory,
  setSortByPrice,
  clearFilters,
} = productsSlice.actions;
export default productsSlice.reducer;
