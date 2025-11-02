import Avatar from "../../assets/images/Avatar.png";

export default function Header() {
  return (
    <div className="h-20 flex justify-between p-4 bg-white shadow">
      {/* <h1 className="text-2xl font-semibold">Sản phẩm 1 menu</h1> */}
      <div></div>

      <div className="flex items-center gap-2">
        <img src={Avatar} className="w-12 h-12"></img>
        <div className="flex flex-col font-semibold">
          <span>Tên nhân viên</span>
          <span className="text-sm text-gray-400">Tên chức vụ</span>
        </div>
      </div>
    </div>
  );
}
