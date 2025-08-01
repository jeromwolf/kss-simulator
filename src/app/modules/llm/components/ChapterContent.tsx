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
            <h4 className="font-semibold text-gray-900 dark:text-white">2022-2023: ChatGPT 혁신</h4>
            <p className="text-gray-600 dark:text-gray-400">
              RLHF와 InstructGPT로 인간과의 자연스러운 대화 실현
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">주요 LLM 모델 비교</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">모델</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">매개변수</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">특징</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">개발사</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">GPT-4</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">~1.7T</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">멀티모달, 고성능 추론</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">OpenAI</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Claude 3</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">~200B</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">안전성, 긴 컨텍스트</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Anthropic</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gemini</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">~540B</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">구글 검색 통합</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Google</td>
              </tr>
            </tbody>
          </table>
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
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">토크나이저와 어휘 구성</h3>
        <TokenizerDemo />
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
      <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">
        고급 기법과 최신 동향
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        이 챕터는 현재 개발 중입니다. 최신 LLM 연구와 고급 기법에 대한 내용이 추가될 예정입니다.
      </p>
    </div>
  )
}