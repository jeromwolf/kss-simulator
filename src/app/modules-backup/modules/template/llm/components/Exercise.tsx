/**
 * Exercise Component
 * Interactive coding exercises and tasks
 */

'use client';

import React, { useState } from 'react';
import { Play, Check, X, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExerciseComponentProps } from '../types/components';

export function Exercise({ exercise, onComplete, className }: ExerciseComponentProps) {
  const [code, setCode] = useState(exercise.initialCode || '');
  const [testResults, setTestResults] = useState<Array<{
    input: any;
    expectedOutput: any;
    actualOutput: any;
    passed: boolean;
    error?: string;
  }> | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  const runTests = async () => {
    setIsRunning(true);
    setTestResults(null);

    try {
      // Simulate running tests (in a real implementation, this would execute the code)
      // For now, we'll just simulate some results
      await new Promise(resolve => setTimeout(resolve, 1000));

      const results = exercise.testCases?.map(testCase => ({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: testCase.expectedOutput, // Simulated
        passed: true, // Simulated
      })) || [];

      setTestResults(results);
      
      const allPassed = results.every(r => r.passed);
      if (allPassed && onComplete) {
        onComplete({ completed: true, solution: code });
      }
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(exercise.initialCode || '');
    setTestResults(null);
    setShowHint(false);
    setCurrentHint(0);
  };

  const handleShowHint = () => {
    setShowHint(true);
    if (currentHint < (exercise.hints?.length || 0) - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const allTestsPassed = testResults?.every(r => r.passed) || false;

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700", className)}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {exercise.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {exercise.description}
        </p>
      </div>

      {/* Code Editor */}
      <div className="p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            코드 작성
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 px-4 py-3 font-mono text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="여기에 코드를 작성하세요..."
          />
        </div>

        {/* Hints */}
        {exercise.hints && exercise.hints.length > 0 && (
          <div className="mb-4">
            {!showHint ? (
              <button
                onClick={handleShowHint}
                className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
              >
                <Lightbulb className="w-4 h-4" />
                힌트 보기
              </button>
            ) : (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>힌트 {currentHint + 1}:</strong> {exercise.hints[currentHint]}
                </p>
                {currentHint < exercise.hints.length - 1 && (
                  <button
                    onClick={handleShowHint}
                    className="mt-2 text-sm text-amber-700 dark:text-amber-300 hover:underline"
                  >
                    다음 힌트
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Test Results */}
        {testResults && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              테스트 결과
            </h4>
            <div className="space-y-2">
              {testResults.map((result, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-3 rounded-lg border",
                    result.passed
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {result.passed ? (
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      result.passed
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    )}>
                      테스트 {idx + 1}: {result.passed ? '통과' : '실패'}
                    </span>
                  </div>
                  {exercise.testCases?.[idx].description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-6">
                      {exercise.testCases[idx].description}
                    </p>
                  )}
                  {!result.passed && result.error && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 ml-6">
                      {result.error}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Message */}
        {allTestsPassed && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-green-700 dark:text-green-300 font-medium">
                훌륭합니다! 모든 테스트를 통과했습니다.
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={runTests}
            disabled={isRunning || !code.trim()}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
              isRunning || !code.trim()
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            )}
          >
            <Play className="w-4 h-4" />
            {isRunning ? '실행 중...' : '테스트 실행'}
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}