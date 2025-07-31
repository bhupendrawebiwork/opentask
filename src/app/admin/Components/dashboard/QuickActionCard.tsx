'use client';

import { ReactNode } from 'react';

interface QuickActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonColor?: string;
  onClick?: () => void;
  iconBg?: string;
}

export default function QuickActionCard({
  icon,
  title,
  description,
  buttonText,
  buttonColor = 'bg-blue-600 hover:bg-blue-700',
  onClick,
}: QuickActionCardProps) {
  return (
    <div className="bg-white shadow rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <button
        onClick={onClick}
        className={`${buttonColor} text-white text-sm font-medium px-4 py-2 rounded-lg transition mt-4 self-start`}
      >
        {buttonText}
      </button>
    </div>
  );
}
