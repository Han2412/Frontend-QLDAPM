import React, { useState, useEffect } from "react";
import { useGetAllCategoriesQuery } from "../../store/Slices/categorySlide";
import { useUpdateProductMutation} from "../../store/Slices/productSlice";
import Input from "../../components/Input";

export default function ModalEditProduct({ isOpen, onClose, product }) {
  const [previewImage, setPreviewImage] = useState(null);
  const { data: categories = [] } = useGetAllCategoriesQuery();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    categoryID: "",
    isavailable: 1,
    imageFile: null,
  });

  // Khi mở modal, gán dữ liệu sản phẩm cũ vào form
  useEffect(() => {
    if (product) {
      setEditedProduct({
        name: product.name || "",
        price: product.price || "",
        categoryID: product.categoryID || "",
        isavailable: product.isavailable ?? 1,  
        imageFile:null,
      });
      console.log("product",product);
      setPreviewImage(product.imageURl || null);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditedProduct({ ...editedProduct, imageFile: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", editedProduct.name);
    formData.append("price", editedProduct.price);
    formData.append("categoryID", editedProduct.categoryID);
    formData.append("isvAilable", editedProduct.isavailable);
    if (editedProduct.imageFile) {
      formData.append("imageURL", editedProduct.imageFile);
    }

    try {
      const result = await updateProduct({
        id: product.id,
        body: formData,
      }).unwrap();

      console.log("Product updated:", result);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-200/50 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Sửa sản phẩm</h2>

        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Tên món"
            className="border rounded-lg p-2"
            value={editedProduct.name}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, name: e.target.value })
            }
          />

          <select
            className="border p-2 rounded-lg"
            value={editedProduct.categoryID}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, categoryID: e.target.value })
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
            value={editedProduct.price}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, price: e.target.value })
            }
          />

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Hình ảnh</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded-lg"
            />
            <div>
            
            </div>
             {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border mt-2"
              />
            ) : (
              <p className="text-sm text-gray-500 mt-2">Chưa có ảnh</p>
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
            onClick={handleUpdate}
            disabled={isLoading}
            className="px-4 py-2 bg-[#0BB783] rounded-lg text-white"
          >
            {isLoading ? "Đang lưu..." : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
