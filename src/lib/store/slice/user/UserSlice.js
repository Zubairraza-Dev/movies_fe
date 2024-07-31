import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuthStorage: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, clearAuthStorage } = UserSlice.actions;
export default UserSlice.reducer;
