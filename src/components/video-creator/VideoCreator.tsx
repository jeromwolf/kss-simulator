'use client';

import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { OntologyExplainer } from '@/remotion/compositions/OntologyExplainer';
import { 
  Video, 
  Download, 
  Play, 
  Plus, 
  Trash2,
  Settings,
  Youtube
} from 'lucide-react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
}

export const VideoCreator: React.FC = () => {
  const [title, setTitle] = useState('RDF 트리플 설명');
  const [triples, setTriples] = useState<Triple[]>([
    { subject: '온톨로지', predicate: '정의', object: '지식표현체계' },
    { subject: 'RDF', predicate: '구성요소', object: '트리플' },
    { subject: '트리플', predicate: '형식', object: '주어-서술어-목적어' }
  ]);
  const [currentTriple, setCurrentTriple] = useState<Triple>({
    subject: '',
    predicate: '',
    object: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const addTriple = () => {
    if (currentTriple.subject && currentTriple.predicate && currentTriple.object) {
      setTriples([...triples, currentTriple]);
      setCurrentTriple({ subject: '', predicate: '', object: '' });
    }
  };

  const removeTriple = (index: number) => {
    setTriples(triples.filter((_, i) => i !== index));
  };

  const generateVideo = async () => {
    setIsGenerating(true);
    // 실제 구현에서는 서버 API를 호출하여 Remotion CLI로 비디오 생성
    setTimeout(() => {
      setIsGenerating(false);
      alert('비디오 생성이 완료되었습니다! (데모 버전)');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Youtube className="w-8 h-8 text-red-500" />
          YouTube 콘텐츠 생성기
        </h1>
        <button
          onClick={generateVideo}
          disabled={isGenerating}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 왼쪽: 설정 패널 */}
        <div className="space-y-6">
          {/* 제목 설정 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              비디오 설정
            </h2>
            <div>
              <label className="block text-sm font-medium mb-2">
                비디오 제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="예: RDF 트리플 기초"
              />
            </div>
          </div>

          {/* 트리플 입력 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">트리플 추가</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={currentTriple.subject}
                onChange={(e) => setCurrentTriple({ ...currentTriple, subject: e.target.value })}
                placeholder="주어 (예: 홍길동)"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="text"
                value={currentTriple.predicate}
                onChange={(e) => setCurrentTriple({ ...currentTriple, predicate: e.target.value })}
                placeholder="서술어 (예: 직업)"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="text"
                value={currentTriple.object}
                onChange={(e) => setCurrentTriple({ ...currentTriple, object: e.target.value })}
                placeholder='목적어 (예: 개발자 또는 "30")'
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
              <button
                onClick={addTriple}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                트리플 추가
              </button>
            </div>
          </div>

          {/* 트리플 목록 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">트리플 목록</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {triples.map((triple, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="text-sm">
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      {triple.subject}
                    </span>
                    <span className="mx-2 text-gray-500">→</span>
                    <span className="font-mono text-green-600 dark:text-green-400">
                      {triple.predicate}
                    </span>
                    <span className="mx-2 text-gray-500">→</span>
                    <span className="font-mono text-orange-600 dark:text-orange-400">
                      {triple.object}
                    </span>
                  </div>
                  <button
                    onClick={() => removeTriple(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 미리보기 */}
        <div className="space-y-6">
          <div className="bg-black rounded-lg overflow-hidden shadow-xl">
            <div className="p-4 bg-gray-900 flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Video className="w-5 h-5" />
                실시간 미리보기
              </h3>
              <span className="text-gray-400 text-sm">1920 x 1080 | 30fps</span>
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0">
                <Player
                  component={OntologyExplainer as any}
                  inputProps={{
                    title,
                    triples,
                  }}
                  durationInFrames={300}
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

          {/* 비디오 정보 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="font-semibold mb-3">비디오 정보</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">길이:</span>
                <span>10초</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">해상도:</span>
                <span>1920 x 1080 (Full HD)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">프레임레이트:</span>
                <span>30 FPS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">형식:</span>
                <span>MP4 (H.264)</span>
              </div>
            </div>
          </div>

          {/* 사용 팁 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Play className="w-4 h-4" />
              사용 팁
            </h4>
            <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <li>• 트리플은 3-5개가 적당합니다</li>
              <li>• 리터럴 값은 큰따옴표로 감싸주세요</li>
              <li>• 간단명료한 단어를 사용하세요</li>
              <li>• 미리보기로 확인 후 생성하세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};