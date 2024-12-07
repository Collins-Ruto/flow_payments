import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateItemModalProps {
  save: (data: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateItemModal({ isOpen, onClose, save }: CreateItemModalProps,) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    unit_price: '',
    quantity: '',
    weight: '',
    dimensions: '',
    manufacturer: '',
    sku: '',
    status: ''
  });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log('Item created:', formData);
  //   onClose();
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

        <h2 className="text-2xl font-semibold mb-6">Create New Item</h2>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name of Item
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
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
                <option value="food">Food & Beverages</option>
                <option value="health">Health & Beauty</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price per Unit (ICP)
              </label>
              <input
                type="number"
                step="0.01"
                name="unit_price"
                value={formData.unit_price}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.01"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dimensions (L x W x H cm)
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder="30 x 20 x 10"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer
              </label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Units
              </label>
              <input
                type="number"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              >
                <option value="">Select Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
              required
            />
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
                console.log("The form data is: ", formData);
                save({
                  name: formData.name,
                  description: formData.description,
                  category: formData.category,
                  unit_price: formData.unit_price,
                  quantity: formData.quantity,
                  weight: formData.weight,
                  dimensions: formData.dimensions,
                  manufacturer: formData.manufacturer,
                  sku: formData.sku,
                  status: formData.status
                });
                onClose();
              }}
            >
              Create Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}