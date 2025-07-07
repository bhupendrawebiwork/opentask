"use client";
import { Lock } from "lucide-react";

export default function ChangePasswordForm() {
  return (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Change Password</h3>
      <form className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Old Password</label>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">New Password</label>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            />
          </div>
        </div>
      </form>
      <div className="text-left mt-24 mb-24">
          <button className="bg-blue-400 text-white px-8 py-3 rounded-xl hover:bg-blue-500 transition">
            Update Password
          </button>
        </div>
    </>
  );
}
