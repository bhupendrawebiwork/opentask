"use client";

import Image from "next/image";
import { Search, Plus, Send, MoreVertical } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { imgUrl } from "@/config/constent";

export default function Message() {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    getMessages,
    messages,
    sendMessage,
    subscribeToMessages,
  } = useChatStore();

  const { onlineUsers, checkAuth } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    checkAuth();
    getUsers();
  }, [getUsers, checkAuth]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user.id))
    : users;

  const handleSend = () => {
    const input = document.getElementById("message-input") as HTMLInputElement;
    if (!input.value.trim()) return;
    sendMessage({ text: input.value });
    input.value = "";
  };

  useEffect(() => {
    if (selectedUser) {
      subscribeToMessages();
    }
  }, [selectedUser]);

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)] bg-[#EAF1FF]">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-blue-300">
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none text-sm"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          <div className="flex justify-between items-center mt-6 mb-2 px-1">
            <p className="text-gray-700 font-semibold text-sm">Last Chats</p>
            <div className="flex gap-2">
              <Plus
                size={18}
                className="cursor-pointer bg-gray-500 text-white rounded"
              />
              <MoreVertical size={20} className="text-gray-500" />
            </div>
          </div>

          <div className="overflow-y-auto space-y-4">
            {filteredUsers.map((user, index) => (
              <div
                onClick={() => {
                  setSelectedUser(user);
                  getMessages(user.id);
                }}
                key={index}
                className="flex items-start gap-3 cursor-pointer hover:bg-gray-100 rounded-xl p-2"
              >
                <Image
                  src={
                    user?.avatar ? imgUrl + user?.avatar : "/assets/profile.png"
                  }
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-green-500 text-xs">11:25</p>
                  </div>
                  <p className="text-xs text-gray-500 truncate">tasksky</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-full h-full flex flex-col justify-between px-6 py-6">
          {/* User Info Box */}
          {selectedUser ? (
            <div className="flex items-start gap-3 cursor-pointer bg-white hover:bg-gray-100 rounded-xl p-2 mb-6">
              <Image
                src={
                  selectedUser?.avatar
                    ? imgUrl + selectedUser?.avatar
                    : "/assets/profile.png"
                }
                alt="User"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <h2 className="p-1">{selectedUser?.fullName}</h2>
            </div>
          ) : null}

          {/* Messages Scrollable Section */}
          <div
            className="flex-1 overflow-y-auto space-y-6 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {messages.map((msg, index) =>
              msg.senderId === selectedUser._id ? (
                <div key={index} className="flex gap-3">
                  <Image
                    src="/assets/profile.png"
                    alt="User"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div className="bg-white px-4 py-2 rounded-2xl text-sm text-gray-800 shadow max-w-[60%]">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={index} className="flex justify-end">
                  <div className="bg-gray-300 px-4 py-2 rounded-2xl text-sm text-gray-700 max-w-[60%] shadow">
                    {msg.text}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Message Input Area */}
          <div className="bg-white mt-6 rounded-xl shadow-lg p-4 flex items-center gap-4">
            <div className="flex gap-3 text-gray-500">
              <b>B</b>
              <i>I</i>
              <u>U</u>
              <s>S</s>
              <span>🎨</span>
            </div>

            <input
              id="message-input"
              type="text"
              placeholder="Write Your Message..."
              className="flex-1 text-sm px-4 py-2 outline-none"
            />

            <div className="flex items-center gap-2 text-sm">
              <select className="border rounded px-2 py-1 text-sm">
                <option>12pt</option>
                <option>14pt</option>
              </select>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Helvetica</option>
                <option>Arial</option>
                <option>Sans</option>
              </select>
            </div>

            <button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Right Side Section */}
        <div className="hidden xl:block w-1/4 bg-white p-4 border-l border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b  border-gray-200 pb-3">
            Google Sheet automation AI
          </h2>

          <div className="text-sm text-gray-700 space-y-1 mb-6">
            <p>
              <b>Client:</b> Kate Johnson
            </p>
            <p>
              <b>Tasker:</b> John Deo
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
              <Image
                src="/assets/profile.png"
                alt="Tasker"
                width={70}
                height={70}
                className="rounded-full object-cover"
              />

              <div className="flex flex-col justify-center">
                <h3 className="text-gray-800 font-semibold text-base">
                  John Deo
                </h3>

                <div className="flex items-center text-sm mt-1">
                  <span className="text-orange-400">★★★★☆</span>
                  <span className="text-gray-500 ml-1">30+</span>
                </div>

                <div className="text-blue-600 text-sm">
                  Electrician | 50+ Jobs
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-4">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Sed Do
              Eiusmod Tempor Incididunt.psum Dolor Sit Amet, Consectetur
              Adipisicing Elit. Sed Do Eiusmod Tempor Incididuntpsum Dolor Sit
              Amet, Consectetur Adipisicing Elit. Sed Do Eiusmod Tempor
              Incididunt.
            </p>

            <div className="text-green-600 font-semibold mt-4 text-sm">
              Bids: $350
            </div>

            <button className="mt-3 w-full bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-gray-700 transition">
              Hire Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
