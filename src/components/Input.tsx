// src/components/Input.tsx
import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        'w-full border border-gray-300 px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-400',
        className
      )}
    />
  );
}
