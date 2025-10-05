import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const PaymentAPI = createApi({
  reducerPath: "PaymentAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getPaymentsByDateRange: build.query({
      query: ({ fromDate, toDate }) => ({
        url: `/api/payment?fromDate=${fromDate}&toDate=${toDate}`,
        method: "GET",
      }),
    }),

    // 🔍 2️⃣ Lấy chi tiết payment theo ID
    getPaymentById: build.query({
      query: (id) => ({
        url: `/api/payment/${id}`,
        method: "GET",
      }),
    }),

    // 💰 3️⃣ Tạo mới payment
    createPayment: build.mutation({
      query: (data) => ({
        url: `/api/payment/create`,
        method: "POST",
        data, // { totalAmount, orderid }
      }),
    }),
  }),
});

export const {
  useGetPaymentsByDateRangeQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
} = PaymentAPI;

export default PaymentAPI;
