import React from 'react';

export default function PopularCategories() {
  const categories = [
    { name: 'SMARTPHONES', amount: 153143.00, color: '#004AAD', percentage: 60 },
    { name: 'LAPTOPS', amount: 15399.34, color: '#36A2EB', percentage: 20 },
    { name: 'TABLETS', amount: 27965.00, color: '#9333EA', percentage: 20 }
  ];

  return (
    <div className="bg-white rounded-3xl p-8">
      <h2 className="text-lg font-semibold mb-8">Popular categories</h2>
      
      <div className="flex justify-center mb-12">
        <div className="relative w-48 h-48">
          <div className="text-center absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold">196K</div>
            <div className="text-sm text-gray-500">SUPPLIES</div>
          </div>
          <svg className="w-full h-full transform -rotate-90">
            {categories.map((category, index) => {
              const total = categories.reduce((acc, curr) => acc + curr.percentage, 0);
              const offset = categories
                .slice(0, index)
                .reduce((acc, curr) => acc + (curr.percentage / total) * 100, 0);
              
              return (
                <circle
                  key={index}
                  cx="50%"
                  cy="50%"
                  r="40%"
                  fill="none"
                  stroke={category.color}
                  strokeWidth="20"
                  strokeDasharray={`${category.percentage} ${100 - category.percentage}`}
                  strokeDashoffset={-offset}
                  className="transform origin-center"
                />
              );
            })}
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
              <span className="text-sm text-gray-600">{category.name}</span>
            </div>
            <span className="text-sm font-medium">
              ${category.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}