"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/common/Taskcard";
import TaskDetailsOverlay from "@/components/common/TaskDetailsOverlay";
import { Task } from "@/types/types";
import { useTaskStore } from "@/store/useTaskStore";

export default function HomePage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const { fetchTasks, tasks, loading } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleClickOnTask = (taskData: Task) => {
    setShowOverlay(true);
    setCurrentTask(taskData);
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
        <TaskDetailsOverlay
          task={currentTask}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
}

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from "next/link"
// import { Users, Briefcase, Shield, MapPin, Clock, DollarSign } from "lucide-react"

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Hero Section */}
//       <section className="container mx-auto px-4 py-16 text-center">
//         <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Connect. Create. Complete.</h2>
//         <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//           The ultimate platform connecting clients with skilled service providers. Post tasks, find experts, and get
//           things done efficiently.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
//             <Link href="/auth/register?role=client">I Need Services</Link>
//           </Button>
//           <Button asChild variant="outline" size="lg">
//             <Link href="/auth/register?role=provider">I Provide Services</Link>
//           </Button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="container mx-auto px-4 py-16">
//         <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
//         <div className="grid md:grid-cols-3 gap-8">
//           <Card className="text-center">
//             <CardHeader>
//               <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
//               <CardTitle>For Clients</CardTitle>
//               <CardDescription>Post tasks with voice or text input</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ul className="text-sm text-gray-600 space-y-2">
//                 <li className="flex items-center">
//                   <MapPin className="h-4 w-4 mr-2" />
//                   Set location
//                 </li>
//                 <li className="flex items-center">
//                   <Clock className="h-4 w-4 mr-2" />
//                   Schedule timing
//                 </li>
//                 <li className="flex items-center">
//                   <DollarSign className="h-4 w-4 mr-2" />
//                   Set budget
//                 </li>
//               </ul>
//             </CardContent>
//           </Card>

//           <Card className="text-center">
//             <CardHeader>
//               <Briefcase className="h-12 w-12 text-green-600 mx-auto mb-4" />
//               <CardTitle>For Service Providers</CardTitle>
//               <CardDescription>Find and bid on relevant tasks</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ul className="text-sm text-gray-600 space-y-2">
//                 <li>Browse available tasks</li>
//                 <li>Submit competitive bids</li>
//                 <li>Build your reputation</li>
//               </ul>
//             </CardContent>
//           </Card>

//           <Card className="text-center">
//             <CardHeader>
//               <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
//               <CardTitle>Admin Control</CardTitle>
//               <CardDescription>Manage platform and users</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ul className="text-sm text-gray-600 space-y-2">
//                 <li>User management</li>
//                 <li>Task moderation</li>
//                 <li>Platform analytics</li>
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </section>
//     </div>
//   )
// }
