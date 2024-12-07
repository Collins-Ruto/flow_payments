import React from 'react';
import { Pencil, Trash } from 'lucide-react';
// Nice

interface Item {
  name: string;
  image: string;
  category: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  weight: number;
  quantity: number;
  manufacturer: string;
  description: string;
  unit_price: number;
  sku: number;
}

export default function ClientItemsTable({items}) {
  const items_: Item[] = items;

  const getStatusColor = (status: Item['status']) => {
    switch (status) {
      case 'in-stock':
        return 'text-green-600 bg-green-50';
      case 'low-stock':
        return 'text-orange-600 bg-orange-50';
      case 'out-of-stock':
        return 'text-red-600 bg-red-50';
    }
  };

  // const getPriorityColor = (priority: Item['priority']) => {
  //   switch (priority) {
  //     case 'low':
  //       return 'text-gray-600 bg-gray-50';
  //     case 'medium':
  //       return 'text-orange-600 bg-orange-50';
  //     case 'high':
  //       return 'text-red-600 bg-red-50';
  //   }
  // };

  return (
    <div className="bg-white rounded-3xl p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Items</h2>
        <button className="px-4 py-2 bg-gray-50 rounded-2xl text-sm hover:bg-gray-100 transition-colors">
          Browse Items
        </button>
      </div>
      <div className="overflow-hidden">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="pb-4 font-medium text-gray-500 w-48">ITEMS ↑</th>
              <th className="pb-4 font-medium text-gray-500 w-32">CATEGORY ↑</th>
              <th className="pb-4 font-medium text-gray-500 w-32">STATUS ↑</th>
              <th className="pb-4 font-medium text-gray-500 w-24">WEIGHT ↑</th>
              <th className="pb-4 font-medium text-gray-500 w-24">QUANTITY ↑</th>
              <th className="pb-4 font-medium text-gray-500 w-24">MANUFACTURE ↑</th>
              <th className="pb-4 font-medium text-gray-500 w-32">DESCRIPTION ↑</th>
              <th className="pb-4 font-medium text-gray-500 w-32">UNIT_PRICE ↑</th>
              <th className="pb-4 font-medium text-gray-500 w-24">STOCK ↑</th>
              <th className="pb-4 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {items_.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-12 h-12 bg-gray-50 rounded-xl p-2">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div> */}
                    <span className="font-medium truncate hover:whitespace-normal">{item.name}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-500">
                  <div className="truncate hover:whitespace-normal">{item.category}</div>
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 text-gray-500">{item.weight} kg</td>
                <td className="py-4 text-gray-500">{item.quantity.toString()}</td>
                <td className="py-4">{item.manufacturer}</td>
                <td className="py-4 text-right">{item.description}</td>
                <td className="py-4 text-right">{item.unit_price.toString()} ICP</td>
                <td className="py-4 text-center">{item.sku}</td>
                <td className="py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Pencil className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Trash className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}