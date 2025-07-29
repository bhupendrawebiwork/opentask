"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Heart } from "lucide-react";
import BidEditOverlay from "./BidEditOverlay";


export default function BidStatusCard({ task }: any) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleCardClick = () => {
    setShowOverlay(true);
  };

  const handleClose = () => {
    setShowOverlay(false);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-white p-5 rounded-2xl shadow border border-gray-200 mb-6 hover:shadow-md transition w-full cursor-pointer"
      >
        {/* Top: Profile + location */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Image
              src={task?.user?.image || "/assets/profile.png"}
              alt="profile"
              width={52}
              height={52}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-semibold text-gray-800 text-sm sm:text-base">
                {task?.user?.name || "John Deo"}
                <Image
                  src="/assets/verified.png"
                  alt="verified"
                  width={20}
                  height={20}
                />
              </div>
              <div className="text-xs text-blue-400 flex items-center gap-1 mt-0.5">
                <MapPin size={13} />
                {task?.address?.full ||
                  "95 Mills Street, Victoria, 3996 Inverloch city Australia"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-400 font-medium">
            <span className="text-xs sm:text-sm">Posted 3 Days Ago</span>
            <Heart
              size={18}
              className="text-white p-1 fill-white bg-blue-400 rounded-full"
            />
          </div>
        </div>

        <hr className="my-3 border-gray-200" />

        {/* Title, Date, Status */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {task?.title || "Google Sheet automation AI"}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Applied on {task?.appliedDate || "July 25, 2025"}
            </p>
          </div>
          <span
            className={`px-4 py-1 text-sm font-medium rounded-md mt-1 h-fit ${
              task?.status === "Accepted"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {task?.status || "Pending"}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {task?.description ||
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry..."}
        </p>

        {/* Prices */}
        <div className="mt-3 text-sm text-gray-600 font-semibold">
          Your Quoted Price:{" "}
          <span className="text-green-600 font-semibold">
            ${task?.quotedPrice || 300}
          </span>{" "}
          | Client Quoted Price:{" "}
          <span className="text-green-600 font-semibold">
            ${task?.clientPrice || 270}
          </span>
        </div>

        {/* Edit Button */}
        <div className="mt-4">
          <button className="bg-blue-400 text-white text-sm font-semibold px-10 py-2 rounded-md hover:bg-blue-600 transition">
            Edit
          </button>
        </div>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <BidEditOverlay task={task} onClose={handleClose} />
      )}
    </>
  );
}
