'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Send, Bot, User, Lightbulb,
  TrendingUp, Calculator, BarChart3, Brain,
  Minimize2, Maximize2, X
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'general' | 'analysis' | 'strategy' | 'learning';
}

interface MentorSuggestion {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'fundamental' | 'portfolio' | 'risk';
  icon: React.ElementType;
}

const mentorSuggestions: MentorSuggestion[] = [
  {
    id: '1',
    title: '기술적 분석 가이드',
    description: 'RSI와 MACD를 활용한 매매 타이밍 찾기',
    category: 'technical',
    icon: BarChart3
  },
  {
    id: '2',
    title: '기본적 분석 실습',
    description: 'PER과 PBR로 저평가 주식 찾는 방법',
    category: 'fundamental',
    icon: Calculator
  },
  {
    id: '3',
    title: '포트폴리오 최적화',
    description: '리스크 분산을 위한 자산 배분 전략',
    category: 'portfolio',
    icon: TrendingUp
  },
  {
    id: '4',
    title: '심리적 편향 극복',
    description: '투자 심리학과 감정 컨트롤 방법',
    category: 'risk',
    icon: Brain
  }
];

// AI 응답 생성 함수 (실제 환경에서는 API 호출)
function generateAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('per') || lowerMessage.includes('주가수익비율')) {
    return `PER(주가수익비율)은 현재 주가를 주당순이익(EPS)으로 나눈 값입니다.

**PER 해석 방법:**
• 낮은 PER: 상대적으로 저평가 가능성 (단, 기업 실적 악화도 고려)
• 높은 PER: 성장 기대감 반영 또는 고평가 가능성
• 업종별 평균 PER과 비교하는 것이 중요

**실전 활용 팁:**
1. 동종업계 평균 PER과 비교
2. 기업의 과거 PER 추이 분석
3. 성장률과 함께 고려 (PEG 비율 활용)

더 자세한 설명이 필요하시면 언제든 물어보세요! 📊`;
  }
  
  if (lowerMessage.includes('rsi') || lowerMessage.includes('과매수') || lowerMessage.includes('과매도')) {
    return `RSI(Relative Strength Index)는 주가의 과매수/과매도 상태를 판단하는 지표입니다.

**RSI 해석:**
• 70 이상: 과매수 구간 (매도 신호 가능성)
• 30 이하: 과매도 구간 (매수 신호 가능성)
• 50 근처: 중립 구간

**실전 매매 전략:**
1. RSI가 30선을 상향 돌파시 매수 고려
2. RSI가 70선을 하향 돌파시 매도 고려
3. 다이버전스 패턴으로 추세 전환점 포착

**주의사항:**
- RSI 단독보다는 다른 지표와 함께 활용
- 강한 추세장에서는 과매수/과매도가 지속될 수 있음

실제 차트에서 연습해보시는 것을 추천드립니다! 📈`;
  }
  
  if (lowerMessage.includes('분산투자') || lowerMessage.includes('포트폴리오')) {
    return `분산투자는 투자의 기본 원칙 중 하나입니다! "계란을 한 바구니에 담지 마라"는 격언이 잘 표현해주죠.

**분산투자의 핵심:**
• 자산군 분산: 주식, 채권, 원자재, 부동산 등
• 지역 분산: 국내, 해외 시장
• 섹터 분산: IT, 금융, 제조업, 바이오 등
• 시간 분산: 적립식 투자 (Dollar Cost Averaging)

**포트폴리오 구성 예시:**
- 보수형: 주식 30%, 채권 60%, 현금 10%
- 중립형: 주식 50%, 채권 40%, 현금 10%  
- 공격형: 주식 70%, 채권 20%, 현금 10%

**리밸런싱:**
3-6개월마다 목표 비중으로 조정하여 수익률을 최적화하세요.

구체적인 포트폴리오 구성에 대해 더 궁금한 점이 있으시면 말씀해주세요! 💼`;
  }
  
  if (lowerMessage.includes('손절') || lowerMessage.includes('익절') || lowerMessage.includes('리스크')) {
    return `리스크 관리는 투자에서 가장 중요한 요소입니다! 💪

**손절매 전략:**
• 투자 전 미리 손절선 설정 (보통 -5% ~ -10%)
• 감정이 아닌 규칙에 따라 실행
• 기술적 지지선 하향 돌파시 고려

**익절 전략:**
• 목표 수익률 달성시 일부 매도
• 분할 매도로 수익 실현
• 추세 지속시 일부 보유 유지

**포지션 사이징:**
- 한 종목에 전체 자산의 5-10% 이하 투자
- 섹터별 집중도 관리
- 변동성이 높은 종목은 비중 축소

**심리적 준비:**
- 손실은 투자의 일부라고 받아들이기
- 감정적 거래 피하기
- 장기적 관점 유지

체계적인 리스크 관리가 안정적 수익의 열쇠입니다! 🔑`;
  }
  
  // 기본 응답
  return `안녕하세요! KSS AI 투자 멘토입니다. 😊

투자와 관련된 모든 질문에 답해드리겠습니다. 다음과 같은 주제로 질문해보세요:

**기본적 분석:**
• PER, PBR, ROE 등 밸류에이션 지표
• 재무제표 분석 방법
• 기업 가치 평가

**기술적 분석:**
• 캔들스틱, 이동평균선
• RSI, MACD, 볼린저 밴드
• 차트 패턴 분석

**투자 전략:**
• 분산투자와 포트폴리오 구성
• 리스크 관리 방법
• 매매 타이밍

**투자 심리:**
• 감정 컨트롤
• 인지편향 극복
• 장기 투자 마인드

궁금한 것이 있으시면 편하게 물어보세요! 🚀`;
}

interface AIMentorProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AIMentor({ isOpen, onToggle }: AIMentorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `안녕하세요! KSS AI 투자 멘토입니다. 🤖

투자 학습과 실전 적용을 도와드리겠습니다. 어떤 것부터 배워볼까요?

• 기본적 분석 (PER, PBR, 재무제표)
• 기술적 분석 (차트, 지표)  
• 포트폴리오 구성
• 리스크 관리

언제든 질문해주세요!`,
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + '_user',
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      category: 'general'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // AI 응답 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: Date.now().toString() + '_ai',
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        category: 'general'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: MentorSuggestion) => {
    setInputMessage(suggestion.title + ' 에 대해 자세히 알려주세요');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">AI 투자 멘토</h3>
              <div className="text-xs text-green-500 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                온라인
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onToggle}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-blue-500' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-500'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    <div className={`rounded-xl p-3 ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    }`}>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('ko-KR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3">
                      <div className="flex space-x-1">
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

            {/* Suggestions */}
            <div className="px-4 py-2 border-t dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-gray-500">추천 질문:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {mentorSuggestions.map((suggestion) => {
                  const IconComponent = suggestion.icon;
                  return (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="p-2 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="w-3 h-3 text-blue-500" />
                        <span className="text-xs font-medium">{suggestion.title}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {suggestion.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="투자에 대해 질문해보세요..."
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}