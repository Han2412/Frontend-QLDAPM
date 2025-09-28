import logo from "../../assets/images/logo.png";
import {
  AiFillHome,
  AiFillShopping,
  AiOutlineBarChart,
  AiOutlineTeam,
} from "react-icons/ai";
export default function Sidebar() {
  return (
    <aside className="w-74 flex flex-col ">
      <div className="flex justify-start items-center p-5 gap-3">
        <img src={logo}></img>
        <h1 className="text-2xl font-bold">LOGO</h1>
      </div>
      <ul className="flex flex-col gap-4 mt-8">
        <li className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg">
          <AiFillHome className="w-6 h-6" /> Trang chủ
        </li>
        <li className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg">
          <AiFillShopping className="w-6 h-6" /> Bán hàng
        </li>
        <li className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg">
          <AiOutlineBarChart className="w-6 h-6" /> Thống kê
        </li>
        <li className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg">
          <AiFillHome className="w-6 h-6" /> Sản phẩm | Menu
        </li>
        <li className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg">
          <AiFillHome className="w-6 h-6" /> Hóa đơn
        </li>
        <li className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg">
          <AiOutlineTeam className="w-6 h-6" /> Nhân viên
        </li>
        <li className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg">
          <AiFillHome className="w-6 h-6" />
          Khách hàng
        </li>
        <li className="flex items-center justify-start gap-2 font-semibold cursor-pointer hover:bg-[#0BB783] p-4 mx-8 rounded-lg">
          <AiFillHome className="w-6 h-6" />
          đăng xuất
        </li>
      </ul>
    </aside>
  );
}
