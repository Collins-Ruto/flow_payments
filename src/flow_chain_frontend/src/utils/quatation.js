import { flow_chain_backend } from "../../../declarations/flow_chain_backend";

// create bid
export async function createBid(bidPayload) {
  try {
    return await window.canister.flowchain.create_bid(bidPayload);
  }
  catch (err) {
    console.log(err);
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

// get order bids
export async function getOrderBids(orderId) {
  try {
    return await window.canister.flowchain.get_order_bids(orderId);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// get supplier bids
export async function getSupplierBids(supplierId) {
  try {
    return await window.canister.flowchain.get_supplier_bids(supplierId);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// approve bid
export async function approveBid(bidId) {
  try {
    return await window.canister.flowchain.approve_bid(bidId);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
  }
}

// withdraw bid
export async function withdrawBid(bidId) {
  try {
    return await window.canister.flowchain.withdraw_bid(bidId);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
  }
}

// get bid
export async function getBid(bidId) {
  try {
    return await window.canister.flowchain.get_bid(bidId);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

// get_pending_bids_for_order
export async function getPendingBidsForOrder(orderId) {
  try {
    return await window.canister.flowchain.get_pending_bids_for_order(orderId);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// get_supplier_active_bids
export async function getSupplierActiveBids(supplierId) {
  try {
    return await window.canister.flowchain.get_supplier_active_bids(supplierId);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function createQuotation(quotationPayload) {
  try {
    console.log("utils", quotationPayload);
    return await window.canister.flowchain.create_quotation(quotationPayload);
  } catch (err) {
    console.log(err);
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function getQuotation(id) {
  try {
    return await window.canister.flowchain.getQuotation(id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function getAllQuotations() {
  try {
    return await window.canister.flowchain.getAllQuotations();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function sortQuotationsByCompanyName(companyId) {
  try {
    return await window.canister.flowchain.sortQuotationsByCompanyName(
      companyId
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// getOrderQuotations
export async function getOrderQuotations(orderId) {
  try {
    return await flow_chain_backend.get_order_quotation(orderId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function updateQuotationStatus(quotationId, status) {
  try {
    return await window.canister.flowchain.updateQuotationStatus(
      quotationId,
      status
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
  }
}
