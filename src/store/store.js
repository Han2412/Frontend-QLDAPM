// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthAPI from "./Slices/authSlice";
import CategoryAPI from "./Slices/categorySlide";
import TableAPI from "./Slices/Table";
import ItemAPI from "./Slices/itemSlice";
import OrderAPI from "./Slices/orderSlice";
import PaymentAPI from "./Slices/paymentSlide";

const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [CategoryAPI.reducerPath]: CategoryAPI.reducer,
    [TableAPI.reducerPath]: TableAPI.reducer,
    [ItemAPI.reducerPath]: ItemAPI.reducer,
    [OrderAPI.reducerPath]: OrderAPI.reducer,
    [PaymentAPI.reducerPath]: PaymentAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthAPI.middleware,
      CategoryAPI.middleware,
      TableAPI.middleware,
      ItemAPI.middleware,
      OrderAPI.middleware,
      PaymentAPI.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
