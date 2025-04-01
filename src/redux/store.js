import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import wishlistReducer from "./wishlistSlice";
import cartReducer from "./cartSlice";
const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});
export default store;
