import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showBackdrop: false,
};

export const backdropSlice = createSlice({
  name: "backdrop",
  initialState,
  reducers: {
    showBackdrop: (state) => {
      state.showBackdrop = true;
    },
    hideBackdrop: (state) => {
      state.showBackdrop = false;
    },
    toggleBackdrop: (state) => {
      state.showBackdrop = !state.showBackdrop;
    },
  },
});

export const { showBackdrop, hideBackdrop, toggleBackdrop } =
  backdropSlice.actions;
export default backdropSlice.reducer;
