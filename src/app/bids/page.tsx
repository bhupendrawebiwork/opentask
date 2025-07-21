"use client";

import React, { useState } from "react";
import TradieApplicationCard from "@/components/common/TradieProfileCard"; // Adjust if your actual path is different

const dummyApplications = [
  {
    id: 1,
    profileImage: "/assets/profile.png",
    name: "Imran Khan",
    rating: 4.8,
    isVerified: true,
    email: "imran@example.com",
    contactNumber: "+91 9876543210",
    voiceNoteUrl: "/audio/imran-application.mp3",
    transcript:
      "Namaste, Imran hoon. 10 saal se kaam kar raha hoon. Kal 11 baje aa sakta hoon.",
    priceQuote: "₹5000",
  },
  {
    id: 2,
    profileImage: "/assets/profile.png",
    name: "Sarah Leh",
    rating: 4.6,
    isVerified: true,
    email: "sarah@example.com",
    contactNumber: "+91 9876543211",
    voiceNoteUrl: "/audio/sarah-application.mp3",
    transcript:
      "Namaste, Sarah hoon. 8 saal se kaam kar rahi hoon. Kal 11 baje aa sakti hoon.",
    priceQuote: "₹1500",
  },
];

export default function BidsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [selectedFixedPrices, setSelectedFixedPrices] = useState<string[]>([]);

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
          {["Entry Level", "Intermediate & Professionals", "Expert & high Level Exp."].map(
            (label) => (
              <label key={label} className="flex items-center space-x-2 text-sm mb-2">
                <input
                  type="checkbox"
                  checked={selectedLevels.includes(label)}
                  onChange={() =>
                    setSelectedLevels((prev) =>
                      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
                    )
                  }
                />
                <span>{label}</span>
              </label>
            )
          )}
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Job Type</h4>
          {["Hourly base", "Monthly base", "Contract base"].map((label) => (
            <label key={label} className="flex items-center space-x-2 text-sm mb-2">
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
          {["Less Than $100", "$100 To $500", "$500 To $1k", "$1k To $5k"].map((range) => (
            <label key={range} className="flex items-center space-x-2 text-sm mb-2">
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
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Bids on this Task</h1>

        {dummyApplications.map((app) => (
          <TradieApplicationCard
            key={app.id}
            profileImage={app.profileImage}
            name={app.name}
            rating={app.rating}
            isVerified={app.isVerified}
            email={app.email}
            contactNumber={app.contactNumber}
            voiceNoteUrl={app.voiceNoteUrl}
            transcript={app.transcript}
            priceQuote={app.priceQuote}
            onEditTranscript={() => alert(`Edit transcript for ${app.name}`)}
            onReRecord={() => alert(`Re-record for ${app.name}`)}
          />
        ))}
      </main>
    </div>
  );
}
