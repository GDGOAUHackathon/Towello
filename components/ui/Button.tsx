'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

const base =
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white',
  secondary:
    'border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800',
  danger:
    'bg-red-600 text-white hover:bg-red-500 focus:ring-red-600',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading,
  className = '',
  disabled,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled ?? isLoading}
      {...rest}
    >
      {isLoading ? 'Loading…' : children}
    </button>
  );
};
