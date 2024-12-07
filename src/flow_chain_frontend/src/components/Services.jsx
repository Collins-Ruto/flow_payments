import React from 'react';
import { Truck, Plane, Train, Ship } from 'lucide-react';

export default function Services() {
  const services = [
    { icon: <Truck className="w-12 h-12" />, title: 'Road Freight' },
    { icon: <Plane className="w-12 h-12 text-white" />, title: 'Ground Shipping', highlight: true },
    { icon: <Train className="w-12 h-12" />, title: 'Railway Freight' },
    { icon: <Ship className="w-12 h-12" />, title: 'Sea Freight' },
  ];

  return (
    <div className="container mx-auto px-8 py-16">
      <div className="grid grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div 
            key={index}
            className={`p-8 rounded-lg ${
              service.highlight 
                ? 'bg-blue-900 text-white' 
                : 'bg-gray-50'
            }`}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold">{service.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}