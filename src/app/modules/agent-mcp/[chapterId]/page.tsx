'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Target } from 'lucide-react';
import { CHAPTERS } from '../metadata';
import ChapterContent from '../components/ChapterContent';

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = params.chapterId as string;
  const [completed, setCompleted] = useState(false);

  const chapter = CHAPTERS.find(c => c.id === chapterId);
  const currentIndex = CHAPTERS.findIndex(c => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : null;

  useEffect(() => {
    const progress = localStorage.getItem('agent-mcp-progress');
    if (progress) {
      const progressData = JSON.parse(progress);
      setCompleted(progressData[chapterId] || false);
    }
  }, [chapterId]);

  const markAsComplete = () => {
    const progress = localStorage.getItem('agent-mcp-progress');
    const progressData = progress ? JSON.parse(progress) : {};
    progressData[chapterId] = true;
    localStorage.setItem('agent-mcp-progress', JSON.stringify(progressData));
    setCompleted(true);
  };

  if (!chapter) {
    return <div>챕터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation */}
      <div className="mb-8">
        <Link 
          href="/modules/agent-mcp"
          className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          모듈 메인으로
        </Link>

        {/* Chapter Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">
              Chapter {chapter.id}
            </span>
            {completed && (
              <span className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircle className="w-5 h-5 mr-1" />
                완료
              </span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {chapter.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {chapter.description}
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {chapter.duration}
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              {chapter.objectives.length}개 학습 목표
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🎯 학습 목표
          </h2>
          <ul className="space-y-2">
            {chapter.objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-600 dark:text-purple-400 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chapter Content */}
      <ChapterContent chapterId={chapterId} />

      {/* Action Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4">
          {prevChapter && (
            <Link
              href={`/modules/agent-mcp/${prevChapter.id}`}
              className="flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전 챕터
            </Link>
          )}
          {nextChapter && (
            <Link
              href={`/modules/agent-mcp/${nextChapter.id}`}
              className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              다음 챕터
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          )}
        </div>
        
        {!completed && (
          <button
            onClick={markAsComplete}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            학습 완료
          </button>
        )}
      </div>
    </div>
  );
}