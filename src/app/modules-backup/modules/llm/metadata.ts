/**
 * LLM Module Metadata
 * Contains configuration and metadata for the Large Language Model learning module
 */

export interface ChapterMetadata {
  id: string;
  number: number;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
  objectives: string[];
  prerequisites?: string[];
  keywords: string[];
}

export interface ModuleMetadata {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalChapters: number;
  estimatedTotalTime: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningOutcomes: string[];
  chapters: ChapterMetadata[];
}

export const LLM_MODULE_METADATA: ModuleMetadata = {
  id: 'llm',
  title: 'Large Language Models (LLM)',
  description: '대규모 언어 모델의 작동 원리를 이해하고, 토크나이저부터 트랜스포머 아키텍처까지 단계별로 학습합니다.',
  icon: 'brain',
  color: '#8B5CF6',
  totalChapters: 12,
  estimatedTotalTime: 20,
  difficulty: 'intermediate',
  prerequisites: [
    '기초 수학 (선형대수, 확률론)',
    '프로그래밍 기초 (Python)',
    '머신러닝 기본 개념'
  ],
  learningOutcomes: [
    'LLM의 기본 원리와 발전 과정 이해',
    '토크나이저와 임베딩의 작동 방식 파악',
    '트랜스포머 아키텍처의 핵심 개념 습득',
    'Attention 메커니즘의 수학적 이해',
    'Pre-training과 Fine-tuning 프로세스 이해',
    'LLM의 실제 응용과 한계점 파악'
  ],
  chapters: [
    {
      id: 'llm-intro',
      number: 1,
      title: 'LLM 개요와 역사',
      description: '언어 모델의 발전 과정과 LLM의 탄생 배경을 살펴봅니다.',
      estimatedTime: 45,
      objectives: [
        '언어 모델의 정의와 목적 이해',
        'n-gram에서 신경망 언어 모델까지의 발전 과정',
        'GPT, BERT 등 주요 LLM의 특징 파악',
        'LLM이 가져온 패러다임 변화 이해'
      ],
      keywords: ['언어 모델', 'GPT', 'BERT', '트랜스포머', 'Scaling Law']
    },
    {
      id: 'tokenization',
      number: 2,
      title: '토크나이제이션',
      description: '텍스트를 모델이 이해할 수 있는 토큰으로 변환하는 과정을 학습합니다.',
      estimatedTime: 60,
      objectives: [
        '토크나이제이션의 필요성 이해',
        'BPE, WordPiece, SentencePiece 알고리즘 학습',
        '토크나이저 구현 실습',
        '한국어 토크나이제이션의 특징과 도전 과제'
      ],
      prerequisites: ['llm-intro'],
      keywords: ['토크나이제이션', 'BPE', 'WordPiece', 'Subword', 'Vocabulary']
    },
    {
      id: 'embeddings',
      number: 3,
      title: '임베딩과 표현 학습',
      description: '토큰을 고차원 벡터 공간에 매핑하는 임베딩의 원리를 학습합니다.',
      estimatedTime: 75,
      objectives: [
        '임베딩의 개념과 필요성 이해',
        'Word2Vec, GloVe 등 전통적 임베딩 방법',
        'Contextual 임베딩의 등장과 중요성',
        '위치 임베딩(Positional Encoding)의 역할'
      ],
      prerequisites: ['tokenization'],
      keywords: ['임베딩', 'Word2Vec', 'GloVe', 'Positional Encoding', '벡터 표현']
    },
    {
      id: 'transformer-basics',
      number: 4,
      title: '트랜스포머 기초',
      description: '현대 LLM의 핵심인 트랜스포머 아키텍처의 기본 구조를 학습합니다.',
      estimatedTime: 90,
      objectives: [
        '트랜스포머의 전체 구조 이해',
        'Encoder-Decoder 아키텍처',
        'Multi-Head Attention의 개념',
        'Feed-Forward Network의 역할'
      ],
      prerequisites: ['embeddings'],
      keywords: ['트랜스포머', 'Encoder', 'Decoder', 'Architecture', 'Neural Network']
    },
    {
      id: 'attention-mechanism',
      number: 5,
      title: 'Attention 메커니즘 심화',
      description: 'Self-Attention과 Cross-Attention의 수학적 원리를 깊이 있게 학습합니다.',
      estimatedTime: 120,
      objectives: [
        'Attention의 수학적 정의와 계산 과정',
        'Query, Key, Value의 역할과 의미',
        'Scaled Dot-Product Attention 구현',
        'Multi-Head Attention의 병렬화 이해'
      ],
      prerequisites: ['transformer-basics'],
      keywords: ['Attention', 'Self-Attention', 'Query', 'Key', 'Value', 'Softmax']
    },
    {
      id: 'pre-training',
      number: 6,
      title: '사전 학습(Pre-training)',
      description: '대규모 데이터를 활용한 LLM의 사전 학습 과정을 학습합니다.',
      estimatedTime: 90,
      objectives: [
        '사전 학습의 목적과 방법론',
        'Masked Language Modeling (MLM)',
        'Causal Language Modeling (CLM)',
        '학습 데이터의 구성과 전처리'
      ],
      prerequisites: ['attention-mechanism'],
      keywords: ['Pre-training', 'MLM', 'CLM', 'Unsupervised Learning', 'Corpus']
    },
    {
      id: 'fine-tuning',
      number: 7,
      title: '파인튜닝과 전이학습',
      description: '사전 학습된 모델을 특정 태스크에 맞게 조정하는 방법을 학습합니다.',
      estimatedTime: 75,
      objectives: [
        '파인튜닝의 개념과 필요성',
        'Task-specific 레이어 추가 방법',
        'Few-shot, Zero-shot 학습',
        'Parameter-Efficient Fine-tuning (PEFT)'
      ],
      prerequisites: ['pre-training'],
      keywords: ['Fine-tuning', 'Transfer Learning', 'PEFT', 'LoRA', 'Adapter']
    },
    {
      id: 'decoding-strategies',
      number: 8,
      title: '디코딩 전략',
      description: 'LLM에서 텍스트를 생성하는 다양한 디코딩 전략을 학습합니다.',
      estimatedTime: 60,
      objectives: [
        'Greedy Decoding의 장단점',
        'Beam Search의 원리와 구현',
        'Sampling 기반 방법들 (Top-k, Top-p)',
        'Temperature의 역할과 조절'
      ],
      prerequisites: ['fine-tuning'],
      keywords: ['Decoding', 'Beam Search', 'Sampling', 'Temperature', 'Generation']
    },
    {
      id: 'evaluation-metrics',
      number: 9,
      title: '평가 지표와 벤치마크',
      description: 'LLM의 성능을 측정하는 다양한 평가 방법을 학습합니다.',
      estimatedTime: 60,
      objectives: [
        'Perplexity와 언어 모델링 평가',
        'BLEU, ROUGE 등 생성 품질 지표',
        'Human Evaluation의 중요성',
        '주요 벤치마크 데이터셋 소개'
      ],
      prerequisites: ['decoding-strategies'],
      keywords: ['Perplexity', 'BLEU', 'ROUGE', 'Benchmark', 'Evaluation']
    },
    {
      id: 'scaling-laws',
      number: 10,
      title: '스케일링 법칙',
      description: '모델 크기, 데이터, 컴퓨팅과 성능의 관계를 학습합니다.',
      estimatedTime: 45,
      objectives: [
        'Scaling Law의 발견과 의미',
        '모델 파라미터와 성능의 관계',
        'Compute-Optimal 모델 설계',
        'Emergent Abilities의 출현'
      ],
      prerequisites: ['evaluation-metrics'],
      keywords: ['Scaling Law', 'Parameters', 'Compute', 'Emergent Abilities', 'Chinchilla']
    },
    {
      id: 'challenges-limitations',
      number: 11,
      title: '도전 과제와 한계',
      description: 'LLM의 현재 한계점과 해결해야 할 과제들을 살펴봅니다.',
      estimatedTime: 60,
      objectives: [
        'Hallucination 문제와 대응 방법',
        '편향성(Bias)과 공정성 이슈',
        '해석가능성(Interpretability)의 부족',
        '컴퓨팅 자원과 환경 문제'
      ],
      prerequisites: ['scaling-laws'],
      keywords: ['Hallucination', 'Bias', 'Interpretability', 'Ethics', 'Sustainability']
    },
    {
      id: 'future-directions',
      number: 12,
      title: '미래 전망과 연구 동향',
      description: 'LLM 연구의 최신 동향과 미래 발전 방향을 탐구합니다.',
      estimatedTime: 45,
      objectives: [
        'Multimodal LLM의 발전',
        'Efficient LLM 연구 동향',
        'AGI를 향한 여정',
        '사회적 영향과 규제 논의'
      ],
      prerequisites: ['challenges-limitations'],
      keywords: ['Multimodal', 'AGI', 'Efficiency', 'Regulation', 'Future']
    }
  ]
};

// Helper function to get chapter by ID
export function getChapterById(chapterId: string): ChapterMetadata | undefined {
  return LLM_MODULE_METADATA.chapters.find(chapter => chapter.id === chapterId);
}

// Helper function to get next chapter
export function getNextChapter(currentChapterId: string): ChapterMetadata | undefined {
  const currentIndex = LLM_MODULE_METADATA.chapters.findIndex(
    chapter => chapter.id === currentChapterId
  );
  
  if (currentIndex === -1 || currentIndex === LLM_MODULE_METADATA.chapters.length - 1) {
    return undefined;
  }
  
  return LLM_MODULE_METADATA.chapters[currentIndex + 1];
}

// Helper function to get previous chapter
export function getPreviousChapter(currentChapterId: string): ChapterMetadata | undefined {
  const currentIndex = LLM_MODULE_METADATA.chapters.findIndex(
    chapter => chapter.id === currentChapterId
  );
  
  if (currentIndex <= 0) {
    return undefined;
  }
  
  return LLM_MODULE_METADATA.chapters[currentIndex - 1];
}

// Helper function to calculate total progress
export function calculateProgress(completedChapterIds: string[]): number {
  const completedCount = completedChapterIds.filter(id => 
    LLM_MODULE_METADATA.chapters.some(chapter => chapter.id === id)
  ).length;
  
  return Math.round((completedCount / LLM_MODULE_METADATA.totalChapters) * 100);
}