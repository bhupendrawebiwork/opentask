'use client';

import Navbar from './Components/layout/Navbar';
import Sidebar from './Components/layout/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">

      <Navbar />

      {/* Below: Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
