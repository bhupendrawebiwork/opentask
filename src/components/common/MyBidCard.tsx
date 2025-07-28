"use client";

import Image from "next/image";
import { Star, MapPin, Volume2, Mic, Repeat } from "lucide-react";

export default function MyBidCard({ tradie }: any) {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-5 flex flex-col gap-3 w-full">
      {/* Top: Profile, contact, posted */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Image
            src={tradie?.image || "/assets/profile.png"}
            alt="profile"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <div className="text-sm">
            <div className="flex items-center gap-1 font-semibold text-gray-900">
              {tradie?.name || "Robert Froze"}
              {/* <Image
                src="/assets/verified-badge.svg"
                alt="verified"
                width={14}
                height={14}
              /> */}
            </div>
            <div className="text-xs text-gray-500">
              {tradie?.email || "robert.fox@gmail.com"} |{" "}
              {tradie?.phone || "+167964578900"}
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-400 mt-0.5">
              <MapPin size={13} />
              {tradie?.address ||
                "95 Mills Street, Victoria, 3996 Inverloch city Australia"}
            </div>
          </div>
        </div>
        <div className="text-sm text-blue-400 font-medium whitespace-nowrap">
          Posted 3 Days Ago
        </div>
      </div>

      {/* Stars + Audio Player */}
      <div className="flex items-center gap-4 mt-1">
        <div className="flex text-yellow-400">
          {[...Array(4)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
          ))}
          <Star size={16} strokeWidth={1.5} />
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm">
          <Mic size={16} className="text-blue-400" />
          <div className="w-24 h-1.5 rounded bg-blue-400 relative">
            <div className="absolute top-0 left-[60%] w-1.5 h-1.5 bg-white border border-blue-500 rounded-full -translate-x-1/2"></div>
          </div>
          <Volume2 size={16} className="text-gray-600" />
          <span className="text-xs text-gray-600">0:12</span>
        </div>
      </div>

      {/* Transcript + Re-record */}
      <div>
        <div className="flex justify-between items-center text-sm font-medium text-gray-700">
          <span>Transcript</span>
          <button className="text-red-500 text-sm flex items-center gap-1">
            <Repeat size={14} /> Re-record
          </button>
        </div>
        <div className="border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm text-gray-700 bg-gray-50">
          {tradie?.transcript ||
            "Lorem ipsum dolor sit amet, consectetur adip elit, glië edsfg fgeg tempor gkbnrt. tdghfgn mn dnew"}
        </div>
      </div>

      {/* Pricing + Buttons */}
      <div className="flex justify-between items-center mt-2 flex-wrap gap-3">
        <div className="text-sm text-gray-800">
          <span className="font-medium">Quoted Price :</span>{" "}
          <span className="text-green-600 font-semibold">
            ${tradie?.quotedPrice || 300}
          </span>{" "}
          |{" "}
          <span className="font-medium">Expected Completion:</span>{" "}
          <span className="text-gray-500">
            {tradie?.expectedDate || "Aug 5, 2025"}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-400 text-white text-sm px-5 py-1.5 rounded-md font-medium hover:bg-blue-600 transition">
            Hire Now
          </button>
         <a href="/message"> <button className="bg-gray-800 text-white text-sm px-5 py-1.5 rounded-md font-medium hover:bg-gray-900 transition">
            Chat with Tradie
          </button></a>
        </div>
      </div>
    </div>
  );
}
