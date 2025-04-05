import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://e-commerce-web-backend-alpha.vercel.app/cart";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(url);
  return response.data;
});

export const addItemToCart = createAsyncThunk("cart/addItem", async (item) => {
  const response = await axios.post(url, item);
  console.log("Add to Cart response:", response.data); // 👈 check this
  return response.data;
});

export const removeItemToCart = createAsyncThunk(
  "cart/removeItem",
  async (_id) => {
    await axios.delete(`${url}/${_id}`);
    return _id;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ _id, quantity }) => {
    const response = await axios.put(`${url}/${_id}`, { quantity });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      const newItem = action.payload;

      // ✅ Match using name instead of _id
      const existingItem = state.cartItems.find(
        (item) => item.name === newItem.name
      );

      if (existingItem) {
        existingItem.quantity = newItem.quantity;
      } else {
        state.cartItems.push(newItem); // ✅ add new item
      }
    });

    builder.addCase(removeItemToCart.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    });

    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      const updatedItem = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item._id === updatedItem._id
      );
      if (index !== -1) {
        state.cartItems[index].quantity = updatedItem.quantity;
      }
    });
  },
});

export const { clearCart } = cartSlice.actions;

// export { fetchCart, addItemToCart, removeItemToCart };

export default cartSlice.reducer;
