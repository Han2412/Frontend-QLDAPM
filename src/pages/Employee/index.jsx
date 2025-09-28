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
          <p className="bg-green-500 text-white rounded-2xl w-[100px] ">
            hoạt động{" "}
          </p>
        );
      case "2":
        return (
          <p className="bg-red-500 text-white rounded-2xl w-[150px]">
            kông hoạt động{" "}
          </p>
        );
      default:
        return (
          <p className="bg-gray-500 text-white rounded-2xl">không xác định</p>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-end pb-6">
        <button
          onClick={handleOpenModal}
          className="bg-[#4254FB] text-white rounded-[50%] p-3 active:bg-[#2439f7] h-[50px] w-[50px]"
        >
          +
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl shadow ">
        <table className="w-full bg-white ">
          <tr className="border-b border-gray-300 py-2 h-[40px]">
            <th>STT</th>
            <th>tên </th>
            <th>SDT</th>
            <th>trạng thái</th>
            <th></th>
          </tr>
          <tr className="text-center py-2 h-[40px]">
            <td>1</td>
            <td>Nguyễn Hoài Hân</td>
            <td>0987654321</td>
            <td>
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
            <td>1</td>
            <td>Nguyễn Hoài cường</td>
            <td>0987654321</td>
            <td>
              <div className="flex  justify-center">{status("2")}</div>
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
        </table>
      </div>

      <ModalEditEployee handleCloseModal={handleCloseModal} open={openModal} />
    </div>
  );
}

export default Employee;
