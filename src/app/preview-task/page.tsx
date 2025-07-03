"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import Image from "next/image";

export default function PostTaskPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-10 bg-[#F7F5F8]">
  <h1 className="text-xl font-bold mb-4 text-black ml-10">Preview Task</h1>

  <div className="bg-white rounded-xl px-10 py-8 mx-10 space-y-10">

    {/* Task Details */}
    <section>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-black">Task Details</h2>
        <button className="text-gray-500 hover:text-black">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 13h12l-6 6-6-6zm0-6h12l-6-6-6 6z" />
          </svg>
        </button>
      </div>
      <p className="text-gray-800 text-sm font-semibold">Title</p>
      <p className="text-sm mb-3">Web Migration Task</p>

      <p className="text-gray-800 text-sm font-semibold">Description</p>
      <p className="text-sm mb-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text...
      </p>
      <p className="bg-gray-100 text-sm p-3 rounded-md text-gray-700">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
      </p>
    </section>
    <hr></hr>

    {/* Location */}
    <section>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-black">Location</h2>
        <button className="text-gray-500 hover:text-black">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 13h12l-6 6-6-6zm0-6h12l-6-6-6 6z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="space-y-1 text-sm">
          <p><span className="font-semibold text-black">Type:</span> In Person</p>
          <p><span className="font-semibold text-black">Street:</span> 95 Mills Street</p>
          <p><span className="font-semibold text-black">City:</span> Inverloch</p>
          <p><span className="font-semibold text-black">Country:</span> Australia</p>
          <p><span className="font-semibold text-black">State:</span> Victoria</p>
          <p><span className="font-semibold text-black">Phone:</span> (03) 5310 5939</p>
          <p><span className="font-semibold text-black">Zip code:</span> 3996</p>
          <p><span className="font-semibold text-black">Country code:</span> +61</p>
        </div>
        <div>
          <div className="rounded-xl overflow-hidden border border-gray-300 relative">
            <iframe
                title="Google Map"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.625303392915!2d80.95857231504187!3d26.846693083158887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2ad1ad2c0cf%3A0x8d9b39f9a59e624!2sLucknow%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1593770941577!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
              ></iframe>
            <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 13h12l-6 6-6-6zm0-6h12l-6-6-6 6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
    <hr></hr>

    {/* Budget & Date */}
    <section>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-black">Estimated budget & completion date</h2>
        <button className="text-gray-500 hover:text-black">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 13h12l-6 6-6-6zm0-6h12l-6-6-6 6z" />
          </svg>
        </button>
      </div>
      <div className="text-sm space-y-1 ">
        <p><span className="font-semibold text-black">Budget:</span></p>
        <p className="mb-4"> $250</p>
        <p><span className="font-semibold text-black">Completion Date:</span></p>
        <p>25/06/2025</p>
      </div>
    </section>
    <hr></hr>

    {/* Media */}
    <section>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-black">Media</h2>
        <button className="text-gray-500 hover:text-black">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 13h12l-6 6-6-6zm0-6h12l-6-6-6 6z" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-8 gap-0    ">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <div key={index} className="relative">
            <Image
              src="/assets/img.png" // Replace with your actual image path
              alt={`Media ${index + 1}`}
              width={160}
              height={100}
              className="rounded-lg object-cover"
            />
            {index === 4 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-60 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>

    {/* Buttons */}
    <div className="flex justify-between pt-4">
      <Link
        href="/media"
        className="bg-blue-100 text-gray-400 px-10 py-3 rounded-xl text-lg"
      >
        Previous
      </Link>
      <Link
        href="/success"
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





