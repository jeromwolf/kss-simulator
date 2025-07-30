/**
 * Quiz Component
 * Interactive quiz for testing knowledge
 */

'use client';

import React, { useState } from 'react';
import { Check, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuizComponentProps } from '../types/components';

export function Quiz({ quiz, onComplete, className }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers({ ...answers, [questionId]: answer });
    setShowExplanation(null);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(null);
    } else {
      // Calculate score
      const correctCount = quiz.questions.filter(q => {
        const userAnswer = answers[q.id];
        const correct = q.correctAnswer;
        
        if (Array.isArray(correct) && Array.isArray(userAnswer)) {
          return correct.length === userAnswer.length && 
                 correct.every(a => userAnswer.includes(a));
        }
        return userAnswer === correct;
      }).length;

      const score = Math.round((correctCount / quiz.questions.length) * 100);
      
      setShowResults(true);
      if (onComplete) {
        onComplete(score, answers);
      }
    }
  };

  const handleShowExplanation = (questionId: string) => {
    setShowExplanation(showExplanation === questionId ? null : questionId);
  };

  const question = quiz.questions[currentQuestion];
  const isAnswered = answers[question?.id] !== undefined;

  if (showResults) {
    const correctCount = quiz.questions.filter(q => {
      const userAnswer = answers[q.id];
      const correct = q.correctAnswer;
      
      if (Array.isArray(correct) && Array.isArray(userAnswer)) {
        return correct.length === userAnswer.length && 
               correct.every(a => userAnswer.includes(a));
      }
      return userAnswer === correct;
    }).length;

    const score = Math.round((correctCount / quiz.questions.length) * 100);

    return (
      <div className={cn("bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700", className)}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">퀴즈 결과</h3>
        
        <div className="mb-6 text-center">
          <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {score}%
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {quiz.questions.length}개 중 {correctCount}개 정답
          </p>
        </div>

        <div className="space-y-3">
          {quiz.questions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const isCorrect = Array.isArray(q.correctAnswer) 
              ? Array.isArray(userAnswer) && q.correctAnswer.length === userAnswer.length && 
                q.correctAnswer.every(a => userAnswer.includes(a))
              : userAnswer === q.correctAnswer;

            return (
              <div key={q.id} className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  isCorrect 
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                )}>
                  {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  문제 {idx + 1}: {isCorrect ? '정답' : '오답'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700", className)}>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            문제 {currentQuestion + 1} / {quiz.questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {question.question}
        </h4>

        {/* Options */}
        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-2">
            {question.options.map((option, idx) => (
              <label key={idx} className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="mr-3 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="space-y-2">
            {['참', '거짓'].map((option) => (
              <label key={option} className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="mr-3 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Explanation */}
      {isAnswered && (
        <div className="mb-6">
          <button
            onClick={() => handleShowExplanation(question.id)}
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            {showExplanation === question.id ? '설명 숨기기' : '설명 보기'}
          </button>
          
          {showExplanation === question.id && (
            <div className="mt-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {question.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
            isAnswered
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
          )}
        >
          {currentQuestion < quiz.questions.length - 1 ? '다음 문제' : '결과 보기'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}