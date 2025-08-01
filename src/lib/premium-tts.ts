// 프리미엄 TTS 서비스들 (실제 구현용)
export class PremiumTTS {
  // 구글 Cloud TTS (실제 구현에서 사용)
  static async generateGoogleTTS(text: string, options: {
    voice?: 'ko-KR-Wavenet-A' | 'ko-KR-Wavenet-B' | 'ko-KR-Wavenet-C';
    speed?: number;
    pitch?: number;
  } = {}) {
    // 실제로는 Google Cloud TTS API 호출
    console.log('Google TTS 생성:', { text, options });
    return null; // API 키가 필요한 실제 구현
  }

  // AWS Polly (실제 구현에서 사용)
  static async generateAWSPolly(text: string, options: {
    voice?: 'Seoyeon' | 'Jihun';
    speed?: number;
  } = {}) {
    // 실제로는 AWS Polly API 호출
    console.log('AWS Polly 생성:', { text, options });
    return null; // API 키가 필요한 실제 구현
  }

  // ElevenLabs (가장 자연스러운 음성)
  static async generateElevenLabs(text: string, voiceId: string = 'korean-voice-id') {
    // 실제로는 ElevenLabs API 호출
    console.log('ElevenLabs 생성:', { text, voiceId });
    return null; // API 키가 필요한 실제 구현
  }
}

// 브라우저 TTS 개선 버전
export class ImprovedBrowserTTS {
  private static findBestKoreanVoice() {
    const voices = speechSynthesis.getVoices();
    
    // 우선순위: Neural > Premium > Standard
    const priorities = [
      // 고품질 한국어 음성들
      (v: SpeechSynthesisVoice) => v.name.includes('Neural') && v.lang.includes('ko'),
      (v: SpeechSynthesisVoice) => v.name.includes('Premium') && v.lang.includes('ko'),
      (v: SpeechSynthesisVoice) => v.name.includes('Heami') && v.lang.includes('ko'),
      (v: SpeechSynthesisVoice) => v.name.includes('Yuna') && v.lang.includes('ko'),
      (v: SpeechSynthesisVoice) => v.lang === 'ko-KR',
      (v: SpeechSynthesisVoice) => v.lang.includes('ko'),
      // 영어 음성 중 자연스러운 것들
      (v: SpeechSynthesisVoice) => v.name.includes('Neural') && v.lang.includes('en'),
      (v: SpeechSynthesisVoice) => v.name.includes('Samantha') && v.lang.includes('en'),
    ];

    for (const priority of priorities) {
      const voice = voices.find(priority);
      if (voice) return voice;
    }

    return voices[0]; // 기본값
  }

  static speak(text: string, options: {
    useEnglish?: boolean;
    rate?: number;
    pitch?: number;
    volume?: number;
  } = {}) {
    return new Promise<void>((resolve, reject) => {
      // 한국어가 너무 구릴 때 영어로 대체
      const finalText = options.useEnglish ? this.translateToEnglish(text) : text;
      
      const utterance = new SpeechSynthesisUtterance(finalText);
      const bestVoice = this.findBestKoreanVoice();
      
      if (bestVoice) {
        utterance.voice = bestVoice;
      }
      
      utterance.lang = options.useEnglish ? 'en-US' : 'ko-KR';
      utterance.rate = options.rate || 0.85;
      utterance.pitch = options.pitch || 1.1;
      utterance.volume = options.volume || 1.0;
      
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
      
      speechSynthesis.speak(utterance);
    });
  }

  private static translateToEnglish(koreanText: string): string {
    // 간단한 금융 용어 번역
    const translations: Record<string, string> = {
      'PER': 'P E R, Price to Earnings Ratio',
      '공매도': 'Short Selling',
      '배당금': 'Dividend',
      '시가총액': 'Market Capitalization',
      '블루칩': 'Blue Chip Stock',
      '손절': 'Stop Loss',
      '분산투자': 'Diversification',
      '레버리지': 'Leverage',
      '황소장': 'Bull Market',
      '곰장': 'Bear Market'
    };

    let result = koreanText;
    for (const [korean, english] of Object.entries(translations)) {
      result = result.replace(new RegExp(korean, 'g'), english);
    }
    
    return result;
  }
}