import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modalOpen: false,
    selectedMovie: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.modalOpen = true;
      state.selectedMovie = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.selectedMovie = null;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
