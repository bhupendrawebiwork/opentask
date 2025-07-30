"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import NotificationDropdown from "../common/NotificationDropdown";
import { POSTER, TASKER } from "@/config/constent";

const Navbar = () => {
  const pathname = usePathname();
  const { authUser } = useAuthStore();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (authUser?.name) {
      setUserName(authUser.name);
    }
  }, [authUser]);

  const isLoggedIn = !!authUser;

  const navLinksPoster = [
    // { href: "/", label: "Browse Tasks" },
    { href: "/my-tasks", label: "My Tasks" },
    // { href: "/my-bids", label: "My Bids" },
    { href: "/message", label: "Message" },
    { href: "/bid-status", label: "Bids Status" },
  ];
  const navLinksTasker = [
    { href: "/", label: "Browse Tasks" },
    // { href: "/my-tasks", label: "My Tasks" },
    { href: "/my-bids", label: "My Bids" },
    { href: "/message", label: "Message" },
    // { href: "/bid-status", label: "Bids Status" },
  ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-16 py-4 bg-white shadow-sm border-b border-gray-200">
      <Link href="/">
        <Image src="/assets/main logo.png" alt="Logo" width={80} height={40} />
      </Link>

      <ul className="flex flex-wrap gap-4 md:gap-6 items-center text-sm md:text-base font-semibold text-gray-700">
        {isLoggedIn ? (
          <>
            {(authUser.role === TASKER ? navLinksTasker : navLinksPoster).map(
              (link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`pb-2 transition ${
                      pathname === link.href
                        ? "border-b-2 border-blue-500"
                        : "hover:text-blue-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}

            {authUser.role === POSTER ? (
              <li>
                <Link
                  href="/post-task"
                  className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800"
                >
                  Post Task
                </Link>
              </li>
            ) : null}

            <li>
              <Link href="/auth/profile" className="flex items-center gap-2">
                <Image
                  src="/assets/social-icons/profile.png"
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="hidden md:inline">{userName || "User"}</span>
              </Link>
            </li>

            {/* 🔔 Notification Bell Icon */}
            <li>
              <NotificationDropdown />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/auth/login"
                className={`pb-2 ${
                  pathname === "/auth/login"
                    ? "border-b-2 border-blue-500"
                    : "hover:text-blue-500"
                }`}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href="/auth/register"
                className={`pb-2 ${
                  pathname === "/auth/register"
                    ? "border-b-2 border-blue-500"
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
