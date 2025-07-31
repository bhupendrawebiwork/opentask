'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldAlert,
  Gavel,
  Flag,
  Users,
  Settings,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Moderation', href: '/admin/moderation', icon: ShieldAlert },
  { name: 'Disputes', href: '/admin/disputes', icon: Gavel },
  { name: 'Reports', href: '/admin/reports', icon: Flag },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-60 h-screen bg-[#f7faff] border-r border-gray-200 py-8 px-4 flex flex-col gap-2">
      {navItems.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
            ${
              pathname === href
                ? 'bg-blue-500 text-white font-semibold'
                : 'text-gray-700 hover:bg-blue-50'
            }`}
        >
          <Icon className="w-5 h-5" />
          <span>{name}</span>
        </Link>
      ))}
    </div>
  );
}
