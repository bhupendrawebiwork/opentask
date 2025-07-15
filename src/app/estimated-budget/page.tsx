"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTaskContext } from "@/context/TaskContext";
import Link from "next/link";

export default function PostTaskPage() {
  const { taskData, setTaskData } = useTaskContext();
  const router = useRouter();

  // Initialize from context if available
  const [estimatedAmount, setEstimatedAmount] = useState<string>("");

  const [expectedCompletionDate, setExpectedCompletionDate] = useState(
    taskData.expectedCompletionDate || ""
  );
  const [budgetComment, setBudgetComment] = useState(taskData.budgetComment || "");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    setTaskData((prev) => ({
  ...prev,
  estimatedAmount: estimatedAmount ? parseFloat(estimatedAmount) : 0,
  expectedCompletionDate,
  budgetComment,
}));

    router.push("/media");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <Navbar /> */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-10" style={{ backgroundColor: "#F7F5F8" }}>
          <h1 className="text-xl font-bold mb-2 text-black ml-10">Post Task</h1>
          <div className="bg-white rounded-xl p-10 m-10">
            <h1 className="text-xl font-semibold mb-6 text-black">Estimated Budget</h1>

            <form className="gap-6 mb-50" onSubmit={handleNext}>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-black text-sm font-semibold mb-1">
                    Budget (Estimated cost offered by you)
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-xl text-sm"
                    type="number"
                    placeholder="4500"
                    value={estimatedAmount}
                    onChange={(e) => setEstimatedAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-black text-sm font-semibold mb-1">
                    Expected completion date
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-xl text-sm"
                    type="date"
                    value={expectedCompletionDate}
                    onChange={(e) => setExpectedCompletionDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-black text-sm font-semibold mb-1">
                  Comment for budget specifications
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  placeholder="Comment for budget and other specifications, any special points about your work"
                  value={budgetComment}
                  onChange={(e) => setBudgetComment(e.target.value)}
                />
              </div>

              <div className="flex justify-between mt-10 mb-20">
                <Link
                  href = "/location"
                  className="bg-blue-100 text-gray-400 px-10 py-3 rounded-xl text-lg"
                >
                  Previous
                </Link>
                <button
                  type="submit"
                  className="bg-blue-400 text-white px-14 py-3 rounded-xl hover:bg-blue-600 text-lg"
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
