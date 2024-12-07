import { X } from "lucide-react";
import React, { useState } from "react";

interface AssignDriverModalProps {
  orderId: number;
  isOpen: boolean;
  onClose: () => void;
  drivers: any[];
  assignDriver: (orderId: number, driverId: number) => void;
}

const AssignDriverModal: React.FC<AssignDriverModalProps> = ({
  orderId,
  isOpen,
  onClose,
  drivers,
  assignDriver,
}) => {
  const handleSubmit = (id) => {
    assignDriver(orderId, id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-6xl relative">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Assign Driver</h2>

        <form className="space-y-6">
          <div className="overflow-hidden">
            <div className="w-full">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="text-left border-b border-gray-100">
                    <th className="pb-4 font-medium text-gray-500 w-24">
                      Driver ID
                    </th>
                    <th className="pb-4 font-medium text-gray-500 w-40">
                      Name
                    </th>
                    <th className="pb-4 font-medium text-gray-500 w-48">
                      Experience
                    </th>
                    <th className="pb-4 font-medium text-gray-500 w-48">
                      Rating
                    </th>
                    <th className="pb-4 font-medium text-gray-500 w-48">
                      Vehicle
                    </th>
                    <th className="pb-4 font-medium text-gray-500 w-40">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.length > 0 ? (
                    drivers.map((driver) => (
                      <tr
                        key={driver.id}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="py-4 font-medium truncate">
                          {driver.id.toString()}
                        </td>
                        <td className="py-4 truncate">{driver.full_name}</td>
                        <td className="py-4 truncate">
                          {`${driver.experience} Yrs` ||
                            "No additional experience"}
                        </td>
                        <td className="py-4 truncate">
                          {driver.driver_rating.toString()}
                        </td>
                        <td className="py-4 truncate">{driver.vehicle_type}</td>
                        <td className="py-4 min-w-20">
                          <button
                            type="button"
                            onClick={() => {
                              handleSubmit(driver.id);
                              onClose();
                            }}
                            className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-4 text-center text-gray-500"
                      >
                        No drivers available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignDriverModal;
