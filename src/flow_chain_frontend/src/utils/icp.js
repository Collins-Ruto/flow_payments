import { getflowchainCanister, initLedgers } from "./canisterFactory";
import { AuthClient } from "@dfinity/auth-client";

export async function initializeContract() {
  const client = await AuthClient.create();
  window.auth = {};
  window.auth.client = client;
  window.auth.identity = client.getIdentity();
  window.auth.isAuthenticated = await client.isAuthenticated();
  window.auth.principal = client.getIdentity()?.getPrincipal();
  window.auth.principalText = client.getIdentity()?.getPrincipal().toText();
  window.canister = {};
  window.canister.flowchain = await getflowchainCanister(); //Implemented in canisterFactory.js well
  window.canister.ledger = await initLedgers();
}
