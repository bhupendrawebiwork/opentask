"use client";

import { useEffect, useState } from "react";
import MyBidCard from "@/components/common/MyBidCard";
import { useBidStore } from "@/store/useBidStore";
import { useSearchParams } from "next/navigation";

const dummyBids = [
  {
    id: 1,
    user: {
      name: "John Deo",
      image: "/tasker-img.png",
      location: "New York",
      isVerified: true,
    },
    taskTitle: "Google Sheet automation AI",
    taskDescription:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua?",
    yourPrice: 350,
    clientPrice: 400,
    status: "Pending",
  },
  {
    id: 2,
    user: {
      name: "Emily Stone",
      image: "/tasker-img.png",
      location: "San Francisco",
      isVerified: false,
    },
    taskTitle: "Fix React Tailwind UI",
    taskDescription:
      "Need a developer to fix layout responsiveness on mobile and tablet views.",
    yourPrice: 250,
    clientPrice: 300,
    status: "Accepted",
  },
  // Add more dummy bids if needed
];

export default function BidStatusPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const title = searchParams.get("title");

  const { fetchBidsForTask, bids } = useBidStore();

  useEffect(() => {
    if (taskId) {
      fetchBidsForTask(taskId);
    }
  }, [taskId]);


  const filteredBids =
    statusFilter === "All"
      ? dummyBids
      : dummyBids.filter((bid) => bid.status === statusFilter);

  return (
    <div className="flex bg-[#F4F8FF] h-screen overflow-hidden">
      {/* Sidebar Filter */}
      <aside className="w-[300px] p-6 sticky top-0 h-screen overflow-y-auto bg-white shadow-md">
        <h3 className="text-lg font-semibold mb-4">Filter</h3>

        <input
          type="text"
          placeholder="Search Task..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <select className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6">
          <option>Select Category</option>
        </select>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Levels</h4>
          {[
            "Entry Level",
            "Intermediate & Professionals",
            "Expert & High Level Exp.",
          ].map((label) => (
            <label
              key={label}
              className="flex items-center space-x-2 text-sm mb-2"
            >
              <input type="checkbox" />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Job Type</h4>
          {["Hourly base", "Monthly base", "Contract base"].map((label, i) => (
            <label
              key={label}
              className="flex items-center space-x-2 text-sm mb-2"
            >
              <input type="checkbox" defaultChecked={i === 0} />
              <span>{label}</span>
            </label>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              type="number"
              placeholder="$ min"
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm"
            />
            <input
              type="number"
              placeholder="$ max"
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm"
            />
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Fixed Price</h4>
          {["Less Than $100", "$100 To $500", "$500 To $1k", "$1k To $5k"].map(
            (range) => (
              <label
                key={range}
                className="flex items-center space-x-2 text-sm mb-2"
              >
                <input type="checkbox" />
                <span>{range}</span>
              </label>
            )
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {title ? `Bids on ${title}` : "All Bids"}
        </h1>
        <div className="space-y-4 pb-20">
          {bids.map((bid) => (
            <MyBidCard key={bid.id} bid={bid} />
          ))}
        </div>
      </main>
    </div>
  );
}
