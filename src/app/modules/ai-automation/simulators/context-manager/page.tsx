'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, Plus, Trash2, Edit3, Save, Upload, Download, FolderOpen, Settings, AlertCircle, CheckCircle } from 'lucide-react'

interface ContextFile {
  id: string
  name: string
  content: string
  type: 'claude' | 'cursor' | 'custom'
  priority: number
  lastModified: Date
  tokens: number
}

const defaultContexts = {
  claude: `# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고할 지침을 제공합니다.

## 프로젝트 개요

Next.js 14 기반의 모던 웹 애플리케이션입니다.

## 기술 스택
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand

## 코딩 규칙
1. 함수형 컴포넌트 사용
2. TypeScript 타입 정의 필수
3. 에러 처리 포함
4. 의미있는 변수명 사용

## 개발 명령어
\`\`\`bash
npm run dev   # 개발 서버
npm run build # 프로덕션 빌드
npm run test  # 테스트 실행
\`\`\`

## 중요 사항
- 항상 타입 안정성 확보
- 성능 최적화 고려
- 접근성 준수`,
  cursor: `{
  "name": "My Project",
  "version": "1.0.0",
  "description": "Cursor 설정 파일",
  "rules": [
    {
      "pattern": "*.tsx",
      "instructions": "React 컴포넌트는 함수형으로 작성하고 TypeScript를 사용하세요"
    },
    {
      "pattern": "*.css",
      "instructions": "Tailwind CSS 클래스를 우선 사용하세요"
    }
  ],
  "context": {
    "framework": "Next.js 14",
    "language": "TypeScript",
    "testing": "Jest + React Testing Library"
  },
  "customCommands": [
    {
      "name": "component",
      "template": "export default function {name}() { return <div>{name}</div> }"
    }
  ]
}`,
  custom: `# 프로젝트 컨텍스트

## 비즈니스 요구사항
- 사용자 친화적인 인터페이스
- 빠른 로딩 속도
- 모바일 반응형 디자인

## API 엔드포인트
- GET /api/users - 사용자 목록
- POST /api/users - 사용자 생성
- PUT /api/users/:id - 사용자 수정
- DELETE /api/users/:id - 사용자 삭제

## 데이터베이스 스키마
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP
);
\`\`\`

## 환경 변수
- DATABASE_URL: PostgreSQL 연결 문자열
- JWT_SECRET: JWT 토큰 시크릿
- API_KEY: 외부 API 키`
}

export default function ContextManagerPage() {
  const [contextFiles, setContextFiles] = useState<ContextFile[]>([
    {
      id: '1',
      name: 'CLAUDE.md',
      content: defaultContexts.claude,
      type: 'claude',
      priority: 1,
      lastModified: new Date(),
      tokens: Math.floor(defaultContexts.claude.length / 4)
    }
  ])
  const [selectedFile, setSelectedFile] = useState<ContextFile | null>(contextFiles[0])
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [showTemplates, setShowTemplates] = useState(false)

  const addContextFile = (type: 'claude' | 'cursor' | 'custom', name?: string) => {
    const newFile: ContextFile = {
      id: Date.now().toString(),
      name: name || (type === 'claude' ? 'CLAUDE.md' : type === 'cursor' ? '.cursorrules' : 'context.md'),
      content: defaultContexts[type],
      type,
      priority: contextFiles.length + 1,
      lastModified: new Date(),
      tokens: Math.floor(defaultContexts[type].length / 4)
    }
    setContextFiles([...contextFiles, newFile])
    setSelectedFile(newFile)
  }

  const deleteContextFile = (id: string) => {
    setContextFiles(contextFiles.filter(f => f.id !== id))
    if (selectedFile?.id === id) {
      setSelectedFile(contextFiles[0] || null)
    }
  }

  const startEdit = () => {
    if (selectedFile) {
      setEditContent(selectedFile.content)
      setEditMode(true)
    }
  }

  const saveEdit = () => {
    if (selectedFile) {
      const updatedFiles = contextFiles.map(f =>
        f.id === selectedFile.id
          ? {
              ...f,
              content: editContent,
              lastModified: new Date(),
              tokens: Math.floor(editContent.length / 4)
            }
          : f
      )
      setContextFiles(updatedFiles)
      setSelectedFile({
        ...selectedFile,
        content: editContent,
        tokens: Math.floor(editContent.length / 4)
      })
      setEditMode(false)
    }
  }

  const exportContext = () => {
    const exportData = {
      files: contextFiles,
      exportDate: new Date().toISOString(),
      totalTokens: contextFiles.reduce((sum, f) => sum + f.tokens, 0)
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'context-export.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importContext = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string)
            if (data.files && Array.isArray(data.files)) {
              setContextFiles(data.files)
              setSelectedFile(data.files[0] || null)
            }
          } catch (error) {
            console.error('Failed to import context:', error)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const calculateTokenUsage = () => {
    const total = contextFiles.reduce((sum, f) => sum + f.tokens, 0)
    const maxTokens = 200000 // Claude's context window
    const percentage = (total / maxTokens) * 100
    return { total, percentage, remaining: maxTokens - total }
  }

  const tokenUsage = calculateTokenUsage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/modules/ai-automation"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          AI 자동화 도구로 돌아가기
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  컨텍스트 관리자
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  AI 도구를 위한 프로젝트 컨텍스트를 관리하세요
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={importContext}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                가져오기
              </button>
              <button
                onClick={exportContext}
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                내보내기
              </button>
            </div>
          </div>

          {/* Token Usage */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                토큰 사용량
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {tokenUsage.total.toLocaleString()} / 200,000
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  tokenUsage.percentage > 80
                    ? 'bg-red-500'
                    : tokenUsage.percentage > 60
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(tokenUsage.percentage, 100)}%` }}
              />
            </div>
            {tokenUsage.percentage > 80 && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                토큰 한도에 근접했습니다
              </div>
            )}
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* File List */}
            <div className="col-span-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-white">컨텍스트 파일</h3>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="p-2 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {showTemplates && (
                <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-3 space-y-2">
                  <button
                    onClick={() => addContextFile('claude')}
                    className="w-full text-left px-3 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">CLAUDE.md</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Claude Code 컨텍스트</div>
                  </button>
                  <button
                    onClick={() => addContextFile('cursor')}
                    className="w-full text-left px-3 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">.cursorrules</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Cursor 설정 파일</div>
                  </button>
                  <button
                    onClick={() => addContextFile('custom')}
                    className="w-full text-left px-3 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">커스텀</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">사용자 정의 컨텍스트</div>
                  </button>
                </div>
              )}

              <div className="space-y-2">
                {contextFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedFile?.id === file.id
                        ? 'bg-violet-100 dark:bg-violet-900/30 border-2 border-violet-500'
                        : 'bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:border-violet-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                          {file.tokens.toLocaleString()} 토큰
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteContextFile(file.id)
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Editor */}
            <div className="col-span-8">
              {selectedFile ? (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {selectedFile.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span>{selectedFile.tokens.toLocaleString()} 토큰</span>
                        <span>•</span>
                        <span>
                          마지막 수정: {selectedFile.lastModified.toLocaleString('ko-KR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {editMode ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            저장
                          </button>
                          <button
                            onClick={() => setEditMode(false)}
                            className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          >
                            취소
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={startEdit}
                          className="px-3 py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center gap-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          편집
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 overflow-hidden">
                    {editMode ? (
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full h-full bg-transparent text-gray-700 dark:text-gray-300 font-mono text-sm resize-none focus:outline-none"
                        spellCheck={false}
                      />
                    ) : (
                      <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm whitespace-pre-wrap">
                        {selectedFile.content}
                      </pre>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  파일을 선택하거나 새로 추가하세요
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            💡 컨텍스트 관리 베스트 프랙티스
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                CLAUDE.md
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 프로젝트 구조 설명</li>
                <li>• 코딩 규칙과 스타일</li>
                <li>• 중요한 비즈니스 로직</li>
                <li>• 자주 사용하는 명령어</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                토큰 최적화
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 핵심 정보만 포함</li>
                <li>• 중복 내용 제거</li>
                <li>• 우선순위별 구성</li>
                <li>• 정기적인 업데이트</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                팀 협업
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 버전 관리 시스템 연동</li>
                <li>• 팀 공통 규칙 문서화</li>
                <li>• 정기적인 리뷰</li>
                <li>• 변경사항 공유</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}