"use client";

import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import Image from "next/image";

export default function PostTaskPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setMediaFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const isImage = (file: File) => file.type.startsWith("image");
  const isVideo = (file: File) => file.type.startsWith("video");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-10 bg-[#F7F5F8]">
          <h1 className="text-xl font-bold mb-4 text-black ml-10">Post Task</h1>

          <div className="bg-white rounded-xl px-10 py-8 mx-10">
            <h2 className="text-md font-semibold text-black mb-6">Media</h2>

            {/* Upload Section */}
            <div
              onClick={handleUploadClick}
              className="border border-gray-300 rounded-xl flex flex-col items-center justify-center py-16 mb-10 cursor-pointer hover:bg-gray-50 transition"
            >
              <Image
                src="/assets/upload.png"
                alt="Upload"
                width={116}
                height={116}
              />
              <p className="text-center text-black text-lg font-semibold mt-4">
                Upload images and videos for your task clarification.
              </p>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFilesChange}
              className="hidden"
            />

            {/* Media Thumbnails */}
            <div className="grid grid-cols-6 gap-4 mb-12">
              {mediaFiles.map((file, index) => {
                const fileURL = URL.createObjectURL(file);

                return (
                  <div
                    key={index}
                    className="relative w-full h-[120px] overflow-hidden rounded-lg border"
                  >
                    {isImage(file) ? (
                      <img
                        src={fileURL}
                        alt={`media-${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : isVideo(file) ? (
                      <video
                        src={fileURL}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between">
              <Link
                href="/estimated-budget"
                className="bg-blue-100 text-gray-400 px-10 py-3 rounded-xl text-lg"
              >
                Previous
              </Link>
              <Link
                href="/preview-task"
                className="bg-blue-500 hover:bg-blue-600 text-white px-14 py-3 rounded-xl text-lg"
              >
                Preview
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
