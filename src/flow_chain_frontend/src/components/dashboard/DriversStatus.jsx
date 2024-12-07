import React from 'react';

export default function DriversStatus() {
  const data = {
    total: 230,
    online: 65,
    working: 24,
    idle: 11
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6">Drivers by Status</h2>
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="20"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#004AAD"
            strokeWidth="20"
            strokeDasharray={`${data.online * 2.51} ${(100 - data.online) * 2.51}`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{data.total}</div>
          <div className="text-sm text-gray-500">DRIVERS</div>
        </div>
      </div>
    </div>
  );
}