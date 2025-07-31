"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/common/Taskcard";
import TaskDetailsOverlay from "@/components/common/TaskDetailsOverlay";
import { Task } from "@/types/types";
import { useTaskStore } from "@/store/useTaskStore";

export default function HomePage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [sortByPrice, setSortByPrice] = useState<string>(""); // "high" | "low" | "mid"
  const [sortByTime, setSortByTime] = useState<string>(""); // "newest" | "1day" | "2days"
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]); // 1-5

  const { fetchTasks, tasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleClickOnTask = (task: Task) => {
    setShowOverlay(true);
    setCurrentTask({ ...task, isMine: false });
  };

  // Filtering
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
      const matchesRating = selectedRatings.length
        ? selectedRatings.includes(Math.floor(task.rating || 0))
        : true;

      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      // Price sort (mutually exclusive)
      if (sortByPrice) {
        if (sortByPrice === "high") return b.price - a.price;
        if (sortByPrice === "low") return a.price - b.price;
        if (sortByPrice === "mid") return Math.abs(a.price - 500) - Math.abs(b.price - 500);
      }

      // Time sort
      if (sortByTime) {
        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();
        if (sortByTime === "newest") return bTime - aTime;
        if (sortByTime === "1day")
          return (new Date().getTime() - bTime) - (new Date().getTime() - aTime);
        if (sortByTime === "2days")
          return (new Date().getTime() - bTime) - (new Date().getTime() - aTime);
      }
      return 0;
    });

  // Toggle for mutual exclusivity between Price and Time sort
  const handlePriceSortChange = (value: string) => {
    setSortByPrice(value);
    setSortByTime(""); // Reset time sort
  };

  const handleTimeSortChange = (value: string) => {
    setSortByTime(value);
    setSortByPrice(""); // Reset price sort
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="bg-[#F7F5F8] h-[calc(100vh-64px)] flex overflow-hidden">
        {/* Sidebar Filters */}
        <aside className="w-[300px] p-6 bg-white border-r border-gray-200 h-full overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>

          {/* Search */}
          <input
            type="text"
            placeholder="Search Task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6"
          />

          {/* Sort by Price */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Sort by Price</h4>
            {["high", "low", "mid"].map((value) => (
              <label key={value} className="flex items-center space-x-2 text-sm mb-2">
                <input
                  type="radio"
                  name="priceSort"
                  checked={sortByPrice === value}
                  onChange={() => handlePriceSortChange(value)}
                />
                <span>
                  {value === "high" && "High → Low"}
                  {value === "low" && "Low → High"}
                  {value === "mid" && "Mid Price"}
                </span>
              </label>
            ))}
          </div>

          {/* Sort by Time */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Sort by Time</h4>
            {["newest", "1day", "2days"].map((value) => (
              <label key={value} className="flex items-center space-x-2 text-sm mb-2">
                <input
                  type="radio"
                  name="timeSort"
                  checked={sortByTime === value}
                  onChange={() => handleTimeSortChange(value)}
                />
                <span>
                  {value === "newest" && "Newest"}
                  {value === "1day" && "1 Day Ago"}
                  {value === "2days" && "2 Days Ago"}
                </span>
              </label>
            ))}
          </div>

          {/* Filter by Ratings */}
          <div>
            <h4 className="font-semibold mb-2">Filter by Rating</h4>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 text-sm mb-2">
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => toggleRating(rating)}
                />
                <span>{rating} Star{rating > 1 && "s"}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Scrollable Task List */}
        <main className="flex-1 p-8 overflow-y-auto h-full">
          <h1 className="text-2xl font-bold mb-6 text-black">Browse Tasks</h1>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task: Task, i) => (
              <TaskCard key={i} task={task} onClick={() => handleClickOnTask(task)} />
            ))
          ) : (
            <p className="text-gray-500">No tasks found</p>
          )}
        </main>
      </div>

      {showOverlay && currentTask && (
        <TaskDetailsOverlay task={currentTask} onClose={() => setShowOverlay(false)} />
      )}
    </div>
  );
}
