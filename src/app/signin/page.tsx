"use client";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";

export default function SignUp() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className="flex flex-col md:flex-row bg-white rounded-4xl shadow-lg overflow-hidden max-w-5xl w-full h-170"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #2778E0, #6BE353)",
        }}
      >
        {/* Left Section */}
        <div className="text-white  flex-1 flex flex-col justify-center items-center space-y-2">
          <h2 className="text-3xl font-bold text-left leading-tight">
            Login Your Account 
          </h2>
          <p className="text-center mb-8">Welcome Back!</p>
          <Image
            src="/assets/signin.png"
            alt="Signup Illustration"
            width={300}
            height={300}
          />
        </div>

        {/* Right Section */}
        <div className="flex-1/9 p-8 sm:py-20 rounded-4xl bg-white">
          <h3 className="text-2xl font-bold mb-6 text-black">Login</h3>
          <form className="space-y-8">
            <div>
              <label className="block font-semibold text-md  text-gray-500">Email</label>
              <Input
                className=" text-black w-full border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300"
                type="email"
                placeholder="Enter Your Email"
              />
              

            </div>
            
            <div>
              <label className="block font-semibold text-md  text-gray-500">
                Password
              </label>
              <Input
                className="text-black w-full border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300 "
                type="password"
                placeholder="Enter Your Password"
              />
              <Link href="/forget-password" className="text-blue-400 flex justify-end mt-1 text-sm">
                  Forgot Password ?
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
              Login
            </Button>

            <div className="flex items-center justify-center my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="mx-4 text-sm font-bold text-gray-400">
                Or Sign Up With
              </span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center space-x-8 mt-6 mb-8">
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
          </form>
        </div>
      </div>
    </main>
  );
}
