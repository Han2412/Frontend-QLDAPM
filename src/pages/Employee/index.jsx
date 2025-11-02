import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdMoreVert } from "react-icons/md";
import ModalEditEployee from "./ModalEditEployee";
import {
  useGetAllAccountQuery,
  useUpdateAccountMutation,
} from "../../store/Slices/authSlice";
import { useState } from "react";

const options = ["xóa", "sửa"];
const ITEM_HEIGHT = 48;

function Employee() {
  const [updateAccount] = useUpdateAccountMutation();
  const { data, refetch } = useGetAllAccountQuery();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };
  const [openModal, setOpenModal] = useState(false);
  const [seclectID, setSeclectID] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
    setSeclectID(null);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setSeclectID(null);

    refetch(); // 🔁 Tự động gọi lại API khi đóng modal sau khi thêm/sửa
  };

  const status = (status) => {
    switch (status) {
      case 1:
        return (
          <p className="bg-green-500 text-white rounded-lg px-2 py-1 w-[100px]">
            hoạt động
          </p>
        );
      case 0:
      case 2:
        return (
          <p className="bg-red-500 text-white rounded-lg px-2 py-1 w-[150px]">
            không hoạt động
          </p>
        );
      default:
        return (
          <p className="bg-gray-500 text-white rounded-lg px-2 py-1">
            không xác định
          </p>
        );
    }
  };

  const isposition = (roleID) => {
    switch (roleID) {
      case 1:
        return <p>Admin</p>;
      case 2:
        return <p>NV phục vụ</p>;
      case 3:
        return <p>NV pha chế</p>;
      default:
        return <p>-</p>;
    }
  };

  const handleSeclect = async ({ option, id }) => {
    handleClose(); // đóng menu
    if (option === "sửa") {
      setSeclectID(id);
      setOpenModal(true);
    } else if (option === "xóa") {
      try {
        await updateAccount({
          id,
          data: {
            status: 0,
          },
        });
        alert("Xóa tài khoản thành công!");
        refetch(); // 🔁 Gọi lại API để cập nhật danh sách
      } catch (error) {
        console.error("Lỗi khi xóa tài khoản:", error);
        alert("Xóa tài khoản thất bại!");
      }
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

      <div className="overflow-hidden shadow px-6">
        <table className="w-full bg-white border">
          <thead>
            <tr className="border-b border-gray-300 py-2 h-[40px] bg-gray-200">
              <th className="border">STT</th>
              <th className="border">Tên</th>
              <th className="border">SDT</th>
              <th className="border">Chức vụ</th>
              <th className="border">Trạng thái</th>
              <th className="border"></th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((employee, index) => (
              <tr key={employee.id} className="text-center py-2 h-[40px]">
                <td className="border">{index + 1}</td>
                <td className="border">{employee.full_name}</td>
                <td className="border">{employee.phoneNumber || "-"}</td>
                <td className="border">{isposition(employee.roleID)}</td>
                <td className="border">
                  <div className="flex justify-center">
                    {status(employee.status)}
                  </div>
                </td>
                <td className="border h-full">
                  <div className="flex justify-center">
                    <MdMoreVert onClick={(e) => handleClick(e, employee)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Menu hiển thị đúng nhân viên đang chọn */}
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              border: "0",
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() =>
              handleSeclect({
                option: option,
                id: selectedEmployee?.id,
              })
            }
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      <ModalEditEployee
        handleCloseModal={handleCloseModal}
        open={openModal}
        id={seclectID}
      />
    </div>
  );
}

export default Employee;
