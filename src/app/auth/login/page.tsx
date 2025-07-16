"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseUrl } from "@/config/constent";
import { useAuthStore } from "@/store/useAuthStore";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login({ email, password });
      if (response.status != 200) {
        toast.error(response.message || "Login failed");
        return;
      }
      router.push("/auth/profile");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className="flex flex-col md:flex-row bg-white rounded-4xl shadow-lg overflow-hidden max-w-5xl w-full h-170"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #2778E0, #6BE353)",
        }}
      >
        <div className="text-white flex-1 flex flex-col justify-center items-center space-y-2">
          <h2 className="text-3xl font-bold">Login Your Account</h2>
          <p className="text-center mb-8">Welcome Back!</p>
          <Image
            src="/assets/signin.png"
            alt="Signin"
            width={300}
            height={300}
          />
        </div>

        <div className="flex-1/9 p-8 sm:py-20 rounded-4xl bg-white">
          <h3 className="text-2xl font-bold mb-6 text-black">Login</h3>

          <form className="space-y-8" onSubmit={handleLogin}>
            <div>
              <label className="block font-semibold text-md text-gray-500">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="text-black w-full border border-blue-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-md text-gray-500">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="text-black w-full border border-blue-300 rounded-lg"
              />
              <Link
                href="/forget-password"
                className="text-blue-400 flex justify-end mt-1 text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="flex items-center text-sm">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-black">
                Not a Member?{" "}
                <Link href="/signup" className="text-blue-400 font-bold">
                  Sign Up
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full bg-white-400">
              {loading ? "Logging In..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
