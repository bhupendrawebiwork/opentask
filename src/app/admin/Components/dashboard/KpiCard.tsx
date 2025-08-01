'use client';

import React from 'react';

interface KpiCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  iconBg?: string;
}

export default function KpiCard({ icon, title, value, change, iconBg }: KpiCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
      {/* Icon */}
      <div className={`p-3 rounded-full ${iconBg || 'bg-blue-100'} flex items-center justify-center`}>
        {icon}
      </div>

      {/* Text Content */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        {change && <p className="text-xs text-blue-500">{change}</p>}
      </div>
    </div>
  );
}
