import React from "react";
import { useGetOrderByIDQuery } from "../../store/Slices/orderSlice";

export default function ModalDetailBill({ invoice, onClose }) {
  const orderID = invoice?.order?.id;

  //  Gọi API theo tableID
  const { data, isLoading, error } = useGetOrderByIDQuery(orderID, {
    skip: !orderID, // tránh lỗi khi chưa có tableID
  });
  console.log("🚀 ~ ModalDetailBill ~ data:", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Lỗi tải dữ liệu chi tiết</div>;

  const order = data;
  const items = data?.items || [];

  return (
    <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center">
      <div className="bg-white w-[700px] rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-3">
          Chi tiết hóa đơn bàn {order?.tableID}
        </h2>

        <div className="mb-4 text-sm text-gray-600">
          <p>Mã đơn hàng: {order?.id}</p>
          <p>NV tạo: {order?.createdByName}</p>

          <p>Ngày tạo: {new Date(order?.createdAt).toLocaleString("vi-VN")}</p>
          <p>
            Trạng thái: {order?.status === "1" ? "Hoàn thành" : "Đang xử lý"}
          </p>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Hình ảnh</th>
              <th className="p-2 border">Tên món</th>
              <th className="p-2 border">Số lượng</th>
              <th className="p-2 border">Giá</th>
              <th className="p-2 border">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t text-center">
                <td className="p-2 border">
                  <img
                    src={item.imageURL}
                    alt={item.itemName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 border">{item.itemName}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">
                  {item.price?.toLocaleString("vi-VN")}₫
                </td>
                <td className="p-2 border">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-right font-semibold text-lg">
          Tổng tiền:{" "}
          {items
            .reduce((sum, i) => sum + i.price * i.quantity, 0)
            .toLocaleString("vi-VN")}{" "}
          ₫
        </div>
      </div>
    </div>
  );
}
