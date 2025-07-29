import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

export const TestAudio: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginTop: '200px', fontSize: '48px' }}>
        오디오 테스트
      </h1>
      <Audio src={staticFile('sounds/narrations/chapter1-title.mp3')} volume={1} />
    </AbsoluteFill>
  );
};