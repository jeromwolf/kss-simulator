'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Menu, X, Home } from 'lucide-react'
import ContentWrapper from './ContentWrapper'
import TableOfContents from '@/components/TableOfContents'
import styles from './ontology.module.css'
import './style-override.css'

interface Chapter {
  id: string
  title: string
  part?: string
}

const chapters: Chapter[] = [
  { id: 'intro', title: '시작하기' },
  { id: 'chapter01', title: '온톨로지란 무엇인가?', part: 'Part 1. 온톨로지의 이해' },
  { id: 'chapter02', title: '온톨로지의 핵심 개념' },
  { id: 'chapter03', title: '시맨틱 웹과 온톨로지' },
  { id: 'chapter04', title: 'RDF: 지식 표현의 기초', part: 'Part 2. 온톨로지 기술 표준' },
  { id: 'chapter05', title: 'RDFS: 스키마와 계층구조' },
  { id: 'chapter06', title: 'OWL: 표현력 있는 온톨로지' },
  { id: 'chapter07', title: 'SPARQL: 온톨로지 질의' },
  { id: 'chapter08', title: 'Protégé 마스터하기', part: 'Part 3. 온톨로지 설계와 구축' },
  { id: 'chapter09', title: '온톨로지 설계 방법론' },
  { id: 'chapter10', title: '패턴과 모범 사례' },
  { id: 'chapter11', title: '금융 온톨로지: 주식 시장', part: 'Part 4. 실전 프로젝트' },
  { id: 'chapter12', title: '뉴스 온톨로지: 지식 그래프' },
  { id: 'chapter13', title: '통합 프로젝트: 주식-뉴스 연계' },
  { id: 'chapter14', title: 'AI와 온톨로지', part: 'Part 5. 온톨로지의 미래' },
  { id: 'chapter15', title: '산업별 활용사례' },
  { id: 'chapter16', title: '미래 전망과 도전과제' },
]

export default function OntologyPage() {
  const [currentChapter, setCurrentChapter] = useState('intro')
  const [chapterContent, setChapterContent] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    loadChapter(currentChapter)
  }, [currentChapter])

  useEffect(() => {
    const handleChapterChange = (event: any) => {
      setCurrentChapter(event.detail)
    }
    
    window.addEventListener('changeChapter', handleChapterChange)
    
    return () => {
      window.removeEventListener('changeChapter', handleChapterChange)
    }
  }, [])

  const loadChapter = async (chapterId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/content/${chapterId}.html`)
      const html = await response.text()
      
      // Keep the original HTML structure and classes
      setChapterContent(html)
    } catch (error) {
      console.error('Failed to load chapter:', error)
      setChapterContent('<p>챕터를 불러오는데 실패했습니다.</p>')
    } finally {
      setIsLoading(false)
    }
  }

  const getCurrentChapterIndex = () => {
    return chapters.findIndex(ch => ch.id === currentChapter)
  }

  const navigateChapter = (direction: 'prev' | 'next') => {
    const currentIndex = getCurrentChapterIndex()
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1
    
    if (newIndex >= 0 && newIndex < chapters.length) {
      setCurrentChapter(chapters[newIndex].id)
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`${
        isSidebarOpen ? 'w-80' : 'w-0'
      } transition-all duration-300 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-r border-indigo-200/30 dark:border-indigo-700/30 overflow-hidden shadow-2xl
      fixed md:relative inset-y-0 left-0 z-40 md:z-auto`}>
        <div className="p-6 h-full overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-kss-primary to-kss-secondary bg-clip-text text-transparent">
            온톨로지 시뮬레이터
          </h2>
          
          <nav className="space-y-1">
            {chapters.map((chapter, index) => (
              <div key={chapter.id}>
                {chapter.part && (
                  <div className="text-xs font-medium text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mt-4 mb-2 px-2 py-1 first:mt-0">
                    {chapter.part}
                  </div>
                )}
                <button
                  onClick={() => setCurrentChapter(chapter.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                    currentChapter === chapter.id
                      ? 'bg-gradient-to-r from-kss-primary to-kss-secondary text-white shadow-lg scale-[1.02] border border-indigo-300/50'
                      : 'hover:bg-indigo-50/80 dark:hover:bg-indigo-900/20 hover:translate-x-1 hover:border-indigo-200/50 dark:hover:border-indigo-700/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {index === 0 ? (
                      <Home className={`w-4 h-4 flex-shrink-0 ${
                        currentChapter === chapter.id 
                          ? 'text-white' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    ) : (
                      <span className={`text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 ${
                        currentChapter === chapter.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300'
                      }`}>
                        {index}
                      </span>
                    )}
                    <span className="text-sm font-medium flex-1">
                      {chapter.title}
                    </span>
                    {/* Remove check marks - they were showing completion status */}
                  </div>
                </button>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-indigo-200/30 dark:border-indigo-700/30 px-6 py-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors"
              title={isSidebarOpen ? "사이드바 숨기기" : "사이드바 보기"}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="h-6 w-px bg-indigo-200 dark:bg-indigo-700"></div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {chapters.find(ch => ch.id === currentChapter)?.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateChapter('prev')}
              disabled={getCurrentChapterIndex() === 0}
              className="p-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200/50 dark:border-indigo-700/50">
              {getCurrentChapterIndex() + 1} / {chapters.length}
            </span>
            <button
              onClick={() => navigateChapter('next')}
              disabled={getCurrentChapterIndex() === chapters.length - 1}
              className="p-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-8 py-12">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700"></div>
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-kss-primary border-t-transparent absolute inset-0"></div>
                </div>
                <p className="mt-4 text-gray-500 dark:text-gray-400">콘텐츠를 불러오는 중...</p>
              </div>
            ) : (
              <ContentWrapper content={chapterContent} />
            )}
          </div>
        </div>
      </main>
      
      {/* Table of Contents - Removed to avoid duplication */}
    </div>
  )
}