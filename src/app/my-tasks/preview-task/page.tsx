"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Image from "next/image";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { baseUrl } from "@/config/constent";
import { Task } from "@/types/types";
import { useTaskStore } from "@/store/useTaskStore";

export default function PostTaskPage() {
  const { taskData, submitTask } = useTaskStore();
  const router = useRouter();

  const address = (taskData.location as Task["location"]) || {};

  const handleSubmit = async () => {
    const formData = new FormData();
    // Append primitive fields
    formData.append("title", taskData.title || "");
    formData.append("description", taskData.description || "");
    formData.append(
      "estimateBudget",
      taskData.estimateBudget?.toString() || ""
    );
    formData.append("deadline", taskData.deadline || "");
    formData.append("note", taskData.note || "");

    // Append address fields

    formData.append("location[addressLine1]", address.addressLine1 || "");
    formData.append("location[addressLine2]", address.addressLine2 || "");
    formData.append("location[home]", address.home || "");
    formData.append("location[street]", address.street || "");
    formData.append("location[state]", address.state || "");
    formData.append("location[city]", address.city || "");
    formData.append("location[country]", address.country || "");
    formData.append("location[phone]", address.phone || "");

    // Append media files
    if (Array.isArray(taskData.media)) {
      taskData.media.forEach((item) => {
        if (item?.file instanceof File) {
          formData.append("media", item.file); // multiple files with same key
        }
      });
    }

    const res = await submitTask(formData);
    console.log("res -- ", res);

    if (res.status == 201) {
      router.push("/my-tasks");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <Navbar /> */}
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-10 bg-[#F7F5F8]">
          <h1 className="text-xl font-bold mb-4 text-black ml-10">Post Task</h1>

          <div className="bg-white rounded-xl px-10 py-8 mx-10 space-y-10">
            {/* Task Details */}
            <section>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-black">
                  Task Details
                </h2>
                <a href="#">
                  <Pen className="w-8 h-8 p-2 bg-black rounded-full text-white" />
                </a>
              </div>
              <p className="text-gray-800 text-sm font-semibold">Title</p>
              <p className="text-sm mb-3">{taskData.title}</p>

              <p className="text-gray-800 text-sm font-semibold">Description</p>
              <p className="text-sm mb-3">{taskData.description}</p>

              {taskData.note && (
                <p className="bg-gray-100 text-sm p-3 rounded-md text-gray-700">
                  {taskData.note}
                </p>
              )}
            </section>

            <hr />

            {/* Location */}
            <section>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-black">Location</h2>
                <a href="#">
                  <Pen className="w-8 h-8 p-2 bg-black rounded-full text-white" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-semibold text-black">Type:</span>
                    <br />
                    In Person
                  </p>

                  <h6 className="mt-2 font-semibold text-black">Address:</h6>
                  <div className="grid grid-cols-2 mt-2">
                    <p className="text-gray-500">
                      <span className="font-semibold">Street:</span>{" "}
                      {address.street}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-semibold">City:</span>{" "}
                      {address.city}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-semibold">Country:</span>{" "}
                      {address.country}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-semibold">State:</span>{" "}
                      {address.state}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-semibold">Phone:</span>{" "}
                      {address.phone}
                    </p>
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
                <h2 className="text-lg font-semibold text-black">
                  Estimated budget & completion date
                </h2>
                <a href="#">
                  <Pen className="w-8 h-8 p-2 bg-black rounded-full text-white" />
                </a>
              </div>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-semibold text-black">Budget:</span>
                </p>
                <p className="mb-4"> ₹{taskData.estimateBudget}</p>
                <p>
                  <span className="font-semibold text-black">
                    Completion Date:
                  </span>
                </p>
                <p>{taskData.deadline}</p>
              </div>
            </section>

            <hr />

            {/* Media */}
            <section>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-black">Media</h2>
                <a href="#">
                  <Pen className="w-8 h-8 p-2 bg-black rounded-full text-white" />
                </a>
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
