import React, { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link2, FileText, Package, MoreHorizontal, ChevronDown } from 'lucide-react';
import AddOrder from '../order/AddOrder';
import { assignSupplier, createOrderDetails } from '../../utils/orders';
import {  getClientCompanyOrders } from '../../utils/clientCompany';
import AddItem from '../item/AddItem';
import { createItem,  getAllItemsByClient } from '../../utils/items';
import CreateItemModal from '../../components/modals/client/CreateItemModal';
import CreateOrderModal from '../../components/modals/client/CreateOrderModal';
import ClientOrdersTable from '../../components/tables/ClientOrdersTable';
import ClientItemsTable from '../../components/tables/ClientItemsTable';

export default function ClientDashboard({client}) {

  const [loading, setLoading] = React.useState(false);
  const [newOrders, setNewOrders] = React.useState([]);
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);

  const [items, setItems] = React.useState([]);

  const { id, name, logo } = client;

  const datas = {  name, logo };
  console.log("client2", client);

  // save item
  const saveItem = async (data) => {
    try {
      setLoading(true);
      const PriceStr = data.unit_price;
      const QuantityStr = data.quantity;
      data.unit_price = BigInt(PriceStr);
      data.quantity = BigInt(QuantityStr);

      data.client_id = [id];


      createItem(data).then((resp) => {
        console.log(resp);
        // toast(<NotificationSuccess text="Item added successfully." />);
      });
    } catch (error) {
      console.log({ error });
      // toast(<NotificationError text="Failed to create a item." />);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Items
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setItems(await getAllItemsByClient());
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });
  console.log("items", items);

  // save order
  const saveOrder = async (data) => {
    try {
      setLoading(true);

      data.company_id = id;

      createOrderDetails(data).then((resp) => {
        console.log(resp);
        console.log(data);
        fetchAllOrders();
        // toast(<NotificationSuccess text="Order added successfully." />);
      });
    } catch (error) {
      console.log({ error });
      // toast(<NotificationError text="Failed to create a order." />);
    } finally {
      setLoading(false);
    }
  };

    // assign supplier based on checking Quatation
    const assignSupplierToOrder = async (orderId, supplierId) => {
      try {
        setLoading(true);
        await assignSupplier(orderId, supplierId);
        fetchAllOrders();
        // toast(<NotificationSuccess text="Supplier assigned successfully." />);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        // toast(<NotificationError text="Failed to assign supplier." />);
      }
    };


    // get new orders
    const fetchAllOrders = useCallback(async () => {
      try {
        setLoading(true);
        setNewOrders(await getClientCompanyOrders(client.id));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    });
    console.log("newOrders", newOrders);

    useEffect(() => {
      fetchAllOrders();
      fetchItems();
      // fetchClient();
    }, []);
  const operations = [
    {
      icon: <Link2 className="w-5 h-5 text-blue-900" />,
      title: 'Inventory Management and Optimization',
      progress: 50,
      color: 'bg-green-500'
    },
    {
      icon: <FileText className="w-5 h-5 text-purple-900" />,
      title: 'Distribution Planning and Execution',
      progress: 10,
      color: 'bg-green-500'
    },
    {
      icon: <Package className="w-5 h-5 text-yellow-900" />,
      title: 'Procurement and Supplier Coordination',
      progress: 87,
      color: 'bg-green-500'
    }
  ];

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    name: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i],
    value: Math.floor(Math.random() * 40000) + 10000
  }));

  const driversData = {
    total: 230,
    status: [
      { label: 'Online', value: 68, color: '#004AAD' },
      { label: 'Working', value: 24, color: '#FFA500' },
      { label: 'Idle', value: 8, color: '#8B5CF6' }
    ]
  };

  const recentDrivers = [
    { name: 'Sophie Moore', email: 'contact@sophiemoore.com', avatar: '/avatars/sophie.jpg' },
    { name: 'Sam Smith', email: 'contact@samsmith.com', avatar: '/avatars/sam.jpg' },
    { name: 'Daniel Johnson', email: 'contact@danieljohnson.com', avatar: '/avatars/daniel.jpg' },
    { name: 'Frances Willem', email: 'contact@franceswillem.com', avatar: '/avatars/frances.jpg' }
  ];

  return (
    <DashboardLayout dataClient={datas} >
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-gray-500">March 24, 2026</p>
          </div>
          <button
              onClick={() => setIsCreateItemModalOpen(true)}
              className="px-6 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
            >
              Create Item
            </button>

            <button
              onClick={() => setIsCreateOrderModalOpen(true)}
              className="px-6 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
            >
              Create Order
            </button>
          {/* <AddItem save={saveItem} /> */}
          {/* <AddOrder save={saveOrder} /> */}
        </div>

        {/* Operations Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {operations.map((op, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  {op.icon}
                </div>
                <button className="text-gray-400">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <h3 className="font-medium mb-4">{op.title}</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-100 rounded-full">
                  <div 
                    className={`h-full rounded-full ${op.color}`}
                    style={{ width: `${op.progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">{op.progress}% completed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Deliveries Chart */}
        <div className="bg-white rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Monthly Deliveries</h2>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg">
              This month <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#004AAD"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
          {/* Orders Table */}
          <ClientItemsTable items={items} />

          {/* Products Table */}
          {/* pass all orders */}
          <ClientOrdersTable orders={newOrders} save={assignSupplierToOrder} />


        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Drivers Status */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Drivers by Status</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg">
                This month <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  {driversData.status.map((status, index) => {
                    const total = driversData.status.reduce((acc, curr) => acc + curr.value, 0);
                    const percentage = (status.value / total) * 100;
                    const offset = driversData.status
                      .slice(0, index)
                      .reduce((acc, curr) => acc + (curr.value / total) * 100, 0);
                    
                    return (
                      <circle
                        key={index}
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke={status.color}
                        strokeWidth="20"
                        strokeDasharray={`${percentage} ${100 - percentage}`}
                        strokeDashoffset={-offset}
                        className="transform origin-center"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{driversData.total}</span>
                  <span className="text-sm text-gray-500">DRIVERS</span>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              {driversData.status.map((status, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                  <span className="text-sm">
                    {status.label} - {status.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Drivers */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Recent Drivers</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg">
                This month <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-6">
              {recentDrivers.map((driver, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img 
                    src={driver.avatar} 
                    alt={driver.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{driver.name}</div>
                    <div className="text-sm text-blue-900">{driver.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Copyright © ChainFlow | Designed by Oduor - Powered by Duol Studio
        </div>

        <CreateItemModal
          save={saveItem}
          isOpen={isCreateItemModalOpen}
          onClose={() => setIsCreateItemModalOpen(false)}
        />


        <CreateOrderModal
          save={saveOrder}
          isOpen={isCreateOrderModalOpen}
          onClose={() => setIsCreateOrderModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}