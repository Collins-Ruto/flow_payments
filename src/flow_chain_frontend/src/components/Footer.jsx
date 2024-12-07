import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white rounded-t-[2.5rem]">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div className="space-y-1">
            <p>Flowchain Logistics LLC 80100-39400 Kenya</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-4 md:mt-0">
            <p>+254 712 564 078</p>
            <p>info@flowchain.com</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm opacity-70">
            <p>© 2024 Flowchain Logistics LLC - All Rights Reserved</p>
            <div className="hidden md:block">•</div>
            <p>Developed: Dual Studio</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
