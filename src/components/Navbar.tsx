"use client";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-16 py-4 bg-white shadow-sm ">
      <div className="text-2xl font-bold text-green-600">
        <Image
                    src="/assets/logo.png"
                    alt="Logo"
                    width={150}
                    height={100}
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
            <a href="#" className="flex items-center gap-2">
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
