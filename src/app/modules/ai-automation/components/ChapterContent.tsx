'use client'

import { Terminal, GitBranch, FileCode, Zap, Settings, Brain, Code2, Workflow } from 'lucide-react'

export default function ChapterContent({ chapterId }: { chapterId: number }) {
  const content = getChapterContent(chapterId)
  return <div className="prose prose-lg dark:prose-invert max-w-none">{content}</div>
}

function getChapterContent(chapterId: number) {
  switch (chapterId) {
    case 1:
      return <Chapter1 />
    case 2:
      return <Chapter2 />
    case 3:
      return <Chapter3 />
    case 4:
      return <Chapter4 />
    case 5:
      return <Chapter5 />
    case 6:
      return <Chapter6 />
    case 7:
      return <Chapter7 />
    case 8:
      return <Chapter8 />
    case 9:
      return <Chapter9 />
    default:
      return <div>챕터 콘텐츠를 준비 중입니다.</div>
  }
}

function Chapter1() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          AI 자동화 시대의 도래
        </h2>
        
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            2024년, 우리는 AI가 단순한 도구를 넘어 개발자의 진정한 파트너가 되는 시대를 맞이했습니다.
            Claude Code, Cursor, Windsurf 같은 혁신적인 도구들이 등장하며, 
            개발 생산성은 문자 그대로 10배 이상 향상되고 있습니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚀 패러다임의 변화
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Before AI (2020)</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• 수동 코드 작성: 100%</li>
              <li>• 디버깅 시간: 전체의 40%</li>
              <li>• 보일러플레이트: 반복 작성</li>
              <li>• 리팩토링: 수일 소요</li>
              <li>• 문서화: 종종 누락</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-violet-200 dark:border-violet-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">With AI (2024)</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>✨ AI 제안 코드: 70-80%</li>
              <li>✨ 즉각적 버그 감지</li>
              <li>✨ 자동 생성 템플릿</li>
              <li>✨ 실시간 리팩토링</li>
              <li>✨ 자동 문서화</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          📊 실제 생산성 향상 사례
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">CRUD API 개발</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">2시간 → </span>
                <span className="font-bold text-violet-600 dark:text-violet-400">10분</span>
                <span className="text-green-600 dark:text-green-400 text-sm">12x 향상</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">React 컴포넌트 생성</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">30분 → </span>
                <span className="font-bold text-violet-600 dark:text-violet-400">2분</span>
                <span className="text-green-600 dark:text-green-400 text-sm">15x 향상</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">테스트 코드 작성</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">1시간 → </span>
                <span className="font-bold text-violet-600 dark:text-violet-400">5분</span>
                <span className="text-green-600 dark:text-green-400 text-sm">12x 향상</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">버그 수정</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">45분 → </span>
                <span className="font-bold text-violet-600 dark:text-violet-400">5분</span>
                <span className="text-green-600 dark:text-green-400 text-sm">9x 향상</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🎯 AI 도구 선택 가이드
        </h3>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              Claude Code - 대규모 프로젝트 자동화
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              전체 프로젝트 컨텍스트를 이해하고 복잡한 리팩토링이나 기능 구현이 필요할 때
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                MCP 지원
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                CLAUDE.md
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                CLI 기반
              </span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-purple-500">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              Cursor - 실시간 코딩 파트너
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              IDE 내에서 즉각적인 코드 제안과 수정이 필요한 일상적인 개발 작업
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm">
                Copilot++
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm">
                Chat 모드
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm">
                Composer
              </span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-green-500">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              Windsurf - 플로우 기반 개발
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              여러 파일을 동시에 수정하며 전체적인 코드 플로우를 관리해야 할 때
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                Cascade
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                Multi-file
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                Supercomplete
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          💡 핵심 인사이트
        </h3>
        
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-violet-600 dark:text-violet-400 mt-1">1.</span>
              <span className="text-gray-700 dark:text-gray-300">
                AI 도구는 개발자를 대체하는 것이 아니라 증강시킵니다
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-600 dark:text-violet-400 mt-1">2.</span>
              <span className="text-gray-700 dark:text-gray-300">
                각 도구의 강점을 이해하고 상황에 맞게 선택하는 것이 중요합니다
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-600 dark:text-violet-400 mt-1">3.</span>
              <span className="text-gray-700 dark:text-gray-300">
                프롬프트 엔지니어링 능력이 새로운 핵심 역량이 되었습니다
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-600 dark:text-violet-400 mt-1">4.</span>
              <span className="text-gray-700 dark:text-gray-300">
                AI와의 협업 워크플로우를 구축하는 것이 경쟁력의 핵심입니다
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

function Chapter2() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Claude Code 완벽 가이드
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Claude Code는 Anthropic이 공식 제공하는 CLI 도구로, 
            터미널에서 직접 Claude와 대화하며 코드를 생성하고 수정할 수 있습니다.
            MCP(Model Context Protocol)를 지원하여 프로젝트 전체를 이해하고 작업합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚀 설치 및 초기 설정
        </h3>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`# npm을 통한 설치
npm install -g @anthropic/claude-code

# 또는 Homebrew (macOS)
brew install claude-code

# API 키 설정
export ANTHROPIC_API_KEY="your-api-key"

# 프로젝트 초기화
claude-code init

# MCP 설정 파일 생성
claude-code mcp init`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          📁 CLAUDE.md - 프로젝트 컨텍스트 관리
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            CLAUDE.md는 프로젝트의 컨텍스트를 Claude에게 전달하는 핵심 파일입니다.
            이 파일을 통해 프로젝트의 구조, 규칙, 목표를 명확히 전달할 수 있습니다.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# CLAUDE.md 예시

## Project Overview
Next.js 14 기반의 e-commerce 플랫폼

## Technical Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Database: PostgreSQL + Prisma

## Coding Conventions
- 함수명: camelCase
- 컴포넌트: PascalCase
- 상수: UPPER_SNAKE_CASE

## Current Focus
장바구니 기능 구현 중
- [ ] 상품 추가/삭제
- [ ] 수량 변경
- [ ] 가격 계산

## Important Notes
- 모든 API는 /api/v1 prefix 사용
- 에러 처리는 custom ErrorBoundary 사용
- 테스트는 Jest + RTL 사용`}</pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          💬 효과적인 프롬프트 작성법
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3">❌ 나쁜 예시</h4>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded p-3">
                <code className="text-sm text-gray-700 dark:text-gray-300">
                  "로그인 기능 만들어줘"
                </code>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-3">
                <code className="text-sm text-gray-700 dark:text-gray-300">
                  "버그 고쳐줘"
                </code>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-3">
                <code className="text-sm text-gray-700 dark:text-gray-300">
                  "최적화 해줘"
                </code>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-3">✅ 좋은 예시</h4>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded p-3">
                <code className="text-sm text-gray-700 dark:text-gray-300">
                  "NextAuth.js를 사용해서 Google OAuth 로그인 구현. 
                  사용자 정보는 Prisma로 PostgreSQL에 저장"
                </code>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-3">
                <code className="text-sm text-gray-700 dark:text-gray-300">
                  "CartContext의 updateQuantity 함수에서 음수 값이 
                  들어올 때 발생하는 TypeError 수정"
                </code>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-3">
                <code className="text-sm text-gray-700 dark:text-gray-300">
                  "ProductList 컴포넌트의 리렌더링 최적화. 
                  React.memo와 useMemo 활용"
                </code>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🛠️ MCP (Model Context Protocol) 활용
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            MCP는 Claude가 프로젝트의 도구와 리소스에 접근할 수 있게 하는 프로토콜입니다.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <h5 className="font-bold text-gray-900 dark:text-white mb-2">mcp.json 설정</h5>
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`{
  "servers": {
    "filesystem": {
      "command": "mcp-server-filesystem",
      "args": ["--root", "./src"]
    },
    "git": {
      "command": "mcp-server-git",
      "args": ["--repo", "."]
    },
    "database": {
      "command": "mcp-server-postgres",
      "env": {
        "DATABASE_URL": "$DATABASE_URL"
      }
    }
  }
}`}</pre>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                파일시스템 접근
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                Git 히스토리
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                데이터베이스 스키마
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                API 문서
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-8">
          🎯 실전 활용 예시
        </h3>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              전체 기능 구현
            </h4>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`claude-code "다음 요구사항으로 상품 리뷰 시스템 구현:
1. Review 모델 생성 (rating, comment, userId, productId)
2. CRUD API 엔드포인트 (/api/v1/reviews)
3. ReviewList, ReviewForm 컴포넌트
4. 평점 평균 계산 및 표시
5. 이미지 업로드 지원 (최대 3장)
6. Jest 테스트 코드 포함"`}</pre>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              리팩토링
            </h4>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`claude-code refactor "src/components/ProductCard.tsx를 
다음 기준으로 리팩토링:
- 비즈니스 로직을 커스텀 훅으로 분리
- 스타일 컴포넌트 분리
- 메모이제이션 적용
- Storybook 스토리 생성"`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          💡 Pro Tips
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <Terminal className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">세션 관리</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              `--resume` 플래그로 이전 대화 이어가기
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <FileCode className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">컨텍스트 제한</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              `.claudeignore` 파일로 불필요한 파일 제외
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <GitBranch className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">버전 관리</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              작업 전 브랜치 생성, 완료 후 PR 자동 생성
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <Settings className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">프로필 설정</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              프로젝트별 다른 설정 프로필 사용
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter3() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Gemini CLI & AI Studio
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Google의 Gemini는 최신 멀티모달 AI 모델로, CLI 도구와 AI Studio를 통해
            강력한 개발 경험을 제공합니다. 이미지, 비디오, 오디오를 포함한 다양한 형태의
            입력을 처리할 수 있으며, Function Calling과 Grounding으로 실제 애플리케이션에 통합할 수 있습니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚀 Gemini CLI 설치 및 설정
        </h3>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`# npm을 통한 설치
npm install -g @google/generative-ai-cli

# 또는 Python pip
pip install google-generativeai-cli

# API 키 설정
export GOOGLE_API_KEY="your-api-key"

# 또는 gcloud를 통한 인증
gcloud auth application-default login

# Gemini CLI 초기화
gemini init

# 프로젝트 설정
gemini config set project-id YOUR_PROJECT_ID`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🎯 주요 CLI 명령어
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">기본 명령어</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">텍스트 생성</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">gemini generate</kbd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">이미지 분석</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">gemini vision</kbd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">코드 생성</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">gemini code</kbd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 dark:text-gray-300">대화형 세션</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">gemini chat</kbd>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">고급 기능</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Function Calling</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">gemini function</kbd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">파일 업로드</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">gemini upload</kbd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">임베딩 생성</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">gemini embed</kbd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 dark:text-gray-300">모델 튜닝</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">gemini tune</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🌟 멀티모달 처리 능력
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              <Code2 className="inline w-5 h-5 mr-2" />
              이미지 & 비디오 분석
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 이미지에서 텍스트 추출 (OCR)</li>
              <li>• 비디오 내용 요약 및 분석</li>
              <li>• 다이어그램과 차트 해석</li>
              <li>• 스크린샷 기반 코드 생성</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              <Brain className="inline w-5 h-5 mr-2" />
              오디오 & 문서 처리
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 음성 파일 텍스트 변환</li>
              <li>• PDF 문서 전체 분석</li>
              <li>• 대용량 파일 처리 (최대 2GB)</li>
              <li>• 다국어 실시간 번역</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🎨 AI Studio 활용
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">프롬프트 테스트 및 최적화</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                AI Studio에서 다양한 프롬프트를 테스트하고 최적의 결과를 찾아냅니다
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# 예시: 코드 리뷰 프롬프트
gemini generate \\
  --prompt "Review this code for security vulnerabilities" \\
  --file ./src/api/auth.js \\
  --model gemini-2.0-flash \\
  --temperature 0.2`}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Function Calling 구현</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                외부 API와 연동하여 실시간 데이터 처리
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# Function 정의 및 실행
gemini function create \\
  --name "get_weather" \\
  --description "Get current weather for a location" \\
  --parameters '{"location": "string", "unit": "celsius|fahrenheit"}'

# Function과 함께 프롬프트 실행
gemini chat --functions weather_api.json`}</pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ⚙️ Grounding & 실시간 검색
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Gemini의 Grounding 기능으로 실시간 웹 정보와 Google 검색 결과를 활용할 수 있습니다.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs whitespace-nowrap">
{`# Grounding 활성화 예시
gemini generate \\
  --prompt "최신 React 19 기능을 활용한 컴포넌트 작성" \\
  --grounding-source "google-search" \\
  --grounding-threshold 0.7

# 특정 웹사이트 참조  
gemini generate \\
  --prompt "이 라이브러리의 최신 버전 문법으로 코드 작성" \\
  --grounding-urls "https://docs.library.com" \\
  --model gemini-2.0-pro

# 프로젝트 컨텍스트 파일 설정 (.gemini-context.yaml)
context:
  project_type: "Next.js 14 App"
  language: "TypeScript"
  styling: "Tailwind CSS"
  database: "PostgreSQL with Prisma"
  
rules:
  - "Always use App Router patterns"
  - "Implement proper error boundaries"
  - "Use server components by default"
  
grounding:
  enabled: true
  sources:
    - "google-search"
    - "github"
    - "stackoverflow"`}</pre>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          🎯 Gemini 활용 실전 팁
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
              멀티모달 최적화
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              이미지와 코드를 함께 입력하여 UI 구현
            </p>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">
              컨텍스트 윈도우 활용
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              2M 토큰까지 한 번에 처리 가능
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">
              모델 선택 가이드
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Flash: 빠른 응답, Pro: 복잡한 추론
            </p>
          </div>
          
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4">
            <h4 className="font-bold text-pink-700 dark:text-pink-400 mb-2">
              API 비용 최적화
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              캐싱과 배치 처리로 비용 절감
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter4() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Cursor IDE 마스터하기
        </h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Cursor는 AI-First 철학으로 만들어진 IDE로, VS Code를 기반으로 하면서도
            AI 기능을 핵심에 둔 혁신적인 개발 환경입니다. Copilot++와 Chat 기능으로
            코딩 속도를 극적으로 향상시킬 수 있습니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ⚡ 핵심 기능과 단축키
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">필수 단축키</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">AI Chat 열기</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Cmd+K</kbd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Composer 모드</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Cmd+I</kbd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">코드 생성</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Cmd+Shift+K</kbd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 dark:text-gray-300">AI 수정 제안</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Tab</kbd>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">고급 기능</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Codebase 검색</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">@codebase</kbd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">웹 검색</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">@web</kbd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">문서 참조</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">@docs</kbd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 dark:text-gray-300">Git 정보</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">@git</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚀 Copilot++ 활용법
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              <Code2 className="inline w-5 h-5 mr-2" />
              자동 완성 최적화
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 함수 시그니처만 작성하면 전체 구현 제안</li>
              <li>• 주석으로 의도 설명 → 코드 자동 생성</li>
              <li>• 테스트 케이스 자동 생성</li>
              <li>• 에러 메시지 기반 자동 수정</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              <Brain className="inline w-5 h-5 mr-2" />
              컨텍스트 활용
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 열린 파일들을 자동으로 컨텍스트로 사용</li>
              <li>• 최근 수정 내역 참조</li>
              <li>• 프로젝트 구조 이해</li>
              <li>• 의존성 자동 import</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          💬 Chat & Composer 모드
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Chat 모드 (Cmd+K)</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                코드에 대한 질문, 설명 요청, 버그 수정 제안 등 대화형 인터랙션
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm">
{`// 예시 프롬프트
"이 함수의 시간 복잡도를 O(n)으로 최적화해줘"
"이 컴포넌트를 TypeScript로 변환해줘"
"이 코드에 메모리 누수가 있는지 확인해줘"`}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Composer 모드 (Cmd+I)</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                여러 파일을 동시에 수정하는 대규모 변경 작업
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm">
{`// 예시 프롬프트
"모든 API 엔드포인트에 rate limiting 추가"
"전체 프로젝트를 Tailwind CSS로 마이그레이션"
"모든 클래스 컴포넌트를 함수형으로 변환"`}</pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ⚙️ 커스텀 Rules 설정
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            .cursorrules 파일로 프로젝트별 AI 동작을 커스터마이징할 수 있습니다.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# .cursorrules 예시

You are an expert in React, Next.js, and TypeScript.

## Code Style
- Use functional components with hooks
- Prefer const over let
- Use optional chaining and nullish coalescing
- Always use TypeScript strict mode

## Naming Conventions
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case

## Best Practices
- Implement error boundaries for all pages
- Use React.memo for expensive components
- Prefer composition over inheritance
- Always handle loading and error states

## Forbidden
- Never use var
- Avoid any type unless absolutely necessary
- Don't use inline styles`}</pre>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          🎯 실전 팁
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">
              대용량 파일 처리
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              10,000줄 이상 파일은 부분 선택 후 처리
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
              멀티 커서 활용
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Cmd+D로 동일 단어 선택 후 AI 수정
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">
              컨텍스트 최적화
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              관련 파일만 열어두고 작업
            </p>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-2">
              히스토리 활용
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              이전 대화 참조로 일관성 유지
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter5() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Windsurf와 Cascade
        </h2>
        
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Windsurf는 Codeium이 개발한 차세대 AI IDE로, Cascade 플로우 모드를 통해
            복잡한 멀티파일 편집을 자연스럽게 처리합니다. AI가 코드의 흐름을 이해하고
            전체 프로젝트 차원에서 일관된 변경을 수행합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🌊 Cascade 플로우 모드
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Cascade는 단순한 코드 생성을 넘어, 전체 작업 흐름을 이해하고 실행하는 AI 모드입니다.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">작동 원리</h4>
              <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>1️⃣ 작업 의도 파악: 자연어로 설명한 목표 이해</li>
                <li>2️⃣ 영향 범위 분석: 수정이 필요한 모든 파일 식별</li>
                <li>3️⃣ 순차적 실행: 의존성을 고려한 단계별 수정</li>
                <li>4️⃣ 일관성 검증: 변경사항의 전체적 일관성 확인</li>
                <li>5️⃣ 자동 테스트: 변경 후 테스트 실행 및 수정</li>
              </ol>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <Workflow className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">멀티파일 리팩토링</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  연관된 모든 파일을 동시에 수정
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-2" />
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">스마트 임포트</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  필요한 의존성 자동 추가 및 정리
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">컨텍스트 유지</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  프로젝트 전체 맥락 이해
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">자동 최적화</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  코드 품질 자동 개선
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ⚡ Supercomplete 기능
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Supercomplete는 단순 자동완성을 넘어 전체 로직을 이해하고 구현합니다.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`// 입력: 함수 시그니처만 작성
async function fetchUserWithPosts(userId: string) {

// Supercomplete가 자동 생성:
async function fetchUserWithPosts(userId: string) {
  try {
    // 사용자 정보 가져오기
    const userResponse = await fetch(\`/api/users/\${userId}\`);
    if (!userResponse.ok) {
      throw new Error(\`Failed to fetch user: \${userResponse.status}\`);
    }
    const user = await userResponse.json();
    
    // 사용자의 포스트 가져오기
    const postsResponse = await fetch(\`/api/users/\${userId}/posts\`);
    if (!postsResponse.ok) {
      throw new Error(\`Failed to fetch posts: \${postsResponse.status}\`);
    }
    const posts = await postsResponse.json();
    
    // 각 포스트의 댓글 수 가져오기
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const commentsResponse = await fetch(\`/api/posts/\${post.id}/comments/count\`);
        const { count } = await commentsResponse.json();
        return { ...post, commentCount: count };
      })
    );
    
    return {
      ...user,
      posts: postsWithComments,
      postCount: postsWithComments.length
    };
  } catch (error) {
    console.error('Error fetching user with posts:', error);
    throw error;
  }
}`}</pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🎯 Command 모드 활용
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">주요 명령어</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <code className="text-sm text-gray-700 dark:text-gray-300">@generate</code>
                  <span className="text-xs text-gray-500">전체 기능 생성</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <code className="text-sm text-gray-700 dark:text-gray-300">@refactor</code>
                  <span className="text-xs text-gray-500">코드 리팩토링</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <code className="text-sm text-gray-700 dark:text-gray-300">@test</code>
                  <span className="text-xs text-gray-500">테스트 코드 생성</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <code className="text-sm text-gray-700 dark:text-gray-300">@optimize</code>
                  <span className="text-xs text-gray-500">성능 최적화</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <code className="text-sm text-gray-700 dark:text-gray-300">@explain</code>
                  <span className="text-xs text-gray-500">코드 설명</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">실전 예시</h4>
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`// 전체 CRUD API 생성
@generate "User CRUD API with validation and error handling"

// 성능 최적화
@optimize "Reduce re-renders in ProductList component"

// 테스트 생성
@test "Add integration tests for checkout flow"`}</pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🔥 Windsurf vs 다른 도구
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <th className="border border-gray-200 dark:border-gray-700 p-3 text-left">기능</th>
                <th className="border border-gray-200 dark:border-gray-700 p-3 text-center">Windsurf</th>
                <th className="border border-gray-200 dark:border-gray-700 p-3 text-center">Cursor</th>
                <th className="border border-gray-200 dark:border-gray-700 p-3 text-center">Copilot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 dark:border-gray-700 p-3">멀티파일 편집</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center text-green-600">✅ Cascade</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center text-yellow-600">⚡ Composer</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center text-red-600">❌</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                <td className="border border-gray-200 dark:border-gray-700 p-3">플로우 이해</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center text-green-600">✅</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center text-yellow-600">부분적</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center text-red-600">❌</td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-700 p-3">속도</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center text-green-600">매우 빠름</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center text-yellow-600">빠름</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center text-yellow-600">빠름</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                <td className="border border-gray-200 dark:border-gray-700 p-3">가격</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">무료/$20</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">$20</td>
                <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">$10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          💡 실전 팁
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">Cascade 최적화</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              작업을 명확한 단계로 나누어 설명하면 더 정확한 결과
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">컨텍스트 관리</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              .windsurfignore로 불필요한 파일 제외
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter6() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          GitHub Copilot 고급 활용
        </h2>
        
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            GitHub Copilot은 가장 널리 사용되는 AI 코딩 도구로, 최근 Copilot X와 
            Workspace 기능이 추가되며 단순 자동완성을 넘어 전체 개발 워크플로우를 
            지원하는 플랫폼으로 진화했습니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚀 Copilot Workspace
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            이슈에서 PR까지 전체 개발 프로세스를 AI가 관리합니다.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">워크플로우</h4>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">이슈 분석</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">GitHub 이슈를 읽고 요구사항 파악</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">계획 수립</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">구현 계획과 파일 목록 생성</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">코드 생성</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">계획에 따라 코드 작성</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">PR 생성</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">커밋 메시지와 PR 설명 자동 작성</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          💬 Copilot Chat 고급 기능
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">슬래시 명령어</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700">
                <code className="text-orange-600 dark:text-orange-400">/explain</code>
                <span className="text-gray-600 dark:text-gray-400">코드 설명</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700">
                <code className="text-orange-600 dark:text-orange-400">/fix</code>
                <span className="text-gray-600 dark:text-gray-400">버그 수정</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700">
                <code className="text-orange-600 dark:text-orange-400">/tests</code>
                <span className="text-gray-600 dark:text-gray-400">테스트 생성</span>
              </div>
              <div className="flex justify-between py-1">
                <code className="text-orange-600 dark:text-orange-400">/docs</code>
                <span className="text-gray-600 dark:text-gray-400">문서 생성</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">컨텍스트 변수</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700">
                <code className="text-blue-600 dark:text-blue-400">#file</code>
                <span className="text-gray-600 dark:text-gray-400">특정 파일 참조</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700">
                <code className="text-blue-600 dark:text-blue-400">#selection</code>
                <span className="text-gray-600 dark:text-gray-400">선택 영역</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700">
                <code className="text-blue-600 dark:text-blue-400">#editor</code>
                <span className="text-gray-600 dark:text-gray-400">현재 에디터</span>
              </div>
              <div className="flex justify-between py-1">
                <code className="text-blue-600 dark:text-blue-400">#terminal</code>
                <span className="text-gray-600 dark:text-gray-400">터미널 출력</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🤖 Custom Instructions 설정
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`// .github/copilot-instructions.md

## Project Context
- Next.js 14 App Router 사용
- TypeScript strict mode
- Tailwind CSS for styling
- PostgreSQL with Prisma ORM

## Code Style
- 함수형 컴포넌트 사용
- Custom hooks for business logic
- Error boundaries on all pages
- Comprehensive error handling

## Testing
- Jest + React Testing Library
- Minimum 80% coverage
- E2E tests with Playwright

## Documentation
- JSDoc for all public APIs
- README for each module
- Inline comments for complex logic`}</pre>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter7() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          AI 워크플로우 자동화
        </h2>
        
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            No-code/Low-code 플랫폼을 활용하여 복잡한 AI 워크플로우를 시각적으로 
            설계하고 자동화합니다. Make, Zapier, n8n 등을 통해 다양한 AI 서비스를 
            연결하고 오케스트레이션합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🔄 주요 자동화 플랫폼
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3">
              <Workflow className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Make (Integromat)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              비주얼 워크플로우 빌더, 1000+ 앱 연동
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700 dark:text-gray-300">복잡한 분기 처리</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700 dark:text-gray-300">데이터 변환 도구</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700 dark:text-gray-300">에러 핸들링</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-3">
              <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Zapier</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              가장 많은 앱 지원, 간단한 자동화
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700 dark:text-gray-300">5000+ 앱 연동</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700 dark:text-gray-300">간단한 설정</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700 dark:text-gray-300">즉시 실행</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-3">
              <GitBranch className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">n8n</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              오픈소스, 셀프호스팅 가능
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700 dark:text-gray-300">코드 노드 지원</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700 dark:text-gray-300">무제한 실행</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700 dark:text-gray-300">커스텀 노드</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🎯 실전 AI 워크플로우 예시
        </h3>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              📝 콘텐츠 생성 파이프라인
            </h4>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">RSS/웹 스크래핑</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">최신 뉴스/트렌드 수집</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">GPT-4 요약</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">핵심 내용 추출 및 요약</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Claude 리라이팅</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">톤앤매너 조정, SEO 최적화</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">DALL-E 3 이미지</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">썸네일 자동 생성</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs">5</span>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">WordPress 게시</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">자동 포스팅 및 스케줄링</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              🤖 고객 지원 자동화
            </h4>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">이메일/Slack 메시지 수신</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">감정 분석 (Sentiment Analysis)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">카테고리 자동 분류</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">AI 답변 생성 또는 담당자 할당</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">CRM 업데이트 및 팔로우업</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter8() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          LangChain & AutoGen
        </h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            LangChain과 AutoGen을 활용하여 복잡한 AI 에이전트 시스템을 구축합니다.
            여러 AI 모델과 도구를 조합하여 자율적으로 작업을 수행하는 에이전트를 만들 수 있습니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🔗 LangChain 프레임워크
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">핵심 컴포넌트</h4>
              <div className="space-y-2">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-3">
                  <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-1">Models</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">LLM, Chat, Embeddings</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Prompts</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">템플릿, 예시 선택기</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-3">
                  <h5 className="font-semibold text-green-700 dark:text-green-400 mb-1">Memory</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">대화 기록, 요약</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-3">
                  <h5 className="font-semibold text-orange-700 dark:text-orange-400 mb-1">Chains</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">순차/병렬 실행</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">에이전트 타입</h4>
              <div className="space-y-2">
                <div className="bg-gray-50 dark:bg-gray-900 rounded p-3">
                  <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">ReAct</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">추론과 행동 반복</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded p-3">
                  <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Self-Ask</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">자가 질문 생성</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded p-3">
                  <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Plan-and-Execute</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">계획 후 실행</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded p-3">
                  <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">OpenAI Functions</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">함수 호출 에이전트</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🤖 AutoGen 멀티 에이전트
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Microsoft의 AutoGen은 여러 AI 에이전트가 협업하는 시스템을 쉽게 구축할 수 있게 합니다.
          </p>
          
          <div className="bg-gray-900 rounded-lg p-4 mb-4">
            <pre className="text-green-400 font-mono text-xs overflow-x-auto">
{`import autogen

# 에이전트 설정
config_list = [{
    "model": "gpt-4",
    "api_key": "your-api-key"
}]

# 어시스턴트 에이전트
assistant = autogen.AssistantAgent(
    name="assistant",
    llm_config={"config_list": config_list},
    system_message="You are a helpful AI assistant."
)

# 사용자 프록시 에이전트
user_proxy = autogen.UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=10,
    code_execution_config={"work_dir": "coding"}
)

# 대화 시작
user_proxy.initiate_chat(
    assistant,
    message="Create a snake game in Python"
)`}</pre>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h5 className="font-bold text-purple-700 dark:text-purple-400 mb-2">장점</h5>
              <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <li>• 자동 코드 실행</li>
                <li>• 에이전트 간 자율 대화</li>
                <li>• 복잡한 작업 분해</li>
                <li>• 피드백 루프</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h5 className="font-bold text-blue-700 dark:text-blue-400 mb-2">활용 사례</h5>
              <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <li>• 코드 생성 및 디버깅</li>
                <li>• 데이터 분석</li>
                <li>• 연구 논문 작성</li>
                <li>• 프로젝트 계획</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter9() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          미래를 위한 준비
        </h2>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            AI 도구는 빠르게 진화하고 있습니다. 새로운 도구를 평가하고, 
            지속적으로 학습하며, AI 시대에 필요한 핵심 역량을 개발하는 전략을 수립합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🔮 AI 도구의 진화 방향
        </h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-indigo-500">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">2024-2025 트렌드</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>🎯 더 큰 컨텍스트 윈도우 (100만+ 토큰)</li>
                <li>🎯 멀티모달 AI (코드 + 이미지 + 음성)</li>
                <li>🎯 실시간 협업 AI</li>
                <li>🎯 자율 에이전트 시스템</li>
              </ul>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>🎯 IDE 완전 통합</li>
                <li>🎯 프로젝트 수준 이해</li>
                <li>🎯 자동 최적화 및 리팩토링</li>
                <li>🎯 AI 간 협업 프로토콜</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-purple-500">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">새로운 AI 도구 평가 기준</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">1</span>
                </div>
                <h5 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">성능</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">속도, 정확도, 컨텍스트 이해</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                </div>
                <h5 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">통합성</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">기존 워크플로우 호환</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                </div>
                <h5 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">ROI</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">비용 대비 생산성 향상</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          💪 AI 시대의 핵심 역량
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">기술적 역량</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span className="text-gray-700 dark:text-gray-300">프롬프트 엔지니어링</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span className="text-gray-700 dark:text-gray-300">AI 도구 선택 및 조합</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span className="text-gray-700 dark:text-gray-300">컨텍스트 관리</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span className="text-gray-700 dark:text-gray-300">AI 출력 검증 및 개선</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">소프트 스킬</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-0.5">✓</span>
                <span className="text-gray-700 dark:text-gray-300">문제 정의 능력</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-0.5">✓</span>
                <span className="text-gray-700 dark:text-gray-300">비판적 사고</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-0.5">✓</span>
                <span className="text-gray-700 dark:text-gray-300">창의적 문제 해결</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-0.5">✓</span>
                <span className="text-gray-700 dark:text-gray-300">지속적 학습 마인드셋</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          📚 지속적 학습 전략
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-1">주간 AI 도구 탐색</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">매주 새로운 도구 1개씩 테스트</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-1">커뮤니티 참여</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">Discord, Reddit, Twitter에서 최신 정보 수집</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-1">실전 프로젝트</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI 도구로 실제 프로젝트 완성</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 font-bold text-sm">4</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-1">지식 공유</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">블로그, 영상으로 경험 공유</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          🎯 핵심 메시지
        </h3>
        
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-6">
          <p className="text-gray-700 dark:text-gray-300 text-center text-lg font-medium">
            "AI는 개발자를 대체하지 않습니다.<br/>
            하지만 AI를 활용하는 개발자가<br/>
            그렇지 않은 개발자를 대체할 것입니다."
          </p>
        </div>
      </section>
    </div>
  )
}