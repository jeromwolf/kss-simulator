// TTS Service for high-quality voice synthesis
// 고품질 음성 합성을 위한 TTS 서비스

interface TTSOptions {
  text: string;
  voice?: string;
  language?: 'ko' | 'en';
  speed?: number;
  pitch?: number;
}

export class TTSService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // 환경 변수에서 API 키 로드
    this.apiKey = process.env.NEXT_PUBLIC_TTS_API_KEY || '';
    this.baseUrl = process.env.NEXT_PUBLIC_TTS_API_URL || '';
  }

  // ElevenLabs API 사용 예시
  async generateElevenLabs(options: TTSOptions): Promise<ArrayBuffer> {
    const voiceId = options.language === 'ko' 
      ? 'MF3mGyEYCl7XYWbV9V6O' // 한국어 음성 ID
      : '21m00Tcm4TlvDq8ikWAM'; // 영어 음성 ID

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': this.apiKey
      },
      body: JSON.stringify({
        text: options.text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.5,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      throw new Error('TTS generation failed');
    }

    return response.arrayBuffer();
  }

  // Google Cloud TTS API 사용 예시
  async generateGoogleTTS(options: TTSOptions): Promise<ArrayBuffer> {
    const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        input: { text: options.text },
        voice: {
          languageCode: options.language === 'ko' ? 'ko-KR' : 'en-US',
          name: options.language === 'ko' ? 'ko-KR-Neural2-A' : 'en-US-Neural2-F',
          ssmlGender: options.voice === 'male' ? 'MALE' : 'FEMALE'
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: options.speed || 1.0,
          pitch: options.pitch || 0.0
        }
      })
    });

    const data = await response.json();
    const audioContent = data.audioContent;
    
    // Base64 디코딩
    const binaryString = atob(audioContent);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes.buffer;
  }

  // OpenAI TTS API 사용 예시
  async generateOpenAITTS(options: TTSOptions): Promise<ArrayBuffer> {
    const voice = options.voice === 'male' ? 'onyx' : 'nova';
    
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'tts-1-hd',
        input: options.text,
        voice: voice,
        speed: options.speed || 1.0
      })
    });

    if (!response.ok) {
      throw new Error('TTS generation failed');
    }

    return response.arrayBuffer();
  }

  // 네이버 클로바 API (한국어 전용)
  async generateClovaTTS(options: TTSOptions): Promise<ArrayBuffer> {
    const speaker = options.voice === 'male' ? 'nminsang' : 'nara';
    
    const response = await fetch('https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts', {
      method: 'POST',
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || '',
        'X-NCP-APIGW-API-KEY': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || '',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        speaker: speaker,
        volume: '0',
        speed: String(options.speed || 0),
        pitch: String(options.pitch || 0),
        format: 'mp3',
        text: options.text
      })
    });

    if (!response.ok) {
      throw new Error('TTS generation failed');
    }

    return response.arrayBuffer();
  }

  // 음성 재생 함수
  async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    const audioContext = new AudioContext();
    const audioBufferDecoded = await audioContext.decodeAudioData(audioBuffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBufferDecoded;
    source.connect(audioContext.destination);
    source.start();
    
    return new Promise((resolve) => {
      source.onended = () => resolve();
    });
  }

  // 음성 다운로드 함수
  downloadAudio(audioBuffer: ArrayBuffer, filename: string): void {
    const blob = new Blob([audioBuffer], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// 싱글톤 인스턴스
export const ttsService = new TTSService();