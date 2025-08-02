'use client';

import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { OntologyShorts } from '@/remotion/compositions/OntologyShorts';
import { 
  Video, 
  Download, 
  ChevronRight,
  Settings,
  Loader,
  Clock,
  Zap,
  Brain,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface ShortVideoTopic {
  id: string;
  title: string;
  concept: string;
  explanation: string;
  example?: {
    before: string;
    after: string;
  };
  duration: number; // seconds
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

// 온톨로지 단편 비디오 주제들 (1-3분)
const shortVideoTopics: ShortVideoTopic[] = [
  {
    id: 'what-is-rdf',
    title: 'RDF가 뭐야? 1분 설명',
    concept: 'RDF = 세상을 표현하는 레고 블록',
    explanation: '주어-술어-목적어로 모든 지식을 표현할 수 있습니다. 마치 레고 블록처럼 단순한 구조로 복잡한 세상을 만들어요.',
    example: {
      before: '철수는 학생이다',
      after: '<철수> <직업> <학생>'
    },
    duration: 60,
    difficulty: 'easy',
    tags: ['RDF', '기초', '입문']
  },
  {
    id: 'triple-magic',
    title: '트리플의 마법: 3개로 세상을 표현하기',
    concept: '주어 + 술어 + 목적어 = 지식',
    explanation: '단 3개의 요소로 세상의 모든 관계를 표현할 수 있다는 놀라운 발견! 온톨로지의 기본 원리를 배워봅시다.',
    example: {
      before: '아이폰은 애플이 만들었다',
      after: '<아이폰> <제조사> <애플>'
    },
    duration: 90,
    difficulty: 'easy',
    tags: ['트리플', 'RDF', '관계']
  },
  {
    id: 'why-ontology',
    title: '왜 온톨로지를 배워야 할까?',
    concept: 'AI 시대의 필수 지식 표현법',
    explanation: 'ChatGPT도 온톨로지를 사용해요! 컴퓨터가 인간의 지식을 이해하려면 체계적인 표현이 필요합니다.',
    duration: 120,
    difficulty: 'medium',
    tags: ['온톨로지', 'AI', '활용']
  },
  {
    id: 'uri-explained',
    title: 'URI: 인터넷 주민등록번호',
    concept: 'URI = 전 세계에서 유일한 이름',
    explanation: '모든 것에 고유한 이름을 붙이는 방법! URI를 사용하면 전 세계 어디서든 같은 의미로 소통할 수 있습니다.',
    example: {
      before: '사과 (과일? 회사?)',
      after: 'http://example.org/fruit#apple'
    },
    duration: 90,
    difficulty: 'medium',
    tags: ['URI', '식별자', '웹']
  },
  {
    id: 'sparql-basics',
    title: 'SPARQL: 지식 검색의 마법',
    concept: 'SQL의 사촌, 그래프 데이터 검색',
    explanation: 'RDF로 저장한 지식을 검색하는 강력한 도구! 마치 구글처럼 지식 그래프를 검색할 수 있습니다.',
    example: {
      before: '철수의 친구를 찾아줘',
      after: 'SELECT ?friend WHERE { <철수> <친구> ?friend }'
    },
    duration: 120,
    difficulty: 'hard',
    tags: ['SPARQL', '검색', '쿼리']
  },
  {
    id: 'knowledge-graph-intro',
    title: '지식 그래프: 구글이 똑똑한 이유',
    concept: '점과 선으로 만드는 지식의 우주',
    explanation: '구글, 네이버, 카카오가 모두 사용하는 지식 그래프! 정보를 연결하면 더 똑똑한 AI가 됩니다.',
    duration: 120,
    difficulty: 'medium',
    tags: ['지식그래프', '구글', 'AI']
  },
  {
    id: 'owl-power',
    title: 'OWL: 온톨로지의 슈퍼파워',
    concept: '추론 능력을 가진 지식 표현',
    explanation: 'A는 B다, B는 C다 → A는 C다! OWL은 컴퓨터에게 추론 능력을 부여합니다.',
    example: {
      before: '포유류는 동물이다, 개는 포유류다',
      after: '→ 개는 동물이다 (자동 추론!)'
    },
    duration: 120,
    difficulty: 'hard',
    tags: ['OWL', '추론', '논리']
  },
  {
    id: 'semantic-web-dream',
    title: '시맨틱 웹: 팀 버너스리의 꿈',
    concept: '의미를 이해하는 웹',
    explanation: 'WWW를 만든 팀 버너스리의 다음 꿈! 컴퓨터가 웹페이지의 의미를 이해하는 세상을 만들어요.',
    duration: 90,
    difficulty: 'medium',
    tags: ['시맨틱웹', 'WWW', '미래']
  }
];

export const OntologyShortsCreator: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<ShortVideoTopic>(shortVideoTopics[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateVideo = async () => {
    setIsGenerating(true);
    // 실제 구현에서는 서버 API 호출
    setTimeout(() => {
      setIsGenerating(false);
      alert(`"${selectedTopic.title}" 비디오 생성 완료! (데모)`);
    }, 3000);
  };

  const totalFrames = selectedTopic.duration * 30; // 30fps

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'hard': return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      default: return '';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Zap className="w-4 h-4" />;
      case 'medium': return <Brain className="w-4 h-4" />;
      case 'hard': return <Sparkles className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Video className="w-8 h-8 text-blue-500" />
          온톨로지 단편 콘텐츠 생성기
        </h1>
        <button
          onClick={generateVideo}
          disabled={isGenerating}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              생성 중...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              비디오 생성
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 주제 선택 */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-700">
              <h2 className="font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                비디오 주제 선택
              </h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {shortVideoTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedTopic.id === topic.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500'
                      : ''
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-sm flex-1">{topic.title}</h3>
                      {selectedTopic.id === topic.id && (
                        <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-500 dark:text-gray-400">
                          {Math.floor(topic.duration / 60)}:{String(topic.duration % 60).padStart(2, '0')}
                        </span>
                      </div>
                      <div className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${getDifficultyColor(topic.difficulty)}`}>
                        {getDifficultyIcon(topic.difficulty)}
                        <span className="capitalize">{topic.difficulty}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {topic.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 비디오 설정 및 미리보기 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 비디오 정보 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              비디오 정보
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">제목</label>
                <input
                  type="text"
                  value={selectedTopic.title}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">핵심 개념</label>
                <input
                  type="text"
                  value={selectedTopic.concept}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">설명</label>
                <textarea
                  value={selectedTopic.explanation}
                  disabled
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                />
              </div>
              {selectedTopic.example && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">변환 전</label>
                    <div className="px-4 py-2 border rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-mono text-sm">
                      {selectedTopic.example.before}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">변환 후</label>
                    <div className="px-4 py-2 border rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-mono text-sm">
                      {selectedTopic.example.after}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 비디오 미리보기 */}
          <div className="bg-black rounded-lg overflow-hidden shadow-xl">
            <div className="p-4 bg-gray-900 flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Video className="w-5 h-5" />
                미리보기
              </h3>
              <span className="text-gray-400 text-sm">
                1920 x 1080 | 30fps | {Math.floor(selectedTopic.duration / 60)}:{String(selectedTopic.duration % 60).padStart(2, '0')}
              </span>
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0">
                <Player
                  component={OntologyShorts as any}
                  inputProps={{
                    title: selectedTopic.title,
                    concept: selectedTopic.concept,
                    explanation: selectedTopic.explanation,
                    example: selectedTopic.example,
                    duration: selectedTopic.duration
                  }}
                  durationInFrames={totalFrames}
                  fps={30}
                  compositionWidth={1920}
                  compositionHeight={1080}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  controls
                  loop
                  autoPlay={false}
                />
              </div>
            </div>
          </div>

          {/* 사용 안내 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              YouTube Shorts 최적화 팁
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>60초 이내: YouTube Shorts 알고리즘 최적화</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>세로 형식(9:16)으로 추가 렌더링 권장</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>썸네일: 첫 3초가 자동으로 썸네일이 됩니다</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>해시태그: #Shorts #온톨로지 #1분지식 추가</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>시리즈로 만들어 재생목록 구성하면 시청 시간 증가</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};