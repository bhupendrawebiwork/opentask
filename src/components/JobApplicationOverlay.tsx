"use client";
import {
  CheckCircle,
  Star,
  Heart,
  ArrowLeft,
} from "lucide-react";
// import { useState } from "react";

export default function JobApplicationOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 z-60 bg-black/30 flex justify-end">
      <div className="w-full max-w-xl bg-white h-full p-6 overflow-y-auto rounded-l-3xl shadow-2xl">
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

          <div className="text-sm text-gray-500  text-left mt-2">
            <div className="text-xs text-gray-400 flex gap-6">Posted 6 hours ago
                 <Heart
                size={20}
                className="text-white p-1 fill-white cursor-pointer bg-blue-500 rounded-full"
              />
              </div>
          </div>
        </div>
        <div className="border-t border-gray-200 my-4" />
        <div className="flex justify-between items-center mb-8 mt-8">
          <h2 className="text-2xl font-semibold text-black">Apply for job</h2>
        </div>

        <form className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-700">
              Budget (Estimated cost offered by you)
            </label>
            <input
              type="text"
              placeholder="Budget"
              className="w-full text-sm mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Select Cost Type</label>
            <select className="w-full mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none text-sm text-gray-500">
              <option>Select Cost Type</option>
              <option>Hourly</option>
              <option>Fixed</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Expected completion date</label>
            <input
              type="date"
              className="w-full mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none text-sm text-gray-500"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">
              Comment for budget specifications
            </label>
            <textarea
              rows={12}
              className="w-full mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none resize-none text-sm text-gray-500"
              placeholder="Comment for budget and other specifications"
            ></textarea>
          </div>

          <div className="pt-4 text-right">
            <button
              type="submit"
              className="w-full bg-blue-400 text-white px-8 py-3 rounded-xl hover:bg-blue-600 transition font-semibold"
            >
              Apply Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
