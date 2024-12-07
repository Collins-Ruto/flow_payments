import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose }) {
  const [selectedRole, setSelectedRole] = useState(null);
  // const [showInternetIdentity, setShowInternetIdentity] = useState(false);
  const navigate = useNavigate();

  const roles = [["Client", "Supplier", "Driver"]];
  const handleLogin = () => {
    if (selectedRole) {
      switch (selectedRole) {
        case "Supplier":
          navigate("/suppliers?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai");
          break;
        case "Driver":
          navigate("/driver?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai");
          break;
        case "Client":
          navigate("/clients?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai");
          break;
        default:
          const path = `/?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai`;
          navigate(path);
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-12 w-full max-w-xl relative">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 hover:opacity-70"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-semibold mb-8">Log in as</h2>

          <div className="space-y-3">
            {roles.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-3">
                {row.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`flex-1 p-4 rounded-xl text-sm transition-colors ${
                      selectedRole === role
                        ? "bg-blue-900 text-white"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start">
            <button
              onClick={handleLogin}
              disabled={!selectedRole}
              className={`px-8 py-2 text-sm rounded-full transition-colors ${
                selectedRole
                  ? "bg-blue-900 text-white hover:bg-blue-800"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Log in
            </button>

            <label className="flex items-center gap-2 mt-4 text-sm text-gray-600">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-900 focus:ring-blue-900"
              />
              I agree to the processing of my personal data
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
