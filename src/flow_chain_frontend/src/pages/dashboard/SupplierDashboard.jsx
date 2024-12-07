import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SalesOverview from "../../components/dashboard/SalesOverview";
import RecentOrdersList from "../../components/dashboard/RecentOrdersList";
import ProductsTable from "../../components/dashboard/ProductsTable";
import PopularCategories from "../../components/dashboard/PopularCategories";
import OrdersStatus from "../../components/dashboard/OrdersStatus";
import {
  fetchNewOrderListings,
  fetchNewOrders,
  fetchCompletedOrders,
  fetchPendingOrders,
  fetchSupplierBids,
  fetchAllWarehouseInventory,
  payDriverFunc,
  saveItem,
  saveWarehouse,
  fetchSupplierItems,
  saveBid,
  fetchAllDrivers,
  addDriverToSupplyCompany,
  fetchSupplierDrivers,
} from "./utils/supplierUtils";
import SupplierOrdersTable from "../../components/tables/SupplierShippingOrdersTable";
import SupplierItemsTable from "../../components/tables/SupplierItemsTable";
import CreateItemModal from "../../components/modals/client/CreateItemModal";
import CreateWarehouseModal from "../../components/modals/supplier/CreateWarehouseModal";
import CreateBidModal from "../../components/modals/supplier/CreateBidModal";
import SupplierDeliveryOrdersTable from "../../components/tables/SuplierDeliveryOrdersTable";
import AddDriverModal from "../../components/modals/supplier/AddDriverModal";

export default function SupplierDashboard({ supplier }) {
  const [searchBarValue32, setSearchBarValue32] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderListings, setOrderListings] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [allWarehouseInventory, setAllWarehouseInventory] = useState([]);
  const [bids, setBids] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [supplierDrivers, setSupplierDrivers] = useState([]);
  const [items, setItems] = useState([]);
  const [tab, setTab] = useState("new");
  const [orderId, setOrderId] = useState(0);
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [isCreateWarehouseModalOpen, setIsCreateWarehouseModalOpen] =
    useState(false);
  const [isCreateBidModalOpen, setIsCreateBidModalOpen] = useState(false);
  const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  console.log("supplier2", supplier);
  const { id, name, logo } = supplier;
  const datas = { name, logo };

  useEffect(() => {
    fetchNewOrders(setNewOrders, setLoading, id);
    fetchCompletedOrders(setCompletedOrders, setLoading, id);
    fetchPendingOrders(setPendingOrders, setLoading, id);
    fetchNewOrderListings(setOrderListings, setLoading);
    fetchSupplierBids(setBids, setLoading, id);
    fetchAllDrivers(setDrivers, setLoading);
    fetchSupplierDrivers(setSupplierDrivers, setLoading, id);
    fetchAllWarehouseInventory(setAllWarehouseInventory, setLoading, id);
    fetchSupplierItems(setItems, setLoading, id);
  }, [update]);

  console.log("newOrders", newOrders);
  console.log("completedOrders", completedOrders);
  console.log("pendingOrders", pendingOrders);
  console.log("orderListings", orderListings);
  console.log("bids", bids);
  console.log("allWarehouseInventory", allWarehouseInventory);

  const salesData = [
    { date: "SEP 1", value: 200000 },
    { date: "SEP 14", value: 220000 },
    { date: "SEP 20", value: 210000 },
    { date: "SEP 30", value: 298507.5 },
  ];

  const recentOrders = [
    {
      product: "iPhone 15 Pro Max",
      image:
        "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=100&h=100&fit=crop",
      price: 1099.0,
      time: "12 minutes ago",
    },
    {
      product: "Google Pixel 8 Pro",
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&h=100&fit=crop",
      price: 599.0,
      time: "16 minutes ago",
    },
    {
      product: "iPad Pro",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop",
      price: 799.0,
      time: "24 minutes ago",
    },
    {
      product: "Samsung Galaxy S24 Ultra",
      image:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop",
      price: 849.0,
      time: "32 minutes ago",
    },
  ];

  const unRecruitedDrivers = drivers.filter((driver) => {
    return !supplierDrivers.some((myDriver) => myDriver.id === driver.id);
  });

  console.log("unRecruitedDrivers", unRecruitedDrivers);

  const saveItemFun = (data) => {
    saveItem(data, setLoading, id).then(() => {
      fetchSupplierItems(setItems, setLoading, id);
    });
  };

  const saveWarehouseFun = (data) => {
    saveWarehouse(data, setLoading, id);
  };

  const saveBidFun = (data) => {
    saveBid(data, setLoading);
  };

  const saveDriverFun = async (driverId) => {
    addDriverToSupplyCompany(id, driverId, setLoading).then(() => {
      fetchAllDrivers(setDrivers, setLoading);
    });
  };

  return (
    <DashboardLayout dataClient={datas}>
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-gray-500">March 24, 2026</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsCreateItemModalOpen(true)}
              className="px-6 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
            >
              Create Item
            </button>

            <button
              onClick={() => setIsCreateWarehouseModalOpen(true)}
              className="px-6 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
            >
              Create Warehouse
            </button>

            <button
              onClick={() => setIsAddDriverModalOpen(true)}
              className="px-6 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
            >
              Recruit Driver
            </button>
          </div>
          {/* <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl text-sm border border-gray-200">
            Last 30 days <ChevronDown className="w-4 h-4" />
          </button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <SalesOverview salesData={salesData} />
          </div>
          <div>
            <RecentOrdersList orders={recentOrders} />
          </div>
        </div>
        <div>
          <SupplierOrdersTable
            data={{
              completedOrders: completedOrders,
              pendingOrders: pendingOrders,
              newOrders: newOrders,
              orderListings: orderListings,
            }}
            supplier_id={id}
            setUpdate={setUpdate}
            // bidModal={setIsCreateBidModalOpen}
            // setOrderId={setOrderId}
          />
        </div>
        <div>
          <SupplierDeliveryOrdersTable
            data={{
              completedOrders: completedOrders,
              pendingOrders: pendingOrders,
              newOrders: newOrders,
              orderListings: orderListings,
            }}
            supplier_id={id}
            setUpdate={setUpdate}
            // bidModal={setIsCreateBidModalOpen}
            // setOrderId={setOrderId}
          />
        </div>
        {/* <div>
          <SupplierItemsTable />
        </div> */}

        <div className="mt-6">
          <ProductsTable products={items} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <PopularCategories />
          <OrdersStatus orders={pendingOrders} bids={bids} />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Copyright © ChainFlow | Designed by Oduor - Powered by Duol Studio
        </div>
        <CreateItemModal
          save={saveItemFun}
          isOpen={isCreateItemModalOpen}
          onClose={() => setIsCreateItemModalOpen(false)}
        />
        <CreateWarehouseModal
          save={saveWarehouseFun}
          isOpen={isCreateWarehouseModalOpen}
          onClose={() => setIsCreateWarehouseModalOpen(false)}
        />
        <CreateBidModal
          orderId={orderId}
          save={saveBidFun}
          isOpen={isCreateBidModalOpen}
          onClose={() => setIsCreateBidModalOpen(false)}
        />
        <AddDriverModal
          drivers={unRecruitedDrivers}
          recruitDriver={saveDriverFun}
          isOpen={isAddDriverModalOpen}
          onClose={() => setIsAddDriverModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
