import React, { useState } from 'react';
import { Pencil, Trash, Clock, CheckCircle, Package, CheckSquareIcon } from 'lucide-react';
import QuotationModal from '../modals/QuotationModal';
// Nice

interface Order {
  id: string;
  order_name: string;
  company_name: string;
  expected_delivery: string;
  pickup_address: string;
  delivery_address: string;
  order_type: string;
  order_weight: number;
  priority: 'low' | 'medium' | 'high';
  category: string;
  status: 'New' | 'current' | 'completed';
}


const dummyQuotation = {
  id: "Q1",
  title: "Express Delivery Service",
  description: "Next-day delivery service including packaging and handling for electronic equipment. Insurance coverage included for the full value of the items.",
  shippingCost: 1250.00,
  orderId: "ORD-001",
  status: 'pending' as const,
  supplier: "FastTrack Logistics"
};

export default function ClientOrdersTable({orders,save}) {
  const [activeTab, setActiveTab] = useState<'New' | 'current' | 'completed'>('New');
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);

  
  
  const orders_: Order[] = orders.map(order => ({
    ...order,
    status: order.order_status, // Normalize field name
  }));

  const filteredOrders = orders_.filter(order => 
    order.status.toLowerCase() === activeTab.toLowerCase()
  );

  // const orders_: Order[] = orders;
  console.log("The orders are: ", orders_);
  // const filteredOrders = orders_.filter(order => order.status === activeTab );
  // const filteredOrders = orders_.filter(order => order.status === activeTab);
  console.log("filteredOrders: ", filteredOrders);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'New':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'current':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: Order['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-600';
      case 'medium':
        return 'bg-orange-100 text-orange-600';
      case 'high':
        return 'bg-red-100 text-red-600';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Orders</h2>
        <div className="flex gap-2">
          {(['New', 'current', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                activeTab === status
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} Orders
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="w-full">
          <table className="w-full table-fixed">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-4 font-medium text-gray-500 w-24">ORDER ID</th>
                <th className="pb-4 font-medium text-gray-500 w-40">ORDER NAME</th>
                <th className="pb-4 font-medium text-gray-500 w-32">CUSTOMER</th>
                <th className="pb-4 font-medium text-gray-500 w-32">EXPECTED DELIVERY</th>
                <th className="pb-4 font-medium text-gray-500 w-48">PICKUP ADDRESS</th>
                <th className="pb-4 font-medium text-gray-500 w-48">DELIVERY ADDRESS</th>
                <th className="pb-4 font-medium text-gray-500 w-24">TYPE</th>
                <th className="pb-4 font-medium text-gray-500 w-24">WEIGHT (KG)</th>
                <th className="pb-4 font-medium text-gray-500 w-24">PRIORITY</th>
                <th className="pb-4 font-medium text-gray-500 w-32">CATEGORY</th>
                <th className="pb-4 font-medium text-gray-500 w-32">STATUS</th>
                <th className="pb-4 w-20"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <>
                <tr key={order.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-4 font-medium truncate">{order.id.toString()}</td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal">{order.order_name}</div>
                  </td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal">{order.company_name}</div>
                  </td>
                  <td className="py-4">{new Date(order.expected_delivery).toLocaleDateString()}</td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal hover:relative hover:z-10 hover:bg-white">
                      {order.pickup_address}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal hover:relative hover:z-10 hover:bg-white">
                      {order.delivery_address}
                    </div>
                  </td>
                  <td className="py-4">{order.order_type}</td>
                  <td className="py-4">{order.order_weight}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal">{order.category}</div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="text-sm capitalize">{order.status}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-end gap-2">
                      {/* show this button below only when order is in New */}
                      {order.status === 'New' && (
                        <button 
                        className="px-4 py-2 bg-blue-900 text-white font-medium text-sm rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                        onClick={() => setIsQuotationModalOpen(true)}
                      >
                        Check Quotations
                      </button>                      
                      )}
                    </div>
                  </td>
                </tr>
                <QuotationModal
                isOpen={isQuotationModalOpen}
                onClose={() => setIsQuotationModalOpen(false)}
                order={order}
                save={save}
              />
              </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}