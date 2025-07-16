"use client";

import { Mic } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SpeakYourTaskPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#EAF2FF] flex justify-center items-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md text-center relative bottom-30 ">
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[#F1F4FF] rounded-full flex items-center justify-center">
            <Mic size={46} className="text-blue-500" />
          </div>
        </div>

        
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Speak your task</h2>

       
        <div className="bg-blue-50 text-gray-600 px-6 py-4 rounded-lg text-sm mb-6">
          Your spoken task will appear here...
        </div>

       
        {/* <p className="text-gray-800 text-sm mb-4">Or type your task instead</p> */}

        
        <button
          onClick={() => router.push("/task-details")} 
          className="bg-blue-400 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
