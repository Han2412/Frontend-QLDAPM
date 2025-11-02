import { useState } from "react";
import {
  useGetAllTableQuery,
  useUpdateTableStatusMutation,
} from "../../store/Slices/Table";
import OrderModalEditTable from "./OrderModalEditTable";
import { RiReservedLine } from "react-icons/ri";
import { GrConfigure } from "react-icons/gr";
function ListTable() {
  const { data, isLoading, error } = useGetAllTableQuery();
  const [openModal, setOpenModal] = useState(false);
  const [dataTable, setdataTable] = useState({});
  const [UpdateStastus, { isLoading: isLoadingUpdate, isSuccess, isError }] =
    useUpdateTableStatusMutation();
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = (id, status) => {
    setOpenModal(true);
  };

  const handleUpdateStastus = async (id) => {
    const dataupdate = {
      id: id,
      status: 2,
    };
    try {
      const res = await UpdateStastus(dataupdate).unwrap();
      alert("✅ Thêm bàn thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi tạo bàn:", err);
      alert("Thêm bàn thất bại!");
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-center ">
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
          <button
            onClick={() => handleOpenModal()}
            className="bg-[#0BB783] text-white rounded-[50%] p-2 mr-3 mt-4 active:bg-green-300 h-[40px] w-[40px]"
          >
            +
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 px-3 mt-3">
          {data?.map((item, index) => (
            <div
              key={index}
              className={`p-6 flex justify-between  text-white rounded-lg ${
                item.status === "0"
                  ? "bg-[#0BB783]"
                  : item.status === "1"
                  ? "bg-[#06f9b0]"
                  : "bg-[#ed873e]"
              }`}
            >
              <p className=" text-3xl font-bold">{item.tableNumber}</p>
              <div className=" flex flex-col gap-2">
                <button
                  disabled={item.status === "2"}
                  onClick={() => handleUpdateStastus(item.id)}
                  className="hover:text-gray-200 active:text-gray-300"
                >
                  <RiReservedLine className="text-2xl " />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <OrderModalEditTable
        handleCloseModal={handleCloseModal}
        open={openModal}
        dataTable={dataTable}
      />
    </div>
  );
}

export default ListTable;
