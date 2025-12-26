import { useState } from "react";
import ModalAddProduct from "./ModalAddProduct";
import ModalAddCategor from "./ModalAddCategor";
import ModalEditProduct from "./ModalEditProduct";
import { useGetAllCategoriesQuery } from "../../store/Slices/categorySlide";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../store/Slices/productSlice";

export default function Productlist() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: categories = [] } = useGetAllCategoriesQuery();

  const { data: products = [], setProducts } = useGetAllProductsQuery();
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

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const [deleteproduct] = useDeleteProductMutation();

  const handleDelete = async (productId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await deleteproduct(productId).unwrap();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      alert("Xóa thất bại!");
    }
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
            className="bg-[#0BB783] text-white rounded p-2 mr-3 mt-4 active:bg-green-300 "
          >
            thêm danh mục sản phẩm
          </button>
        </div>

        <div className="flex gap-2 mt-10 overflow-x-auto pl-4 w-7xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className=" w-35 px-3 py-1 border  hover:border-[#0BB783]  hover:text-[#0BB783] cursor-pointer rounded-lg font-semibold "
            >
              {cat.name}
            </button>
          ))}
        </div>
        {/* Table product  */}
        <table className="border w-8xl rounded-lg mt-12 h-full mx-4 pl-10 ">
          <thead className="border border-black">
            <tr className="bg-[#0BB783] text-xl text-white  ">
              <th className="border p-3">Tên món</th>
              <th className="border p-3">Hình ảnh </th>
              <th className="border p-3">Loại </th>
              <th className="border p-3">Giá</th>
              <th className="border p-3">Hành động</th>
            </tr>
          </thead>
          <tbody className=" ">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-green-200">
                <td className="border p-2 text-center ">{p.name}</td>
                <td className="border p-2 text-center ">
                  {" "}
                  <img
                    src={p.imageURL || p.imageURl} // handle both naming styles
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-lg mx-auto"
                  />
                </td>
                <td className="border p-2 text-center ">
                  {categories.find((c) => c.id === p.categoryID)?.name}
                </td>
                <td className="border p-2 text-center ">
                  {p.price?.toLocaleString()}đ
                </td>
                <td className="border-t p-2 text-center  flex justify-center gap-2">
                  <button
                    size="sm "
                    className=" bg-amber-400 hover:bg-amber-200 px-3 py-1 rounded-lg"
                    onClick={() => handleEdit(p)}
                  >
                    <AiFillEdit className="w-6 h-6 mr-1" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-400 px-3 py-1 rounded-lg"
                  >
                    <AiTwotoneDelete className="w-6 h-6 mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* button */}
        <div className="flex gap-3 justify-start mt-8 pl-5 bottom-0  text-white">
          <button
            onClick={() => setIsOpen(true)}
            className="w-65 bg-[#0BB783] rounded-lg px-6 py-2"
          >
            Thêm
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

      <ModalEditProduct
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
