# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Session Summary

### Session 4 (2025-07-30) - 구조 개선 전략 수립

#### 현재 상황
- 온톨로지 모듈은 작동하지만 구조가 복잡함 (HTML + React 혼재)
- CSS가 여러 파일에 분산되어 관리 어려움
- 확장성이 떨어지는 구조

#### 새로운 전략: LLM 모듈부터 깔끔하게 시작
1. **온톨로지 리팩토링 대신 LLM 모듈을 새로 만들어 기준점 확립**
2. **LLM 모듈 구조가 완성되면 온톨로지를 같은 구조로 리팩토링**

#### KSS 핵심 비전
- **목표**: 지식의 체계화 + 시뮬레이션으로 빠른 학습 효과
- **확장성**: 새로운 지식 도메인을 계속 추가할 수 있는 구조

#### 콘텐츠 개발 기준
1. **정확성**: 검증된 정보만, 실제 작동하는 코드
2. **깔끔한 설명**: 복잡한 개념을 단순하게, 핵심만 간결하게
3. **시뮬레이터**: 필요시 개발 (토크나이저, Attention 시각화 등)
4. **가독성**: 짧은 문단, 명확한 구조, 시각적 구분
5. **인터랙티브**: 클릭해서 체험, 실시간 결과, 퀴즈/실습
6. **확장 가능성**: 모듈 간 연결, 버전 관리, 플러그인 시스템

#### 표준 모듈 구조 (제안)
```
/app/modules/llm/
├── layout.tsx          # 모듈 공통 레이아웃
├── page.tsx           # 모듈 메인 페이지
├── metadata.json      # 모듈 메타데이터
├── chapters/          # 챕터별 콘텐츠
│   ├── 01-introduction.mdx
│   ├── 02-transformers.mdx
│   └── ...
├── simulators/        # 시뮬레이터 컴포넌트
│   ├── TokenizerSim.tsx
│   └── AttentionSim.tsx
├── components/        # 모듈 전용 컴포넌트
└── styles/           # 모듈 스타일
```

#### 모듈 인터페이스 (제안)
```typescript
interface KSSModule {
  metadata: {
    id: string
    name: string
    version: string
    description: string
    prerequisites?: string[]
    dependencies?: string[]
  }
  content: {
    chapters: Chapter[]
    simulators: Simulator[]
    exercises: Exercise[]
  }
  extensions?: {
    customComponents?: Component[]
    externalAPIs?: API[]
    plugins?: Plugin[]
  }
}
```

#### 다음 액션
1. LLM 모듈 폴더 구조 생성
2. 첫 번째 챕터 MDX로 작성
3. 기본 시뮬레이터 하나 구현
4. 성공하면 이 구조를 템플릿화

## Project Overview

This is a Korean-language educational platform called KSS (Knowledge Space Simulator) - a next-generation learning platform that simulates and experiences complex technical concepts. Currently focused on Ontology education with 16 chapters of comprehensive content.

## Project Structure

The project has evolved through multiple iterations:
- `index.html` - Original single-page ontology education site
- `kss-standalone/` - Current active Next.js 14 project
- `cognosphere/` - Future monorepo structure (planned)
- `chapters/` - Original HTML content files

## Current Focus: kss-standalone

### Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS modules
- **UI Components**: Radix UI, Lucide Icons
- **Visualization**: D3.js (planned)
- **Font**: Inter + Noto Sans KR

### Key Features Implemented
1. **Learning Experience**
   - 16 chapters of ontology content
   - Dark mode support
   - Progress tracking (localStorage)
   - Table of Contents with scroll tracking
   - Responsive design

2. **UI Components**
   - Sidebar navigation with chapter numbers
   - Progress tracker
   - Dark mode toggle
   - Enhanced code blocks

### Development Commands
```bash
cd kss-standalone
npm install
npm run dev   # Development server
npm run build # Production build
npm start     # Production server
```

## Architecture Decisions

### Hybrid Approach
1. **Phase 1**: Minimal structure design (3 days) ✅
2. **Phase 2**: Ontology MVP development (2-3 weeks) - IN PROGRESS
3. **Phase 3**: Structure expansion (1-2 months)

### Development Methodology
- **A2A (Agent to Agent)**: Divide large tasks into independent agents
- **Task Master MCP**: Complex task division and management
- **Microservices**: Future scalability preparation

## Important Context

### Vision
- Building a platform like Jensen Huang's COSMOS for Physical AI
- Aiming for a large-scale platform with multiple domain simulators
- Starting with ontology, expanding to LLM, Quantum Computing, RAG simulators

### Next Steps
1. RDF Triple visual editor
2. SPARQL query playground
3. Real-time inference visualization
4. 3D knowledge graphs
5. YouTube content generation with Remotion

### GitHub Repository
https://github.com/jeromwolf/kss-simulator

## Session Notes
- Last updated: 2025-07-29 (Session 3 - Reconnected)
- Main working directory: `/Users/kelly/Desktop/Space/project/Ontology/kss-standalone`
- Content preservation: Keep original HTML structure while enhancing styles
- Focus on learning experience over pure technical implementation

### Current Session Status (2025-07-30)
- **Session 4**: 모노레포 아키텍처 설계
- **Completed tasks**:
  - 404 오류 해결 (app 디렉토리 충돌 문제)
  - 프로젝트 구조 분석 완료
  - A2A 개념의 모노레포 아키텍처 설계 완료
- **핵심 결정사항**:
  - **비전**: 젠슨 황의 COSMOS Physical AI 시뮬레이터와 같은 거대한 지식 플랫폼
  - **아키텍처**: 모노레포 구조로 완전히 재설계 (초반 설계가 중요)
  - **모듈 독립성**: 각 지식 도메인을 독립적인 앱으로 분리
  - **A2A 통신**: Agent-to-Agent 개념으로 모듈간 통신
- **Technical notes**:
  - 현재 구조의 한계: 단일 Next.js 앱으로는 확장성 부족
  - 새로운 구조 필요: 독립적 개발/배포가 가능한 모듈 구조
  - 시뮬레이터 중심: 각 모듈마다 고유한 시뮬레이터 환경

## 🚀 KSS 모노레포 아키텍처 설계 (2025-07-30)

### 비전: 차세대 지식 시뮬레이션 플랫폼
**목표**: 젠슨 황의 COSMOS Physical AI 시뮬레이터처럼 거대한 지식 플랫폼 구축
- 10+ 지식 도메인 (온톨로지, LLM, 양자컴퓨팅, 의료AI, 국방AI 등)
- 각 도메인별 전문 시뮬레이터 환경
- A2A(Agent to Agent) 통신으로 모듈간 연결
- 독립적 개발/배포가 가능한 확장 가능한 구조

### 새로운 모노레포 구조
```
kss-monorepo/
├── apps/                           # 독립 애플리케이션들
│   ├── main-hub/                   # 중앙 허브 (랜딩, 네비게이션)
│   ├── ontology-app/               # 온톨로지 시뮬레이터
│   ├── llm-app/                    # LLM 학습 플랫폼
│   ├── stock-app/                  # 주식분석 시뮬레이터
│   ├── quantum-app/                # 양자컴퓨팅 시뮬레이터
│   ├── medical-ai-app/             # 의료AI 시뮬레이터
│   ├── defense-ai-app/             # 국방AI 시뮬레이터
│   └── tools-app/                  # 공유 도구들 (RDF, SPARQL, 3D)
├── packages/                       # 공유 패키지들
│   ├── ui/                        # 디자인 시스템 & 컴포넌트
│   ├── core/                      # 핵심 타입 & 유틸리티
│   ├── config/                    # 공유 설정들
│   └── simulators/                # 공유 시뮬레이터 컴포넌트
├── libs/                          # 비즈니스 로직 라이브러리
│   ├── api-client/                # A2A 통신 프로토콜
│   ├── content-engine/            # 콘텐츠 관리 엔진
│   └── analytics/                 # 학습 분석 엔진
└── tools/                         # 개발 도구들
    ├── build-scripts/
    ├── content-migration/
    └── module-generator/
```

### A2A (Agent to Agent) 통신 아키텍처
```typescript
// libs/api-client/src/events/A2AProtocol.ts
export class A2AProtocol {
  // 모듈간 이벤트 통신
  emit(event: ModuleEvent): void
  subscribe(eventType: string, handler: EventHandler): void
  
  // 데이터 공유
  shareData(fromModule: string, toModule: string, data: any): void
  requestData(fromModule: string, dataType: string): Promise<any>
  
  // 모듈 발견 및 등록
  registerModule(module: ModuleManifest): void
  discoverModules(): ModuleManifest[]
}
```

### 모듈 독립성 원칙
1. **독립 실행**: 각 모듈은 자체 개발서버 보유
2. **독립 배포**: 개별적으로 배포 가능
3. **통신 방식**: A2A 프로토콜로 모듈간 데이터/이벤트 교환
4. **공통 요소**: 디자인 시스템, 인증, 분석만 공유

### 개발 경험
```bash
# 모든 애플리케이션 시작
pnpm dev

# 특정 모듈만 시작
pnpm dev --filter=ontology-app

# 모든 모듈 빌드
pnpm build

# 특정 패키지 테스트
pnpm test --filter=@kss/ui
```

### 마이그레이션 전략
**Phase 1**: 모노레포 기반 구조 설정 (1-2주)
**Phase 2**: 기존 모듈들 분리 (온톨로지, LLM, 주식) (3-4주)
**Phase 3**: A2A 통신 구현 (5-6주)
**Phase 4**: 새로운 모듈들 추가 (7주+)

### 확장 로드맵
- **현재**: 온톨로지, LLM, 주식분석
- **단기**: 양자컴퓨팅, RAG 시스템
- **중기**: 의료AI, 피지컬AI, IoT
- **장기**: 국방AI, 블록체인, 우주항공

이 아키텍처는 각 지식 도메인의 독립성을 보장하면서도 통합된 학습 경험을 제공하는 확장 가능한 플랫폼 기반을 제공합니다.

## 🎥 유튜브 자동 생성 시스템 설계

### 현재 상황 분석
**구현된 기능 ✅:**
- Remotion 기반 비디오 생성 (6가지 템플릿)
- TTS(Text-to-Speech) 통합 (Google Cloud TTS)
- 실시간 비디오 미리보기
- 수동 렌더링 시스템

**자동화 필요 구간 ❌:**
- 콘텐츠 → 비디오 데이터 변환 자동화
- 배치 처리 및 대량 생성
- YouTube API 통합 및 자동 업로드
- 메타데이터 자동 생성 (제목, 설명, 썸네일)
- 스케줄링 및 게시 자동화

### 완전 자동화 파이프라인 설계
```
libs/content-engine/
├── parsers/                    # 콘텐츠 파싱
│   ├── HTMLtoVideoParser.ts    # HTML → 비디오 데이터
│   ├── MDXtoVideoParser.ts     # MDX → 비디오 데이터  
│   ├── ChapterSegmenter.ts     # 긴 콘텐츠 분할
│   └── MetadataExtractor.ts    # SEO 메타데이터 추출
├── generators/                 # 비디오 생성
│   ├── VideoGenerator.ts       # Remotion 렌더링 엔진
│   ├── ThumbnailGenerator.ts   # AI 썸네일 생성
│   ├── SubtitleGenerator.ts    # 자막 자동 생성
│   └── BatchProcessor.ts       # 대량 배치 처리
├── publishers/                 # 게시 자동화
│   ├── YouTubePublisher.ts     # YouTube API 통합
│   ├── ScheduleManager.ts      # 게시 스케줄링
│   ├── MetadataOptimizer.ts    # SEO 최적화
│   └── AnalyticsTracker.ts     # 성과 추적
└── workflow/                   # 워크플로 오케스트레이션
    ├── ContentPipeline.ts      # 전체 파이프라인 관리
    ├── JobQueue.ts            # 작업 큐 시스템
    └── ErrorRecovery.ts       # 오류 복구 시스템
```

### 자동화 워크플로
```typescript
// 완전 자동화 파이프라인
class ContentToYouTubePipeline {
  async processChapter(chapter: ChapterContent): Promise<YouTubeVideo> {
    // 1. 콘텐츠 파싱 및 분할
    const videoSegments = await this.parseAndSegment(chapter)
    
    // 2. 각 세그먼트별 비디오 생성
    const videos = await Promise.all(
      videoSegments.map(segment => this.generateVideo(segment))
    )
    
    // 3. 메타데이터 및 썸네일 생성
    const enrichedVideos = await this.enrichMetadata(videos)
    
    // 4. YouTube 자동 업로드
    const publishedVideos = await this.publishToYouTube(enrichedVideos)
    
    return publishedVideos
  }
}
```

## 🎮 시뮬레이터 아키텍처 설계

### 통합 시뮬레이터 프레임워크
```
packages/simulators/
├── core/                       # 핵심 프레임워크
│   ├── BaseSimulator.ts        # 모든 시뮬레이터의 기본 클래스
│   ├── SimulatorEngine.ts      # 렌더링 및 상태 관리
│   ├── EventBus.ts            # 시뮬레이터 간 통신
│   └── PluginSystem.ts        # 확장 플러그인 시스템
├── rendering/                  # 렌더링 엔진
│   ├── WebGLRenderer.ts       # 3D 렌더링 (Three.js)
│   ├── Canvas2DRenderer.ts    # 2D 렌더링
│   ├── SVGRenderer.ts         # 벡터 그래픽 (D3.js)
│   └── PhysicsEngine.ts       # 물리 시뮬레이션
├── ui/                        # 공통 UI 컴포넌트
│   ├── SimulatorLayout.tsx    # 표준 레이아웃
│   ├── ControlPanel.tsx       # 컨트롤 패널
│   ├── DataVisualization.tsx  # 데이터 시각화
│   └── TutorialSystem.tsx     # 튜토리얼 시스템
└── analytics/                 # 학습 분석
    ├── InteractionTracker.ts  # 사용자 상호작용 추적
    ├── ProgressAnalyzer.ts    # 학습 진도 분석
    └── AdaptiveLearning.ts    # 적응형 학습 시스템
```

### 모듈별 시뮬레이터 요구사항

#### **온톨로지 시뮬레이터**
- **RDF Triple Editor**: 드래그앤드롭 방식의 직관적 편집기
- **SPARQL Playground**: 실시간 쿼리 실행 및 결과 시각화
- **3D Knowledge Graph**: Three.js 기반 대화형 3D 그래프
- **Inference Engine**: 실시간 추론 과정 시각화

#### **LLM 시뮬레이터**
- **Tokenizer Simulator**: 다양한 토크나이저 비교 체험
- **Transformer Visualizer**: 어텐션 메커니즘 3D 시각화
- **Training Process Simulator**: 모델 훈련 과정 실시간 모니터링
- **Prompt Engineering Lab**: 프롬프트 최적화 실험 환경

#### **주식분석 시뮬레이터**  
- **Market Microstructure**: 호가창, 체결 과정 실시간 시뮬레이션
- **Technical Analysis Lab**: 차트 패턴 인식 훈련
- **Risk Management Simulator**: 포트폴리오 리스크 계산기
- **AI Trading Simulator**: 알고리즘 트레이딩 백테스팅

#### **양자컴퓨팅 시뮬레이터**
- **Quantum Circuit Builder**: 드래그앤드롭 회로 설계
- **Qubit Visualizer**: 큐비트 상태 3D 시각화
- **Quantum Algorithm Lab**: 주요 양자 알고리즘 체험
- **Quantum Error Correction**: 오류 정정 과정 시뮬레이션

### A2A 시뮬레이터 통신
```typescript
// 시뮬레이터 간 지식 공유 예시
class A2ASimulatorBridge {
  // 온톨로지에서 정의한 개념을 LLM 훈련에 활용
  shareOntologyToLLM(ontologyData: RDFTriple[]): LLMTrainingData {
    return this.transformOntologyToTrainingData(ontologyData)
  }
  
  // LLM에서 생성한 텍스트를 주식 분석에 활용
  shareLLMToStock(generatedAnalysis: string): StockInsight {
    return this.parseAnalysisToInsight(generatedAnalysis)
  }
}
```

## 📋 LLM 모듈 구현 계획

### Phase 1: 기반 구조 설정 (1주)
```
src/app/modules/llm/
├── layout.tsx              # LLM 모듈 레이아웃
├── page.tsx               # 모듈 메인 페이지
├── metadata.json          # 모듈 메타데이터
├── [chapter]/             # 동적 챕터 라우팅
│   └── page.tsx
├── simulators/            # LLM 시뮬레이터들
│   ├── TokenizerLab.tsx
│   ├── AttentionViz.tsx
│   └── TransformerDemo.tsx
├── components/            # LLM 전용 컴포넌트
│   ├── ChapterLayout.tsx
│   ├── ConceptExplainer.tsx
│   └── CodeBlock.tsx
├── content/               # 학습 콘텐츠
│   └── chapters/
│       ├── 01-introduction.mdx
│       ├── 02-tokenization.mdx
│       ├── 03-embeddings.mdx
│       ├── 04-attention.mdx
│       ├── 05-transformer.mdx
│       └── 06-fine-tuning.mdx
├── hooks/                 # LLM 전용 훅
│   ├── useProgress.ts
│   └── useSimulator.ts
└── styles/               # 스타일
    └── llm.module.css
```

### Phase 2: 콘텐츠 및 시뮬레이터 구현 (2-3주)
1. **6개 핵심 챕터 MDX 작성**
2. **3개 핵심 시뮬레이터 구현**
3. **진도 추적 시스템**
4. **반응형 디자인**

### Phase 3: 통합 및 최적화 (1주)  
1. **메인 허브와 연결**
2. **비디오 자동 생성 통합**
3. **성능 최적화**
4. **테스트 및 배포**

### 성공 기준
- ✅ LLM 모듈이 독립적으로 실행 가능
- ✅ 3개 시뮬레이터가 정상 작동
- ✅ 콘텐츠 → 비디오 자동 생성 연동
- ✅ 메인 허브에서 원활한 네비게이션
- ✅ 모바일/데스크톱 반응형 지원

이 구조를 성공적으로 구현하면, **온톨로지, 주식분석, 양자컴퓨팅** 등 다른 모든 모듈에 동일한 패턴을 적용할 수 있는 **표준 템플릿**이 완성됩니다.