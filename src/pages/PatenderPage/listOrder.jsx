// src/components/OrderPage/ListOrder.jsx
import { useEffect, useState } from "react";
import OrderCard from "../OrderPage/OrderCard";
import { useGetAllOrderQuery } from "../../store/Slices/orderSlice";
import { socket } from "../../socket/socketconfig";

function ListOrder() {
  // Lấy data và hàm refetch từ RTK Query
  const { data, refetch } = useGetAllOrderQuery();
  const [orders, setOrders] = useState(data || []);

  useEffect(() => {
    setOrders(data || []);
  }, [data]);

  useEffect(() => {
    const handleNewOrder = (newOrder) => {
      // 1️⃣ Cập nhật state local
      setOrders((prev) => [...prev, newOrder]);

      refetch();
    };

    // Lắng nghe sự kiện socket
    socket.on("newOrder", handleNewOrder);

    return () => {
      socket.off("newOrder", handleNewOrder);
    };
  }, [refetch]);

  return (
    <div className="p-4 flex-1 flex gap-4 flex-wrap">
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard key={order.id || order.orderID} order={order} />
        ))
      ) : (
        <div>Chưa có order nào!</div>
      )}
    </div>
  );
}

export default ListOrder;
