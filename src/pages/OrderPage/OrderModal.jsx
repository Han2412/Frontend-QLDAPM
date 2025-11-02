import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useGetAllItemQuery } from "../../store/Slices/itemSlice";
import {
  useCreateOrderMutation,
  useGetOrrderItemByTableIDQuery,
} from "../../store/Slices/orderSlice";
import { useCreatePaymentMutation } from "../../store/Slices/paymentSlide";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function OrderModal({ handleCloseModal, open, dataTable }) {
  const [orderList, setOrderList] = useState([]);
  console.log("🚀 ~ OrderModal ~ orderList:", orderList);
  const { data: dataItem } = useGetAllItemQuery();
  const { data: dataItemOdder } = useGetOrrderItemByTableIDQuery(
    dataTable?.tableID,
    {
      skip: !dataTable?.tableID,
    }
  );
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const [createOrder, { isLoading: isloadingOrder }] = useCreateOrderMutation();

  useEffect(() => {
    console.log(
      "🚀 ~ OrderModal ~ dataItemOdder?.items:",
      dataItemOdder?.items
    );
    if (dataItemOdder?.items) {
      const formatted = dataItemOdder.items.map((i) => ({
        id: i.itemID,
        name: i.itemName,
        price: i.price,
        count: i.quantity,
        imageURl: i.imageURL,
      }));
      setOrderList(formatted);
    }
  }, [dataItemOdder]);

  useEffect(() => {
    if (open === false) {
      setOrderList([]);
    }
  }, [open]);
  const totalAmount = orderList.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const handleCreatePayment = async () => {
    const pamentdata = {
      totalAmount: totalAmount,
      orderid: dataItemOdder.order.id,
      tableID: dataTable?.tableID,
    };
    try {
      const res = await createPayment(pamentdata).unwrap();

      console.log("✅ Thanh toán thành công:", res);
      alert("Tạo thanh toán thành công!");
    } catch (error) {
      console.error("❌ Lỗi tạo thanh toán:", error);
      alert("Lỗi khi tạo thanh toán!");
    }
  };

  const handleSave = async () => {
    if (orderList?.length === 0) {
      alert("Vui lòng chọn ít nhất 1 món!");
      return;
    }

    // map dữ liệu orderList về format API cần
    const items = orderList.map((item) => ({
      itemID: item.id,
      quantity: item.count,
      note: "", // hoặc có thể thêm input cho ghi chú riêng
    }));

    const payload = {
      tableID: dataTable?.tableID || 1,
      createdBy: 1, // hoặc lấy từ user đăng nhập
      items,
    };

    try {
      const res = await createOrder(payload).unwrap();
      console.log("Tạo order thành công:", res);
      alert("Tạo order thành công!");
      handleCloseModal();
    } catch (err) {
      console.error("Lỗi khi tạo order:", err);
      alert("Không thể tạo order!");
    }
  };

  const handleAdd = (product) => {
    setOrderList((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, count: p.count + 1 } : p
        );
      }
      return [...prev, { ...product, count: 1 }];
    });
  };

  const handleMinus = (product) => {
    setOrderList((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (!exists) return prev;
      if (exists.count === 1) {
        // xoá luôn nếu còn 1
        return prev.filter((p) => p.id !== product.id);
      }
      return prev.map((p) =>
        p.id === product.id ? { ...p, count: p.count - 1 } : p
      );
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: { timeout: 500 },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className="flex justify-between">
            <h1 className="text-[#4254FB] pb-6 font-bold text-[20px]">Order</h1>
            <button
              className="bg-red-400 h-[40px] w-[40px] rounded-[50%] text-white"
              onClick={handleCloseModal}
            >
              X
            </button>
          </div>
          {/* danh sách sản phẩm */}
          <div className="space-y-3 h-[300px] overflow-auto">
            {dataItem ? (
              dataItem.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <img src={item?.imageURl} alt="123" className="h-16" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <span className="text-gray-500">
                      {item.price?.toLocaleString()} đ
                    </span>
                  </div>
                  <button
                    onClick={() => handleAdd(item)}
                    className="bg-green-400 px-3 py-1 rounded-lg text-white hover:bg-green-500"
                  >
                    +
                  </button>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>

          {/* giỏ hàng */}
          <div className="mt-6">
            <h2 className="font-bold text-lg mb-2">Giỏ hàng</h2>
            <div className="max-h-[120px] overflow-auto">
              {orderList.length === 0 ? (
                <p className="text-gray-500">Chưa chọn sản phẩm nào</p>
              ) : (
                orderList?.map((item) => (
                  <div className="flex items-center justify-between mb-2">
                    <img src={item?.imageURl} alt="" className="h-16" />
                    <span>
                      {item.name} ({item.price?.toLocaleString()}đ)
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleMinus(item)}
                        className="bg-red-400 px-2 rounded text-white hover:bg-red-500"
                      >
                        –
                      </button>
                      <span>{item.count}</span>
                      <button
                        onClick={() => handleAdd(item)}
                        className="bg-green-400 px-2 rounded text-white hover:bg-green-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* nút lưu */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="bg-[#4254FB] text-white rounded-2xl py-2 px-4 active:bg-[#1b31f8]"
            >
              Lưu
            </button>
            <button
              onClick={handleCreatePayment}
              className="bg-[#4254FB] text-white rounded-2xl py-2 px-4 active:bg-[#1b31f8]"
            >
              thanh toán
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default OrderModal;
