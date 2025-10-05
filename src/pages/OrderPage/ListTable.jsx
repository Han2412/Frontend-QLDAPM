import { useState } from "react";
import OrderModal from "./OrderModal";
import { useGetAllTableQuery } from "../../store/Slices/categorySlide";
// import { useGetAllTableQuery } from "../../store/Slices/categorySlide";

function ListTable() {
  const { data, isLoading, error } = useGetAllTableQuery();

  const [openModal, setOpenModal] = useState(false);
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
        {data?.map((item, index) => (
          <button
            onClick={handleOpenModal}
            className={`p-6  text-white rounded-lg hover:bg-[#13e8a8] ${
              item.status === "0"
                ? "bg-[#0BB783]"
                : item.status === "1"
                ? "bg-[#06f9b0]"
                : "bg-[#ed873e] "
            }`}
          >
            {item.tableNumber}
          </button>
        ))}
      </div>
      <OrderModal handleCloseModal={handleCloseModal} open={openModal} />
    </div>
  );
}

export default ListTable;
