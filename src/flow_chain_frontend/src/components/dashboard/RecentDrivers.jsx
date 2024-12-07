import React from 'react';

export default function RecentDrivers() {
  const drivers = [
    { name: 'Sophie Moore', email: 'contact@sophiemoore.com' },
    { name: 'Sam Smith', email: 'contact@samsmith.com' },
    { name: 'Daniel Johnson', email: 'contact@danieljohnson.com' },
    { name: 'Frances Willem', email: 'contact@franceswillem.com' }
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6">Recent Drivers</h2>
      <div className="space-y-4">
        {drivers.map((driver, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {driver.name.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{driver.name}</div>
              <div className="text-sm text-blue-900">{driver.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}