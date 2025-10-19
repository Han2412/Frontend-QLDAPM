import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const ProductAPI = createApi({
  reducerPath: "ProductAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Item"],
  endpoints: (build) => ({
    // Create a new product
    addProduct: build.mutation({
      query: (credentials) => ({
        url: "/api/item/create",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["Item"],
    }),

    // Get all products
    getAllProducts: build.query({
      query: () => ({
        url: "/api/item/getAll",
        method: "GET",  
      }),
      providesTags: ["Item"],
    }),

    updateProduct: build.mutation({
      query: ({ id, body }) => ({
        url: `/api/item/update/${id}`,
        method: "PUT",
        data: body, // { name, price, categoryID, image }
      }),
      invalidatesTags: ["Item"],
    }),

    // Get products by category
    getProductsByCategory: build.query({
      query: (categoryID) => ({
        url: `/api/items/category/${categoryID}`, // backend endpoint should support this
        method: "GET",
      }),
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/api/item/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductAPI;

export default ProductAPI;
