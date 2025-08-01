import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import React from 'react';

interface OntologyShortsProps {
  title: string;
  concept: string;
  explanation: string;
  example?: {
    before: string;
    after: string;
  };
  duration?: number; // seconds
}

export const OntologyShorts: React.FC<OntologyShortsProps> = ({
  title,
  concept,
  explanation,
  example,
  duration = 60
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  // 타이밍 계산 - 전체 duration에 맞춰서 조정
  const totalFrames = duration * fps;
  const titleDuration = Math.floor(totalFrames * 0.15); // 15%
  const conceptDuration = Math.floor(totalFrames * 0.20); // 20%
  const explanationDuration = example 
    ? Math.floor(totalFrames * 0.35) // 35% (예시 있을 때)
    : Math.floor(totalFrames * 0.65); // 65% (예시 없을 때)
  const exampleDuration = example ? Math.floor(totalFrames * 0.25) : 0; // 25%
  const outroDuration = totalFrames - titleDuration - conceptDuration - explanationDuration - exampleDuration; // 나머지

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f' }}>
      {/* 타이틀 화면 (3초) */}
      <Sequence from={0} durationInFrames={titleDuration}>
        <TitleScreen title={title} />
      </Sequence>

      {/* 핵심 개념 (5초) */}
      <Sequence from={titleDuration} durationInFrames={conceptDuration}>
        <ConceptScreen concept={concept} />
      </Sequence>

      {/* 설명 (가변) */}
      <Sequence from={titleDuration + conceptDuration} durationInFrames={explanationDuration}>
        <ExplanationScreen explanation={explanation} />
      </Sequence>

      {/* 예시 (10초) */}
      {example && (
        <Sequence 
          from={titleDuration + conceptDuration + explanationDuration} 
          durationInFrames={exampleDuration}
        >
          <ExampleScreen example={example} />
        </Sequence>
      )}

      {/* 아웃트로 */}
      <Sequence 
        from={titleDuration + conceptDuration + explanationDuration + exampleDuration} 
        durationInFrames={outroDuration}
      >
        <OutroScreen />
      </Sequence>
    </AbsoluteFill>
  );
};

// 타이틀 화면
const TitleScreen: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    durationInFrames: 20,
  });

  const opacity = interpolate(frame, [0, 15], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a1a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#3b82f6',
            marginBottom: 20,
          }}
        >
          🧠
        </div>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: '#fff',
            maxWidth: 800,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// 핵심 개념 화면
const ConceptScreen: React.FC<{ concept: string }> = ({ concept }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const slideIn = spring({
    frame,
    fps,
    from: 50,
    to: 0,
    durationInFrames: 15,
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #3b82f622 0%, #3b82f644 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <div
        style={{
          transform: `translateY(${slideIn}px)`,
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#3b82f6',
            marginBottom: 10,
          }}
        >
          핵심 개념
        </h2>
        <p
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#fff',
            maxWidth: 900,
          }}
        >
          {concept}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// 설명 화면
const ExplanationScreen: React.FC<{ explanation: string }> = ({ explanation }) => {
  const frame = useCurrentFrame();
  const words = explanation.split(' ');
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f0f0f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <p
        style={{
          fontSize: 48,
          fontWeight: 500,
          color: '#e0e0e0',
          lineHeight: 1.6,
          textAlign: 'center',
          maxWidth: 1000,
        }}
      >
        {words.map((word, i) => {
          const wordStart = i * 3;
          const wordOpacity = interpolate(
            frame,
            [wordStart, wordStart + 10],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          
          return (
            <span
              key={i}
              style={{
                opacity: wordOpacity,
                marginRight: 12,
              }}
            >
              {word}
            </span>
          );
        })}
      </p>
    </AbsoluteFill>
  );
};

// 예시 화면
const ExampleScreen: React.FC<{ example: { before: string; after: string } }> = ({ example }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const showAfter = frame > 3 * fps;
  const arrowScale = spring({
    frame: frame - 3 * fps,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 15,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <h3
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: '#3b82f6',
          marginBottom: 40,
        }}
      >
        실제 예시
      </h3>
      
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 60,
        }}
      >
        {/* Before */}
        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: 40,
            borderRadius: 16,
            minWidth: 400,
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: '#888',
              marginBottom: 10,
            }}
          >
            ❌ 일반적인 표현
          </div>
          <code
            style={{
              fontSize: 32,
              color: '#ff6b6b',
              fontFamily: 'monospace',
            }}
          >
            {example.before}
          </code>
        </div>

        {/* Arrow */}
        <div
          style={{
            fontSize: 48,
            color: '#3b82f6',
            transform: `scale(${showAfter ? arrowScale : 0})`,
          }}
        >
          →
        </div>

        {/* After */}
        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: 40,
            borderRadius: 16,
            minWidth: 400,
            opacity: showAfter ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: '#888',
              marginBottom: 10,
            }}
          >
            ✅ RDF 트리플
          </div>
          <code
            style={{
              fontSize: 32,
              color: '#4ade80',
              fontFamily: 'monospace',
            }}
          >
            {example.after}
          </code>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 아웃트로 화면
const OutroScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1]);
  
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #3b82f622 0%, #3b82f644 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeIn,
      }}
    >
      <div
        style={{
          fontSize: 120,
          marginBottom: 20,
        }}
      >
        👍
      </div>
      <h2
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: '#fff',
          marginBottom: 20,
        }}
      >
        구독 & 좋아요
      </h2>
      <p
        style={{
          fontSize: 36,
          color: '#e0e0e0',
          marginBottom: 40,
        }}
      >
        더 많은 온톨로지 지식을 원한다면?
      </p>
      <div
        style={{
          backgroundColor: '#3b82f6',
          color: '#fff',
          padding: '20px 40px',
          borderRadius: 50,
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        KSS 플랫폼에서 만나요!
      </div>
    </AbsoluteFill>
  );
};