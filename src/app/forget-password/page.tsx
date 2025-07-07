"use client";
import Link from "next/link";
import Input from "@/components/Input";
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
            Forget Password? 
          </h2>
          <p className="text-center mb-6">Company is simply text of industry.Text has been the industrys standard Signage</p>
          <Image
            src="/assets/forgetpass.png"
            alt="Signup Illustration"
            width={250}
            height={250}
          />
        </div>

        {/* Right Section */}
        <div className="flex-1/9 p-8 sm:py-55 rounded-4xl bg-white">
         
          <form className="space-y-6">
            
            <div>
              <label className=" font-semibold text-md  text-gray-500 block">
                Email
              </label>
              <Input className= " text-black w-full border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300" type="email" placeholder="Enter Your Email" />
            </div>
    
            <a href="/reset-pass" className=" py-3 px-49 bg-blue-400 mb-5 rounded-xl text-white">
             Send Link
            </a>

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
