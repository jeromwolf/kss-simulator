// Google Cloud Text-to-Speech API 연동
export interface GoogleTTSConfig {
  apiKey?: string;
  voice: {
    languageCode: 'ko-KR';
    name: 'ko-KR-Wavenet-A' | 'ko-KR-Wavenet-B' | 'ko-KR-Wavenet-C' | 'ko-KR-Wavenet-D';
    ssmlGender: 'FEMALE' | 'MALE' | 'NEUTRAL';
  };
  audioConfig: {
    audioEncoding: 'MP3' | 'LINEAR16' | 'OGG_OPUS';
    speakingRate: number; // 0.25 ~ 4.0
    pitch: number; // -20.0 ~ 20.0
    volumeGainDb: number; // -96.0 ~ 16.0
  };
}

export class GoogleTTS {
  private static readonly DEFAULT_CONFIG: GoogleTTSConfig = {
    voice: {
      languageCode: 'ko-KR',
      name: 'ko-KR-Wavenet-A', // 자연스러운 여성 음성
      ssmlGender: 'FEMALE'
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 0.9,
      pitch: 0.0,
      volumeGainDb: 0.0
    }
  };

  // Google TTS API 호출 (서버사이드 엔드포인트 사용, 안전한 버전)
  static async synthesize(text: string, config: Partial<GoogleTTSConfig> = {}): Promise<string | null> {
    const finalConfig = { ...this.DEFAULT_CONFIG, ...config };
    
    try {
      // 🚨 안전장치: 텍스트 길이 제한
      if (!text || text.length > 500) {
        console.warn('텍스트가 너무 길거나 비어있습니다. 데모 모드로 전환합니다.');
        return this.generateDemoAudio(text);
      }

      console.log('서버사이드 TTS API 호출:', { 
        length: text.length, 
        preview: text.substring(0, 50) + '...' 
      });
      
      // 🚨 AbortController로 타임아웃 설정
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃
      
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice: finalConfig.voice,
          audioConfig: finalConfig.audioConfig
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        console.warn('서버사이드 TTS 실패:', errorData.error);
        return this.generateDemoAudio(text);
      }

      const data = await response.json();
      
      if (data.success && data.audioContent) {
        // Base64 오디오를 Data URL로 변환
        const audioUrl = `data:audio/mp3;base64,${data.audioContent}`;
        console.log('Google TTS 성공, 오디오 길이:', data.audioContent.length);
        return audioUrl;
      }

      return null;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('TTS API 타임아웃 (10초 초과)');
      } else {
        console.error('TTS API 호출 오류:', error);
      }
      return this.generateDemoAudio(text); // 실패 시 데모 음성
    }
  }

  // 데모용 고품질 브라우저 TTS (Google TTS 대체)
  private static async generateDemoAudio(text: string): Promise<string> {
    console.log('데모 모드: 개선된 브라우저 TTS 사용');
    
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        resolve('');
        return;
      }

      // 기존 음성 중지
      window.speechSynthesis.cancel();
      
      // 음성 로딩 대기
      const waitForVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0) {
          const utterance = new SpeechSynthesisUtterance(text);
          
          // 최고 품질 음성 찾기
          const bestVoice = this.findBestBrowserVoice(voices);
          if (bestVoice) {
            utterance.voice = bestVoice;
            console.log('데모용 고품질 음성 사용:', bestVoice.name);
          }
          
          // 최적 설정
          utterance.lang = 'ko-KR';
          utterance.rate = 0.85;
          utterance.pitch = 1.1;
          utterance.volume = 1.0;
          
          // 음성을 Blob으로 캡처 (실제로는 불가능하지만 시뮬레이션)
          utterance.onstart = () => {
            // 데모용으로 빈 음성 데이터 반환
            setTimeout(() => {
              resolve('demo-audio-simulated');
            }, 500);
          };
          
          utterance.onerror = () => {
            resolve('demo-audio-fallback');
          };
          
          window.speechSynthesis.speak(utterance);
        } else {
          // 음성이 로딩되지 않았으면 다시 시도
          setTimeout(waitForVoices, 100);
        }
      };
      
      waitForVoices();
    });
  }

  // 최고 품질 브라우저 음성 찾기
  private static findBestBrowserVoice(voices: SpeechSynthesisVoice[]) {
    // 우선순위: 한국어 > 고품질 영어 > 기본값
    const priorities = [
      (v: SpeechSynthesisVoice) => v.lang.includes('ko') && v.name.toLowerCase().includes('premium'),
      (v: SpeechSynthesisVoice) => v.lang.includes('ko') && v.name.toLowerCase().includes('neural'),
      (v: SpeechSynthesisVoice) => v.lang.includes('ko') && v.name.toLowerCase().includes('enhanced'),
      (v: SpeechSynthesisVoice) => v.lang === 'ko-KR',
      (v: SpeechSynthesisVoice) => v.lang.includes('ko'),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('samantha'),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('alex'),
      (v: SpeechSynthesisVoice) => v.lang === 'en-US' && v.localService,
    ];

    for (const priority of priorities) {
      const voice = voices.find(priority);
      if (voice) return voice;
    }

    return voices[0];
  }

  // SSML 형식으로 더 자연스러운 음성 생성 (서버사이드 엔드포인트 사용)
  static async synthesizeWithSSML(ssmlText: string, config: Partial<GoogleTTSConfig> = {}): Promise<string | null> {
    const finalConfig = { ...this.DEFAULT_CONFIG, ...config };
    
    try {
      console.log('서버사이드 SSML TTS API 호출:', ssmlText.substring(0, 50) + '...');
      
      const response = await fetch('/api/tts', {
        method: 'PUT', // SSML은 PUT 메서드 사용
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ssml: ssmlText,
          voice: finalConfig.voice,
          audioConfig: finalConfig.audioConfig
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.warn('서버사이드 SSML TTS 실패:', errorData.error);
        return this.generateDemoAudio(ssmlText);
      }

      const data = await response.json();
      
      if (data.success && data.audioContent) {
        const audioUrl = `data:audio/mp3;base64,${data.audioContent}`;
        console.log('Google SSML TTS 성공, 오디오 길이:', data.audioContent.length);
        return audioUrl;
      }

      return null;
    } catch (error) {
      console.error('SSML TTS API 호출 오류:', error);
      return this.generateDemoAudio(ssmlText);
    }
  }

  // 금융 용어에 최적화된 SSML 생성
  static createFinancialTermSSML(term: string, funnyExplanation: string, seriousExplanation: string): string {
    return `
      <speak>
        <prosody rate="0.85" pitch="+2st">
          <emphasis level="strong">${term}</emphasis>에 대해 알아보겠습니다.
        </prosody>
        
        <break time="1s"/>
        
        <prosody rate="0.9" pitch="+1st">
          ${funnyExplanation}
        </prosody>
        
        <break time="1.5s"/>
        
        <prosody rate="0.8" pitch="-1st">
          정확히 말하면, ${seriousExplanation}
        </prosody>
        
        <break time="1s"/>
        
        <prosody rate="0.85" pitch="+1st">
          이제 ${term}의 의미를 이해하셨나요?
        </prosody>
      </speak>
    `;
  }

  // 미리 정의된 금융 용어별 음성 설정
  static getOptimizedVoiceForTerm(termId: string): GoogleTTSConfig['voice'] {
    const voiceMap: Record<string, GoogleTTSConfig['voice']> = {
      'per': {
        languageCode: 'ko-KR',
        name: 'ko-KR-Wavenet-A', // 친근한 여성 음성
        ssmlGender: 'FEMALE'
      },
      'short-selling': {
        languageCode: 'ko-KR',
        name: 'ko-KR-Wavenet-C', // 신뢰감 있는 여성 음성
        ssmlGender: 'FEMALE'
      },
      'dividend': {
        languageCode: 'ko-KR',
        name: 'ko-KR-Wavenet-B', // 따뜻한 남성 음성
        ssmlGender: 'MALE'
      },
      // 다른 용어들도 추가 가능
    };

    return voiceMap[termId] || this.DEFAULT_CONFIG.voice;
  }
}