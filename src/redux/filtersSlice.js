import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    subcategory: [],
    price: 0,
    rating: 0,
  },
  reducers: {
    setSubcategory: (state, action) => {
      if (state.subcategory.includes(action.payload)) {
        state.subcategory = state.subcategory.filter(
          (item) => item !== action.payload
        );
      } else {
        state.subcategory = [...state.subcategory, action.payload];
      }
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    clearFilters: (state) => {
      state.subcategory = [];
      state.price = 0;
      state.rating = 0;
    },
  },
});

export const { setSubcategory, setPrice, setRating, clearFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
