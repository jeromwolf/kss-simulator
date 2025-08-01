'use client'

import { useState, useRef, useEffect } from 'react'
import { Brain, Send, User, Bot, TrendingUp, AlertCircle, Lightbulb, BookOpen } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
  analysis?: {
    sentiment: 'bullish' | 'bearish' | 'neutral'
    confidence: number
    keyPoints: string[]
  }
}

interface MarketData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
}

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! 저는 KSS AI 투자 멘토입니다. 주식 투자와 관련된 모든 궁금한 점을 도와드리겠습니다. 어떤 도움이 필요하신가요?',
      timestamp: new Date(),
      suggestions: [
        '포트폴리오 분석해주세요',
        '현재 시장 상황이 어떤가요?',
        '가치투자 전략을 알려주세요',
        '리스크 관리 방법을 설명해주세요'
      ]
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedSymbol, setSelectedSymbol] = useState('KOSPI')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 샘플 시장 데이터
  const marketData: MarketData[] = [
    { symbol: 'KOSPI', price: 2547.23, change: 15.42, changePercent: 0.61, volume: 456789 },
    { symbol: 'KOSDAQ', price: 847.91, change: -3.28, changePercent: -0.39, volume: 234567 },
    { symbol: 'Samsung', price: 71800, change: 1200, changePercent: 1.70, volume: 8901234 },
    { symbol: 'SK Hynix', price: 89500, change: -1500, changePercent: -1.65, volume: 2345678 }
  ]

  // 메시지 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // AI 응답 생성 (실제로는 LLM API 호출)
  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    // 시뮬레이션: 실제로는 ChatGPT, Claude 등의 API 호출
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

    const responses: Record<string, {
      content: string
      analysis: {
        sentiment: 'bullish' | 'bearish' | 'neutral'
        confidence: number
        keyPoints: string[]
      }
      suggestions: string[]
    }> = {
      portfolio: {
        content: `포트폴리오 분석을 해드리겠습니다.

**현재 시장 상황:**
- KOSPI: 2,547p (+0.61%) - 상승 모멘텀 유지
- 외국인 매수세 지속, 기관 관망세
- 달러/원 환율 안정화로 외국인 자금 유입 기대

**투자 전략 제안:**
1. **핵심 자산 (60%)**: 대형주 중심 안정적 포트폴리오
2. **성장 자산 (25%)**: 기술주, 바이오 등 성장주
3. **안전 자산 (15%)**: 채권, 리츠 등 방어적 자산

**주의사항:**
- 미국 금리 정책 변화 모니터링 필요
- 실적 발표 시즌 대비 종목별 차별화 예상`,
        analysis: {
          sentiment: 'bullish' as const,
          confidence: 75,
          keyPoints: ['외국인 매수세', '환율 안정화', '실적 기대감']
        },
        suggestions: ['추천 종목을 알려주세요', '리스크 관리 방법은?', '언제 매도해야 하나요?']
      },
      market: {
        content: `현재 시장 상황을 분석해드리겠습니다.

**국내 증시:**
- KOSPI 2,547p (+15.42p, +0.61%)
- 외국인 순매수 지속, 개인 차익실현 매물
- 반도체, 바이오 섹터 강세

**글로벌 시장:**
- 미국 증시 혼조세, 금리 인상 우려 완화
- 중국 경기 부양책 기대감으로 원자재 상승
- 유럽 인플레이션 둔화로 ECB 정책 변화 시사

**투자 포인트:**
1. 실적 개선이 확실한 종목 선별 투자
2. 고금리 장기화에 대비한 배당주 확대
3. 달러 약세 수혜주 관심 필요`,
        analysis: {
          sentiment: 'neutral' as const,
          confidence: 68,
          keyPoints: ['외국인 순매수', '실적 개선 기대', '금리 정책 불확실성']
        },
        suggestions: ['어떤 섹터가 유망한가요?', '환율 영향은 어떤가요?', '매수 타이밍은?']
      },
      value: {
        content: `가치투자 전략을 알려드리겠습니다.

**가치투자 핵심 원칙:**

1. **내재가치 계산**
   - PER, PBR, PCR 등 밸류에이션 지표 활용
   - DCF(현금흐름할인) 모델로 적정주가 산출
   - 안전마진 확보 (내재가치 대비 20-30% 할인)

2. **재무제표 분석**
   - ROE 15% 이상, 부채비율 50% 이하
   - 영업이익률 지속 개선 여부
   - 현금흐름 창출 능력 점검

3. **장기 관점**
   - 3-5년 이상 보유 전제
   - 일시적 악재는 매수 기회로 활용
   - 분산투자로 리스크 관리

**추천 스크리닝 기준:**
- PER < 업종 평균의 80%
- PBR < 1.5
- ROE > 10%
- 연속 3년 이상 배당`,
        analysis: {
          sentiment: 'neutral' as const,
          confidence: 85,
          keyPoints: ['내재가치 계산', '재무제표 분석', '장기 투자']
        },
        suggestions: ['구체적인 종목 추천해주세요', 'PER은 몇 배가 적정한가요?', '언제 매도해야 하나요?']
      },
      risk: {
        content: `리스크 관리 방법을 설명해드리겠습니다.

**포지션 사이징:**
- 개별 종목당 포트폴리오의 5-10% 이하
- 섹터별 집중도 20% 이하 유지
- 손절 라인 설정 (-20% 또는 -30%)

**분산투자 전략:**
1. **지역 분산**: 국내 70%, 해외 30%
2. **섹터 분산**: IT, 바이오, 소비재, 금융 등
3. **자산 분산**: 주식 80%, 채권/현금 20%

**리스크 모니터링:**
- 포트폴리오 베타 1.2 이하 유지
- VaR(위험가치) 일일 체크
- 상관관계 분석으로 진짜 분산효과 확인

**심리적 리스크 관리:**
- 투자 일지 작성으로 감정 통제
- 정기적인 포트폴리오 리뷰
- FOMO(놓침에 대한 두려움) 경계

**위기 대응 매뉴얼:**
- 시장 급락 시 단계적 매수 계획
- 현금 보유 비중 10-20% 유지
- 품질 좋은 주식은 오히려 매수 기회로 활용`,
        analysis: {
          sentiment: 'neutral' as const,
          confidence: 90,
          keyPoints: ['포지션 사이징', '분산투자', '심리적 통제']
        },
        suggestions: ['손절 기준을 정하는 방법은?', '현금 비중은 얼마가 적절한가요?', '공포 지수는 어떻게 활용하나요?']
      }
    }

    // 키워드 매칭으로 응답 선택
    let response = responses.market // 기본 응답
    
    if (userMessage.includes('포트폴리오') || userMessage.includes('자산배분')) {
      response = responses.portfolio
    } else if (userMessage.includes('가치투자') || userMessage.includes('밸류')) {
      response = responses.value
    } else if (userMessage.includes('리스크') || userMessage.includes('위험') || userMessage.includes('손절')) {
      response = responses.risk
    }

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions,
      analysis: response.analysis
    }
  }

  // 메시지 전송
  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      const aiResponse = await generateAIResponse(inputMessage)
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  // 제안 메시지 클릭
  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  // Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-[600px] flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
        <Brain className="w-6 h-6 text-red-600 dark:text-red-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI 투자 멘토</h3>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">온라인</span>
        </div>
      </div>

      {/* 시장 데이터 */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-4 text-sm overflow-x-auto">
          {marketData.map((data) => (
            <div key={data.symbol} className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-semibold text-gray-900 dark:text-white">{data.symbol}</span>
              <span className="text-gray-600 dark:text-gray-400">{data.price.toLocaleString()}</span>
              <span className={`flex items-center gap-1 ${
                data.change > 0 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {data.change > 0 ? <TrendingUp className="w-3 h-3" /> : ''}
                {data.change > 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.role === 'user' ? '' : 'w-full'}`}>
              <div className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                }`}>
                  {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-red-600 text-white ml-auto'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {/* AI 분석 결과 */}
                  {message.analysis && (
                    <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-semibold text-sm text-gray-900 dark:text-white">분석 결과</span>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          message.analysis.sentiment === 'bullish' 
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'
                            : message.analysis.sentiment === 'bearish'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                        }`}>
                          {message.analysis.sentiment === 'bullish' ? '낙관적' : 
                           message.analysis.sentiment === 'bearish' ? '부정적' : '중립적'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          신뢰도: {message.analysis.confidence}%
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {message.analysis.keyPoints.map((point, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700 dark:text-gray-300">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
              
              {/* 추천 질문 */}
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left px-3 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      <Lightbulb className="w-3 h-3 inline mr-2 text-yellow-500" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* 타이핑 인디케이터 */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="투자 관련 질문을 자유롭게 해보세요..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              rows={2}
              disabled={isTyping}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          <BookOpen className="w-3 h-3 inline mr-1" />
          투자는 본인 책임입니다. AI 조언은 참고용으로만 활용하세요.
        </div>
      </div>
    </div>
  )
}