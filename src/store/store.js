// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthAPI from "./Slices/authSlice";

const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthAPI.middleware), // chỉ gọi 1 lần
});

setupListeners(store.dispatch);

export default store;
