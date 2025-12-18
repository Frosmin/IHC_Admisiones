import React from "react";
import { cn } from "./utils";
interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger" | "neutral";
  filled?: boolean;
  children: React.ReactNode;
  className?: string;
}
export function Badge({
  variant = "default",
  filled = false,
  children,
  className,
}: BadgeProps) {
  const variants = {
    default: filled
      ? "bg-blue-500 text-white border-blue-600"
      : "bg-blue-100 text-blue-800 border-blue-200",
    success: filled
      ? "bg-emerald-500 text-white border-emerald-600"
      : "bg-emerald-100 text-emerald-800 border-emerald-200",
    warning: filled
      ? "bg-amber-500 text-white border-amber-600"
      : "bg-amber-100 text-amber-800 border-amber-200",
    danger: filled
      ? "bg-red-500 text-white border-red-600"
      : "bg-red-100 text-red-800 border-red-200",
    neutral: filled
      ? "bg-slate-500 text-white border-slate-600"
      : "bg-slate-100 text-slate-800 border-slate-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
