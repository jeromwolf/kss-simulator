'use client'

import { useState } from 'react'
import { 
  Brain, TrendingUp, Network, Sparkles, 
  Atom, Cpu, Database, Globe,
  ChevronRight, Star, Clock, Users
} from 'lucide-react'
import Link from 'next/link'

interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  students?: number;
  rating?: number;
  status: 'active' | 'coming-soon' | 'planned';
  link?: string;
}

const courses: Course[] = [
  {
    id: 'ontology',
    title: 'Ontology & Semantic Web',
    description: 'RDF, SPARQL, 지식 그래프를 통한 시맨틱 웹 기술 마스터',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    category: '지식공학',
    difficulty: 'intermediate',
    duration: '8주',
    students: 1234,
    rating: 4.8,
    status: 'active',
    link: '/ontology'
  },
  {
    id: 'stock-analysis',
    title: '주식투자분석 시뮬레이터',
    description: '기술적/기본적 분석부터 AI 트레이딩까지 체계적 학습',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    category: '금융',
    difficulty: 'beginner',
    duration: '8주',
    students: 2341,
    rating: 4.9,
    status: 'active',
    link: '/stock-analysis'
  },
  {
    id: 'quantum',
    title: 'Quantum Computing',
    description: '양자 컴퓨팅의 기초부터 양자 알고리즘 구현까지',
    icon: Atom,
    color: 'from-blue-500 to-cyan-500',
    category: '물리컴퓨팅',
    difficulty: 'advanced',
    duration: '12주',
    status: 'coming-soon'
  },
  {
    id: 'llm',
    title: 'Large Language Models',
    description: 'Transformer부터 Fine-tuning까지 LLM 완전 정복',
    icon: Cpu,
    color: 'from-orange-500 to-red-500',
    category: 'AI/ML',
    difficulty: 'advanced',
    duration: '10주',
    status: 'coming-soon'
  },
  {
    id: 'rag',
    title: 'RAG Systems',
    description: 'Retrieval-Augmented Generation 시스템 설계와 구현',
    icon: Database,
    color: 'from-indigo-500 to-purple-500',
    category: 'AI/ML',
    difficulty: 'intermediate',
    duration: '6주',
    status: 'planned'
  },
  {
    id: 'web3',
    title: 'Web3 & Blockchain',
    description: '블록체인과 탈중앙화 애플리케이션 개발',
    icon: Globe,
    color: 'from-yellow-500 to-orange-500',
    category: '블록체인',
    difficulty: 'intermediate',
    duration: '8주',
    status: 'planned'
  }
];

const categories = ['전체', '지식공학', '금융', 'AI/ML', '물리컴퓨팅', '블록체인'];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  const filteredCourses = selectedCategory === '전체' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return '';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'advanced': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return '';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">학습 가능</span>;
      case 'coming-soon':
        return <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">곧 공개</span>;
      case 'planned':
        return <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded-full">개발 예정</span>;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-kss-primary to-kss-secondary bg-clip-text text-transparent">
                Knowledge Space Simulator
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              복잡한 기술을 시뮬레이션으로 체험하는 차세대 학습 플랫폼
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-kss-primary">{courses.filter(c => c.status === 'active').length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">활성 코스</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kss-secondary">5,000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">학습자</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kss-accent">4.8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">평균 평점</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">학습 코스</h2>
          
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-kss-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            const isHovered = hoveredCourse === course.id;
            
            return (
              <div
                key={course.id}
                className="relative group"
                onMouseEnter={() => setHoveredCourse(course.id)}
                onMouseLeave={() => setHoveredCourse(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${course.color} rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} />
                
                <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all">
                  {/* Card Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${course.color} text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      {getStatusBadge(course.status)}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {course.description}
                    </p>
                    
                    {/* Course Meta */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                        {getDifficultyLabel(course.difficulty)}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                      {course.students && (
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {course.students.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    {/* Rating */}
                    {course.rating && (
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(course.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                          {course.rating}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Card Footer */}
                  <div className="px-6 pb-6">
                    {course.status === 'active' && course.link ? (
                      <Link
                        href={course.link}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-kss-primary to-kss-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all"
                      >
                        학습 시작
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                      >
                        {course.status === 'coming-soon' ? '곧 공개 예정' : '개발 중'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">KSS만의 특별한 학습 경험</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">인터랙티브 시뮬레이션</h3>
              <p className="text-gray-600 dark:text-gray-400">
                복잡한 개념을 직접 만지고 실험하며 학습
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Network className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3D 시각화</h3>
              <p className="text-gray-600 dark:text-gray-400">
                추상적 개념을 3차원 공간에서 탐색
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI 맞춤 학습</h3>
              <p className="text-gray-600 dark:text-gray-400">
                개인별 학습 속도와 스타일에 최적화
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}