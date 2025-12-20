import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const ML_API_URL = import.meta.env.VITE_APP_ML_API_URL; // ngrok
console.log("🚀 ~ ML_API_URL:", ML_API_URL);

const predictRevenueAPI = createApi({
  reducerPath: "predictRevenueAPI",
  baseQuery: axiosBaseQuery({ baseUrl: ML_API_URL }),
  endpoints: (build) => {
    return {
      // 🔹 API hiện tại

      // 🔥 API dự đoán doanh thu (Flask ML)
      predictRevenue: build.mutation({
        query: (data) => {
          return {
            url: `/api/predict-revenue`,
            method: "post",
            data: data,
          };
        },
      }),
    };
  },
});

export const { usePredictRevenueMutation } = predictRevenueAPI;

export default predictRevenueAPI;
