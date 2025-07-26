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

### 📚 온톨로지 마스터클래스
- **16개 챕터**: 온톨로지 기초부터 실전 프로젝트까지
- **인터랙티브 학습**: 개념을 직접 조작하며 이해
- **실시간 피드백**: 즉각적인 학습 확인

### 🎯 핵심 특징
- 🌓 **다크모드 지원**: 눈이 편안한 학습 환경
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화
- ⚡ **빠른 성능**: Next.js 기반 최적화
- 🎨 **모던 UI/UX**: Tailwind CSS로 구현된 세련된 디자인

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Radix UI

### Visualization
- **2D Graphics**: D3.js
- **Data Visualization**: 온톨로지 그래프, RDF Triple 시각화

## 🚦 시작하기

### 필수 요구사항
- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/jeromwolf/kss-simulator.git
cd kss-simulator

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

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

## 📁 프로젝트 구조

```
kss-standalone/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 홈페이지
│   │   ├── ontology/          # 온톨로지 학습 페이지
│   │   └── layout.tsx         # 레이아웃
│   ├── components/            # React 컴포넌트
│   │   └── DarkModeToggle.tsx
│   ├── styles/               # 글로벌 스타일
│   └── types/                # TypeScript 타입 정의
├── public/
│   └── content/              # 온톨로지 학습 콘텐츠
└── package.json
```

## 🎓 학습 콘텐츠

### Part 1: 온톨로지의 이해
1. 온톨로지란 무엇인가?
2. 온톨로지의 핵심 개념
3. 시맨틱 웹과 온톨로지

### Part 2: 온톨로지 기술 표준
4. RDF: 지식 표현의 기초
5. RDFS: 스키마와 계층구조
6. OWL: 표현력 있는 온톨로지
7. SPARQL: 온톨로지 질의

### Part 3: 온톨로지 설계와 구축
8. Protégé 마스터하기
9. 온톨로지 설계 방법론
10. 패턴과 모범 사례

### Part 4: 실전 프로젝트
11. 금융 온톨로지: 주식 시장
12. 뉴스 온톨로지: 지식 그래프
13. 통합 프로젝트: 주식-뉴스 연계

### Part 5: 온톨로지의 미래
14. AI와 온톨로지
15. 산업별 활용사례
16. 미래 전망과 도전과제

## 🔮 로드맵

### Phase 1: MVP (현재)
- ✅ 온톨로지 교육 콘텐츠
- ✅ 인터랙티브 네비게이션
- ✅ 다크모드 지원
- ✅ 반응형 디자인

### Phase 2: 시뮬레이터 (예정)
- [ ] RDF Triple 비주얼 에디터
- [ ] SPARQL 쿼리 플레이그라운드
- [ ] 실시간 추론 시각화
- [ ] 3D 지식 그래프

### Phase 3: AI 통합 (예정)
- [ ] AI 학습 도우미
- [ ] 개인화된 학습 경로
- [ ] 자동 평가 시스템
- [ ] 콘텐츠 추천

### Phase 4: 확장 (예정)
- [ ] LLM 시뮬레이터
- [ ] 양자컴퓨팅 시뮬레이터
- [ ] RAG 시뮬레이터
- [ ] 커뮤니티 기능

## 🤝 기여하기

KSS는 오픈소스 프로젝트입니다. 기여를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- 온톨로지 교육 콘텐츠 제작에 도움을 주신 모든 분들
- 오픈소스 커뮤니티의 훌륭한 도구들

## 📞 연락처

프로젝트 관련 문의사항이 있으시면 이슈를 생성해 주세요.

---

<div align="center">
  <strong>🌟 Star를 눌러 프로젝트를 응원해주세요! 🌟</strong>
</div>