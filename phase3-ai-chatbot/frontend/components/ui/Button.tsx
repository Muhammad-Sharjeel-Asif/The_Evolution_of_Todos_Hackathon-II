/**
 * Button Component - T026
 * Base UI component with primary/secondary/danger variants
 * Follows Phase II design system specifications
 */
'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-indigo-500/30',
  secondary:
    'bg-background text-white border-2 border-indigo-500/30 hover:bg-indigo-500/10 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-indigo-500/30',
  danger:
    'bg-rose-600 text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:bg-rose-500 hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-rose-500/30',
};

export default function Button({
  variant = 'primary',
  children,
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    min-h-[44px] min-w-[44px]
    px-16
    rounded-lg
    font-semibold text-base
    cursor-pointer
    transition-all duration-300 ease-out
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-8">
          <svg
            className="animate-spin h-16 w-16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
