import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function GetInTouchModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    consent: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-12 w-full max-w-xl relative">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 hover:opacity-70"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl mb-8">Get in touch</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full name of the contact person"
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-blue-900"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-blue-900"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Contact number"
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-blue-900"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          
          <textarea
            placeholder="Description of the request"
            rows="4"
            className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-900"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                className="rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              />
              I agree to the processing of my personal data
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
