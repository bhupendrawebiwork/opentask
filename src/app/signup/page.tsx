"use client";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";


export default function SignUp() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-4xl shadow-lg overflow-hidden max-w-5xl w-full h-170"
      style={{
          backgroundImage: "linear-gradient(to bottom right, #2778E0, #6BE353)",
        }}>
        {/* Left Section */}
        <div
          className="text-white p-10 flex-1 flex flex-col justify-center items-center space-y-3"
        >
          <h2 className="text-3xl font-bold text-left leading-tight">
            Create Your Account 
          </h2>
          <p className="text-center mb-6">Create your account to find freelance jobs or hire top talent.</p>
          <Image
            src="/assets/signup.png"
            alt="Signup Illustration"
            width={300}
            height={300}
          />
        </div>

        {/* Right Section */}
        <div className="flex-1/9 p-8 sm:py-20 rounded-4xl bg-white">
          <h3 className="text-2xl font-bold mb-6 text-black">Create Your Account</h3>
          <form className="space-y-6">
            <div>
              <label className="block font-semibold text-md  text-gray-500">
                Name
              </label>
              <Input className="text-black  w-full border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300" type="text" placeholder="Enter Your Name" />
            </div>
            <div>
              <label className="font-semibold text-md  text-gray-500">
                Email
              </label>
              <Input className= " text-black  w-full border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300" type="email" placeholder="Enter Your Email" />
            </div>
            <div>
              <label className="font-semibold text-md  text-gray-500">
                Password
              </label>
              <Input className="text-black w-full border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300 " type="password" placeholder="Enter Your Password" />
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

            <Button type="submit" className="w-full bg-white-400 mb-14">
              Sign Up
            </Button>

            {/* Social Icons */}
            <div className="flex items-center justify-center space-x-4 mt-4 mb-8">
              <button type="button">
                <Image src="/assets/social-icons/google.svg" alt="Google" width={24} height={24} />
              </button>
              <button type="button">
                <Image src="/assets/social-icons/facebook.svg" alt="Facebook" width={24} height={24} />
              </button>
              <button type="button">
                <Image src="/assets/social-icons/x.svg" alt="Twitter" width={24} height={24} />
              </button>
              <button type="button">
                <Image src="/assets/social-icons/linkedin.svg" alt="Linkedin" width={24} height={24} />
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
