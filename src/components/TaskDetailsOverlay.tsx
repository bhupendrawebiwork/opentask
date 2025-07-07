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
import JobApplicationOverlay from "./JobApplicationOverlay";
import { useState } from "react";

export default function TaskDetailsOverlay({ onClose }) {
   const [showApplyOverlay, setShowApplyOverlay] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/20  flex justify-end">
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
                Google Sheet automation AI
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
            <div className="text-xs text-gray-400">Posted 6 hours ago</div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4" />

        {/* Location and Budget */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin size={16} />
          95 Mills Street, Victoria, 3996 Inverloch city Australia
        </div>
        <div className="text-sm mb-4 text-gray-500">
          <span className="font-bold text-gray-500">Budget :-</span> Fixed Est.
          Budget <span className="text-blue-500 text-lg ">$1500.00</span>{" "}
          <span className="text-gray-500">(Proposals Less then 8)</span>
        </div>

        {/* Details */}
        <div>
          <div className="font-semibold text-gray-700 mb-1 text-sm">
            Job Title
          </div>
          <div className="text-gray-700 text-sm">UI UX Designer</div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm mt-4">
          <div>
            <div className="font-semibold text-gray-700 mb-1">
              Hours per Week
            </div>
            <div className="text-gray-700">65 hours per week</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">
              Estimated Duration
            </div>
            <div className="text-gray-700">1.5 year</div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <div className="font-semibold text-sm text-gray-700 mb-1">
            Job Description
          </div>
          <p className="text-sm text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book...
          </p>
        </div>

        {/* Qualifications */}
        <div className="mt-6">
          <div className="font-semibold text-sm text-gray-700 mb-2">
            Preferred Qualifications
          </div>
          <ul className="space-y-2 text-sm text-gray-500 ">
            <li className="flex">
              <Check className="w-4 h-4 text-white bg-green-500  mr-2" />{" "}
              [Experience Level] (Entry / Intermediate / Expert)
            </li>
            <li className="flex">
              <Check className="w-4 h-4 text-white bg-green-500  mr-2" />{" "}
              [Location Preference] (If any)
            </li>
            <li className="flex">
              <Check className="w-4 h-4 text-white bg-green-500  mr-2" />{" "}
              [Language Requirements] (If any)
            </li>
          </ul>
        </div>

        {/* Additional */}
        <div className="mt-1">
          <div className="text-sm text-gray-500 mb-1">Additional Details</div>
          <div className="text-sm text-gray-500">
            [Any extra information provided by the client]
          </div>
        </div>

        {/* Media */}
        <div className="mt-6">
          <div className="font-semibold text-sm text-gray-700 mb-2">Media</div>
          <div className="flex gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="w-32 h-32 rounded-xl overflow-hidden shadow-md relative"
              >
                <Image
                  src="/assets/img.png"
                  alt="Media"
                  fill
                  className="object-cover"
                />
                {n === 3 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11.5v5l4-2.5-4-2.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="text-right mt-10">
          {/* <button
            onClick={() => setShowApplyOverlay(true)}
            className="bg-blue-500 text-white px-14 py-3 rounded-xl"
          >
            Apply Now
          </button> */}
          <a href="#" className="bg-blue-500 text-white px-14 py-3 rounded-xl"  onClick={() => setShowApplyOverlay(true)}>Apply Now</a>
        </div>
      </div>
       {showApplyOverlay && <JobApplicationOverlay onClose={() => setShowApplyOverlay(false)} />}
    </div>
  );
}
