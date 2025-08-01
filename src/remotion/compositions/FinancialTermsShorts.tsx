import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import React from 'react';

interface FinancialTermsShortsProps {
  term: string;
  funnyExplanation: string;
  seriousExplanation: string;
  example: {
    situation: string;
    result: string;
  };
  emoji: string;
  duration?: number; // seconds
}

export const FinancialTermsShorts: React.FC<FinancialTermsShortsProps> = ({
  term,
  funnyExplanation,
  seriousExplanation,
  example,
  emoji,
  duration = 90
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  // 타이밍 계산 - 전체 duration에 맞춰서 조정
  const totalFrames = duration * fps;
  const titleDuration = Math.floor(totalFrames * 0.15); // 15%
  const funnyDuration = Math.floor(totalFrames * 0.25); // 25%
  const seriousDuration = Math.floor(totalFrames * 0.25); // 25%
  const exampleDuration = Math.floor(totalFrames * 0.25); // 25%
  const outroDuration = totalFrames - titleDuration - funnyDuration - seriousDuration - exampleDuration; // 나머지

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f' }}>
      {/* 타이틀 화면 (3초) */}
      <Sequence from={0} durationInFrames={titleDuration}>
        <TitleScreen term={term} emoji={emoji} />
      </Sequence>

      {/* 재미있는 설명 (5초) */}
      <Sequence from={titleDuration} durationInFrames={funnyDuration}>
        <FunnyExplanationScreen explanation={funnyExplanation} emoji={emoji} />
      </Sequence>

      {/* 진짜 의미 (5초) */}
      <Sequence from={titleDuration + funnyDuration} durationInFrames={seriousDuration}>
        <SeriousExplanationScreen explanation={seriousExplanation} />
      </Sequence>

      {/* 실전 예시 (10초) */}
      <Sequence 
        from={titleDuration + funnyDuration + seriousDuration} 
        durationInFrames={exampleDuration}
      >
        <ExampleScreen example={example} />
      </Sequence>

      {/* 아웃트로 */}
      <Sequence 
        from={titleDuration + funnyDuration + seriousDuration + exampleDuration} 
        durationInFrames={outroDuration}
      >
        <OutroScreen term={term} />
      </Sequence>
    </AbsoluteFill>
  );
};

// 타이틀 화면
const TitleScreen: React.FC<{ term: string; emoji: string }> = ({ term, emoji }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    durationInFrames: 20,
  });

  const rotation = spring({
    frame,
    fps,
    from: -20,
    to: 0,
    durationInFrames: 25,
  });

  const opacity = interpolate(frame, [0, 15], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          opacity,
        }}
      >
        <div
          style={{
            fontSize: 120,
            marginBottom: 20,
          }}
        >
          {emoji}
        </div>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#fff',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            letterSpacing: -2,
          }}
        >
          {term}
        </h1>
        <p
          style={{
            fontSize: 32,
            color: '#fff',
            marginTop: 10,
            opacity: 0.9,
          }}
        >
          이게 뭐야? 🤔
        </p>
      </div>
    </AbsoluteFill>
  );
};

// 재미있는 설명 화면
const FunnyExplanationScreen: React.FC<{ explanation: string; emoji: string }> = ({ explanation, emoji }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const slideIn = spring({
    frame,
    fps,
    from: 100,
    to: 0,
    durationInFrames: 15,
  });

  const bounce = interpolate(
    frame % 30,
    [0, 15, 30],
    [0, -10, 0]
  );

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <div
        style={{
          transform: `translateX(${slideIn}px)`,
          textAlign: 'center',
          maxWidth: 1000,
        }}
      >
        <div
          style={{
            fontSize: 100,
            marginBottom: 30,
            transform: `translateY(${bounce}px)`,
          }}
        >
          {emoji}
        </div>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: '#fff',
            marginBottom: 20,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          쉽게 말하면...
        </h2>
        <p
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: '#fff',
            lineHeight: 1.4,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          {explanation}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// 진지한 설명 화면
const SeriousExplanationScreen: React.FC<{ explanation: string }> = ({ explanation }) => {
  const frame = useCurrentFrame();
  const words = explanation.split(' ');
  
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div style={{ maxWidth: 1000 }}>
        <h3
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: '#ffd700',
            marginBottom: 30,
            textAlign: 'center',
          }}
        >
          💡 진짜 의미는?
        </h3>
        <p
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: '#fff',
            lineHeight: 1.6,
            textAlign: 'center',
          }}
        >
          {words.map((word, i) => {
            const wordStart = i * 2;
            const wordOpacity = interpolate(
              frame,
              [wordStart, wordStart + 8],
              [0, 1],
              { extrapolateRight: 'clamp' }
            );
            
            return (
              <span
                key={i}
                style={{
                  opacity: wordOpacity,
                  marginRight: 8,
                }}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// 예시 화면
const ExampleScreen: React.FC<{ example: { situation: string; result: string } }> = ({ example }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const showResult = frame > 3 * fps;
  const resultScale = spring({
    frame: frame - 3 * fps,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 15,
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
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
          color: '#4ade80',
          marginBottom: 40,
        }}
      >
        🎬 실전 예시
      </h3>
      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
          maxWidth: 1000,
          width: '100%',
        }}
      >
        {/* 상황 */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: 40,
            borderRadius: 20,
            borderLeft: '4px solid #3b82f6',
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: '#94a3b8',
              marginBottom: 10,
            }}
          >
            📍 상황
          </div>
          <p
            style={{
              fontSize: 32,
              color: '#fff',
              lineHeight: 1.4,
            }}
          >
            {example.situation}
          </p>
        </div>

        {/* 결과 */}
        <div
          style={{
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            padding: 40,
            borderRadius: 20,
            borderLeft: '4px solid #4ade80',
            transform: `scale(${showResult ? resultScale : 0})`,
            opacity: showResult ? 1 : 0,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: '#94a3b8',
              marginBottom: 10,
            }}
          >
            💰 결과
          </div>
          <p
            style={{
              fontSize: 32,
              color: '#4ade80',
              lineHeight: 1.4,
              fontWeight: 600,
            }}
          >
            {example.result}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 아웃트로 화면
const OutroScreen: React.FC<{ term: string }> = ({ term }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1]);
  
  const bounce = spring({
    frame: frame % 30,
    fps: 30,
    from: 0,
    to: 1,
    durationInFrames: 30,
  });
  
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeIn,
      }}
    >
      <div
        style={{
          fontSize: 100,
          marginBottom: 20,
          transform: `scale(${0.8 + bounce * 0.2})`,
        }}
      >
        🎓
      </div>
      <h2
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: '#fff',
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        {term} 마스터 완료!
      </h2>
      <p
        style={{
          fontSize: 36,
          color: '#fff',
          marginBottom: 40,
          opacity: 0.9,
        }}
      >
        이제 친구들한테 자랑하자!
      </p>
      <div
        style={{
          backgroundColor: '#fff',
          color: '#764ba2',
          padding: '20px 40px',
          borderRadius: 50,
          fontSize: 32,
          fontWeight: 700,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        KSS에서 더 배워보기 →
      </div>
    </AbsoluteFill>
  );
};