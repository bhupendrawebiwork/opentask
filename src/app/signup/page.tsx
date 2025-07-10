"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(""); // clear any previous error

  try {
    const response = await fetch(
      "https://777b7ef2fa99.ngrok-free.app/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Registration failed");
      return;
    }

    //  Store token
    localStorage.setItem("authToken", data.token);

    // alert("Signup successful!");
    router.push("/profile");
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
          <h3 className="text-2xl font-bold mb-6 text-black">
            Create Your Account
          </h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
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

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full bg-white-400 mb-14">
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>

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

            <p className="text-sm text-center mt-6 text-black">
              Already Have An Account?{" "}
              <Link href="/signin" className="text-blue-400 font-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
