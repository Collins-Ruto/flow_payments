import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { formatICTimeToMMDDYY } from "../../pages/dashboard/utils/supplierUtils";

export default function OrdersStatus({ orders, bids }) {
  const [ordersList, setOrdersList] = useState([]);
  function ordersGen(orders, bids) {
    // Assuming orders and bids are arrays of objects received from the backend
    const ordersmap = orders
      ?.map((order) => {
        if (!order.supplier_id[0]) {
          return null;
        }
        // Find the corresponding bid for the order
        const bid = bids?.find((b) => b.order_id === order.id);
        console.log("peark", order, bid);

        // If a matching bid is found, create the object with the required fields
        if (bid) {
          const time = formatICTimeToMMDDYY(bid.updated_at);
          return {
            id: order.id,
            amount: bid.amount,
            company_name: order.company_name,
            updated_at: time,
            order_status: order.order_status,
          };
        }

        // If no matching bid is found, return null or handle as needed
        return null;
      })
      .filter((item) => item !== null); // Filter out any null values
    console.log("map", ordersmap);
    setOrdersList(ordersmap);
  }

  useEffect(() => {
    ordersGen(orders, bids);
  }, [orders, bids]);

  console.log("orderlist", ordersList);

  const ordersd = [
    {
      id: "2937",
      amount: 5870.56,
      customer: "John Carter",
      company_name: "hello@johncarter.com",
      date: "Oct 12, 2026",
      status: "Shipping",
    },
    {
      id: "6480",
      amount: 1540.23,
      customer: "Sophie Moore",
      company_name: "info@sophiemoore.com",
      date: "Oct 10, 2026",
      status: "Delivered",
    },
    {
      id: "5480",
      amount: 1099.99,
      customer: "Andy Smith",
      company_name: "contact@andysmith.com",
      date: "Sep 6, 2026",
      status: "Delayed",
    },
    {
      id: "3580",
      amount: 13870.69,
      customer: "Matt Cannon",
      company_name: "hi@mattcannon.com",
      date: "Aug 24, 2026",
      status: "Delivered",
    },
    {
      id: "2937",
      amount: 5870.56,
      customer: "John Carter",
      company_name: "hello@johncarter.com",
      date: "Jun 13, 2026",
      status: "Delayed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Shipping":
        return "text-blue-600 bg-blue-50";
      case "Delivered":
        return "text-green-600 bg-green-50";
      case "Delayed":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold">Orders status</h2>
        <select className="text-sm text-gray-500 bg-transparent border-none focus:ring-0">
          <option>This month</option>
        </select>
      </div>

      <div className="space-y-6">
        {ordersList?.map((order, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Order #{order.id}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">
                    $
                    {order.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {order.company_name}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{order.updated_at}</span>
              <span
                className={`text-sm px-3 py-1 rounded-full ${getStatusColor(
                  order.order_status
                )}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
