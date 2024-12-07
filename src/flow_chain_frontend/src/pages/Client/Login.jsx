import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "react-feather"; // Ensure react-feather is installed

const Login = ({ login, onClose }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleIILogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Starting II authentication...");
      await login();
      console.log("II Authentication successful");
      navigate("/clients?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai");
    } catch (error) {
      console.error("II authentication error:", error);
      setError(
        "Failed to authenticate with Internet Identity. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-md shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 hover:opacity-70 transition duration-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Client Login
          </h2>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to continue
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleIILogin}
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-lg text-white font-semibold ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } transition duration-300`}
          >
            {isLoading ? "Authenticating..." : "Sign Up with Internet Identity"}
          </button>

          {/* Footer */}
          <p className="text-sm text-gray-500 mt-4">
            Powered by Internet Computer
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
