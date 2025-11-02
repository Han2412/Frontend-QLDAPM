import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { useCreateTableMutation } from "../../store/Slices/Table";
import { toast } from "react-toastify";

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

function OrderModalEditTable({ handleCloseModal, open, data }) {
  const [dataTable, setDataTable] = useState({
    tableNumber: "",
  });

  const [
    createTable,
    { isLoading: isLoadingCreate, isSuccess, isError, error },
  ] = useCreateTableMutation();

  // ✅ Khi mở modal và có data (trường hợp edit), set lại dữ liệu vào input
  useEffect(() => {
    if (data) {
      setDataTable({
        tableNumber: data.tableNumber || "",
      });
    } else {
      setDataTable({
        tableNumber: "",
      });
    }
  }, [data, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataTable((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  try {
    const res = await createTable(dataTable).unwrap();
    console.log("Tạo bàn thành công:", res);
    toast.success("✅ Thêm bàn thành công!");
    handleCloseModal();
  } catch (err) {
    console.error("❌ Lỗi khi tạo bàn:", err);
    toast.error("❌ Thêm bàn thất bại!");
  }
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
          <h1 className="mb-4 font-bold ">Thêm bàn </h1>
          <Input
            label="Tên bàn"
            name="tableNumber"
            value={dataTable.tableNumber}
            onChange={handleChange}
          />
          <div className="w-full flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isLoadingCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {isLoadingCreate ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default OrderModalEditTable;
