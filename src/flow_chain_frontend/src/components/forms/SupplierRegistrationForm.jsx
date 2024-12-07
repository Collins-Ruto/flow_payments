import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function SupplierRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    address: '',
    email: '',
    phone: '',
    website: '',
    ownerName: '',
    chainType: '',
    regNumber: '',
    logo: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/dashboard/supplier');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg relative">
        <button 
          onClick={() => navigate('/')} 
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Supplier Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please complete your profile to access the supplier dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'companyName', label: 'Supply Company Name', type: 'text' },
              { name: 'businessType', label: 'Business Type', type: 'text' },
              { name: 'address', label: 'Supply Company Address', type: 'text' },
              { name: 'email', label: 'Email Address', type: 'email' },
              { name: 'phone', label: 'Phone Number', type: 'tel' },
              { name: 'website', label: 'Supply Company Website', type: 'url' },
              { name: 'ownerName', label: 'Supply Company Owner Name', type: 'text' },
              { name: 'chainType', label: 'Supply Chain Type', type: 'text' },
              { name: 'regNumber', label: 'Supply Company Reg Number', type: 'text' },
              { name: 'logo', label: 'Supply Logo URL', type: 'url' }
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg border ${
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900`}
                />
                {errors[field.name] && (
                  <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full flex justify-center py-3 px-4 rounded-full text-sm font-medium text-white ${
                isFormValid 
                  ? 'bg-blue-900 hover:bg-blue-800' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
