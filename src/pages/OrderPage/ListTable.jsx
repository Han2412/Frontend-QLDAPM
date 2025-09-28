import { useState } from "react";
import OrderModal from "./OrderModal";

function ListTable() {
  const dataListable = [
    { lable: "b1" },
    { lable: "b2" },
    { lable: "b3" },
    { lable: "b4" },
    { lable: "b5" },
    { lable: "b6" },
  ];
  const [openModal, setOpenModal] = useState(false);
  console.log("🚀 ~ ListTable ~ openModal:", openModal);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  return (
    <div>
      <div className="flex pb-3 items-center gap-2">
        <div className="flex gap-2 items-center">
          <div className="bg-[#0BB783] w-10 h-10 rounded-2xl"></div>{" "}
          <p> bàn trống</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-[#06f9b0] w-10 h-10 rounded-2xl"></div>{" "}
          <p> bàn có khách</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-[#ed873e] w-10 h-10 rounded-2xl"></div>{" "}
          <p> đã đặt</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 px-3">
        {dataListable.map((item, index) => (
          <button
            key={index}
            onClick={handleOpenModal}
            className="p-6 bg-[#0BB783] text-white rounded-lg hover:bg-[#13e8a8]"
          >
            {item.lable}
          </button>
        ))}
      </div>
      <OrderModal handleCloseModal={handleCloseModal} open={openModal} />
    </div>
  );
}

export default ListTable;
