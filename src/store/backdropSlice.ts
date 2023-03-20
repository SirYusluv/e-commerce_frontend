import { createSlice } from "@reduxjs/toolkit";

export interface BackdropSlice {
  showBackdrop: boolean;
}

const initialState: BackdropSlice = {
  showBackdrop: false,
};

export const backdropSlice = createSlice({
  name: "backdrop",
  initialState,
  reducers: {
    show: (state) => {
      state.showBackdrop = true;
    },
    hide: (state) => {
      state.showBackdrop = false;
    },
    toggle: (state) => {
      state.showBackdrop = !state.showBackdrop;
    },
  },
});

export const { show, hide, toggle } = backdropSlice.actions;
export default backdropSlice.reducer;
