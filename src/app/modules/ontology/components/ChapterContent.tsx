'use client'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'

// Lazy load simulators
const RDFTripleEditor = dynamic(() => 
  import('@/components/rdf-editor/RDFTripleEditor').then(mod => ({ default: mod.RDFTripleEditor })), 
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center">RDF Editor 로딩 중...</div>
  }
)

const KnowledgeGraphContainer = dynamic(() => 
  import('@/components/knowledge-graph/KnowledgeGraphContainer').then(mod => ({ default: mod.KnowledgeGraphContainer })), 
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center">Knowledge Graph 로딩 중...</div>
  }
)

const SparqlPlayground = dynamic(() => 
  import('@/components/sparql-playground/SparqlPlayground').then(mod => ({ default: mod.SparqlPlayground })), 
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center">SPARQL Playground 로딩 중...</div>
  }
)

const InferenceEngine = dynamic(() => 
  import('@/components/rdf-editor/components/InferenceEngine').then(mod => ({ default: mod.InferenceEngine })), 
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center">추론 엔진 로딩 중...</div>
  }
)

interface ChapterContentProps {
  chapterId: string
}

export default function ChapterContent({ chapterId }: ChapterContentProps) {
  const renderContent = (): ReactNode => {
    switch (chapterId) {
      case 'intro':
        return <IntroContent />
      case 'chapter01':
        return <Chapter01Content />
      case 'chapter02':
        return <Chapter02Content />
      case 'chapter03':
        return <Chapter03Content />
      case 'chapter04':
        return <Chapter04Content />
      case 'chapter05':
        return <Chapter05Content />
      case 'chapter06':
        return <Chapter06Content />
      case 'chapter07':
        return <Chapter07Content />
      case 'chapter08':
        return <Chapter08Content />
      case 'chapter09':
        return <Chapter09Content />
      case 'chapter10':
        return <Chapter10Content />
      case 'chapter11':
        return <Chapter11Content />
      case 'chapter12':
        return <Chapter12Content />
      case 'chapter13':
        return <Chapter13Content />
      case 'chapter14':
        return <Chapter14Content />
      case 'chapter15':
        return <Chapter15Content />
      case 'chapter16':
        return <Chapter16Content />
      default:
        return <ComingSoonContent />
    }
  }

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none 
      prose-headings:text-gray-900 dark:prose-headings:text-white
      prose-p:text-gray-700 dark:prose-p:text-gray-300
      prose-strong:text-gray-900 dark:prose-strong:text-white
      prose-a:text-indigo-600 dark:prose-a:text-indigo-400
      prose-code:text-indigo-600 dark:prose-code:text-indigo-400
      prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900
      prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8
      prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
      prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
      prose-p:leading-relaxed prose-p:mb-6
      prose-li:my-2">
      {renderContent()}
    </div>
  )
}

// Chapter Contents
function IntroContent() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">온톨로지 시뮬레이터에 오신 것을 환영합니다!</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg leading-relaxed">
            이 시뮬레이터는 복잡한 온톨로지 개념을 <strong>직접 체험하며 학습</strong>할 수 있도록 설계되었습니다.
            이론적 설명과 함께 <strong>인터랙티브한 실습 도구</strong>를 제공하여, 
            온톨로지의 핵심 개념부터 실전 활용까지 단계별로 마스터할 수 있습니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">학습 여정</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">이론 파트</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 온톨로지의 철학적 배경</li>
              <li>• 시맨틱 웹과 링크드 데이터</li>
              <li>• RDF, RDFS, OWL 표준</li>
              <li>• SPARQL 쿼리 언어</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">실습 파트</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• RDF Triple Editor 사용</li>
              <li>• 3D 지식 그래프 시각화</li>
              <li>• 실제 온톨로지 구축</li>
              <li>• 추론 엔진 활용</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">시뮬레이터 특징</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">체험 중심 학습</h4>
              <p className="text-gray-600 dark:text-gray-400">
                단순히 읽는 것이 아닌, 직접 만들고 실험하며 개념을 체득합니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🔄</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">즉각적인 피드백</h4>
              <p className="text-gray-600 dark:text-gray-400">
                작성한 온톨로지의 유효성을 실시간으로 검증하고 추론 결과를 확인합니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">시각화 도구</h4>
              <p className="text-gray-600 dark:text-gray-400">
                복잡한 관계를 2D/3D 그래프로 시각화하여 직관적으로 이해할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">시작하기 전에</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          이 과정은 프로그래밍 경험이 없어도 따라올 수 있도록 설계되었습니다.
          하지만 다음 개념에 대한 기초적인 이해가 있다면 더욱 도움이 됩니다:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>데이터베이스의 기본 개념 (테이블, 관계)</li>
          <li>웹의 작동 원리 (URL, HTTP)</li>
          <li>논리적 사고와 추론</li>
        </ul>
      </section>

      <div className="mt-12 p-6 bg-indigo-600 text-white rounded-xl text-center">
        <p className="text-lg font-medium">
          준비되셨나요? Chapter 1부터 온톨로지의 세계로 함께 떠나봅시다! 🚀
        </p>
      </div>
    </div>
  )
}

function Chapter01Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 1: 온톨로지란 무엇인가?</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg italic">
            "존재하는 것들에 대한 체계적인 설명" - 온톨로지의 가장 간단한 정의
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">온톨로지의 기원</h2>
        <p className="mb-4">
          온톨로지(Ontology)라는 용어는 그리스어 'ontos'(존재)와 'logos'(학문)에서 유래했습니다.
          원래는 <strong>철학</strong>의 한 분야로, "존재란 무엇인가?"라는 근본적인 질문을 다루었습니다.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-3">철학에서 컴퓨터 과학으로</h3>
          <p className="text-gray-700 dark:text-gray-300">
            1990년대부터 컴퓨터 과학자들은 이 개념을 차용하여, 
            <strong>특정 도메인의 지식을 형식적으로 표현하는 방법</strong>으로 발전시켰습니다.
            이제 온톨로지는 AI, 시맨틱 웹, 지식 관리의 핵심 기술이 되었습니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">컴퓨터 과학에서의 온톨로지</h2>
        <p className="mb-6">
          컴퓨터 과학에서 온톨로지는 다음과 같이 정의됩니다:
        </p>
        
        <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-xl p-6 mb-6 border-l-4 border-indigo-600">
          <p className="font-medium text-lg">
            "특정 도메인 내의 개념들과 그들 간의 관계를 명시적이고 형식적으로 정의한 명세(specification)"
          </p>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            - Tom Gruber, 1993
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-3">온톨로지의 구성 요소</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">개념(Concepts)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              도메인의 기본 요소들<br/>
              예: 사람, 회사, 제품
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">관계(Relations)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              개념들 간의 연결<br/>
              예: 근무한다, 생산한다
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">공리(Axioms)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              도메인의 규칙과 제약<br/>
              예: 모든 사람은 하나의 생일을 가진다
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">왜 온톨로지가 필요한가?</h2>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 dark:text-green-400 font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">지식의 공유와 재사용</h4>
              <p className="text-gray-600 dark:text-gray-400">
                동일한 도메인에서 작업하는 사람들이 공통된 이해를 가질 수 있습니다.
                한 번 만든 온톨로지는 여러 시스템에서 재사용할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 dark:text-green-400 font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">시스템 간 상호운용성</h4>
              <p className="text-gray-600 dark:text-gray-400">
                서로 다른 시스템이 동일한 온톨로지를 사용하면 데이터를 쉽게 교환할 수 있습니다.
                의미적 충돌 없이 정보를 통합할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 dark:text-green-400 font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">추론과 지식 발견</h4>
              <p className="text-gray-600 dark:text-gray-400">
                명시적으로 저장되지 않은 지식도 논리적 추론을 통해 도출할 수 있습니다.
                숨겨진 관계나 패턴을 발견할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">실제 예시: 가족 온톨로지</h2>
        <p className="mb-4">
          간단한 가족 관계 온톨로지를 통해 개념을 이해해봅시다:
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 font-mono text-sm">
          <div className="mb-4">
            <span className="text-indigo-600 dark:text-indigo-400">// 클래스 정의</span><br/>
            <span className="text-green-600 dark:text-green-400">Class:</span> Person<br/>
            <span className="text-green-600 dark:text-green-400">Class:</span> Male <span className="text-gray-500">subClassOf</span> Person<br/>
            <span className="text-green-600 dark:text-green-400">Class:</span> Female <span className="text-gray-500">subClassOf</span> Person<br/>
          </div>
          
          <div className="mb-4">
            <span className="text-indigo-600 dark:text-indigo-400">// 속성 정의</span><br/>
            <span className="text-blue-600 dark:text-blue-400">Property:</span> hasParent <span className="text-gray-500">(domain: Person, range: Person)</span><br/>
            <span className="text-blue-600 dark:text-blue-400">Property:</span> hasChild <span className="text-gray-500">(inverse of hasParent)</span><br/>
            <span className="text-blue-600 dark:text-blue-400">Property:</span> hasSibling <span className="text-gray-500">(symmetric)</span><br/>
          </div>
          
          <div>
            <span className="text-indigo-600 dark:text-indigo-400">// 추론 규칙</span><br/>
            <span className="text-purple-600 dark:text-purple-400">Rule:</span> If X hasParent Y and Z hasParent Y, then X hasSibling Z
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          핵심 포인트
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• 온톨로지는 지식을 컴퓨터가 이해할 수 있는 형태로 표현합니다</li>
          <li>• 개념, 관계, 규칙의 세 가지 요소로 구성됩니다</li>
          <li>• 지식 공유, 상호운용성, 추론 능력을 제공합니다</li>
          <li>• 실제 세계의 복잡한 관계를 모델링할 수 있습니다</li>
        </ul>
      </section>
    </div>
  )
}

function Chapter02Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 2: 온톨로지의 핵심 개념</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            온톨로지를 구성하는 핵심 요소들을 깊이 있게 살펴보고,
            이들이 어떻게 조합되어 지식을 표현하는지 알아봅시다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">1. 클래스(Classes)</h2>
        <p className="mb-4">
          클래스는 온톨로지의 가장 기본적인 구성 요소로, <strong>동일한 특성을 가진 개체들의 집합</strong>을 나타냅니다.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3">클래스의 특징</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 계층 구조를 형성 (상위/하위 클래스)</li>
              <li>• 다중 상속 가능</li>
              <li>• 개체들의 템플릿 역할</li>
              <li>• 속성과 제약사항 정의</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3">예시: 동물 분류</h3>
            <div className="font-mono text-sm">
              <div className="ml-0">Animal</div>
              <div className="ml-4">├─ Mammal</div>
              <div className="ml-8">│  ├─ Dog</div>
              <div className="ml-8">│  └─ Cat</div>
              <div className="ml-4">└─ Bird</div>
              <div className="ml-8">   ├─ Eagle</div>
              <div className="ml-8">   └─ Sparrow</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">2. 속성(Properties)</h2>
        <p className="mb-4">
          속성은 클래스나 개체들 간의 <strong>관계를 표현</strong>하거나 <strong>특성을 나타냅니다</strong>.
        </p>
        
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">객체 속성 (Object Properties)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              개체와 개체 사이의 관계를 나타냅니다.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-sm">
              <div>• Person <span className="text-blue-600">hasChild</span> Person</div>
              <div>• Student <span className="text-blue-600">enrolledIn</span> Course</div>
              <div>• Company <span className="text-blue-600">employs</span> Employee</div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">데이터 속성 (Data Properties)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              개체의 리터럴 값(문자열, 숫자 등)을 나타냅니다.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-sm">
              <div>• Person <span className="text-green-600">hasAge</span> Integer</div>
              <div>• Product <span className="text-green-600">hasPrice</span> Decimal</div>
              <div>• Book <span className="text-green-600">hasTitle</span> String</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">3. 개체(Individuals)</h2>
        <p className="mb-4">
          개체는 클래스의 <strong>실제 인스턴스</strong>입니다. 실제 세계의 구체적인 사물이나 개념을 나타냅니다.
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
          <h3 className="font-semibold mb-3">예시: 회사 온톨로지</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-indigo-600 dark:text-indigo-400">클래스 정의</h4>
              <div className="font-mono text-sm space-y-1">
                <div>Class: Company</div>
                <div>Class: Employee</div>
                <div>Class: Product</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-indigo-600 dark:text-indigo-400">개체 예시</h4>
              <div className="font-mono text-sm space-y-1">
                <div>Apple : Company</div>
                <div>TimCook : Employee</div>
                <div>iPhone15 : Product</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">4. 공리(Axioms)</h2>
        <p className="mb-4">
          공리는 온톨로지 내에서 <strong>항상 참이라고 가정되는 명제</strong>입니다. 
          도메인의 규칙과 제약사항을 정의합니다.
        </p>
        
        <div className="space-y-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">주요 공리 유형</h3>
            <ul className="space-y-3">
              <li>
                <strong>클래스 공리</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  예: "모든 학생은 사람이다" (Student subClassOf Person)
                </p>
              </li>
              <li>
                <strong>속성 공리</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  예: "hasParent는 hasChild의 역관계다" (hasParent inverseOf hasChild)
                </p>
              </li>
              <li>
                <strong>개체 공리</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  예: "John과 Jane는 서로 다른 개체다" (John differentFrom Jane)
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">속성의 특성(Property Characteristics)</h2>
        <p className="mb-4">
          속성은 다양한 특성을 가질 수 있으며, 이는 추론에 중요한 역할을 합니다.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">대칭성 (Symmetric)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A가 B와 관계가 있으면, B도 A와 같은 관계
            </p>
            <p className="text-sm font-mono mt-2">예: hasFriend, isMarriedTo</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">이행성 (Transitive)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A→B이고 B→C이면, A→C
            </p>
            <p className="text-sm font-mono mt-2">예: hasAncestor, locatedIn</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">함수성 (Functional)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              각 주체는 최대 하나의 값만 가질 수 있음
            </p>
            <p className="text-sm font-mono mt-2">예: hasBirthDate, hasSSN</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">역함수성 (InverseFunctional)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              각 값은 최대 하나의 주체에만 연결됨
            </p>
            <p className="text-sm font-mono mt-2">예: hasEmail, hasPassport</p>
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          실습 예고
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          다음 챕터에서는 이러한 개념들이 시맨틱 웹에서 어떻게 활용되는지 알아보고,
          Chapter 4에서는 RDF Triple Editor를 사용하여 직접 온톨로지를 만들어볼 예정입니다.
        </p>
      </section>
    </div>
  )
}

function Chapter03Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 3: 시맨틱 웹과 온톨로지</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            "웹을 거대한 데이터베이스로" - 팀 버너스-리의 시맨틱 웹 비전
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">웹의 진화</h2>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-blue-600 dark:text-blue-400">1.0</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Web 1.0: 읽기 전용 웹</h3>
              <p className="text-gray-600 dark:text-gray-400">
                정적 HTML 페이지, 일방향 정보 전달, 하이퍼링크로 연결된 문서들
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-green-600 dark:text-green-400">2.0</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Web 2.0: 참여와 공유의 웹</h3>
              <p className="text-gray-600 dark:text-gray-400">
                동적 콘텐츠, 소셜 미디어, 사용자 생성 콘텐츠, API와 매시업
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-purple-600 dark:text-purple-400">3.0</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Web 3.0: 시맨틱 웹</h3>
              <p className="text-gray-600 dark:text-gray-400">
                기계가 이해하는 웹, 데이터의 의미와 관계 표현, 지능적인 정보 처리
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">시맨틱 웹의 핵심 개념</h2>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-3">현재 웹의 한계</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">문제점</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• HTML은 표현에만 집중</li>
                <li>• 데이터의 의미 파악 불가</li>
                <li>• 자동화된 처리 어려움</li>
                <li>• 정보 통합의 한계</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">시맨틱 웹의 해결책</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• 메타데이터 추가</li>
                <li>• 표준화된 의미 표현</li>
                <li>• 기계 가독성 확보</li>
                <li>• 자동 추론 가능</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">시맨틱 웹 기술 스택</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <div className="bg-purple-100 dark:bg-purple-900 rounded p-3 text-center font-semibold">
              Trust / Proof / Crypto
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900 rounded p-3 text-center font-semibold">
              Logic / Rules (SWRL, RIF)
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 rounded p-3 text-center font-semibold">
              Ontology (OWL)
            </div>
            <div className="bg-green-100 dark:bg-green-900 rounded p-3 text-center font-semibold">
              Schema (RDFS)
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 rounded p-3 text-center font-semibold">
              Data Model (RDF)
            </div>
            <div className="bg-orange-100 dark:bg-orange-900 rounded p-3 text-center font-semibold">
              Syntax (XML, Turtle, JSON-LD)
            </div>
            <div className="bg-red-100 dark:bg-red-900 rounded p-3 text-center font-semibold">
              Identifiers (URI/IRI)
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 text-center font-semibold">
              Character Set (Unicode)
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">링크드 데이터 (Linked Data)</h2>
        <p className="mb-4">
          팀 버너스-리가 제안한 시맨틱 웹 구현을 위한 실천 방법론입니다.
        </p>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-4">링크드 데이터의 4가지 원칙</h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
              <div>
                <strong>URI 사용</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  모든 것에 고유한 URI를 부여하여 식별 가능하게 만든다
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
              <div>
                <strong>HTTP URI 사용</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  웹 브라우저나 프로그램이 접근할 수 있도록 HTTP URI를 사용한다
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
              <div>
                <strong>표준 형식 제공</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  URI에 접근했을 때 RDF, SPARQL 등 표준 형식으로 유용한 정보를 제공한다
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span>
              <div>
                <strong>다른 URI와 연결</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  관련된 다른 데이터의 URI를 포함하여 웹을 탐색할 수 있게 한다
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">LOD Cloud (Linked Open Data)</h2>
        <p className="mb-4">
          전 세계적으로 공개된 링크드 데이터의 거대한 네트워크입니다.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">DBpedia</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wikipedia의 정보를 구조화한 지식베이스
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Wikidata</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              협업으로 구축되는 자유 지식베이스
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Schema.org</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              웹 콘텐츠 마크업을 위한 공통 어휘
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">온톨로지의 역할</h2>
        <p className="mb-4">
          시맨틱 웹에서 온톨로지는 <strong>공통 어휘와 의미 체계</strong>를 제공하는 핵심 역할을 합니다.
        </p>
        
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-4">온톨로지가 가능하게 하는 것들</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-purple-600 dark:text-purple-400">데이터 통합</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                서로 다른 소스의 데이터를 의미적으로 연결하고 통합
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-purple-600 dark:text-purple-400">지능형 검색</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                단순 키워드가 아닌 의미 기반 검색 가능
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-purple-600 dark:text-purple-400">자동 추론</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                명시되지 않은 정보도 논리적으로 도출
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-purple-600 dark:text-purple-400">지식 공유</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                표준화된 형식으로 지식을 공유하고 재사용
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          다음 단계
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          이제 시맨틱 웹의 개념을 이해했으니, 다음 챕터부터는 실제로 이를 구현하는 
          기술들(RDF, RDFS, OWL, SPARQL)을 하나씩 학습하고 실습해보겠습니다.
        </p>
      </section>
    </div>
  )
}

function Chapter04Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 4: RDF - 지식 표현의 기초</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            RDF(Resource Description Framework)는 시맨틱 웹의 기초가 되는 데이터 모델입니다.
            모든 지식을 <strong>주어-술어-목적어</strong>의 트리플로 표현합니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">RDF 트리플의 구조</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-center flex-1">
              <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">S</span>
              </div>
              <h3 className="font-semibold">Subject</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">주어</p>
              <p className="text-xs mt-1">리소스 (URI)</p>
            </div>
            
            <div className="text-gray-400 text-2xl">→</div>
            
            <div className="text-center flex-1">
              <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">P</span>
              </div>
              <h3 className="font-semibold">Predicate</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">술어</p>
              <p className="text-xs mt-1">속성 (URI)</p>
            </div>
            
            <div className="text-gray-400 text-2xl">→</div>
            
            <div className="text-center flex-1">
              <div className="w-20 h-20 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">O</span>
              </div>
              <h3 className="font-semibold">Object</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">목적어</p>
              <p className="text-xs mt-1">리소스 또는 리터럴</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <h3 className="font-semibold mb-3">예시 트리플</h3>
          <div className="font-mono text-sm space-y-2">
            <div>
              <span className="text-blue-600">:TimBernersLee</span>
              <span className="text-green-600 mx-2">:invented</span>
              <span className="text-purple-600">:WorldWideWeb</span> .
            </div>
            <div>
              <span className="text-blue-600">:Seoul</span>
              <span className="text-green-600 mx-2">:isCapitalOf</span>
              <span className="text-purple-600">:SouthKorea</span> .
            </div>
            <div>
              <span className="text-blue-600">:Einstein</span>
              <span className="text-green-600 mx-2">:bornIn</span>
              <span className="text-purple-600">"1879"^^xsd:integer</span> .
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">RDF Triple Editor 실습</h2>
        <p className="mb-4">
          아래 에디터를 사용하여 직접 RDF 트리플을 만들어보세요!
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <RDFTripleEditor />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">RDF 직렬화 형식</h2>
        <p className="mb-4">
          RDF는 다양한 형식으로 표현될 수 있습니다. 각 형식은 같은 정보를 다른 방식으로 표현합니다.
        </p>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3">1. Turtle (Terse RDF Triple Language)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              가장 인간 친화적이고 간결한 형식
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-sm">
              <div>@prefix ex: &lt;http://example.org/&gt; .</div>
              <div>@prefix foaf: &lt;http://xmlns.com/foaf/0.1/&gt; .</div>
              <div className="mt-2">ex:john foaf:name "John Doe" ;</div>
              <div className="ml-8">foaf:age 30 ;</div>
              <div className="ml-8">foaf:knows ex:jane .</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3">2. RDF/XML</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              XML 기반의 표준 형식 (장황하지만 호환성 좋음)
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-sm overflow-x-auto">
              <div>&lt;rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"</div>
              <div className="ml-9">xmlns:foaf="http://xmlns.com/foaf/0.1/"&gt;</div>
              <div className="ml-2">&lt;rdf:Description rdf:about="http://example.org/john"&gt;</div>
              <div className="ml-4">&lt;foaf:name&gt;John Doe&lt;/foaf:name&gt;</div>
              <div className="ml-4">&lt;foaf:age rdf:datatype="http://www.w3.org/2001/XMLSchema#integer"&gt;30&lt;/foaf:age&gt;</div>
              <div className="ml-2">&lt;/rdf:Description&gt;</div>
              <div>&lt;/rdf:RDF&gt;</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3">3. JSON-LD</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              웹 개발자 친화적인 JSON 형식
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-sm">
              <div>{`{`}</div>
              <div className="ml-2">"@context": {`{`}</div>
              <div className="ml-4">"foaf": "http://xmlns.com/foaf/0.1/"</div>
              <div className="ml-2">{`},`}</div>
              <div className="ml-2">"@id": "http://example.org/john",</div>
              <div className="ml-2">"foaf:name": "John Doe",</div>
              <div className="ml-2">"foaf:age": 30</div>
              <div>{`}`}</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">RDF 네임스페이스</h2>
        <p className="mb-4">
          네임스페이스는 어휘의 충돌을 방지하고 재사용성을 높입니다.
        </p>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-3">주요 표준 네임스페이스</h3>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <span className="text-indigo-600 dark:text-indigo-400">rdf:</span>
              <span className="text-gray-600 dark:text-gray-400"> http://www.w3.org/1999/02/22-rdf-syntax-ns#</span>
            </div>
            <div>
              <span className="text-indigo-600 dark:text-indigo-400">rdfs:</span>
              <span className="text-gray-600 dark:text-gray-400"> http://www.w3.org/2000/01/rdf-schema#</span>
            </div>
            <div>
              <span className="text-indigo-600 dark:text-indigo-400">owl:</span>
              <span className="text-gray-600 dark:text-gray-400"> http://www.w3.org/2002/07/owl#</span>
            </div>
            <div>
              <span className="text-indigo-600 dark:text-indigo-400">foaf:</span>
              <span className="text-gray-600 dark:text-gray-400"> http://xmlns.com/foaf/0.1/</span>
            </div>
            <div>
              <span className="text-indigo-600 dark:text-indigo-400">dc:</span>
              <span className="text-gray-600 dark:text-gray-400"> http://purl.org/dc/elements/1.1/</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">RDF 그래프</h2>
        <p className="mb-4">
          여러 트리플이 모여 그래프를 형성합니다. 노드는 리소스, 엣지는 관계를 나타냅니다.
        </p>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-4">다음 챕터에서는 RDF 그래프를 3D로 시각화하는 도구를 사용해볼 예정입니다!</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <span className="text-2xl">🎯</span>
              <span>Knowledge Graph 시각화 예고</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          핵심 정리
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• RDF는 모든 지식을 Subject-Predicate-Object 트리플로 표현</li>
          <li>• URI를 사용하여 전역적으로 고유한 식별자 제공</li>
          <li>• 다양한 직렬화 형식 지원 (Turtle, RDF/XML, JSON-LD 등)</li>
          <li>• 네임스페이스로 어휘 충돌 방지 및 재사용성 확보</li>
          <li>• 여러 트리플이 연결되어 지식 그래프 형성</li>
        </ul>
      </section>
    </div>
  )
}

function Chapter05Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 5: RDFS - 스키마와 계층구조</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            RDF Schema(RDFS)는 RDF의 어휘를 정의하고 계층 구조를 표현하기 위한 언어입니다.
            클래스와 속성의 관계를 명확히 정의할 수 있습니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">RDFS의 필요성</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">RDF만의 한계</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 클래스 개념 없음</li>
              <li>• 속성의 도메인/레인지 정의 불가</li>
              <li>• 계층 구조 표현 어려움</li>
              <li>• 타입 체크 불가능</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">RDFS의 해결책</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 클래스와 서브클래스 정의</li>
              <li>• 속성의 제약사항 명시</li>
              <li>• 타입 시스템 제공</li>
              <li>• 기본적인 추론 가능</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">RDFS 핵심 어휘</h2>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3">클래스 관련</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">rdfs:Class</code>
                <p className="text-sm text-gray-600 dark:text-gray-400">모든 클래스의 클래스</p>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">rdfs:subClassOf</code>
                <p className="text-sm text-gray-600 dark:text-gray-400">클래스 간 계층 관계 정의</p>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">rdf:type</code>
                <p className="text-sm text-gray-600 dark:text-gray-400">인스턴스의 클래스 지정</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">속성 관련</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">rdf:Property</code>
                <p className="text-sm text-gray-600 dark:text-gray-400">모든 속성의 클래스</p>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">rdfs:domain</code>
                <p className="text-sm text-gray-600 dark:text-gray-400">속성의 주어가 될 수 있는 클래스</p>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">rdfs:range</code>
                <p className="text-sm text-gray-600 dark:text-gray-400">속성의 목적어가 될 수 있는 클래스/타입</p>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">rdfs:subPropertyOf</code>
                <p className="text-sm text-gray-600 dark:text-gray-400">속성 간 계층 관계</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">RDFS 예제: 도서관 온톨로지</h2>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 font-mono text-sm">
          <div className="space-y-4">
            <div>
              <span className="text-gray-500"># 클래스 정의</span><br/>
              <span className="text-blue-600">:Publication</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">rdfs:Class</span> .<br/>
              <span className="text-blue-600">:Book</span> <span className="text-green-600">rdfs:subClassOf</span> <span className="text-purple-600">:Publication</span> .<br/>
              <span className="text-blue-600">:Magazine</span> <span className="text-green-600">rdfs:subClassOf</span> <span className="text-purple-600">:Publication</span> .<br/>
              <span className="text-blue-600">:Person</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">rdfs:Class</span> .<br/>
              <span className="text-blue-600">:Author</span> <span className="text-green-600">rdfs:subClassOf</span> <span className="text-purple-600">:Person</span> .
            </div>
            
            <div>
              <span className="text-gray-500"># 속성 정의</span><br/>
              <span className="text-blue-600">:writtenBy</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">rdf:Property</span> ;<br/>
              <span className="ml-12 text-green-600">rdfs:domain</span> <span className="text-purple-600">:Publication</span> ;<br/>
              <span className="ml-12 text-green-600">rdfs:range</span> <span className="text-purple-600">:Author</span> .<br/>
              <br/>
              <span className="text-blue-600">:hasISBN</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">rdf:Property</span> ;<br/>
              <span className="ml-10 text-green-600">rdfs:domain</span> <span className="text-purple-600">:Book</span> ;<br/>
              <span className="ml-10 text-green-600">rdfs:range</span> <span className="text-purple-600">xsd:string</span> .
            </div>
            
            <div>
              <span className="text-gray-500"># 인스턴스 예시</span><br/>
              <span className="text-blue-600">:HarryPotter1</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">:Book</span> ;<br/>
              <span className="ml-14 text-green-600">:writtenBy</span> <span className="text-purple-600">:JKRowling</span> ;<br/>
              <span className="ml-14 text-green-600">:hasISBN</span> <span className="text-purple-600">"978-0439708180"</span> .<br/>
              <br/>
              <span className="text-blue-600">:JKRowling</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">:Author</span> .
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">RDFS 추론</h2>
        <p className="mb-4">
          RDFS는 간단하지만 강력한 추론 기능을 제공합니다.
        </p>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-4">추론 예시</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">1. 클래스 계층 추론</h4>
              <div className="bg-white dark:bg-gray-800 rounded p-4">
                <p className="text-sm mb-2">주어진 사실:</p>
                <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                  :Book rdfs:subClassOf :Publication .<br/>
                  :HarryPotter rdf:type :Book .
                </div>
                <p className="text-sm mt-3 mb-2">추론된 사실:</p>
                <div className="font-mono text-sm text-green-600 dark:text-green-400">
                  :HarryPotter rdf:type :Publication .
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">2. 도메인/레인지 추론</h4>
              <div className="bg-white dark:bg-gray-800 rounded p-4">
                <p className="text-sm mb-2">주어진 사실:</p>
                <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                  :writtenBy rdfs:domain :Publication .<br/>
                  :writtenBy rdfs:range :Author .<br/>
                  :X :writtenBy :Y .
                </div>
                <p className="text-sm mt-3 mb-2">추론된 사실:</p>
                <div className="font-mono text-sm text-green-600 dark:text-green-400">
                  :X rdf:type :Publication .<br/>
                  :Y rdf:type :Author .
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">RDFS vs OWL</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">특징</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">RDFS</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">OWL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">표현력</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">기본적</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">매우 풍부</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">추론 복잡도</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">낮음</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">높음</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">주요 기능</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">클래스/속성 계층</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">복잡한 제약, 논리 연산</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">학습 난이도</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">쉬움</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">어려움</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          실습 과제
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          다음 도메인 중 하나를 선택하여 RDFS로 간단한 온톨로지를 설계해보세요:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>대학교 (학생, 교수, 과목, 학과)</li>
          <li>병원 (의사, 환자, 진료, 약품)</li>
          <li>온라인 쇼핑몰 (상품, 고객, 주문, 배송)</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          힌트: 클래스 3-4개, 속성 4-5개 정도로 시작하세요!
        </p>
      </section>
    </div>
  )
}

function Chapter06Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 6: OWL - 표현력 있는 온톨로지</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            OWL(Web Ontology Language)은 RDFS보다 훨씬 풍부한 표현력을 제공하는 온톨로지 언어입니다.
            복잡한 개념과 관계를 정확하게 모델링할 수 있습니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">OWL의 세 가지 하위 언어</h2>
        
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">OWL Lite</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              가장 단순한 형태로, 분류 계층과 간단한 제약사항만 표현
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              • 카디널리티: 0 또는 1만 가능<br/>
              • 계산 복잡도: 낮음
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">OWL DL (Description Logic)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              완전성과 결정가능성을 보장하면서 최대한의 표현력 제공
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              • 모든 추론이 유한 시간 내 완료<br/>
              • 실무에서 가장 많이 사용
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">OWL Full</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              RDF와 완전히 호환되며 최대의 표현력 제공
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              • 결정 불가능한 경우 존재<br/>
              • 메타 클래스 허용
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">OWL의 주요 구성 요소</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3">클래스 표현</h3>
            <ul className="space-y-2 text-sm">
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:Class</code> - 클래스 정의</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:equivalentClass</code> - 동등 클래스</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:disjointWith</code> - 배타적 클래스</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:complementOf</code> - 여집합</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">속성 표현</h3>
            <ul className="space-y-2 text-sm">
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:ObjectProperty</code> - 객체 속성</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:DatatypeProperty</code> - 데이터 속성</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:inverseOf</code> - 역관계</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:TransitiveProperty</code> - 이행성</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">제약사항</h3>
            <ul className="space-y-2 text-sm">
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:allValuesFrom</code> - 전칭 제약</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:someValuesFrom</code> - 존재 제약</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:hasValue</code> - 값 제약</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:cardinality</code> - 개수 제약</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">논리 연산</h3>
            <ul className="space-y-2 text-sm">
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:intersectionOf</code> - 교집합</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:unionOf</code> - 합집합</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:oneOf</code> - 열거형</li>
              <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">owl:complementOf</code> - 여집합</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">OWL 예제: 가족 온톨로지</h2>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
          <div className="space-y-4">
            <div>
              <span className="text-gray-500"># 클래스 정의</span><br/>
              <span className="text-blue-600">:Person</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">owl:Class</span> .<br/>
              <br/>
              <span className="text-blue-600">:Male</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">owl:Class</span> ;<br/>
              <span className="ml-8 text-green-600">rdfs:subClassOf</span> <span className="text-purple-600">:Person</span> ;<br/>
              <span className="ml-8 text-green-600">owl:disjointWith</span> <span className="text-purple-600">:Female</span> .<br/>
              <br/>
              <span className="text-blue-600">:Parent</span> <span className="text-green-600">owl:equivalentClass</span> [<br/>
              <span className="ml-4 text-green-600">rdf:type</span> <span className="text-purple-600">owl:Restriction</span> ;<br/>
              <span className="ml-4 text-green-600">owl:onProperty</span> <span className="text-purple-600">:hasChild</span> ;<br/>
              <span className="ml-4 text-green-600">owl:minCardinality</span> <span className="text-purple-600">1</span><br/>
              ] .
            </div>
            
            <div>
              <span className="text-gray-500"># 속성 정의</span><br/>
              <span className="text-blue-600">:hasParent</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">owl:ObjectProperty</span> ;<br/>
              <span className="ml-12 text-green-600">owl:inverseOf</span> <span className="text-purple-600">:hasChild</span> ;<br/>
              <span className="ml-12 text-green-600">rdfs:domain</span> <span className="text-purple-600">:Person</span> ;<br/>
              <span className="ml-12 text-green-600">rdfs:range</span> <span className="text-purple-600">:Person</span> .<br/>
              <br/>
              <span className="text-blue-600">:hasAncestor</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">owl:TransitiveProperty</span> .
            </div>
            
            <div>
              <span className="text-gray-500"># 복잡한 클래스 정의</span><br/>
              <span className="text-blue-600">:Father</span> <span className="text-green-600">owl:equivalentClass</span> [<br/>
              <span className="ml-4 text-green-600">owl:intersectionOf</span> (<br/>
              <span className="ml-8 text-purple-600">:Male</span><br/>
              <span className="ml-8 text-purple-600">:Parent</span><br/>
              <span className="ml-4">)</span><br/>
              ] .
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">추론 엔진 시뮬레이터</h2>
        <p className="mb-4">
          OWL 온톨로지의 추론 과정을 시각화해보세요!
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <InferenceEngine triples={[
            { id: '1', subject: ':John', predicate: ':hasParent', object: ':Mary' },
            { id: '2', subject: ':Mary', predicate: ':hasParent', object: ':Susan' },
            { id: '3', subject: ':John', predicate: ':marriedTo', object: ':Jane' },
            { id: '4', subject: ':Dog', predicate: 'rdfs:subClassOf', object: ':Animal' },
            { id: '5', subject: ':Buddy', predicate: 'rdf:type', object: ':Dog' }
          ]} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">OWL 제약사항 예제</h2>
        
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">1. 개수 제약 (Cardinality)</h3>
            <div className="font-mono text-sm mb-3">
              <span className="text-gray-500"># 모든 사람은 정확히 2명의 생물학적 부모를 가진다</span><br/>
              :Person rdfs:subClassOf [<br/>
              <span className="ml-4">owl:onProperty :hasBiologicalParent ;</span><br/>
              <span className="ml-4">owl:cardinality 2</span><br/>
              ] .
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">2. 값 제약 (Value Restriction)</h3>
            <div className="font-mono text-sm mb-3">
              <span className="text-gray-500"># 채식주의자는 육류를 먹지 않는다</span><br/>
              :Vegetarian rdfs:subClassOf [<br/>
              <span className="ml-4">owl:onProperty :eats ;</span><br/>
              <span className="ml-4">owl:allValuesFrom :NonMeatFood</span><br/>
              ] .
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">3. 존재 제약 (Existential)</h3>
            <div className="font-mono text-sm mb-3">
              <span className="text-gray-500"># 부모는 적어도 한 명의 자녀가 있다</span><br/>
              :Parent owl:equivalentClass [<br/>
              <span className="ml-4">owl:onProperty :hasChild ;</span><br/>
              <span className="ml-4">owl:someValuesFrom :Person</span><br/>
              ] .
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          OWL 사용 시 주의사항
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• 표현력과 추론 복잡도는 트레이드오프 관계</li>
          <li>• OWL DL을 사용하면 대부분의 요구사항 충족 가능</li>
          <li>• 복잡한 공리는 추론 성능에 큰 영향</li>
          <li>• 온톨로지 설계 시 목적에 맞는 적절한 수준 선택 중요</li>
        </ul>
      </section>
    </div>
  )
}

function Chapter07Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 7: SPARQL - 온톨로지 질의 언어</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            SPARQL(SPARQL Protocol and RDF Query Language)은 RDF 데이터를 조회하고 조작하는 
            표준 질의 언어입니다. SQL과 유사하지만 그래프 데이터에 특화되어 있습니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">SPARQL 기본 구조</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3">기본 쿼리 형식</h3>
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-sm">
            <div className="text-purple-600">PREFIX</div>
            <div className="text-blue-600">SELECT</div> <span className="text-gray-600">?variable</span>
            <div className="text-green-600">WHERE</div> {`{`}
            <div className="ml-4">트리플 패턴들...</div>
            {`}`}
            <div className="text-orange-600">ORDER BY</div> <span className="text-gray-600">?variable</span>
            <div className="text-red-600">LIMIT</div> <span className="text-gray-600">10</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">SPARQL 쿼리 타입</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">SELECT</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              테이블 형식으로 결과 반환 (가장 많이 사용)
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">CONSTRUCT</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              새로운 RDF 그래프 생성
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">ASK</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              패턴 존재 여부를 true/false로 반환
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">DESCRIBE</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              리소스에 대한 설명 반환
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">SPARQL 예제</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h3 className="font-semibold mb-3">1. 기본 SELECT 쿼리</h3>
            <div className="font-mono text-sm">
              <div className="text-gray-500"># 모든 사람의 이름 조회</div>
              <div>PREFIX foaf: &lt;http://xmlns.com/foaf/0.1/&gt;</div>
              <div className="mt-2">SELECT ?person ?name</div>
              <div>WHERE {`{`}</div>
              <div className="ml-4">?person rdf:type foaf:Person .</div>
              <div className="ml-4">?person foaf:name ?name .</div>
              <div>{`}`}</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h3 className="font-semibold mb-3">2. FILTER 사용</h3>
            <div className="font-mono text-sm">
              <div className="text-gray-500"># 30세 이상인 사람 조회</div>
              <div>SELECT ?person ?name ?age</div>
              <div>WHERE {`{`}</div>
              <div className="ml-4">?person foaf:name ?name .</div>
              <div className="ml-4">?person foaf:age ?age .</div>
              <div className="ml-4">FILTER (?age >= 30)</div>
              <div>{`}`}</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h3 className="font-semibold mb-3">3. OPTIONAL 패턴</h3>
            <div className="font-mono text-sm">
              <div className="text-gray-500"># 이메일은 있을 수도 없을 수도</div>
              <div>SELECT ?person ?name ?email</div>
              <div>WHERE {`{`}</div>
              <div className="ml-4">?person foaf:name ?name .</div>
              <div className="ml-4">OPTIONAL {`{`} ?person foaf:email ?email {`}`}</div>
              <div>{`}`}</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">SPARQL Playground</h2>
        <p className="mb-4">
          실시간으로 SPARQL 쿼리를 작성하고 결과를 확인해보세요!
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <SparqlPlayground />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">고급 SPARQL 기능</h2>
        
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-2">집계 함수</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT 등
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-3 font-mono text-sm">
              SELECT ?author (COUNT(?book) AS ?bookCount)<br/>
              WHERE {`{`} ?book dc:creator ?author {`}`}<br/>
              GROUP BY ?author<br/>
              ORDER BY DESC(?bookCount)
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-2">프로퍼티 경로</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              복잡한 관계를 간단하게 표현
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-3 font-mono text-sm">
              # 친구의 친구<br/>
              ?person foaf:knows/foaf:knows ?friendOfFriend .<br/>
              <br/>
              # 1개 이상의 타입<br/>
              ?resource rdf:type+ ?class .
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          SPARQL 팁
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• 쿼리 최적화를 위해 구체적인 패턴을 먼저 작성</li>
          <li>• LIMIT로 개발 중 결과 수 제한</li>
          <li>• OPTIONAL은 성능에 영향을 줄 수 있으므로 신중히 사용</li>
          <li>• 네임스페이스를 PREFIX로 정의하여 가독성 향상</li>
        </ul>
      </section>
    </div>
  )
}

function Chapter08Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 8: 온톨로지 설계 원칙</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            좋은 온톨로지는 단순히 작동하는 것을 넘어 유지보수가 쉽고, 재사용 가능하며, 
            확장성이 있어야 합니다. 이번 챕터에서는 온톨로지 설계의 모범 사례를 알아봅니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">온톨로지 개발 방법론</h2>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-blue-600 dark:text-blue-400">1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">도메인과 범위 결정</h3>
              <p className="text-gray-600 dark:text-gray-400">
                온톨로지가 다룰 도메인의 경계를 명확히 정의하고, 
                어떤 질문에 답할 수 있어야 하는지 결정합니다.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-green-600 dark:text-green-400">2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">기존 온톨로지 재사용 검토</h3>
              <p className="text-gray-600 dark:text-gray-400">
                바퀴를 재발명하지 마세요. FOAF, Dublin Core, Schema.org 등 
                표준 온톨로지를 먼저 검토합니다.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-purple-600 dark:text-purple-400">3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">핵심 용어 나열</h3>
              <p className="text-gray-600 dark:text-gray-400">
                도메인의 중요한 개념들을 브레인스토밍하고 리스트업합니다.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-orange-600 dark:text-orange-400">4</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">클래스 계층 구조 정의</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Top-down, Bottom-up, 또는 Middle-out 접근법을 사용하여 
                클래스 계층을 구성합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">설계 원칙</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3">명확성 (Clarity)</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 의미가 명확한 이름 사용</li>
              <li>• 일관된 명명 규칙 적용</li>
              <li>• 모호한 용어 피하기</li>
              <li>• 충분한 문서화</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">일관성 (Consistency)</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 동일 수준의 추상화 유지</li>
              <li>• 패턴의 일관된 적용</li>
              <li>• 논리적 모순 없애기</li>
              <li>• 스타일 가이드 준수</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">확장성 (Extensibility)</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 미래 확장 고려</li>
              <li>• 너무 제한적이지 않게</li>
              <li>• 모듈화된 설계</li>
              <li>• 버전 관리 전략</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">최소 온톨로지 약속</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 필요한 것만 정의</li>
              <li>• 과도한 제약 피하기</li>
              <li>• 단순함 추구</li>
              <li>• 점진적 개발</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">일반적인 설계 패턴</h2>
        
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">1. Value Partition 패턴</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              열거형 값을 클래스로 모델링
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-sm">
              :TrafficLight rdfs:subClassOf :Signal .<br/>
              :Red, :Yellow, :Green rdfs:subClassOf :TrafficLight .<br/>
              :Red owl:disjointWith :Yellow, :Green .
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">2. N-ary Relation 패턴</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              2개 이상의 엔티티 간 관계 표현
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-sm">
              # 구매 이벤트 (구매자, 상품, 날짜)<br/>
              :Purchase001 rdf:type :PurchaseEvent ;<br/>
              <span className="ml-12">:buyer :John ;</span><br/>
              <span className="ml-12">:product :Laptop ;</span><br/>
              <span className="ml-12">:date "2024-01-15" .</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">피해야 할 함정</h2>
        
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
          <h3 className="font-semibold text-red-800 dark:text-red-200 mb-4">⚠️ 주의사항</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-red-600">❌</span>
              <div>
                <strong>과도한 계층화</strong>: 너무 깊은 클래스 계층은 복잡성만 증가시킵니다.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">❌</span>
              <div>
                <strong>순환 정의</strong>: A가 B의 부모이면서 동시에 B가 A의 부모가 되는 경우
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">❌</span>
              <div>
                <strong>인스턴스와 클래스 혼동</strong>: 개별 객체를 클래스로 모델링하는 실수
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">❌</span>
              <div>
                <strong>다중 상속 남용</strong>: 지나친 다중 상속은 이해하기 어려운 구조를 만듭니다.
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          설계 체크리스트
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>☐ 도메인과 범위가 명확히 정의되었는가?</li>
          <li>☐ 기존 온톨로지 재사용을 검토했는가?</li>
          <li>☐ 명명 규칙이 일관적인가?</li>
          <li>☐ 적절한 수준의 추상화를 유지하는가?</li>
          <li>☐ 확장 가능한 구조인가?</li>
          <li>☐ 문서화가 충분한가?</li>
        </ul>
      </section>
    </div>
  )
}

function Chapter09Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 9: 온톨로지 구축 실습</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            이론을 배웠으니 이제 실제로 온톨로지를 구축해봅시다. 
            온라인 도서관 시스템을 위한 온톨로지를 단계별로 만들어보겠습니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">프로젝트: 온라인 도서관 온톨로지</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3">요구사항</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• 도서, 저자, 출판사 정보 관리</li>
            <li>• 장르별 분류 체계</li>
            <li>• 대출 이력 추적</li>
            <li>• 사용자 리뷰 및 평점</li>
            <li>• 도서 추천 시스템 지원</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Step 1: 핵심 클래스 정의</h2>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 font-mono text-sm">
          <div className="space-y-3">
            <div className="text-gray-500"># 기본 클래스들</div>
            <div>
              <span className="text-blue-600">:Publication</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">owl:Class</span> .
            </div>
            <div>
              <span className="text-blue-600">:Book</span> <span className="text-green-600">rdfs:subClassOf</span> <span className="text-purple-600">:Publication</span> .
            </div>
            <div>
              <span className="text-blue-600">:EBook</span> <span className="text-green-600">rdfs:subClassOf</span> <span className="text-purple-600">:Book</span> .
            </div>
            <div>
              <span className="text-blue-600">:PrintedBook</span> <span className="text-green-600">rdfs:subClassOf</span> <span className="text-purple-600">:Book</span> .
            </div>
            <div className="mt-4">
              <span className="text-blue-600">:Person</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">owl:Class</span> .
            </div>
            <div>
              <span className="text-blue-600">:Author</span> <span className="text-green-600">rdfs:subClassOf</span> <span className="text-purple-600">:Person</span> .
            </div>
            <div>
              <span className="text-blue-600">:Member</span> <span className="text-green-600">rdfs:subClassOf</span> <span className="text-purple-600">:Person</span> .
            </div>
            <div className="mt-4">
              <span className="text-blue-600">:Publisher</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">owl:Class</span> .
            </div>
            <div>
              <span className="text-blue-600">:Genre</span> <span className="text-green-600">rdf:type</span> <span className="text-purple-600">owl:Class</span> .
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Step 2: 속성 정의</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">객체 속성</h3>
            <div className="font-mono text-sm space-y-2">
              <div>:writtenBy</div>
              <div className="ml-4 text-gray-600">domain: Book</div>
              <div className="ml-4 text-gray-600">range: Author</div>
              
              <div className="mt-3">:publishedBy</div>
              <div className="ml-4 text-gray-600">domain: Book</div>
              <div className="ml-4 text-gray-600">range: Publisher</div>
              
              <div className="mt-3">:hasGenre</div>
              <div className="ml-4 text-gray-600">domain: Book</div>
              <div className="ml-4 text-gray-600">range: Genre</div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">데이터 속성</h3>
            <div className="font-mono text-sm space-y-2">
              <div>:isbn</div>
              <div className="ml-4 text-gray-600">domain: Book</div>
              <div className="ml-4 text-gray-600">range: xsd:string</div>
              
              <div className="mt-3">:publicationYear</div>
              <div className="ml-4 text-gray-600">domain: Book</div>
              <div className="ml-4 text-gray-600">range: xsd:integer</div>
              
              <div className="mt-3">:rating</div>
              <div className="ml-4 text-gray-600">domain: Book</div>
              <div className="ml-4 text-gray-600">range: xsd:decimal</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Step 3: 제약사항 추가</h2>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-3">OWL 제약사항</h3>
          <div className="font-mono text-sm space-y-4">
            <div>
              <div className="text-gray-500"># 모든 책은 적어도 한 명의 저자가 있다</div>
              <div>:Book rdfs:subClassOf [</div>
              <div className="ml-4">owl:onProperty :writtenBy ;</div>
              <div className="ml-4">owl:minCardinality 1</div>
              <div>] .</div>
            </div>
            
            <div>
              <div className="text-gray-500"># ISBN은 유일하다</div>
              <div>:isbn rdf:type owl:InverseFunctionalProperty .</div>
            </div>
            
            <div>
              <div className="text-gray-500"># 전자책과 종이책은 배타적</div>
              <div>:EBook owl:disjointWith :PrintedBook .</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Step 4: 인스턴스 생성</h2>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 font-mono text-sm">
          <div className="space-y-4">
            <div className="text-gray-500"># 책 인스턴스</div>
            <div>
              :book001 rdf:type :PrintedBook ;<br/>
              <span className="ml-9">:isbn "978-0-7475-3269-9" ;</span><br/>
              <span className="ml-9">:title "Harry Potter and the Philosopher's Stone" ;</span><br/>
              <span className="ml-9">:writtenBy :jk_rowling ;</span><br/>
              <span className="ml-9">:publishedBy :bloomsbury ;</span><br/>
              <span className="ml-9">:hasGenre :fantasy ;</span><br/>
              <span className="ml-9">:publicationYear 1997 ;</span><br/>
              <span className="ml-9">:rating 4.8 .</span>
            </div>
            
            <div className="text-gray-500"># 저자 인스턴스</div>
            <div>
              :jk_rowling rdf:type :Author ;<br/>
              <span className="ml-12">:name "J.K. Rowling" ;</span><br/>
              <span className="ml-12">:birthYear 1965 .</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Step 5: 추론 규칙 정의</h2>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-3">비즈니스 규칙</h3>
          <div className="font-mono text-sm space-y-3">
            <div>
              <div className="text-gray-500"># 베스트셀러 정의</div>
              <div>:Bestseller owl:equivalentClass [</div>
              <div className="ml-4">owl:intersectionOf (</div>
              <div className="ml-8">:Book</div>
              <div className="ml-8">[owl:onProperty :rating ;</div>
              <div className="ml-10">owl:hasValue [ owl:minInclusive 4.5 ]]</div>
              <div className="ml-4">)</div>
              <div>] .</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">온톨로지 검증</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3">검증 체크리스트</h3>
          <ul className="space-y-2">
            <li>✅ 모든 클래스가 적절히 정의되었는가?</li>
            <li>✅ 속성의 도메인과 레인지가 명확한가?</li>
            <li>✅ 논리적 일관성이 있는가?</li>
            <li>✅ 필요한 제약사항이 모두 포함되었는가?</li>
            <li>✅ 샘플 데이터로 테스트했는가?</li>
          </ul>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          실습 과제
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          위 온톨로지를 확장하여 다음 기능을 추가해보세요:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>대출 시스템 (Loan 클래스와 관련 속성)</li>
          <li>리뷰 시스템 (Review 클래스와 평점)</li>
          <li>시리즈 도서 관계 표현</li>
          <li>저자의 국적 정보</li>
        </ul>
      </section>
    </div>
  )
}

function Chapter10Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 10: 추론 엔진과 Reasoner</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            추론 엔진(Reasoner)은 온톨로지에 명시되지 않은 지식을 논리적으로 도출하는 
            핵심 컴포넌트입니다. 이번 챕터에서는 추론의 원리와 실제 활용법을 알아봅니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">추론이란?</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">명시적 지식</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              온톨로지에 직접 작성된 사실들
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 font-mono text-xs">
              :Dog rdfs:subClassOf :Animal .<br/>
              :Buddy rdf:type :Dog .
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">추론된 지식</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              논리적으로 도출된 새로운 사실들
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 font-mono text-xs">
              <span className="text-green-600"># 추론 결과</span><br/>
              :Buddy rdf:type :Animal .
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">주요 추론 유형</h2>
        
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">1. 분류 추론 (Classification)</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              개체가 어떤 클래스에 속하는지 결정
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-sm">
              # 정의: 3명 이상의 자녀를 가진 사람은 LargeFamily<br/>
              :LargeFamily ≡ Person ⊓ (≥3 hasChild.Person)<br/>
              <br/>
              # 사실: John은 4명의 자녀가 있음<br/>
              :John :hasChild :Child1, :Child2, :Child3, :Child4 .<br/>
              <br/>
              <span className="text-green-600"># 추론: John은 LargeFamily임</span><br/>
              :John rdf:type :LargeFamily .
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">2. 속성 추론 (Property Inference)</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              속성의 특성을 이용한 새로운 관계 도출
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-sm">
              # 이행성 속성<br/>
              :ancestorOf rdf:type owl:TransitiveProperty .<br/>
              :A :ancestorOf :B .<br/>
              :B :ancestorOf :C .<br/>
              <span className="text-green-600"># 추론: :A :ancestorOf :C .</span><br/>
              <br/>
              # 대칭성 속성<br/>
              :marriedTo rdf:type owl:SymmetricProperty .<br/>
              :John :marriedTo :Mary .<br/>
              <span className="text-green-600"># 추론: :Mary :marriedTo :John .</span>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">3. 일관성 검사 (Consistency)</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              논리적 모순 검출
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-sm">
              # 정의<br/>
              :Man owl:disjointWith :Woman .<br/>
              <br/>
              # 모순되는 사실<br/>
              :Alex rdf:type :Man .<br/>
              :Alex rdf:type :Woman .<br/>
              <br/>
              <span className="text-red-600"># 추론: 온톨로지 비일관성 검출!</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">주요 Reasoner 소개</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Pellet</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Java 기반 오픈소스</li>
              <li>• OWL DL 완벽 지원</li>
              <li>• SPARQL-DL 쿼리 지원</li>
              <li>• 증분 추론 가능</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">HermiT</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• 고성능 OWL reasoner</li>
              <li>• Hypertableau 알고리즘</li>
              <li>• 복잡한 온톨로지 처리</li>
              <li>• Protégé 통합</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">FaCT++</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• C++ 구현 (빠른 속도)</li>
              <li>• OWL 2 지원</li>
              <li>• 대규모 온톨로지 최적화</li>
              <li>• 다양한 플랫폼 지원</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">ELK</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• EL++ 프로파일 특화</li>
              <li>• 매우 빠른 추론</li>
              <li>• 바이오 온톨로지 최적</li>
              <li>• 병렬 처리 지원</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">추론 과정 시각화</h2>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8">
          <h3 className="font-semibold mb-4 text-center">추론 단계별 프로세스</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto bg-blue-500 text-white rounded-full flex items-center justify-center mb-2">
                1
              </div>
              <p className="text-sm font-medium">온톨로지 로드</p>
            </div>
            <div className="text-gray-400">→</div>
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto bg-green-500 text-white rounded-full flex items-center justify-center mb-2">
                2
              </div>
              <p className="text-sm font-medium">규칙 적용</p>
            </div>
            <div className="text-gray-400">→</div>
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto bg-purple-500 text-white rounded-full flex items-center justify-center mb-2">
                3
              </div>
              <p className="text-sm font-medium">추론 실행</p>
            </div>
            <div className="text-gray-400">→</div>
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto bg-orange-500 text-white rounded-full flex items-center justify-center mb-2">
                4
              </div>
              <p className="text-sm font-medium">결과 생성</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">추론 엔진 시뮬레이터</h2>
        <p className="mb-4">
          실제 추론 엔진을 사용하여 온톨로지의 숨겨진 지식을 발견해보세요!
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <InferenceEngine triples={[
            { id: '1', subject: ':John', predicate: ':hasParent', object: ':Mary' },
            { id: '2', subject: ':Mary', predicate: ':hasParent', object: ':Susan' },
            { id: '3', subject: ':Tom', predicate: ':marriedTo', object: ':Jane' },
            { id: '4', subject: ':Dog', predicate: 'rdfs:subClassOf', object: ':Animal' },
            { id: '5', subject: ':Buddy', predicate: 'rdf:type', object: ':Dog' },
            { id: '6', subject: ':hasParent', predicate: 'rdf:type', object: 'owl:TransitiveProperty' },
            { id: '7', subject: ':marriedTo', predicate: 'rdf:type', object: 'owl:SymmetricProperty' }
          ]} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">추론 최적화 팁</h2>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-3">성능 향상 방법</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <div>
                <strong>적절한 OWL 프로파일 선택</strong><br/>
                <span className="text-sm">EL, QL, RL 중 요구사항에 맞는 프로파일 사용</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <div>
                <strong>모듈화</strong><br/>
                <span className="text-sm">큰 온톨로지를 작은 모듈로 분리</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <div>
                <strong>증분 추론</strong><br/>
                <span className="text-sm">변경된 부분만 재추론</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <div>
                <strong>캐싱 활용</strong><br/>
                <span className="text-sm">추론 결과를 캐시하여 재사용</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          실습: 추론 엔진 체험
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          다음 챕터에서는 실제 추론 엔진을 사용하여 온톨로지의 숨겨진 지식을 
          발견하는 실습을 진행합니다. 가족 관계 온톨로지에서 복잡한 관계를 
          자동으로 추론하는 과정을 직접 체험해보세요!
        </p>
      </section>
    </div>
  )
}

function Chapter11Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 11: 대규모 온톨로지 관리</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            실제 프로젝트에서는 수천 개의 클래스와 수만 개의 트리플을 포함하는 대규모 온톨로지를 
            다루게 됩니다. 이번 챕터에서는 대규모 온톨로지를 효율적으로 관리하는 방법을 알아봅니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">모듈화 전략</h2>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">온톨로지 모듈화의 장점</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 유지보수성 향상: 각 모듈을 독립적으로 관리</li>
              <li>• 재사용성 증가: 다른 프로젝트에서 모듈 재활용</li>
              <li>• 협업 용이: 팀별로 다른 모듈 담당</li>
              <li>• 성능 최적화: 필요한 모듈만 로드</li>
            </ul>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">모듈 구성 예시</h3>
            <div className="font-mono text-sm">
              <div className="mb-4">
                <div className="text-purple-600">// Core Ontology</div>
                <div>@prefix core: &lt;http://example.org/core#&gt; .</div>
                <div>@import &lt;http://example.org/upper/ontology&gt; .</div>
              </div>
              <div className="mb-4">
                <div className="text-purple-600">// Domain Module 1</div>
                <div>@prefix medical: &lt;http://example.org/medical#&gt; .</div>
                <div>@import &lt;http://example.org/core#&gt; .</div>
              </div>
              <div>
                <div className="text-purple-600">// Domain Module 2</div>
                <div>@prefix finance: &lt;http://example.org/finance#&gt; .</div>
                <div>@import &lt;http://example.org/core#&gt; .</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">버전 관리</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">버전 명명 규칙</h3>
            <div className="font-mono text-sm space-y-2">
              <div>v1.0.0 - Major release</div>
              <div>v1.1.0 - Minor features</div>
              <div>v1.1.1 - Bug fixes</div>
            </div>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
              Semantic Versioning 준수
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">버전 메타데이터</h3>
            <div className="font-mono text-sm">
              <div>:MyOntology</div>
              <div className="ml-2">owl:versionIRI :v2.0.0 ;</div>
              <div className="ml-2">owl:versionInfo "2.0.0" ;</div>
              <div className="ml-2">owl:priorVersion :v1.0.0 ;</div>
              <div className="ml-2">dc:date "2024-01-01" .</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">성능 최적화</h2>
        
        <div className="space-y-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">인덱싱 전략</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Triple 패턴별 인덱스 생성 (SPO, POS, OSP)</li>
              <li>• 자주 사용하는 속성에 대한 별도 인덱스</li>
              <li>• 전문 검색을 위한 텍스트 인덱스</li>
              <li>• 지리공간 데이터를 위한 공간 인덱스</li>
            </ul>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">캐싱 전략</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">쿼리 캐시</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  자주 실행되는 SPARQL 쿼리 결과 저장
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">추론 캐시</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  계산 비용이 높은 추론 결과 저장
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">온톨로지 통합</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-4">통합 방법론</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <h4 className="font-medium">매핑 정의</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  서로 다른 온톨로지 간 개념 매핑
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <h4 className="font-medium">충돌 해결</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  네임스페이스 충돌, 의미적 충돌 처리
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <h4 className="font-medium">일관성 검증</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  통합 후 논리적 일관성 확인
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          대규모 온톨로지 통계
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="font-semibold text-2xl text-indigo-600">DBpedia</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">4.58M 개체</p>
          </div>
          <div>
            <h3 className="font-semibold text-2xl text-green-600">YAGO</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">10M+ 개체</p>
          </div>
          <div>
            <h3 className="font-semibold text-2xl text-purple-600">Wikidata</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">100M+ 개체</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter12Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 12: 지식 그래프 시각화</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            복잡한 온톨로지와 지식 그래프를 시각적으로 표현하면 이해도가 크게 향상됩니다. 
            이번 챕터에서는 다양한 시각화 기법과 도구를 살펴봅니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">시각화 유형</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">노드-링크 다이어그램</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              가장 일반적인 그래프 시각화 방식
            </p>
            <ul className="text-sm space-y-1">
              <li>• 노드: 개체나 클래스</li>
              <li>• 엣지: 관계나 속성</li>
              <li>• 색상: 타입 구분</li>
              <li>• 크기: 중요도 표현</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">계층 구조 시각화</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              클래스 계층이나 분류 체계 표현
            </p>
            <ul className="text-sm space-y-1">
              <li>• 트리맵</li>
              <li>• 선버스트 차트</li>
              <li>• 덴드로그램</li>
              <li>• 인덴트 트리</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">3D 시각화</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              대규모 데이터의 공간적 표현
            </p>
            <ul className="text-sm space-y-1">
              <li>• 3D Force Layout</li>
              <li>• VR/AR 지원</li>
              <li>• 인터랙티브 탐색</li>
              <li>• 깊이를 통한 계층 표현</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">매트릭스 뷰</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              밀집 그래프의 효율적 표현
            </p>
            <ul className="text-sm space-y-1">
              <li>• 인접 행렬</li>
              <li>• 히트맵</li>
              <li>• 클러스터링 표시</li>
              <li>• 패턴 발견 용이</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">3D Knowledge Graph 시각화</h2>
        <p className="mb-4">
          실제 지식 그래프를 3D로 탐색해보세요! 전용 페이지에서 더 넓은 화면으로 체험할 수 있습니다.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">3D 지식 그래프 시뮬레이터</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                전문적인 지식그래프 편집, 시각화, 분석 도구를 전체화면으로 체험해보세요.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>🎯</span> 3D 시각화 및 인터랙티브 탐색
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>🛠️</span> RDF 트리플 편집 및 관리
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>🔍</span> SPARQL 쿼리 실행
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>⚡</span> 실시간 추론 엔진
              </div>
            </div>
            
            <button 
              onClick={() => window.open('/3d-graph', '_blank')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <span>🚀</span>
              3D 지식그래프 시뮬레이터 열기
            </button>
            
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              새 탭에서 전체화면으로 열립니다
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">시각화 라이브러리</h2>
        
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">JavaScript 라이브러리</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-indigo-600 dark:text-indigo-400">D3.js</h4>
                <p className="text-sm">강력한 데이터 시각화</p>
              </div>
              <div>
                <h4 className="font-medium text-indigo-600 dark:text-indigo-400">Three.js</h4>
                <p className="text-sm">3D 그래픽스</p>
              </div>
              <div>
                <h4 className="font-medium text-indigo-600 dark:text-indigo-400">Cytoscape.js</h4>
                <p className="text-sm">그래프 전문</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">데스크톱 도구</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400">Gephi</h4>
                <p className="text-sm">네트워크 분석</p>
              </div>
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400">yEd</h4>
                <p className="text-sm">다이어그램 편집</p>
              </div>
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400">Protégé</h4>
                <p className="text-sm">온톨로지 편집</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">시각화 최적화 팁</h2>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-3">대규모 그래프 처리</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <div>
                <strong>점진적 렌더링</strong><br/>
                <span className="text-sm">보이는 영역만 먼저 렌더링</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <div>
                <strong>레벨별 상세도(LOD)</strong><br/>
                <span className="text-sm">줌 레벨에 따라 다른 상세도 표시</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <div>
                <strong>클러스터링</strong><br/>
                <span className="text-sm">유사한 노드들을 그룹화</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <div>
                <strong>엣지 번들링</strong><br/>
                <span className="text-sm">유사한 경로의 엣지들을 묶어서 표현</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">🎨</span>
          시각화 디자인 원칙
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">인지적 부하 최소화</h3>
            <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <li>• 적절한 색상 수 제한 (5-7개)</li>
              <li>• 일관된 시각적 인코딩</li>
              <li>• 명확한 범례 제공</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">상호작용 설계</h3>
            <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <li>• 직관적인 줌/팬 기능</li>
              <li>• 노드 선택과 하이라이트</li>
              <li>• 필터링과 검색 기능</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter13Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 13: 실전 프로젝트 - 의료 온톨로지</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            실제 의료 분야에서 사용되는 온톨로지를 구축해봅시다. 
            질병, 증상, 치료법 간의 복잡한 관계를 모델링하고, 
            의료 의사결정 지원 시스템의 기반을 만들어봅니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">프로젝트 개요</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3">목표</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• 일반적인 질병과 증상의 관계 모델링</li>
            <li>• 약물과 치료법 정보 통합</li>
            <li>• 환자 기록과 진단 이력 관리</li>
            <li>• 의료진을 위한 의사결정 지원</li>
            <li>• 약물 상호작용 경고 시스템</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">온톨로지 설계</h2>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 font-mono text-sm">
          <div className="space-y-4">
            <div>
              <div className="text-gray-500"># 핵심 클래스</div>
              <div className="text-blue-600">:Disease</div>
              <div className="text-blue-600">:Symptom</div>
              <div className="text-blue-600">:Treatment</div>
              <div className="text-blue-600">:Medication</div>
              <div className="text-blue-600">:Patient</div>
              <div className="text-blue-600">:MedicalProfessional</div>
            </div>
            
            <div>
              <div className="text-gray-500"># 질병 계층</div>
              <div className="text-blue-600">:InfectiousDisease</div>
              <div className="ml-4">rdfs:subClassOf :Disease .</div>
              <div className="text-blue-600">:ChronicDisease</div>
              <div className="ml-4">rdfs:subClassOf :Disease .</div>
              <div className="text-blue-600">:GeneticDisorder</div>
              <div className="ml-4">rdfs:subClassOf :Disease .</div>
            </div>
            
            <div>
              <div className="text-gray-500"># 관계 정의</div>
              <div className="text-green-600">:hasSymptom</div>
              <div className="ml-4">rdfs:domain :Disease ;</div>
              <div className="ml-4">rdfs:range :Symptom .</div>
              <div className="text-green-600">:treatedBy</div>
              <div className="ml-4">rdfs:domain :Disease ;</div>
              <div className="ml-4">rdfs:range :Treatment .</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">실제 데이터 예시</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">질병 인스턴스</h3>
            <div className="font-mono text-sm">
              :COVID19 rdf:type :InfectiousDisease ;<br/>
              <span className="ml-4">:hasSymptom :Fever ,</span><br/>
              <span className="ml-4">:Cough ,</span><br/>
              <span className="ml-4">:Fatigue ;</span><br/>
              <span className="ml-4">:transmissionRoute "airborne" .</span>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">치료법 인스턴스</h3>
            <div className="font-mono text-sm">
              :Vaccination rdf:type :PreventiveTreatment ;<br/>
              <span className="ml-4">:prevents :COVID19 ;</span><br/>
              <span className="ml-4">:efficacy "95%" ;</span><br/>
              <span className="ml-4">:recommendedFor :AdultPatient .</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">추론 규칙</h2>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-3">의료 추론 예시</h3>
          <div className="font-mono text-sm space-y-4">
            <div>
              <div className="text-gray-500"># 고위험군 환자 정의</div>
              <div>:HighRiskPatient owl:equivalentClass [</div>
              <div className="ml-4">owl:unionOf (</div>
              <div className="ml-8">[rdf:type :Patient ; :age >= 65]</div>
              <div className="ml-8">[rdf:type :Patient ; :hasCondition :ChronicDisease]</div>
              <div className="ml-8">[rdf:type :Patient ; :immunocompromised true]</div>
              <div className="ml-4">)</div>
              <div>] .</div>
            </div>
            
            <div>
              <div className="text-gray-500"># 약물 상호작용 경고</div>
              <div>:DrugInteraction a owl:Class ;</div>
              <div className="ml-4">owl:equivalentClass [</div>
              <div className="ml-8">owl:onProperty :interactsWith ;</div>
              <div className="ml-8">owl:minCardinality 1</div>
              <div className="ml-4">] .</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">SPARQL 쿼리 예시</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 className="font-semibold mb-3">1. 특정 증상에 대한 가능한 질병 조회</h3>
            <div className="font-mono text-sm">
              SELECT ?disease ?diseaseName WHERE {`{`}<br/>
              <span className="ml-2">?disease :hasSymptom :Fever .</span><br/>
              <span className="ml-2">?disease :hasSymptom :Cough .</span><br/>
              <span className="ml-2">?disease rdfs:label ?diseaseName .</span><br/>
              {`}`} ORDER BY ?diseaseName
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 className="font-semibold mb-3">2. 약물 상호작용 확인</h3>
            <div className="font-mono text-sm">
              ASK WHERE {`{`}<br/>
              <span className="ml-2">:Medication1 :interactsWith :Medication2 .</span><br/>
              <span className="ml-2">?patient :takes :Medication1 .</span><br/>
              <span className="ml-2">?patient :takes :Medication2 .</span><br/>
              {`}`}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">⚕️</span>
          의료 온톨로지 표준
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">SNOMED CT</h3>
            <p className="text-sm">포괄적인 임상 용어 체계</p>
          </div>
          <div>
            <h3 className="font-semibold text-green-600 dark:text-green-400">ICD-11</h3>
            <p className="text-sm">질병 분류 국제 표준</p>
          </div>
          <div>
            <h3 className="font-semibold text-purple-600 dark:text-purple-400">HL7 FHIR</h3>
            <p className="text-sm">의료 정보 교환 표준</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter14Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 14: 온톨로지와 AI의 만남</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            온톨로지는 AI 시스템에 구조화된 지식을 제공하여 더 똑똑하고 설명 가능한 AI를 만듭니다. 
            이번 챕터에서는 온톨로지와 최신 AI 기술의 통합을 살펴봅니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Knowledge-Enhanced AI</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">기존 AI의 한계</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 블랙박스 문제: 결정 과정 설명 불가</li>
              <li>• 상식 부족: 기본적인 지식 결여</li>
              <li>• 일반화 어려움: 새로운 상황 대처 미흡</li>
              <li>• 데이터 의존성: 대량의 학습 데이터 필요</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">온톨로지의 해결책</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 설명 가능성: 추론 과정 추적 가능</li>
              <li>• 지식 주입: 도메인 지식 활용</li>
              <li>• 제약사항: 논리적 일관성 보장</li>
              <li>• 효율성: 적은 데이터로 학습 가능</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">온톨로지 + LLM</h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Knowledge-Grounded Language Models</h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium mb-2">1. Retrieval-Augmented Generation (RAG)</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                온톨로지에서 관련 지식을 검색하여 LLM의 프롬프트에 추가
              </p>
              <div className="mt-2 font-mono text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded">
                Query → Ontology Search → Context + Query → LLM → Answer
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium mb-2">2. Constrained Decoding</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                온톨로지의 제약사항을 활용하여 LLM의 출력을 제한
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium mb-2">3. Knowledge Distillation</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                온톨로지의 구조화된 지식을 LLM에 학습시키기
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Knowledge Graph Embedding</h2>
        
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">임베딩 기법</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-indigo-600 dark:text-indigo-400">TransE</h4>
                <p className="text-sm">관계를 벡터 변환으로 모델링</p>
                <p className="text-xs font-mono mt-1">h + r ≈ t</p>
              </div>
              <div>
                <h4 className="font-medium text-indigo-600 dark:text-indigo-400">ComplEx</h4>
                <p className="text-sm">복소수 공간에서 표현</p>
                <p className="text-xs font-mono mt-1">Re(⟨h, r, t̄⟩)</p>
              </div>
              <div>
                <h4 className="font-medium text-indigo-600 dark:text-indigo-400">ConvE</h4>
                <p className="text-sm">CNN 기반 임베딩</p>
                <p className="text-xs font-mono mt-1">f(vec(h, r) * Ω)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">실제 응용 사례</h2>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">1. 의료 진단 AI</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              의료 온톨로지 + 딥러닝으로 정확한 진단과 설명 제공
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-xs">
              환자 증상 → 온톨로지 매칭 → 가능한 질병 후보 → AI 진단 → 근거 설명
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">2. 대화형 AI 어시스턴트</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              도메인 온톨로지로 전문적이고 정확한 답변 생성
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
              <p className="text-sm">• 법률 상담 챗봇</p>
              <p className="text-sm">• 금융 자문 시스템</p>
              <p className="text-sm">• 교육 튜터링 봇</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Neuro-Symbolic AI</h2>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-3">신경망과 기호 추론의 통합</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center flex-1">
              <div className="w-20 h-20 mx-auto bg-blue-500 text-white rounded-full flex items-center justify-center mb-2">
                🧠
              </div>
              <p className="font-medium">Neural Networks</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">패턴 인식, 학습</p>
            </div>
            <div className="text-3xl">+</div>
            <div className="text-center flex-1">
              <div className="w-20 h-20 mx-auto bg-green-500 text-white rounded-full flex items-center justify-center mb-2">
                🔤
              </div>
              <p className="font-medium">Symbolic AI</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">논리, 추론</p>
            </div>
            <div className="text-3xl">=</div>
            <div className="text-center flex-1">
              <div className="w-20 h-20 mx-auto bg-purple-500 text-white rounded-full flex items-center justify-center mb-2">
                🚀
              </div>
              <p className="font-medium">Neuro-Symbolic</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">최고의 성능</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">🔮</span>
          미래 전망
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• 대규모 언어 모델과 지식 그래프의 완전한 통합</li>
          <li>• 자동 온톨로지 학습 및 업데이트</li>
          <li>• 멀티모달 지식 표현 (텍스트, 이미지, 비디오)</li>
          <li>• 분산 온톨로지와 연합 학습</li>
          <li>• 양자 컴퓨팅을 활용한 초고속 추론</li>
        </ul>
      </section>
    </div>
  )
}

function Chapter15Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 15: 온톨로지 도구와 플랫폼</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            온톨로지 개발과 관리를 위한 다양한 도구와 플랫폼을 소개합니다. 
            각 도구의 특징과 사용 시나리오를 이해하고, 프로젝트에 맞는 도구를 선택할 수 있게 됩니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">온톨로지 편집기</h2>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">Protégé</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">특징</h4>
                <ul className="text-sm space-y-1">
                  <li>• 스탠포드 대학 개발</li>
                  <li>• 가장 널리 사용되는 도구</li>
                  <li>• 풍부한 플러그인 생태계</li>
                  <li>• 데스크톱/웹 버전 제공</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">적합한 경우</h4>
                <ul className="text-sm space-y-1">
                  <li>• OWL 온톨로지 개발</li>
                  <li>• 학술 연구 프로젝트</li>
                  <li>• 복잡한 추론 필요</li>
                  <li>• 팀 협업 환경</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">TopBraid Composer</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">특징</h4>
                <ul className="text-sm space-y-1">
                  <li>• 상용 도구</li>
                  <li>• SHACL 지원</li>
                  <li>• 엔터프라이즈 기능</li>
                  <li>• 데이터 통합 도구</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">적합한 경우</h4>
                <ul className="text-sm space-y-1">
                  <li>• 기업 환경</li>
                  <li>• 데이터 거버넌스</li>
                  <li>• 대규모 프로젝트</li>
                  <li>• 전문 지원 필요</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">트리플 스토어</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Apache Jena Fuseki</h3>
            <ul className="text-sm space-y-2">
              <li>✓ 오픈소스 SPARQL 서버</li>
              <li>✓ TDB 네이티브 스토리지</li>
              <li>✓ 추론 엔진 내장</li>
              <li>✓ REST API 제공</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">GraphDB</h3>
            <ul className="text-sm space-y-2">
              <li>✓ 고성능 상용 솔루션</li>
              <li>✓ 클러스터링 지원</li>
              <li>✓ 시각화 도구 내장</li>
              <li>✓ 엔터프라이즈 기능</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Virtuoso</h3>
            <ul className="text-sm space-y-2">
              <li>✓ 하이브리드 데이터베이스</li>
              <li>✓ SQL과 SPARQL 지원</li>
              <li>✓ 대용량 처리 최적화</li>
              <li>✓ LOD 클라우드 호스팅</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Amazon Neptune</h3>
            <ul className="text-sm space-y-2">
              <li>✓ 완전 관리형 서비스</li>
              <li>✓ 자동 백업/복구</li>
              <li>✓ 높은 가용성</li>
              <li>✓ AWS 생태계 통합</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">개발 프레임워크</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h3 className="font-semibold mb-4">프로그래밍 언어별 라이브러리</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Java</h4>
                <ul className="text-sm space-y-1">
                  <li>• Apache Jena</li>
                  <li>• OWL API</li>
                  <li>• RDF4J (Sesame)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Python</h4>
                <ul className="text-sm space-y-1">
                  <li>• RDFLib</li>
                  <li>• Owlready2</li>
                  <li>• PyShacl</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">JavaScript</h4>
                <ul className="text-sm space-y-1">
                  <li>• rdflib.js</li>
                  <li>• Comunica</li>
                  <li>• LDflex</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">온톨로지 검증 도구</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3">검증 도구 비교</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2">도구</th>
                  <th className="text-left py-2">용도</th>
                  <th className="text-left py-2">특징</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2">OOPS!</td>
                  <td className="py-2">온톨로지 품질 평가</td>
                  <td className="py-2">자동 오류 검출</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2">Pellet</td>
                  <td className="py-2">일관성 검사</td>
                  <td className="py-2">OWL DL 추론</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2">SHACL</td>
                  <td className="py-2">데이터 검증</td>
                  <td className="py-2">제약사항 검사</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">🛠️</span>
          도구 선택 가이드
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">소규모 프로젝트</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Protégé + Apache Jena + RDFLib
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">중규모 프로젝트</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              TopBraid + GraphDB + OWL API
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">엔터프라이즈</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Enterprise 플랫폼 + Neptune/Virtuoso + 커스텀 개발
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter16Content() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Chapter 16: 온톨로지의 미래</h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg">
            온톨로지 기술은 계속 진화하고 있습니다. 
            이번 마지막 챕터에서는 온톨로지의 최신 트렌드와 미래 전망을 살펴보고, 
            여러분이 이 분야에서 계속 성장할 수 있는 방향을 제시합니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">현재 트렌드</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">1. 분산 지식 그래프</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              중앙 집중식에서 분산형으로 전환
            </p>
            <ul className="text-sm space-y-1">
              <li>• 블록체인 기반 온톨로지</li>
              <li>• 연합 쿼리(Federated Query)</li>
              <li>• 탈중앙화 식별자(DID)</li>
              <li>• P2P 지식 공유</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">2. 자동 온톨로지 학습</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              AI를 활용한 온톨로지 자동 구축
            </p>
            <ul className="text-sm space-y-1">
              <li>• 텍스트에서 온톨로지 추출</li>
              <li>• 관계 자동 발견</li>
              <li>• 온톨로지 진화 학습</li>
              <li>• 품질 자동 평가</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">3. 멀티모달 온톨로지</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              텍스트를 넘어선 다양한 형태의 지식
            </p>
            <ul className="text-sm space-y-1">
              <li>• 이미지 온톨로지</li>
              <li>• 비디오 시맨틱 분석</li>
              <li>• 3D 모델 온톨로지</li>
              <li>• 음성/오디오 지식</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">4. 실시간 온톨로지</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              동적으로 변화하는 지식 표현
            </p>
            <ul className="text-sm space-y-1">
              <li>• 스트리밍 데이터 처리</li>
              <li>• 시간 온톨로지</li>
              <li>• 이벤트 기반 추론</li>
              <li>• 실시간 일관성 유지</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">미래 전망</h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-8">
          <h3 className="font-semibold mb-4 text-center">2030년의 온톨로지</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🌐</span>
              <div>
                <h4 className="font-medium mb-1">글로벌 지식 웹</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  모든 인류 지식이 연결된 하나의 거대한 온톨로지 네트워크
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-3xl">🤖</span>
              <div>
                <h4 className="font-medium mb-1">AGI와의 통합</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  인공 일반 지능이 온톨로지를 활용하여 인간 수준의 추론
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-3xl">🧬</span>
              <div>
                <h4 className="font-medium mb-1">생명과학 혁명</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  유전체, 단백질, 질병의 완전한 온톨로지로 맞춤 의료 실현
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-3xl">⚛️</span>
              <div>
                <h4 className="font-medium mb-1">양자 온톨로지</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  양자 컴퓨터를 활용한 초고속 추론과 복잡한 관계 모델링
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">여러분의 다음 단계</h2>
        
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">1. 실제 프로젝트 시작하기</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 작은 도메인부터 온톨로지 구축</li>
              <li>• 오픈소스 프로젝트 기여</li>
              <li>• 개인 지식 관리 시스템 만들기</li>
              <li>• 회사의 데이터를 온톨로지로 정리</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">2. 커뮤니티 참여</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• W3C 워킹 그룹</li>
              <li>• 시맨틱 웹 컨퍼런스</li>
              <li>• 로컬 밋업 참가</li>
              <li>• 온라인 포럼 활동</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">3. 계속 학습하기</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 최신 논문 읽기</li>
              <li>• 새로운 도구 탐험</li>
              <li>• 관련 분야 학습 (AI, 데이터 과학)</li>
              <li>• 자격증 취득 고려</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">🎯 최종 메시지</h2>
        <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-6">
          축하합니다! 온톨로지의 기초부터 고급 응용까지 모든 여정을 완주하셨습니다.
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            온톨로지는 단순한 기술이 아닌, 인류의 지식을 체계화하고 기계가 이해할 수 있게 만드는 
            혁명적인 도구입니다. 여러분이 배운 내용을 활용하여:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li>• 복잡한 문제를 구조화하여 해결하고</li>
            <li>• AI와 인간이 협업하는 시스템을 만들고</li>
            <li>• 지식의 경계를 넓혀가세요</li>
          </ul>
          <p className="text-center font-semibold text-indigo-600 dark:text-indigo-400">
            여러분이 만들어갈 지식의 미래가 기대됩니다! 🚀
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">추가 학습 자료</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">📚 추천 도서</h3>
            <ul className="text-sm space-y-1">
              <li>• Semantic Web for the Working Ontologist</li>
              <li>• Learning SPARQL</li>
              <li>• Ontology Engineering</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">🌐 온라인 리소스</h3>
            <ul className="text-sm space-y-1">
              <li>• W3C Semantic Web</li>
              <li>• DBpedia</li>
              <li>• Linked Open Data Cloud</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

// Coming Soon placeholder for remaining chapters
function ComingSoonContent() {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🚧</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        콘텐츠 준비 중
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        이 챕터의 콘텐츠는 곧 업데이트될 예정입니다.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
        기존 시뮬레이터들을 React 컴포넌트로 통합하는 작업이 진행 중입니다.
      </p>
    </div>
  )
}