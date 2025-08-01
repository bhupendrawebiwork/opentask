"use client";

import Image from "next/image";
import { Star, MapPin, Volume2, Mic, Repeat, Heart, Play } from "lucide-react";
import { getAvatarUrl } from "@/config/constent";
import { Bid } from "@/types/types";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useRouter } from "next/navigation";

export default function MyBidCard({ bid }: { bid: Bid }) {
  const router = useRouter();
  const { authUser } = useAuthStore();
  const { createChat } = useChatStore();

  const handleClickOnChat = async () => {
    const payload = {
      bidId: bid.id,
      taskId: bid.taskId,
      taskerId: bid.userId,
      posterId: authUser.id,
    };
    const res = await createChat(payload);
    router.push(`/message`);
  };
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-5 flex justify-between gap-5 w-full mb-6">
      <div className="flex-1 flex flex-col">
        {/* Top: Profile Info */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-3">
            <Image
              src={bid.user?.profile?.avatar || "/assets/profile.png"}
              alt="profile"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-1 font-semibold text-gray-900 text-base">
                {bid.user?.name || "Robert Froze"}
              </div>
              <div className="flex text-yellow-400">
                ★★★★☆ <span className="text-gray-500 text-sm ml-1">(1)</span>
              </div>
              <div className="text-xs text-gray-600 mt-0.5">
                {bid.user?.email || "robert.fro@gmail.com"} |{" "}
                {bid.user?.phone || "+167894578000"}
              </div>
              <div className="text-xs text-gray-600">
                {bid.user?.profile.location.toString() ||
                  "94 Mills Street, Victoria, 3866 Inverloch city Australia"}
              </div>
            </div>
          </div>

          {/* Right Side: Posted + Heart */}
          <div className="flex items-center gap-2 text-sm text-[#27548a] font-medium">
            <span className="text-xs sm:text-sm">Posted 3 Days Ago</span>
            <Heart
              size={18}
              className="text-white p-1 fill-white bg-[#27548a] rounded-full"
            />
          </div>
        </div>

        {/* Audio + Transcript (60%) and Map (40%) */}
        <div className="flex flex-col md:flex-row gap-5 mt-6 mb-6">
          {/* LEFT 60% */}
          <div className="flex-1 md:w-[60%]">
            {/* Audio Player */}
            <div className="flex items-center gap-2 bg-gray-50 p-6 rounded-full mb-3">
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
            <div className="mt-3 px-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                Transcript
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {
                  // discription
                  "Lorem ipsum dolor sit amet, consectetur adip elit, gile estday tjepg tempor glatn, tohtign mn dwew lorem ipsum dolor sit amet, consectetur adip elit, gile estday tjepg tempor glatn, tohtign mn dwew ipsum dolor sit amet, consectetur adip elit, gile estday tjepg tempor glatn, tohtign mn dwew."
                }
              </p>
            </div>
          </div>

          {/* RIGHT 40% MAP */}
          <div className="md:w-[40%] h-[180px] md:h-[180px] rounded-md overflow-hidden shadow">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                "94 Mills Street, Victoria, 3866 Inverloch city Australia"
              )}&output=embed`}
              className="w-full h-full rounded-md"
              style={{
                border: "0",
                filter: "grayscale(80%) hue-rotate(190deg) saturate(200%)",
              }}
            />
          </div>
        </div>

        <hr className="border-gray-200 my-6" />

        {/* Price + Buttons */}
        <div className="mt-3 flex justify-between items-center flex-wrap gap-3">
          <div className="text-sm font-semibold text-gray-700">
            Quoted Price:{" "}
            <span className="text-[#27548a] font-bold">
              ${bid.offeredPrice || 300}
            </span>{" "}
            | Expected Completion: {bid.offeredEstimatedTime || "Aug 5, 2025"}
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
