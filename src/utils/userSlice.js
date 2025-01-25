import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: null,
    email: null,
    id: null,
    photoURL: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.photoURL = action.payload.photoURL;
    },
    removeUser: (state) => {
      state.displayName = null;
      state.email = null;
      state.id = null;
      state.photoURL =  null;
    },
  },
});
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

