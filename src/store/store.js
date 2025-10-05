// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthAPI from "./Slices/authSlice";
import CategoryAPI from "./Slices/categorySlide";

const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [CategoryAPI.reducerPath]: CategoryAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthAPI.middleware, CategoryAPI.middleware),
});

setupListeners(store.dispatch);

export default store;
