"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname().toString();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="flex justify-between items-center px-16 py-4 bg-white shadow-sm border-b border-gray-200 pb-2">
      <div className="text-2xl font-bold text-green-600">
       <Link href="/"> <Image src="/assets/main logo.png" alt="Logo" width={80} height={0}  /></Link>
      </div>

      <ul className="flex gap-6 items-center text-black font-medium">
        {isLoggedIn ? (
          <>
            {/* Browse Tasks (only for logged-in users) */}
            <li>
              <Link
                href="/"
                className={`pb-2 ${
                  pathname === "/" ? "border-b-2 border-blue-500 text-black" : "hover:text-blue-500"
                }`}
              >
                Browse Tasks
              </Link>
            </li>

            {/* My Tasks */}
            <li>
              <Link
                href="/my-tasks"
                className={`pb-2 ${
                  pathname === "/my-tasks" ? "border-b-2 border-blue-500 text-black" : "hover:text-blue-500"
                }`}
              >
                My Tasks
              </Link>
            </li>

            {/* Message */}
            <li>
              <Link
                href="/message"
                className={`pb-2 ${
                  pathname === "/message" ? "border-b-2 border-blue-500 text-black" : "hover:text-blue-500"
                }`}
              >
                Message
              </Link>
            </li>

            {/* Save Jobs */}
            <li>
              <Link
                href="/saved-jobs"
                className={`pb-2 ${
                  pathname === "/saved-jobs" ? "border-b-2 border-blue-500 text-black" : "hover:text-blue-500"
                }`}
              >
                Save Jobs
              </Link>
            </li>

            {/* Post Task */}
            <li>
              <Link
                href="/task-details"
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800"
              >
                Post Task
              </Link>
            </li>

            {/* Profile */}
            <li>
              <Link href="/profile" className="flex items-center gap-2">
                <Image
                  src="/assets/social-icons/profile.png"
                  alt="Profile"
                  width={40}
                  height={40}
                />
                Post User
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* Sign In */}
            <li>
              <Link
                href="/signin"
                className={`pb-2 font-bold text-gray-700 ${
                  pathname === "/signin" ? "border-b-2 border-blue-500  " : "hover:text-blue-500"
                }`}
              >
                Sign In
              </Link>
            </li>

            {/* Sign Up */}
            <li>
              <Link
                href="/signup"
                className={`pb-2  font-bold text-gray-700 ${
                  pathname === "/signup" ? "border-b-2 border-blue-500" : "hover:text-blue-500"
                }`}
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
