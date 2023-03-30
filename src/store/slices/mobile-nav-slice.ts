import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMobileNav: false,
};

export const mobileNavSlice = createSlice({
  name: "mobileNav",
  initialState,
  reducers: {
    showNav: (state) => {
      state.showMobileNav = true;
    },
    hideNav: (state) => {
      state.showMobileNav = false;
    },
    toggleNav: (state) => {
      state.showMobileNav = !state.showMobileNav;
    },
  },
});

export const { hideNav, showNav, toggleNav } = mobileNavSlice.actions;
export default mobileNavSlice.reducer;
