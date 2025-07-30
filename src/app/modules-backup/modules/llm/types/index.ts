/**
 * Type definitions for the LLM module
 */

// Progress tracking types
export interface ChapterProgress {
  chapterId: string;
  completed: boolean;
  completedAt?: Date;
  timeSpent: number; // in seconds
  lastAccessedAt: Date;
  quizScores?: QuizScore[];
  exerciseResults?: ExerciseResult[];
}

export interface ModuleProgress {
  moduleId: string;
  startedAt: Date;
  lastAccessedAt: Date;
  totalTimeSpent: number; // in seconds
  chaptersProgress: Record<string, ChapterProgress>;
  overallProgress: number; // percentage
}

// Quiz and exercise types
export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'code';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hints?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizScore {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  timeSpent: number;
  answers: Record<string, string | string[]>;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'coding' | 'interactive' | 'analysis';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  hints?: string[];
  solution?: string;
  testCases?: TestCase[];
}

export interface TestCase {
  input: any;
  expectedOutput: any;
  description?: string;
}

export interface ExerciseResult {
  exerciseId: string;
  completed: boolean;
  solution: string;
  testResults?: TestResult[];
  completedAt?: Date;
  timeSpent: number;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  actualOutput: any;
  error?: string;
}

// Simulator component props
export interface SimulatorProps {
  className?: string;
  onComplete?: (result: any) => void;
  initialState?: any;
}

// Content types for MDX
export interface ChapterContent {
  metadata: {
    title: string;
    description: string;
    estimatedTime: number;
    objectives: string[];
  };
  content: React.ComponentType;
}

// Navigation types
export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  completed?: boolean;
  current?: boolean;
}

// Interactive component types
export interface InteractiveComponentProps {
  id: string;
  onComplete?: (result: any) => void;
  className?: string;
}

// Tokenizer specific types
export interface Token {
  id: number;
  text: string;
  type: 'word' | 'subword' | 'special';
}

export interface TokenizerResult {
  tokens: Token[];
  tokenIds: number[];
  numTokens: number;
}

// Attention visualization types
export interface AttentionHead {
  name: string;
  weights: number[][];
}

export interface AttentionVisualizationData {
  tokens: string[];
  heads: AttentionHead[];
  layer: number;
}

// Model architecture types
export interface LayerConfig {
  type: 'embedding' | 'attention' | 'feedforward' | 'normalization' | 'output';
  name: string;
  params?: Record<string, any>;
}

export interface ModelArchitecture {
  name: string;
  layers: LayerConfig[];
  totalParams: number;
}

// Learning path types
export interface LearningPath {
  id: string;
  name: string;
  description: string;
  chapters: string[]; // chapter IDs in order
  estimatedTime: number; // in hours
}

// Export all types
export * from './api';
export * from './components';