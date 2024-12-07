import React from 'react';

export default function RecentOrdersList({ orders }) {
  return (
    <div className="bg-white rounded-3xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent orders</h2>
        <button className="text-blue-900 text-sm hover:underline">See all</button>
      </div>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="flex items-start justify-between bg-gray-50 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl p-2 flex items-center justify-center">
                <img src={order.image} alt={order.product} className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-medium text-sm">{order.product}</div>
                <div className="text-xs text-gray-500">{order.time}</div>
              </div>
            </div>
            <div className="text-emerald-500 font-medium text-sm">
              ${order.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
