import React from 'react';

export default function Contact() {
  const contactInfo = [
    { id: '01', label: 'Telephone/Fax of Sales Department', value: '+254 712 564 078' },
    { id: '02', label: 'Employments Issues', value: '+254 712 564 078' },
    { id: '03', label: 'Instagram', value: '@chainFlow' },
    { id: '04', label: 'Email', value: 'info@chainflow.com' },
  ];

  return (
    <div className="container mx-auto px-8 py-16">
      <h2 className="text-4xl font-bold mb-12">Get in touch</h2>
      
      <div className="space-y-8">
        {contactInfo.map((info) => (
          <div key={info.id} className="flex items-center border-b border-gray-200 pb-4">
            <div className="w-16 text-gray-500">{info.id}</div>
            <div className="w-1/3 text-gray-600">{info.label}</div>
            <div className="flex-1 font-semibold">{info.value}</div>
          </div>
        ))}
      </div>
      
      <button className="mt-12 px-8 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-800">
        GET IN TOUCH
      </button>
    </div>
  );
}