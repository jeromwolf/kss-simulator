'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Play, BookOpen, Code, Lightbulb, Target, AlertCircle } from 'lucide-react'

// Dynamic imports for simulators
const TokenizerDemo = dynamic(() => import('./TokenizerDemo'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
})

interface ChapterContentProps {
  chapterId: string
}

export default function ChapterContent({ chapterId }: ChapterContentProps) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const renderChapterContent = () => {
    switch (chapterId) {
      case '01-introduction':
        return <Chapter01Introduction />
      case '02-architecture':
        return <Chapter02Architecture />
      case '03-training':
        return <Chapter03Training />
      case '04-prompt-engineering':
        return <Chapter04PromptEngineering />
      case '05-applications-1':
        return <Chapter05Applications1 />
      case '05-applications-2':
        return <Chapter05Applications2 />
      case '05-applications-3':
        return <Chapter05Applications3 />
      case '06-advanced':
        return <Chapter06Advanced />
      default:
        return <div>Content not found</div>
    }
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {renderChapterContent()}
    </div>
  )
}

// Chapter 1: LLM 개요와 역사
function Chapter01Introduction() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          LLM이란 무엇인가?
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>대형 언어 모델(Large Language Model, LLM)</strong>은 수십억 개의 매개변수를 가진 딥러닝 모델로, 
            인간의 언어를 이해하고 생성할 수 있는 인공지능입니다.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Large</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">수십억~수조 개의 매개변수</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Language</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">자연어 처리에 특화</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Model</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Transformer 아키텍처 기반</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">LLM의 역사적 발전</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">2017: Transformer의 등장</h4>
            <p className="text-gray-600 dark:text-gray-400">
              "Attention Is All You Need" 논문으로 Transformer 아키텍처 소개
            </p>
          </div>
          <div className="border-l-4 border-indigo-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">2018: BERT & GPT-1</h4>
            <p className="text-gray-600 dark:text-gray-400">
              양방향 인코더(BERT)와 단방향 디코더(GPT) 모델의 성공
            </p>
          </div>
          <div className="border-l-4 border-indigo-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">2019-2020: GPT-2, GPT-3</h4>
            <p className="text-gray-600 dark:text-gray-400">
              스케일링의 힘 - 모델 크기가 성능을 좌우한다는 것을 증명
            </p>
          </div>
          <div className="border-l-4 border-indigo-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">2022: ChatGPT의 혁명</h4>
            <p className="text-gray-600 dark:text-gray-400">
              RLHF를 통한 사용자 친화적 AI의 탄생, 전 세계적 AI 붐 시작
            </p>
          </div>
          <div className="border-l-4 border-indigo-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">2023: GPT-4, Claude 2, Llama 2</h4>
            <p className="text-gray-600 dark:text-gray-400">
              멀티모달 지원, 오픈소스 모델의 부상, 기업별 경쟁 심화
            </p>
          </div>
          <div className="border-l-4 border-indigo-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">2024: Grok, Llama 3, Gemini 1.5</h4>
            <p className="text-gray-600 dark:text-gray-400">
              xAI의 Grok 등장, Meta Llama 3 405B 오픈소스 공개, 100만+ 토큰 컨텍스트 시대
            </p>
          </div>
          <div className="border-l-4 border-indigo-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">2025: Claude Opus 4, Grok 3, Gemini 2.5</h4>
            <p className="text-gray-600 dark:text-gray-400">
              코딩 특화 모델 발전 (SWE-bench 72.5%), 200만 토큰 컨텍스트, 자율 에이전트 시대 개막
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2025년 최신 LLM 현황</h3>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-3">최강 성능 모델</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  <div>
                    <strong>Claude Opus 4</strong> (Anthropic, 2025.01)
                    <p className="text-gray-600 dark:text-gray-400">코딩 최강 (SWE-bench 72.5%), 7시간 자율 작업</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  <div>
                    <strong>Grok 3</strong> (xAI, 2025.02)
                    <p className="text-gray-600 dark:text-gray-400">200K H100 GPU 학습, AIME 93.3% 달성</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  <div>
                    <strong>GPT-4o</strong> (OpenAI, 2024.05)
                    <p className="text-gray-600 dark:text-gray-400">균형잡힌 성능, 빠른 응답 속도</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  <div>
                    <strong>Gemini 2.5 Pro</strong> (Google, 2025.03)
                    <p className="text-gray-600 dark:text-gray-400">200만 토큰 컨텍스트, 최고 가성비</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3">오픈소스 혁신</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <div>
                    <strong>Llama 3.3 70B</strong> (Meta, 2024.12)
                    <p className="text-gray-600 dark:text-gray-400">405B급 성능을 70B 크기로 구현</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <div>
                    <strong>Mixtral 8x22B</strong> (Mistral, 2024)
                    <p className="text-gray-600 dark:text-gray-400">MoE 아키텍처, 효율적인 추론</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <div>
                    <strong>Qwen 2.5</strong> (Alibaba, 2024)
                    <p className="text-gray-600 dark:text-gray-400">중국어 최강, 다국어 지원</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <div>
                    <strong>DeepSeek V3</strong> (DeepSeek, 2024)
                    <p className="text-gray-600 dark:text-gray-400">코딩 특화, 저비용 고효율</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">주요 기술 트렌드</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">초거대 컨텍스트</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gemini 2.5: 200만 토큰<br/>
              Claude 3: 20만 토큰<br/>
              전체 코드베이스 분석 가능
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">자율 에이전트</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Claude Opus 4: 7시간 자율작업<br/>
              Tool Use & Function Calling<br/>
              복잡한 작업 자동화
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">멀티모달 통합</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              이미지, 비디오, 오디오 이해<br/>
              실시간 스트리밍 처리<br/>
              크로스모달 추론
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">LLM이 가져온 패러다임 변화</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Before LLM
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 작업별 특화 모델</li>
              <li>• 대량의 라벨링 데이터 필요</li>
              <li>• 긴 개발 주기</li>
              <li>• 제한적인 일반화 능력</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              After LLM
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 하나의 모델로 다양한 작업</li>
              <li>• Few-shot, Zero-shot 학습</li>
              <li>• 프롬프트만으로 빠른 개발</li>
              <li>• 강력한 일반화 능력</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 2: Transformer 아키텍처
function Chapter02Architecture() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center gap-2">
          <Code className="w-6 h-6" />
          Transformer 아키텍처 완전 분석
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Transformer는 "Attention Is All You Need" 논문에서 소개된 혁신적인 아키텍처로, 
            현재 모든 LLM의 기반이 되고 있습니다.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">핵심 구성 요소</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Self-Attention</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                각 토큰이 다른 모든 토큰과의 관계를 동시에 계산
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Multi-Head Attention</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                여러 개의 attention head로 다양한 관계 패턴 포착
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Feed Forward Network</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                각 위치에서 독립적으로 적용되는 완전연결층
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Layer Normalization</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                각 층의 출력을 안정화하여 깊은 네트워크 학습 가능
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Residual Connection</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                그래디언트 소실 문제 해결과 학습 안정성 향상
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Positional Encoding</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                순서 정보를 모델에 제공하는 위치 인코딩
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Attention 메커니즘 수식</h3>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Self-Attention 계산</h4>
              <div className="bg-white dark:bg-gray-900 p-4 rounded border font-mono text-sm">
                Attention(Q, K, V) = softmax(QK^T / √d_k)V
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Multi-Head Attention</h4>
              <div className="bg-white dark:bg-gray-900 p-4 rounded border font-mono text-sm">
                MultiHead(Q, K, V) = Concat(head_1, ..., head_h)W^O
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 3: 모델 학습과정과 최적화
function Chapter03Training() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">
          모델 학습과정과 최적화
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            LLM의 학습은 사전훈련(Pre-training) → 파인튜닝(Fine-tuning) → RLHF 단계를 거칩니다.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">학습 단계별 과정</h3>
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">1. 사전훈련 (Pre-training)</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              수조 개의 토큰으로 구성된 대규모 텍스트 데이터로 다음 토큰 예측 학습
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>Common Crawl, Wikipedia, Books 등 웹 데이터</li>
              <li>수천 개의 GPU로 수개월간 학습</li>
              <li>언어의 기본 패턴과 지식 습득</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">2. 지도 파인튜닝 (SFT)</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              고품질의 instruction-following 데이터로 특정 작업 수행 능력 향상
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>질문-답변, 요약, 번역 등 작업별 데이터</li>
              <li>상대적으로 적은 데이터(수만~수십만 개)</li>
              <li>사용자 지시를 따르는 능력 학습</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">3. 인간 피드백 강화학습 (RLHF)</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              인간의 선호도를 반영하여 모델의 출력을 인간 가치와 정렬
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>인간 평가자가 출력 품질 평가</li>
              <li>Reward Model 학습 후 PPO 알고리즘 적용</li>
              <li>안전성, 유용성, 정직성 향상</li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">4. 최신 학습 기법들</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              2024-2025년 등장한 혁신적인 학습 방법들
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li><strong>DPO (Direct Preference Optimization)</strong>: RLHF보다 효율적인 선호도 학습</li>
              <li><strong>Constitutional AI</strong>: Anthropic의 헌법 기반 AI 학습</li>
              <li><strong>RLAIF</strong>: AI 피드백을 통한 강화학습</li>
              <li><strong>Chain-of-Thought Fine-tuning</strong>: 추론 능력 향상</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">강화학습 상세 분석</h3>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6">
          <h4 className="font-bold text-red-700 dark:text-red-300 mb-4">RLHF vs DPO vs Constitutional AI</h4>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-600 dark:text-red-400 mb-2">RLHF (PPO 기반)</h5>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 장점: 세밀한 조정 가능, 성능 검증됨</li>
                <li>• 단점: 계산 비용 높음, 불안정한 학습</li>
                <li>• 사용: ChatGPT, Claude 2</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">DPO (Direct Preference)</h5>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 장점: 간단한 구현, 안정적 학습</li>
                <li>• 단점: 세밀한 조정 어려움</li>
                <li>• 사용: Llama 3, Mixtral</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">Constitutional AI</h5>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 장점: 명확한 원칙, 투명성</li>
                <li>• 단점: 복잡한 헌법 설계</li>
                <li>• 사용: Claude 3, Claude Opus 4</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">토크나이저와 어휘 구성</h3>
        <TokenizerDemo />
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Scaling Laws와 효율화</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Kaplan Scaling Law</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              모델 크기 10배 → 성능 약 2배 향상
            </p>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• 파라미터 수: N</li>
              <li>• 데이터 크기: D</li>
              <li>• 계산량: C</li>
              <li>• Loss ∝ N^(-0.076)</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Chinchilla Scaling</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              최적 데이터/파라미터 비율 = 20:1
            </p>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• 70B 모델 → 1.4T 토큰 필요</li>
              <li>• 데이터 품질이 양보다 중요</li>
              <li>• 효율적 학습 가능</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 4: 프롬프트 엔지니어링
function Chapter04PromptEngineering() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">
          프롬프트 엔지니어링 마스터
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            효과적인 프롬프트 설계는 LLM의 성능을 극대화하는 핵심 기술입니다.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">프롬프트 기법들</h3>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Zero-shot Prompting</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">예시 없이 작업 설명만으로 수행</p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border">
              <pre className="text-sm">다음 텍스트를 한국어로 번역해주세요: "Hello, world!"</pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Few-shot Prompting</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">몇 개의 예시를 제공하여 패턴 학습</p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border">
              <pre className="text-sm whitespace-pre-wrap">{`영어 -> 한국어 번역:
Hello -> 안녕하세요
Thank you -> 감사합니다
Goodbye -> 안녕히 가세요

Good morning -> ?`}</pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Chain-of-Thought (CoT)</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">단계별 추론 과정을 명시적으로 안내</p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border">
              <pre className="text-sm whitespace-pre-wrap">{`문제를 단계별로 해결해보겠습니다:

1. 주어진 정보 파악
2. 필요한 공식 확인  
3. 계산 수행
4. 결과 검증`}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Placeholder components for remaining chapters
function Chapter05Applications1() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">
        LLM 실전 활용: RAG와 챗봇
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        이 챕터는 현재 개발 중입니다. RAG 시스템과 고급 챗봇 개발에 대한 내용이 추가될 예정입니다.
      </p>
    </div>
  )
}

function Chapter05Applications2() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">
        LLM 실전 활용: 코드와 문서
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        이 챕터는 현재 개발 중입니다. 코드 생성과 문서 처리에 대한 내용이 추가될 예정입니다.
      </p>
    </div>
  )
}

function Chapter05Applications3() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">
        LLM 실전 활용: 번역과 콘텐츠
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        이 챕터는 현재 개발 중입니다. 번역과 콘텐츠 생성에 대한 내용이 추가될 예정입니다.
      </p>
    </div>
  )
}

function Chapter06Advanced() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">
          고급 기법과 최신 동향
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            2024-2025년 AI의 최전선: Multimodal, Diffusion, 차세대 아키텍처
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Multimodal AI 시스템</h3>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
          <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-4">Vision-Language Models</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">최신 모델들</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <div>
                    <strong>GPT-4V/4o</strong>: 이미지 이해 + 생성
                    <p className="text-gray-600 dark:text-gray-400">스크린샷 분석, 차트 해석, 코드 이미지 읽기</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <div>
                    <strong>Claude 3 Vision</strong>: 고정밀 이미지 분석
                    <p className="text-gray-600 dark:text-gray-400">문서 OCR, 다이어그램 이해, 의료 영상</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <div>
                    <strong>Gemini Ultra</strong>: 비디오 이해
                    <p className="text-gray-600 dark:text-gray-400">동영상 요약, 실시간 스트림 분석</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-pink-600 dark:text-pink-400 mb-2">핵심 기술</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">•</span>
                  <div>
                    <strong>CLIP</strong>: 이미지-텍스트 임베딩 정렬
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">•</span>
                  <div>
                    <strong>BLIP-2</strong>: 효율적인 비전-언어 사전학습
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">•</span>
                  <div>
                    <strong>LLaVA</strong>: 오픈소스 멀티모달 LLM
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">•</span>
                  <div>
                    <strong>Flamingo</strong>: Few-shot 비전 학습
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Diffusion Models</h3>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
          <h4 className="font-bold text-green-700 dark:text-green-300 mb-4">이미지 생성의 혁명</h4>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-600 dark:text-green-400 mb-2">Stable Diffusion 3</h5>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Multimodal Diffusion Transformer (MMDiT)</li>
                <li>• 텍스트 렌더링 개선, 고해상도 생성</li>
                <li>• ControlNet, LoRA 호환</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2">DALL-E 3</h5>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• ChatGPT 통합으로 프롬프트 자동 개선</li>
                <li>• 텍스트 정확도 99%+</li>
                <li>• 일관된 캐릭터 생성</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">Midjourney V6</h5>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 포토리얼리즘 극대화</li>
                <li>• 프롬프트 이해도 향상</li>
                <li>• 스타일 일관성 유지</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">차세대 아키텍처</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Mamba (SSM)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              State Space Model 기반<br/>
              선형 시간 복잡도<br/>
              무한 컨텍스트 가능성
            </p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">RWKV</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              RNN + Transformer 하이브리드<br/>
              메모리 효율적<br/>
              스트리밍 추론 지원
            </p>
          </div>
          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-violet-700 dark:text-violet-300 mb-2">Flash Attention</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              IO-aware 알고리즘<br/>
              메모리 사용량 10배 감소<br/>
              속도 2-4배 향상
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Hugging Face 생태계</h3>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6">
          <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-4">🤗 통합 플랫폼</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">핵심 라이브러리</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <div>
                    <strong>Transformers</strong>: 20만+ 모델 접근
                    <p className="text-gray-600 dark:text-gray-400">from transformers import AutoModel</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <div>
                    <strong>Datasets</strong>: 10만+ 데이터셋
                    <p className="text-gray-600 dark:text-gray-400">load_dataset("squad")</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <div>
                    <strong>Accelerate</strong>: 분산 학습 간소화
                    <p className="text-gray-600 dark:text-gray-400">Multi-GPU, TPU 지원</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">서비스 & 도구</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <div>
                    <strong>Spaces</strong>: 모델 데모 배포
                    <p className="text-gray-600 dark:text-gray-400">Gradio, Streamlit 앱 호스팅</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <div>
                    <strong>AutoTrain</strong>: No-code 파인튜닝
                    <p className="text-gray-600 dark:text-gray-400">GUI로 모델 학습</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <div>
                    <strong>Inference API</strong>: 즉시 사용 가능
                    <p className="text-gray-600 dark:text-gray-400">REST API로 모델 호출</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI 서비스 생태계</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">엔터프라이즈</h4>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• OpenAI API</li>
              <li>• Anthropic Claude API</li>
              <li>• Google Vertex AI</li>
              <li>• AWS Bedrock</li>
              <li>• Azure OpenAI Service</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">개발자 도구</h4>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• LangChain</li>
              <li>• LlamaIndex</li>
              <li>• Pinecone (Vector DB)</li>
              <li>• Weights & Biases</li>
              <li>• Cohere Rerank</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">특화 서비스</h4>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Perplexity (검색 AI)</li>
              <li>• GitHub Copilot</li>
              <li>• Cursor (AI IDE)</li>
              <li>• RunwayML (비디오)</li>
              <li>• ElevenLabs (음성)</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">효율화 기술</h3>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-4">모델 최적화 기법</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold text-gray-600 dark:text-gray-400 mb-2">Parameter Efficient Fine-tuning</h5>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>LoRA</strong>: Low-Rank Adaptation (0.1% 파라미터)</li>
                <li>• <strong>QLoRA</strong>: 4-bit Quantized LoRA</li>
                <li>• <strong>Prefix Tuning</strong>: 프롬프트 임베딩 학습</li>
                <li>• <strong>Adapter</strong>: 작은 모듈 삽입</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-600 dark:text-gray-400 mb-2">Quantization & Compression</h5>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>GPTQ</strong>: 4-bit weight quantization</li>
                <li>• <strong>AWQ</strong>: Activation-aware quantization</li>
                <li>• <strong>Pruning</strong>: 불필요한 연결 제거</li>
                <li>• <strong>Distillation</strong>: 작은 모델로 지식 전달</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}