'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Copy, RefreshCw, Zap, Brain, Code2, Settings } from 'lucide-react'

interface PromptResult {
  model: string
  response: string
  improved: string
  score: number
  tips: string[]
}

export default function PromptOptimizerPage() {
  const [prompt, setPrompt] = useState('')
  const [context, setContext] = useState('')
  const [goal, setGoal] = useState('code')
  const [results, setResults] = useState<PromptResult[]>([])
  const [isOptimizing, setIsOptimizing] = useState(false)

  const optimizePrompt = () => {
    if (!prompt.trim()) return

    setIsOptimizing(true)
    setTimeout(() => {
      const optimizedResults: PromptResult[] = [
        {
          model: 'Claude Opus 4',
          response: prompt,
          improved: improvePrompt(prompt, goal, 'claude'),
          score: calculateScore(prompt),
          tips: generateTips(prompt, 'claude')
        },
        {
          model: 'GPT-4o',
          response: prompt,
          improved: improvePrompt(prompt, goal, 'gpt'),
          score: calculateScore(prompt) - 5,
          tips: generateTips(prompt, 'gpt')
        },
        {
          model: 'Gemini 2.5',
          response: prompt,
          improved: improvePrompt(prompt, goal, 'gemini'),
          score: calculateScore(prompt) - 3,
          tips: generateTips(prompt, 'gemini')
        }
      ]
      setResults(optimizedResults)
      setIsOptimizing(false)
    }, 1500)
  }

  const improvePrompt = (original: string, goalType: string, model: string) => {
    const improvements: Record<string, Record<string, string>> = {
      claude: {
        code: `당신은 전문 ${getLanguage(original)} 개발자입니다.

다음 요구사항을 구현해주세요:
${original}

요구사항:
1. 클린 코드 원칙을 따라 작성
2. 에러 처리 포함
3. 타입 안정성 보장
4. 주요 로직에 간단한 주석 추가
5. 성능 최적화 고려

구현 후 코드의 핵심 로직을 간단히 설명해주세요.`,
        analysis: `다음 ${getDataType(original)}을 체계적으로 분석해주세요:

[데이터/텍스트]
${original}

분석 관점:
1. 핵심 패턴과 트렌드 식별
2. 이상치나 특이사항 발견
3. 데이터 품질 평가
4. 개선 가능한 영역 제안
5. 실행 가능한 인사이트 도출

각 관점에 대해 구체적인 예시와 함께 설명해주세요.`,
        creative: `다음 주제로 창의적인 콘텐츠를 작성해주세요:

주제: ${original}

요구사항:
1. 독창적이고 참신한 접근
2. 타겟 청중: ${getAudience(original)}
3. 톤앤매너: 전문적이면서 친근한
4. 구체적인 예시 포함
5. 실용적인 가치 제공

3개의 다른 버전을 제시하고, 각각의 장단점을 설명해주세요.`
      },
      gpt: {
        code: `## Task: ${original}

Please implement a production-ready solution with:
- Clean, maintainable code
- Comprehensive error handling
- Type safety (if applicable)
- Performance optimizations
- Brief inline documentation

Provide the implementation followed by a brief explanation of design decisions.`,
        analysis: `Analyze the following in detail:

${original}

Focus on:
• Key insights and patterns
• Statistical significance
• Actionable recommendations
• Potential risks or concerns
• Next steps

Structure your analysis with clear sections and supporting evidence.`,
        creative: `Create engaging content based on:

"${original}"

Requirements:
• Original and innovative approach
• Audience-appropriate tone
• Include real-world examples
• Balance creativity with practicality
• Multiple perspectives

Deliver 2-3 variations with different angles.`
      },
      gemini: {
        code: `**Development Task**

Create a robust implementation for: ${original}

Technical requirements:
* Follow best practices for the language/framework
* Include comprehensive testing approach
* Ensure scalability and maintainability
* Document complex logic
* Consider edge cases

Please provide the complete solution with explanations.`,
        analysis: `**Analysis Request**

Subject: ${original}

Perform a comprehensive analysis covering:
1. Data overview and quality assessment
2. Key findings and insights
3. Statistical analysis (if applicable)
4. Visualizations or representations
5. Recommendations and action items

Use a structured format with clear conclusions.`,
        creative: `**Creative Brief**

Topic: ${original}

Deliverables:
- Fresh, original content
- Engaging narrative or structure
- Relevant examples and case studies
- Clear value proposition
- Call-to-action or next steps

Provide multiple creative options with rationale.`
      }
    }

    return improvements[model]?.[goalType] || original
  }

  const calculateScore = (text: string) => {
    let score = 50
    
    // 명확성
    if (text.includes('요구사항') || text.includes('목표')) score += 10
    if (text.includes('예시') || text.includes('예:')) score += 10
    
    // 구체성
    if (text.length > 100) score += 10
    if (text.includes('단계') || text.includes('1.')) score += 5
    
    // 컨텍스트
    if (text.includes('배경') || text.includes('상황')) score += 5
    if (text.includes('제약') || text.includes('조건')) score += 5
    
    // 출력 형식
    if (text.includes('형식') || text.includes('포맷')) score += 5
    
    return Math.min(100, score)
  }

  const generateTips = (text: string, model: string): string[] => {
    const tips: string[] = []
    
    if (text.length < 50) {
      tips.push('프롬프트가 너무 짧습니다. 더 구체적인 설명을 추가하세요.')
    }
    
    if (!text.includes('예') && !text.includes('example')) {
      tips.push('구체적인 예시를 추가하면 더 정확한 결과를 얻을 수 있습니다.')
    }
    
    if (!text.includes('형식') && !text.includes('format')) {
      tips.push('원하는 출력 형식을 명시하면 좋습니다.')
    }
    
    if (model === 'claude') {
      tips.push('Claude는 대화형 상호작용에 강합니다. 단계별 접근을 고려하세요.')
    } else if (model === 'gpt') {
      tips.push('GPT는 구조화된 출력에 강합니다. 섹션을 나누어 요청하세요.')
    } else {
      tips.push('Gemini는 멀티모달 처리에 강합니다. 이미지나 코드와 함께 사용하세요.')
    }
    
    return tips
  }

  const getLanguage = (text: string): string => {
    if (text.includes('python') || text.includes('파이썬')) return 'Python'
    if (text.includes('javascript') || text.includes('js')) return 'JavaScript'
    if (text.includes('typescript') || text.includes('ts')) return 'TypeScript'
    if (text.includes('react')) return 'React'
    return '소프트웨어'
  }

  const getDataType = (text: string): string => {
    if (text.includes('데이터')) return '데이터'
    if (text.includes('로그')) return '로그'
    if (text.includes('메트릭')) return '메트릭'
    return '정보'
  }

  const getAudience = (text: string): string => {
    if (text.includes('개발자')) return '개발자'
    if (text.includes('비즈니스')) return '비즈니스 전문가'
    if (text.includes('일반')) return '일반 대중'
    return '전문가'
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

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

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                프롬프트 최적화 시뮬레이터
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                AI 모델별 최적화된 프롬프트를 생성하고 비교해보세요
              </p>
            </div>
          </div>

          {/* Goal Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              프롬프트 목적
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setGoal('code')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  goal === 'code'
                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-violet-300'
                }`}
              >
                <Code2 className="w-5 h-5 mx-auto mb-1 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-medium">코드 생성</span>
              </button>
              <button
                onClick={() => setGoal('analysis')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  goal === 'analysis'
                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-violet-300'
                }`}
              >
                <Brain className="w-5 h-5 mx-auto mb-1 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-medium">분석/추론</span>
              </button>
              <button
                onClick={() => setGoal('creative')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  goal === 'creative'
                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-violet-300'
                }`}
              >
                <Zap className="w-5 h-5 mx-auto mb-1 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-medium">창의적 작업</span>
              </button>
            </div>
          </div>

          {/* Original Prompt Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              원본 프롬프트
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="최적화하고 싶은 프롬프트를 입력하세요..."
              className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Context Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              추가 컨텍스트 (선택사항)
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="프로젝트 배경, 제약사항, 특별 요구사항 등..."
              className="w-full h-24 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Optimize Button */}
          <button
            onClick={optimizePrompt}
            disabled={!prompt.trim() || isOptimizing}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isOptimizing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                최적화 중...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                프롬프트 최적화
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              최적화 결과
            </h2>
            
            {results.map((result, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
                      <Settings className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {result.model}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" style={{ width: '100px' }}>
                            <div
                              className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all"
                              style={{ width: `${result.score}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          점수: {result.score}/100
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(result.improved)}
                    className="p-2 text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>

                {/* Improved Prompt */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    최적화된 프롬프트
                  </h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                      {result.improved}
                    </pre>
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    개선 팁
                  </h4>
                  <ul className="space-y-1">
                    {result.tips.map((tip, tipIdx) => (
                      <li key={tipIdx} className="flex items-start gap-2">
                        <span className="text-violet-500 mt-1">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            💡 프롬프트 작성 베스트 프랙티스
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                명확성 (Clarity)
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 구체적인 요구사항을 명시하세요</li>
                <li>• 애매한 표현보다 정확한 용어를 사용하세요</li>
                <li>• 원하는 출력 형식을 설명하세요</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                컨텍스트 (Context)
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 관련 배경 정보를 제공하세요</li>
                <li>• 제약사항이나 조건을 명시하세요</li>
                <li>• 예시를 포함하면 더 좋습니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}