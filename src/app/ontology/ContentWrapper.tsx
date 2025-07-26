'use client'

import { useEffect, useRef } from 'react'

interface ContentWrapperProps {
  content: string
}

export default function ContentWrapper({ content }: ContentWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      // Apply styles to all elements after content is loaded
      const applyStyles = () => {
        const container = contentRef.current
        if (!container) return

        // Remove all existing styles
        container.querySelectorAll('style').forEach(el => el.remove())
        container.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'))

        // Apply new styles to specific elements
        // Headers
        container.querySelectorAll('h1').forEach(el => {
          el.className = 'text-4xl font-bold mb-8 pb-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100'
        })
        
        container.querySelectorAll('h2').forEach(el => {
          el.className = 'text-2xl font-semibold mt-12 mb-6 text-kss-primary dark:text-kss-secondary'
        })
        
        container.querySelectorAll('h3').forEach(el => {
          el.className = 'text-xl font-semibold mt-8 mb-4 text-gray-700 dark:text-gray-200'
        })
        
        container.querySelectorAll('h4').forEach(el => {
          el.className = 'text-lg font-medium mt-6 mb-3 text-gray-700 dark:text-gray-200'
        })

        // Paragraphs
        container.querySelectorAll('p').forEach(el => {
          el.className = 'mb-6 leading-relaxed text-gray-700 dark:text-gray-300'
        })

        // Lists
        container.querySelectorAll('ul').forEach(el => {
          el.className = 'my-6 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300'
        })
        
        container.querySelectorAll('ol').forEach(el => {
          el.className = 'my-6 ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300'
        })
        
        container.querySelectorAll('li').forEach(el => {
          el.className = 'ml-4'
        })

        // Code blocks
        container.querySelectorAll('pre').forEach(el => {
          el.className = 'bg-gray-900 dark:bg-gray-950 text-gray-100 p-6 rounded-xl shadow-lg overflow-x-auto my-6 text-sm'
        })
        
        container.querySelectorAll('code').forEach(el => {
          if (!el.closest('pre')) {
            el.className = 'bg-gray-100 dark:bg-gray-800 text-kss-primary dark:text-kss-secondary px-2 py-1 rounded text-sm font-mono'
          }
        })

        // Tables
        container.querySelectorAll('table').forEach(el => {
          el.className = 'w-full border-collapse my-8'
        })
        
        container.querySelectorAll('th').forEach(el => {
          el.className = 'bg-gray-100 dark:bg-gray-800 px-4 py-3 text-left font-semibold border border-gray-200 dark:border-gray-700'
        })
        
        container.querySelectorAll('td').forEach(el => {
          el.className = 'px-4 py-3 border border-gray-200 dark:border-gray-700'
        })

        // Links
        container.querySelectorAll('a').forEach(el => {
          el.className = 'text-kss-primary dark:text-kss-secondary underline hover:decoration-2 transition-all'
        })

        // Blockquotes
        container.querySelectorAll('blockquote').forEach(el => {
          el.className = 'border-l-4 border-kss-primary dark:border-kss-secondary pl-6 my-6 italic text-gray-600 dark:text-gray-400'
        })

        // Special sections
        container.querySelectorAll('.section, .content-section').forEach(el => {
          el.className = 'mb-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700'
        })

        container.querySelectorAll('.concept-box').forEach(el => {
          el.className = 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 my-6 rounded-r-lg'
        })

        container.querySelectorAll('.example').forEach(el => {
          el.className = 'bg-gray-50 dark:bg-gray-900 p-6 rounded-xl my-6 border border-gray-200 dark:border-gray-700'
        })

        container.querySelectorAll('.note').forEach(el => {
          el.className = 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg'
        })

        container.querySelectorAll('.warning').forEach(el => {
          el.className = 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 my-6 rounded-r-lg'
        })

        container.querySelectorAll('.card').forEach(el => {
          el.className = 'bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 my-6'
        })

        // Remove FontAwesome icons or replace with text
        container.querySelectorAll('i.fas, i.far').forEach(el => {
          el.remove()
        })
      }

      // Apply styles immediately
      applyStyles()

      // Also apply styles after a short delay to catch any dynamic content
      setTimeout(applyStyles, 100)
    }
  }, [content])

  return (
    <div 
      ref={contentRef}
      className="chapter-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}