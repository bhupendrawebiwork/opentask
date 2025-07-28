// app/bid-status/page.jsx (or pages/bid-status.js depending on your setup)
"use client";

import { useState } from "react";
import BidStatusCard from "@/components/common/BidStatusCard";

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

export default function BidStatusPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBids =
    statusFilter === "All"
      ? dummyBids
      : dummyBids.filter((bid) => bid.status === statusFilter);

  return (
    <div className="flex gap-6 bg-[#F4F8FF]">
      {/* Sidebar Filter */}
      <aside className="w-[300px] p-6">
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
            {["Hourly base", "Monthly base", "Contract base"].map(
              (label, i) => (
                <label
                  key={label}
                  className="flex items-center space-x-2 text-sm mb-2"
                >
                  <input type="checkbox" defaultChecked={i === 0} />
                  <span>{label}</span>
                </label>
              )
            )}

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
            {[
              "Less Than $100",
              "$100 To $500",
              "$500 To $1k",
              "$1k To $5k",
            ].map((range) => (
              <label
                key={range}
                className="flex items-center space-x-2 text-sm mb-2"
              >
                <input type="checkbox" />
                <span>{range}</span>
              </label>
            ))}
          </div>
        </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-xl font-semibold mb-6">Bids Status</h1>
        {filteredBids.map((bid) => (
          <BidStatusCard key={bid.id} bid={bid} />
        ))}
      </main>
    </div>
  );
}
