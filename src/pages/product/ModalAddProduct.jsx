import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetAllCategoriesQuery } from "../../store/Slices/categorySlide";
import { useAddProductMutation } from "../../store/Slices/productSlice";
import Input from "../../components/Input";

// ✅ Schema validate với Yup
const schema = yup.object().shape({
  name: yup.string().required("Tên sản phẩm không được để trống"),
  price: yup
    .number()
    .required("Vui lòng nhập giá sản phẩm")
    .typeError("Giá phải là số")
    .positive("Giá phải lớn hơn 0"),
  categoryID: yup.string().required("Vui lòng chọn danh mục"),
  imageFile: yup.mixed().required("Vui lòng chọn hình ảnh"),
});

export default function ModalAddProduct({ isOpen, onClose }) {
  const { data: categories = [] } = useGetAllCategoriesQuery();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [previewImage, setPreviewImage] = useState(null);

  // ✅ Khởi tạo react-hook-form + yup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      categoryID: "",
      imageFile: null,
    },
  });

  // ✅ Tự động chọn danh mục đầu tiên nếu chưa chọn
  useEffect(() => {
    if (categories.length) {
      setValue("categoryID", categories[0].id);
    }
  }, [categories]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("imageFile", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("categoryID", data.categoryID);
    formData.append("isavailable", 1);
    formData.append("image", data.imageFile);

    try {
      await addProduct(formData).unwrap();
      reset();
      setPreviewImage(null);
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-200/50 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Thêm sản phẩm</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* Tên sản phẩm */}
          <div>
            <Input
              type="text"
              placeholder="Tên món"
              {...register("name")}
              className="border rounded-lg p-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Danh mục */}
          <div>
            <select
              {...register("categoryID")}
              className="border p-2 rounded-lg w-full"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryID && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryID.message}
              </p>
            )}
          </div>

          {/* Giá */}
          <div>
            <input
              type="number"
              placeholder="Giá"
              {...register("price")}
              className="border rounded-lg p-2 w-full"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Ảnh */}
          <div>
            <label className="font-medium text-gray-700">Hình ảnh</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded-lg w-full"
            />
            {errors.imageFile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.imageFile.message}
              </p>
            )}
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border mt-2"
              />
            )}
          </div>

          {/* Nút */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded-lg text-white"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0BB783] rounded-lg text-white"
              disabled={isLoading}
            >
              {isLoading ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
