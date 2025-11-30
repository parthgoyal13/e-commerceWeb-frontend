import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/userAuth`;

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/login`, credentials);

      if (!res.data || !res.data.user || !res.data.token) {
        return thunkAPI.rejectWithValue("Invalid email or password");
      }

      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid email or password";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signupUser = createAsyncThunk("auth/signup", async (userData) => {
  const res = await axios.post(`${API}/signup`, userData);
  return res.data;
});

export const fetchUserProfile = createAsyncThunk(
  "auth/profile",
  async (token) => {
    const res = await axios.get(`${API}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

const userAuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        state.token = parsed.token || null;
        state.user = parsed.user || null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("Login Success Payload:", action.payload);
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = action.payload || "Login failed";
    });

    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      console.log("Signup Success Payload:", action.payload);
      state.loading = false;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { logout, loadUserFromStorage } = userAuthSlice.actions;
export default userAuthSlice.reducer;
