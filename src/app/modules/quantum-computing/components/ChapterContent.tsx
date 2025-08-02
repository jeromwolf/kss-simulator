'use client'

import { Calculator, Atom, Zap, Network, Shield, Brain, Eye, Beaker } from 'lucide-react'

interface ChapterContentProps {
  chapterId: number
}

export default function ChapterContent({ chapterId }: ChapterContentProps) {
  const chapterComponents: Record<number, () => JSX.Element> = {
    1: Chapter1Content,
    2: Chapter2Content,
    3: Chapter3Content,
    4: Chapter4Content,
    5: Chapter5Content,
    6: Chapter6Content,
    7: Chapter7Content,
    8: Chapter8Content
  }

  const ContentComponent = chapterComponents[chapterId]

  if (!ContentComponent) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          챕터 {chapterId} 콘텐츠 준비 중
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          이 챕터의 콘텐츠가 곧 추가될 예정입니다.
        </p>
      </div>
    )
  }

  return <ContentComponent />
}

// Chapter 1: 양자역학과 큐비트 기초
function Chapter1Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Atom className="w-8 h-8 text-purple-600" />
          양자역학의 기본 원리
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🌊 양자 중첩 (Superposition)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              고전 비트는 0 또는 1의 상태만 가지지만, 큐비트는 0과 1의 상태를 동시에 가질 수 있습니다.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <code className="text-sm text-purple-600 dark:text-purple-400">
                |ψ⟩ = α|0⟩ + β|1⟩<br/>
                |α|² + |β|² = 1
              </code>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔗 양자 얽힘 (Entanglement)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              두 개 이상의 큐비트가 상관관계를 가져서, 하나의 측정이 다른 큐비트의 상태에 즉시 영향을 미칩니다.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <code className="text-sm text-blue-600 dark:text-blue-400">
                |Bell⟩ = (|00⟩ + |11⟩)/√2
              </code>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">💡 핵심 개념</h4>
          <p className="text-yellow-700 dark:text-yellow-300">
            양자역학의 "측정 문제": 큐비트를 측정하는 순간 중첩 상태가 붕괴되어 확정적인 0 또는 1 상태가 됩니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎯 블로흐 구면 (Bloch Sphere)</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            블로흐 구면은 큐비트의 모든 가능한 상태를 3차원 구면 위의 점으로 표현하는 방법입니다.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-b from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 rounded-lg">
              <div className="text-2xl mb-2">🔴</div>
              <div className="font-bold text-red-700 dark:text-red-400">|0⟩ 상태</div>
              <div className="text-sm text-red-600 dark:text-red-300">북극 (Z=+1)</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-b from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-lg">
              <div className="text-2xl mb-2">🟢</div>
              <div className="font-bold text-green-700 dark:text-green-400">|+⟩ 상태</div>
              <div className="text-sm text-green-600 dark:text-green-300">적도 (X=+1)</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg">
              <div className="text-2xl mb-2">🔵</div>
              <div className="font-bold text-blue-700 dark:text-blue-400">|1⟩ 상태</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">남극 (Z=-1)</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 2: 양자 게이트와 회로 설계
function Chapter2Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Calculator className="w-8 h-8 text-purple-600" />
          기본 양자 게이트
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4">🎯 Pauli-X 게이트 (NOT)</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                큐비트의 상태를 뒤집는 게이트 (|0⟩ ↔ |1⟩)
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <code className="text-sm">
                  X = [0 1]<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;[1 0]
                </code>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4">🌀 Pauli-Y 게이트</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                X와 Z의 조합, 복소수 위상 변화 포함
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <code className="text-sm">
                  Y = [0 -i]<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;[i &nbsp;0]
                </code>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-4">⚡ Pauli-Z 게이트</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                |1⟩ 상태에 -1 위상을 적용 (|0⟩는 불변)
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <code className="text-sm">
                  Z = [1 &nbsp;0]<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;[0 -1]
                </code>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-4">🎲 Hadamard 게이트</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                중첩 상태를 생성하는 핵심 게이트
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <code className="text-sm">
                  H = 1/√2 [1 &nbsp;1]<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1 -1]
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 3: 양자 알고리즘 I - 상세 구현
function Chapter3Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Zap className="w-8 h-8 text-purple-600" />
          Deutsch-Jozsa 알고리즘
        </h2>
        
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 문제 정의</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            블랙박스 함수 f: {'{'}0,1{'}'} ⁿ → {'{'}0,1{'}'}이 주어졌을 때, 이 함수가 상수 함수인지 균형 함수인지 판별하는 문제입니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">상수 함수</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">모든 입력에 대해 같은 값 출력 (0 또는 1)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">균형 함수</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">절반은 0, 절반은 1을 출력</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 성능 비교</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left p-3">알고리즘</th>
                  <th className="text-left p-3">함수 호출 횟수</th>
                  <th className="text-left p-3">복잡도</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-3 text-red-600 dark:text-red-400">고전 최악의 경우</td>
                  <td className="p-3">2ⁿ⁻¹ + 1</td>
                  <td className="p-3">O(2ⁿ)</td>
                </tr>
                <tr>
                  <td className="p-3 text-green-600 dark:text-green-400">양자 알고리즘</td>
                  <td className="p-3">1</td>
                  <td className="p-3">O(1)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔍 Grover 탐색 알고리즘</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 탐색 문제</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              N개의 항목 중에서 특정 조건을 만족하는 M개의 항목을 찾는 문제입니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">고전 탐색</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 평균: N/2 번의 검사</li>
                  <li>• 최악: N 번의 검사</li>
                  <li>• 복잡도: O(N)</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">양자 탐색</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• π√(N/M)/4 번의 반복</li>
                  <li>• 확률적 성공 (99%+ 가능)</li>
                  <li>• 복잡도: O(√N)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔄 Grover 반복 과정</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold">초기화</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">모든 상태의 균등한 중첩 생성 (Hadamard 게이트)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold">오라클 적용</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">정답 상태의 위상을 반전 (|x⟩ → -|x⟩)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold">확산 연산</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">평균에 대한 반사로 진폭 증폭</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg">
                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold">반복</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">최적 횟수만큼 2-3단계 반복 후 측정</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 양자 우위 (Quantum Advantage)</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4">📈 성능 향상</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• <strong>Deutsch-Jozsa:</strong> 지수적 가속</li>
              <li>• <strong>Grover:</strong> 이차적 가속</li>
              <li>• <strong>Shor:</strong> 지수적 가속 (특정 문제)</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 mb-4">⚠️ 한계점</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 모든 문제에 적용되지 않음</li>
              <li>• 확률적 결과 (반복 필요)</li>
              <li>• 노이즈와 오류에 민감</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 4: Shor의 소인수분해
function Chapter4Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Shield className="w-8 h-8 text-purple-600" />
          암호학의 양자 위협
        </h2>
        
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 rounded-r-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">🚨 RSA 암호화의 위기</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            현재 인터넷 보안의 기반인 RSA 암호화는 큰 수의 소인수분해가 어렵다는 가정에 기반합니다.
            Shor 알고리즘은 이 문제를 양자 컴퓨터로 효율적으로 해결할 수 있습니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">고전 컴퓨터</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                2048비트 RSA: 현재 기술로 수백만 년 소요
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">양자 컴퓨터</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                충분한 큐비트 수: 몇 시간 내 해결 가능
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔢 주기 찾기 문제</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📐 수학적 기초</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              정수 N = p × q (p, q는 소수)를 인수분해하기 위해, 다음 함수의 주기를 찾습니다:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <code className="text-lg text-purple-600 dark:text-purple-400">
                f(x) = aˣ mod N
              </code>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              여기서 a는 N과 서로소인 임의의 수이고, r은 aʳ ≡ 1 (mod N)을 만족하는 최소 양의 정수입니다.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🌊 양자 푸리에 변환 (QFT)</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-4">📊 QFT의 역할</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              QFT는 주기적 함수의 주기를 찾기 위한 핵심 도구입니다.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• 시간 도메인 → 주파수 도메인 변환</li>
              <li>• 주기적 패턴의 주파수 성분 추출</li>
              <li>• O(n²) 게이트로 구현 (n = 큐비트 수)</li>
              <li>• 고전 FFT의 양자 버전</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-4">⚙️ 구현 특징</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Hadamard 게이트와 제어 회전 게이트 조합</li>
              <li>• 비트 순서 역전 (bit reversal) 필요</li>
              <li>• 근사 QFT로 게이트 수 최적화 가능</li>
              <li>• 병렬 구현으로 깊이 O(n²) → O(n)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 5: 양자 오류 정정
function Chapter5Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Shield className="w-8 h-8 text-purple-600" />
          양자 오류의 본질
        </h2>
        
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">⚠️ 양자 컴퓨터의 최대 도전</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            양자 상태는 환경과의 상호작용으로 인해 매우 빠르게 손상됩니다. 
            현재 양자 컴퓨터의 오류율은 0.1~1%로, 실용적 계산을 위해서는 10⁻⁶ 이하로 낮춰야 합니다.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4">🌡️ 디코히어런스</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              환경과의 얽힘으로 양자 중첩이 파괴되는 현상
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• T₁: 이완 시간 (~100μs)</li>
              <li>• T₂: 위상 손실 시간 (~50μs)</li>
              <li>• 온도, 자기장 변화</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-400 mb-4">⚡ 게이트 오류</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              양자 게이트 연산 중 발생하는 부정확성
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 제어 신호 부정확성</li>
              <li>• 큐비트 간 unwanted 상호작용</li>
              <li>• 교정 오류 (calibration drift)</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-4">📐 측정 오류</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              큐비트 상태 판독 시 발생하는 오류
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• |0⟩ → |1⟩ 잘못 읽기</li>
              <li>• |1⟩ → |0⟩ 잘못 읽기</li>
              <li>• 전형적으로 1-5% 오류율</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔧 3-큐비트 비트 플립 코드</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 기본 원리</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              하나의 논리 큐비트를 3개의 물리 큐비트로 인코딩하여 단일 비트 플립 오류를 정정합니다.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2">인코딩:</h4>
              <code className="text-sm">
                |0⟩_L → |000⟩<br/>
                |1⟩_L → |111⟩<br/>
                |ψ⟩ = α|0⟩ + β|1⟩ → α|000⟩ + β|111⟩
              </code>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏗️ Surface Code</h2>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🌐 실용적 양자 오류 정정</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Surface Code는 현재 가장 유망한 양자 오류 정정 코드로, 2D 격자에서 국소적 연산만을 사용합니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">장점</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 높은 오류 임계값 (~1%)</li>
                <li>• 2D 격자에서 국소적 연산</li>
                <li>• 확장 가능한 구조</li>
                <li>• 임의의 논리 게이트 가능</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">요구사항</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 거리 d 코드: d² 큐비트</li>
                <li>• 논리 오류율 ∝ p^(d+1)/2</li>
                <li>• 수천 개의 물리 큐비트</li>
                <li>• 실시간 신드롬 처리</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 6: 양자 머신러닝
function Chapter6Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Brain className="w-8 h-8 text-purple-600" />
          NISQ 시대의 양자 컴퓨팅
        </h2>
        
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔬 NISQ (Noisy Intermediate-Scale Quantum)</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            현재와 가까운 미래의 양자 컴퓨터는 완벽한 오류 정정 없이 50-1000 큐비트 규모로 작동합니다.
            이 시대에 실용적 양자 우위를 달성하기 위한 알고리즘들이 개발되고 있습니다.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">제한된 큐비트</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">50-1000 큐비트</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">높은 오류율</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">0.1-1% 게이트 오류</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">얕은 회로</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">100-1000 게이트 깊이</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚗️ Variational Quantum Eigensolver (VQE)</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 목표: 바닥 상태 에너지 계산</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              VQE는 분자의 바닥 상태 에너지를 찾는 하이브리드 양자-고전 알고리즘입니다.
              화학, 재료과학, 신약 개발에 혁명적 응용이 기대됩니다.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2">알고리즘 구조:</h4>
              <code className="text-sm">
                E(θ) = ⟨ψ(θ)|H|ψ(θ)⟩<br/>
                |ψ(θ)⟩ = U(θ)|0...0⟩<br/>
                θ* = argmin E(θ)
              </code>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎯 QAOA (Quantum Approximate Optimization Algorithm)</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4">🧩 조합 최적화 문제</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              QAOA는 MaxCut, 여행자 문제 등 NP-hard 조합 최적화 문제에 대한 근사해를 찾습니다.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 포트폴리오 최적화</li>
              <li>• 교통 라우팅</li>
              <li>• 스케줄링 문제</li>
              <li>• 네트워크 분할</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 mb-4">⚙️ 알고리즘 구조</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              p-layer QAOA는 비용 해밀토니안과 믹서 해밀토니안을 번갈아 적용합니다.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <code className="text-sm">
                |ψ(β,γ)⟩ = ∏ⱼ U_B(βⱼ)U_C(γⱼ)|+⟩⊗ⁿ
              </code>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🧠 Quantum Neural Networks</h2>
        
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 PennyLane 프레임워크</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            PennyLane은 양자 머신러닝을 위한 파이썬 라이브러리로, 양자-고전 하이브리드 계산을 쉽게 구현할 수 있습니다.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold mb-2">기본 QML 구조:</h4>
            <pre className="text-sm overflow-x-auto"><code>{`import pennylane as qml
import numpy as np

dev = qml.device('default.qubit', wires=2)

@qml.qnode(dev)
def circuit(params, x):
    qml.AngleEmbedding(x, wires=range(2))
    qml.BasicEntanglerLayers(params, wires=range(2))
    return qml.expval(qml.PauliZ(0))

# 훈련 루프
for i in range(100):
    params = optimizer.step(cost, params)`}</code></pre>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 7: 양자 하드웨어
function Chapter7Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Eye className="w-8 h-8 text-purple-600" />
          양자 컴퓨터 하드웨어 플랫폼
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">🧊 초전도 큐비트 (IBM, Google)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              조셉슨 접합을 이용한 초전도 회로로 큐비트를 구현하는 가장 성숙한 기술입니다.
            </p>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <h4 className="font-semibold text-green-600 dark:text-green-400 text-sm mb-1">장점</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 빠른 게이트 연산 (10-100ns)</li>
                  <li>• 정확한 제어 가능</li>
                  <li>• 반도체 공정 활용</li>
                  <li>• 확장성 우수</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <h4 className="font-semibold text-red-600 dark:text-red-400 text-sm mb-1">단점</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 극저온 필요 (10-20mK)</li>
                  <li>• 짧은 코히어런스 시간</li>
                  <li>• 복잡한 냉각 시스템</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-4">⚛️ 이온 트랩 (IonQ, Alpine)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              전기장으로 포획된 원자 이온을 큐비트로 사용하는 고정밀 플랫폼입니다.
            </p>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <h4 className="font-semibold text-green-600 dark:text-green-400 text-sm mb-1">장점</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 높은 게이트 충실도 (99.9%+)</li>
                  <li>• 긴 코히어런스 시간</li>
                  <li>• 전 연결 토폴로지</li>
                  <li>• 정확한 상태 준비/측정</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <h4 className="font-semibold text-red-600 dark:text-red-400 text-sm mb-1">단점</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 느린 게이트 속도 (μs)</li>
                  <li>• 복잡한 레이저 시스템</li>
                  <li>• 확장성 한계</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">☁️ 클라우드 양자 컴퓨팅 플랫폼</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 주요 플랫폼 비교</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left p-3">플랫폼</th>
                  <th className="text-left p-3">하드웨어</th>
                  <th className="text-left p-3">언어/SDK</th>
                  <th className="text-left p-3">특징</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-3 font-semibold text-blue-600">IBM Quantum</td>
                  <td className="p-3">초전도 큐비트</td>
                  <td className="p-3">Qiskit (Python)</td>
                  <td className="p-3">오픈소스, 교육 중심</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-3 font-semibold text-green-600">Amazon Braket</td>
                  <td className="p-3">다중 벤더</td>
                  <td className="p-3">Python SDK</td>
                  <td className="p-3">AWS 통합, 시뮬레이터</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-3 font-semibold text-purple-600">IonQ</td>
                  <td className="p-3">이온 트랩</td>
                  <td className="p-3">Cirq, Qiskit</td>
                  <td className="p-3">높은 충실도</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-indigo-600">Google Quantum AI</td>
                  <td className="p-3">초전도 큐비트</td>
                  <td className="p-3">Cirq (Python)</td>
                  <td className="p-3">연구 중심, 제한 접근</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 8: 양자 컴퓨팅의 미래
function Chapter8Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Beaker className="w-8 h-8 text-purple-600" />
          양자 시뮬레이션과 분자 모델링
        </h2>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🧬 신약 개발 혁명</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            양자 컴퓨터는 분자의 양자 특성을 자연스럽게 시뮬레이션할 수 있어, 
            신약 개발과 화학 반응 예측에서 고전 컴퓨터를 뛰어넘는 성능을 보일 것으로 예상됩니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">응용 분야</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 단백질 접힘 예측</li>
                <li>• 효소 촉매 반응</li>
                <li>• 광합성 메커니즘</li>
                <li>• 신약 분자 설계</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">예상 영향</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 신약 개발 기간 단축 (10년→3년)</li>
                <li>• 개발 비용 대폭 절감</li>
                <li>• 개인맞춤형 치료제</li>
                <li>• 희귀질환 치료법 발견</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">💰 양자 금융과 리스크 분석</h2>
        
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📈 포트폴리오 최적화</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            양자 컴퓨터는 고차원 최적화 문제인 포트폴리오 최적화를 기존보다 빠르고 정확하게 해결할 수 있습니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">양자 알고리즘</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• QAOA 포트폴리오 선택</li>
                <li>• 양자 몬테카를로</li>
                <li>• VQE 리스크 모델링</li>
                <li>• 양자 머신러닝 예측</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">기대 효과</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 실시간 리스크 계산</li>
                <li>• 더 정확한 가격 모델</li>
                <li>• 고주파 거래 최적화</li>
                <li>• 사기 탐지 향상</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔐 양자 암호학과 양자 인터넷</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4">🚨 포스트 양자 암호학</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Shor 알고리즘의 위협에 대비한 새로운 암호 체계 개발이 진행 중입니다.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 격자 기반 암호학</li>
              <li>• 코드 기반 암호학</li>
              <li>• 다변수 암호학</li>
              <li>• 등원급수 암호학</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-4">🌐 양자 키 분배 (QKD)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              양자역학 법칙에 기반한 이론적으로 완벽한 보안 통신 시스템입니다.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• BB84 프로토콜</li>
              <li>• 광섬유 기반 QKD</li>
              <li>• 위성 QKD 네트워크</li>
              <li>• 양자 중계기 개발</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 투자 동향과 시장 전망</h2>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">💰 글로벌 투자 현황</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">정부 투자 (2024)</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 미국: 국가 양자 이니셔티브 ($18억)</li>
                <li>• 중국: 양자 정보 과학 ($150억)</li>
                <li>• EU: Quantum Flagship ($10억)</li>
                <li>• 한국: K-양자 뉴딜 (5천억원)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">민간 투자</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 2024년 벤처 투자: $24억</li>
                <li>• IBM, Google, Microsoft 등 빅테크</li>
                <li>• 양자 스타트업 1000+ 개</li>
                <li>• IPO 준비 기업들 다수</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">📈 시장 규모 전망</h4>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">$13억</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">2024년 현재</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">$50억</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">2030년 예상</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">$1000억</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">2040년 목표</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}