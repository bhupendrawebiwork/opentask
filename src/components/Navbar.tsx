"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname().toString(); 
  const navLinks = [
    { label: "Browse Tasks", href: "/task-card" },
    { label: "My Tasks", href: "/my-tasks" },
    { label: "Message", href: "/message" },
    { label: "Blog", href: "/blog" }, // will be conditionally replaced
  ];

  return (
    <nav className="flex justify-between items-center px-16 py-4 bg-white shadow-sm border-b border-gray-200 pb-2">
      <div className="text-2xl font-bold text-green-600">
        <Image src="/assets/main logo.png" alt="Logo" width={80} height={0}/>
      </div>

      <ul className="flex gap-6 items-center text-black font-medium">
        {navLinks.map((link) => {
          if (link.label === "Blog") {
            if (pathname === "/task-card") {
              return (
                <li key="save-jobs">
                  <Link
                    href="/saved-jobs"
                    className={`pb-2 ${
                      pathname === "/saved-jobs"
                        ? "border-b-2 border-blue-500 text-black"
                        : "hover:text-blue-500"
                    }`}
                  >
                    Save Jobs
                  </Link>
                </li>
              );
            } else {
              return (
                <li key="blog">
                  <Link
                    href={link.href}
                    className={`pb-2 ${
                      pathname === link.href
                        ? "border-b-2 border-blue-500 text-black"
                        : "hover:text-blue-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            }
          }

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`pb-2 ${
                  pathname === link.href
                    ? "border-b-2 border-blue-500 text-black"
                    : "hover:text-blue-500"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}

        <li>
          <a
            href="#"
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800"
          >
            Post Task
          </a>
        </li>

        <li>
          <Link href="/profile" className="flex items-center gap-2">
            <Image
              src="/assets/social-icons/profile.png"
              alt="Profile"
              width={40}
              height={40}
            />
            Post User
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
