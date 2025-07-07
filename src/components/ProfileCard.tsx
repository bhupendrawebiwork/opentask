// components/ProfileSidebarCard.tsx

"use client";

import {
  User,
  Mail,
  Phone,
  LogOut,
  Wallet,
  Lock,
  Settings,
  Bookmark,
  Camera,
  CheckCircle,
  Star,
  Globe,
  
} from "lucide-react";
import Image from "next/image";

export default function ProfilerCard() {
  return (
    <>
      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow p-8 flex justify-between items-center mx-12 mt-4">
        <div className="flex items-center gap-6">
          <div className="relative w-35 h-35 rounded-3xl overflow-hidden">
            <Image src="/assets/img.png" alt="User" fill className="object-cover" />
            <div className="absolute bottom-2 right-0 bg-blue-500 rounded-full p-1 z-10">
              <Camera className="text-white w-4 h-4" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-black">Daniel James</h2>
            <p className="text-gray-500 text-lg">Sr. Technical Head</p>
            <div className="text-gray-500 text-sm mt-1">
              <Mail className="inline mr-2" size={14} />
              daniel.james@gmail.com
            </div>
            <div className="text-gray-500 text-sm">
              <Phone className="inline mr-2" size={14} />
              (571)-523-6952
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex gap-2 mb-1">
            <p className="flex items-center gap-1 text-green-500 font-bold text-xs">
              <CheckCircle size={16} />User Verified
            </p>
          </div>
          <div className="flex text-yellow-400">
            {[...Array(4)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
            ))}
            <Star size={18} fill="white" stroke="currentColor" strokeWidth={2} />
          </div>

          <div className="mt-2">
            <Globe className="absolute text-white mt-2 ml-1" size={16} />
            <select className="rounded px-5 py-2 text-sm bg-gray-600 text-white text-center">
              <option>English</option>
              <option>Hindi</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-1/6 mt-6 ml-6">
        <ul className="bg-[#EEF2F8] rounded-3xl p-6 space-y-6">
          <li className="group flex items-center gap-3 text-md text-gray-500 font-semibold cursor-pointer hover:bg-blue-400 hover:text-white p-3 rounded-xl transition">
            <User size={18} className="group-hover:text-white text-gray-900" /> Edit Profile
          </li>
          <li className="group flex items-center gap-3 text-md text-gray-500 font-semibold cursor-pointer hover:bg-blue-400 hover:text-white p-3 rounded-xl transition">
            <Wallet size={18} className="group-hover:text-white text-gray-900" /> Wallet
          </li>
          <li className="group flex items-center gap-3 text-md text-gray-500 font-semibold cursor-pointer hover:bg-blue-400 hover:text-white p-3 rounded-xl transition">
            <Bookmark size={18} className="group-hover:text-white text-gray-900" /> Save Project
          </li>
          <li className="group flex items-center gap-3 text-md text-gray-500 font-semibold cursor-pointer hover:bg-blue-400 hover:text-white p-3 rounded-xl transition">
            <Lock size={18} className="group-hover:text-white text-gray-900" /> Change Password
          </li>
          <li className="group flex items-center gap-3 text-md text-gray-500 font-semibold cursor-pointer hover:bg-blue-400 hover:text-white p-3 rounded-xl transition">
            <Settings size={18} className="group-hover:text-white text-gray-900" /> Setting
          </li>
          <li className="group flex items-center gap-3 text-red-500 font-semibold cursor-pointer mt-4 hover:bg-red-500 hover:text-white p-3 rounded-xl transition">
            <LogOut size={18} className="group-hover:text-white text-red-500" /> Log out
          </li>
        </ul>
      </div>
    </>
  );
}
