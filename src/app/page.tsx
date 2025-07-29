"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/common/Taskcard";
import TaskDetailsOverlay from "@/components/common/TaskDetailsOverlay";
import { baseUrl } from "@/config/constent";
import { Task } from "@/types/types";
import { useTaskStore } from "@/store/useTaskStore";

export default function HomePage() {
  const [showOverlay, setShowOverlay] = useState(false);
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  // const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [selectedFixedPrices, setSelectedFixedPrices] = useState<string[]>([]);

 const { fetchTasks, tasks, loading } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleClickOnTask = (task: Task) => {
  setShowOverlay(true);
  setCurrentTask({ ...task, isMine: false }); // you’re not the owner
};


  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? task?.category === selectedCategory : true;
    const matchesLevel = selectedLevels.length ? selectedLevels.includes(task?.level) : true;
    const matchesType = selectedTypes.length ? selectedTypes.includes(task?.jobType) : true;
    const matchesMinRate = minRate ? task?.rate >= parseFloat(minRate) : true;
    const matchesMaxRate = maxRate ? task?.rate <= parseFloat(maxRate) : true;

    const matchesFixedPrice = selectedFixedPrices.length
      ? selectedFixedPrices.some((range) => {
          const inrToUsd = 0.012; // Example conversion rate
          const usdPrice = task?.price * inrToUsd;
          if (range === "Less Than $100") return usdPrice < 100;
          if (range === "$100 To $500") return usdPrice >= 100 && usdPrice <= 500;
          if (range === "$500 To $1k") return usdPrice > 500 && usdPrice <= 1000;
          if (range === "$1k To $5k") return usdPrice > 1000 && usdPrice <= 5000;
          return false;
        })
      : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLevel &&
      matchesType &&
      matchesMinRate &&
      matchesMaxRate &&
      matchesFixedPrice
    );
  });

  return (
    <div className="min-h-screen bg-white relative">
      <div className="bg-[#F7F5F8] h-[calc(100vh-64px)] flex overflow-hidden">
  <aside className="w-[300px] p-6 bg-white border-r border-gray-200 h-full overflow-y-auto">
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

    {/* Levels Filter */}
    <div className="mb-4">
      <h4 className="font-semibold mb-2">Levels</h4>
      {["Entry Level", "Intermediate & Professionals", "Expert & high Level Exp."].map((label) => (
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
      ))}
    </div>

    {/* Job Type Filter */}
    <div className="mb-4">
      <h4 className="font-semibold mb-2">Job Type</h4>
      {["Hourly base", "Monthly base", "Contract base"].map((label) => (
        <label key={label} className="flex items-center space-x-2 text-sm mb-2">
          <input
            type="checkbox"
            checked={selectedTypes.includes(label)}
            onChange={() =>
              setSelectedTypes((prev) =>
                prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
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

    {/* Fixed Price Filter */}
    <div>
      <h4 className="font-semibold mb-2">Fixed Price</h4>
      {["Less Than $100", "$100 To $500", "$500 To $1k", "$1k To $5k"].map((range) => (
        <label key={range} className="flex items-center space-x-2 text-sm mb-2">
          <input
            type="checkbox"
            checked={selectedFixedPrices.includes(range)}
            onChange={() =>
              setSelectedFixedPrices((prev) =>
                prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
              )
            }
          />
          <span>{range}</span>
        </label>
      ))}
    </div>
  </aside>

  {/* Scrollable Task List */}
  <main className="flex-1 p-8 overflow-y-auto h-full">
     <h1 className="text-2xl font-bold mb-6 text-black">Browse Tasks</h1>
    {filteredTasks.map((task: Task, i) => (
      <TaskCard key={i} task={task} onClick={() => handleClickOnTask(task)} />
    ))}
  </main>
</div>


      {showOverlay && currentTask && (
        <TaskDetailsOverlay task={currentTask} onClose={() => setShowOverlay(false)} />
      )}
    </div>
  );
}

