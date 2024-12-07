import React, { useState } from "react";
import { X } from "lucide-react";

interface CreateQuotationModalProps {
    orderId: number;
    isOpen: boolean;
    onClose: () => void;
    save: (
        data: any
    ) => void;
}

const CreateQuotationModal: React.FC<CreateQuotationModalProps> = ({
    orderId,
    isOpen,
    onClose,
    save,
}) => {
    const [quotationTitle, setQuotationTitle] = useState<string>('');
    const [serviceDescription, setServiceDescription] = useState<string>('');
    const [shippingCost, setShippingCost] = useState<string>('');

    const handleSubmit = () => {
        save({
            order_id: orderId,
            quotation_title: quotationTitle,
            service_description: serviceDescription,
            shipping_cost: shippingCost,
        });
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

                <h2 className="text-2xl font-semibold mb-6">Create New Quotation</h2>

                <form className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quotation Title
                            </label>
                            <input
                                type="text"
                                value={quotationTitle}
                                onChange={(e) => setQuotationTitle(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Service Description
                            </label>
                            <textarea
                                value={serviceDescription}
                                onChange={(e) => setServiceDescription(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Shipping Cost
                            </label>
                            <input
                                type="number"
                                value={shippingCost}
                                onChange={(e) => setShippingCost(e.target.value)}
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
                            Create Quotation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateQuotationModal;