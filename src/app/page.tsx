// src/app/page.tsx
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
//       <h1 className="text-4xl font-bold mb-6">Welcome to OpenTask</h1>
//       <div className="space-x-4">
//         <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md">Sign Up</Link>
//         <Link href="/signin" className="px-4 py-2 bg-green-600 text-white rounded-md">Sign In</Link>
//         <Link href="/task-details" className="px-4 py-2 bg-green-600 text-white rounded-md">Post Task</Link>
//         <Link href="/chatpage" className="px-4 py-2 bg-pink-400 text-white rounded-md">Chat</Link>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/Taskcard";
import TaskDetailsOverlay from "@/components/TaskDetailsOverlay";
import { baseUrl } from "@/config/constent";
import { Task } from "@/types/types";

export default function HomePage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({});
  const [loading, setLoading] = useState(true);
  console.log({ tasks });
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("authToken");

const res = await fetch(baseUrl + "/tasks/public", {
  headers: {
    ...(token && { Authorization: `Bearer ${token}` }),
    'ngrok-skip-browser-warning': 'true'
  },
});


        const resjson = await res.json(); // debug response
        try {
          if (!res.ok)
            throw new Error(resjson.message || "Failed to load tasks");
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

  const handleClickOnTask = (taskData: Task) => {
    setShowOverlay(true);
    setCurrentTask(taskData)
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* {/* <Navbar /> */} 

      <div className="bg-[#F7F5F8] min-h-screen flex justify-center">
        {/* Left Sidebar */}
        <aside className="w-[300px] p-6" style={{ backgroundColor: "#F7F5F8" }}>
          <h3 className="text-lg font-semibold mb-4">Filter</h3>

          <input
            type="text"
            placeholder="Search Task.."
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
              "Expert & high Level Exp.",
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

            {/* Rate Range */}
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

        {/* Right Content */}
        <main className="flex-1 p-8">
          {tasks.map((task: Task, i) => (
            <TaskCard
              task={task}
              key={i}
              onClick={(task: Task) => handleClickOnTask(task)}
            />
          ))}
        </main>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <TaskDetailsOverlay task={currentTask} onClose={() => setShowOverlay(false)} />
      )}
    </div>
  );
}

