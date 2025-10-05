// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthAPI from "./Slices/authSlice";
import CategoryAPI from "./Slices/categorySlide";
import TableAPI from "./Slices/Table";

const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [CategoryAPI.reducerPath]: CategoryAPI.reducer,
    [TableAPI.reducerPath]: TableAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthAPI.middleware,
      CategoryAPI.middleware,
      TableAPI.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
