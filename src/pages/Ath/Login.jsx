import { useState } from "react";
import ImgLogin from "../../assets/images/ImgLogin.png";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useLoginMutation } from "../../store/Slices/authSlice";

export default function Login() {
  const [form, setForm] = useState({ name: "", password: "" });
  console.log("🚀 ~ Login ~ form:", form);
  const [login, { data, error, isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await login(form);
    console.log("Login Response:", res);
    if (res?.data?.token) {
      localStorage.setItem("token", res.data.token); // lưu token
      localStorage.setItem("roleID", res.data.roleID);

      // điều hướng sang trang home
      window.location.href = "/home";
    }
  };
  return (
    <div className="flex justify-center space-x-12 items-center h-screen">
      <div className="h-full]">
        <img className="h-[70vh]" src={ImgLogin}></img>
      </div>

      <div className="flex flex-col ">
        <div className="flex flex-col space-y-6 justify-center text-center">
          <h1 className=" font-bold text-2xl">CHÚC BẠN MỘT NGÀY TỐT LÀNH</h1>
          <span>ĐĂNG NHẬP ĐỂ TIẾP TỤC</span>
        </div>
        <div className="flex flex-col space-y-4 mt-6">
          <div className="h-14 flex items-center border rounded-md">
            <AiOutlineUser className="w-7 h-7 text-gray-500 pl-3" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="outline-none w-full pl-3 bg-white"
              placeholder="Tên đăng nhập"
            />
          </div>
          <div className="h-14 flex items-center border rounded-md">
            <AiOutlineLock className="w-7 h-7 text-gray-500 pl-3 " />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="outline-none pl-3 bg-white w-full"
              placeholder="Mật khẩu"
            />
            <span className="text-sm  pr-2 text-gray-500">show</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-[#00B265] text-white text-center p-3 rounded-md"
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error?.data?.message || "Đăng nhập thất bại!"}
            </div>
          )}
          <div className="text-center text-sm text-gray-500">
            <a href="/home" className="hover:text-[#00B265]">
              Quên mật khẩu{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
