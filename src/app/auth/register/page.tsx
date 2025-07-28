"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/config/constent";
import { useAuthStore } from "@/store/useAuthStore";

export default function SignUp() {
  const [role, setRole] = useState(""); // new state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await signup({ name, email, password, role });
      if (response.status == 201) router.push("/auth/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
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
            Create Your Account
          </h2>
          <p className="text-center mb-6">
            Create your account to find freelance jobs or hire top talent.
          </p>
          <Image
            src="/assets/signup.png"
            alt="Signup Illustration"
            width={300}
            height={300}
          />
        </div>

        <div className="flex-1/9 p-8 sm:py-20 rounded-4xl bg-white">
          {/* <h3 className="text-2xl font-bold mb-6 text-black">
            Create Your Account
          </h3> */}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label className="block  font-semibold text-md text-gray-500 mb-2">
                I Am Joining As A
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="poster"
                    checked={role === "poster"}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-blue-500 border-blue-300"
                  />
                  <span className="text-black text-sm font-medium">Poster</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="tasker"
                    checked={role === "tasker"}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4  text-blue-500 border-blue-300"
                  />
                  <span className="text-black text-sm font-medium">Tasker</span>
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block font-semibold text-md text-gray-500">
                Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="text-black w-full border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold text-md text-gray-500">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="text-black w-full border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold text-md text-gray-500">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="text-black w-full border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center text-sm">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-black">
                I agree to the{" "}
                <a href="#" className="text-blue-400 underline">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-400 underline">
                  privacy policy
                </a>
              </label>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit */}
            <Button type="submit" className="w-full bg-white-400 mb-14">
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>

            {/* Social Icons */}
            <div className="flex items-center justify-center space-x-4 mt-4 mb-8">
              <button type="button">
                <Image
                  src="/assets/social-icons/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                />
              </button>
              <button type="button">
                <Image
                  src="/assets/social-icons/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </button>
              <button type="button">
                <Image
                  src="/assets/social-icons/x.svg"
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </button>
              <button type="button">
                <Image
                  src="/assets/social-icons/linkedin.svg"
                  alt="Linkedin"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {/* Already have account */}
            <p className="text-sm text-center mt-6 text-black">
              Already Have An Account?{" "}
              <Link href="/auth/login" className="text-blue-400 font-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
