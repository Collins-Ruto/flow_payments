import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";

export async function _transferICP(sellerAddress, amount, memo) {
  const canister = window.canister.ledger;
  const account = AccountIdentifier.fromHex(sellerAddress);
  const result = await canister.transfer({
    to: account.toUint8Array(),
    amount: { e8s: amount },
    memo,
    fee: { e8s: 10000n },
    from_subaccount: [],
    created_at_time: [],
  });
  return result.Ok;
}

export async function transferICP(toPrincipal, amount) {
  if (!window.canister.ledger) return null;
  const ledgerCanister = window.canister.ledger;

  const toAccount = {
    owner: Principal.fromText(toPrincipal),
    subaccount: [], // default subaccount
  };

  const transferAmount = BigInt(Math.floor(amount * 100000000)); // Convert to e8s

  const request = {
    to: toAccount,
    amount: transferAmount,
    createdAt: BigInt(Date.now() * 1000000), // Convert to nanoseconds
  };

  try {
    const blockHeight = await ledgerCanister.icrc1Transfer(request);
    return blockHeight;
  } catch (error) {
    console.error("Transfer failed:", error);
    throw error;
  }
}

export async function getBalances() {
  if (!window.canister.ledger) return null;
  const ledgerCanister = window.canister.ledger;

  const authClient = window.auth.client;
  const identity = authClient.getIdentity();
  const principal = identity.getPrincipal();

  const icpBalance =
    (await ledgerCanister?.accountBalance({
      accountIdentifier: AccountIdentifier.fromPrincipal({
        principal: principal,
      }),
      certified: true,
    })) || BigInt(0);

  return {
    ICP: icpBalance,
  };
}
