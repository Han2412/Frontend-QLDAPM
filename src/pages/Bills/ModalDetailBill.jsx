import React from "react";

export default function ModalDetailBill({ invoice, onClose }) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-gray-300/50 flex items-center justify-center z-50">
      <div className="bg-white w-[800px] rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chi tiết hóa đơn</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {/* Nội dung */}
        <div className="mb-4 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Mã Hóa đơn:</span> {invoice.id}
          </p>
          <p>
            <span className="font-semibold">Ngày:</span> {invoice.date} |{" "}
            <span className="font-semibold">Giờ:</span> {invoice.time}
          </p>
          <p>
            <span className="font-semibold">Khách hàng:</span>{" "}
            {invoice.customer}
          </p>
          <p>
            <span className="font-semibold">Nhân viên:</span> {invoice.staff}
          </p>
          <p className="font-semibold text-red-600">
            Tổng tiền: {Number(invoice.total || 0).toLocaleString()} VNĐ
          </p>
        </div>

        {/* Bảng sản phẩm */}
        <table className="w-full border border-gray-300 text-sm mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Tên món</th>
              <th className="border p-2">Size</th>
              <th className="border p-2">Giá</th>
              <th className="border p-2">Số lượng</th>
              <th className="border p-2">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {(invoice.products || []).map((item, index) => (
              <tr key={`${item.name}-${index}`}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.size}</td>
                <td className="border p-2">
                  {Number(item.price || 0).toLocaleString()} VNĐ
                </td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">
                  {(
                    Number(item.price || 0) * Number(item.quantity || 0)
                  ).toLocaleString()}{" "}
                  VNĐ
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          
          <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg">
            Chỉnh sửa
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Hủy hóa đơn
          </button>
        </div>
      </div>
    </div>
  );
}
