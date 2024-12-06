import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    userlogin: (state, action) => {
      state.user = action.payload.username;
      state.isLoggedIn = true;
    },
    userlogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { userlogin, userlogout } = userDataSlice.actions;
export default userDataSlice.reducer;