import React, { useState } from "react";
import { X } from "lucide-react";

interface CreateWarehouseModalProps {
  save: (data: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateWarehouseModal({
  save,
  isOpen,
  onClose,
}: CreateWarehouseModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Create New Warehouse</h2>

        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warehouse Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
              onClick={() => {
                save(formData);
                onClose();
              }}
            >
              Create Warehouse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
