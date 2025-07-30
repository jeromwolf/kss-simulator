/**
 * Callout Component
 * Highlights important information with icons and styling
 */

'use client';

import React from 'react';
import { Lightbulb, AlertTriangle, Info, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalloutProps {
  type?: 'tip' | 'warning' | 'info' | 'important';
  emoji?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ 
  type = 'info', 
  emoji,
  children, 
  className 
}: CalloutProps) {
  const icons = {
    tip: Lightbulb,
    warning: AlertTriangle,
    info: Info,
    important: Zap,
  };

  const styles = {
    tip: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
    important: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700',
  };

  const iconColors = {
    tip: 'text-green-600 dark:text-green-400',
    warning: 'text-amber-600 dark:text-amber-400',
    info: 'text-blue-600 dark:text-blue-400',
    important: 'text-purple-600 dark:text-purple-400',
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      'flex gap-3 p-4 border-l-4 rounded-r-lg mb-4',
      styles[type],
      className
    )}>
      <div className="flex-shrink-0">
        {emoji ? (
          <span className="text-2xl">{emoji}</span>
        ) : (
          <Icon className={cn('w-5 h-5', iconColors[type])} />
        )}
      </div>
      <div className="flex-1 text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}