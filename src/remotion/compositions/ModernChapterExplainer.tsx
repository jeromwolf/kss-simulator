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

interface ChapterSection {
  title: string;
  content: string;
  narration: string;
  code?: string;
  highlights?: string[];
  examples?: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: number;
  };
}

interface ModernChapterExplainerProps {
  chapterNumber: number;
  chapterTitle: string;
  sections: ChapterSection[];
  backgroundMusic?: string;
}

// 파티클 효과 컴포넌트
const ParticleBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 0.5 + 0.1,
  }));

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {particles.map((particle) => {
        const y = (particle.y - (frame * particle.speed)) % 110;
        const opacity = interpolate(
          y,
          [0, 50, 100],
          [0, 1, 0],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: '#60a5fa',
              borderRadius: '50%',
              opacity: opacity * 0.6,
              filter: 'blur(1px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// 모던한 타이틀 슬라이드
const ModernTitleSlide: React.FC<{
  number: number;
  title: string;
  narration: string;
}> = ({ number, title, narration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 다양한 애니메이션 효과
  const slideIn = spring({
    frame,
    fps,
    from: -100,
    to: 0,
    durationInFrames: 30,
  });

  const scaleIn = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
  });

  const rotateIn = interpolate(
    frame,
    [0, 30],
    [180, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateRight: 'clamp',
    }
  );

  const glowIntensity = interpolate(
    frame,
    [20, 40, 60],
    [0, 1, 0.7],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      }}
    >
      <ParticleBackground />
      
      {/* 배경 그래디언트 오버레이 */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(96, 165, 250, ${glowIntensity * 0.2}) 0%, transparent 70%)`,
        }}
      />

      {/* 챕터 번호 - 큰 배경 숫자 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scaleIn})`,
          fontSize: '400px',
          fontWeight: 'bold',
          color: 'rgba(96, 165, 250, 0.1)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {String(number).padStart(2, '0')}
      </div>

      {/* 메인 콘텐츠 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(${slideIn}%, -50%)`,
          textAlign: 'center',
          width: '80%',
          maxWidth: '1200px',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '10px 30px',
            background: 'rgba(96, 165, 250, 0.2)',
            borderRadius: '50px',
            marginBottom: '30px',
            transform: `rotate(${rotateIn}deg)`,
          }}
        >
          <h3
            style={{
              fontSize: '24px',
              color: '#60a5fa',
              margin: 0,
              fontWeight: '600',
            }}
          >
            CHAPTER {number}
          </h3>
        </div>

        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '40px',
            lineHeight: 1.2,
            textShadow: `0 0 ${glowIntensity * 40}px rgba(96, 165, 250, 0.8)`,
          }}
        >
          {title}
        </h1>

        {/* 애니메이션 바 */}
        <div
          style={{
            width: '200px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.2)',
            margin: '0 auto',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${interpolate(frame, [30, 60], [0, 100], {
                extrapolateRight: 'clamp',
              })}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)',
              boxShadow: '0 0 10px rgba(96, 165, 250, 0.8)',
            }}
          />
        </div>
      </div>

      {/* 효과음 */}
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('sounds/whoosh.mp3')} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};

// 모던한 콘텐츠 슬라이드
const ModernContentSlide: React.FC<{
  section: ChapterSection;
  index: number;
}> = ({ section, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 카드 슬라이드 인 효과
  const cardY = spring({
    frame,
    fps,
    from: 50,
    to: 0,
    durationInFrames: 20,
  });

  const cardOpacity = interpolate(
    frame,
    [0, 20],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // 하이라이트 애니메이션
  const highlightScale = spring({
    frame: frame - 30,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 15,
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '60px',
      }}
    >
      <ParticleBackground />

      {/* 메인 카드 */}
      <div
        style={{
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
          background: 'rgba(30, 41, 59, 0.8)',
          borderRadius: '24px',
          padding: '60px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 섹션 번호 */}
        <div
          style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            transform: `scale(${highlightScale})`,
          }}
        >
          {index + 1}
        </div>

        {/* 제목 */}
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '40px',
          }}
        >
          {section.title}
        </h2>

        {/* 콘텐츠 */}
        <div
          style={{
            fontSize: '28px',
            color: '#e2e8f0',
            lineHeight: 1.8,
            flex: 1,
          }}
        >
          {section.content.split('\n').map((line, i) => (
            <p
              key={i}
              style={{
                marginBottom: '20px',
                opacity: interpolate(
                  frame,
                  [20 + i * 10, 30 + i * 10],
                  [0, 1],
                  { extrapolateRight: 'clamp' }
                ),
                transform: `translateX(${interpolate(
                  frame,
                  [20 + i * 10, 30 + i * 10],
                  [20, 0],
                  { extrapolateRight: 'clamp' }
                )}px)`,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* 하이라이트 포인트 */}
        {section.highlights && (
          <div
            style={{
              marginTop: '40px',
              padding: '30px',
              background: 'rgba(96, 165, 250, 0.1)',
              borderRadius: '16px',
              border: '1px solid rgba(96, 165, 250, 0.3)',
            }}
          >
            <h3
              style={{
                fontSize: '24px',
                color: '#60a5fa',
                marginBottom: '20px',
                fontWeight: '600',
              }}
            >
              💡 핵심 포인트
            </h3>
            {section.highlights.map((highlight, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  opacity: interpolate(
                    frame,
                    [40 + i * 10, 50 + i * 10],
                    [0, 1],
                    { extrapolateRight: 'clamp' }
                  ),
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    background: '#60a5fa',
                    borderRadius: '50%',
                    marginRight: '15px',
                  }}
                />
                <span style={{ color: '#e2e8f0', fontSize: '20px' }}>
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 예제 섹션 */}
        {section.examples && section.examples.length > 0 && (
          <div
            style={{
              marginTop: '40px',
              padding: '30px',
              background: 'rgba(167, 139, 250, 0.1)',
              borderRadius: '16px',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              opacity: interpolate(
                frame,
                [60, 80],
                [0, 1],
                { extrapolateRight: 'clamp' }
              ),
            }}
          >
            <h3
              style={{
                fontSize: '24px',
                color: '#a78bfa',
                marginBottom: '20px',
                fontWeight: '600',
              }}
            >
              📚 예제
            </h3>
            {section.examples.map((example, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '15px',
                  padding: '15px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '8px',
                  fontSize: '18px',
                  color: '#e2e8f0',
                  fontFamily: 'monospace',
                }}
              >
                {example}
              </div>
            ))}
          </div>
        )}

        {/* 퀴즈 섹션 */}
        {section.quiz && (
          <div
            style={{
              marginTop: '40px',
              padding: '30px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '16px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              opacity: interpolate(
                frame,
                [80, 100],
                [0, 1],
                { extrapolateRight: 'clamp' }
              ),
            }}
          >
            <h3
              style={{
                fontSize: '24px',
                color: '#10b981',
                marginBottom: '20px',
                fontWeight: '600',
              }}
            >
              🤔 퀴즈
            </h3>
            <p
              style={{
                fontSize: '22px',
                color: '#e2e8f0',
                marginBottom: '20px',
              }}
            >
              {section.quiz.question}
            </p>
            {section.quiz.options.map((option, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                  padding: '10px 15px',
                  background: i === section.quiz!.answer ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  border: i === section.quiz!.answer ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <span
                  style={{
                    marginRight: '10px',
                    fontWeight: 'bold',
                    color: i === section.quiz!.answer ? '#10b981' : '#94a3b8',
                  }}
                >
                  {String.fromCharCode(65 + i)}.
                </span>
                <span style={{ color: '#e2e8f0', fontSize: '18px' }}>
                  {option}
                </span>
                {i === section.quiz!.answer && frame > 120 && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      color: '#10b981',
                      fontSize: '20px',
                    }}
                  >
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 코드 블록 */}
        {section.code && (
          <div
            style={{
              marginTop: '40px',
              background: '#0f172a',
              borderRadius: '12px',
              padding: '30px',
              border: '1px solid rgba(96, 165, 250, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              opacity: interpolate(
                frame,
                [50, 70],
                [0, 1],
                { extrapolateRight: 'clamp' }
              ),
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                fontSize: '14px',
                color: '#60a5fa',
                background: 'rgba(96, 165, 250, 0.1)',
                padding: '5px 15px',
                borderRadius: '20px',
              }}
            >
              CODE
            </div>
            <pre
              style={{
                fontSize: '20px',
                color: '#60a5fa',
                fontFamily: 'monospace',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {section.code}
            </pre>
          </div>
        )}
      </div>

      {/* 페이지 전환 효과음 */}
      <Sequence from={0} durationInFrames={10}>
        <Audio src={staticFile('sounds/page-turn.mp3')} volume={0.3} />
      </Sequence>
    </AbsoluteFill>
  );
};

// 모던한 요약 슬라이드
const ModernSummarySlide: React.FC<{
  chapterTitle: string;
  totalSections: number;
}> = ({ chapterTitle, totalSections }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleIn = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    durationInFrames: 30,
  });

  const checkmarkDelay = 20;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      }}
    >
      <ParticleBackground />
      
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scaleIn})`,
          textAlign: 'center',
          width: '80%',
          maxWidth: '1000px',
        }}
      >
        {/* 완료 아이콘 */}
        <div
          style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            borderRadius: '50%',
            margin: '0 auto 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 60px rgba(16, 185, 129, 0.6)',
          }}
        >
          <div
            style={{
              fontSize: '60px',
              color: 'white',
              transform: `scale(${interpolate(
                frame,
                [checkmarkDelay, checkmarkDelay + 10],
                [0, 1],
                { extrapolateRight: 'clamp' }
              )})`,
            }}
          >
            ✓
          </div>
        </div>

        <h2
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '30px',
          }}
        >
          학습 완료!
        </h2>

        <p
          style={{
            fontSize: '28px',
            color: '#94a3b8',
            marginBottom: '50px',
            lineHeight: 1.6,
          }}
        >
          {chapterTitle}의 {totalSections}개 섹션을 모두 학습했습니다
        </p>

        {/* CTA 버튼 스타일 */}
        <div
          style={{
            display: 'inline-block',
            padding: '20px 60px',
            background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
            borderRadius: '50px',
            fontSize: '24px',
            fontWeight: '600',
            color: 'white',
            boxShadow: '0 10px 30px rgba(96, 165, 250, 0.4)',
            opacity: interpolate(
              frame,
              [40, 60],
              [0, 1],
              { extrapolateRight: 'clamp' }
            ),
          }}
        >
          KSS 플랫폼에서 실습하기 →
        </div>

        {/* 소셜 링크 */}
        <div
          style={{
            marginTop: '60px',
            opacity: interpolate(
              frame,
              [60, 80],
              [0, 1],
              { extrapolateRight: 'clamp' }
            ),
          }}
        >
          <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '10px' }}>
            더 많은 콘텐츠를 원하신다면
          </p>
          <p style={{ color: '#60a5fa', fontSize: '20px', fontWeight: '600' }}>
            구독 & 좋아요 👍
          </p>
        </div>
      </div>

      {/* 성공 효과음 */}
      <Sequence from={checkmarkDelay} durationInFrames={20}>
        <Audio src={staticFile('sounds/success.mp3')} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const ModernChapterExplainer: React.FC<ModernChapterExplainerProps> = ({
  chapterNumber,
  chapterTitle,
  sections,
  backgroundMusic = 'sounds/background-music.mp3',
}) => {
  const TITLE_DURATION = 90;
  const SECTION_DURATION = 240; // 섹션당 8초로 증가 (더 많은 콘텐츠)
  const SUMMARY_DURATION = 120;

  let currentFrame = 0;

  // 전체 지속시간 계산
  const totalDuration = TITLE_DURATION + (sections.length * SECTION_DURATION) + SUMMARY_DURATION;

  return (
    <AbsoluteFill>
      {/* 배경음악 */}
      <Audio
        src={staticFile(backgroundMusic)}
        volume={0.05}
        startFrom={0}
        endAt={totalDuration}
      />

      {/* 타이틀 슬라이드 */}
      <Sequence from={currentFrame} durationInFrames={TITLE_DURATION}>
        <ModernTitleSlide
          number={chapterNumber}
          title={chapterTitle}
          narration={`안녕하세요! 오늘은 ${chapterTitle}에 대해 알아보겠습니다.`}
        />
      </Sequence>

      {/* 콘텐츠 슬라이드 */}
      {sections.map((section, index) => {
        currentFrame += index === 0 ? TITLE_DURATION : SECTION_DURATION;
        return (
          <Sequence
            key={index}
            from={currentFrame}
            durationInFrames={SECTION_DURATION}
          >
            <ModernContentSlide section={section} index={index} />
          </Sequence>
        );
      })}

      {/* 요약 슬라이드 */}
      <Sequence
        from={currentFrame + SECTION_DURATION}
        durationInFrames={SUMMARY_DURATION}
      >
        <ModernSummarySlide
          chapterTitle={chapterTitle}
          totalSections={sections.length}
        />
      </Sequence>
    </AbsoluteFill>
  );
};