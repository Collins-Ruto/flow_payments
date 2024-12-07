import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { create_driver } from "../../utils/driver";

const DriverRegistrationForm = ({ fetchDriver }) => {
  const navigate = useNavigate();

  // Individual state variables for each field
  const [fullName, setFullName] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [experience, setExperience] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] =
    useState("");
  const [trainings, setTrainings] = useState("");
  const [driversCompany, setDriversCompany] = useState("");

  // Add a new driver
  const addDriver = async () => {
    try {
      const driverPayload = {
        full_name: fullName,
        contact_info: contactInformation,
        experience,
        license_no: licenseNumber,
        license_expiry: licenseExpiry,
        vehicle_make: vehicleMake,
        vehicle_model: vehicleModel,
        vehicle_type: vehicleType,
        vehicle_reg_no: vehicleRegistrationNumber,
        trainings: trainings.split(",").map((t) => t.trim()),
        company: driversCompany,
      };

      const res = await create_driver(driverPayload);
      console.log("Driver registered successfully:", res);
      toast.success("Driver registered successfully!");
      fetchDriver();
    } catch (error) {
      console.error("Error registering driver:", error);
      toast.error("Failed to register driver. Please check your inputs.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg relative">
        <button
          onClick={() => navigate("/")}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Driver Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please complete your profile to access the driver dashboard
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            addDriver();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="contactInformation"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Information
              </label>
              <input
                type="text"
                id="contactInformation"
                placeholder="Contact Information"
                value={contactInformation}
                onChange={(e) => setContactInformation(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700"
              >
                Experience (in years)
              </label>
              <input
                type="number"
                id="experience"
                placeholder="Experience in years"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="licenseNumber"
                className="block text-sm font-medium text-gray-700"
              >
                License Number
              </label>
              <input
                type="text"
                id="licenseNumber"
                placeholder="License Number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="licenseExpiry"
                className="block text-sm font-medium text-gray-700"
              >
                License Expiry Date
              </label>
              <input
                type="date"
                id="licenseExpiry"
                value={licenseExpiry}
                onChange={(e) => setLicenseExpiry(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="vehicleMake"
                className="block text-sm font-medium text-gray-700"
              >
                Vehicle Make
              </label>
              <input
                type="text"
                id="vehicleMake"
                placeholder="Vehicle Make"
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="vehicleModel"
                className="block text-sm font-medium text-gray-700"
              >
                Vehicle Model
              </label>
              <input
                type="text"
                id="vehicleModel"
                placeholder="Vehicle Model"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="vehicleType"
                className="block text-sm font-medium text-gray-700"
              >
                Vehicle Type
              </label>
              <input
                type="text"
                id="vehicleType"
                placeholder="Vehicle Type"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="vehicleRegistrationNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Vehicle Registration Number
              </label>
              <input
                type="text"
                id="vehicleRegistrationNumber"
                placeholder="Registration Number"
                value={vehicleRegistrationNumber}
                onChange={(e) => setVehicleRegistrationNumber(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="trainings"
                className="block text-sm font-medium text-gray-700"
              >
                Trainings (comma-separated)
              </label>
              <input
                type="text"
                id="trainings"
                placeholder="Trainings (comma-separated)"
                value={trainings}
                onChange={(e) => setTrainings(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="driversCompany"
                className="block text-sm font-medium text-gray-700"
              >
                Driver's Company
              </label>
              <input
                type="text"
                id="driversCompany"
                placeholder="Driver's Company"
                value={driversCompany}
                onChange={(e) => setDriversCompany(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-full text-sm font-medium text-white bg-blue-900 hover:bg-blue-800"
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverRegistrationForm;
