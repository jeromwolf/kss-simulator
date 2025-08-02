import { Module, Chapter } from '@/types/module'

export const llmModule: Module = {
  id: 'llm',
  name: 'Large Language Models',
  nameKo: 'LLM 대형 언어 모델',
  description: '대형 언어 모델의 핵심 개념부터 실전 활용까지',
  version: '1.0.0',
  difficulty: 'intermediate',
  estimatedHours: 20,
  icon: '🤖',
  color: '#6366f1',
  
  prerequisites: [],
  
  chapters: [
    {
      id: '01-introduction',
      title: 'LLM 개요와 역사',
      description: 'LLM의 탄생 배경과 발전 과정',
      estimatedMinutes: 45,
      keywords: ['transformer', 'GPT', 'BERT', '언어모델', 'NLP'],
      learningObjectives: [
        'LLM의 정의와 특징 완전 이해',
        'Transformer 아키텍처 기본 개념 파악',
        '주요 LLM 모델들의 차이점과 특징 분석',
        '언어모델의 역사적 발전 과정 이해',
        'LLM이 가져온 AI 패러다임 변화 인식'
      ]
    },
    {
      id: '02-architecture',
      title: 'Transformer 아키텍처 완전 분석',
      description: 'LLM의 핵심인 Transformer 구조와 동작원리 완전 해부',
      estimatedMinutes: 75,
      keywords: ['attention', 'encoder', 'decoder', 'self-attention', 'multi-head', 'positional-encoding'],
      learningObjectives: [
        'Attention 메커니즘의 수학적 원리 이해',
        'Multi-Head Attention의 병렬 처리 방식',
        'Encoder-Decoder 구조의 정보 흐름 파악',
        'Positional Encoding의 필요성과 구현',
        'Layer Normalization과 Residual Connection',
        'Feed Forward Network의 역할과 구조'
      ]
    },
    {
      id: '03-training',
      title: '모델 학습과정과 최적화',
      description: '사전훈련, 파인튜닝, RLHF까지 전체 학습 파이프라인',
      estimatedMinutes: 65,
      keywords: ['pretraining', 'fine-tuning', 'RLHF', 'tokenization', 'optimization', 'scaling-law'],
      learningObjectives: [
        '사전훈련 과정과 대규모 데이터셋 처리',
        '다양한 파인튜닝 기법 (Supervised, In-context)',
        'RLHF (인간 피드백 강화학습) 원리와 적용',
        'Tokenization 전략과 Vocabulary 구성',
        'Scaling Law와 모델 크기의 관계',
        '학습 효율성을 위한 최적화 기법들'
      ]
    },
    {
      id: '04-prompt-engineering',  
      title: '프롬프트 엔지니어링 마스터',
      description: 'LLM과 효과적으로 소통하는 프롬프트 설계 기법',
      estimatedMinutes: 55,
      keywords: ['prompt', 'few-shot', 'chain-of-thought', 'role-playing', 'context'],
      learningObjectives: [
        'Zero-shot vs Few-shot vs Many-shot 프롬프팅',
        'Chain-of-Thought (CoT) 추론 기법',
        'Role-playing과 Persona 설정',
        'Context Length 최적화 전략',
        '프롬프트 인젝션 방어와 안전성',
        '도메인별 프롬프트 패턴과 템플릿'
      ]
    },
    {
      id: '05-applications-1',
      title: 'LLM 실전 활용: RAG와 챗봇',
      description: 'RAG 시스템과 고급 챗봇 개발 실습',
      estimatedMinutes: 45,
      keywords: ['RAG', 'chatbot', 'vector-db', 'conversation', 'langchain'],
      learningObjectives: [
        'RAG (Retrieval Augmented Generation) 시스템 이해',
        '벡터 데이터베이스와 임베딩 활용',
        'LangChain을 이용한 RAG 구현',
        '고도화된 챗봇 아키텍처 설계',
        '대화 상태 관리와 개인화',
        '챗봇 오류 처리 및 에스컬레이션'
      ]
    },
    {
      id: '05-applications-2',
      title: 'LLM 실전 활용: 코드와 문서',
      description: '코드 생성 자동화와 문서 처리 기법',
      estimatedMinutes: 40,
      keywords: ['code-generation', 'copilot', 'summarization', 'extraction', 'parsing'],
      learningObjectives: [
        'AI 페어 프로그래밍 구현',
        '코드 리뷰와 리팩토링 자동화',
        '문서 요약과 핵심 정보 추출',
        '구조화된 데이터 파싱',
        '대량 문서 배치 처리',
        'PDF, Word 등 다양한 형식 처리'
      ]
    },
    {
      id: '05-applications-3',
      title: 'LLM 실전 활용: 번역과 콘텐츠',
      description: '다국어 번역과 창작 콘텐츠 생성',
      estimatedMinutes: 35,
      keywords: ['translation', 'localization', 'content-generation', 'marketing', 'creative'],
      learningObjectives: [
        '고품질 다국어 번역 시스템',
        '문화적 맥락을 고려한 현지화',
        '마케팅 카피 자동 생성',
        'SEO 최적화 콘텐츠 작성',
        '창작 콘텐츠 파이프라인',
        'A/B 테스트용 변형 생성'
      ]
    },
    {
      id: '06-advanced',
      title: '고급 기법과 최신 동향',
      description: '최신 LLM 연구와 고급 활용 기법들',
      estimatedMinutes: 80,
      keywords: ['multimodal', 'diffusion', 'mamba', 'huggingface', 'efficiency'],
      learningObjectives: [
        'Multimodal LLM (GPT-4V, Claude Vision, Gemini)',
        'Diffusion Models (Stable Diffusion, DALL-E 3)',
        '차세대 아키텍처 (Mamba, RWKV, Flash Attention)',
        'Hugging Face 생태계 활용',
        'Parameter Efficient Fine-tuning (LoRA, QLoRA)',
        'AI 서비스 생태계와 기업 API'
      ]
    },
    {
      id: '07-huggingface',
      title: 'Hugging Face 실전 활용',
      description: '허깅페이스 플랫폼으로 모델 개발부터 배포까지',
      estimatedMinutes: 60,
      keywords: ['transformers', 'datasets', 'spaces', 'autotrain', 'inference-api'],
      learningObjectives: [
        'Transformers 라이브러리로 모델 로드/파인튜닝',
        'Datasets로 데이터셋 처리',
        'Tokenizers로 커스텀 토크나이저 구축',
        'Spaces로 데모 앱 배포',
        'AutoTrain으로 No-code 학습',
        'Inference API 활용법'
      ]
    },
    {
      id: '08-ai-services',  
      title: 'AI 서비스와 API 활용',
      description: '주요 AI 기업 API와 서비스 활용법',
      estimatedMinutes: 50,
      keywords: ['openai-api', 'claude-api', 'vertex-ai', 'bedrock', 'langchain'],
      learningObjectives: [
        'OpenAI API (GPT-4, DALL-E, Whisper)',
        'Anthropic Claude API 활용',
        'Google Vertex AI & Gemini API',
        'AWS Bedrock 멀티모델 플랫폼',
        'Azure OpenAI Service',
        'LangChain으로 API 통합'
      ]
    }
  ],
  
  simulators: [
    {
      id: 'tokenizer',
      name: '토크나이저 시뮬레이터',
      description: '다양한 토크나이저(GPT, Claude, Gemini)의 텍스트 분할 과정 비교',
      component: 'TokenizerSimulator'
    },
    {
      id: 'attention',
      name: 'Attention 메커니즘 시각화',
      description: 'Self-Attention과 Multi-Head Attention의 실시간 동작 과정',
      component: 'AttentionVisualizer'
    },
    {
      id: 'transformer',
      name: 'Transformer 아키텍처 3D',
      description: '인코더-디코더 구조를 3D로 탐험하며 데이터 흐름 추적',
      component: 'TransformerArchitecture3D'
    },
    {
      id: 'training',
      name: '모델 학습 시뮬레이터',
      description: '사전훈련부터 파인튜닝까지 전체 학습 과정을 단계별로 체험',
      component: 'TrainingSimulator'
    },
    {
      id: 'prompt-playground',
      name: '프롬프트 플레이그라운드',
      description: '다양한 프롬프트 기법을 실시간으로 테스트하고 결과 비교',
      component: 'PromptPlayground'
    },
    {
      id: 'model-comparison',
      name: 'LLM 모델 비교기',
      description: 'Claude Opus 4, GPT-4o, Grok 4, Gemini 2.5, Llama 3.3 등 최신 모델 비교',
      component: 'ModelComparison'
    }
  ],
  
  tools: [
    {
      id: 'prompt-playground',
      name: '프롬프트 플레이그라운드',
      description: '다양한 프롬프트 기법 실습',
      url: '/modules/llm/tools/prompt-playground'
    }
  ]
}

export const getChapter = (chapterId: string): Chapter | undefined => {
  return llmModule.chapters.find(chapter => chapter.id === chapterId)
}

export const getNextChapter = (currentChapterId: string): Chapter | undefined => {
  const currentIndex = llmModule.chapters.findIndex(ch => ch.id === currentChapterId)
  return currentIndex < llmModule.chapters.length - 1 ? llmModule.chapters[currentIndex + 1] : undefined
}

export const getPrevChapter = (currentChapterId: string): Chapter | undefined => {
  const currentIndex = llmModule.chapters.findIndex(ch => ch.id === currentChapterId)
  return currentIndex > 0 ? llmModule.chapters[currentIndex - 1] : undefined
}