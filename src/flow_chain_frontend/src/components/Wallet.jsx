import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import { getBalances } from "../utils/ledger";

const Wallet = () => {
  const isAuthenticated = window.auth.isAuthenticated;
  const { logout } = useAuth();

  const principal = window.auth.principalText;

  const symbol = "ICP";

  const [balance, setBalance] = useState("0");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getBalance = useCallback(async () => {
    if (isAuthenticated) {
      const balances = await getBalances();
      setBalance((Number(balances.ICP) / 100000000).toFixed(4));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <div className="relative flex gap-2 items-center w-24">
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center px-3 py-2 border rounded-full bg-white shadow-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
      >
        {balance}
        <span className="ml-2">{symbol}</span>
        <svg
          className="w-4 h-4 ml-2 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10">
          <div className="px-4 py-2 text-gray-700 border-b">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l-4-4m0 0l4-4m-4 4h12"
                />
              </svg>
              <span className="ml-2 font-mono truncate">{principal}</span>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="ml-2">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Wallet;
