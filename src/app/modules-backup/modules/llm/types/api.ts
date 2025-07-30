/**
 * API-related type definitions
 */

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: 'success' | 'error';
}

export interface ProgressUpdateRequest {
  moduleId: string;
  chapterId: string;
  updates: Partial<{
    completed: boolean;
    timeSpent: number;
    quizScore?: {
      quizId: string;
      score: number;
      totalQuestions: number;
    };
    exerciseResult?: {
      exerciseId: string;
      completed: boolean;
      solution: string;
    };
  }>;
}

export interface ProgressResponse {
  moduleProgress: number;
  chapterProgress: Record<string, boolean>;
  totalTimeSpent: number;
}

export interface ChapterDataRequest {
  moduleId: string;
  chapterId: string;
}

export interface ChapterDataResponse {
  content: string;
  quiz?: {
    id: string;
    questions: Array<{
      id: string;
      type: string;
      question: string;
      options?: string[];
    }>;
  };
  exercises?: Array<{
    id: string;
    title: string;
    type: string;
    difficulty: string;
  }>;
}