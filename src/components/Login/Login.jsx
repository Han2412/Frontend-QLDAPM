import ImgLogin from "../../assets/images/SBX_WWF_827х900_EN.jpg 1.png";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

export default function Login() {
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
              type="input"
              className="outline-none w-full pl-3 bg-white"
              placeholder="admin"
            />
          </div>
          <div className="h-14 flex items-center border rounded-md">
            <AiOutlineLock className="w-7 h-7 text-gray-500 pl-3 " />
            <input
              type="password"
              className="outline-none pl-3 bg-white w-full"
              placeholder="admin"
            />
            <span className="text-sm  pr-2 text-gray-500">show</span>
          </div>

          <buttton className="bg-[#00B265] text-white text-center p-3">
            Đăng nhập
          </buttton>
          <div className="text-center text-sm text-gray-500">
            <a href="/home" className="hover:text-[#00B265]">Quên mật khẩu </a>
          </div>
        </div>
      </div>
    </div>
  );
}
