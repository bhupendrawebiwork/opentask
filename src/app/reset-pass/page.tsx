"use client";
import { Lock } from "lucide-react";
import Image from "next/image";


export default function SignUp() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-4xl shadow-lg overflow-hidden max-w-5xl w-full h-170"
      style={{
          backgroundImage: "linear-gradient(to bottom right, #2778E0, #6BE353)",
        }}>
        {/* Left Section */}
        <div
          className="text-white p-10 flex-1 flex flex-col justify-center items-center space-y-3"
        >
          <h2 className="text-3xl font-bold text-left leading-tight">
            Reset Password
          </h2>
          <p className="text-center mb-6 px-4">Set a new password to regain access to your account.</p>
          <Image
            src="/assets/reset.png"
            alt="reset Illustration"
            width={250}
            height={250}
          />
        </div>

        {/* Right Section */}
        <div className="flex-1/9 p-8 sm:py-55 rounded-4xl bg-white">
         
          <form className="space-y-6">
            
            <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block"> Password</label>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            />
          </div>
        </div>

        <div className="mb-12">
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            />
          </div>
        </div>
            <a href="#" className=" py-3 px-42 bg-blue-400 mb-5 rounded-xl text-white hover:bg-blue-600 transition">
             Update Password
            </a>
          </form>
        </div>
      </div>
    </main>
  );
}
