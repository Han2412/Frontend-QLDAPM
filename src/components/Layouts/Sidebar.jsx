import logo from "../../assets/images/logo.png";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineBarChart,
  AiOutlineTeam,
  AiOutlineFileText,
  AiOutlineLogout,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const navigating = (index) => {
    switch (index) {
      case 1:
        navigate("/"); // Trang chủ
        break;
      case 2:
        navigate("/sales"); // Bán hàng
        break;
      case 3:
        navigate("/statistics"); // Thống kê
        break;
      case 4:
        navigate("/product"); // product
        break;
      case 5:
        navigate("/bills");
        break;
      case 6:
        navigate("/employees"); // Sản phẩm
        break;

      case 7:
        localStorage.removeItem("token");
        localStorage.removeItem("roleID");

        navigate("/login"); // Đăng xuất → có thể xóa token trước
        break;
      default:
        navigate("/notfound");
    }
  };

  return (
    <aside className="w-74 flex flex-col bg-white">
      <div className="flex justify-start items-center p-5 gap-3">
        <img src={logo} alt="logo" />
        <h1 className="text-2xl font-bold">LOGO</h1>
      </div>

      <ul className="flex flex-col gap-1 mt-8">
        <li
          onClick={() => navigating(1)}
          className="flex items-center justify-start gap-6 font-semibold cursor-pointer hover:bg-[#0BB783] hover:text-white p-4 mx-3 rounded-lg"
        >
          <AiOutlineHome className="w-6 h-6" /> Trang chủ
        </li>

        <li
          onClick={() => navigating(2)}
          className="flex items-center justify-start gap-6 font-semibold cursor-pointer hover:bg-[#0BB783] hover:text-white p-4 mx-3 rounded-lg"
        >
          <AiOutlineShopping className="w-6 h-6" /> Bán hàng
        </li>

        <li
          onClick={() => navigating(3)}
          className="flex items-center justify-start gap-6 font-semibold cursor-pointer hover:bg-[#0BB783] hover:text-white p-4 mx-3 rounded-lg"
        >
          <AiOutlineBarChart className="w-6 h-6" /> Thống kê
        </li>

        <li
          onClick={() => navigating(4)}
          className="flex items-center justify-start gap-6 font-semibold cursor-pointer hover:bg-[#0BB783] hover:text-white p-4 mx-3 rounded-lg"
        >
          <AiOutlineShoppingCart className="w-6 h-6" /> Sản phẩm
        </li>

        <li
          onClick={() => navigating(5)}
          className="flex items-center justify-start gap-6 font-semibold cursor-pointer hover:bg-[#0BB783] hover:text-white p-4 mx-3 rounded-lg"
        >
          <AiOutlineFileText className="w-6 h-6" /> Hóa đơn
        </li>

        <li
          onClick={() => navigating(6)}
          className="flex items-center justify-start gap-6 font-semibold cursor-pointer hover:bg-[#0BB783] hover:text-white p-4 mx-3 rounded-lg"
        >
          <AiOutlineTeam className="w-6 h-6" /> Nhân viên
        </li>

        <li
          onClick={() => navigating(7)}
          className="flex items-center justify-start gap-6 font-semibold cursor-pointer hover:bg-[#0BB783] hover:text-white p-4 mx-3 rounded-lg"
        >
          <AiOutlineLogout className="w-6 h-6" /> Đăng xuất
        </li>
      </ul>
    </aside>
  );
}
