"use client";

import Image from "next/image";
import { Star, MapPin, Volume2, Mic, Repeat, Heart } from "lucide-react";
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
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-5 flex flex-col gap-3 w-full mb-6">
      {/* Top: Profile, contact, posted */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Image
            src={getAvatarUrl(bid?.user?.profile.avatar || null)}
            alt="profile"
            width={55}
            height={55}
            className="rounded-full object-cover"
          />
          <div className="text-sm">
            <div className="flex items-center gap-1 font-semibold text-gray-900 ">
              {bid.user?.name || "Robert Froze"}
              <Image
                src="/assets/verified.png"
                alt="verified"
                width={20}
                height={20}
              />
            </div>
            <div className="flex ">
              <div className="flex text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
                <Star size={16} strokeWidth={1.5} />
              </div>{" "}
              <div className="text-xs text-gray-500">
                {bid.user?.email || "| robert.fox@gmail.com"} |{" "}
                {bid.user?.phone || "+167964578900"}
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-blue-400 mt-0.5">
              <MapPin size={13} />
              {"95 Mills Street, Victoria, 3996 Inverloch city Australia"}
            </div>
          </div>
        </div>
        <div className="text-sm text-blue-400 font-medium whitespace-nowrap flex gap-2">
          Posted 3 Days Ago
          <Heart
            size={20}
            className="text-white p-1 fill-white cursor-pointer bg-blue-500 rounded-full"
          />
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      <div className="flex items-center gap-4 border border-gray-200 bg-[#FBFBFB] px-6 py-4 rounded-full text-base w-full max-w-md mt-4 mb-2">
        <Mic size={22} className="text-blue-500" />
        <div className="flex-1 h-2.5 bg-blue-400 rounded relative">
          <div className="absolute top-1/2 left-[30%] w-3 h-3 bg-white border border-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <Volume2 size={22} className="text-gray-700" />
        <span className="text-sm text-gray-700 whitespace-nowrap">0:12</span>
      </div>

      {/* Transcript + Re-record */}
      <div>
        <div className="flex justify-between items-center text-sm font-medium text-gray-700">
          <span className="font-semibold text-gray-600">Transcript</span>
          <button className="text-red-500 text-sm flex items-center gap-1">
            <Repeat size={14} /> Re-record
          </button>
        </div>
        <div className="border border-gray-200 rounded-md px-4 py-4 mt-1 text-sm text-gray-700 bg-[#FBFBFB]">
          {
            "Lorem ipsum dolor sit amet, consectetur adip elit, glië edsfg fgeg tempor gkbnrt. tdghfgn mn dnew lorem psum dolor sit amet, consectetur adip elit, glië edsfg fgeg tempor gkbnrt. tdghfgn mn dnewpsum dolor sit amet, consectetur adip elit, glië edsfg fgeg tempor gkbnrt. tdghfgn mn dnew psum dolor sit amet, consectetur adip elit, glië edsfg fgeg tempor gkbnrt. tdghfgn mn dnew psum dolor sit amet, consectetur adip elit, glië edsfg fgeg tempor gkbnrt. tdghfgn mn dnew"
          }
        </div>
      </div>

      {/* Pricing + Buttons */}
      <div className="flex justify-between items-center mt-2 flex-wrap gap-3 mb-1">
        <div className="text-sm text-gray-800">
          <span className="font-semibold text-gray-600">Quoted Price :</span>{" "}
          <span className="text-green-600 font-semibold">
            ${bid.offeredPrice || 300}
          </span>{" "}
          | <span className="font-semibold text-gray-600">Estimated Time:</span>{" "}
          <span className="text-gray-500">
            {bid?.offeredEstimatedTime || "Aug 5, 2025"}
          </span>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button className="bg-blue-400 text-white text-sm px-5 py-1.5 rounded-md font-medium hover:bg-blue-600 transition">
          Hire Now
        </button>
        {/* <a href="/message"> */}{" "}
        <button
          onClick={handleClickOnChat}
          className="bg-gray-800 text-white text-sm px-5 py-1.5 rounded-md font-medium hover:bg-gray-900 transition"
        >
          Chat with Tradie
        </button>
        {/* </a> */}
      </div>
    </div>
  );
}
