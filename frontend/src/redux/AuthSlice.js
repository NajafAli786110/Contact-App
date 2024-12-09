import { createSlice } from "@reduxjs/toolkit";

const loadDataFromLocalStorage = () => {
  const storeUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return storeUser
    ? {
        user: JSON.parse(storeUser),
        token: JSON.parse(token),
        isLoggedIn: JSON.parse(isLoggedIn),
      }
    : { user: null, isLoggedIn: false };
};

const initialState = loadDataFromLocalStorage();

const userDataSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userlogin: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;

      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
    },
    userlogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const { userlogin, userlogout } = userDataSlice.actions;
export default userDataSlice.reducer;
