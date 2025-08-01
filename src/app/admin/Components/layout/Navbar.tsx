'use client';

import { Bell, Search, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full h-20 bg-white shadow-sm flex items-center justify-between px-16 border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Image
          src="/assets/main logo.png"
          alt="Logo"
          width={80}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-8 relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-500" />
      </div>

      {/* Bell + Admin Avatar with Dropdown */}
      <div className="relative flex items-center gap-6" ref={dropdownRef}>
        <Bell className="h-6 w-6 text-gray-800 hover:text-blue-600 cursor-pointer" />

        {/* Avatar + Name + Arrow */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <Image
            src="/assets/profile.png"
            alt="Admin Avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-600">Admin</span>
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-16 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50">
            <ul className="py-2 text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 font-medium">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
