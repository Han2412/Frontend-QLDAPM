import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

import { MdMoreVert } from "react-icons/md";
import ModalEditEployee from "./ModalEditEployee";

const options = ["xóa", "sửa"];
const ITEM_HEIGHT = 48;
function Employee() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const status = (status) => {
    switch (status) {
      case "1":
        return (
          <p className="bg-green-500 text-white rounded-lg px-2 py-1 w-[100px] ">
            hoạt động{" "}
          </p>
        );
      case "2":
        return (
          <p className="bg-red-500 text-white rounded-lg px-2 py-1 w-[150px]">
            không hoạt động{" "}
          </p>
        );
      default:
        return (
          <p className="bg-gray-500 text-white rounded-lg px-2 py-1">không xác định</p>
        );
    }
  };

  return (
    <div className="bg-white h-full">
      <h1 className="text-2xl font-bold pl-4 pt-4">Danh sách nhân viên</h1>
      <div className="flex justify-end py-2 pr-5">
        <button
          onClick={handleOpenModal}
          className="bg-[#4254FB] text-white rounded-[50%] p-2 active:bg-[#2439f7] h-[40px] w-[40px]"
        >
          +
        </button>
      </div>
      <div className="overflow-hidden  shadow px-6 ">
        <table className="w-full bg-white border">
          <tr className="border-b border-gray-300 py-2 h-[40px] bg-gray-200">
            <th className="border">STT</th>
            <th className="border">Tên </th>
            <th className="border">SDT</th>
            <th className="border">Trạng thái</th>
            <th className="border"></th>
          </tr>
          <tr className="text-center py-2 h-[40px]">
            <td className="border">1</td>
            <td className="border">Nguyễn Hoài Hân</td>
            <td className="border">0987654321</td>
            <td className="border">
              <div className="flex  justify-center">{status("1")}</div>
            </td>
            <td>
              <MdMoreVert onClick={handleClick} />
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </td>
          </tr>
          <tr className="text-center py-2 h-[40px]">
            <td className="border">1</td>
            <td className="border">Nguyễn Hoài cường</td>
            <td className="border">0987654321</td>
            <td className="border">
              <div className="flex  justify-center">{status("2")}</div>
            </td>
            <td className="border">
              <MdMoreVert onClick={handleClick} />
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </td>
          </tr>
        </table>
      </div>

      <ModalEditEployee handleCloseModal={handleCloseModal} open={openModal} />
    </div>
  );
}

export default Employee;
