"use client";
import { User, Mail, Phone, Briefcase, Building2 } from "lucide-react";

export default function EditProfileForm() {
  return (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile</h3>
      <form className="grid grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Name</label>
          <div className="relative">
            <User className="absolute top-3 left-3 text-gray-400" size={16} />
            <input type="text" placeholder="Daniel James"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-sm" />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone</label>
          <div className="relative">
            <Phone className="absolute top-3 left-3 text-gray-400" size={16} />
            <input type="text" placeholder="(571)-523-6952"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-sm" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-700 mb-1 block font-semibold">Email</label>
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={16} />
            <input type="email" placeholder="daniel.james@gmail.com"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-sm" />
          </div>
        </div>

        {/* Position */}
        <div>
          <label className="text-sm text-gray-700 mb-1 block font-semibold">Position</label>
          <div className="relative">
            <Briefcase className="absolute top-3 left-3 text-gray-400" size={16} />
            <input type="text" placeholder="Sr. Technical Head"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-sm" />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="text-sm text-gray-700 mb-1 block font-semibold">Company Name</label>
          <div className="relative">
            <Building2 className="absolute top-3 left-3 text-gray-400" size={16} />
            <input type="text" placeholder="Tech solution and support systems"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-sm" />
          </div>
        </div>
      </form>

      <div className="text-left mt-14">
        <button className="bg-blue-400 text-white px-8 py-3 rounded-xl hover:bg-blue-500 transition">
          Update Details
        </button>
      </div>
    </>
  );
}
