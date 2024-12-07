import { flow_chain_backend } from "../../../declarations/flow_chain_backend";

export async function createItem(item_payload) {
  return flow_chain_backend.create_item_as_client(item_payload);
}

export async function getAllItemsByClient() {
  try {
    return await flow_chain_backend.list_items();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
//   export async function getAllItemsByClient(client_id) {
//     try {
//       return await flow_chain_backend.list_items_by_client(client_id);
//     } catch (err) {
//       if (err.name === "AgentHTTPResponseError") {
//         const authClient = window.auth.client;
//         await authClient.logout();
//       }
//       return [];
//     }
//   }

// list_items_by_supplier
export async function getAllItemsBySupplier(supplier_id) {
  try {
    return await flow_chain_backend.list_items_by_supplier(supplier_id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// get_order_items
export async function getOrderItems(order_id) {
  try {
    return await flow_chain_backend.get_order_items(order_id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// add_item_to_order
export async function addItemToOrder(order_id, data) {
  return await flow_chain_backend.add_item_to_order(order_id, data);
}

// create_item_as_supplier
export async function createItemAsSupplier(item_payload) {
  return await flow_chain_backend.create_item_as_supplier(item_payload);
}

// get_item
export async function getItem(item_id) {
  try {
    return await flow_chain_backend.get_item(item_id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

// search_items_by_category
export async function searchItemsByCategory(category) {
  try {
    return await flow_chain_backend.search_items_by_category(category);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}