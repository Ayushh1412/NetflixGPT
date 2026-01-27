import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: null,
    email: null,
    uid: null,
    photoURL: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
    },
    removeUser: (state) => {
      state.displayName = null;
      state.email = null;
      state.uid = null;
      state.photoURL =  null;
    },
  },
});
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

