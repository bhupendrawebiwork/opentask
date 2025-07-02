"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useState } from "react";

export default function PostTaskPage() {
  const [isRemote, setIsRemote] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-10" style={{ backgroundColor: "#F7F5F8" }}>
          <h1 className="text-xl font-bold mb-2 text-black ml-10">Post Task</h1>
          <div className="bg-white rounded-xl p-10 m-10">
            <h1 className="text-xl font-semibold mb-6 text-black">Location</h1>
            <div className="flex justify-items-end border border-gray-400 rounded-xl overflow-hidden w-fit absolute top-46 right-23 mt-4 mr-4 z-10">

              <button
                className={`px-6 py-2 text-sm font-semibold transition-all duration-300 rounded-r-xl ${
                  !isRemote
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
                onClick={() => setIsRemote(false)}
              >
                In Person
              </button>
              <button
                className={`px-6 py-2 text-sm font-semibold transition-all duration-300 rounded-l-xl ${
                  isRemote ? "bg-blue-500 text-white" : "bg-white text-blue-400"
                }`}
                onClick={() => setIsRemote(true)}
              >
                Remote
              </button>
            </div>

            <form className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-black font-medium mb-1">
                  Address Line 1
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded-xl"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-black font-medium mb-1">
                  Address Line 2
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded-xl"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-black font-medium mb-1">
                  Home
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded-xl"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-black font-medium mb-1">
                  Street
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded-xl"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-black font-medium mb-1">
                  State/Province/Area
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded-xl"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-black font-medium mb-1">
                  City
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded-xl"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-black font-medium mb-1">
                  Phone
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded-xl"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-black font-medium mb-1">
                  Country
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded-xl"
                  type="text"
                />
              </div>
            </form>

            <div className="mt-8 rounded-xl overflow-hidden border border-gray-300">
              <iframe
                title="Google Map"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.625303392915!2d80.95857231504187!3d26.846693083158887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2ad1ad2c0cf%3A0x8d9b39f9a59e624!2sLucknow%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1593770941577!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            <div className="flex justify-between mt-10">
              <Link
                href="/task-details"
                className="bg-blue-100 text-gray-400 px-10 py-3 rounded-xl  text-lg"
              >
                Previous
              </Link>
              <Link
                href="#"
                className="bg-blue-400 text-white px-14 py-3 rounded-xl hover:bg-blue-600 text-lg"
              >
                Next
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
