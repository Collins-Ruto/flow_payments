import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesOverview({ salesData }) {
  return (
    <div className="bg-white rounded-3xl p-8">
      <div className="mb-6">
        <div className="text-sm text-gray-600">Total sales</div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-2xl font-bold">$296,507.00</span>
          <span className="text-emerald-500 text-sm">36.5% ↑</span>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#004AAD" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#004AAD" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#004AAD"
              strokeWidth={2}
              dot={false}
              fill="url(#colorValue)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
