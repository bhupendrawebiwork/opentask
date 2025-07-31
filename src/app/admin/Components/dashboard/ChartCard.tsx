'use client';

import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // Chart or placeholder
}

export default function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      {/* Chart Area */}
      <div className="flex-1 flex items-center justify-center min-h-[200px]">
        {children ? (
          children
        ) : (
          <div className="text-gray-400 text-sm">[Chart Placeholder]</div>
        )}
      </div>
    </div>
  );
}
