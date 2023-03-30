import { configureStore } from "@reduxjs/toolkit";
import backdropSlice from "./slices/backdrop-slice";
import mobileNavSlice from "./slices/mobile-nav-slice";

export const store = configureStore({
  reducer: {
    backdrop: backdropSlice,
    mobileNav: mobileNavSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
