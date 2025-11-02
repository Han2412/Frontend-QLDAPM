// src/api/AuthAPI.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    // 🔹 Đăng nhập
    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials, // { name, password }
      }),
    }),
    register: build.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        data: credentials, // { name, password }
      }),
    }),
    getAllAccount: build.query({
      query: () => ({
        url: "/auth/get_all_account",
        method: "GET",
      }),
    }),
    getOneAccount: build.query({
      query: (id) => ({
        url: `/auth/get_one_account/${id}`,
        method: "GET",
      }),
    }),
    updateAccount: build.mutation({
      query: ({ id, data }) => ({
        url: `/auth/update_account/${id}`,
        method: "PUT",
        data: data,
      }),
    }),
  }),
});

// ✅ Export hook để dùng trong component
export const {
  useLoginMutation,
  useGetAllAccountQuery,
  useGetOneAccountQuery,
  useUpdateAccountMutation,
  useRegisterMutation
} = AuthAPI;
export default AuthAPI;
