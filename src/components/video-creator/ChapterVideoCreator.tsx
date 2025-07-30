'use client';

import React, { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { ChapterExplainer } from '@/remotion/compositions/ChapterExplainer';
import { ModernChapterExplainer } from '@/remotion/compositions/ModernChapterExplainer';
import { 
  BookOpen, 
  Video, 
  Download, 
  ChevronRight,
  FileText,
  Settings,
  Loader
} from 'lucide-react';
import { AudioSettingsPanel, AudioSettings } from './AudioSettings';
import { parseChapterContent } from '@/lib/chapter-parser';

interface Chapter {
  number: number;
  title: string;
  htmlFile: string;
}

const chapters: Chapter[] = [
  { number: 1, title: '온톨로지의 개념과 역사', htmlFile: 'chapter01.html' },
  { number: 2, title: '지식 표현의 기초', htmlFile: 'chapter02.html' },
  { number: 3, title: '시맨틱 웹과 온톨로지', htmlFile: 'chapter03.html' },
  { number: 4, title: 'RDF - 자원 기술 프레임워크', htmlFile: 'chapter04.html' },
  { number: 5, title: 'RDFS - RDF 스키마', htmlFile: 'chapter05.html' },
  { number: 6, title: 'OWL - 웹 온톨로지 언어', htmlFile: 'chapter06.html' },
  { number: 7, title: 'SPARQL - RDF 질의 언어', htmlFile: 'chapter07.html' },
  { number: 8, title: '추론과 논리', htmlFile: 'chapter08.html' },
  { number: 9, title: '온톨로지 모델링 실습', htmlFile: 'chapter09.html' },
  { number: 10, title: '도메인 온톨로지 구축', htmlFile: 'chapter10.html' },
  { number: 11, title: '온톨로지 평가와 품질', htmlFile: 'chapter11.html' },
  { number: 12, title: '온톨로지 도구와 플랫폼', htmlFile: 'chapter12.html' },
  { number: 13, title: '지식 그래프와 응용', htmlFile: 'chapter13.html' },
  { number: 14, title: 'AI와 온톨로지', htmlFile: 'chapter14.html' },
  { number: 15, title: '미래 전망과 연구 동향', htmlFile: 'chapter15.html' },
  { number: 16, title: '종합 프로젝트', htmlFile: 'chapter16.html' },
];

export const ChapterVideoCreator: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(chapters[0]);
  const [videoSections, setVideoSections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videoDuration, setVideoDuration] = useState(5); // 분
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoStyle, setVideoStyle] = useState<'classic' | 'modern'>('modern');
  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    narrationEnabled: true,
    narrationVoice: 'female',
    narrationSpeed: 1.0,
    backgroundMusicEnabled: true,
    backgroundMusicVolume: 0.3,
    soundEffectsEnabled: true,
    soundEffectsVolume: 0.5,
  });

  useEffect(() => {
    loadChapterContent(selectedChapter);
  }, [selectedChapter, videoStyle]);

  const loadChapterContent = async (chapter: Chapter) => {
    setIsLoading(true);
    try {
      // 챕터 파서를 사용하여 상세한 섹션 로드
      const detailedSections = parseChapterContent(chapter.number);
      
      // 비디오 스타일에 따라 섹션 포맷 조정
      const sections = detailedSections.map(section => ({
        ...section,
        // 모던 스타일이 아닌 경우 highlights 제거
        highlights: videoStyle === 'modern' ? section.highlights : undefined,
        // 예제와 퀴즈는 모던 스타일에서만 표시
        examples: videoStyle === 'modern' ? section.examples : undefined,
        quiz: videoStyle === 'modern' ? section.quiz : undefined
      }));
      
      setVideoSections(sections);
    } catch (error) {
      console.error('챕터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateVideo = async () => {
    setIsGenerating(true);
    // 실제 구현에서는 서버 API 호출
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Chapter ${selectedChapter.number} 비디오 생성 완료! (데모)`);
    }, 3000);
  };

  const totalFrames = videoStyle === 'modern' 
    ? 90 + (videoSections.length * 240) + 120 // 모던 스타일: 섹션당 8초 (240프레임)
    : 90 + (videoSections.length * 150) + 120; // 클래식 스타일: 섹션당 5초

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-500" />
          챕터별 YouTube 콘텐츠 생성
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 챕터 선택 */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-700">
              <h2 className="font-semibold">챕터 선택</h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {chapters.map((chapter) => (
                <button
                  key={chapter.number}
                  onClick={() => setSelectedChapter(chapter)}
                  className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedChapter.number === chapter.number
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-400">
                      {String(chapter.number).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{chapter.title}</h3>
                    </div>
                    {selectedChapter.number === chapter.number && (
                      <ChevronRight className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 비디오 설정 및 미리보기 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 비디오 설정 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              비디오 설정
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  챕터 번호
                </label>
                <input
                  type="text"
                  value={`Chapter ${selectedChapter.number}`}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  예상 길이
                </label>
                <select
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                >
                  <option value={3}>3분 (요약)</option>
                  <option value={5}>5분 (기본)</option>
                  <option value={10}>10분 (상세)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  비디오 스타일
                </label>
                <select
                  value={videoStyle}
                  onChange={(e) => setVideoStyle(e.target.value as 'classic' | 'modern')}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                >
                  <option value="modern">모던 (파티클, 그라디언트)</option>
                  <option value="classic">클래식 (심플)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 오디오 설정 */}
          <AudioSettingsPanel onSettingsChange={setAudioSettings} />

          {/* 섹션 미리보기 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              비디오 구성
            </h2>
            {isLoading ? (
              <div className="text-center py-8">
                <Loader className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500">챕터 내용 분석 중...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {videoSections.map((section, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <h3 className="font-medium mb-1">{section.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {section.content.split('\n')[0]}...
                    </p>
                    {section.code && (
                      <div className="mt-2 text-xs bg-gray-900 text-gray-300 p-2 rounded font-mono">
                        {section.code.split('\n')[0]}...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 비디오 미리보기 */}
          <div className="bg-black rounded-lg overflow-hidden shadow-xl">
            <div className="p-4 bg-gray-900 flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Video className="w-5 h-5" />
                미리보기
              </h3>
              <span className="text-gray-400 text-sm">1920 x 1080 | 30fps</span>
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0">
                <Player
                  component={videoStyle === 'modern' ? ModernChapterExplainer as any : ChapterExplainer as any}
                  inputProps={{
                    chapterNumber: selectedChapter.number,
                    chapterTitle: selectedChapter.title,
                    sections: videoSections,
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
                />
              </div>
            </div>
          </div>

          {/* 사용 안내 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Video className="w-5 h-5" />
              YouTube 업로드 가이드
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>챕터를 선택하고 비디오 길이를 설정합니다</li>
              <li>미리보기로 내용을 확인합니다</li>
              <li>"비디오 생성" 버튼을 클릭하여 MP4 파일을 생성합니다</li>
              <li>생성된 파일을 YouTube에 업로드합니다</li>
              <li>제목: "KSS 온톨로지 강의 - Chapter X: [제목]"</li>
              <li>설명에 KSS 플랫폼 링크와 실습 안내를 추가합니다</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};