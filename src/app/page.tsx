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
    id: 'llm',
    title: 'Large Language Models (LLM)',
    description: 'Transformer, GPT, Claude 등 최신 LLM 기술 완전 정복',
    icon: Cpu,
    color: 'from-indigo-500 to-purple-600',
    category: '인공지능',
    difficulty: 'intermediate',
    duration: '6주',
    students: 856,
    rating: 4.9,
    status: 'active',
    link: '/modules/llm'
  },
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
    link: '/modules/ontology'
  },
  {
    id: 'stock-analysis',
    title: '주식투자분석 시뮬레이터',
    description: '실전 투자 전략과 심리까지 포함한 종합 투자 마스터 과정',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    category: '금융',
    difficulty: 'beginner',
    duration: '16주',
    students: 2341,
    rating: 4.9,
    status: 'active',
    link: '/stock-analysis'
  },
  {
    id: 'rag',
    title: 'RAG Systems',
    description: 'Retrieval-Augmented Generation 시스템 설계와 구현',
    icon: Database,
    color: 'from-emerald-500 to-green-600',
    category: 'AI/ML',
    difficulty: 'intermediate',
    duration: '12시간',
    students: 423,
    rating: 4.9,
    status: 'active',
    link: '/modules/rag'
  },
  {
    id: 'agent-mcp',
    title: 'Agent/MCP/A2A Systems',
    description: 'AI 에이전트, MCP 프로토콜, Agent-to-Agent 시스템 설계',
    icon: Network,
    color: 'from-cyan-500 to-blue-500',
    category: 'Agent/AI',
    difficulty: 'advanced',
    duration: '10주',
    status: 'coming-soon'
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
    id: 'web3',
    title: 'Web3 & Blockchain',
    description: '블록체인과 탈중앙화 애플리케이션 개발',
    icon: Globe,
    color: 'from-yellow-500 to-orange-500',
    category: '블록체인',
    difficulty: 'intermediate',
    duration: '8주',
    status: 'planned'
  },
  {
    id: 'neo4j',
    title: 'Neo4j Knowledge Graph',
    description: '그래프 데이터베이스로 모든 지식을 연결하는 통합 지식 허브',
    icon: Network,
    color: 'from-blue-600 to-indigo-600',
    category: '지식공학',
    difficulty: 'intermediate',
    duration: '6주',
    status: 'active',
    link: '/neo4j'
  }
];

const categories = ['전체', '지식공학', 'AI/ML', '금융', 'Agent/AI', '물리컴퓨팅', '블록체인'];

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
      <section className="relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            {/* Sophisticated KSS Logo with Knowledge Space Icon */}
            <div className="flex justify-center mb-8 pt-8">
              <div className="relative group cursor-pointer">
                {/* Multiple layer glow effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-kss-primary/30 to-kss-secondary/30 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-all duration-1000 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-all duration-700 rotate-180"></div>
                
                {/* Main logo container - Larger and more prominent */}
                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl px-20 py-16 rounded-3xl border-2 border-gray-200/30 dark:border-gray-700/30 shadow-2xl group-hover:shadow-[0_20px_60px_-15px_rgba(123,63,242,0.5)] transform group-hover:scale-110 transition-all duration-700">
                  
                  {/* Knowledge Space Visualization - Top - Larger */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="relative w-32 h-32">
                      {/* Central node - Larger with ring */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-8 h-8 bg-gradient-to-r from-kss-primary to-kss-secondary rounded-full shadow-2xl animate-pulse"></div>
                        <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-kss-primary to-kss-secondary rounded-full animate-ping opacity-30"></div>
                      </div>
                      
                      {/* Orbiting nodes - Multiple rings */}
                      <div className="absolute inset-0 animate-spin" style={{animationDuration: '10s'}}>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full shadow-lg"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full shadow-lg"></div>
                      </div>
                      {/* Second ring */}
                      <div className="absolute inset-4 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full shadow-md opacity-70"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-green-400 to-teal-400 rounded-full shadow-md opacity-70"></div>
                      </div>
                      
                      {/* Connection lines - Dynamic */}
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-700">
                        <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-kss-primary to-transparent transform -translate-y-1/2 -translate-x-1/2 rotate-0 animate-pulse"></div>
                        <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-kss-secondary to-transparent transform -translate-y-1/2 -translate-x-1/2 rotate-45 animate-pulse delay-100"></div>
                        <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform -translate-y-1/2 -translate-x-1/2 rotate-90 animate-pulse delay-200"></div>
                        <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent transform -translate-y-1/2 -translate-x-1/2 rotate-135 animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Logo text with icon integration */}
                  <div className="relative overflow-hidden flex flex-col items-center gap-3">
                    <div className="flex items-center gap-6">
                      {/* Brain/Network Icon - Much Larger with effects */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-kss-primary/40 to-kss-secondary/40 rounded-full blur-2xl animate-pulse"></div>
                        <Brain className="w-28 h-28 text-kss-primary group-hover:text-kss-secondary transition-all duration-700 transform group-hover:rotate-12" />
                        <div className="absolute inset-2 bg-gradient-to-br from-kss-primary/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      <div className="text-center">
                        <h1 className="text-8xl font-black bg-gradient-to-r from-kss-primary via-purple-600 to-kss-secondary bg-clip-text text-transparent tracking-tight mb-3 animate-gradient bg-300% transition-all duration-700 group-hover:tracking-wide">
                          KSS
                        </h1>
                        {/* Full name with effects */}
                        <div className="text-base font-bold text-gray-600 dark:text-gray-300 tracking-[0.3em] uppercase group-hover:tracking-[0.4em] transition-all duration-700">
                          <span className="inline-block transform group-hover:scale-110 transition-transform duration-500">KNOWLEDGE</span>
                          <span className="inline-block mx-2 text-kss-primary">•</span>
                          <span className="inline-block transform group-hover:scale-110 transition-transform duration-500 delay-100">SPACE</span>
                          <span className="inline-block mx-2 text-kss-secondary">•</span>
                          <span className="inline-block transform group-hover:scale-110 transition-transform duration-500 delay-200">SIMULATOR</span>
                        </div>
                      </div>
                      
                      {/* Cube/Space Icon - 3D Enhanced */}
                      <div className="relative perspective-1000">
                        <div className="w-28 h-28 relative transform-style-3d group-hover:animate-spin" style={{animationDuration: '4s'}}>
                          {/* 3D Cube with multiple layers */}
                          <div className="absolute inset-0 border-3 border-kss-secondary/60 rounded-xl transform rotate-12 group-hover:rotate-45 transition-transform duration-1000 shadow-lg"></div>
                          <div className="absolute inset-2 border-3 border-kss-primary/60 rounded-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-1000 shadow-lg"></div>
                          <div className="absolute inset-4 border-2 border-purple-500/40 rounded-lg transform rotate-6 group-hover:-rotate-12 transition-transform duration-1000"></div>
                          <div className="absolute inset-5 bg-gradient-to-br from-kss-primary/30 via-purple-600/20 to-kss-secondary/30 rounded-lg backdrop-blur-sm"></div>
                          
                          {/* Floating particles with trails */}
                          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-r from-kss-primary to-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping shadow-lg"></div>
                          <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-gradient-to-r from-kss-secondary to-pink-500 rounded-full animate-bounce shadow-md" style={{animationDelay: '0.3s'}}></div>
                          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce shadow-md" style={{animationDelay: '0.6s'}}></div>
                          <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
                          <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse delay-500"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Animated underline - Thicker and glowing */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 bg-gradient-to-r from-kss-primary via-purple-500 to-kss-secondary rounded-full w-0 group-hover:w-4/5 transition-all duration-700 ease-out shadow-lg group-hover:shadow-[0_0_20px_rgba(123,63,242,0.6)]"></div>
                    
                    {/* Multiple shine animations */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1500 ease-in-out"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-y-full group-hover:translate-y-full transition-all duration-2000 ease-in-out delay-300"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced corner accents with animation */}
                  <div className="absolute top-6 left-6 w-6 h-6 border-l-3 border-t-3 border-kss-primary/50 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-8 group-hover:h-8"></div>
                  <div className="absolute top-6 right-6 w-6 h-6 border-r-3 border-t-3 border-kss-secondary/50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:w-8 group-hover:h-8"></div>
                  <div className="absolute bottom-6 left-6 w-6 h-6 border-l-3 border-b-3 border-purple-500/50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 group-hover:w-8 group-hover:h-8"></div>
                  <div className="absolute bottom-6 right-6 w-6 h-6 border-r-3 border-b-3 border-pink-500/50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 group-hover:w-8 group-hover:h-8"></div>
                </div>
                
                {/* Enhanced floating elements with trails */}
                <div className="absolute -top-6 left-20 animate-float" style={{animationDelay: '0s', animationDuration: '3s'}}>
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-30"></div>
                </div>
                <div className="absolute top-16 -right-6 animate-float" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}>
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-30"></div>
                </div>
                <div className="absolute -bottom-6 right-20 animate-float" style={{animationDelay: '1s', animationDuration: '4s'}}>
                  <div className="w-5 h-5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full shadow-lg shadow-pink-400/50"></div>
                  <div className="absolute inset-0 w-5 h-5 bg-pink-400 rounded-full animate-ping opacity-30"></div>
                </div>
                <div className="absolute bottom-16 -left-6 animate-float" style={{animationDelay: '1.5s', animationDuration: '3.2s'}}>
                  <div className="w-3.5 h-3.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full shadow-lg shadow-orange-400/50"></div>
                  <div className="absolute inset-0 w-3.5 h-3.5 bg-orange-400 rounded-full animate-ping opacity-30"></div>
                </div>
                
                {/* Data flow lines */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                  <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-kss-primary/50 to-transparent transform rotate-12"></div>
                  <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-kss-secondary/50 to-transparent transform -rotate-12"></div>
                </div>
              </div>
            </div>
            {/* Dynamic tagline with typing effect */}
            <div className="relative max-w-4xl mx-auto mb-12 mt-8">
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2 animate-pulse">
                차세대 학습 혁신
              </p>
              <p className="text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                복잡한 기술을 <span className="font-bold bg-gradient-to-r from-kss-primary to-kss-secondary bg-clip-text text-transparent">시뮬레이션</span>으로 체험하고, 
                <span className="font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"> AI와 함께</span> 학습하는 
                <span className="font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">지식 우주</span>
              </p>
            </div>
            
            
            {/* Stats - Professional Style */}
            <div className="flex justify-center gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-10 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {courses.filter(c => c.status === 'active').length}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">활성 코스</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-10 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  5,000+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">학습자</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-10 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  4.8★
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">평균 평점</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Knowledge Simulators */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Enterprise Knowledge Simulators
              </h2>
              <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
                Production-grade simulation environments for advanced technical domains
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Platform Status</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Operational</span>
              </div>
            </div>
          </div>
          </div>
          
          {/* Domain Filter */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <nav className="flex gap-0 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
                    selectedCategory === category
                      ? 'border-kss-primary text-kss-primary bg-kss-primary/5'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {category === '전체' ? 'All Domains' : 
                   category === '지식공학' ? 'Knowledge Engineering' :
                   category === '금융' ? 'Financial Systems' :
                   category === 'Agent/AI' ? 'Agent/AI Systems' :
                   category === '의료AI' ? 'Medical AI' :
                   category === '피지컬AI' ? 'Physical AI' :
                   category === 'IoT' ? 'IoT Systems' :
                   category === '국방AI' ? 'Defense AI' :
                   category === 'AI/ML' ? 'AI/Machine Learning' :
                   category === '물리컴퓨팅' ? 'Physical Computing' :
                   category === '블록체인' ? 'Blockchain' : category}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Professional Simulator Grid */}
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            
            return (
              <div
                key={course.id}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                  
                  {/* Header Bar */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded bg-gradient-to-r ${course.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-mono text-xs text-gray-500 dark:text-gray-400">
                          {course.id.toUpperCase().replace('-', '_')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        course.status === 'active' ? 'bg-green-500' :
                        course.status === 'coming-soon' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                        {course.status === 'active' ? 'ACTIVE' :
                         course.status === 'coming-soon' ? 'BETA' : 'DEV'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {course.description}
                    </p>
                    
                    {/* Technical Specs */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">Complexity</div>
                        <div className="font-bold text-gray-700 dark:text-gray-300">
                          {getDifficultyLabel(course.difficulty)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">Duration</div>
                        <div className="font-bold text-gray-700 dark:text-gray-300">
                          {course.duration}
                        </div>
                      </div>
                    </div>
                    
                    {/* Core Modules */}
                    {(course.status === 'active') && (
                      <div className="mb-4">
                        <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Core Modules</div>
                        <div className="flex flex-wrap gap-1">
                          {course.id === 'ontology' && (
                            <>
                              <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">RDF 에디터</span>
                              <span className="text-xs px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded">SPARQL</span>
                              <span className="text-xs px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded">3D 그래프</span>
                            </>
                          )}
                          {course.id === 'stock-analysis' && (
                            <>
                              <span className="text-xs px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded">차트 분석</span>
                              <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">AI 예측</span>
                            </>
                          )}
                          {course.id === 'llm' && (
                            <>
                              <span className="text-xs px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded">Transformer</span>
                              <span className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded">파인튜닝</span>
                              <span className="text-xs px-2 py-1 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 rounded">추론 엔진</span>
                            </>
                          )}
                          {course.id === 'neo4j' && (
                            <>
                              <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">그래프 탐색</span>
                              <span className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded">Cypher 쿼리</span>
                              <span className="text-xs px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded">지식 통합</span>
                            </>
                          )}
                          {course.id === 'rag' && (
                            <>
                              <span className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded">벡터 DB</span>
                              <span className="text-xs px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded">검색 시스템</span>
                              <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">생성 파이프라인</span>
                            </>
                          )}
                          {course.id === 'agent-mcp' && (
                            <>
                              <span className="text-xs px-2 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 rounded">MCP 프로토콜</span>
                              <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">A2A 통신</span>
                              <span className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded">에이전트 오케스트레이션</span>
                            </>
                          )}
                          {course.id === 'medical-ai' && (
                            <>
                              <span className="text-xs px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded">영상 분석</span>
                              <span className="text-xs px-2 py-1 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded">진단 AI</span>
                              <span className="text-xs px-2 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded">치료 최적화</span>
                            </>
                          )}
                          {course.id === 'physical-ai' && (
                            <>
                              <span className="text-xs px-2 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded">로봇 제어</span>
                              <span className="text-xs px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded">센서 융합</span>
                              <span className="text-xs px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded">동역학 시뮬레이션</span>
                            </>
                          )}
                          {course.id === 'iot-systems' && (
                            <>
                              <span className="text-xs px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded">디바이스 관리</span>
                              <span className="text-xs px-2 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded">엣지 컴퓨팅</span>
                              <span className="text-xs px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded">네트워크 시뮬레이션</span>
                            </>
                          )}
                          {course.id === 'defense-ai' && (
                            <>
                              <span className="text-xs px-2 py-1 bg-slate-50 dark:bg-slate-900/20 text-slate-600 dark:text-slate-400 rounded">전술 AI</span>
                              <span className="text-xs px-2 py-1 bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 rounded">사이버 보안</span>
                              <span className="text-xs px-2 py-1 bg-zinc-50 dark:bg-zinc-900/20 text-zinc-600 dark:text-zinc-400 rounded">의사결정 지원</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Metrics */}
                    {course.rating && (
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="text-gray-500 dark:text-gray-400">Satisfaction</div>
                          <div className="font-bold text-gray-700 dark:text-gray-300">
                            {course.rating}/5.0
                          </div>
                        </div>
                        {course.students && (
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Enrollments</div>
                            <div className="font-bold text-gray-700 dark:text-gray-300">
                              {course.students.toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Action Bar */}
                  <div className="border-t border-gray-100 dark:border-gray-700 p-4">
                    {course.status === 'active' && course.link ? (
                      <Link
                        href={course.link}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                      >
                        Access Environment
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-bold cursor-not-allowed"
                      >
                        {course.status === 'coming-soon' ? 'Coming Soon' : 'In Development'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* Features Section - Professional Style */}
      <section className="bg-white dark:bg-gray-900 py-32 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">KSS만의 특별한 학습 경험</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-10 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">인터랙티브 시뮬레이션</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                복잡한 개념을 직접 만지고 실험하며 학습하는 환경 제공
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-10 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded flex items-center justify-center">
                  <Network className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">3D 시각화</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                추상적 개념을 3차원 공간에서 탐색하여 직관적 이해
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-10 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI 맞춤 학습</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                개인별 학습 속도와 스타일에 최적화된 AI 기반 커리큘럼
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}