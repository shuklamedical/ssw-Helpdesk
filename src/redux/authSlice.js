import { createSlice } from "@reduxjs/toolkit";

// Load stored auth state from localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedRole = localStorage.getItem("role");

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    user: storedUser || null, 
    role: storedRole || null 
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;

      // Save auth data in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("role", action.payload.role);
    },
    logout: (state) => {
      state.user = null;
      state.role = null;

      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

