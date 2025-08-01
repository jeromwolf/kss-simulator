export interface Module {
  id: string
  name: string
  nameKo: string
  description: string
  version: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  icon: string
  color: string
  
  prerequisites?: string[]
  dependencies?: string[]
  
  chapters: Chapter[]
  simulators: Simulator[]
  tools: Tool[]
}

export interface Chapter {
  id: string
  title: string
  description: string
  estimatedMinutes: number
  keywords: string[]
  learningObjectives?: string[]
  prerequisites?: string[]
}

export interface Simulator {
  id: string
  name: string
  description: string
  component: string
}

export interface Tool {
  id: string
  name: string
  description: string
  url: string
}