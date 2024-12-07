import React, { useState } from "react";
import { Box } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import GetInTouchModal from "./GetInTouchModal";

export default function Navbar() {
  const location = useLocation();
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
          {/* Logo */}
          <Link
            to="/?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
            className="flex items-center gap-2"
          >
            <Box className="w-8 h-8 text-blue-900" />
            <span className="font-medium text-xl">Flowchain</span>
          </Link>

          {/* Navigation Links - Centered */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center gap-12">
              <Link
                to="/?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
                className={`hover:text-blue-900 text-sm font-medium ${
                  location.pathname ===
                  "/?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
                    ? "text-blue-900"
                    : ""
                }`}
              >
                HOME
              </Link>
              <Link
                to="/about?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
                className={`hover:text-blue-900 text-sm font-medium ${
                  location.pathname ===
                  "/about?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
                    ? "text-blue-900"
                    : ""
                }`}
              >
                ABOUT
              </Link>
              <Link
                to="/services?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
                className={`hover:text-blue-900 text-sm font-medium ${
                  location.pathname ===
                  "/services?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
                    ? "text-blue-900"
                    : ""
                }`}
              >
                SERVICES
              </Link>
            </div>
          </div>

          {/* Get in Touch Button - Right aligned */}
          <button
            onClick={() => setIsGetInTouchOpen(true)}
            className="hidden md:block px-6 py-2 border border-blue-900 rounded-full text-sm font-medium hover:bg-blue-900 hover:text-white transition-colors"
          >
            GET IN TOUCH
          </button>
        </div>
      </nav>

      <GetInTouchModal
        isOpen={isGetInTouchOpen}
        onClose={() => setIsGetInTouchOpen(false)}
      />
    </>
  );
}
