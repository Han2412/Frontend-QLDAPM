import { toast } from "react-toastify";
import { useUpdateOrderStatusMutation } from "../../store/Slices/orderSlice";

function OrderCard({ order }) {
  const [updateStatusOrder, { isLoading }] = useUpdateOrderStatusMutation();
  const updateStatus = async () => {
    try {
      await updateStatusOrder({
        id: order.id,
        status: "2",
      }).unwrap(); // unwrap để bắt lỗi dễ hơn

      toast.success(" Cập nhật trạng thái đơn hàng thành công!");
    } catch (error) {
      toast.error(" Cập nhật thất bại! Vui lòng thử lại.");
    }
  };
  return (
    <div className="border-4 rounded-2xl w-[20%] h-[500px] p-6 border-[#0bb7838e] bg-white ">
      <div className="flex justify-between text-[18px] font-bold pb-6 text-[#0bb783] ">
        <h2>NV:{order?.staff} </h2>
        <p>bàn:{order.table?.tableNumber}</p>
      </div>
      <div className=" h-full w-full pb-12">
        <div className=" w-full h-full border-4  border-[#0bb7838e]">
          <ul>
            {order.items.map((item, index) => (
              <li className="p-4 text-gray-700">
                <div className="flex justify-between font-bold text-2xl">
                  <p> {item?.itemName}</p>
                  <p>sl:{item?.quantity}</p>
                </div>
                <span>note: {item?.note}</span>
              </li>
            ))}
          </ul>
          <div className="w-full flex justify-end px-2">
            <button
              onClick={updateStatus}
              className=" bg-[#0bb783] text-white font-bold rounded-xl p-2 "
            >
              xong
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
