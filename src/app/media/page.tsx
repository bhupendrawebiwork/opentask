"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import Image from "next/image";

export default function PostTaskPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-10 bg-[#F7F5F8]">
          <h1 className="text-xl font-bold mb-4 text-black ml-10">Post Task</h1>

          <div className="bg-white rounded-xl px-10 py-8 mx-10">
           
            <h2 className="text-md font-semibold text-black mb-6">Media</h2>

            
            <div className="border border-gray-300 rounded-xl flex flex-col items-center justify-center py-16 mb-10">
              <Image
                src="/assets/upload.png" 
                alt="Icon"
                width={116}
                height={116}
              />
              <p className="text-center text-black text-lg font-semibold mt-4">
                Upload images and videos for your task clarification.
              </p>
            </div>

            {/* Media Thumbnails */}
            <div className="grid grid-cols-6 gap-0 mb-12">
              {[1, 2, 3, 4].map((item, index) => (
                <div key={index} className="relative">
                  <Image
                    src="/assets/img.png" 
                    alt={`Media ${index + 1}`}
                    width={200}
                    height={150}
                    className="rounded-lg object-cover"
                  />
                  {index === 3 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white bg-opacity-60 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Link
                href="/estimated-budget"
                className="bg-blue-100 text-gray-400 px-10 py-3 rounded-xl text-lg"
              >
                Previous
              </Link>
              <Link
                href="/preview-task"
                className="bg-blue-500 hover:bg-blue-600 text-white px-14 py-3 rounded-xl text-lg"
              >
                Preview
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
