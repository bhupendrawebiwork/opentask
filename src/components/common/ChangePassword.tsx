"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/userStore";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { changePassword } = useUserStore();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!currentPassword || !newPassword) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Change Password</h3>
      <form className="grid grid-cols-2 gap-6" onSubmit={handleChangePassword}>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Current Password</label>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            />
          </div>
        </div>

        <div className="text-left col-span-2 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-400 text-white px-8 py-3 rounded-xl hover:bg-blue-500 transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </>
  );
}
