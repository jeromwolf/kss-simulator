'use client';

import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, Pause, RotateCcw, Check, 
  AlertCircle, HelpCircle, MessageSquare,
  ChevronRight, ChevronLeft, Star, Trophy,
  Brain, Target, Zap, Award
} from 'lucide-react';

interface InteractiveLearningProps {
  topic: {
    title: string;
    quiz?: Quiz;
    practiceCase?: PracticeCase;
    keyPoints?: string[];
  };
  onComplete?: () => void;
}

interface Quiz {
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface PracticeCase {
  title: string;
  scenario: string;
  task: string;
  hints: string[];
  solution: string;
}

export function InteractiveLearning({ topic, onComplete }: InteractiveLearningProps) {
  const [activeTab, setActiveTab] = useState<'keypoints' | 'quiz' | 'practice'>('keypoints');
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    answers: {} as Record<string, number>,
    showResults: false,
    score: 0
  });
  const [practiceState, setPracticeState] = useState({
    showHints: false,
    showSolution: false,
    completed: false
  });

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answerIndex }
    }));
  };

  const calculateScore = () => {
    if (!topic.quiz) return;
    
    let correct = 0;
    topic.quiz.questions.forEach(q => {
      if (quizState.answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    
    setQuizState(prev => ({
      ...prev,
      showResults: true,
      score: Math.round((correct / topic.quiz!.questions.length) * 100)
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: {},
      showResults: false,
      score: 0
    });
  };

  const nextQuestion = () => {
    if (topic.quiz && quizState.currentQuestion < topic.quiz.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  };

  const prevQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
      {/* Tab Navigation */}
      <div className="border-b dark:border-gray-600">
        <div className="flex">
          {topic.keyPoints && (
            <button
              onClick={() => setActiveTab('keypoints')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'keypoints'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-gray-800'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Target className="w-4 h-4" />
                핵심 포인트
              </div>
            </button>
          )}
          
          {topic.quiz && (
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'quiz'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-gray-800'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Brain className="w-4 h-4" />
                퀴즈
              </div>
            </button>
          )}
          
          {topic.practiceCase && (
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'practice'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-gray-800'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                실습 케이스
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-white dark:bg-gray-800">
        {/* Key Points Tab */}
        {activeTab === 'keypoints' && topic.keyPoints && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              {topic.title} 핵심 정리
            </h3>
            <ul className="space-y-3">
              {topic.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{point}</p>
                </li>
              ))}
            </ul>
            
            {/* 다음 학습으로 버튼 추가 */}
            {onComplete && (
              <div className="text-center pt-6">
                <button
                  onClick={onComplete}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
                >
                  다음 학습으로
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && topic.quiz && (
          <div>
            {!quizState.showResults ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    문제 {quizState.currentQuestion + 1} / {topic.quiz.questions.length}
                  </h3>
                  <div className="flex gap-1">
                    {topic.quiz.questions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === quizState.currentQuestion
                            ? 'bg-blue-600'
                            : quizState.answers[topic.quiz!.questions[index].id] !== undefined
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  <p className="text-lg mb-6">
                    {topic.quiz.questions[quizState.currentQuestion].question}
                  </p>
                  
                  <div className="space-y-3">
                    {topic.quiz.questions[quizState.currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(
                          topic.quiz!.questions[quizState.currentQuestion].id,
                          index
                        )}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          quizState.answers[topic.quiz!.questions[quizState.currentQuestion].id] === index
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            quizState.answers[topic.quiz!.questions[quizState.currentQuestion].id] === index
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {quizState.answers[topic.quiz!.questions[quizState.currentQuestion].id] === index && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={prevQuestion}
                    disabled={quizState.currentQuestion === 0}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    이전 문제
                  </button>
                  
                  {quizState.currentQuestion === topic.quiz.questions.length - 1 ? (
                    <button
                      onClick={calculateScore}
                      disabled={Object.keys(quizState.answers).length !== topic.quiz.questions.length}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      결과 확인
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      다음 문제
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <Trophy className={`w-20 h-20 mx-auto ${
                  quizState.score >= 80 ? 'text-yellow-500' : 'text-gray-400'
                }`} />
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">퀴즈 완료!</h3>
                  <p className="text-4xl font-bold text-blue-600">{quizState.score}점</p>
                </div>

                <div className="space-y-4 max-w-2xl mx-auto">
                  {topic.quiz.questions.map((q, index) => (
                    <div
                      key={q.id}
                      className={`text-left p-4 rounded-lg ${
                        quizState.answers[q.id] === q.correctAnswer
                          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                          : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {quizState.answers[q.id] === q.correctAnswer ? (
                          <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-1">{q.question}</p>
                          {quizState.answers[q.id] !== q.correctAnswer && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              정답: {q.options[q.correctAnswer]}
                            </p>
                          )}
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                            💡 {q.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-2 mx-auto px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <RotateCcw className="w-4 h-4" />
                  다시 풀기
                </button>
              </div>
            )}
          </div>
        )}

        {/* Practice Case Tab */}
        {activeTab === 'practice' && topic.practiceCase && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{topic.practiceCase.title}</h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>시나리오:</strong> {topic.practiceCase.scenario}
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
                <p className="font-medium mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-yellow-600" />
                  과제
                </p>
                <p className="text-gray-700 dark:text-gray-300">{topic.practiceCase.task}</p>
              </div>

              {/* Hints Section */}
              <div className="mb-6">
                <button
                  onClick={() => setPracticeState(prev => ({ ...prev, showHints: !prev.showHints }))}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <HelpCircle className="w-5 h-5" />
                  힌트 보기
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    practiceState.showHints ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {practiceState.showHints && (
                  <div className="mt-4 space-y-2">
                    {topic.practiceCase.hints.map((hint, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-blue-600">💡</span>
                        <p className="text-gray-700 dark:text-gray-300">{hint}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Solution Section */}
              <div>
                <button
                  onClick={() => setPracticeState(prev => ({ 
                    ...prev, 
                    showSolution: !prev.showSolution,
                    completed: true
                  }))}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                >
                  <Check className="w-5 h-5" />
                  해답 확인
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    practiceState.showSolution ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {practiceState.showSolution && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-gray-700 dark:text-gray-300">{topic.practiceCase.solution}</p>
                  </div>
                )}
              </div>
            </div>

            {practiceState.completed && (
              <div className="text-center pt-6 border-t dark:border-gray-700">
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <p className="font-medium text-green-600">실습 완료!</p>
                {onComplete && (
                  <button
                    onClick={onComplete}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    다음 학습으로
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}