import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const TableAPI = createApi({
  reducerPath: "TableAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Table"],

  endpoints: (build) => ({
    getAllTable: build.query({
      query: () => ({
        url: "/api/table",
        method: "GET",
      }),
      providesTags: ["Table"],
    }),
    createTable: build.mutation({
      query: (data) => ({
        url: "/api/table/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Table"],
    }),
    updateTableStatus: build.mutation({
      query: (data) => ({
        url: `/api/table/update_status/id=${data.id}/status=${data.status}`,
        method: "PUT",
      }),
      invalidatesTags: ["Table"],
    }),
  }),
});

export const {
  useGetAllTableQuery,
  useCreateTableMutation,
  useUpdateTableStatusMutation,
} = TableAPI;
export default TableAPI;
