"use client";

import { useEffect, useState } from "react";
import BidStatusCard from "@/components/common/BidStatusCard";
import BidEditOverlay from "@/components/common/BidEditOverlay";
import { useAuthStore } from "@/store/useAuthStore";
import { useBidStore } from "@/store/useBidStore";

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
];

export default function MyBidsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBid, setSelectedBid] = useState(null);
  const { myBids, fetchBidsForUser } = useBidStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      fetchBidsForUser(authUser?.id);
    }
  }, []);

  const filteredBids =
    statusFilter === "All"
      ? myBids
      : myBids?.filter((bid) => bid.status === statusFilter);

  return (
    <div className="flex bg-[#f3f3e0] h-screen overflow-hidden">
      {/* Sidebar Filter */}
      <aside className="w-[260px] p-5 bg-[#fffdf2]   sticky top-0 overflow-y-auto rounded-2xl h-[800px] shadow-sm m-6">
        <h3 className="text-lg font-semibold mb-5 text-[#27548a]">Filter</h3>

        {/* Search Task */}
        <input
          type="text"
          placeholder="Search Task..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-5 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Category */}
        <select className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:ring-2 focus:ring-blue-400 outline-none text-gray-600">
          <option>Select Category</option>
          <option>Web Development</option>
          <option>Design</option>
          <option>Marketing</option>
        </select>

        {/* Levels */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-[#27548a]">Levels</h4>
          {[
            "Entry Level",
            "Intermediate & Professionals",
            "Expert & High Level Exp.",
          ].map((label, idx) => (
            <label
              key={idx}
              className="flex items-center space-x-2 text-sm mb-3 cursor-pointer"
            >
              <input
                type="checkbox"
                defaultChecked={label === "Entry Level"}
                className="accent-[#27548a] w-4 h-4"
              />
              <span
                className={
                  label === "Entry Level"
                    ? "text-[#27548a] font-medium"
                    : "text-gray-700"
                }
              >
                {label}
              </span>
            </label>
          ))}
        </div>

        {/* Job Type */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-[#27548a]">Job Type</h4>
          {["Hourly base", "Monthly base", "Contract base"].map(
            (label, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-2 text-sm mb-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="jobType"
                  defaultChecked={label === "Monthly base"}
                  className="accent-[#27548a] w-4 h-4"
                />
                <span
                  className={
                    label === "Monthly base"
                      ? "text-[#27548a] font-medium"
                      : "text-gray-700"
                  }
                >
                  {label}
                </span>
              </label>
            )
          )}
        </div>

        {/* Fixed Price */}
        <div>
          <h4 className="font-semibold mb-3 text-[#27548a]">Fixed Price</h4>
          {["Less Than $100", "$100 To $500", "$500 To $1k", "$1k To $5k"].map(
            (label, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-2 text-sm mb-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  defaultChecked={label === "$500 To $1k"}
                  className="accent-[#27548a] w-4 h-4"
                />
                <span
                  className={
                    label === "$500 To $1k"
                      ? "text-[#27548a] font-medium"
                      : "text-gray-700"
                  }
                >
                  {label}
                </span>
              </label>
            )
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold mb-6 text-[#27548a]">My Bids</h1>
        <div className="flex flex-col gap-4">
          {filteredBids.map((bid) => (
            <BidStatusCard
              key={bid.id}
              bid={bid}
              onClick={() => setSelectedBid(bid)}
            />
          ))}
        </div>
      </main>

      {/* Overlay */}
      {selectedBid && (
        <BidEditOverlay
          bid={selectedBid}
          onClose={() => setSelectedBid(null)}
        />
      )}
    </div>
  );
}
