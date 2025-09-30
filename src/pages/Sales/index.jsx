import React from "react";
import { useState } from "react";

export default function Sale() {
 const [orders, setOrders] = useState([
  {
    id: 1,
    status: "Chưa giao",
    total: 180000,
    time: "12:30 PM",
    type: "Tại quán",
    products: [
      { name: "Sữa chua dâu", size: "L", price: 20000, quantity: 2 },
      { name: "Trà đào", size: "M", price: 30000, quantity: 1 },
    ],
  },
  {
    id: 2,
    status: "Chưa giao",
    total: 160000,
    time: "13:30 PM",
    type: "Mang về",
    products: [{ name: "Cà phê sữa", size: "M", price: 25000, quantity: 2 }],
  },
  {
    id: 3,
    status: "Đã giao",
    total: 160000,
    time: "13:30 PM",
    type: "Tại quán",
    products: [{ name: "Soda chanh", size: "L", price: 20000, quantity: 2 }],
  },
  {
    id: 4,
    status: "Chưa giao",
    total: 220000,
    time: "14:00 PM",
    type: "Tại quán",
    products: [
      { name: "Sinh tố xoài", size: "L", price: 40000, quantity: 2 },
      { name: "Bánh ngọt", size: "M", price: 30000, quantity: 1 },
    ],
  },
  {
    id: 5,
    status: "Đang giao",
    total: 120000,
    time: "14:15 PM",
    type: "Mang về",
    products: [{ name: "Nước ép cam", size: "L", price: 30000, quantity: 4 }],
  },
  {
    id: 6,
    status: "Đã giao",
    total: 90000,
    time: "14:30 PM",
    type: "Tại quán",
    products: [{ name: "Cafe đen", size: "M", price: 30000, quantity: 3 }],
  },
  {
    id: 7,
    status: "Chưa giao",
    total: 210000,
    time: "15:00 PM",
    type: "Mang về",
    products: [
      { name: "Trà sữa trân châu", size: "L", price: 35000, quantity: 3 },
    ],
  },
  {
    id: 8,
    status: "Đã giao",
    total: 250000,
    time: "15:30 PM",
    type: "Tại quán",
    products: [
      { name: "Sinh tố bơ", size: "M", price: 50000, quantity: 2 },
      { name: "Bánh mì", size: "M", price: 25000, quantity: 2 },
    ],
  },
  {
    id: 9,
    status: "Chưa giao",
    total: 140000,
    time: "16:00 PM",
    type: "Mang về",
    products: [
      { name: "Soda dâu", size: "L", price: 35000, quantity: 2 },
      { name: "Trà chanh", size: "M", price: 35000, quantity: 2 },
    ],
  },
  {
    id: 10,
    status: "Đang giao",
    total: 180000,
    time: "16:30 PM",
    type: "Tại quán",
    products: [
      { name: "Nước ép dưa hấu", size: "M", price: 45000, quantity: 2 },
      { name: "Bánh flan", size: "M", price: 30000, quantity: 2 },
    ],
  },
]);


  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="bg-white rounded-lg h-full font-semibold">
      <h2 className="font-bold text-2xl pl-5 pt-2 ">Danh sách order</h2>
      <div className="grid grid-cols-2 gap-3 p-4  ">
        {/* Cột 1: Danh sách order */}

        <div className="space-y-4 flex flex-wrap gap-4 pl-6 h-[80vh] overflow-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border-2 border-[#0BB783] p-2 rounded-md space-y-4 w-44 mt-5 "
            >
              <div className="flex flex-col gap-2">
                <p className="text-2xl text-center ">Order #{order.id}</p>
                <p>Trạng thái: {order.status}</p>
                <p>Tổng tiền: {order.total.toLocaleString()}đ</p>
                <p>Giờ: {order.time}</p>
               
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
        <div className="border-2 border-[#0BB783] p-4 mt-4 rounded-md gap-2">
          <h2 className="font-bold text-2xl">Chi tiết Order</h2>
          {/* ví dụ hiển thị sản phẩm order đầu tiên */}
          {selectedOrder ? (
            <>
              <p className="mb-2">Order #{selectedOrder.id}</p>
              {selectedOrder.products.map((p, index) => (
                <div key={index} className="flex justify-between border-b py-2">
                  <span>{p.name}</span>
                  <span>{p.size}</span>
                  <span>{p.price.toLocaleString()}đ</span>
                  <span>x{p.quantity}</span>
                </div>
              ))}
            </>
          ) : (
            <p className="text-gray-500 mt-4">Chọn một order để xem chi tiết</p>
          )}
        </div>

        {/* Cột 3: Hóa đơn */}
      </div>
    </div>
  );
}
