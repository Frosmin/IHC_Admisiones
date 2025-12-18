import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from './utils';
interface CardProps extends HTMLMotionProps<'div'> {
  hoverEffect?: boolean;
}
export function Card({
  className,
  children,
  hoverEffect = false,
  ...props
}: CardProps) {
  return <motion.div className={cn('bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden', hoverEffect && 'hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer', className)} {...props}>
      {children}
    </motion.div>;
}