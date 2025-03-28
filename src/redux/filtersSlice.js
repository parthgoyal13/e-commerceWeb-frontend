import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    subcategory: null,
    price: 0,
    rating: 0,
  },
  reducers: {
    setSubcategory: (state, action) => {
      state.subcategory = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    clearFilters: (state) => {
      state.category = null;
      state.price = 0;
      state.rating = 0;
    },
  },
});

export const { setSubcategory, setPrice, setRating, clearFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
