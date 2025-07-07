"use client";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-16 py-4 bg-white shadow-sm border-b-1 border-gray-200 ">
      <div className="text-2xl font-bold text-green-600">
        <Image
                    src="/assets/main logo.png"
                    alt="Logo"
                    width={80}
                    height={0}
                  />
      </div>
      <ul className="flex gap-6 items-center text-black font-medium">
        <li><a href="#">Browse Tasks</a></li>
        <li><a href="#">My Tasks</a></li>
        <li><a href="#">Message</a></li>
        <li><a href="#">Blog</a></li>
        <li>
          <a href="#" className="bg-black text-white px-4 py-2 rounded-xl">Post Task</a>
        </li>
        <li>
            <a href="/profile" className="flex items-center gap-2">
          <Image
                    src="/assets/social-icons/profile.png"
                    alt="Profile"
                    width={40}
                    height={40}
                  />
          Post User
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
