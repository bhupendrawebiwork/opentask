"use client";

import React, { useEffect, useState } from "react";
import TradieApplicationCard from "@/components/common/TradieProfileCard"; // Adjust if your actual path is different
import { useBidStore } from "@/store/useBidStore";
import { useSearchParams } from "next/navigation";
import { Bid } from "@/types/types";

export default function BidsPage() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const title = searchParams.get("title");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [selectedFixedPrices, setSelectedFixedPrices] = useState<string[]>([]);
  const { fetchBidsForTask, bids } = useBidStore();

  useEffect(() => {
    if (taskId) {
      fetchBidsForTask(taskId);
    }
  }, [taskId]);

  return (
    <div className="flex min-h-screen bg-[#FAFAFB]">
      {/* Sidebar Filters */}
      <aside className="w-[300px] h-screen sticky top-0 p-6 bg-[#F7F5F8] border-r border-gray-200 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Filter</h3>

        <input
          type="text"
          placeholder="Search Task.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6"
        >
          <option value="">Select Category</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
        </select>

        {/* Levels */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Levels</h4>
          {[
            "Entry Level",
            "Intermediate & Professionals",
            "Expert & high Level Exp.",
          ].map((label) => (
            <label
              key={label}
              className="flex items-center space-x-2 text-sm mb-2"
            >
              <input
                type="checkbox"
                checked={selectedLevels.includes(label)}
                onChange={() =>
                  setSelectedLevels((prev) =>
                    prev.includes(label)
                      ? prev.filter((l) => l !== label)
                      : [...prev, label]
                  )
                }
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Job Type</h4>
          {["Hourly base", "Monthly base", "Contract base"].map((label) => (
            <label
              key={label}
              className="flex items-center space-x-2 text-sm mb-2"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(label)}
                onChange={() =>
                  setSelectedTypes((prev) =>
                    prev.includes(label)
                      ? prev.filter((l) => l !== label)
                      : [...prev, label]
                  )
                }
              />
              <span>{label}</span>
            </label>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              type="number"
              placeholder="$ min"
              value={minRate}
              onChange={(e) => setMinRate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm"
            />
            <input
              type="number"
              placeholder="$ max"
              value={maxRate}
              onChange={(e) => setMaxRate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm"
            />
          </div>
        </div>

        {/* Fixed Price */}
        <div>
          <h4 className="font-semibold mb-2">Fixed Price</h4>
          {["Less Than $100", "$100 To $500", "$500 To $1k", "$1k To $5k"].map(
            (range) => (
              <label
                key={range}
                className="flex items-center space-x-2 text-sm mb-2"
              >
                <input
                  type="checkbox"
                  checked={selectedFixedPrices.includes(range)}
                  onChange={() =>
                    setSelectedFixedPrices((prev) =>
                      prev.includes(range)
                        ? prev.filter((r) => r !== range)
                        : [...prev, range]
                    )
                  }
                />
                <span>{range}</span>
              </label>
            )
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Bids on {title} 
        </h1>

        {bids.map((bid: Bid) => (
          <TradieApplicationCard
            key={bid.id}
            profileImage={"/assets/profile.png"} // Optional: Replace with dynamic if available
            name={bid.user?.name || "Unknown"}
            rating={4.5} // Static/default rating until you implement reviews
            isVerified={bid.user?.isVerified}
            email={bid.user?.email}
            contactNumber={bid.user?.phone}
            voiceNoteUrl={""} // Not in API, you can add later
            transcript={bid.comment || "No comment provided"}
            priceQuote={`₹${bid.offeredPrice}`}
            onReRecord={() => alert(`Re-record for ${bid.user?.name}`)}
          />
        ))}
      </main>
    </div>
  );
}
