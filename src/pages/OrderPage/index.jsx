import { useState, useEffect } from "react";
import Header from "../../components/Layouts/Header";
import ListTable from "./ListTable";
import { socket } from "../../socket/socketconfig";
import { toast } from "react-toastify";

function Orderpage() {
  const [isDoneOrder, setIsDoneOrder] = useState(false);

  useEffect(() => {
    const handleOrderDone = (data) => {
      setIsDoneOrder(data); // cập nhật state nếu cần
      console.log("Order đã hoàn thành:", data);

      // 🔔 Hiển thị toast ngay khi nhận socket
      toast.info(
        `Order ${data.orderID} đã hoàn thành! Hãy đến quầy bar để nhận đơn`
      );
    };

    socket.on("orderDone", handleOrderDone);

    return () => {
      socket.off("orderDone", handleOrderDone);
    };
  }, []);

  return (
    <div>
      <Header />
      <ListTable />
    </div>
  );
}

export default Orderpage;
