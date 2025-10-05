import { useState } from "react";
import ModalAddProduct from "./ModalAddProduct";
import ModalAddCategor from "./ModalAddCategor";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

import { MdMoreVert } from "react-icons/md";

const options = ["xóa", "sửa"];
const ITEM_HEIGHT = 48;

const categories = [
  "Cafe",
  "Trà",
  "Trà sửa",
  "Đồ ăn vặt",
  "Sinh tố",
  "Nước ép",
  "Soda",
];
export default function Productlist() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const [products, setProducts] = useState([
    { id: 1, name: "cafe den", size: "L", price: "200000" },
    { id: 2, name: "Sữa chua thạch dừa", size: "L", price: 20000 },
    { id: 3, name: "Sữa chua nếp cẩm", size: "L", price: 20000 },
    { id: 4, name: "Sữa chua việt quất", size: "L", price: 20000 },
  ]);

  const [isOpenModaladdCategory, setIsOpenodaladdCategor] = useState(0);

  const [newProduct, setNewProduct] = useState({
    name: "",
    size: "M",
    price: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    setProducts([...products, { id: products.length + 1, ...newProduct }]);

    // Reset form + đóng modal
    setNewProduct({ name: "", size: "M", price: "" });
    setIsOpen(false);
  };
  return (
    <div className="bg-white h-full rounded-lg ">
      <div className="p-3 flex flex-col justify-center font-semibold">
        <div className="flex justify-between">
          <h1 className="font-semibold text-3xl pl-8">Danh sách sản phẩm</h1>
          <button
            onClick={() => {
              setIsOpenodaladdCategor(true);
            }}
            className="bg-[#4254FB] text-white rounded-[50%] p-2 active:bg-[#2439f7] h-[40px] w-[40px]"
          >
            +
          </button>
        </div>

        <div className="flex gap-2 mt-10 overflow-x-auto w-7xl">
          {categories.map((cat) => (
            <button
              key={cat}
              className=" w-35 px-3 py-1 border  hover:border-[#0BB783]  hover:text-[#0BB783] cursor-pointer rounded-lg font-semibold "
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Table product  */}
        <table className="border w-7xl rounded-lg mt-12  mx-4 pl-10 ">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="border p-2">Tên món</th>
              <th className="border p-2">Loại </th>
              <th className="border p-2">Giá</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2 text-center">{p.size}</td>
                <td className="border p-2 text-center">{p.price}</td>
                <td className="border p-2 text-center">
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
            ))}
          </tbody>
        </table>
        {/* form add/Edit/ */}
        <div className="flex  justify-around gap-2 mt-90 pl-1">
          <div className="flex flex-col w-1/3 gap-2">
            <span>Tên món</span>
            <input
              type="text"
              placeholder="Tên món"
              className="border rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/5">
            <span>Loại</span>
            <select
              name="size"
              className=" w-45 text-center border p-2 rounded-lg"
            >
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div className="flex flex-col  w-1/3  gap-2">
            <span>Giá</span>
            <input
              type="text"
              placeholder="Giá"
              className="border rounded-lg p-2"
            />
          </div>
        </div>
        {/* button */}
        <div className="flex gap-3 justify-around mt-8 text-white">
          <button
            onClick={() => setIsOpen(true)}
            className="w-65 bg-[#0BB783] rounded-lg px-6 py-2"
          >
            Thêm
          </button>
          <button className="w-65 bg-[#ff2f00] rounded-lg px-6 py-2">
            Xóa
          </button>
          <button className="w-65 bg-[#0f15ce] rounded-lg px-6 py-2">
            Sửa
          </button>
          <button className="w-65 bg-[#f5ae07] rounded-lg px-6 py-2">
            Lưu
          </button>
        </div>
      </div>
      <ModalAddCategor
        isOpenModaladdCategory={isOpenModaladdCategory}
        setIsOpenodaladdCategor={setIsOpenodaladdCategor}
      />
      <ModalAddProduct
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleAddProduct}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
      />
    </div>
  );
}
