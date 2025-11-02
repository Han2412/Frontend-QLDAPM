import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import {
  useGetOneAccountQuery,
  useUpdateAccountMutation,
  useRegisterMutation, // 👈 thêm dòng này
} from "../../store/Slices/authSlice";

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

function ModalEditEployee({ handleCloseModal, open, id }) {
  console.log("🚀 ~ ModalEditEployee ~ id:", id);

  const [updateAccount, { isLoading: isUpdating }] = useUpdateAccountMutation();
  const [registerAccount, { isLoading: isRegistering }] = useRegisterMutation(); // 👈 mutation đăng ký mới

  const {
    data: dataemployee,
    isSuccess,
    refetch,
  } = useGetOneAccountQuery(id, {
    skip: !id,
  });

  const [data, setData] = useState({
    full_name: "",
    name: "",
    SDT: "",
    password: "",
    roleID: null,
  });

  // ✅ Load dữ liệu khi sửa
  useEffect(() => {
    if (open && id) refetch();

    if (isSuccess && dataemployee?.data?.length > 0) {
      const emp = dataemployee.data[0];
      setData({
        full_name: emp.full_name,
        name: emp.name || "",
        SDT: emp.phoneNumber || "",
        password: "",
        roleID: emp.roleID || null,
      });
    } else if (!id) {
      // ✅ Reset form khi thêm mới
      setData({
        full_name: "",
        name: "",
        SDT: "",
        password: "",
        roleID: null,
      });
    }
  }, [isSuccess, dataemployee, open, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.SDT || !data.roleID) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Nếu có id => cập nhật
    if (id) {
      try {
        const payload = {
          id,
          data: {
            full_name: data.full_name,
            phoneNumber: data.SDT,
            roleID: Number(data.roleID),
          },
        };
        const res = await updateAccount(payload).unwrap();
        console.log("✅ Cập nhật thành công:", res);

        alert("Cập nhật nhân viên thành công!");
        handleCloseModal();
      } catch (error) {
        console.error("❌ Lỗi cập nhật:", error);
        alert("Lỗi khi cập nhật nhân viên!");
      }
    } else {
      // ✅ Nếu không có id => đăng ký mới
      if (!data.password) {
        alert("Vui lòng nhập mật khẩu!");
        return;
      }

      try {
        const payload = {
          name: data.name, // dùng số điện thoại làm username nếu muốn
          password: data.password,
          full_name: data.full_name,
          phoneNumber: data.SDT,
          roleID: Number(data.roleID),
        };
        const res = await registerAccount(payload).unwrap();
        console.log("✅ Đăng ký thành công:", res);
        alert("Thêm nhân viên mới thành công!");
        handleCloseModal();
      } catch (error) {
        console.error("❌ Lỗi đăng ký:", error);
        alert("Đăng ký nhân viên thất bại!");
      }
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <h1 className="text-[#4254FB] pb-6 font-bold text-[20px]">
            {id ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
          </h1>

          <Input
            label="Tên nhân viên"
            name="full_name"
            value={data.full_name}
            onChange={handleChange}
          />
          <Input
            label="Số điện thoại"
            name="SDT"
            value={data.SDT}
            onChange={handleChange}
          />
          {!id && (
            <Input
              label="tên đăng nhập"
              name="name"
              type="text"
              value={data.name}
              onChange={handleChange}
            />
          )}
          {!id && (
            <Input
              label="Mật khẩu"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
            />
          )}

          <div className="flex flex-col mb-4">
            <label className="mb-1 font-medium text-gray-700">Quyền</label>
            <select
              name="roleID"
              value={data.roleID || ""}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Chọn quyền --</option>
              <option value={1}>Quản lý</option>
              <option value={2}>Nhân viên phục vụ</option>
              <option value={3}>Nhân viên pha chế</option>
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              disabled={isUpdating || isRegistering}
              className={`bg-[#4254FB] text-white rounded-2xl py-2 px-4 active:bg-[#1b31f8] ${
                isUpdating || isRegistering
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {id
                ? isUpdating
                  ? "Đang lưu..."
                  : "Lưu thay đổi"
                : isRegistering
                ? "Đang thêm..."
                : "Thêm mới"}
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalEditEployee;
