import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/images/Avatar.png";
import { useGetProfileQuery } from "../../store/Slices/authSlice";

export default function Header() {
  const { data } = useGetProfileQuery();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleID");

    navigate("/login");
  };
  const navigateToProfffilePage = () => {
    navigate("/profile");
  };
  return (
    <div className="h-20 flex justify-between p-4 bg-white shadow">
      {/* <h1 className="text-2xl font-semibold">Sản phẩm 1 menu</h1> */}
      <div></div>

      <div className="flex items-center gap-2 relative group">
        <img src={Avatar} className="w-12 h-12" />

        <div className="flex flex-col font-semibold">
          <span>{data?.data[0]?.full_name}</span>
          <span className="text-sm text-gray-400">{data?.data[0]?.name}</span>
        </div>

        <div
          className="
      absolute top-full  w-full
      bg-white rounded-2xl shadow
      opacity-0 translate-y-2 pointer-events-none
      transition-all duration-300 delay-300
      group-hover:opacity-100
      group-hover:translate-y-0
      group-hover:pointer-events-auto
    "
        >
          <div className="flex flex-col gap-2 p-2 mt-2">
            <button
              className="p-2 px-4 hover:bg-gray-100 rounded-lg"
              onClick={navigateToProfffilePage}
            >
              Thông tin cá nhân
            </button>
            <button
              className="p-2 px-4 hover:bg-gray-100 rounded-lg"
              onClick={logout}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
