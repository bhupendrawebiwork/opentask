"use client";

import {
  MapPin,
  CheckCircle,
  Star,
  Heart,
  ArrowLeft,
  Check,
} from "lucide-react";
import Image from "next/image";
import JobApplicationOverlay from "../JobApplicationOverlay";
import { useState } from "react";
import { imgUrl } from "@/config/constent";
import { useRouter } from "next/navigation";

export default function TaskDetailsOverlay({ task, onClose }: any) {
  const [showApplyOverlay, setShowApplyOverlay] = useState(false);
  const router = useRouter();

  const getDaysAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex justify-end">
      <div className="w-full max-w-3xl bg-white h-full p-6 overflow-y-auto rounded-l-3xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <ArrowLeft
              className="cursor-pointer text-gray-600 hover:text-black"
              size={22}
              onClick={onClose}
            />
            <div>
              <h2 className="text-xl font-semibold text-black">
                {task?.title}
              </h2>
              <div className="flex items-center text-sm mt-2 gap-4">
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle size={16} /> Payment Verified
                </span>
                <span className="flex text-yellow-500">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                  <Star size={14} strokeWidth={1.5} />
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500 font-semibold text-left">
            <div className="flex gap-6 items-center">
              Job Posted
              <Heart
                size={20}
                className="text-white p-1 fill-white cursor-pointer bg-blue-500 rounded-full"
              />
            </div>
            <div className="text-xs text-gray-400">
              Posted {getDaysAgo(task?.createdAt)}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-4" />

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin size={16} />
          {task?.address
            ? `${task.address.addressLine1}, ${task.address.street}, ${task.address.city}, ${task.address.state}, ${task.address.country}`
            : "No address"}
        </div>

        <div className="text-sm mb-4 text-gray-500">
          <span className="font-bold text-gray-500">Budget :- </span>
          <span className="text-blue-500 text-lg">
            ${task?.estimatedAmount?.toLocaleString()}
          </span>{" "}
          <span className="text-gray-500">(Proposals Less than 8)</span>
        </div>

        <div>
          <div className="font-semibold text-gray-700 mb-1 text-sm">Task ID</div>
          <div className="text-gray-700 text-sm">{task?.id}</div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm mt-4">
          <div>
            <div className="font-semibold text-gray-700 mb-1">Priority</div>
            <div className="text-gray-700">{task?.priority}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">Status</div>
            <div className="text-gray-700">{task?.status}</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="font-semibold text-sm text-gray-700 mb-1">
            Task Description
          </div>
          <p className="text-sm text-gray-600">{task?.description}</p>
        </div>

        <div className="mt-6">
          <div className="font-semibold text-sm text-gray-700 mb-2">
            Preferred Qualifications
          </div>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex">
              <Check className="w-4 h-4 text-white bg-green-500 mr-2" /> Entry level experience preferred
            </li>
            <li className="flex">
              <Check className="w-4 h-4 text-white bg-green-500 mr-2" /> Remote work allowed
            </li>
            <li className="flex">
              <Check className="w-4 h-4 text-white bg-green-500 mr-2" /> English communication skills
            </li>
          </ul>
        </div>

        <div className="mt-1">
          <div className="text-sm text-gray-500 mb-1">Budget Comment</div>
          <div className="text-sm text-gray-500">
            {task?.budgetComment || "No additional details provided."}
          </div>
        </div>

        {task?.media?.length > 0 && (
          <div className="mt-6">
            <div className="font-semibold text-sm text-gray-700 mb-2">Media</div>
            <div className="flex gap-4 flex-wrap">
              {task.media.map((url: string, idx: number) => (
                <div
                  key={idx}
                  className="w-32 h-32 rounded-xl overflow-hidden shadow-md relative"
                >
                  <Image
                    src={imgUrl + url}
                    alt="Task Media"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        {task && (
          <div className="mt-6">
            {!task.isMine ? (
              <button
                onClick={() => setShowApplyOverlay(true)}
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Apply Now
              </button>
            ) : (
              <button
                onClick={() => router.push(`/bids?taskId=${task.id}`)}
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
              >
                View Bids
              </button>
            )}
          </div>
        )}
      </div>

      {showApplyOverlay && (
        <JobApplicationOverlay taskId={task?.id} onClose={() => setShowApplyOverlay(false)} />
      )}
    </div>
  );
}
