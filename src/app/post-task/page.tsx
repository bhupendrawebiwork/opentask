"use client";

import { useRouter } from "next/navigation";
import { X, Mic, Keyboard } from "lucide-react";

export default function PostTaskPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F4F8FF] flex items-center justify-center relative ">
      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-xl py-20 px-10 w-full max-w-xl relative z-10 text-center bottom-38">
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          How would you like to post your task?
        </h2>
        <p className="text-gray-600 mb-8">Choose your preferred input method</p>

        <div className="flex justify-center gap-6">
          <div
            onClick={() => router.push("/voice-task")}
            className="cursor-pointer border border-gray-200 hover:border-blue-400 rounded-xl px-6 py-6 w-1/2 transition group"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="text-blue-500">
                <Mic />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Speak Your Task
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Use your voice to describe your task
              </p>
            </div>
          </div>

          
          <div
            onClick={() => router.push("/type-task")}
            className="cursor-pointer border border-gray-200 hover:border-blue-400 rounded-xl px-6 py-6 w-1/2 transition group"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="text-blue-500">
                <Keyboard />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Type Your Task
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Fill in the task form manually
              </p>
            </div>
          </div>
        </div>

        {/* <button
          onClick={() => router.back()}
          className="mt-8 text-gray-700 hover:text-black text-sm underline"
        >
          Cancel
        </button> */}
      </div>

      <div className="absolute inset-0 bg-black opacity-10 z-0" />
    </div>
  );
}
