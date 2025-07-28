// TTS 설정 및 구현 가이드

export interface TTSConfig {
  provider: 'google' | 'naver' | 'azure' | 'aws';
  apiKey?: string;
  region?: string;
  voiceSettings: {
    male: string;
    female: string;
  };
}

// Google Cloud TTS 예시
export const googleTTSConfig: TTSConfig = {
  provider: 'google',
  voiceSettings: {
    male: 'ko-KR-Wavenet-C',    // 남성 음성
    female: 'ko-KR-Wavenet-A',  // 여성 음성
  }
};

// Naver Clova Voice 예시
export const naverTTSConfig: TTSConfig = {
  provider: 'naver',
  voiceSettings: {
    male: 'nsinu',     // 신유 (남성)
    female: 'nara',    // 나라 (여성)
  }
};

// TTS 생성 함수 예시
export async function generateTTS(text: string, voice: 'male' | 'female'): Promise<string> {
  // 실제 구현 예시:
  /*
  const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: { text },
      voice: {
        languageCode: 'ko-KR',
        name: googleTTSConfig.voiceSettings[voice],
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 1.0,
        pitch: 0,
      },
    }),
  });

  const data = await response.json();
  const audioContent = data.audioContent;
  
  // Base64 디코딩 후 파일 저장
  const audioBuffer = Buffer.from(audioContent, 'base64');
  const filename = `narration-${Date.now()}.mp3`;
  await fs.writeFile(`public/sounds/${filename}`, audioBuffer);
  
  return `/sounds/${filename}`;
  */

  // 데모용 반환
  return '/sounds/silence.mp3';
}