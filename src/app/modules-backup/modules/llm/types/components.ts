/**
 * Component-specific type definitions
 */

import { ReactNode } from 'react';

export interface ChapterLayoutProps {
  children: ReactNode;
  chapterId: string;
  showToc?: boolean;
  showProgress?: boolean;
}

export interface ChapterNavigationProps {
  currentChapterId: string;
  onNavigate?: (chapterId: string) => void;
}

export interface ChapterSidebarProps {
  chapters: Array<{
    id: string;
    number: number;
    title: string;
    completed?: boolean;
  }>;
  currentChapterId: string;
  onChapterSelect: (chapterId: string) => void;
  className?: string;
}

export interface ProgressTrackerProps {
  moduleId: string;
  className?: string;
  showDetails?: boolean;
}

export interface QuizComponentProps {
  quiz: {
    id: string;
    questions: Array<{
      id: string;
      type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'code';
      question: string;
      options?: string[];
      correctAnswer: string | string[];
      explanation: string;
      hints?: string[];
    }>;
  };
  onComplete?: (score: number, answers: Record<string, string | string[]>) => void;
  className?: string;
}

export interface ExerciseComponentProps {
  exercise: {
    id: string;
    title: string;
    description: string;
    type: 'coding' | 'interactive' | 'analysis';
    initialCode?: string;
    testCases?: Array<{
      input: any;
      expectedOutput: any;
      description?: string;
    }>;
  };
  onComplete?: (result: { completed: boolean; solution: string }) => void;
  className?: string;
}

export interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  theme?: 'light' | 'dark';
  onChange?: (code: string) => void;
  onRun?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
  className?: string;
}

export interface InteractiveVisualizationProps {
  type: 'tokenizer' | 'attention' | 'embedding' | 'architecture';
  data?: any;
  interactive?: boolean;
  className?: string;
}

export interface ChapterHeaderProps {
  chapter: {
    number: number;
    title: string;
    description: string;
    estimatedTime: number;
    objectives: string[];
  };
  progress?: {
    completed: boolean;
    timeSpent: number;
  };
  className?: string;
}

export interface LearningObjectivesProps {
  objectives: string[];
  completedObjectives?: string[];
  className?: string;
}

export interface ChapterFooterProps {
  chapterId: string;
  onComplete?: () => void;
  showQuiz?: boolean;
  showExercises?: boolean;
  className?: string;
}

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
}