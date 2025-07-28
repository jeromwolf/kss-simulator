import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

interface TripleData {
  subject: string;
  predicate: string;
  object: string;
}

interface OntologyExplainerProps {
  title: string;
  triples: TripleData[];
  backgroundColor?: string;
  primaryColor?: string;
}

const AnimatedTriple: React.FC<{
  triple: TripleData;
  delay: number;
}> = ({ triple, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame - delay,
    [0, 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 15,
    },
  });

  const subjectX = interpolate(frame - delay, [0, 30], [-200, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const objectX = interpolate(frame - delay - 10, [0, 30], [200, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Subject */}
      <div
        style={{
          position: 'absolute',
          left: '20%',
          transform: `translateX(${subjectX}px)`,
          background: '#3b82f6',
          color: 'white',
          padding: '20px 30px',
          borderRadius: '50px',
          fontSize: '28px',
          fontWeight: 'bold',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.5)',
        }}
      >
        {triple.subject}
      </div>

      {/* Predicate Arrow */}
      <div
        style={{
          position: 'absolute',
          left: '35%',
          right: '35%',
          height: '4px',
          background: '#6b7280',
          opacity: opacity * 0.8,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#10b981',
            fontSize: '24px',
            fontWeight: '600',
          }}
        >
          {triple.predicate}
        </div>
        <div
          style={{
            position: 'absolute',
            right: '-10px',
            top: '-8px',
            width: '0',
            height: '0',
            borderLeft: '20px solid #6b7280',
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
          }}
        />
      </div>

      {/* Object */}
      <div
        style={{
          position: 'absolute',
          right: '20%',
          transform: `translateX(${objectX}px)`,
          background: triple.object.startsWith('"') ? '#f97316' : '#3b82f6',
          color: 'white',
          padding: '20px 30px',
          borderRadius: triple.object.startsWith('"') ? '10px' : '50px',
          fontSize: '28px',
          fontWeight: 'bold',
          boxShadow: `0 4px 20px ${
            triple.object.startsWith('"')
              ? 'rgba(249, 115, 22, 0.5)'
              : 'rgba(59, 130, 246, 0.5)'
          }`,
        }}
      >
        {triple.object}
      </div>
    </div>
  );
};

export const OntologyExplainer: React.FC<OntologyExplainerProps> = ({
  title,
  triples,
  backgroundColor = '#0f172a',
  primaryColor = '#3b82f6',
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleScale = spring({
    frame,
    fps: 30,
    from: 0.8,
    to: 1,
    config: { damping: 10 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {/* Title */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              opacity: titleOpacity,
              transform: `scale(${titleScale})`,
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {title}
          </h1>
        </AbsoluteFill>
      </Sequence>

      {/* Triples Animation */}
      {triples.map((triple, index) => (
        <Sequence
          key={index}
          from={90 + index * 60}
          durationInFrames={180}
        >
          <AbsoluteFill
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AnimatedTriple triple={triple} delay={0} />
          </AbsoluteFill>
        </Sequence>
      ))}

      {/* Summary */}
      <Sequence from={durationInFrames - 90} durationInFrames={90}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          <div
            style={{
              fontSize: '50px',
              fontWeight: 'bold',
              color: primaryColor,
              opacity: interpolate(frame - (durationInFrames - 90), [0, 30], [0, 1]),
            }}
          >
            RDF 트리플로 지식을 표현하세요!
          </div>
          <div
            style={{
              fontSize: '30px',
              color: 'white',
              opacity: interpolate(frame - (durationInFrames - 60), [0, 30], [0, 1]),
            }}
          >
            KSS - Knowledge Space Simulator
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};