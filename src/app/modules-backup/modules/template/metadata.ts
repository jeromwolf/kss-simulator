/**
 * Module Metadata Template
 * Replace all placeholders with your module information
 */

export interface ChapterMetadata {
  id: string;
  number: number;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
  objectives: string[];
  prerequisites?: string[];
  keywords: string[];
}

export interface ModuleMetadata {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalChapters: number;
  estimatedTotalTime: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningOutcomes: string[];
  chapters: ChapterMetadata[];
}

export const MODULE_METADATA: ModuleMetadata = {
  id: 'module-id', // e.g., 'quantum', 'rag', 'blockchain'
  title: 'Module Title',
  description: 'Brief description of what this module covers',
  icon: 'icon-name', // Lucide icon name
  color: '#000000', // Module theme color
  totalChapters: 3, // Update based on actual chapters
  estimatedTotalTime: 5, // Total hours
  difficulty: 'intermediate',
  prerequisites: [
    'Prerequisite 1',
    'Prerequisite 2'
  ],
  learningOutcomes: [
    'What students will learn 1',
    'What students will learn 2',
    'What students will learn 3'
  ],
  chapters: [
    {
      id: 'introduction',
      number: 1,
      title: 'Introduction',
      description: 'Overview of the topic',
      estimatedTime: 30,
      objectives: [
        'Understand basic concepts',
        'Learn key terminology',
        'Explore real-world applications'
      ],
      keywords: ['keyword1', 'keyword2']
    },
    {
      id: 'core-concepts',
      number: 2,
      title: 'Core Concepts',
      description: 'Deep dive into fundamental principles',
      estimatedTime: 60,
      objectives: [
        'Master core principles',
        'Apply concepts in practice',
        'Solve example problems'
      ],
      prerequisites: ['introduction'],
      keywords: ['concept1', 'concept2']
    },
    {
      id: 'advanced-topics',
      number: 3,
      title: 'Advanced Topics',
      description: 'Explore advanced applications and techniques',
      estimatedTime: 90,
      objectives: [
        'Learn advanced techniques',
        'Understand current research',
        'Build practical projects'
      ],
      prerequisites: ['core-concepts'],
      keywords: ['advanced1', 'advanced2']
    }
  ]
};

// Helper functions remain the same
export function getChapterById(chapterId: string): ChapterMetadata | undefined {
  return MODULE_METADATA.chapters.find(chapter => chapter.id === chapterId);
}

export function getNextChapter(currentChapterId: string): ChapterMetadata | undefined {
  const currentIndex = MODULE_METADATA.chapters.findIndex(
    chapter => chapter.id === currentChapterId
  );
  
  if (currentIndex === -1 || currentIndex === MODULE_METADATA.chapters.length - 1) {
    return undefined;
  }
  
  return MODULE_METADATA.chapters[currentIndex + 1];
}

export function getPreviousChapter(currentChapterId: string): ChapterMetadata | undefined {
  const currentIndex = MODULE_METADATA.chapters.findIndex(
    chapter => chapter.id === currentChapterId
  );
  
  if (currentIndex <= 0) {
    return undefined;
  }
  
  return MODULE_METADATA.chapters[currentIndex - 1];
}

export function calculateProgress(completedChapterIds: string[]): number {
  const completedCount = completedChapterIds.filter(id => 
    MODULE_METADATA.chapters.some(chapter => chapter.id === id)
  ).length;
  
  return Math.round((completedCount / MODULE_METADATA.totalChapters) * 100);
}