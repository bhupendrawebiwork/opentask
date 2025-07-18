"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EditProfileForm from "@/components/EditProfile";
import ChangePasswordForm from "@/components/common/ChangePassword";
import {
  User,
  Wallet,
  Bookmark,
  Lock,
  Settings,
  LogOut,
  Mail,
  Phone,
  Camera,
  CheckCircle,
  Star,
  Globe,
} from "lucide-react";
import { imgUrl } from "@/config/constent";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/userStore";

export default function ProfilePage() {
  const { user, loading, fetchUser, updateUser, uploadAvatar } = useUserStore();
  const { logout } = useAuthStore();

  const [activeTab, setActiveTab] = useState("edit");

  const menuItems = [
    { key: "edit", label: "Edit Profile", icon: <User size={18} /> },
    { key: "wallet", label: "Wallet", icon: <Wallet size={18} /> },
    { key: "saved", label: "Save Project", icon: <Bookmark size={18} /> },
    { key: "password", label: "Change Password", icon: <Lock size={18} /> },
    { key: "settings", label: "Setting", icon: <Settings size={18} /> },
  ];

  useEffect(() => {
    fetchUser();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadAvatar(file);
  };
console.log("`${imgUrl}${user.avatar}`   " , `${imgUrl}${user?.avatar}`);

  return (
    <div className="min-h-screen bg-[#EEF2F8]">
      <div className="bg-white rounded-3xl shadow p-8 flex justify-between items-center mx-12 mt-4">
        <div className="flex items-center gap-6">
          <div className="relative w-35 h-35 rounded-3xl overflow-hidden">
            <Image
              src={
                user?.avatar ? `${imgUrl}${user.avatar}` : "/assets/profile.png"
              }
              alt="User"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 right-0 bg-blue-500 rounded-full p-1 z-10">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Camera className="text-white w-4 h-4" />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-black">
              {loading ? "Loading..." : user?.name || "N/A"}
            </h2>
            <p className="text-gray-500 text-lg">{user?.position || ""}</p>
            <div className="text-gray-500 text-sm mt-1">
              <Mail className="inline mr-2" size={14} />
              {user?.email || ""}
            </div>
            <div className="text-gray-500 text-sm">
              <Phone className="inline mr-2" size={14} />
              {user?.phone || ""}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex gap-2 mb-1">
            <p className="flex items-center gap-1 text-green-500 font-bold text-xs">
              <CheckCircle size={16} />{" "}
              {user?.isVerified ? "User Verified" : "Not Verified"}
            </p>
          </div>
          <div className="flex text-yellow-400">
            {[...Array(user?.rating || 0)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
            ))}
            {[...Array(5 - (user?.rating || 0))].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill="white"
                stroke="currentColor"
                strokeWidth={2}
              />
            ))}
          </div>

          <div className="mt-2">
            <Globe className="absolute text-white mt-2 ml-1" size={16} />
            <select
              className="rounded px-5 py-2 text-sm bg-gray-600 text-white text-center"
              value={user?.lang || "english"}
              onChange={(e) => updateUser({ lang: e.target.value })}
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="french">French</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex px-6 py-6 gap-6">
        <div className="w-1/6">
          <ul className="bg-[#EEF2F8] rounded-3xl p-6 space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`flex items-center gap-3 text-md font-semibold cursor-pointer p-3 rounded-xl transition
                ${
                  activeTab === item.key
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-blue-100 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.icon} {item.label}
              </li>
            ))}
            <li
              onClick={logout}
              className="flex items-center gap-3 text-red-500 font-semibold cursor-pointer mt-4 hover:text-white hover:bg-red-500 p-3 rounded-xl"
            >
              <LogOut size={18} /> Log out
            </li>
          </ul>
        </div>

        <div className="w-3/4 bg-white p-8 rounded-3xl shadow">
          {activeTab === "edit" && (
            <EditProfileForm user={user} handleUpdate={updateUser} />
          )}
          {activeTab === "password" && <ChangePasswordForm />}
        </div>
      </div>
    </div>
  );
}
