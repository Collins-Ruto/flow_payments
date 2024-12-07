import React from 'react';
import { Truck, Plane, Train, Ship } from 'lucide-react';

export default function DeliveryServices() {
  const services = [
    { icon: <Truck className="w-6 h-6" />, title: 'Road\nFreight', active: false },
    { icon: <Plane className="w-6 h-6" />, title: 'Ground\nShipping', active: true },
    { icon: <Train className="w-6 h-6" />, title: 'Railway\nFreight', active: false },
    { icon: <Ship className="w-6 h-6" />, title: 'Sea\nFreight', active: false },
  ];

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center">
      <div className="container mx-auto px-4 md:px-8 py-24">
        <div className="flex justify-end mb-12">
          <h2 className="text-4xl">
            Delivery of<br />
            your <span className="text-blue-900">Package!</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl flex flex-col items-center gap-4 transition-colors duration-300 ${
                service.active ? 'bg-gray-50 hover:bg-blue-900 hover:text-white' : 'bg-gray-50 hover:bg-blue-900 hover:text-white'
              }`}
            >
              {service.icon}
              <p className="text-center whitespace-pre-line">{service.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}