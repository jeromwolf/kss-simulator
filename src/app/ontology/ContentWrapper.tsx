'use client'

import { useEffect, useRef } from 'react'
import './enhanced-styles.css'

interface ContentWrapperProps {
  content: string
}

export default function ContentWrapper({ content }: ContentWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      // Add Font Awesome for icons
      if (!document.querySelector('#font-awesome-css')) {
        const link = document.createElement('link')
        link.id = 'font-awesome-css'
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        document.head.appendChild(link)
      }

      // Smooth scroll to top when chapter changes
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [content])

  // Keep the original HTML structure and classes
  return (
    <div 
      ref={contentRef}
      className="chapter-content animate-fadeIn"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}