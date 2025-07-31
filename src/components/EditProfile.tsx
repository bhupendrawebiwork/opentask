"use client";
import { useState, useEffect } from "react";
import { User, Mail, Phone, Home, IdCard } from "lucide-react";

export default function EditProfileForm({ user, handleUpdate }: any) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    permanentAddress: "",
    aadharNumber: "",
    aadharFile: null as File | null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        permanentAddress: user.permanentAddress || "",
        aadharNumber: user.aadharNumber || "",
        aadharFile: null,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, aadharFile: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare form data for API if file upload needed
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("permanentAddress", formData.permanentAddress);
    payload.append("aadharNumber", formData.aadharNumber);
    if (formData.aadharFile) payload.append("aadharFile", formData.aadharFile);

    handleUpdate(payload);
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-sm";

  return (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
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
              className={inputClass}
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
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
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
              className={inputClass}
              disabled
            />
          </div>
        </div>

        {/* Permanent Address */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Permanent Address
          </label>
          <div className="relative">
            <Home className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="text"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              placeholder="123 Main Street, City, State"
              className={inputClass}
            />
          </div>
        </div>

        {/* Aadhar Number */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Aadhar Number
          </label>
          <div className="relative">
            <IdCard className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              placeholder="1234-5678-9012"
              className={inputClass}
            />
          </div>
        </div>

        {/* Aadhar PDF Upload */}
        <div className="">
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Upload Aadhar (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full border border-blue-300 rounded-lg p-2 text-sm"
          />
        </div>

        {/* Submit */}
        <div className="text-right col-span-2 mt-6">
          <button
            type="submit"
            className="bg-[#27548a] text-white px-8 py-3 rounded-xl hover:bg-[#27548a] transition"
          >
            Update Details
          </button>
        </div>
      </form>
    </>
  );
}
