import React, { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getOrderQuotations } from '../../utils/quatation';

// interface Quotation {
//   id: string;
//   title: string;
//   description: string;
//   shippingCost: number;
//   orderId: string;
//   status: 'pending' | 'approved' | 'denied';
//   supplier: string;
// }

// interface Order {
//   id: string;
//   order_name: string;
//   company_name: string;
//   expected_delivery: string;
//   pickup_address: string;
//   delivery_address: string;
//   order_type: string;
//   order_weight: number;
//   priority: 'low' | 'medium' | 'high';
//   category: string;
//   status: 'New' | 'current' | 'completed';
// }



const quotations = [
  {
    id: "Q1",
    title: "Express Delivery Service",
    description: "Next-day delivery service including packaging and handling for electronic equipment. Insurance coverage included for the full value of the items.",
    shippingCost: 1250.00,
    orderId: "ORD-001",
    status: 'pending',
    supplier: "FastTrack Logistics"
  },
];

export default function QuotationModal({ isOpen, onClose,save,order }) {
  const [quotes, setQuotes] = useState([]);
  // const [selectedQuotation, setSelectedQuotation] = useState(quotations[0]);
  const [selectedQuotation, setSelectedQuotation] = useState(
    quotes.length > 0 ? quotes[0] : null
  );
  
  const [loading, setLoading] = useState(false);


  const {id, order_name} = order;

  console.log("const order is: ", order);
  console.log("const id is: ", id);
  console.log("selectedQuotation is: ", selectedQuotation);
  console.log("The quotes are: ", quotes[0]);


  // // fetch all quotations for the order
  // const fetchQuotations = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getOrderQuotations(id);
  //     setQuotes(response.Ok);
  //     console.log("first response is: ", response.Ok);
  //     // setQuotes(await getOrderQuotations(id));
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // }, [id]);

  const fetchQuotations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getOrderQuotations(id);
  
      console.log("Fetched response:", response);
  
      if (response?.Ok) {
        setQuotes(response.Ok);
        if (response.Ok.length > 0) {
          setSelectedQuotation(response.Ok[0]);
        }
      } else {
        console.error("Unexpected response format:", response);
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  }, [id]);
  

  useEffect(() => {
    fetchQuotations();
  } , [fetchQuotations]);

  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-50 text-yellow-600';
      case 'Approved':
        return 'bg-green-50 text-green-600';
      case 'denied':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const handleSelectQuotation = () => {
    // Handle quotation selection logic here
    onClose();

  };

  const handleDeclineQuotation = () => {
    // Handle quotation decline logic here
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-4xl relative">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-8">Quotation Details</h2>

        <div className="flex gap-6 mb-8">
          <div className="w-64 space-y-4">
            {quotes.map((q) => (
              <div
                key={q.id}
                onClick={() => setSelectedQuotation(q)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedQuotation?.id === q.id
                    ? 'bg-blue-50 border-2 border-blue-900'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium mb-1">{q.supplier_name}</div>
                <div className="text-sm text-gray-600">{q.shipping_cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}ICP</div>
              </div>
            ))}
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Quotation Title
              </label>
              <div className="text-base text-gray-700">{selectedQuotation?.quotation_title}</div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Service Description
              </label>
              <div className="text-base text-gray-700">{selectedQuotation?.service_description}</div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Shipping Cost
              </label>
              <div className="text-base text-gray-700">
                {selectedQuotation?.shipping_cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}ICP
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Order ID
              </label>
              <div className="text-base text-gray-700">{selectedQuotation?.order_id.toString()}</div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Quotation Status
              </label>
              <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(selectedQuotation?.quotation_status)}`}>
                {selectedQuotation?.quotation_status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleDeclineQuotation}
            className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
          >
            Decline Quotation
          </button>
          <button
            onClick={() => {save(id, selectedQuotation?.supplier_id), handleSelectQuotation}}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Select Quotation
          </button>
        </div>
      </div>
    </div>
  );
}