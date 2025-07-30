/**
 * CodeBlock Component
 * Enhanced code block with syntax highlighting and copy functionality
 */

'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  // Extract code content
  const code = React.Children.toArray(children)
    .map(child => {
      if (React.isValidElement(child) && child.props.children) {
        return child.props.children;
      }
      return child;
    })
    .join('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Extract language from className (e.g., "language-javascript")
  const lang = language || className?.replace(/language-/, '');

  return (
    <div className="relative group mb-4">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-800 dark:bg-gray-700 text-gray-300 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      
      {lang && (
        <div className="absolute top-2 left-2 px-2 py-1 text-xs bg-gray-800 dark:bg-gray-700 text-gray-400 rounded">
          {lang}
        </div>
      )}
      
      <pre className={cn(
        "overflow-x-auto p-4 pt-10 bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg",
        className
      )}>
        <code className="text-sm font-mono">{children}</code>
      </pre>
    </div>
  );
}