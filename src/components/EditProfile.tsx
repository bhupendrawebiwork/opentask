"use client";
import { useState, useEffect } from "react";
import { User, Mail, Phone,} from "lucide-react";

export default function EditProfileForm({ user, handleUpdate }: any) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    handleUpdate(formData); // this should POST to /user
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Name
          </label>
          <div className="relative">
            <User className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Daniel James"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-sm"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Phone
          </label>
          <div className="relative">
            <Phone className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(571)-523-6952"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-700 mb-1 block font-semibold">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="daniel.james@gmail.com"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-sm"
              disabled
            />
          </div>
        </div>

        {/* Position */}
        {/* <div>
          <label className="text-sm text-gray-700 mb-1 block font-semibold">
            Position
          </label>
          <div className="relative">
            <Briefcase
              className="absolute top-3 left-3 text-gray-400"
              size={16}
            />
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Sr. Technical Head"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-sm"
            />
          </div>
        </div> */}

        {/* Company */}
        {/* <div>
          <label className="text-sm text-gray-700 mb-1 block font-semibold">
            Company Name
          </label>
          <div className="relative">
            <Building2
              className="absolute top-3 left-3 text-gray-400"
              size={16}
            />
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Tech solution and support systems"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-sm"
            />
          </div>
        </div> */}
        
      </form>
      <div className="text-left mt-8">
          <button
            type="submit"
            className="bg-blue-400 text-white px-8 py-3 rounded-xl hover:bg-blue-500 transition"
          >
            Update Details
          </button>
        </div>
    </>
  );
}
