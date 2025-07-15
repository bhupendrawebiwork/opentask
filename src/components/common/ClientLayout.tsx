"use client";

import { usePathname } from "next/navigation";
import Navbar from "../layout/Navbar";
import { useEffect } from "react";
import {useAuthStore} from "@/store/useAuthStore";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarOn = ["/signin", "/signup"];
  const showNavbar = !hideNavbarOn.includes(pathname);

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
