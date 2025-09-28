import React from "react";

export default function ModalAddProduct({ isOpen, onClose, onSave, newProduct, setNewProduct }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200/50 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Thêm sản phẩm</h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Tên món"
            className="border rounded-lg p-2"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <select
            className="border p-2 rounded-lg"
            value={newProduct.size}
            onChange={(e) =>
              setNewProduct({ ...newProduct, size: e.target.value })
            }
          >
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
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
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 rounded-lg text-white"
          >
            Hủy
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-[#0BB783] rounded-lg text-white"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
