export const moduleMetadata = {
  title: '바이블코딩',
  description: 'Claude Code, Gemini CLI, Cursor, Windsurf 등 최신 AI 코딩 도구와 자동화 워크플로우 마스터하기',
  duration: '8시간',
  level: 'intermediate' as const,
  themeColor: 'from-violet-500 to-purple-600',
  chapters: [
    {
      id: 1,
      title: 'AI 자동화 시대의 도래',
      description: 'AI 도구가 개발 생산성을 어떻게 혁신하는가',
      duration: '30분',
      learningObjectives: [
        'AI 자동화 도구의 진화와 현재',
        '생산성 10배 향상의 실제 사례',
        '인간-AI 협업의 미래'
      ]
    },
    {
      id: 2,
      title: 'Claude Code 완벽 가이드',
      description: 'Anthropic의 공식 CLI 도구로 코딩 자동화하기',
      duration: '1시간 30분',
      learningObjectives: [
        'Claude Code 설치와 환경 설정',
        'MCP (Model Context Protocol) 이해',
        '프로젝트 컨텍스트 관리 (CLAUDE.md)',
        '효과적인 프롬프트 작성법',
        '실전 프로젝트 자동화'
      ]
    },
    {
      id: 3,
      title: 'Gemini CLI & AI Studio',
      description: 'Google의 Gemini AI 개발 도구 완벽 가이드',
      duration: '1시간',
      learningObjectives: [
        'Gemini CLI 설치와 환경 설정',
        'AI Studio에서 프롬프트 테스트',
        'Gemini API 통합과 활용',
        '멀티모달 처리 (이미지, 비디오, 오디오)',
        'Function Calling과 Grounding'
      ]
    },
    {
      id: 4,
      title: 'Cursor IDE 마스터하기',
      description: 'AI-First IDE로 개발 속도 극대화',
      duration: '1시간',
      learningObjectives: [
        'Cursor의 핵심 기능과 단축키',
        'Copilot++ 활용법',
        'Chat과 Composer 모드 마스터',
        '커스텀 Rules 설정',
        'Large file 처리 전략'
      ]
    },
    {
      id: 5,
      title: 'Windsurf와 Cascade',
      description: 'Codeium의 차세대 AI 에디터 활용법',
      duration: '1시간',
      learningObjectives: [
        'Windsurf IDE 특징과 장점',
        'Cascade 플로우 모드 활용',
        'Multi-file 편집 자동화',
        'Supercomplete 기능 마스터',
        'Command 모드 활용법'
      ]
    },
    {
      id: 6,
      title: 'GitHub Copilot 고급 활용',
      description: 'Copilot X와 Workspace 기능 마스터',
      duration: '45분',
      learningObjectives: [
        'Copilot Chat 고급 기능',
        'Copilot Workspace 활용',
        'Pull Request 자동 생성',
        'Code Review 자동화',
        'Custom Instructions 설정'
      ]
    },
    {
      id: 7,
      title: 'AI 워크플로우 자동화',
      description: 'Make, Zapier, n8n으로 AI 파이프라인 구축',
      duration: '1시간 30분',
      learningObjectives: [
        'No-code AI 자동화 플랫폼',
        'API 연동과 웹훅 설정',
        'AI 체인 워크플로우 설계',
        'Error handling과 retry 로직',
        '실전 자동화 시나리오'
      ]
    },
    {
      id: 8,
      title: 'LangChain & AutoGen',
      description: 'AI 에이전트 오케스트레이션',
      duration: '1시간 30분',
      learningObjectives: [
        'LangChain 프레임워크 이해',
        'AutoGen으로 멀티 에이전트 구축',
        'Tool calling과 Function calling',
        'Memory와 Context 관리',
        'Production 배포 전략'
      ]
    },
    {
      id: 9,
      title: '미래를 위한 준비',
      description: 'AI 도구의 진화와 커리어 전략',
      duration: '45분',
      learningObjectives: [
        '새로운 AI 도구 평가 기준',
        'AI와 함께 성장하는 개발자',
        '프롬프트 엔지니어링 스킬',
        'AI 시대의 핵심 역량',
        '지속적 학습 전략'
      ]
    }
  ],
  simulators: [
    {
      id: 'prompt-optimizer',
      title: '프롬프트 최적화 실험실',
      description: '다양한 AI 모델에서 프롬프트 성능 비교'
    },
    {
      id: 'workflow-builder',
      title: 'AI 워크플로우 빌더',
      description: '드래그앤드롭으로 자동화 파이프라인 설계'
    },
    {
      id: 'code-generator',
      title: '멀티 AI 코드 생성기',
      description: '여러 AI 모델의 코드 생성 결과 비교'
    },
    {
      id: 'context-manager',
      title: '컨텍스트 관리 시뮬레이터',
      description: 'MCP와 프로젝트 컨텍스트 최적화'
    }
  ]
}