import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import Input from "../../components/Input";

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

function ModalEditEployee({ handleCloseModal, open }) {
  const [data, setData] = useState({
    name: "",
    SDT: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <h1 className="text-[#4254FB] pb-6 font-bold text-[20px]">
            Thêm Nhân viên{" "}
          </h1>
          <Input
            label="Tên nhân viên"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <Input
            label="Số điện thoại"
            name="SDT"
            value={data.SDT}
            onChange={handleChange}
          />
          <Input
            label="Mật khẩu"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          />
          <div className="flex justify-end">
            <button className="bg-[#4254FB] text-white rounded-2xl py-2 px-4 active:bg-[#1b31f8]">
              thêm
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalEditEployee;
