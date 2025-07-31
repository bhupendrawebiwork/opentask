"use client";

import Image from "next/image";
import { Heart, Play } from "lucide-react";

export default function MyBidCard({ tradie }: any) {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-5 flex justify-between gap-5 w-full mb-6">
      {/* LEFT SECTION */}
      <div className="flex-1 flex flex-col">
        {/* Top: Profile Info */}
        <div className="flex">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-3">
                <Image
                  src={tradie?.image || "/assets/profile.png"}
                  alt="profile"
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1 font-semibold text-gray-900 text-base">
                    {tradie?.name || "Robert Froze"}
                    
                  </div>
                  <div className="flex text-yellow-400">★★★★☆  <span className="text-gray-500 text-sm ml-1">(1)</span></div>
                   
                  <div className="text-xs text-gray-600 mt-0.5">
                    {tradie?.email || "robert.fro@gmail.com"} |{" "}
                    {tradie?.phone || "+167894578000"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {tradie?.address ||
                      "94 Mills Street, Victoria, 3866 Inverloch city Australia"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mr-6">
                <span className="text-xs sm:text-sm">Posted 3 Days Ago</span>
                <Heart className="bg-[#27548a]  text-white rounded-full p-1"
                />
              </div>
            </div>

            {/* Audio Player */}
            <div className="flex items-center gap-2 mt-6 mr-6 mb-6 bg-gray-50 p-6 rounded-full">
              <Play size={16} className="text-[#27548a]" />
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#27548a]"></div>
              </div>
              <span className="text-xs text-gray-500">0:12</span>
              <button className="text-[#27548a] text-sm font-semibold ml-2">
                Re-record
              </button>
            </div>

            {/* Transcript */}
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                Transcript
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {tradie?.transcript ||
                  "Lorem ipsum dolor sit amet, consectetur adip elit, gile estday tjepg tempor glatn, tohtign mn dwew lorem ipsum dolor sit amet, consectetur adip elit, gile estday tjepg tempor glatn, tohtign mn dwew ipsum dolor sit amet, consectetur adip elit, gile estday tjepg tempor glatn, tohtign mn dwew."}
              </p>
            </div>
          </div>
          {/* RIGHT MAP */}
          <div className="w-[120px] h-[220px] shrink-0 mt-1 rounded-md overflow-hidden shadow">
            <iframe
              width="120"
              height="120"
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                tradie?.address ||
                  "94 Mills Street, Victoria, 3866 Inverloch city Australia"
              )}&output=embed`}
              className="w-full h-full rounded-md"
            />
          </div>
        </div>
        <hr className="border-gray-200 my-6"></hr>
        {/* Price + Buttons */}
        <div className="mt-3 flex justify-between items-center flex-wrap gap-3">
          <div className="text-sm font-semibold text-gray-700">
            Quoted Price:{" "}
            <span className="text-[#27548a] font-bold">
              ${tradie?.quotedPrice || 300}
            </span>{" "}
            | Expected Completion: {tradie?.expectedDate || "Aug 5, 2025"}
          </div>
          <div className="flex gap-3">
            <button className="bg-[#27548a] hover:bg-[#1d2834] text-white text-sm font-medium px-5 py-2 rounded-md transition">
              Hire Now
            </button>
            <button className="bg-[#1d2834] hover:bg-[#27548a] text-white text-sm font-medium px-5 py-2 rounded-md transition">
              Chat with Trade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
