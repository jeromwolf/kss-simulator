'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, BookOpen } from 'lucide-react';
import { multiAgentMetadata } from '../metadata';
import { notFound } from 'next/navigation';
import ChapterContent from '../components/ChapterContent';

interface PageProps {
  params: {
    chapterId: string;
  };
}

export default function ChapterPage({ params }: PageProps) {
  const chapter = multiAgentMetadata.chapters.find(
    (ch) => ch.id === params.chapterId
  );

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!chapter) return;
    
    const savedProgress = localStorage.getItem('multi-agent-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompleted(progress[chapter.id] || false);
    }
  }, [chapter]);

  if (!chapter) {
    notFound();
  }

  const currentIndex = multiAgentMetadata.chapters.findIndex(ch => ch.id === chapter.id);
  const prevChapter = currentIndex > 0 ? multiAgentMetadata.chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < multiAgentMetadata.chapters.length - 1 ? multiAgentMetadata.chapters[currentIndex + 1] : null;

  const markAsComplete = () => {
    const savedProgress = localStorage.getItem('multi-agent-progress');
    const progress = savedProgress ? JSON.parse(savedProgress) : {};
    progress[chapter.id] = true;
    localStorage.setItem('multi-agent-progress', JSON.stringify(progress));
    setCompleted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation */}
      <div className="mb-8">
        <Link
          href="/modules/multi-agent"
          className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          멀티 에이전트 시스템으로 돌아가기
        </Link>
      </div>

      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="text-4xl font-bold text-orange-500 mr-4">
              {String(chapter.number).padStart(2, '0')}
            </span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {chapter.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                {chapter.description}
              </p>
            </div>
          </div>
          {completed && (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle className="w-6 h-6 mr-2" />
              <span className="font-semibold">완료됨</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {chapter.duration}
          </span>
          <span className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            {chapter.topics.length}개 주제
          </span>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">학습 내용</h2>
        
        <ChapterContent chapterId={chapter.id} />

        {/* Topics */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            학습 주제
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {chapter.topics.map((topic, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                <span className="text-gray-700 dark:text-gray-300">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-8">
        <div>
          {prevChapter && (
            <Link
              href={`/modules/multi-agent/${prevChapter.id}`}
              className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전: {prevChapter.title}
            </Link>
          )}
        </div>

        {!completed && (
          <button
            onClick={markAsComplete}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            학습 완료로 표시
          </button>
        )}

        <div>
          {nextChapter && (
            <Link
              href={`/modules/multi-agent/${nextChapter.id}`}
              className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
            >
              다음: {nextChapter.title}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}