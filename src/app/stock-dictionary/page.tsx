'use client';

import React, { useState } from 'react';
import { Book, Search, ArrowLeft, Filter, X, ChevronRight, Info } from 'lucide-react';
import Link from 'next/link';
import { stockTermsData, termCategories, searchTerms, getRelatedTerms, StockTerm } from '../../data/stockTerms';

export default function StockDictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<StockTerm | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  
  // 필터링된 용어
  const filteredTerms = React.useMemo(() => {
    let terms = searchTerm ? searchTerms(searchTerm) : stockTermsData;
    
    if (selectedCategory !== 'all') {
      terms = terms.filter(term => term.category === selectedCategory);
    }
    
    if (selectedDifficulty !== 'all') {
      terms = terms.filter(term => term.difficulty === selectedDifficulty);
    }
    
    return terms;
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const categories = ['all', ...termCategories];
  const difficulties = ['all', 'basic', 'intermediate', 'advanced'];
  
  const difficultyLabels = {
    all: '전체',
    basic: '초급',
    intermediate: '중급',
    advanced: '고급'
  };
  
  const difficultyColors = {
    basic: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Book className="w-6 h-6 text-purple-600" />
                <h1 className="text-xl font-semibold">주식 투자 용어 사전</h1>
              </div>
            </div>
            
            <Link
              href="/stock-analysis"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              전체 커리큘럼 보기
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="용어 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">카테고리:</span>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category === 'all' ? '전체' : category}
                </button>
              ))}
            </div>
            
            {/* Difficulty Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">난이도:</span>
              {difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedDifficulty === difficulty
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {difficultyLabels[difficulty as keyof typeof difficultyLabels]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Terms Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            총 {filteredTerms.length}개의 용어
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded"></span> 초급
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-500 rounded"></span> 중급
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded"></span> 고급
            </span>
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => setSelectedTerm(term)}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg text-purple-600 dark:text-purple-400">
                  {term.term}
                </h3>
                <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {term.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                  {term.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${difficultyColors[term.difficulty]}`}>
                  {difficultyLabels[term.difficulty]}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
      
      {/* Term Detail Modal */}
      {selectedTerm && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTerm(null)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {selectedTerm.term}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                      {selectedTerm.category}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded ${difficultyColors[selectedTerm.difficulty]}`}>
                      {difficultyLabels[selectedTerm.difficulty]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    설명
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedTerm.description}
                  </p>
                </div>
                
                {selectedTerm.example && (
                  <div>
                    <h3 className="font-semibold mb-2">예시</h3>
                    <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                      {selectedTerm.example}
                    </p>
                  </div>
                )}
                
                {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">관련 용어</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTerm.relatedTerms.map((relatedTerm, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const term = stockTermsData.find(t => t.term === relatedTerm);
                            if (term) setSelectedTerm(term);
                          }}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800/40"
                        >
                          {relatedTerm}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}