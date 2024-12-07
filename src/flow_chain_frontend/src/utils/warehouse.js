import { Principal } from "@dfinity/principal";
// create warehouse
export async function createWarehouse(warehouse) {
  return await window.canister.flowchain.create_warehouse(warehouse);
}
// get warehouse inventory
export async function getWarehouseInventory(id) {
  try {
    return await window.canister.flowchain.get_warehouse_inventory(id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// get_all_warehouse_inventory
export async function getAllWarehouseInventory(id) {
  try {
    return await window.canister.flowchain.get_all_warehouse_inventory(id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// get_supplier_warehouses
export async function getSupplierWarehouses(id) {
  try {
    return await window.canister.flowchain.get_supplier_warehouses(id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// add_item_to_warehouse
export async function addItemToWarehouse(data) {
  return await window.canister.flowchain.add_item_to_warehouse(data);
}

// remove_item_from_warehouse
export async function removeItemFromWarehouse(data) {
  return await window.canister.flowchain.remove_item_from_warehouse(
    data.warehouse_id,
    data.item_id,
    data.quantity
  );
}

// update_warehouse
export async function updateWarehouse(warehouse_id, data) {
  return await window.canister.flowchain.update_warehouse(warehouse_id, data);
}

// get_warehouse_capacity_status
export async function getWarehouseCapacityStatus(id) {
  try {
    return await window.canister.flowchain.get_warehouse_capacity_status(id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// update_item_quantity
export async function updateItemQuantity(data) {
  return await window.canister.flowchain.update_item_quantity(
    data.warehouse_id,
    data.item_id,
    data.new_quantity
  );
}
