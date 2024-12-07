import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    consent: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      consent: checked
    }));
  };

  return (
    <div className="container mx-auto py-24 flex justify-center">
      <div className="bg-white rounded-3xl p-16 w-full max-w-4xl shadow-lg relative">
        <button className="absolute right-8 top-8">
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-5xl mb-12">Get in touch</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full name of the contact person"
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-blue-900"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-blue-900"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Contact number"
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-blue-900"
            />
          </div>
          
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description of the request"
            rows="4"
            className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-900"
          />
          
          <div className="flex items-center gap-6">
            <button
              type="submit"
              className="px-12 py-4 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
            >
              Send
            </button>
            
            <label className="flex items-center gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 text-blue-900 focus:ring-blue-900"
              />
              I agree to the processing of my personal data
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
