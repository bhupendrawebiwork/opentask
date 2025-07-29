"use client";

import { useEffect, useState } from "react";
// import MyTasks from "@/components/MyTasks";
import TaskCard from "@/components/common/Taskcard";
import { baseUrl } from "@/config/constent";
import { Task } from "@/types/types";
import TaskDetailsOverlay from "@/components/common/TaskDetailsOverlay";
import { useTaskStore } from "@/store/useTaskStore";

export default function MyTasksPage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const { mytasks: tasks, fetchMyTasks } = useTaskStore();

  useEffect(() => {
    fetchMyTasks();
  }, [fetchMyTasks]);

 const handleClickOnTask = (task: Task) => {
  setShowOverlay(true);
  setCurrentTask({ ...task, isMine: true }); // you own this task
};


  return (
    <div className="min-h-screen bg-white">
      {/* {/* <Navbar /> */}

     <div className="bg-[#F7F5F8] h-[calc(100vh-64px)] flex overflow-hidden">
  {/* Sidebar Filters */}
  <aside className="w-[300px] p-6 bg-white border-r border-gray-200 h-full overflow-y-auto">
    <h3 className="text-lg font-semibold mb-4">Filter</h3>
    <input
      type="text"
      placeholder="Search Task..."
      className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
    />
    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6">
      <option>Select Category</option>
    </select>

    {/* Levels */}
    <div className="mb-4">
      <h4 className="font-semibold mb-2">Levels</h4>
      {["Entry Level", "Intermediate & Professionals", "Expert & High Level Exp."].map(label => (
        <label key={label} className="flex items-center space-x-2 text-sm mb-2">
          <input type="checkbox" />
          <span>{label}</span>
        </label>
      ))}
    </div>

    {/* Job Type */}
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

    {/* Fixed Price */}
    <div>
      <h4 className="font-semibold mb-2">Fixed Price</h4>
      {["Less Than $100", "$100 To $500", "$500 To $1k", "$1k To $5k"].map(range => (
        <label key={range} className="flex items-center space-x-2 text-sm mb-2">
          <input type="checkbox" />
          <span>{range}</span>
        </label>
      ))}
    </div>
  </aside>

  {/* Scrollable Task List */}
  <main className="flex-1 p-10 overflow-y-auto h-full">
    <h1 className="text-2xl font-bold mb-6 text-black">My Posted Tasks</h1>

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
        <TaskDetailsOverlay
          task={currentTask}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
}
