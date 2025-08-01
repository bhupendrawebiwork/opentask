"use client";

import { useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTaskContext } from "@/context/TaskContext";
import Link from "next/link";
import { useTaskStore } from "@/store/useTaskStore";

export default function PostTaskPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaFiles, setMediaFiles] = useState<any>([]);
  const router = useRouter();

  const { taskData, setTaskData } = useTaskStore();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (mediaFiles.length + filesArray.length > 5) {
        alert("You can only upload up to 5 files.");
        return;
      }

      setMediaFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const isImage = (file: File) => file.type.startsWith("image");
  const isVideo = (file: File) => file.type.startsWith("video");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    // Save media URLs in context (temporary preview URLs)
    const mediaUrls = mediaFiles.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setTaskData({
      ...taskData,
      media: mediaUrls,
    });

    router.push("preview-task");
  };

  return (
    <div className="min-h-screen bg-[#f3f3e0]">
      {/* <Navbar /> */}
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-7 max-h-[95vh] overflow-y-auto">
          {/* <h1 className="text-xl font-bold mb-4 text-black ml-10">Post Task</h1> */}

          <form
            onSubmit={handleNext}
            className="bg-[#fffff8] rounded-xl px-10 py-8 mx-10"
          >
            <h2 className="text-md font-semibold text-black mb-6">Media</h2>

            {/* Upload Section */}
            <div
              onClick={handleUploadClick}
              className="border border-blue-300 rounded-xl flex flex-col items-center justify-center py-16 mb-10 cursor-pointer hover:bg-gray-50 transition"
            >
              <Image
                src="/assets/upload.png"
                alt="Upload"
                width={116}
                height={116}
              />
              <p className="text-center text-gray-400 text-lg font-semibold mt-4">
                Upload images and videos for your task clarification.
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFilesChange}
              className="hidden"
            />

            {/* Preview Thumbnails */}
            <div className="grid grid-cols-6 gap-4 mb-12">
              {mediaFiles.map((file, index) => {
                const fileURL = URL.createObjectURL(file);
                return (
                  <div
                    key={index}
                    className="relative w-full h-[200px] overflow-hidden rounded-lg border border-gray-300"
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
              <button
                type="submit"
                className="bg-[#27548a] hover:bg-[#1d2834] text-white px-14 py-3 rounded-xl text-lg"
              >
                Preview
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
