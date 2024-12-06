import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./src/redux/AuthSlice";
import contactSlice from "./src/redux/ContactSlice";

const store = configureStore({
  reducer: {
    auth: userDataSlice,
    contacts: contactSlice
  },
});

export default store;
