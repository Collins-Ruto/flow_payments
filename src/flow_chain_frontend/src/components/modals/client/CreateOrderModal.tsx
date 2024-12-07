import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateOrderModalProps {
  save: (data: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateOrderModal({save, isOpen, onClose }: CreateOrderModalProps) {

  const [item_id, setItemId] = useState(0);
  const [quantity, setQuantity] = useState(0);

  type Item = {
    item_id: number;
    quantity: number;
  };

  const [formData, setFormData] = useState({
    order_name: '',
    expected_delivery: '',
    pickup_address: '',
    delivery_address: '',
    order_type: '',
    order_weight: '',
    priority: '',
    vehicle_type: '',
    category: '',
    items: [] as Item[]
  });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log('Order created:', formData);
  //   onClose();
  // };

   // Function to add an item to the items array
   const addItem = () => {
    // Create a new item object
    const newItem = { item_id, quantity };

    // Update the formData's items array with the new item
    setFormData(prevFormData => ({
      ...prevFormData,
      items: [...prevFormData.items, newItem]
    }));

    // Optionally, reset item_id and quantity inputs
    setItemId(0);
    setQuantity(0);
  };

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

        <h2 className="text-2xl font-semibold mb-6">Create New Order</h2>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Name
              </label>
              <input
                type="text"
                name="order_name"
                value={formData.order_name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Delivery Date
              </label>
              <input
                type="date"
                name="expected_delivery"
                value={formData.expected_delivery}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pick up Address
              </label>
              <input
                type="text"
                name="pickup_address"
                value={formData.pickup_address}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                name="delivery_address"
                value={formData.delivery_address}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Type
              </label>
              <select
                name="order_type"
                value={formData.order_type}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
              >
                <option value="">Select Order Type</option>
                <option value="shipping">Shipping Items for client</option>
                <option value="delivery">buying Items for delivery</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Weight (kg)
              </label>
              <input
                type="number"
                name="order_weight"
                value={formData.order_weight}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type
              </label>
              <select
                name="vehicle_type"
                value={formData.vehicle_type}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
              >
                <option value="">Select Vehicle Type</option>
                <option value="van">Van</option>
                <option value="truck">Truck</option>
                <option value="refrigerated">Refrigerated Truck</option>
              </select>
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
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="perishables">Perishables</option>
                <option value="documents">Documents</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add Items to Order (Item ID, Quantity)
            </label>
            <textarea
              name="items"
              value={formData.items.map(item => `${item.item_id}, ${item.quantity}`).join('\n')}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
            />
            <div className="flex gap-4">
              <input
                type="number"
                name="item_id"
                value={item_id}
                onChange={e => setItemId(parseInt(e.target.value))}
                className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
              />
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}
                className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
              />
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
              >
                Add Item
              </button>
            
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
                save({
                  order_name: formData.order_name,
                  expected_delivery: formData.expected_delivery,
                  pickup_address: formData.pickup_address,
                  delivery_address: formData.delivery_address,
                  order_type: formData.order_type,
                  order_weight: formData.order_weight,
                  priority: formData.priority,
                  vehicle_type: formData.vehicle_type,
                  category: formData.category,
                  items: formData.items
                });
                onClose();
              }}
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}