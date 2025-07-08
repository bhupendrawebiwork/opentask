"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://5d23a85d22e8.ngrok-free.app/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to send reset link");
        return;
      }

      toast.success("Reset link sent to your email!");
      setEmail("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
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
        <div className="text-white p-10 flex-1 flex flex-col justify-center items-center space-y-3">
          <h2 className="text-3xl font-bold text-left leading-tight">
            Forget Password?
          </h2>
          <p className="text-center mb-6">
            Company is simply text of industry. Text has been the industrys
            standard signage.
          </p>
          <Image
            src="/assets/forgetpass.png"
            alt="Forgot Password Illustration"
            width={250}
            height={250}
          />
        </div>

        <div className="flex-1/9 p-8 sm:py-55 rounded-4xl bg-white">
          <form className="space-y-6" onSubmit={handleForgotPassword}>
            <div>
              <label className="font-semibold text-md text-gray-500 block">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="text-black w-full border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300"
                required
              />
            </div>

            <button
              type="submit"
              className="py-3 px-10 bg-blue-400 text-white rounded-xl w-full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Link"}
            </button>

            <p className="text-sm text-center text-black mt-6">
              Not a member?{" "}
              <Link href="/signup" className="text-blue-400 font-bold">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
