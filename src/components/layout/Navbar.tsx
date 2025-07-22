"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { baseUrl } from "@/config/constent";
import { useAuthStore } from "@/store/useAuthStore";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const pathname = usePathname().toString();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) return;
    setIsLoggedIn(true);
    setUserName(authUser?.name||"");
  }, [authUser]);

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
                  pathname === "/"
                    ? "border-b-2 border-blue-500 "
                    : "hover:text-blue-500"
                }`}
              >
                Browse Tasks
              </Link>
            </li>

            <li>
              <Link
                href="/my-tasks"
                className={`pb-2 ${
                  pathname === "/my-tasks"
                    ? "border-b-2 border-blue-500 "
                    : "hover:text-blue-500"
                }`}
              >
                My Tasks
              </Link>
            </li>

            <li>
              <Link
                href="/my-bids"
                className={`pb-2 ${
                  pathname === "/my-bids"
                    ? "border-b-2 border-blue-500 "
                    : "hover:text-blue-500"
                }`}
              >
                My Bids
              </Link>
            </li>

            <li>
              <Link
                href="/message"
                className={`pb-2 ${
                  pathname === "/message"
                    ? "border-b-2 border-blue-500 "
                    : "hover:text-blue-500"
                }`}
              >
                Message
              </Link>
            </li>

            <li>
              <Link
                href="/saved-jobs"
                className={`pb-2 ${
                  pathname === "/saved-jobs"
                    ? "border-b-2 border-blue-500 "
                    : "hover:text-blue-500"
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
              <Link href="/auth/profile" className="flex items-center gap-2">
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
                href="/auth/login"
                className={`pb-2 ${
                  pathname === "/signin"
                    ? "border-b-2 border-blue-500 "
                    : "hover:text-blue-500"
                }`}
              >
                Sign In
              </Link>
            </li>

            <li>
              <Link
                href="auth/register"
                className={`pb-2 ${
                  pathname === "/register"
                    ? "border-b-2 border-blue-500 "
                    : "hover:text-blue-500"
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
