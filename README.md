# KSS - Knowledge Space Simulator

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/D3.js-7.8.5-orange?style=for-the-badge&logo=d3.js" alt="D3.js" />
</div>

<br />

> 🚀 **복잡한 기술 개념을 시뮬레이션하며 체험하는 차세대 학습 플랫폼**

KSS(Knowledge Space Simulator)는 추상적인 기술 개념을 시각적으로 시뮬레이션하고 직접 조작하며 학습할 수 있는 인터랙티브 교육 플랫폼입니다.

## ✨ 주요 기능

### 🤖 LLM (Large Language Model) 학습
- **6개 챕터**: LLM 기초부터 고급 활용까지
- **6개 인터랙티브 시뮬레이터**:
  - 토크나이저: 문자/단어/서브워드 방식 비교
  - Attention 시각화: 실시간 가중치 매트릭스
  - Transformer 구조: 단계별 동작 원리
  - 학습 과정: 손실/정확도 실시간 모니터링
  - 프롬프트 플레이그라운드: API 연동 가능
  - 모델 비교: 5개 주요 LLM 벤치마크
- **인터랙티브 퀴즈**: 학습 확인 및 즉시 피드백
- **실전 예제**: 프롬프트 엔지니어링, RAG, 코드 생성
- **4시간 30분 커리큘럼**: 체계적인 학습 경로

### 📚 온톨로지 마스터클래스
- **16개 챕터**: 온톨로지 기초부터 실전 프로젝트까지
- **3D 지식그래프 시뮬레이터**: 전문가급 인터랙티브 3D 시각화 🆕
- **고급 RDF/SPARQL 도구**: 실시간 추론 엔진과 쿼리 실행기
- **실시간 피드백**: 즉각적인 학습 확인

### 📈 주식투자분석 시뮬레이터
- **5개 전문 모듈**: 기초부터 AI/퀀트 투자까지
- **AI 기반 시뮬레이터**: 실시간 시장 시뮬레이션
- **인터랙티브 커리큘럼**: 퀴즈, 실습케이스, 핵심포인트
- **AI 멘토 시스템**: 개인화된 투자 학습 가이드
- **165개+ 금융 용어**: 체계적인 용어 학습

### 🎯 핵심 특징
- 🌓 **다크모드 지원**: 눈이 편안한 학습 환경
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화
- ⚡ **빠른 성능**: Next.js 기반 최적화
- 🎨 **모던 UI/UX**: Tailwind CSS로 구현된 세련된 디자인
- 🤖 **AI 통합**: 학습 도우미 및 멘토 시스템
- 🎤 **Google TTS 연동**: Wavenet 고품질 한국어 음성 지원

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Radix UI

### Visualization
- **2D Graphics**: D3.js (Force-directed, 계층형, 원형, 격자 레이아웃)
- **3D Graphics**: Three.js + React Three Fiber (전문가급 3D 지식그래프)
- **Data Visualization**: 실시간 온톨로지 그래프, RDF Triple 시각화
- **Advanced Analytics**: 허브 노드 분석, 그래프 통계, 지능형 검색

### Learning Systems
- **Interactive Learning**: 퀴즈, 실습케이스
- **AI Mentor**: 대화형 학습 도우미
- **Real-time Simulation**: 주식 시장 시뮬레이터

## 🚦 시작하기

### 필수 요구사항
- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/jeromwolf/kss-simulator.git
cd kss-simulator/kss-standalone

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
# 또는 편의 스크립트 사용
./start.sh

# 4. 브라우저에서 접속
# http://localhost:3000
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 서버 관리 스크립트

```bash
# 서버 시작
./start.sh

# 서버 중지
./stop.sh

# 서버 상태 확인
./status.sh
```

## 📁 프로젝트 구조

```
kss-standalone/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 홈페이지
│   │   ├── modules/           # 학습 모듈
│   │   │   └── llm/           # LLM 학습 모듈
│   │   │       ├── layout.tsx # 모듈 레이아웃
│   │   │       ├── page.tsx   # 모듈 메인
│   │   │       ├── metadata.ts # 챕터 메타데이터
│   │   │       ├── [chapterId]/
│   │   │       │   └── page.tsx # 챕터 콘텐츠
│   │   │       ├── components/
│   │   │       │   └── TokenizerDemo.tsx
│   │   │       └── styles/
│   │   │           └── chapter.css
│   ├── components/            # React 컴포넌트
│   │   ├── Navigation.tsx     # 전역 네비게이션
│   │   ├── ontology/          # 온톨로지 컴포넌트
│   │   ├── llm-simulators/    # LLM 시뮬레이터 컴포넌트
│   │   │   ├── EnhancedTokenizer.tsx
│   │   │   ├── AttentionVisualizer.tsx
│   │   │   ├── TransformerArchitecture3D.tsx
│   │   │   ├── TrainingSimulator.tsx
│   │   │   ├── PromptPlayground.tsx
│   │   │   ├── ModelComparison.tsx
│   │   │   ├── LLMSimulators.tsx
│   │   │   └── Simulators.module.css
│   │   ├── ontology/          # 온톨로지 학습
│   │   ├── stock-analysis/    # 주식투자분석
│   │   │   ├── page.tsx       # 메인 허브
│   │   │   ├── terms/         # 금융 용어 사전
│   │   │   └── curriculum/    # 커리큘럼 (리다이렉트)
│   │   ├── rdf-editor/        # RDF 트리플 에디터
│   │   ├── sparql-playground/ # SPARQL 쿼리 도구
│   │   ├── 3d-graph/          # 3D 지식 그래프
│   │   └── video-creator/     # 비디오 생성 도구
│   │   └── stock-analysis/    # 주식투자 컴포넌트
│   │       ├── StockAnalysisHub.tsx
│   │       ├── CurriculumRenderer.tsx
│   │       ├── AdvancedSimulator.tsx
│   │       ├── InteractiveLearning.tsx
│   │       ├── FinancialTermsModule.tsx
│   │       └── AIMentor.tsx
│   ├── data/                  # 데이터 구조
│   │   └── stockCurriculum.ts # 주식 커리큘럼 데이터
│   ├── styles/               # 글로벌 스타일
│   └── types/                # TypeScript 타입 정의
├── public/
│   └── content/              # 정적 콘텐츠
└── package.json
```

## 🎓 학습 콘텐츠

### 온톨로지 교육 과정

#### Part 1: 온톨로지의 이해
1. 온톨로지란 무엇인가?
2. 온톨로지의 핵심 개념
3. 시맨틱 웹과 온톨로지

#### Part 2: 온톨로지 기술 표준
4. RDF: 지식 표현의 기초
5. RDFS: 스키마와 계층구조
6. OWL: 표현력 있는 온톨로지
7. SPARQL: 온톨로지 질의

#### Part 3: 온톨로지 설계와 구축
8. Protégé 마스터하기
9. 온톨로지 설계 방법론
10. 패턴과 모범 사례

#### Part 4: 실전 프로젝트
11. 금융 온톨로지: 주식 시장
12. 뉴스 온톨로지: 지식 그래프
13. 통합 프로젝트: 주식-뉴스 연계

#### Part 5: 온톨로지의 미래
14. AI와 온톨로지
15. 산업별 활용사례
16. 미래 전망과 도전과제

### LLM (Large Language Model) 과정

#### Chapter 1: LLM이란 무엇인가? (30분)
- LLM의 정의와 역사
- 주요 모델 소개 (GPT, Claude, Gemini)
- 실생활 활용 사례

#### Chapter 2: LLM의 핵심 구조 (1시간)
- Transformer 아키텍처
- 토큰화 과정 (실시간 시뮬레이터)
- Attention 메커니즘의 이해

#### Chapter 3: LLM 학습 방법론 (45분)
- 사전 학습과 파인튜닝
- 학습 데이터와 규모
- 최신 학습 기법들

#### Chapter 4: 프롬프트 엔지니어링 (50분)
- Zero/Few/Many-shot Learning
- Chain-of-Thought 기법
- 프롬프트 보안과 방어

#### Chapter 5: LLM 실전 활용 (2시간)
- RAG 시스템과 챗봇 개발
- 코드 생성과 문서 처리
- 번역과 창작 콘텐츠

#### Chapter 6: 고급 기법과 미래 (45분)
- Multimodal LLM
- LLM Agent와 Tool Use
- 미래 전망과 윤리적 고려사항

### 주식투자분석 과정

#### Module 1: 금융시장의 이해 (2주)
- 주식시장의 구조와 원리
- 필수 금융 용어 마스터
- 주문 유형과 거래 전략

#### Module 2: 기본적 분석 (3주)
- 재무제표 완전 정복
- 가치평가 지표 활용
- 산업 분석과 경쟁력 평가

#### Module 3: 기술적 분석 (3주)
- 차트의 기본과 캔들스틱
- 주요 기술적 지표
- 고급 패턴과 전략

#### Module 4: 포트폴리오 관리 (2주)
- 현대 포트폴리오 이론
- 자산 배분 전략
- 리스크 관리

#### Module 5: AI & 퀀트 투자 (4주)
- 퀀트 투자의 기초
- 머신러닝 투자 전략
- 실전 프로젝트

## 💼 비즈니스 모델

KSS 플랫폼의 비즈니스 모델 및 천억 매출 전략은 [KSS_비즈니스_모델.md](KSS_비즈니스_모델.md)를 참조하세요.

## 📝 최신 업데이트 (2025-08-02)

### Session 10 - Multi-Agent 시스템 및 통합 개선 🤖
- **Multi-Agent 시스템 모듈 완성**
  - 🎯 **6개 챕터 구현**: MAS 개념, A2A 통신, CrewAI, AutoGen, 합의 알고리즘, 응용
  - 🤖 **4개 시뮬레이터 개발**:
    - A2A Orchestrator: 에이전트 간 통신과 작업 흐름 시각화
    - CrewAI Builder: 역할 기반 AI 팀 구성 및 작업 할당
    - Consensus Simulator: 5가지 합의 알고리즘 시뮬레이션
    - AutoGen Simulator: Microsoft AutoGen 프레임워크 체험
  - 📚 **상세한 학습 콘텐츠**: 100% React 컴포넌트 기반
- **Agent-MCP 모듈 시뮬레이터 개선**
  - 🚀 **4개 시뮬레이터 개별 페이지 생성**:
    - Agent Playground: ReAct 패턴 시뮬레이션
    - LangChain Builder: 드래그앤드롭 체인 구성
    - MCP Protocol Simulator: 서버-클라이언트 통신
    - Tool Orchestrator: 도구 사용 패턴 최적화
  - 🔗 **직접 링크 지원**: 각 시뮬레이터로 바로 접근 가능
- **주식 분석 모듈 통합 완료**
  - 🔄 **레거시 통합**: `/stock-analysis` → `/modules/stock-analysis` 리다이렉트
  - 💼 **고급 기능 포함**: AI 시뮬레이터, 비디오 학습, AI 멘토
  - 🎨 **통합 UI**: Quick Actions 버튼으로 모든 기능 접근
- **기술적 개선사항**
  - ✅ **빌드 성공**: 34개 페이지 생성
  - 🎯 **TypeScript 타입 안전성**: 모든 컴포넌트 타입 검증
  - 🚀 **Dynamic Import**: SSR 이슈 방지 및 성능 최적화

### Session 9 - 콘텐츠 생성 도구 추가 🎥
- **YouTube 콘텐츠 자동화 시스템 구현**
  - 🎬 **비디오 생성 도구**: Remotion 기반 쇼츠/설명 영상 제작
  - 🎤 **TTS 시스템**: Google Cloud TTS API 연동 (Wavenet 고품질 음성)
  - 📊 **금융 콘텐츠**: PER 계산기, 금융 용어 쇼츠 생성기
  - 🎯 **온톨로지 쇼츠**: 복잡한 개념을 30초 영상으로 변환
  - 🔥 **바이럴 콘텐츠**: AI 기반 트렌드 콘텐츠 생성
- **주식투자분석 시뮬레이터 확장**
  - 📈 **AI 멘토 시스템**: 개인화된 투자 학습 가이드
  - 💹 **백테스팅 엔진**: 투자 전략 과거 데이터 검증
  - 📊 **차트 분석기**: 기술적 패턴 자동 인식
  - 💰 **재무 분석기**: 기업 재무제표 자동 분석
  - 🎯 **포트폴리오 최적화**: 마코위츠 모델 기반 자산 배분
  - 🎯 **인터랙티브 시뮬레이터**: 재무제표 분석기, 차트 패턴 분석기, 포트폴리오 최적화기 등 5개
  - 📚 **60시간 커리큘럼**: 기초부터 AI 활용 투자까지 체계적 학습 경로
  - ✅ **빌드 성공**: 20개 페이지 생성, TypeScript 타입 안전성 보장

### Session 8 (이전) - LLM 모듈 리팩토링 완료
- **LLM 모듈을 100% React 컴포넌트로 전환**
  - ⚛️ **HTML 문자열 제거**: 기존 HTML 기반 콘텐츠를 완전한 React 컴포넌트로 변환
  - 🎯 **ChapterContent 컴포넌트 구현**: 8개 챕터의 구조화된 콘텐츠 시스템
  - 🔧 **TokenizerDemo 개선**: 전문적인 UI/UX로 업그레이드된 토크나이저 시뮬레이터
  - 📱 **일관된 스타일링**: RAG 모듈과 동일한 표준 디자인 패턴 적용
- **기술적 개선사항**
  - 🏗️ **표준 모듈 구조**: RAG 모듈의 성공적인 패턴을 LLM에 적용
  - 🎨 **Indigo 테마**: LLM 모듈 전용 색상 테마 (Indigo-600/400)
  - 📊 **인터랙티브 시뮬레이터**: React 상태관리 기반의 실시간 토큰화 체험
  - ✅ **빌드 성공**: 모든 TypeScript 타입 오류 해결
- **사용자 경험 향상**
  - 🎯 **학습 목표 표시**: 각 챕터별 명확한 학습 목표 제시
  - 📚 **체계적인 내용 구성**: 개념 설명 → 기술적 세부사항 → 실습 순서
  - 💡 **시각적 개선**: 카드 기반 레이아웃, 아이콘 활용, 색상 구분
  - 🔗 **원활한 네비게이션**: 이전/다음 챕터 간 부드러운 이동

### Session 8 (이전) - 3D 그래프 UX 개선 및 별도 페이지 분리
- **3D 그래프 사용성 대폭 개선**
  - 🖥️ **별도 페이지 분리**: `/3d-graph`에서 전체화면 체험
  - 🎯 **런치패드 UI**: Chapter 12에서 깔끔한 시뮬레이터 소개 및 실행
  - 📱 **모바일 최적화**: 작은 화면에서도 편리한 접근
  - 🔗 **새 탭 열기**: 별도 창에서 몰입도 높은 학습 경험
- **온톨로지 모듈 리팩토링 진행**
  - ⚛️ **React 컴포넌트 전환**: HTML 문자열 → 순수 React 컴포넌트
  - 🎨 **일관된 디자인**: RAG 모듈과 동일한 표준 템플릿 적용
  - 🔧 **시뮬레이터 통합**: 기존 RDF Editor, Knowledge Graph 컴포넌트 재활용
- **비즈니스 전략 문서 완성**
  - 💰 **천억 매출 전략**: 3단계 성장 로드맵 (AI 교육의 NVIDIA → 글로벌 SaaS 유니콘 → AI 인프라 제공자)
  - 🎯 **6가지 비즈니스 모델**: B2B 교육, SaaS 구독, 교육기관 라이선스, 프리미엄 콘텐츠, 컨설팅, 마켓플레이스
  - 🏢 **"한국의 Coursera + Palantir"** 포지셔닝

### Session 7 - 3D 지식그래프 시뮬레이터 완성 🚀
- **전문가급 3D 시각화 구현**
  - 🎯 **4가지 고급 레이아웃**: Force-directed, 계층형, 원형, 격자 알고리즘
  - 🎨 **노드 타입별 3D 형태**: 클래스(구체), 속성(원기둥), 개체(원뿔), 리터럴(정육면체)
  - ⚡ **실시간 물리 시뮬레이션**: 100회 반복 최적화된 힘 계산
  - 🎮 **인터랙티브 컨트롤**: 더블클릭 노드 생성, 부드러운 애니메이션
- **고급 검색 및 필터링 시스템**
  - 🔍 **4개 카테고리 탭**: 기본, 검색, 고급, 분석
  - 📊 **실시간 그래프 분석**: 허브 노드, 연결 분포, 술어 통계
  - 🎯 **지능형 검색**: 실시간 매칭, 결과 하이라이팅
  - ⚙️ **고급 필터**: 술어별 필터링, 연결 임계값 설정
- **SPARQL 쿼리 실행 엔진**
  - 📝 **샘플 쿼리**: 즉시 실행 가능한 3가지 템플릿
  - 📊 **결과 시각화**: 테이블 형태, 복사 기능
  - 🔍 **기본 파싱**: SELECT, WHERE, LIMIT 구문 지원
- **실시간 추론 엔진**
  - 🧠 **4가지 추론 규칙**: 하위클래스 이행성, 타입 상속, 대칭/이행 속성
  - ⚡ **자동 실행**: 데이터 변경 시 실시간 추론
  - 📈 **시각적 표시**: 추론된 노드/엣지 구별 표시
- **완전한 데이터 관리**
  - 💾 **자동 저장**: 로컬 스토리지 실시간 백업
  - 📁 **Import/Export**: JSON, RDF/Turtle 형식 지원
  - ↩️ **실행 취소/재실행**: 50단계 히스토리 관리
  - 🎹 **키보드 단축키**: Ctrl+Z, Ctrl+Y 지원

### 기술적 성과
- ✅ **빌드 성공**: 모든 컴포넌트 오류 없이 컴파일
- ✅ **TypeScript 완벽 지원**: 타입 안전성 보장
- ✅ **성능 최적화**: 메모화, 동적 로딩, 효율적 알고리즘
- ✅ **다크모드 완벽 지원**: 모든 3D 컴포넌트 다크 테마
- ✅ **전문가급 UI/UX**: 엔터프라이즈 수준의 디자인

## 📝 이전 업데이트

### Session 6 - LLM 시뮬레이터 구현 완료
- **6개 인터랙티브 시뮬레이터 완성** 🚀
  - 🔤 **토크나이저 향상**: 문자/단어/서브워드 토크나이제이션 시각화
  - 🎯 **Attention 메커니즘**: 실시간 어텐션 가중치 매트릭스 시각화
  - 🏗️ **Transformer 아키텍처**: 인코더/디코더 구조 단계별 설명
  - 📊 **학습 과정 시뮬레이터**: 실시간 손실/정확도 차트, 하이퍼파라미터 조정
  - 💬 **프롬프트 플레이그라운드**: Gemini API 연동 지원, 템플릿 제공
  - ⚖️ **모델 비교 도구**: GPT-4, Claude 3, Gemini Ultra 등 5개 모델 벤치마크 비교
- **UI/UX 전면 개선**
  - 다크 테마 최적화: 모든 시뮬레이터 컴포넌트 다크모드 완벽 지원
  - 시각적 개선: 보드 스타일 UI, 그라데이션 버튼, 아이콘 추가
  - 반응형 디자인: 모바일/태블릿 대응
- **API 통합**
  - Gemini API 연동 옵션 추가 (실제 LLM 응답 생성)
  - Google Cloud TTS API 연동 (Wavenet 고품질 한국어 음성)
  - 환경 변수 지원 (.env 파일)

### Session 5 - LLM 모듈 추가 및 기능 개선
- **새로운 LLM 학습 모듈 추가** 🎉
  - 6개 챕터 완성 (소개, 아키텍처, 학습방법, 프롬프트 엔지니어링, 실전활용, 고급기법)
  - 체계적인 커리큘럼 구성 (총 4시간 30분 학습 분량)
  - 챕터별 학습 목표 및 예상 시간 표시
- **인터랙티브 기능 구현**
  - 실시간 토크나이저 시뮬레이터 (GPT/Claude/BERT 스타일)
  - 학습 확인 퀴즈 시스템 (답안 확인 및 점수 표시)
  - 프로그레스 트래킹 기능
- **UI/UX 개선**
  - LLM 모듈 전용 스타일 최적화
  - 가독성 향상 (폰트 크기, 줄 간격, 색상 대비)
  - 다크모드 완벽 지원
  - 리스트 아이템 중복 점 표시 버그 수정

### Session 4 - UI/UX 및 구조 개선
- 홈페이지 전체 스타일 통일 (Enterprise Knowledge Simulators 스타일)
- 온톨로지 페이지 스타일 개선
  - Hero 섹션 여백 최적화 (60vh → 35vh)
  - 학습 로드맵 한 줄 배치
  - 온톨로지 도구 체험하기 4개 컬럼 배치
  - 섹션별 여백 축소 및 최적화
  - 학습 시작하기 버튼 크기 증가 (14px → 16px)
- 다크 모드 스타일 개선 및 텍스트 가시성 향상
- 타임라인 인터랙티브 기능 추가 (고대/중세/근대/현대)
- 다크모드 토글 버튼 추가

### 기술적 개선사항
- LLM 모듈 메타데이터 시스템 구현
- 동적 라우팅 및 챕터 네비게이션
- React Hook을 활용한 상태 관리
- CSS 모듈화 및 스타일 분리
- Canvas API를 활용한 실시간 시각화
- Dynamic import를 통한 성능 최적화

### 향후 계획
- 온톨로지 전문 시뮬레이터 개발
  - RDF Triple 시각적 편집기 고도화
  - SPARQL 쿼리 빌더 및 최적화 도구
  - 지식 그래프 추론 엔진 시각화
  - 온톨로지 병합/매핑 도구
- RAG 시스템 모듈 개발
  - 벡터 DB 시뮬레이터
  - 임베딩 시각화
  - 검색 파이프라인 디버거
- 모노레포 아키텍처 전환
- MDX 기반 콘텐츠 관리 시스템 도입

## 🛤️ 사용 가능한 경로

### 메인 페이지
- `/` - 홈페이지 (코스 목록)
- `/modules/rag` - RAG 시스템 학습 (6개 챕터, Emerald 테마)
- `/modules/ontology` - 온톨로지 학습 (16개 챕터, Blue 테마)
- `/modules/llm` - LLM 학습 (8개 챕터, Indigo 테마)
- `/modules/stock-analysis` - 주식투자분석 (5개 모듈, Green 테마) 🆕
- `/modules/*/[chapterId]` - 각 모듈의 챕터별 학습 페이지

### 도구 페이지
- `/rdf-editor` - **3D 지식그래프 시뮬레이터** 🆕 (고급 3D 시각화, SPARQL 쿼리, 실시간 추론)
- `/3d-graph` - **전용 3D 지식 그래프 페이지** 🆕 (전체화면 최적화)
- `/sparql-playground` - SPARQL 쿼리 플레이그라운드
- `/video-creator` - 비디오 콘텐츠 생성기

### API 엔드포인트
- `/api/generate-audio` - 텍스트 음성 변환 API

## 🔮 로드맵

### Phase 1: MVP ✅ (완료)
- ✅ 온톨로지 교육 콘텐츠 (16개 챕터)
- ✅ 주식투자분석 시뮬레이터
- ✅ AI 멘토 시스템
- ✅ 인터랙티브 학습 시스템
- ✅ 다크모드 지원
- ✅ 반응형 디자인
- ✅ 홈페이지 스타일 통일 (엔터프라이즈 스타일)

### Phase 2: 도구 강화 ✅ (완료)
- ✅ **3D 지식그래프 시뮬레이터** - 전문가급 완성
  - ✅ 4가지 고급 레이아웃 알고리즘
  - ✅ 실시간 SPARQL 쿼리 실행
  - ✅ 4가지 추론 규칙 엔진
  - ✅ 고급 검색 및 필터링 (4개 카테고리)
  - ✅ 완전한 데이터 관리 (Import/Export, 실행취소)
- ✅ RDF Triple 비주얼 에디터
- ✅ SPARQL 쿼리 플레이그라운드
- ✅ 온톨로지 페이지 스타일 최적화
- ✅ 실시간 추론 시각화

### Phase 3: 모듈 표준화 ✅ (완료)
- ✅ **모든 핵심 모듈 React 컴포넌트 전환 완료**
  - ✅ RAG 모듈: 6개 챕터 + 5개 시뮬레이터 (Emerald 테마)
  - ✅ 온톨로지 모듈: 16개 챕터 + 4개 시뮬레이터 (Blue 테마)  
  - ✅ LLM 모듈: 8개 챕터 + 1개 시뮬레이터 (Indigo 테마)
  - ✅ 주식투자분석 모듈: 5개 모듈 + 5개 시뮬레이터 (Green 테마)
- ✅ 표준 모듈 구조 확립 (metadata.ts, ChapterContent.tsx, [chapterId]/page.tsx)
- ✅ 일관된 디자인 시스템 (모듈별 테마 색상)
- ✅ HTML 문자열 방식 완전 제거 (유지보수성 대폭 향상)

### Phase 4: AI 통합 📅 (예정)
- [ ] AI 학습 경로 추천
- [ ] 자동 평가 시스템
- [ ] 콘텐츠 개인화
- [ ] 실시간 피드백 강화

### Phase 5: 확장 🔮 (예정)
- [ ] 양자컴퓨팅 시뮬레이터
- [ ] RAG 시뮬레이터
- [ ] 커뮤니티 기능
- [ ] 모바일 앱

## 🤝 기여하기

KSS는 오픈소스 프로젝트입니다. 기여를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 기여 가이드라인
- 코드 스타일 가이드 준수
- 테스트 코드 작성
- 문서화 업데이트
- PR 템플릿 사용

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- 온톨로지 교육 콘텐츠 제작에 도움을 주신 모든 분들
- 오픈소스 커뮤니티의 훌륭한 도구들
- 프로젝트에 기여해주신 모든 컨트리뷰터

## 📞 연락처

프로젝트 관련 문의사항이 있으시면 이슈를 생성해 주세요.

### 버그 리포트
- [이슈 트래커](https://github.com/jeromwolf/kss-simulator/issues)

### 기능 제안
- [디스커션](https://github.com/jeromwolf/kss-simulator/discussions)

## ⚙️ 환경 설정

### Google Cloud TTS 설정 (선택사항)

고품질 한국어 음성을 사용하려면 Google Cloud TTS API를 설정하세요:

1. **Google Cloud Console에서 설정**
   ```bash
   # 1. Google Cloud Console (https://console.cloud.google.com) 접속
   # 2. 새 프로젝트 생성 또는 기존 프로젝트 선택
   # 3. Cloud Text-to-Speech API 활성화
   # 4. API 키 생성 (API 및 서비스 > 사용자 인증 정보)
   ```

2. **환경 변수 설정**
   ```bash
   # .env.local 파일 생성
   cp .env.local.example .env.local
   
   # API 키 설정
   NEXT_PUBLIC_GOOGLE_TTS_API_KEY=your_api_key_here
   ```

3. **지원 음성**
   - `ko-KR-Wavenet-A` - 자연스러운 여성 음성 (기본)
   - `ko-KR-Wavenet-B` - 따뜻한 남성 음성
   - `ko-KR-Wavenet-C` - 신뢰감 있는 여성 음성
   - `ko-KR-Wavenet-D` - 명확한 남성 음성

4. **특별 기능**
   - SSML 지원으로 감정, 속도, 피치 조절
   - 금융 용어별 최적화된 음성 선택
   - MP3 파일 다운로드 지원

> **참고**: API 키가 없어도 데모 모드로 작동합니다.

## 📖 사용 메뉴얼

3D 지식그래프 시뮬레이터를 효과적으로 사용하는 방법을 알고 싶으시면:

👉 **[상세 사용 메뉴얼 보기](MANUAL.md)**

### 🚀 빠른 시작
1. 온톨로지 모듈 Chapter 12 방문 또는 직접 `http://localhost:3000/3d-graph` 접속
2. **"🚀 3D 지식그래프 시뮬레이터 열기"** 버튼 클릭 (새 탭에서 열림)
3. 3D 캔버스에서 **더블클릭**하여 노드 생성
4. **Shift + 클릭**으로 노드 간 관계 생성
5. 좌측 패널에서 다양한 **레이아웃** 및 **필터** 실험
6. SPARQL 쿼리 탭에서 **샘플 쿼리** 실행해보기

### 🎯 주요 기능 미리보기
- **4가지 레이아웃**: Force-directed, 계층형, 원형, 격자
- **지능형 검색**: 실시간 노드/관계 검색
- **SPARQL 쿼리**: 샘플 쿼리로 빠른 시작
- **실시간 추론**: 4가지 자동 추론 규칙
- **데이터 관리**: JSON/Turtle 가져오기/내보내기

---

<div align="center">
  <strong>🌟 Star를 눌러 프로젝트를 응원해주세요! 🌟</strong>
  
  <br />
  
  <a href="https://github.com/jeromwolf/kss-simulator/stargazers">
    <img src="https://img.shields.io/github/stars/jeromwolf/kss-simulator?style=social" alt="GitHub stars" />
  </a>
  <a href="https://github.com/jeromwolf/kss-simulator/network/members">
    <img src="https://img.shields.io/github/forks/jeromwolf/kss-simulator?style=social" alt="GitHub forks" />
  </a>
</div>