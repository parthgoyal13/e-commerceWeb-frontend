import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import wishlistReducer from "./wishlistSlice";
import addressReducer from "./addressSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import userAuthReducer from "./userAuthSlice";
const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    address: addressReducer,
    orders: orderReducer,
    auth: userAuthReducer,
  },
});
export default store;
