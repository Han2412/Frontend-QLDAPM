import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import ModalDetailBill from "./ModalDetailBill";

export default function Bills() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices] = useState([
    {
      id: 1,
      maHoaDon: "HD001",
      ngay: "22/03/2025",
      gio: "09:05 AM",
      nhanVien: "Nam",
      tongTien: 150000,
    },
    {
      id: 2,
      maHoaDon: "HD002",
      ngay: "22/03/2025",
      gio: "10:15 AM",
      nhanVien: "Linh",
      tongTien: 200000,
    },
    {
      id: 3,
      maHoaDon: "HD003",
      ngay: "23/03/2025",
      gio: "08:45 AM",
      nhanVien: "Hùng",
      tongTien: 175000,
    },
    {
      id: 4,
      maHoaDon: "HD004",
      ngay: "23/03/2025",
      gio: "11:30 AM",
      nhanVien: "Mai",
      tongTien: 220000,
    },
    {
      id: 5,
      maHoaDon: "HD005",
      ngay: "24/03/2025",
      gio: "14:20 PM",
      nhanVien: "Nam",
      tongTien: 190000,
    },
  ]);

  return (
    <div className="flex flex-col bg-white h-full rouded-lg ">
      <div className="flex items-center gap-4 p-3 justify-between mt-5 ">
        <div className="flex items-center gap-3 font-semibold">
          <h1 className="text-xl">Danh sách hóa đơn</h1>
          {/* filter */}
          <select className="border text-center py-0.5">
            <option value="All">Tất cả</option>
            <option value="paid">Đã thanh toán</option>
            <option value="Unpaid">Chưa Thanh toán </option>
          </select>
        </div>
        <div className="flex items-center gap-3 border-2 rounded-lg">
          <AiOutlineSearch className=" w-6 h-6 pl-2" />
          <input type="text" placeholder="Tìm kiếm" className="outline-none px-2 py-1" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-10 px-5">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
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
            {invoices.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="px-4 py-2 border">{item.maHoaDon}</td>
                <td className="px-4 py-2 border">{item.ngay}</td>
                <td className="px-4 py-2 border">{item.gio}</td>
                <td className="px-4 py-2 border">{item.nhanVien}</td>
                <td className="px-4 py-2 border">
                  {item.tongTien.toLocaleString()} VNĐ
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
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-gray-500">
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
