
export async function create_driver(driverPayload) {
  return window.canister.flowchain.create_driver(driverPayload);
}

export async function get_all_drivers() {
  try {
    return await window.canister.flowchain.get_all_drivers();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function get_driver(id) {
  try {
    return await window.canister.flowchain.get_driver(id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

// get_driver_by_owner
export async function get_driver_by_owner() {
  try {
    return await window.canister.flowchain.get_driver_by_owner();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

// get_driver_active_orders
export async function get_driver_active_orders(driver_id) {
  try {
    return await window.canister.flowchain.get_driver_active_orders(driver_id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// 
export async function get_driver_completed_orders(driver_id) {
  try {
    return await window.canister.flowchain.get_driver_completed_orders(
        driver_id
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function get_driver_maintenance_records(driver_id) {
  try {
    return await window.canister.flowchain.get_driver_maintenance_records(
        driver_id
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// add_driver_to_supply_company
export async function add_driver_to_supply_company(supplier_id, driver_id) {
  try {
    return await window.canister.flowchain.add_driver_to_supply_company(
      supplier_id,
        driver_id
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

