import { createSlice } from "@reduxjs/toolkit";

const initialStateData = {
  contact: [],
};

const ContactSlice = createSlice({
  name: "contacts",
  initialState: initialStateData,
  reducers: {
    getContact: (state, action) => {
      state.contact = action.payload;
    },
  },
});

export const { getContact } = ContactSlice.actions;
export default ContactSlice.reducer;
