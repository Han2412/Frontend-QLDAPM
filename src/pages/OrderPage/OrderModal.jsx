import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

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

const dataProduct = [
  { id: 1, name: "Cà phê đen", price: 20000, category: "Cà phê" },
  { id: 2, name: "Cà phê sữa", price: 25000, category: "Cà phê" },
  { id: 3, name: "Bạc xỉu", price: 30000, category: "Cà phê" },
  { id: 4, name: "Trà đào cam sả", price: 35000, category: "Trà" },
];

function OrderModal({ handleCloseModal, open }) {
  const [orderList, setOrderList] = useState([]);

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
            {dataProduct.map((item) => (
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <span className="text-gray-500">{item.price} đ</span>
                </div>
                <button
                  onClick={() => handleAdd(item)}
                  className="bg-green-400 px-3 py-1 rounded-lg text-white hover:bg-green-500"
                >
                  +
                </button>
              </div>
            ))}
          </div>

          {/* giỏ hàng */}
          <div className="mt-6">
            <h2 className="font-bold text-lg mb-2">Giỏ hàng</h2>
            <div className="max-h-[120px] overflow-auto">
              {orderList.length === 0 ? (
                <p className="text-gray-500">Chưa chọn sản phẩm nào</p>
              ) : (
                orderList.map((item) => (
                  <div className="flex items-center justify-between mb-2">
                    <span>
                      {item.name} ({item.price}đ)
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
            <button className="bg-[#4254FB] text-white rounded-2xl py-2 px-4 active:bg-[#1b31f8]">
              Lưu
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default OrderModal;
