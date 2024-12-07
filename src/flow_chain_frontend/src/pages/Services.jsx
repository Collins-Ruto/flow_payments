import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import {
  Truck,
  Plane,
  BarChart2,
  Network,
  FileCheck,
  Users,
  ClipboardList,
  LayoutDashboard,
} from 'lucide-react';

export default function Services() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const services = [
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: 'AI-Driven Demand Forecasting',
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: 'Smart Routing',
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: 'Blockchain-Based Verification',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Custom Humanitarian Solutions',
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: 'Automated Dispatch Management',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Smart Contracts',
    },
    {
      icon: <LayoutDashboard className="w-8 h-8" />,
      title: 'Centralized Dashboard',
    },
  ];

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      {/* Services Header */}
      <div className="container mx-auto py-16">
        <h1 className="text-5xl mb-6">
          Our <span className="text-blue-900">Services</span>
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Flowchain combines cutting-edge technology to enhance humanitarian logistics and supply chain management, ensuring timely and effective assistance in crisis situations.
        </p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-900 hover:text-white group cursor-pointer"
            >
              <div className="text-blue-900 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg">{service.title}</h3>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-8 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
          >
            GET STARTED
          </button>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
