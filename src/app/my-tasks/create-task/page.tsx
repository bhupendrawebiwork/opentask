"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useTaskStore } from "@/store/useTaskStore";
import { Task } from "@/types/types";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostTaskPage() {
  const { taskData, setTaskData } = useTaskStore();
  const [title, setTitle] = useState(taskData.title || "");
  const [description, setDescription] = useState(taskData.description || "");
  const router = useRouter();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    // Save current step data to global context
    setTaskData({
      ...taskData,
      title,
      description,
    });
    router.push("location");
  };

  return (
    <div className="min-h-screen bg-[#f3f3e0]">
      {/* <Navbar /> */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-h-[95vh] overflow-y-auto">
          {/* <h1 className="text-xl font-bold mb-2 text-[#27548a] ml-10">Post Task</h1> */}
          <div className="bg-[#fffff8] rounded-xl p-10 m-7">
            <h1 className="text-xl font-semibold mb-6 text-black">
              Task Details
            </h1>
            <form className="space-y-4" onSubmit={handleNext}>
              <div>
                <label className="block text-black text-sm font-semibold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-black text-sm font-semibold mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 h-60 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="bg-blue-100 text-gray-900 text-sm px-4 py-2 rounded-xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry’s standard.
              </div>
              <div className="flex justify-between mt-25">
                <button
                  type="button"
                  className="bg-blue-100 text-gray-400 px-10 py-3 rounded-xl cursor-not-allowed text-lg"
                  disabled
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-[#27548a] text-white px-14 py-3 rounded-xl hover:bg-[#1d2834] text-lg"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
