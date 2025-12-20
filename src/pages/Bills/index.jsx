import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import ModalDetailBill from "./ModalDetailBill";
import { useGetPaymentsByDateRangeQuery } from "../../store/Slices/paymentSlide";

export default function Bills() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [fromDate, setFromDate] = useState("2025-10-26");
  const [toDate, setToDate] = useState("2025-10-27");

  const { data: bills = [] } = useGetPaymentsByDateRangeQuery({
    fromDate,
    toDate,
  });
  console.log("playlist bill", bills);
  return (
    <div className="flex flex-col bg-white h-full rouded-lg ">
      <div className="flex items-center gap-4 p-3 justify-between mt-5 ">
        <div className="flex items-center gap-3 font-semibold">
          <h1 className="text-xl">Danh sách hóa đơn</h1>
          {/* Bộ lọc ngày */}
          <div className="flex items-center gap-4 px-5 ">
            <div className="flex items-center gap-2">
              <label htmlFor="fromDate" className="font-medium">
                Từ ngày:
              </label>
              <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="toDate" className="font-medium">
                Đến ngày:
              </label>
              <input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 border-2 rounded-lg">
          <AiOutlineSearch className=" w-6 h-6 pl-2" />
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="outline-none px-2 py-1"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-10 px-5">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-[#0BB783]">
            <tr>
              <th className="px-4 py-2 border">Mã hóa đơn</th>
              <th className="px-4 py-2 border">Ngày</th>
              <th className="px-4 py-2 border">Giờ</th>
              <th className="px-4 py-2 border">Nhân viên</th>
              <th className="px-4 py-2 border">Tổng tiền</th>
              <th className="px-4 py-2 border">Xem chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {bills.length > 0 ? (
              bills.map((item) => (
                <tr key={item.id} className="text-center hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.id}</td>
                  <td className="px-4 py-2 border">
                    {new Date(item.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(item.created_at).toLocaleTimeString("vi-VN")}
                  </td>
                  <td className="px-4 py-2 border">{item.orderid}</td>
                  <td className="px-4 py-2 border">
                    {item.totalAmount?.toLocaleString("vi-VN")} VNĐ
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => setSelectedInvoice(item)}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-gray-500 text-center">
                  Không có dữ liệu hóa đơn
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {selectedInvoice && (
        <ModalDetailBill
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}
