import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials, // { name, password }
      }),
    }),
  }),
});

export const { useLoginMutation } = AuthAPI;
export default AuthAPI;
