/**
 * Button Component (UI)
 * 
 * Responsibility: Reusable button with consistent styling.
 * Owner: Frontend Engineer
 * Implementation: Use Tailwind classes for variants (primary, secondary, etc.) and handle loading states.
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className="opacity-50 cursor-not-allowed">Button Not Built Yet — Awaiting Developer</button>;
};
