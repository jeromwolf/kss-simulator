'use client'

import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface TOCItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Generate TOC from headings
    const generateTOC = () => {
      const headings = document.querySelectorAll('.chapter-content h2, .chapter-content h3')
      const items: TOCItem[] = []
      
      headings.forEach((heading, index) => {
        const id = `heading-${index}`
        heading.id = id
        items.push({
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName[1])
        })
      })
      
      setToc(items)
    }

    // Handle scroll to update active heading
    const handleScroll = () => {
      const headings = document.querySelectorAll('.chapter-content h2, .chapter-content h3')
      const scrollPosition = window.scrollY + 100

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i] as HTMLElement
        if (heading.offsetTop <= scrollPosition) {
          setActiveId(heading.id)
          break
        }
      }
    }

    generateTOC()
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (toc.length === 0) return null

  return (
    <div className="hidden xl:block fixed right-8 top-32 w-64 max-h-[calc(100vh-10rem)] overflow-y-auto z-20">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wide flex items-center gap-2">
          <span className="text-purple-600 dark:text-purple-400">📑</span>
          목차
        </h3>
        <nav className="space-y-1">
          {toc.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`
                block w-full text-left transition-all duration-200 py-1.5 px-2 rounded-lg
                ${item.level === 3 ? 'ml-4 text-xs' : 'text-sm'}
                ${activeId === item.id 
                  ? 'text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-900/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                }
              `}
            >
              <span className="flex items-center gap-2">
                <ChevronRight className={`w-3 h-3 transition-opacity ${activeId === item.id ? 'opacity-100' : 'opacity-0'}`} />
                <span className="line-clamp-2 flex-1">{item.text}</span>
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}