"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EditProfileForm from "@/components/EditProfile";
import ChangePasswordForm from "@/components/common/ChangePassword";
import Location from "@/components/common/LocationServices";
import {
  User,
  Lock,
  LogOut,
  Mail,
  Phone,
  Camera,
  CheckCircle,
  Star,
  Globe,
  MapPin,
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
    { key: "password", label: "Change Password", icon: <Lock size={18} /> },
    { key: "location", label: "Location Services", icon: <MapPin size={18} /> },
  ];

  useEffect(() => {
    fetchUser();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadAvatar(file);
  };

  return (
    <div className="min-h-screen bg-[#f3f3e0] flex flex-col">

     <div className="flex px-6 py-6 gap-6">
        {/* Sidebar Fixed */}
        <div className="w-1/5   p-6 space-y-6 fixed top-24 bottom-0 overflow-y-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
              <Image
                src={user?.avatar ? `${imgUrl}${user.avatar}` : "/assets/profile.png"}
                alt="User"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-[#27548a] rounded-full p-1">
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
            <h2 className="text-xl font-semibold text-black mb-1">
              {loading ? "Loading..." : user?.name || "N/A"}
            </h2>
            <p className="text-gray-500 text-sm mb-2">{user?.position || ""}</p>
            <div className="flex justify-center items-center gap-1 text-green-500 text-xs font-bold mb-2">
              <CheckCircle size={14} /> {user?.isVerified ? "User Verified" : "Not Verified"}
            </div>
            <div className="flex justify-center text-yellow-400 mb-3">
              {[...Array(user?.aggrRating || 0)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
              {[...Array(5 - (user?.aggrRating || 0))].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="white"
                  stroke="currentColor"
                  strokeWidth={2}
                />
              ))}
            </div>
            <div className="text-gray-500 text-xs mb-1 flex items-center justify-center gap-1">
              <Mail size={12} /> {user?.email || ""}
            </div>
            <div className="text-gray-500 text-xs flex items-center justify-center gap-1">
              <Phone size={12} /> {user?.phone || ""}
            </div>
          </div>

          {/* Sidebar Menu */}
          <ul className="bg-white rounded-2xl shadow-md p-4 space-y-3">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`flex items-center gap-3 text-sm font-medium cursor-pointer px-4 py-2 rounded-xl transition
                ${
                  activeTab === item.key
                    ? "bg-[#27548a] text-white"
                    : "text-gray-500 hover:bg-blue-100 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.icon} {item.label}
              </li>
            ))}
            <li
              onClick={logout}
              className="flex items-center gap-3 text-red-500 font-medium cursor-pointer px-4 py-2 rounded-xl hover:text-white hover:bg-red-500 transition"
            >
              <LogOut size={16} /> Log out
            </li>
          </ul>
        </div>

        {/* Main Content Scrollable */}
        <div className="ml-[20%] w-4/5 overflow-y-auto py-4 px-8 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-md min-h-[80vh]">
            {activeTab === "edit" && (
              <EditProfileForm user={user} handleUpdate={updateUser} />
            )}
            {activeTab === "password" && <ChangePasswordForm />}
            {activeTab === "location" && <Location user={user} handleUpdate={updateUser} />}
          </div>
        </div>
      </div>
    </div>
  );
}