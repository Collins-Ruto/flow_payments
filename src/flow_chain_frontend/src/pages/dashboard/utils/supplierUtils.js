// supplierDashboardFunctions.js
import {
  add_driver_to_supply_company,
  get_all_drivers,
} from "../../../utils/driver";
import { getAllItemsBySupplier } from "../../../utils/items";
import { assignDriver, updateOrderStatus } from "../../../utils/orders";
import {
  approveBid,
  createBid,
  createQuotation,
  getOrderBids,
  getSupplierBids,
  withdrawBid,
} from "../../../utils/quatation";
import {
  createItem,
  getNewOrders,
  getSupplierDrivers,
  getSupplyCompanyActiveOrders,
  getSupplyCompanyCompletedOrders,
  getSupplyCompanyNewOrders,
  payDriver as payDriverAPI,
} from "../../../utils/supplyCompany";
import {
  createWarehouse,
  getAllWarehouseInventory,
  getSupplierWarehouses,
  getWarehouseCapacityStatus,
} from "../../../utils/warehouse";

export const fetchNewOrderListings = async (setOrderListings, setLoading) => {
  try {
    setLoading(true);
    const orders = await getNewOrders();
    setOrderListings(orders);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchNewOrders = async (setNewOrders, setLoading, id) => {
  try {
    setLoading(true);
    const orders = await getSupplyCompanyNewOrders(id);
    setNewOrders(orders);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchCompletedOrders = async (
  setCompletedOrders,
  setLoading,
  id
) => {
  try {
    setLoading(true);
    const orders = await getSupplyCompanyCompletedOrders(id);
    setCompletedOrders(orders);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchPendingOrders = async (setPendingOrders, setLoading, id) => {
  try {
    setLoading(true);
    const orders = await getSupplyCompanyActiveOrders(id);
    setPendingOrders(orders);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const payDriverFunc = async (data, fetchCompletedOrders, setLoading) => {
  const { orderId } = data;
  const amount = parseInt(data.amount, 10) * 10 ** 8;

  try {
    setLoading(true);
    await payDriverAPI({ orderId }, amount);
    fetchCompletedOrders(); // Refresh completed orders after payment
    // toast(<NotificationSuccess text="Driver paid successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to pay driver." />);
  } finally {
    setLoading(false);
  }
};

// getSupplierDrivers
export const fetchSupplierDrivers = async (setDrivers, setLoading, id) => {
  try {
    setLoading(true);
    const drivers = await getSupplierDrivers(id);
    setDrivers(drivers);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// assign driver
export const assignDriverFunc = async (orderId, driverId, setLoading) => {
  try {
    setLoading(true);
    await assignDriver(orderId, driverId);
    // toast(<NotificationSuccess text="Driver assigned successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to assign driver." />);
  } finally {
    setLoading(false);
  }
};

export const saveItem = async (data, setLoading, id) => {
  try {
    setLoading(true);
    const PriceStr = data.unit_price;
    const QuantityStr = data.quantity;
    data.unit_price = BigInt(PriceStr);
    data.quantity = BigInt(QuantityStr);

    data.supplier_id = [id];

    console.log("item pay", data);
    await createItem(data).then((resp) => {
      console.log("item created", resp);
    });
    // const items = await getAllItemsByClient();
    // setItems(items);
    // toast(<NotificationSuccess text="Item saved successfully." />);
  } catch (error) {
    console.error("Failed to save item", error);
    // toast(<NotificationError text="Failed to save item." />);
  } finally {
    setLoading(false);
  }
};

export const saveWarehouse = async (data, setLoading, id) => {
  try {
    setLoading(true);
    const capacityStr = data.capacity;
    data.capacity = BigInt(capacityStr);

    data.supplier_id = id;

    await createWarehouse(data).then((resp) => {
      console.log("warehouse created", resp);
    });
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// list_items_by_supplier
export const fetchSupplierItems = async (setItems, setLoading, id) => {
  try {
    setLoading(true);
    const items = await getAllItemsBySupplier(id);
    setItems(items);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchSupplierWarehouses = async (
  setWarehouses,
  setLoading,
  id
) => {
  try {
    setLoading(true);
    const warehouses = await getSupplierWarehouses(id);
    setWarehouses(warehouses);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchAllWarehouseInventory = async (
  setAllWarehouseInventory,
  setLoading,
  id
) => {
  try {
    setLoading(true);
    const inventory = await getAllWarehouseInventory(id);
    setAllWarehouseInventory(inventory);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchWarehouseCapacityStatus = async (
  setWarehouseCapacityStatus,
  setLoading,
  id
) => {
  try {
    setLoading(true);
    const warehouses = await getWarehouseCapacityStatus(id);
    setWarehouseCapacityStatus(warehouses);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// addItemToWarehouse
export const addItemToWarehouse = async (data, setLoading) => {
  try {
    setLoading(true);
    const quantityStr = data.quantity;
    data.quantity = BigInt(quantityStr);

    await addItemToWarehouse(data);
    // toast(<NotificationSuccess text="Item added to warehouse successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to add item to warehouse." />);
  } finally {
    setLoading(false);
  }
};

// removeItemFromWarehouse
export const removeItemFromWarehouse = async (data, setLoading) => {
  try {
    setLoading(true);
    const quantityStr = data.quantity;
    data.quantity = BigInt(quantityStr);

    await removeItemFromWarehouse(data);
    // toast(<NotificationSuccess text="Item removed from warehouse successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to remove item from warehouse." />);
  } finally {
    setLoading(false);
  }
};

// updateItemQuantity
export const updateItemQuantity = async (data, setLoading) => {
  try {
    setLoading(true);
    const newQuantityStr = data.new_quantity;
    data.new_quantity = BigInt(newQuantityStr);

    await updateItemQuantity(data);
    // toast(<NotificationSuccess text="Item quantity updated successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to update item quantity." />);
  } finally {
    setLoading(false);
  }
};

// create bid
export const saveBid = async (data, setLoading) => {
  try {
    setLoading(true);
    const amountStr = data.amount;
    data.amount = BigInt(amountStr);

    await createBid(data);
    // toast(<NotificationSuccess text="Bid created successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to create bid." />);
  } finally {
    setLoading(false);
  }
};

// approve bid
export const approveBidFunc = async (bidId, fetchSupplierBids, setLoading) => {
  try {
    setLoading(true);
    await approveBid(bidId);
    fetchSupplierBids(); // Refresh bids after approval
    // toast(<NotificationSuccess text="Bid approved successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to approve bid." />);
  } finally {
    setLoading(false);
  }
};

// withdraw bid
export const withdrawBidFunc = async (bidId, fetchSupplierBids, setLoading) => {
  try {
    setLoading(true);
    await withdrawBid(bidId);
    fetchSupplierBids(); // Refresh bids after withdrawal
    // toast(<NotificationSuccess text="Bid withdrawn successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to withdraw bid." />);
  } finally {
    setLoading(false);
  }
};

// get order bids
export const fetchOrderBids = async (setBids, setLoading, orderId) => {
  try {
    setLoading(true);
    const bids = await getOrderBids(orderId);
    setBids(bids);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// get supplier bids
export const fetchSupplierBids = async (setBids, setLoading, supplierId) => {
  try {
    setLoading(true);
    const bids = await getSupplierBids(supplierId);
    setBids(bids.Ok);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// update order status
export const updateOrderStatusFunc = async (orderId, status, setLoading) => {
  try {
    setLoading(true);
    await updateOrderStatus(orderId, status);
    // toast(<NotificationSuccess text="Order status updated successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to update order status." />);
  } finally {
    setLoading(false);
  }
};

// create quotation
export const createQuotationFunc = async (data, setLoading) => {
  try {
    setLoading(true);
    const shippingStr = data.shipping_cost;
    data.shipping_cost = BigInt(shippingStr);
    await createQuotation(data).then((resp) => {
      console.log("quotation created", resp);
    });
    // toast(<NotificationSuccess text="Quotation created successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to create quotation." />);
  } finally {
    setLoading(false);
  }
};

// get all drivers
export const fetchAllDrivers = async (setDrivers, setLoading) => {
  try {
    setLoading(true);
    const drivers = await get_all_drivers();
    setDrivers(drivers);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// add_driver_to_supply_company;
export const addDriverToSupplyCompany = async (
  supplierId,
  driverId,
  setLoading
) => {
  try {
    setLoading(true);
    await add_driver_to_supply_company(supplierId, driverId);
    // toast(<NotificationSuccess text="Driver added successfully." />);
  } catch (error) {
    console.error(error);
    // toast(<NotificationError text="Failed to add driver." />);
  } finally {
    setLoading(false);
  }
};

export function formatICTimeToMMDDYY(nanoseconds) {
  // Convert nanoseconds to milliseconds
  const milliseconds = Number(nanoseconds) / 1_000_000;

  // Create a JavaScript Date object
  const date = new Date(milliseconds);

  // Format the date as "Aug 24, 2026"
  const options = {
    month: "short", // Short month name like "Aug"
    day: "numeric", // Day of the month, e.g., 24
    year: "numeric", // Full year, e.g., 2026
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
