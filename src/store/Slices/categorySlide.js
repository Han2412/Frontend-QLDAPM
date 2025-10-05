import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const CategoryAPI = createApi({
  reducerPath: "CategoryAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    AddCategory: build.mutation({
      query: (credentials) => ({
        url: "/api/categories/categories",
        method: "POST",
        data: credentials,
      }),
    }),

    getAllCategories: build.query({
      query: () => ({
        url: "/api/categories/get_all",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddCategoryMutation, useGetAllCategoriesQuery } = CategoryAPI;
export default CategoryAPI;
