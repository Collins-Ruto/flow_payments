import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InternetIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InternetIdentityModal({ isOpen, onClose }: InternetIdentityModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-12 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 hover:opacity-70"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Supplier Login</h2>
          <p className="text-gray-600 mb-8">Please connect your wallet to continue</p>
          
          <button
            onClick={() => {}}
            className="w-full px-6 py-4 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors mb-8"
          >
            Connect With Internet Identity
          </button>

          <p className="text-sm text-gray-500">Powered by Internet Computer</p>
        </div>
      </div>
    </div>
  );
}