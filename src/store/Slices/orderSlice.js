import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const OrderAPI = createApi({
  reducerPath: "OrderAPI",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Order"], // 👈 Thêm tag để quản lý cache
  endpoints: (build) => ({
    //  Tạo đơn hàng mới
    createOrder: build.mutation({
      query: (body) => ({
        url: "/api/order/create",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Order"], //  Cập nhật lại danh sách đơn hàng sau khi tạo
    }),

    //  Lấy đơn hàng theo bàn
    getOrrderItemByTableID: build.query({
      query: (tableID) => ({
        url: `/api/order/table/${tableID}`,
        method: "GET",
      }),
      providesTags: ["Order"], //  Cung cấp tag để các mutation khác biết refetch
    }),

    //  Lấy toàn bộ đơn hàng
    getAllOrder: build.query({
      query: () => ({
        url: `/api/order`,
        method: "GET",
      }),
      providesTags: ["Order"], //  Cho phép refetch tự động khi Order bị invalidated
    }),
    getOrderByID: build.query({
      query: (id) => ({
        url: `/api/order/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"], //  Cho phép refetch tự động khi Order bị invalidated
    }),

    //  Cập nhật trạng thái đơn hàng
    updateOrderStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/api/order/updateStatusOrder/${id}/${status}`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"], //  Làm mới danh sách sau khi cập nhật
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrrderItemByTableIDQuery,
  useGetAllOrderQuery,
  useUpdateOrderStatusMutation,
  useGetOrderByIDQuery,
} = OrderAPI;

export default OrderAPI;
