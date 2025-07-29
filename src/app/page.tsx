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
    id: 'llm',
    title: 'Large Language Models',
    description: 'Transformer부터 Fine-tuning까지 LLM 완전 정복',
    icon: Brain,
    color: 'from-purple-500 to-indigo-500',
    category: 'AI/ML',
    difficulty: 'advanced',
    duration: '10주',
    students: 1567,
    rating: 4.8,
    status: 'active'
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
    students: 934,
    rating: 4.7,
    status: 'active'
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
    students: 892,
    rating: 4.7,
    status: 'active'
  },
  {
    id: 'medical-ai',
    title: '의료 AI 시스템',
    description: '의료 영상 분석, 진단 AI, 치료 최적화 시스템 개발',
    icon: Sparkles,
    color: 'from-red-500 to-pink-500',
    category: '의료AI',
    difficulty: 'advanced',
    duration: '14주',
    students: 567,
    rating: 4.9,
    status: 'active'
  },
  {
    id: 'physical-ai',
    title: 'Physical AI & Robotics',
    description: '로봇공학, 물리적 AI, 센서 융합 및 제어 시스템',
    icon: Cpu,
    color: 'from-orange-500 to-red-500',
    category: '피지컬AI',
    difficulty: 'advanced',
    duration: '12주',
    students: 723,
    rating: 4.6,
    status: 'active'
  },
  {
    id: 'iot-systems',
    title: 'IoT & Edge Computing',
    description: '사물인터넷, 엣지 컴퓨팅, 스마트 시티 인프라 구축',
    icon: Globe,
    color: 'from-green-500 to-teal-500',
    category: 'IoT',
    difficulty: 'intermediate',
    duration: '9주',
    students: 1456,
    rating: 4.5,
    status: 'active'
  },
  {
    id: 'defense-ai',
    title: '국방 AI 시스템',
    description: '군사 AI, 사이버 보안, 전략적 의사결정 지원 시스템',
    icon: Database,
    color: 'from-slate-600 to-gray-700',
    category: '국방AI',
    difficulty: 'advanced',
    duration: '16주',
    students: 234,
    rating: 4.8,
    status: 'active'
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
  }
];

const categories = ['전체', '지식공학', '금융', 'Agent/AI', '의료AI', '피지컬AI', 'IoT', '국방AI', 'AI/ML', '물리컴퓨팅', '블록체인'];

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
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            {/* Sophisticated KSS Logo with Knowledge Space Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative group cursor-pointer">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-kss-primary/20 to-kss-secondary/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700"></div>
                
                {/* Main logo container */}
                <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-12 py-10 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl group-hover:shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  
                  {/* Knowledge Space Visualization - Top */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <div className="relative w-20 h-20">
                      {/* Central node */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-r from-kss-primary to-kss-secondary rounded-full shadow-lg animate-pulse"></div>
                      
                      {/* Orbiting nodes */}
                      <div className="absolute inset-0 animate-spin" style={{animationDuration: '8s'}}>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-blue-400 rounded-full shadow-md"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-md"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-pink-400 rounded-full shadow-md"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-orange-400 rounded-full shadow-md"></div>
                      </div>
                      
                      {/* Connection lines */}
                      <div className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                        <div className="absolute top-1/2 left-1/2 w-10 h-0.5 bg-gradient-to-r from-kss-primary to-transparent transform -translate-y-1/2 -translate-x-1/2 rotate-0"></div>
                        <div className="absolute top-1/2 left-1/2 w-10 h-0.5 bg-gradient-to-r from-kss-primary to-transparent transform -translate-y-1/2 -translate-x-1/2 rotate-45"></div>
                        <div className="absolute top-1/2 left-1/2 w-10 h-0.5 bg-gradient-to-r from-kss-primary to-transparent transform -translate-y-1/2 -translate-x-1/2 rotate-90"></div>
                        <div className="absolute top-1/2 left-1/2 w-10 h-0.5 bg-gradient-to-r from-kss-primary to-transparent transform -translate-y-1/2 -translate-x-1/2 rotate-135"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Logo text with icon integration */}
                  <div className="relative overflow-hidden flex flex-col items-center gap-3">
                    <div className="flex items-center gap-6">
                      {/* Brain/Network Icon - Larger */}
                      <div className="relative">
                        <Brain className="w-20 h-20 text-kss-primary group-hover:text-kss-secondary transition-colors duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-kss-primary/20 to-kss-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      <div className="text-center">
                        <h1 className="text-7xl font-bold bg-gradient-to-r from-kss-primary via-purple-600 to-kss-secondary bg-clip-text text-transparent tracking-tight mb-2">
                          KSS
                        </h1>
                        {/* Full name in smaller text */}
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wider">
                          KNOWLEDGE SPACE SIMULATOR
                        </div>
                      </div>
                      
                      {/* Cube/Space Icon - Larger */}
                      <div className="relative">
                        <div className="w-20 h-20 relative group-hover:animate-spin" style={{animationDuration: '3s'}}>
                          {/* 3D Cube representation */}
                          <div className="absolute inset-0 border-2 border-kss-secondary/50 rounded-lg transform rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
                          <div className="absolute inset-1 border-2 border-kss-primary/50 rounded-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-700"></div>
                          <div className="absolute inset-2 bg-gradient-to-br from-kss-primary/20 to-kss-secondary/20 rounded-lg"></div>
                          
                          {/* Inner particles */}
                          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-kss-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                          <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-kss-secondary rounded-full animate-pulse delay-200"></div>
                          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-500"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-kss-primary to-kss-secondary rounded-full w-0 group-hover:w-3/4 transition-all duration-700 ease-out"></div>
                    
                    {/* Subtle shine animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
                  </div>
                  
                  {/* Minimal corner accents */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-kss-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-kss-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-kss-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-kss-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"></div>
                </div>
                
                {/* Enhanced floating elements representing knowledge nodes */}
                <div className="absolute -top-2 left-12 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '2s'}}></div>
                <div className="absolute top-8 -right-2 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2.5s'}}></div>
                <div className="absolute -bottom-2 right-12 w-2 h-2 bg-pink-400/60 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
                <div className="absolute bottom-8 -left-2 w-1.5 h-1.5 bg-orange-400/60 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '2.2s'}}></div>
                
                {/* Data flow lines */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                  <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-kss-primary/50 to-transparent transform rotate-12"></div>
                  <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-kss-secondary/50 to-transparent transform -rotate-12"></div>
                </div>
              </div>
            </div>
            {/* Dynamic tagline with typing effect */}
            <div className="relative max-w-4xl mx-auto mb-8">
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
            <div className="flex justify-center gap-6 mb-12">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {courses.filter(c => c.status === 'active').length}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">활성 코스</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  5,000+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">학습자</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
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
      <section className="max-w-7xl mx-auto px-4 py-16">
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
          
          {/* Domain Filter */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex gap-0">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  <div className="p-6">
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
      </section>

      {/* Features Section - Professional Style */}
      <section className="bg-white dark:bg-gray-900 py-16 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-900 dark:text-white">KSS만의 특별한 학습 경험</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
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
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
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
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
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