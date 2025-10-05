import { useState } from "react";
import Input from "../../components/Input";
import { useAddCategoryMutation } from "../../store/Slices/categorySlide";
import { toast } from "react-toastify";

function ModalAddCategor({ isOpenModaladdCategory, setIsOpenodaladdCategor }) {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const [addCategory, { isLoading }] = useAddCategoryMutation(); // ✅ Hook gọi API

  if (!isOpenModaladdCategory) return null;

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleAddImageClick = () => {
    document.getElementById("imageInput").click();
  };

  // ✅ Hàm submit
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (file) formData.append("image", file);

      const res = await addCategory(formData).unwrap();
      console.log("✅ Add category success:", res);

      toast.success("Thêm loại sản phẩm thành công!");
      setIsOpenodaladdCategor(false);
      setData({ name: "", description: "" });
      setImage(null);
      setFile(null);
    } catch (error) {
      console.error("❌ Add category failed:", error);
      toast.error("Thêm loại sản phẩm thất bại!");
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-200/50 bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Thêm loại sản phẩm</h2>
            <button
              onClick={() => setIsOpenodaladdCategor(false)}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          <Input
            label="Tên loại sản phẩm"
            name="name"
            value={data.name}
            onChange={handleChangeData}
          />
          <Input
            label="Mô tả"
            name="description"
            value={data.description}
            onChange={handleChangeData}
          />

          {image && (
            <div className="relative w-full">
              <img
                src={image}
                alt="preview"
                className="w-full object-cover mt-3 rounded-lg border"
              />
              <button
                onClick={() => {
                  setImage(null);
                  setFile(null);
                }}
                className="absolute top-0 right-0 bg-red-600 h-[30px] w-[30px] rounded-full text-white"
              >
                x
              </button>
            </div>
          )}

          <input
            type="file"
            id="imageInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {!image && (
            <button
              onClick={handleAddImageClick}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Thêm ảnh
            </button>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-26 bg-[#0BB783] text-white mt-2.5 rounded-lg px-6 py-2 disabled:opacity-50"
            >
              {isLoading ? "Đang thêm..." : "Thêm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddCategor;
