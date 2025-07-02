// src/components/Button.tsx
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export default function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const base =
    'w-full py-2 px-4 rounded font-semibold transition-colors duration-200';
  const variants = {
    primary: 'bg-blue-400 text-white hover:bg-blue-600',
    secondary: 'bg-green-600 text-white hover:bg-green-700',
  };

  return (
    <button
      {...props}
      className={clsx(base, variants[variant], className)}
    />
  );
}
