import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Audio,
  staticFile,
  Easing,
} from 'remotion';

interface VideoSection {
  title: string;
  content: string;
  narration: string;
  keyPoints?: string[];
  examples?: string[];
  charts?: {
    type: string;
    title: string;
    description: string;
  }[];
}

interface StockChapterExplainerProps {
  topicTitle: string;
  sections: VideoSection[];
  style: 'professional' | 'educational' | 'dynamic';
  moduleColor: string;
}

// 주식 차트 애니메이션 컴포넌트
const StockChartAnimation: React.FC<{ type: string }> = ({ type }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  
  // 캔들스틱 차트 애니메이션
  const candles = Array.from({ length: 10 }, (_, i) => ({
    x: (i + 1) * (width / 12),
    open: 100 + Math.random() * 50,
    close: 100 + Math.random() * 50,
    high: 150 + Math.random() * 30,
    low: 80 + Math.random() * 20,
  }));

  const progress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={600} height={300} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
        {candles.map((candle, i) => {
          const delay = i * 2;
          const candleProgress = interpolate(
            frame,
            [delay, delay + 20],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          
          const isGreen = candle.close > candle.open;
          const color = isGreen ? '#10b981' : '#ef4444';
          
          return (
            <g key={i} opacity={candleProgress}>
              {/* 심지 */}
              <line
                x1={candle.x}
                y1={300 - candle.high * 1.5}
                x2={candle.x}
                y2={300 - candle.low * 1.5}
                stroke={color}
                strokeWidth={2}
              />
              {/* 몸통 */}
              <rect
                x={candle.x - 15}
                y={300 - Math.max(candle.open, candle.close) * 1.5}
                width={30}
                height={Math.abs(candle.close - candle.open) * 1.5}
                fill={color}
                rx={2}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// 타이틀 슬라이드
const TitleSlide: React.FC<{
  title: string;
  style: string;
  color: string;
}> = ({ title, style, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    from: -50,
    to: 0,
    durationInFrames: 20,
  });

  const fadeIn = interpolate(frame, [0, 20], [0, 1]);

  const gradientColors = color.includes('blue') 
    ? 'from-blue-600 to-indigo-600'
    : color.includes('green')
    ? 'from-green-600 to-emerald-600'
    : 'from-purple-600 to-pink-600';

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a' }}>
      {/* 배경 패턴 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />
      
      {/* 메인 타이틀 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translateY(${slideIn}px)`,
          textAlign: 'center',
          opacity: fadeIn,
        }}
      >
        <div className={`text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradientColors}`}>
          {title}
        </div>
        <div className="text-2xl text-gray-400 mt-4">
          주식 투자 마스터 과정
        </div>
      </div>

      {/* 장식 요소 */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 200,
          height: 4,
          opacity: fadeIn,
        }}
        className={`bg-gradient-to-r ${gradientColors} rounded-full`}
      />
    </AbsoluteFill>
  );
};

// 콘텐츠 슬라이드
const ContentSlide: React.FC<{
  section: VideoSection;
  style: string;
}> = ({ section, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    from: 30,
    to: 0,
    durationInFrames: 20,
  });

  const fadeIn = interpolate(frame, [0, 20], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', padding: 80 }}>
      <div style={{ opacity: fadeIn, transform: `translateX(${slideIn}px)` }}>
        {/* 섹션 타이틀 */}
        <h2 className="text-5xl font-bold text-white mb-8">
          {section.title}
        </h2>

        {/* 콘텐츠 */}
        <div className="text-2xl text-gray-300 leading-relaxed mb-8">
          {section.content}
        </div>

        {/* 키 포인트 */}
        {section.keyPoints && section.keyPoints.length > 0 && (
          <div className="mt-12">
            <h3 className="text-3xl font-semibold text-blue-400 mb-6">핵심 포인트</h3>
            <div className="space-y-4">
              {section.keyPoints.map((point, index) => {
                const pointDelay = index * 10;
                const pointProgress = interpolate(
                  frame,
                  [20 + pointDelay, 40 + pointDelay],
                  [0, 1],
                  { extrapolateRight: 'clamp' }
                );
                
                return (
                  <div
                    key={index}
                    style={{
                      opacity: pointProgress,
                      transform: `translateX(${interpolate(pointProgress, [0, 1], [20, 0])}px)`,
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="text-xl text-gray-300 flex-1">{point}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 차트가 있는 경우 */}
        {section.charts && section.charts.length > 0 && (
          <div style={{ position: 'absolute', right: 80, top: 200 }}>
            <StockChartAnimation type={section.charts[0].type} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 아웃트로 슬라이드
const OutroSlide: React.FC<{ topicTitle: string }> = ({ topicTitle }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a' }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          opacity: fadeIn,
        }}
      >
        <div className="text-4xl font-bold text-white mb-8">
          {topicTitle} 학습 완료!
        </div>
        <div className="text-2xl text-gray-400 mb-12">
          다음 강의에서 더 깊이있는 내용으로 만나뵙겠습니다
        </div>
        
        {/* CTA */}
        <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-xl">
          <span>구독하고 더 많은 강의 받기</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const StockChapterExplainer: React.FC<StockChapterExplainerProps> = ({
  topicTitle,
  sections,
  style,
  moduleColor,
}) => {
  const { fps } = useVideoConfig();
  
  // 각 섹션 길이 (프레임)
  const titleDuration = 90; // 3초
  const sectionDuration = 180; // 6초
  const outroDuration = 120; // 4초

  let currentTime = 0;

  return (
    <>
      {/* 배경음악 (옵션) */}
      {/* <Audio src={staticFile('background-music.mp3')} volume={0.1} /> */}

      {/* 타이틀 */}
      <Sequence from={currentTime} durationInFrames={titleDuration}>
        <TitleSlide title={topicTitle} style={style} color={moduleColor} />
      </Sequence>

      {/* 각 섹션 */}
      {sections.map((section, index) => {
        currentTime += index === 0 ? titleDuration : sectionDuration;
        
        return (
          <Sequence
            key={index}
            from={currentTime}
            durationInFrames={sectionDuration}
          >
            <ContentSlide section={section} style={style} />
          </Sequence>
        );
      })}

      {/* 아웃트로 */}
      <Sequence
        from={currentTime + sectionDuration}
        durationInFrames={outroDuration}
      >
        <OutroSlide topicTitle={topicTitle} />
      </Sequence>
    </>
  );
};