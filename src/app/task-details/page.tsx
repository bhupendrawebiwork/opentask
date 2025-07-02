"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function PostTaskPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-10 " style={{backgroundColor:"#F7F5F8"}}>
          <h1 className="text-xl font-bold mb-2 text-black ml-10">Post Task</h1>
          <div className="bg-white rounded-xl p-10 m-10">
          <h1 className="text-xl font-semibold mb-6 text-black">Task Details</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-black font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-black font-medium mb-1">Description</label>
              <textarea
                className="w-full border border-gray-300 rounded-xl px-4 py-2 h-60 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="bg-blue-100 text-gray-900 text-sm px-4 py-2 rounded-xl ">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.
            </div>
            <div className="flex justify-between mt-25">
              <Link href="#" className="bg-blue-100 text-gray-400 px-10 py-3 rounded-xl cursor-not-allowed  text-lg"
                >
                Previous
              </Link> 
              <Link href="/location-details" className="bg-blue-400 text-white px-14 py-3 rounded-xl hover:bg-blue-600 text-lg">
                Next
                </Link>
              
            </div>
          </form>
          </div>
        </main>
      </div>
    </div>
  );
}
