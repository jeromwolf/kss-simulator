/**
 * Dynamic Chapter Page
 * Renders MDX content for each chapter
 */

import { notFound } from 'next/navigation';
import { ChapterLayout } from '../components/ChapterLayout';
import { getChapterById } from '../metadata';

// Dynamic imports for all chapters
const chapterComponents = {
  'llm-intro': () => import('../content/chapters/llm-intro.mdx'),
  'tokenization': () => import('../content/chapters/tokenization.mdx'),
  'embeddings': () => import('../content/chapters/embeddings.mdx'),
  'transformer-basics': () => import('../content/chapters/transformer-basics.mdx'),
  'attention-mechanism': () => import('../content/chapters/attention-mechanism.mdx'),
  'pre-training': () => import('../content/chapters/pre-training.mdx'),
  'fine-tuning': () => import('../content/chapters/fine-tuning.mdx'),
  'decoding-strategies': () => import('../content/chapters/decoding-strategies.mdx'),
  'evaluation-metrics': () => import('../content/chapters/evaluation-metrics.mdx'),
  'scaling-laws': () => import('../content/chapters/scaling-laws.mdx'),
  'challenges-limitations': () => import('../content/chapters/challenges-limitations.mdx'),
  'future-directions': () => import('../content/chapters/future-directions.mdx'),
};

interface ChapterPageProps {
  params: {
    chapterId: string;
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapterId } = params;
  
  // Get chapter metadata
  const chapterMeta = getChapterById(chapterId);
  if (!chapterMeta) {
    notFound();
  }

  // Get the component loader for this chapter
  const componentLoader = chapterComponents[chapterId as keyof typeof chapterComponents];
  if (!componentLoader) {
    // For chapters that don't have content yet, show a placeholder
    return (
      <ChapterLayout chapterId={chapterId}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-2">
              콘텐츠 준비 중
            </h2>
            <p className="text-amber-700 dark:text-amber-300">
              이 챕터의 콘텐츠는 현재 준비 중입니다. 곧 업데이트될 예정입니다.
            </p>
          </div>
        </div>
      </ChapterLayout>
    );
  }

  // Load and render the chapter content
  try {
    const ChapterContent = (await componentLoader()).default;
    
    return (
      <ChapterLayout chapterId={chapterId}>
        <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto">
          <ChapterContent />
        </article>
      </ChapterLayout>
    );
  } catch (error) {
    console.error('Error loading chapter content:', error);
    return (
      <ChapterLayout chapterId={chapterId}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
              오류 발생
            </h2>
            <p className="text-red-700 dark:text-red-300">
              챕터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>
          </div>
        </div>
      </ChapterLayout>
    );
  }
}

// Generate static params for all chapters
export async function generateStaticParams() {
  const { chapters } = await import('../metadata');
  
  return chapters.map((chapter) => ({
    chapterId: chapter.id,
  }));
}