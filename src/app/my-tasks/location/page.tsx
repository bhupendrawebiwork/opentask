"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTaskStore } from "@/store/useTaskStore";

export default function PostTaskPage() {
  const [isRemote, setIsRemote] = useState(false);
  const { taskData, setTaskData } = useTaskStore();
  const [addressLine1, setAddressLine1] = useState(
    taskData.location?.addressLine1 || ""
  );
  const [addressLine2, setAddressLine2] = useState(
    taskData.location?.addressLine2 || ""
  );
  const [home, setHome] = useState(taskData.location?.home || "");
  const [street, setStreet] = useState(taskData.location?.street || "");
  const [state, setState] = useState(taskData.location?.state || "");
  const [city, setCity] = useState(taskData.location?.city || "");
  const [country, setCountry] = useState(taskData.location?.country || "");
  const [phone, setPhone] = useState(taskData.location?.phone || "");
  const router = useRouter();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    // Save current step data to global context
    setTaskData({
      ...taskData,
      location: {
        addressLine1,
        addressLine2,
        home,
        street,
        state,
        city,
        country,
        phone,
      },
    });
    router.push("estimated-budget");
  };

  return (
    <div className="min-h-screen bg-[#f3f3e0]">
      {/* <Navbar /> */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-h-[95vh] overflow-y-auto">
          {/* <h1 className="text-xl font-bold mb-2 text-[#27548a] ml-10">Post Task</h1> */}
          <div className="bg-[#fffff8] rounded-xl p-10 m-7 ">
            <h1 className="text-xl font-semibold mb-6 text-black">Location</h1>
            <div className="flex justify-items-end border border-gray-400 rounded-xl overflow-hidden w-fit relative bottom-12 left-300 mt-4 mr-4 z-10">
              <button
                className={`px-6 py-2 text-sm font-semibold transition-all duration-300 rounded-r-xl ${
                  !isRemote
                    ? "bg-[#27548a] text-white"
                    : "bg-white text-[#27548a]"
                }`}
                onClick={() => setIsRemote(false)}
              >
                In Person
              </button>
              <button
                className={`px-6 py-2 text-sm font-semibold transition-all duration-300 rounded-l-xl ${
                  isRemote ? "bg-[#27548a] text-white" : "bg-white text-[#27548a]"
                }`}
                onClick={() => setIsRemote(true)}
              >
                Remote
              </button>
            </div>

            <form onSubmit={handleNext}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-black text-sm font-semibold mb-1">
                    Address Line 1
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-xl"
                    type="text"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-black text-sm font-semibold mb-1">
                    Address Line 2
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-xl"
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-black text-sm font-semibold mb-1">
                    Home
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-xl"
                    type="text"
                    value={home}
                    onChange={(e) => setHome(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-black text-sm font-semibold mb-1">
                    Street
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-xl"
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-black text-sm font-semibold mb-1">
                    State/Province/Area
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-xl"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-black text-sm font-semibold mb-1">
                    City
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-xl"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-black text-sm font-semibold mb-1">
                    Phone
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-xl"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-black text-sm font-semibold mb-1">
                    Country
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-xl"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-8 rounded-xl overflow-hidden border border-gray-300">
                <iframe
                  title="Google Map"
                  width="100%"
                  height="320"
                  frameBorder="0"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.625303392915!2d80.95857231504187!3d26.846693083158887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2ad1ad2c0cf%3A0x8d9b39f9a59e624!2sLucknow%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1593770941577!5m2!1sen!2sus"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>

              <div className="flex justify-between mt-25">
                <Link
                  href="/my-tasks/create-task"
                  className="bg-blue-100 text-gray-400 px-10 py-3 rounded-xl text-lg"
                >
                  Previous
                </Link>
                <button
                  type="submit"
                  className="bg-[#27548a] hover:bg-[#1d2834] text-white px-14 py-3 rounded-xl text-lg"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
