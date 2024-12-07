import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

export async function createSupplyCompany(supplyCompany) {
  return await window.canister.flowchain.create_supplier_company(supplyCompany);
}

export async function getAllSupplyCompanies() {
  try {
    return await window.canister.flowchain.get_all_suppliers();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getSupplyCompany(id) {
  try {
    return await window.canister.flowchain.get_supplier(id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

// getSupplyCompanyByOwner
export async function getSupplyCompanyByOwner() {
  console.log("called spo");
  try {
    return await window.canister.flowchain.get_supplier_by_owner();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

// getNewOrders
export async function getNewOrders() {
  try {
    return await window.canister.flowchain.get_new_orders();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getSupplyCompanyActiveOrders(CompanyId) {
  try {
    return await window.canister.flowchain.get_supplier_active_orders(
      CompanyId
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getSupplyCompanyCompletedOrders(CompanyId) {
  try {
    return await window.canister.flowchain.get_supplier_completed_orders(
      CompanyId
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getSupplyCompanyNewOrders(CompanyId) {
  try {
    return await window.canister.flowchain.get_supplier_new_orders(CompanyId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function updateSupplyCompany(id, supplyCompany) {
  try {
    return await window.canister.flowchain.update_supplier_company(
      id,
      supplyCompany
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function searchSupplyCompany(query) {
  try {
    return await window.canister.flowchain.search_supplier_company(query);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function addDriver(companyId, driverId) {
  try {
    return await window.canister.flowchain.add_driver_to_supply_company(
      companyId,
      driverId
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

// get_supplier_drivers
export async function getSupplierDrivers(companyId) {
  try {
    return await window.canister.flowchain.get_supplier_drivers(companyId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function createItem(item_payload) {
  return window.canister.flowchain.create_item_as_supplier(item_payload);
}

//driver can be  paid arnd 10% of cost
export async function payDriver(order, amount) {
  const chainflowCanister = window.canister.chainflow;
  console.log("my Order", order);
  console.log("first", order.orderId);
  const orderResponse = await chainflowCanister.createReserveDriverPay(
    order.orderId,
    amount
  );
  console.log("orderResponse", orderResponse);
  const driverPrincipal = Principal.from(orderResponse.Ok.driverReciever);
  const driverAddress = await chainflowCanister.getAddressFromPrincipal(
    driverPrincipal
  );
  const block = await transferICP(
    driverAddress,
    orderResponse.Ok.price,
    orderResponse.Ok.memo
  );
  await chainflowCanister.completeDriverPayment(
    driverPrincipal,
    order.orderId,
    orderResponse.Ok.price,
    block,
    orderResponse.Ok.memo
  );
}
