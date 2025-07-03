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
        <main className="flex-1 p-10" style={{ backgroundColor: "#F7F5F8" }}>
          <h1 className="text-xl font-bold mb-2 text-black ml-10">Post Task</h1>
          <div className="bg-white rounded-xl p-10 m-10">
            <h1 className="text-xl font-semibold mb-6 text-black">Estimated-budget</h1>
            

            <form className="gap-6 mb-50">
                <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-black text-sm font-semibold mb-1">
                 Budget (Estimated cost offered by you)
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded-xl text-sm "
                  type="text"
                  placeholder="$4500"
                />
              </div>
              <div>
                <label className="block text-black text-sm font-semibold mb-1">
                  Expected completion date 
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded-xl text-sm"
                  type="text"
                  placeholder="Expected completion date "
                />
              </div>
              </div>
              <div>
              <label className="block text-black text-sm font-semibold mb-1">Comment for budget specifications</label>
              <textarea
                className="w-full border border-gray-300 rounded-xl px-4 py-2 h-25 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm "
                 placeholder="Comment for budget and other specifications, any special points about your work"
              />
            </div>
        
            </form>

            <div className="flex justify-between mt-10 mb-20">
              <Link
                href="/location"
                className="bg-blue-100 text-gray-400 px-10 py-3 rounded-xl text-lg"
              >
                Previous
              </Link>
              <Link
                href="/media"
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
