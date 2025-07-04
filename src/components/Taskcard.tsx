"use client";

import { MapPin, Star, Heart } from "lucide-react";

export default function TaskCard({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-black">
          Google Sheet automation AI
        </h2>
        <span className="text-sm text-blue-500 font-medium flex gap-2">
          Posted 3 Days Ago{" "}
          <Heart
            size={20}
            className="text-white p-1 fill-white cursor-pointer bg-blue-500 rounded-full"
          />
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-500 mt-2 gap-4">
        <span className="text-green-600 font-medium">✔ Payment Verified</span>
        <span className="flex items-center gap-1 text-yellow-500">
          {[...Array(4)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
          ))}
          <Star size={14} strokeWidth={1.5} className="text-yellow-500" />
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={14} className="text-gray-500" />
          95 Mills Street, Victoria, 3996 Inverloch city Australia
        </span>
      </div>

      <div className="flex gap-6">
        <div className="mt-2">
          <span className="text-sm font-semibold text-gray-500">Budget :–</span>{" "}
          <span className="text-gray-700 text-sm">
            Fixed Est. Budget $1500.00
          </span>
        </div>
        <div className="text-sm text-gray-600 mt-2">
          (Proposals <span className="font-medium">Less than 8</span>)
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry Lorem ipsum dolor sit amet consectetur adipisicing elit...
      </p>

      <div className="mt-4 flex gap-2 flex-wrap">
        {["API", "INTEGRATION", "AI", "CREATION"].map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
