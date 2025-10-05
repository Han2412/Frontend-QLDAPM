import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const OrderAPI = createApi({
  reducerPath: "OrderAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (body) => ({
        url: "/api/order/create",
        method: "POST",
        data: body,
      }),
    }),
    getOrrderItemByTableID: build.query({
      query: (tableID) => ({
        url: `/api/order/table/${tableID}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrrderItemByTableIDQuery } =
  OrderAPI;
export default OrderAPI;
