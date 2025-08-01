"use client";

import { useEffect, useState } from "react";
import MyBidCard from "@/components/common/MyBidCard";
import { useBidStore } from "@/store/useBidStore";
import { useSearchParams } from "next/navigation";
import BidStatusCard from "@/components/common/BidStatusCard";
import BidEditOverlay from "@/components/common/BidEditOverlay";

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

  const [selectedBid, setSelectedBid] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredBids = dummyBids
    .filter((bid) =>
      statusFilter === "All" ? true : bid.status === statusFilter
    )
    .filter((bid) =>
      bid.taskTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex bg-[#f3f3e0] h-screen overflow-hidden">
      {/* Sidebar Filter */}
      <aside className="w-[300px] p-6 overflow-y-auto sticky top-0 h-screen bg-white border-r border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Task..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category */}
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="development">Development</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="ai">AI/ML</option>
        </select>

        {/* Experience Level */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Experience Level</h4>
          {["Entry", "Intermediate", "Expert"].map((level) => (
            <label
              key={level}
              className="flex items-center space-x-2 text-sm mb-2 cursor-pointer"
            >
              <input
                type="radio"
                name="experience"
                value={level}
                checked={experienceLevel === level}
                onChange={() => setExperienceLevel(level)}
              />
              <span>{level}</span>
            </label>
          ))}
        </div>

        {/* Budget Range */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Budget Range</h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="$ min"
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm"
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
            />
            <input
              type="number"
              placeholder="$ max"
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Sort By</h4>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="latest">Latest First</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Status</h4>
          {["All", "Pending", "Accepted"].map((status) => (
            <label
              key={status}
              className="flex items-center space-x-2 text-sm mb-2 cursor-pointer"
            >
              <input
                type="radio"
                name="status"
                value={status}
                checked={statusFilter === status}
                onChange={() => setStatusFilter(status)}
              />
              <span>{status}</span>
            </label>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {title ? `Bids on ${title}` : "All Bids"}
        </h1>
        
        <div className="flex flex-col gap-4">
          {bids.map((bid) => (
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
