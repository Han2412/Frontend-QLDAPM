import React, { useState, useEffect } from "react";
import { useGetAllCategoriesQuery } from "../../store/Slices/categorySlide";
import { useAddProductMutation } from "../../store/Slices/productSlice";
import Input from "../../components/Input";

export default function ModalAddProduct({ isOpen, onClose }) {
  const [previewImage, setPreviewImage] = useState(null);

  const { data: categories = [], isError } = useGetAllCategoriesQuery();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    categoryID: "", // default to first category
    isavailable: 1, // default to available
    imageFile: null,
  });

  useEffect(() => {
    if (categories.length && !newProduct.categoryID) {
      setNewProduct((prev) => ({ ...prev, categoryID: categories[0].id }));
    }
  }, [categories]);

  const [addProduct, { isLoading }] = useAddProductMutation();

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]; // optional chaining
    if (file) {
      setNewProduct({ ...newProduct, imageFile: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("categoryID", newProduct.categoryID);
    formData.append("isvailable", newProduct.isavailable);
    formData.append("image", newProduct.imageFile);

    try {
      const result = await addProduct(formData).unwrap(); // unwrap to get response
      console.log("Product created:", result);
      onClose(); // close modal or form
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-200/50 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Thêm sản phẩm</h2>

        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Tên món"
            className="border rounded-lg p-2"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          {/*  */}
          <select
            className="border p-2 rounded-lg"
            value={newProduct.categoryID}
            onChange={(e) =>
              setNewProduct({ ...newProduct, categoryID: e.target.value })
            }
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Giá"
            className="border rounded-lg p-2"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          {/* Image upload */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Hình ảnh</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded-lg"
            />
            {/* Preview selected image */}
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border mt-2"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 rounded-lg text-white"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#0BB783] rounded-lg text-white"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
