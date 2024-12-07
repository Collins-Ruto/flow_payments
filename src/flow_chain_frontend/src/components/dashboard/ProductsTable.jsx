import React from 'react';
import { Pencil, Trash } from 'lucide-react';

export default function ProductsTable({ products }) {

  return (
    <div className="bg-white rounded-3xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Products</h2>
        <button className="px-4 py-2 bg-gray-50 rounded-2xl text-sm hover:bg-gray-100 transition-colors">
          Browse products
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="pb-4 font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  ID ↑
                </div>
              </th>
              {/* <th className="pb-4 font-medium text-gray-500">PRODUCT ↑</th> */}
              <th className="pb-4 font-medium text-gray-500">CATEGORY ↑</th>
              <th className="pb-4 font-medium text-gray-500 text-righ">DIMENSIONS ↑</th>
              <th className="pb-4 font-medium text-gray-500 text-righ">SKU ↑</th>
              <th className="pb-4 font-medium text-gray-500 text-center">STOCK ↑</th>
              <th className="pb-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 last:border-0">
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    {product.id}
                  </div>
                </td>
                {/* <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl p-2">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td> */}
                <td className="py-4 text-gray-500">{product.category}</td>
                <td className="py-4 text-righ">{product.dimensions}</td>
                <td className="py-4 text-righ">{product.sku}</td>
                <td className="py-4 text-center">{product.quantity}</td>
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
