import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // {id, firstName, lastName, email, bio, ...}
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      // Gelen verilerle user'ı günceller
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export const { setCredentials, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
