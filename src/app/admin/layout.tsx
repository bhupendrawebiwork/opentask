"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  Gavel,
  Eye,
  FileText,
  MessageCircle,
  Users,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: ShieldCheck },
  { label: "Disputes", href: "/admin/disputes", icon: Gavel },
  { label: "Monitoring", href: "/admin/monitoring", icon: Eye },
  { label: "Audit", href: "/admin/audit", icon: FileText },
  { label: "Rules", href: "/admin/rules", icon: Settings },
  { label: "Moderation", href: "/admin/moderation", icon: Users },
  { label: "Live Chat", href: "/admin/live-chat", icon: MessageCircle },
  { label: "Review Appeals", href: "/admin/reviews", icon: Gavel },
  { label: "User List", href: "/admin/user-list", icon: Gavel },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6 rounded-r-3xl">
        <h2 className="text-xl font-bold text-blue-600 mb-8 text-left ml-6">Admin</h2>
        <nav className="space-y-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl transition cursor-pointer
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
