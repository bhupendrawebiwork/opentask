// src/app/signin/page.tsx
import Link from 'next/link';

export default function SignIn() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <input type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Login</button>
        <p className="text-sm text-center">
          Don't have an account? <Link href="/signup" className="text-green-600">Sign Up</Link>
        </p>
      </form>
    </main>
  );
}
