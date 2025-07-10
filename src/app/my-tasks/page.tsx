"use client";

import { useEffect, useState } from "react";
import MyTasks from "@/components/MyTasks";
import Navbar from "@/components/Navbar";
import { baseUrl } from "@/config/constent";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await fetch(baseUrl + "/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const resjson = await res.json(); // debug response
        try {
         
          if (!res.ok) throw new Error(resjson.message || "Failed to load tasks");
          setTasks(resjson.data);
        } catch (err) {
          console.error("Failed to parse JSON:", resjson.error.message);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-[#F7F5F8] min-h-screen flex">
        {/* Sidebar Filters */}
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
              <label key={label} className="flex items-center space-x-2 text-sm mb-2">
                <input type="checkbox" />
                <span>{label}</span>
              </label>
            ))}
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Job Type</h4>
            {["Hourly base", "Monthly base", "Contract base"].map((label, i) => (
              <label key={label} className="flex items-center space-x-2 text-sm mb-2">
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
            {[
              "Less Than $100",
              "$100 To $500",
              "$500 To $1k",
              "$1k To $5k",
            ].map((range) => (
              <label key={range} className="flex items-center space-x-2 text-sm mb-2">
                <input type="checkbox" />
                <span>{range}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Task List */}
        <main className="flex-1 p-10">
          <h1 className="text-2xl font-bold mb-6 text-black">My Posted Tasks</h1>

          {loading ? (
            <p>Loading...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            tasks.map((task: any) => (
              <MyTasks key={task.id} task={task} />
            ))
          )}
        </main>
      </div>
    </div>
  );
}
