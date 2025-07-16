"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TypeTaskPage() {
  const [taskText, setTaskText] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskText.trim()) return;

    // console.log("Submitted task:", taskText);

    
    router.push("/task-details");
  };

  return (
    <div className="min-h-screen bg-[#EAF2FF] flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md relative bottom-32">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Type your task</h1>
        <p className="text-lg text-gray-800 mb-4">What do you need help with?</p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Need electrician to fix fan"
            className="w-full h-28 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none mb-6"
            required
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-gray-800 hover:underline text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
