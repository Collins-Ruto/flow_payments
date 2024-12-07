import { HttpAgent, Actor } from "@dfinity/agent";
import { createAgent } from "@dfinity/utils";
import { LedgerCanister } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import { idlFactory as chainflowIDL } from "../../../declarations/flow_chain_backend/flow_chain_backend.did.js";
import { idlFactory as ledgerIDL } from "../../../declarations/ledger/ledger.did.js"; //No such file or directory

const chainflow_CANISTER_ID = "be2us-64aaa-aaaaa-qaabq-cai";
const LEDGER_CANISTER_ID = "b77ix-eeaaa-aaaaa-qaada-cai";
const HOST = "http://localhost:4943";

export async function getflowchainCanister() {
  return await getCanister(chainflow_CANISTER_ID, chainflowIDL);
}

export async function getLedgerCanister() {
  return getCanister(LEDGER_CANISTER_ID, ledgerIDL); // ledger IDL not found
}

async function getCanister(canisterId, idl) {
  const authClient = window.auth.client;
  const agent = new HttpAgent({
    host: HOST,
    identity: authClient.getIdentity(),
  });
  await agent.fetchRootKey(); // this line is needed for the local env only
  return Actor.createActor(idl, {
    agent,
    canisterId,
  });
}

export async function initLedgers() {
  const authClient = window.auth.client;
  const identity = authClient.getIdentity();
  const agent = await createAgent({
    identity,
    // host: process.env.DFX_NETWORK === 'ic' ? 'https://icp-api.io' : 'http://localhost:4943',
    host: HOST,
  });

  // Initialize ICP ledger
  return LedgerCanister.create({
    agent,
    canisterId: Principal.fromText(LEDGER_CANISTER_ID),
  });
}
