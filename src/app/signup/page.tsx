'use client';
import Link from 'next/link';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function SignUp() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit">Create Account</Button>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link href="/signin" className="text-blue-600">
            Sign In
          </Link>
        </p>
      </form>
    </main>
  );
}
