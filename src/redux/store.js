import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import filtersReducer from "./filtersSlice";
// import cartReducer from "./cartSlice";
// import wishlistReducer from "./wishlistSlice";
const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer, // Add filters slice
  },
});
export default store;
