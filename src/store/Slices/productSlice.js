import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const ProductAPI = createApi({
  reducerPath: "ProductAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    // Create a new product
    addProduct: build.mutation({
      query: (credentials) => ({
        url: "/api/item/create",
        method: "POST",
        data: credentials,
      }),
    }),

    // Get all products
    getAllProducts: build.query({
      query: () => ({
        url: "/api/item/get_all",
        method: "GET",
      }),
    }),

    // Get products by category
    getProductsByCategory: build.query({
      query: (categoryID) => ({
        url: `/api/items/category/${categoryID}`, // backend endpoint should support this
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
} = ProductAPI;

export default ProductAPI;
