import React from 'react';

export default function MonthlyChart() {
  return (
    <div className="h-64 flex items-end">
      <div className="relative flex-1 h-full">
        {/* Placeholder for chart - In a real app, use a charting library */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-transparent rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 border-b border-blue-900" 
             style={{ 
               clipPath: 'path("M 0 100 C 150 80, 350 160, 500 0")',
               background: 'linear-gradient(180deg, transparent 0%, rgba(0,74,173,0.1) 100%)'
             }} 
        />
      </div>
    </div>
  );
}