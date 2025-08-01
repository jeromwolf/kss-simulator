import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import React from 'react';

interface ModuleSection {
  title: string;
  content: string;
  keyPoints?: string[];
  codeExample?: string;
  visualType?: 'chart' | 'diagram' | 'code' | 'simulator';
}

interface KSSModuleExplainerProps {
  moduleName: string;
  moduleColor: string;
  sections: ModuleSection[];
  thumbnailTitle: string;
  narrator?: {
    enabled: boolean;
    voice: 'male' | 'female';
    language: 'ko' | 'en';
  };
}

export const KSSModuleExplainer: React.FC<KSSModuleExplainerProps> = ({
  moduleName,
  moduleColor,
  sections,
  thumbnailTitle,
  narrator = { enabled: true, voice: 'female', language: 'ko' }
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 각 섹션당 지속 시간 (초)
  const INTRO_DURATION = 3;
  const SECTION_DURATION = 8;
  const OUTRO_DURATION = 3;

  const introDurationFrames = INTRO_DURATION * fps;
  const sectionDurationFrames = SECTION_DURATION * fps;
  const outroDurationFrames = OUTRO_DURATION * fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* 인트로 */}
      <Sequence from={0} durationInFrames={introDurationFrames}>
        <IntroSection 
          moduleName={moduleName} 
          moduleColor={moduleColor}
          thumbnailTitle={thumbnailTitle}
        />
      </Sequence>

      {/* 메인 콘텐츠 섹션들 */}
      {sections.map((section, index) => (
        <Sequence
          key={index}
          from={introDurationFrames + (index * sectionDurationFrames)}
          durationInFrames={sectionDurationFrames}
        >
          <ContentSection 
            section={section} 
            moduleColor={moduleColor}
            sectionNumber={index + 1}
          />
        </Sequence>
      ))}

      {/* 아웃트로 */}
      <Sequence 
        from={introDurationFrames + (sections.length * sectionDurationFrames)} 
        durationInFrames={outroDurationFrames}
      >
        <OutroSection moduleName={moduleName} moduleColor={moduleColor} />
      </Sequence>
    </AbsoluteFill>
  );
};

// 인트로 섹션
const IntroSection: React.FC<{
  moduleName: string;
  moduleColor: string;
  thumbnailTitle: string;
}> = ({ moduleName, moduleColor, thumbnailTitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    durationInFrames: 30,
  });

  const opacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <AbsoluteFill 
      style={{
        background: `linear-gradient(135deg, ${moduleColor}22 0%, ${moduleColor}44 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: 'center',
        }}
      >
        <h1 
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: moduleColor,
            marginBottom: 20,
            textShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          KSS
        </h1>
        <h2 
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 40,
          }}
        >
          {moduleName}
        </h2>
        <p 
          style={{
            fontSize: 36,
            color: '#e0e0e0',
            maxWidth: 800,
          }}
        >
          {thumbnailTitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// 콘텐츠 섹션
const ContentSection: React.FC<{
  section: ModuleSection;
  moduleColor: string;
  sectionNumber: number;
}> = ({ section, moduleColor, sectionNumber }) => {
  const frame = useCurrentFrame();
  
  const slideIn = spring({
    frame,
    fps: 30,
    from: 100,
    to: 0,
    durationInFrames: 20,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f0f0f',
        padding: 60,
      }}
    >
      {/* 섹션 헤더 */}
      <div
        style={{
          transform: `translateX(${slideIn}px)`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: moduleColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            {sectionNumber}
          </div>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {section.title}
          </h2>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: section.codeExample ? '1fr 1fr' : '1fr',
          gap: 40,
          height: 'calc(100% - 140px)',
        }}
      >
        {/* 텍스트 콘텐츠 */}
        <div>
          <p
            style={{
              fontSize: 32,
              lineHeight: 1.6,
              color: '#e0e0e0',
              marginBottom: 30,
            }}
          >
            {section.content}
          </p>

          {/* 주요 포인트 */}
          {section.keyPoints && (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
              }}
            >
              {section.keyPoints.map((point, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: 28,
                    color: '#b0b0b0',
                    marginBottom: 15,
                    paddingLeft: 30,
                    position: 'relative',
                    opacity: interpolate(
                      frame,
                      [30 + idx * 10, 40 + idx * 10],
                      [0, 1]
                    ),
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: moduleColor,
                    }}
                  >
                    •
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 코드 예제 */}
        {section.codeExample && (
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: 16,
              padding: 30,
              border: `2px solid ${moduleColor}44`,
              fontSize: 24,
              fontFamily: 'monospace',
              color: '#e0e0e0',
              overflow: 'hidden',
            }}
          >
            <pre style={{ margin: 0 }}>{section.codeExample}</pre>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 아웃트로 섹션
const OutroSection: React.FC<{
  moduleName: string;
  moduleColor: string;
}> = ({ moduleName, moduleColor }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${moduleColor}22 0%, ${moduleColor}44 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeIn,
      }}
    >
      <h2
        style={{
          fontSize: 60,
          fontWeight: 700,
          color: '#fff',
          marginBottom: 30,
        }}
      >
        수고하셨습니다!
      </h2>
      <p
        style={{
          fontSize: 36,
          color: '#e0e0e0',
          marginBottom: 60,
        }}
      >
        {moduleName} 학습을 완료했습니다
      </p>
      <div
        style={{
          display: 'flex',
          gap: 40,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '20px 40px',
            borderRadius: 50,
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          구독 & 좋아요
        </div>
        <div
          style={{
            color: '#fff',
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          KSS Platform
        </div>
      </div>
    </AbsoluteFill>
  );
};