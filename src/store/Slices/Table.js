import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const TableAPI = createApi({
  reducerPath: "TableAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    AddCategory: build.mutation({
      query: (credentials) => ({
        url: "/api/categories/categories",
        method: "POST",
        data: credentials,
      }),
    }),
  }),
});

export const { useAddCategoryMutation } = TableAPI;
export default TableAPI;
