import { X } from "lucide-react";
import React, { useState } from "react";

interface CreateBidModalProps {
  orderId: number;
  isOpen: boolean;
  onClose: () => void;
  save: (
    data: any
  ) => void;
}

const CreateBidModal: React.FC<CreateBidModalProps> = ({
  orderId,
  isOpen,
  onClose,
  save,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [delivery_time, setDelivery_time] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = () => {
    save({order_id: orderId, amount, delivery_time, notes});
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

        <h2 className="text-2xl font-semibold mb-6">Create New Bid</h2>

        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Delivery Date
              </label>
              <input
                type="date"
                value={ delivery_time}
                onChange={(e) => setDelivery_time(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
                handleSubmit();
                onClose();
              }}
            >
              Create Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBidModal;
