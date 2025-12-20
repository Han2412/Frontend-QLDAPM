import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;
const ML_API_URL = import.meta.env.VITE_APP_ML_API_URL; // ngrok

const statisticAPI = createApi({
  reducerPath: "statisticAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => {
    return {
      // 🔹 API hiện tại
      getMonthlyStatistic: build.query({
        query: (year) => ({
          url: `/api/statistical/statistics/monthly`,
          method: "get",
          params: { year },
        }),
      }),

      // 🔥 API dự đoán doanh thu (Flask ML)
      predictRevenue: build.mutation({
        query: (data) => {
          return {
            url: `${ML_API_URL}/api/predict-revenue`,
            method: "post",
            data: data,
          };
        },
      }),
    };
  },
});

export const { useGetMonthlyStatisticQuery, usePredictRevenueMutation } =
  statisticAPI;

export default statisticAPI;
