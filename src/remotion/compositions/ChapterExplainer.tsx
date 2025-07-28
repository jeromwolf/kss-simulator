import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
} from 'remotion';

interface ChapterSection {
  title: string;
  content: string;
  code?: string;
  diagram?: string;
}

interface ChapterExplainerProps {
  chapterNumber: number;
  chapterTitle: string;
  sections: ChapterSection[];
  primaryColor?: string;
  backgroundColor?: string;
}

const TitleSlide: React.FC<{ number: number; title: string }> = ({ number, title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  const scale = spring({
    frame,
    fps: 30,
    from: 0.8,
    to: 1,
    config: { damping: 10 },
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '120px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          Chapter {number}
        </h1>
        <h2
          style={{
            fontSize: '60px',
            color: 'white',
            maxWidth: '1200px',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          {title}
        </h2>
      </div>
    </AbsoluteFill>
  );
};

const ContentSlide: React.FC<{ section: ChapterSection; index: number }> = ({ section, index }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const titleY = interpolate(frame, [0, 20], [-50, 0], {
    extrapolateRight: 'clamp',
  });
  
  const contentOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const codeOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1e293b',
        padding: '80px',
      }}
    >
      {/* Section Title */}
      <h2
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#60a5fa',
          marginBottom: '40px',
          transform: `translateY(${titleY}px)`,
        }}
      >
        {section.title}
      </h2>

      {/* Content */}
      <div
        style={{
          fontSize: '32px',
          color: 'white',
          lineHeight: '1.8',
          opacity: contentOpacity,
          marginBottom: '40px',
        }}
      >
        {section.content.split('\n').map((line, i) => (
          <p key={i} style={{ marginBottom: '16px' }}>
            {line}
          </p>
        ))}
      </div>

      {/* Code Example */}
      {section.code && (
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '12px',
            padding: '30px',
            opacity: codeOpacity,
            border: '2px solid #334155',
          }}
        >
          <pre
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              fontFamily: 'monospace',
              lineHeight: '1.6',
            }}
          >
            {section.code}
          </pre>
        </div>
      )}
    </AbsoluteFill>
  );
};

const SummarySlide: React.FC<{ points: string[] }> = ({ points }) => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px',
        justifyContent: 'center',
      }}
    >
      <h2
        style={{
          fontSize: '64px',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '60px',
          textAlign: 'center',
          opacity: interpolate(frame, [0, 20], [0, 1]),
        }}
      >
        핵심 정리
      </h2>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {points.map((point, i) => {
          const opacity = interpolate(
            frame,
            [20 + i * 15, 30 + i * 15],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          
          const x = interpolate(
            frame,
            [20 + i * 15, 30 + i * 15],
            [-100, 0],
            { extrapolateRight: 'clamp' }
          );
          
          return (
            <div
              key={i}
              style={{
                fontSize: '36px',
                color: 'white',
                marginBottom: '30px',
                opacity,
                transform: `translateX(${x}px)`,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  marginRight: '20px',
                  textAlign: 'center',
                  lineHeight: '40px',
                  fontSize: '24px',
                }}
              >
                {i + 1}
              </span>
              {point}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const ChapterExplainer: React.FC<ChapterExplainerProps> = ({
  chapterNumber,
  chapterTitle,
  sections,
}) => {
  const TITLE_DURATION = 90;
  const SECTION_DURATION = 150;
  const SUMMARY_DURATION = 120;
  
  let currentFrame = 0;
  
  return (
    <AbsoluteFill>
      {/* Title Slide */}
      <Sequence from={currentFrame} durationInFrames={TITLE_DURATION}>
        <TitleSlide number={chapterNumber} title={chapterTitle} />
      </Sequence>
      
      {/* Content Slides */}
      {sections.map((section, index) => {
        currentFrame += index === 0 ? TITLE_DURATION : SECTION_DURATION;
        return (
          <Sequence
            key={index}
            from={currentFrame}
            durationInFrames={SECTION_DURATION}
          >
            <ContentSlide section={section} index={index} />
          </Sequence>
        );
      })}
      
      {/* Summary Slide */}
      <Sequence
        from={currentFrame + SECTION_DURATION}
        durationInFrames={SUMMARY_DURATION}
      >
        <SummarySlide
          points={[
            '온톨로지는 지식을 체계적으로 표현합니다',
            'RDF 트리플은 주어-서술어-목적어 구조입니다',
            'SPARQL로 지식을 검색할 수 있습니다',
            'KSS에서 직접 실습해보세요!',
          ]}
        />
      </Sequence>
    </AbsoluteFill>
  );
};