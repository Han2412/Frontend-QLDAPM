import React from "react";
import { useState } from "react";
import { useGetAllOrderQuery } from "../../store/Slices/orderSlice";
import { useCreatePaymentMutation } from "../../store/Slices/paymentSlide";
import { toast } from "react-toastify";

export default function Sale() {
  const { data, isLoading, error } = useGetAllOrderQuery();
  const [orders, setOrders] = useState(0);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [createPayment, { isLoading: loadingpayment }] =
    useCreatePaymentMutation();

  const totalBill = (listItem) => {
    const total = listItem?.reduce((sum, item) => {
      // chỉ cộng nếu có giá hợp lệ
      if (item.price && item.quantity) {
        return sum + item.price * item.quantity;
      }
      return sum;
    }, 0);
    return total;
  };

  const handleCreatePayment = async (data) => {
    console.log("🚀 ~ handleCreatePayment ~ data:", data);

    if (!data?.orderid || !data?.tableID || !data?.totalAmount) {
      toast.warn("⚠️ Thiếu thông tin thanh toán!");
      return;
    }

    try {
      const res = await createPayment(data).unwrap(); // gọi API
      console.log("✅ Thanh toán thành công:", res);

      toast.success("🎉 Tạo thanh toán thành công!");
      setSelectedOrder(null);
    } catch (error) {
      console.error("❌ Lỗi tạo thanh toán:", error);
      toast.error("❌ Lỗi khi tạo thanh toán!");
    }
  };

  return (
    <div className="bg-white rounded-lg h-full font-semibold">
      <h2 className="font-bold text-2xl pl-5 pt-2 ">Danh sách order</h2>
      <div className="grid grid-cols-2 gap-3 p-4  ">
        {/* Cột 1: Danh sách order */}
        <div className="grid grid-cols-3  gap-4 pl-6 h-[80vh] overflow-auto">
          {data &&
            data.map((order, index) => (
              <div className="border-2 border-[#0BB783] p-2 rounded-md space-y-4 w-full mt-5 max-h-[270px]">
                <div className="flex flex-col gap-2">
                  <p className="text-2xl text-center ">Order #{index + 1}</p>
                  <p>NV: {order.staff}</p>
                  <p>Bàn: {order.table.tableNumber}</p>

                  <p>
                    Trạng thái: {order.status === "0" ? "chưa giao" : "đã giao"}
                  </p>

                  <p>Tổng tiền: {totalBill(order.items)?.toLocaleString()}đ</p>
                  <p>Giờ: {order.createdAt}</p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className=" bg-[#0BB783] text-white border px-14 py-1 rounded-lg cursor-pointer"
                  >
                    xem
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Cột 2: Order detail */}
        <div className="border-2 border-[#0BB783] p-4 mt-4 rounded-md gap-2 flex flex-col justify-between">
          {selectedOrder?.items && selectedOrder?.items?.length > 0 ? (
            <>
              <div>
                <h2 className="font-bold text-2xl mb-4">Chi tiết Order</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 text-sm text-center">
                    <thead className="bg-gray-100">
                      <tr className="border-b border-gray-300">
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Tên món</th>
                        <th className="px-4 py-2">Ghi chú</th>
                        <th className="px-4 py-2">Giá</th>
                        <th className="px-4 py-2">Số lượng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items?.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 border-b border-gray-300"
                        >
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{item.itemName}</td>
                          <td className="px-4 py-2">{item.note || "-"}</td>
                          <td className="px-4 py-2 text-right">
                            {item.price?.toLocaleString()}đ
                          </td>
                          <td className="px-4 py-2 text-center">
                            {item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between items-center px-10 py-4 bg-gray-50 mt-4 rounded-lg shadow-sm">
                <p className="font-bold text-2xl text-gray-800">
                  Tổng tiền:{" "}
                  <span className="text-[#0BB783]">
                    {totalBill(selectedOrder.items)?.toLocaleString()} Đ
                  </span>
                </p>
                <button
                  onClick={() =>
                    handleCreatePayment({
                      orderid: selectedOrder.id,
                      tableID: selectedOrder.tableID,
                      totalAmount: totalBill(selectedOrder?.items),
                    })
                  }
                  className="bg-[#0BB783] hover:bg-[#09966a] transition text-white border px-14 py-3 rounded-lg cursor-pointer"
                >
                  Thanh toán
                </button>
              </div>
            </>
          ) : (
            <p>Không có dữ liệu đơn hàng.</p>
          )}
        </div>
      </div>
    </div>
  );
}
