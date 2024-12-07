import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";
import {
  get_driver_active_orders,
  get_driver_completed_orders,
} from "../../utils/driver";

export default function DriverDashboard({ driver }) {
  const { id, name, logo } = driver;

  const datas = { name, logo };

  const [activeTab, setActiveTab] = useState("active");
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  // Fetch Active Orders
  const fetchActiveOrders = async () => {
    try {
      const res = await get_driver_active_orders(id);
      setActiveOrders(res || []);
    } catch (error) {
      console.error("Error fetching active orders:", error);
      setActiveOrders([]);
    }
  };

  // Fetch Completed Orders
  const fetchCompletedOrders = async () => {
    try {
      const res = await get_driver_completed_orders(id);
      setCompletedOrders(res || []);
    } catch (error) {
      console.error("Error fetching completed orders:", error);
      setCompletedOrders([]);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchActiveOrders();
    fetchCompletedOrders();
  }, []);

  const renderTabContent = () => {
    if (activeTab === "active") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeOrders.map((order, index) => (
            <div key={index} className="bg-white rounded-xl p-6">
              <h3 className="font-medium mb-2">{order.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Description: {order.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Status: {order.status}</span>
                <span className="text-sm text-gray-700">
                  Delivery Date: {order.deliveryDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === "completed") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedOrders.map((order, index) => (
            <div key={index} className="bg-white rounded-xl p-6">
              <h3 className="font-medium mb-2">{order.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Description: {order.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Status: {order.status}</span>
                <span className="text-sm text-gray-700">
                  Completed On: {order.completedDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout dataClient={datas}>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Driver Dashboard</h1>
          <button className="px-4 py-2 bg-blue-900 text-white rounded-lg">
            + Create task
          </button>
        </div>

        {/* Current Job/Delivery */}
        <div className="bg-white rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-6">Current Job/Delivery</h2>
          <div className="relative">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Medical Delivery</span>
              <button className="text-gray-400">...</button>
            </div>
            <div className="flex items-center justify-between relative">
              {["Pickup", "In transit", "Delivered"].map((stage, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        index <= 1 ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                    <span className="text-sm mt-2">{stage}</span>
                  </div>
                  {index < 2 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        index < 1 ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Team Progress and Delivery Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-6">Team Progress</h2>
            <div className="space-y-6">
              {[
                { name: "John Carter", progress: 60 },
                { name: "Sophie Moore", progress: 45 },
                { name: "Sam Smith", progress: 85 },
              ].map((member, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-sm font-medium">{member.name}</span>
                    <span className="text-sm text-gray-500 ml-auto">
                      {member.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-6">Delivery Reports</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">128</div>
                <div className="text-sm text-gray-500">Completed Deliveries</div>
                <div className="text-sm text-green-500">+6.2%</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-2">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">32</div>
                <div className="text-sm text-gray-500">Incomplete Deliveries</div>
                <div className="text-sm text-red-500">-8.1%</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-gray-500">Late Deliveries</div>
                <div className="text-sm text-red-500">-3.25%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Deliveries */}
        <div>
          <div className="mb-6">
            <div className="flex space-x-4 border-b">
              <button
                className={`py-2 px-4 ${
                  activeTab === "active"
                    ? "border-b-2 border-blue-900 text-blue-900"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("active")}
              >
                Active Orders
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "completed"
                    ? "border-b-2 border-blue-900 text-blue-900"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Completed Orders
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </DashboardLayout>
  );
}
