"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import Image from "next/image";

const dummyNotifications = [
  {
    id: 1,
    title: "New Task Nearby",
    message: "A cleaning task was posted 2 km away.",
    time: "2m ago",
    avatar: "/assets/profile.png",
  },
  {
    id: 2,
    title: "Bid Response",
    message: "Client John accepted your bid.",
    time: "15m ago",
    avatar: "/assets/user.jpg",
  },
  {
    id: 3,
    title: "Task Completed",
    message: "Your task #123 has been marked complete.",
    time: "1h ago",
    avatar: "/assets/profile.png",
  },
];

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
        onClick={() => setOpen(!open)}
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {dummyNotifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
            {dummyNotifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl border border-gray-200 rounded-xl z-50">
          <div className="p-4 text-base font-semibold border-b">
            Notifications
          </div>
          {dummyNotifications.length > 0 ? (
            <ul className="max-h-[190px] overflow-y-auto divide-y divide-gray-100">
              {dummyNotifications.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition text-sm"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden">
                    <Image
                      src={item.avatar}
                      alt="avatar"
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-gray-600 text-sm">{item.message}</div>
                    <div className="text-blue-400 text-xs mt-1 text-end">
                      {item.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500 text-sm">
              No notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
}
