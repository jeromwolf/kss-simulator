'use client';

import React, { useState } from 'react';
import { 
  BookOpen, Calculator, BarChart3, Brain, PieChart,
  ChevronRight, Clock, Shield, Target, Star,
  CheckCircle2, Circle, Lock, Play, Award,
  TrendingUp, Users, Lightbulb, Activity
} from 'lucide-react';
import { Module, Topic, stockCurriculumData, difficultyLabels, difficultyColors } from '../../data/stockCurriculum';
import { InteractiveLearning } from './InteractiveLearning';
import { ChartExample } from './ChartExample';

// 아이콘 매핑
const iconMap = {
  BookOpen,
  Calculator,
  BarChart3,
  Brain,
  PieChart
};

interface CurriculumRendererProps {
  viewMode: 'overview' | 'detail';
  onSimulatorClick: () => void;
  setViewMode?: (mode: 'overview' | 'detail') => void;
}

export function CurriculumRenderer({ viewMode, onSimulatorClick, setViewMode }: CurriculumRendererProps) {
  const [selectedModule, setSelectedModule] = useState<Module>(stockCurriculumData[0]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [completedModules] = useState(0);

  // 각 모듈의 아이콘 컴포넌트 가져오기
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || BookOpen;
  };

  const toggleTopic = (topicTitle: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicTitle)
        ? prev.filter(t => t !== topicTitle)
        : [...prev, topicTitle]
    );
  };

  const totalDuration = stockCurriculumData.reduce((acc, module) => {
    const weeks = parseInt(module.duration);
    return acc + weeks;
  }, 0);

  const totalTopics = stockCurriculumData.reduce((acc, module) => {
    return acc + module.topics.length;
  }, 0);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              주식투자분석 마스터 과정
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              초보자부터 전문가까지, 체계적인 {totalDuration}주 완성 커리큘럼
            </p>
            
            <div className="flex justify-center gap-8 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{totalDuration}주</div>
                <div className="text-sm">총 학습 기간</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{stockCurriculumData.length}개</div>
                <div className="text-sm">핵심 모듈</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{totalTopics}개</div>
                <div className="text-sm">세부 주제</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20">
            <path
              fill="currentColor"
              className="text-gray-50 dark:text-gray-900"
              d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {viewMode === 'overview' ? (
          /* Overview Mode - Module Cards */
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">학습 모듈 개요</h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  전체 진도율: <span className="font-semibold">0%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stockCurriculumData.map((module, index) => {
                const IconComponent = getIconComponent(module.icon);
                const isLocked = index > 0 && completedModules < index;
                
                return (
                  <div
                    key={module.id}
                    onClick={() => {
                      if (!isLocked && setViewMode) {
                        setSelectedModule(module);
                        setViewMode('detail');
                      }
                    }}
                    className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all ${
                      isLocked ? 'opacity-60' : 'hover:scale-105 cursor-pointer'
                    }`}
                  >
                    {isLocked && (
                      <div className="absolute top-4 right-4">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r ${module.color} text-white`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {module.subtitle}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </span>
                      <span>{module.topics.length}개 주제</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">학습 목표</div>
                      <ul className="text-sm space-y-1">
                        {module.learningOutcomes.slice(0, 2).map((outcome, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 line-clamp-2">
                              {outcome}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Prerequisites */}
                    {module.prerequisites && (
                      <div className="mb-4">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Shield className="w-3 h-3" />
                          선수 과목: {module.prerequisites.join(', ')}
                        </div>
                      </div>
                    )}
                    
                    {/* Progress */}
                    <div className="pt-4 border-t dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {module.topics.length}개 주제
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Detail Mode - Curriculum Timeline */
          <div className="space-y-8">
            {/* Module Selector */}
            <div className="flex overflow-x-auto gap-4 pb-4">
              {stockCurriculumData.map((module, index) => {
                const IconComponent = getIconComponent(module.icon);
                const isSelected = selectedModule.id === module.id;
                const isLocked = index > 0 && completedModules < index;
                
                return (
                  <button
                    key={module.id}
                    onClick={() => !isLocked && setSelectedModule(module)}
                    disabled={isLocked}
                    className={`
                      flex-shrink-0 p-4 rounded-xl transition-all
                      ${isSelected 
                        ? 'bg-gradient-to-r text-white shadow-lg ' + module.color
                        : 'bg-white dark:bg-gray-800 hover:shadow-md'
                      }
                      ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {isLocked ? (
                        <Lock className="w-5 h-5" />
                      ) : (
                        <IconComponent className="w-5 h-5" />
                      )}
                      <span className="font-medium">{module.title}</span>
                      <span className="text-sm opacity-80">({module.duration})</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Module Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Module Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`
                      w-16 h-16 rounded-xl flex items-center justify-center
                      bg-gradient-to-r ${selectedModule.color} text-white
                    `}>
                      {React.createElement(getIconComponent(selectedModule.icon), { className: 'w-8 h-8' })}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{selectedModule.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedModule.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      학습 목표
                    </h3>
                    <ul className="space-y-2">
                      {selectedModule.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prerequisites */}
                  {selectedModule.prerequisites && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-600" />
                        선수 과목
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedModule.prerequisites.map((prereq, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                          >
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tools & Industry Connections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tools */}
                    {selectedModule.tools && (
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Star className="w-5 h-5 text-orange-600" />
                          사용 도구
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedModule.tools.map((tool, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Industry Connections */}
                    {selectedModule.industryConnections && (
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                          진로 연계
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedModule.industryConnections.map((connection, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm"
                            >
                              {connection}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Topics */}
                <div className="space-y-4">
                  {selectedModule.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      id={`topic-${topicIndex}`}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleTopic(topic.title)}
                        className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold">
                              {topicIndex + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{topic.title}</h3>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {topic.duration}
                                </span>
                                <span className={`text-sm font-medium ${difficultyColors[topic.difficulty - 1]}`}>
                                  {difficultyLabels[topic.difficulty - 1]}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className={`
                            w-5 h-5 text-gray-400 transition-transform
                            ${expandedTopics.includes(topic.title) ? 'rotate-90' : ''}
                          `} />
                        </div>
                      </button>

                      {/* Subtopics and Interactive Learning */}
                      {expandedTopics.includes(topic.title) && (
                        <div className="px-6 pb-6">
                          <div className="border-t dark:border-gray-700 pt-4">
                            <h4 className="font-medium mb-3 text-sm text-gray-600 dark:text-gray-400">
                              세부 학습 내용
                            </h4>
                            <ul className="space-y-2 mb-6">
                              {topic.subtopics.map((subtopic, subIndex) => (
                                <li key={subIndex} className="flex items-start gap-2">
                                  <Circle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {subtopic}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            
                            {/* Chart Examples */}
                            {topic.chartExamples && topic.chartExamples.length > 0 && (
                              <div className="mt-6 space-y-4">
                                <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-3">
                                  차트 예시
                                </h4>
                                {topic.chartExamples.map((chart, chartIndex) => (
                                  <ChartExample
                                    key={chartIndex}
                                    title={chart.title}
                                    description={chart.description}
                                    imageUrl={chart.imageUrl}
                                    notes={chart.notes}
                                  />
                                ))}
                              </div>
                            )}
                            
                            {/* Interactive Learning Content */}
                            {(topic.quiz || topic.practiceCase || topic.keyPoints) && (
                              <div className="mt-6">
                                <InteractiveLearning 
                                  topic={topic}
                                  onComplete={() => {
                                    // 현재 토픽 인덱스 찾기
                                    const currentTopicIndex = selectedModule.topics.findIndex(t => t.title === topic.title);
                                    
                                    // 다음 토픽이 있으면 확장
                                    if (currentTopicIndex < selectedModule.topics.length - 1) {
                                      const nextTopic = selectedModule.topics[currentTopicIndex + 1];
                                      setExpandedTopics(prev => [...prev, nextTopic.title]);
                                      
                                      // 스크롤로 다음 토픽으로 이동
                                      setTimeout(() => {
                                        document.getElementById(`topic-${currentTopicIndex + 1}`)?.scrollIntoView({ 
                                          behavior: 'smooth', 
                                          block: 'center' 
                                        });
                                      }, 100);
                                    } else {
                                      // 현재 모듈의 모든 토픽 완료 시, 다음 모듈로 이동
                                      const currentModuleIndex = stockCurriculumData.findIndex(m => m.id === selectedModule.id);
                                      if (currentModuleIndex < stockCurriculumData.length - 1) {
                                        setSelectedModule(stockCurriculumData[currentModuleIndex + 1]);
                                        setExpandedTopics([]);
                                      }
                                    }
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Links */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    학습 도구
                  </h3>
                  <div className="space-y-3">
                    <button 
                      onClick={onSimulatorClick}
                      className="block w-full text-left"
                    >
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-medium">AI 시뮬레이터</div>
                            <div className="text-xs text-gray-500">실전 연습</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    학습 진행 상황
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>전체 진도율</span>
                        <span className="font-semibold">0%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '0%' }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">0</div>
                        <div className="text-xs text-gray-500">완료한 주제</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">0h</div>
                        <div className="text-xs text-gray-500">학습 시간</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Study Tips */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    학습 팁
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        매일 1-2시간씩 꾸준히 학습하세요
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        실제 차트를 보며 실습하세요
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        모의투자로 리스크 없이 연습하세요
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Community */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    학습 커뮤니티
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    함께 학습하는 동료들과 소통하고 질문을 나누세요
                  </p>
                  <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    커뮤니티 참여하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}