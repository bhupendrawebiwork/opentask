"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { Pen } from "lucide-react";
import { useTaskContext } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostTaskPage() {
  const { taskData } = useTaskContext();
  const router = useRouter();

  const address = taskData.address as TaskData["address"] || {};

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to submit a task.");
      return;
    }

    const formData = new FormData();

    // Append primitive fields
    formData.append("title", taskData.title || "");
    formData.append("description", taskData.description || "");
    formData.append("estimatedAmount", taskData.estimatedAmount?.toString() || "");
    formData.append("expectedCompletionDate", taskData.expectedCompletionDate || "");
    formData.append("budgetComment", taskData.budgetComment || "");

    // Append address fields
    
    formData.append("address[addressLine1]", address.addressLine1 || "");
formData.append("address[addressLine2]", address.addressLine2 || "");
formData.append("address[home]", address.home || "");
formData.append("address[street]", address.street || "");
formData.append("address[state]", address.state || "");
formData.append("address[city]", address.city || "");
formData.append("address[country]", address.country || "");
formData.append("address[phone]", address.phone || "");

    // Append media files
    if (Array.isArray(taskData.media)) {
      taskData.media.forEach((item) => {
        if (item?.file instanceof File) {
          formData.append("media", item.file); // multiple files with same key
        }
      });
    }

    try {
      const response = await fetch("https://777b7ef2fa99.ngrok-free.app/api/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT SET "Content-Type" manually
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Server Error:", result);
        throw new Error(result.message || "Something went wrong");
      }

      alert("Task posted successfully!");
      router.push("/my-tasks");
    } catch (err: any) {
      console.error("Error submitting task:", err);
      alert(`Failed to post task: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-10 bg-[#F7F5F8]">
          <h1 className="text-xl font-bold mb-4 text-black ml-10">Post Task</h1>

          <div className="bg-white rounded-xl px-10 py-8 mx-10 space-y-10">

            {/* Task Details */}
            <section>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-black">Task Details</h2>
                <a href="#"><Pen className="w-8 h-8 p-2 bg-black rounded-full text-white" /></a>
              </div>
              <p className="text-gray-800 text-sm font-semibold">Title</p>
              <p className="text-sm mb-3">{taskData.title}</p>

              <p className="text-gray-800 text-sm font-semibold">Description</p>
              <p className="text-sm mb-3">{taskData.description}</p>

              {taskData.budgetComment && (
                <p className="bg-gray-100 text-sm p-3 rounded-md text-gray-700">
                  {taskData.budgetComment}
                </p>
              )}
            </section>

            <hr />

            {/* Location */}
            <section>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-black">Location</h2>
                <a href="#"><Pen className="w-8 h-8 p-2 bg-black rounded-full text-white" /></a>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1 text-sm">
                  <p><span className="font-semibold text-black">Type:</span><br />In Person</p>

                  <h6 className="mt-2 font-semibold text-black">Address:</h6>
                  <div className="grid grid-cols-2 mt-2">
                    <p className="text-gray-500"><span className="font-semibold">Street:</span> {address.street}</p>
                    <p className="text-gray-500"><span className="font-semibold">City:</span> {address.city}</p>
                    <p className="text-gray-500"><span className="font-semibold">Country:</span> {address.country}</p>
                    <p className="text-gray-500"><span className="font-semibold">State:</span> {address.state}</p>
                    <p className="text-gray-500"><span className="font-semibold">Phone:</span> {address.phone}</p>
                  </div>
                </div>

                <div>
                  <div className="rounded-xl overflow-hidden border border-gray-300 mr-10">
                    <iframe
                      title="Google Map"
                      width="100%"
                      height="250"
                      frameBorder="0"
                      style={{ border: 0 }}
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps/embed?pb=..."
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr />

            {/* Budget & Date */}
            <section>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-black">Estimated budget & completion date</h2>
                <a href="#"><Pen className="w-8 h-8 p-2 bg-black rounded-full text-white" /></a>
              </div>
              <div className="text-sm space-y-1">
                <p><span className="font-semibold text-black">Budget:</span></p>
                <p className="mb-4"> ₹{taskData.estimatedAmount}</p>
                <p><span className="font-semibold text-black">Completion Date:</span></p>
                <p>{taskData.expectedCompletionDate}</p>
              </div>
            </section>

            <hr />

            {/* Media */}
            <section>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-black">Media</h2>
                <a href="#"><Pen className="w-8 h-8 p-2 bg-black rounded-full text-white" /></a>
              </div>
              <div className="grid grid-cols-8 gap-0">
                {taskData.media?.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={file.url}
                      alt={`Media ${index + 1}`}
                      width={160}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Buttons */}
            <div className="flex justify-between pt-4">
              <Link
                href="/media"
                className="bg-blue-100 text-gray-400 px-10 py-3 rounded-xl text-lg"
              >
                Previous
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-14 py-3 rounded-xl text-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
