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
} from 'remotion';

interface ChapterSection {
  title: string;
  content: string;
  narration: string;
  code?: string;
}

interface ChapterExplainerWithAudioProps {
  chapterNumber: number;
  chapterTitle: string;
  sections: ChapterSection[];
  backgroundMusic?: string;
}

// TTS 오디오 재생 컴포넌트
const NarrationAudio: React.FC<{ 
  audioId: string; 
  volume?: number;
}> = ({ audioId, volume = 1.0 }) => {
  // 사전 생성된 TTS 오디오 파일 사용
  const audioPath = `sounds/narrations/${audioId}.mp3`;
  
  console.log('Loading audio:', audioPath, 'with volume:', volume);
  
  return <Audio src={staticFile(audioPath)} volume={volume} />;
};

const Narration: React.FC<{ text: string; startFrame: number }> = ({ text, startFrame }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame - startFrame,
    [0, 10],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '800px',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '10px',
        opacity,
      }}
    >
      <p
        style={{
          color: 'white',
          fontSize: '24px',
          textAlign: 'center',
          lineHeight: '1.6',
        }}
      >
        🔊 {text}
      </p>
    </div>
  );
};

const TitleSlideWithAudio: React.FC<{ 
  number: number; 
  title: string;
  narration: string;
}> = ({ number, title, narration }) => {
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
      
      <Narration text={narration} startFrame={30} />
      
      {/* TTS 오디오 */}
      <Sequence from={30}>
        <NarrationAudio audioId={`chapter${number}-title`} />
      </Sequence>
    </AbsoluteFill>
  );
};

const ContentSlideWithAudio: React.FC<{ 
  section: ChapterSection; 
  index: number;
  chapterNumber: number;
}> = ({ section, index, chapterNumber }) => {
  const frame = useCurrentFrame();
  
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
      
      <Narration text={section.narration} startFrame={20} />
      
      {/* TTS 오디오 */}
      <Sequence from={20}>
        <NarrationAudio audioId={`chapter${chapterNumber}-section${index + 1}`} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const ChapterExplainerWithAudio: React.FC<ChapterExplainerWithAudioProps> = ({
  chapterNumber,
  chapterTitle,
  sections,
  backgroundMusic = 'sounds/background-music.mp3'
}) => {
  const TITLE_DURATION = 90;
  const SECTION_DURATION = 150;
  const SUMMARY_DURATION = 120;
  
  let currentFrame = 0;
  
  const titleNarration = `안녕하세요. KSS 온톨로지 강의 ${chapterNumber}장, ${chapterTitle}편입니다.`;
  const summaryNarration = "오늘 배운 내용을 KSS 플랫폼에서 직접 실습해보세요. 다음 강의에서 만나요!";
  
  // 전체 지속시간 계산
  const totalDuration = TITLE_DURATION + (sections.length * SECTION_DURATION) + SUMMARY_DURATION;
  
  return (
    <AbsoluteFill>
      {/* 배경음악 - 옵션 */}
      {backgroundMusic && backgroundMusic !== 'sounds/background-music.mp3' && (
        <Audio 
          src={staticFile(backgroundMusic)} 
          volume={0.1}
          startFrom={0}
          endAt={totalDuration}
        />
      )}
      
      {/* Title Slide */}
      <Sequence from={currentFrame} durationInFrames={TITLE_DURATION}>
        <TitleSlideWithAudio 
          number={chapterNumber} 
          title={chapterTitle}
          narration={titleNarration}
        />
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
            <ContentSlideWithAudio section={section} index={index} chapterNumber={chapterNumber} />
          </Sequence>
        );
      })}
      
      {/* Summary Slide */}
      <Sequence
        from={currentFrame + SECTION_DURATION}
        durationInFrames={SUMMARY_DURATION}
      >
        <AbsoluteFill
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '40px',
              }}
            >
              학습을 마치며
            </h2>
            <div
              style={{
                fontSize: '36px',
                color: 'white',
                maxWidth: '1000px',
                lineHeight: '1.8',
              }}
            >
              <p>✅ {chapterTitle}의 핵심 개념을 학습했습니다</p>
              <p style={{ marginTop: '20px' }}>
                🚀 KSS 플랫폼에서 직접 실습해보세요!
              </p>
            </div>
          </div>
          
          <Narration text={summaryNarration} startFrame={30} />
          
          {/* TTS 오디오 */}
          <Sequence from={30}>
            <NarrationAudio audioId={`chapter${chapterNumber}-summary`} />
          </Sequence>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};