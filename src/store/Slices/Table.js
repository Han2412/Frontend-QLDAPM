import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const TableAPI = createApi({
  reducerPath: "TableAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getAllTable: build.query({
      query: () => ({
        url: "/api/table",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllTableQuery } = TableAPI;
export default TableAPI;
