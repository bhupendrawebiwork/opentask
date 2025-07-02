// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to OpenTask</h1>
      <div className="space-x-4">
        <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md">Sign Up</Link>
        <Link href="/signin" className="px-4 py-2 bg-green-600 text-white rounded-md">Sign In</Link>
      </div>
    </main>
  );
}


