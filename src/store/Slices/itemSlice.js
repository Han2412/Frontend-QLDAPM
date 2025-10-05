import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const ItemAPI = createApi({
  reducerPath: "ItemAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    GetAllItem: build.query({
      query: (credentials) => ({
        url: "/api/item/getAll",
        method: "GET",
        data: credentials,
      }),
    }),
  }),
});

export const { useGetAllItemQuery } = ItemAPI;
export default ItemAPI;
