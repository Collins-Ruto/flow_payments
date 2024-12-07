import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

import { flow_chain_backend } from "../../../declarations/flow_chain_backend";

export async function createClientCompany(clientCompany) {
  return await flow_chain_backend.create_client_company(clientCompany);
}

export async function getAllClientCompanies() {
  try {
    return await flow_chain_backend.get_all_clients();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getClientCompany(id) {
  try {
    return await window.canister.chainflow.getClientCompany(id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function updateClientCompany(id, clientCompany) {
  try {
    return await window.canister.chainflow.updateClientCompany(
      id,
      clientCompany
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function searchClientCompany(query) {
  try {
    return await window.canister.chainflow.searchClientCompany(query);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function addAffiliatedCompany(clientId, companyName) {
  try {
    return await window.canister.chainflow.addAffiliatedCompany(
      clientId,
      companyName
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

// getClientCompanyByOwner
export async function getClientCompanyByOwner() {
  try {
    return await flow_chain_backend.get_client_by_owner();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

// getClientCompanyActiveOrders
export async function getClientCompanyActiveOrders(clientId) {
  try {
    return await window.canister.chainflow.getClientCompanyActiveOrders(
      clientId
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// getClientCompanyCompletedOrders
export async function getClientCompanyCompletedOrders(clientId) {
  try {
    return await window.canister.chainflow.getClientCompanyCompletedOrders(
      clientId
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// getClientCompanyNewOrders
export async function getClientCompanyNewOrders(client_id) {
  try {
    return await flow_chain_backend.get_client_new_orders(client_id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// getClientCompanyOrders
export async function getClientCompanyOrders(client_id) {
  try {
    return await flow_chain_backend.get_client_orders(client_id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function addProduct(clientId, productName) {
  try {
    return await window.canister.chainflow.addProduct(clientId, productName);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

// //driver can be  paid arnd 10% of cost
// export async function paySupplier(order) {
//   const chainflowCanister = window.canister.chainflow;
//   console.log("my Order", order);
//   console.log("first", order.orderId);
//   const reserveResponse = await chainflowCanister.createReservePay(order.orderId);
//   console.log("reserveResponse", reserveResponse);
//   const sellerPrincipal = Principal.from(reserveResponse.Ok.supplierReceiver);
//   const sellerAddress = await chainflowCanister.getAddressFromPrincipal(
//     sellerPrincipal
//   );
//   const block = await transferICP(
//     sellerAddress,
//     reserveResponse.Ok.price,
//     reserveResponse.Ok.memo
//   );
//   await chainflowCanister.completePayment(
//     sellerPrincipal,
//     order.orderId,
//     reserveResponse.Ok.price,
//     block,
//     reserveResponse.Ok.memo
//   );
// }

// pay supplier
export async function paySupplier(orderId) {
  console.log("order Id", orderId);
  const reserveResponse = await flow_chain_backend.create_reserve_pay(orderId);
  console.log("reserveResponse", reserveResponse);
  const sellerPrincipal = Principal.from(reserveResponse.Ok.supplier_payee);

  const block = await transferICP(
    sellerPrincipal,
    reserveResponse.Ok.price,
    reserveResponse.Ok.memo
  );

  console.log("block", block);
  // await flow_chain_backend.completePayment(
  //   sellerPrincipal,
  //   orderId,
  //   reserveResponse.Ok.price,
  //   block,
  //   reserveResponse.Ok.memo
  // );
}
