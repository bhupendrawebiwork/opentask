"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { baseUrl } from "@/config/constent";

const Navbar = () => {
  const pathname = usePathname().toString();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    setIsLoggedIn(true);

    fetch(baseUrl + "/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.name) setUserName(data.name);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  return (
    <nav className="flex justify-between items-center px-16 py-4 bg-white shadow-sm border-b border-gray-200 pb-2">
      <div className="text-2xl font-bold text-green-600">
        <Link href="/">
          <Image src="/assets/main logo.png" alt="Logo" width={80} height={0} />
        </Link>
      </div>

      <ul className="flex gap-6 items-center text-gray-700 font-semibold">
        {isLoggedIn ? (
          <>
            <li>
              <Link
                href="/"
                className={`pb-2 ${
                  pathname === "/" ? "border-b-2 border-blue-500 " : "hover:text-blue-500"
                }`}
              >
                Browse Tasks
              </Link>
            </li>

            <li>
              <Link
                href="/my-tasks"
                className={`pb-2 ${
                  pathname === "/my-tasks" ? "border-b-2 border-blue-500 " : "hover:text-blue-500"
                }`}
              >
                My Tasks
              </Link>
            </li>

            <li>
              <Link
                href="/message"
                className={`pb-2 ${
                  pathname === "/message" ? "border-b-2 border-blue-500 " : "hover:text-blue-500"
                }`}
              >
                Message
              </Link>
            </li>

            <li>
              <Link
                href="/saved-jobs"
                className={`pb-2 ${
                  pathname === "/saved-jobs" ? "border-b-2 border-blue-500 " : "hover:text-blue-500"
                }`}
              >
                Save Jobs
              </Link>
            </li>

            <li>
              <Link
                href="/post-task"
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800"
              >
                Post Task
              </Link>
            </li>

            <li>
              <Link href="/profile" className="flex items-center gap-2">
                <Image
                  src="/assets/social-icons/profile.png"
                  alt="Profile"
                  width={40}
                  height={40}
                />
                {userName || "User"}
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/signin"
                className={`pb-2 ${
                  pathname === "/signin" ? "border-b-2 border-blue-500 " : "hover:text-blue-500"
                }`}
              >
                Sign In
              </Link>
            </li>

            <li>
              <Link
                href="/signup"
                className={`pb-2 ${
                  pathname === "/signup" ? "border-b-2 border-blue-500 " : "hover:text-blue-500"
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
