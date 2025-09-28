import logo from "../../assets/images/logo.png";
import {
  AiFillHome,
  AiFillShopping,
  AiOutlineBarChart,
  AiOutlineTeam,
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
        navigate("/bills"); // Hóa đơn
        break;
      case 6:
        navigate("/employees"); // Nhân viên
        break;
      case 7:
        navigate("/products"); // Sản phẩm
        break;
      case 5:
        navigate("/customers"); // Khách hàng
        break;
      case 8:
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

      <ul className="flex flex-col gap-4 mt-8">
        <li
          onClick={() => navigating(1)}
          className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg"
        >
          <AiFillHome className="w-6 h-6" /> Trang chủ
        </li>

        <li
          onClick={() => navigating(2)}
          className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg"
        >
          <AiFillShopping className="w-6 h-6" /> Bán hàng
        </li>

        <li
          onClick={() => navigating(3)}
          className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg"
        >
          <AiOutlineBarChart className="w-6 h-6" /> Thống kê
        </li>

        <li
          onClick={() => navigating(4)}
          className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg"
        >
          <AiFillHome className="w-6 h-6" /> Sản phẩm | Menu
        </li>

        <li
          onClick={() => navigating(5)}
          className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg"
        >
          <AiFillHome className="w-6 h-6" /> Hóa đơn
        </li>

        <li
          onClick={() => navigating(6)}
          className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg"
        >
          <AiOutlineTeam className="w-6 h-6" /> Nhân viên
        </li>

        <li
          onClick={() => navigating(7)}
          className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg"
        >
          <AiFillHome className="w-6 h-6" /> Khách hàng
        </li>

        <li
          onClick={() => navigating(8)}
          className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg"
        >
          <AiFillHome className="w-6 h-6" /> Đăng xuất
        </li>
      </ul>
    </aside>
  );
}
