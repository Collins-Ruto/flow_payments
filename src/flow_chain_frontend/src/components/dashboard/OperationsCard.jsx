import React from 'react';
import { LucideIcon } from 'lucide-react';

export default function OperationsCard({ title, progress, color, icon: Icon }) {
  const getColorClass = (color) => {
    const classes = {
      blue: 'bg-blue-50 text-blue-900',
      purple: 'bg-purple-50 text-purple-900',
      yellow: 'bg-yellow-50 text-yellow-900',
    };
    return classes[color] || classes.blue;
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className={`w-10 h-10 ${getColorClass(color)} rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-100 rounded-full h-2">
          <div
            className="bg-blue-900 h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-500">{progress}% completed</span>
      </div>
    </div>
  );
}
