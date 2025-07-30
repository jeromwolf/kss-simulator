/**
 * Alert Component
 * Displays important information with different severity levels
 */

'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ 
  type = 'info', 
  title, 
  children, 
  className 
}: AlertProps) {
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
  };

  const styles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      'flex gap-3 p-4 border rounded-lg mb-4',
      styles[type],
      className
    )}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && (
          <h4 className="font-semibold mb-1">{title}</h4>
        )}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}