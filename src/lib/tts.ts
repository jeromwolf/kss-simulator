// 간단한 TTS 유틸리티
export class TTSManager {
  private static instance: TTSManager;
  private synthesis: SpeechSynthesis;
  
  private constructor() {
    this.synthesis = window.speechSynthesis;
  }
  
  static getInstance(): TTSManager {
    if (!TTSManager.instance) {
      TTSManager.instance = new TTSManager();
    }
    return TTSManager.instance;
  }
  
  speak(text: string, options: {
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
  } = {}) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.lang = options.lang || 'ko-KR';
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;
    
    // 한국어 음성 찾기
    const voices = this.synthesis.getVoices();
    const koreanVoice = voices.find(voice => 
      voice.lang.includes('ko') || voice.name.includes('Korean')
    );
    
    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }
    
    this.synthesis.speak(utterance);
    return utterance;
  }
  
  stop() {
    this.synthesis.cancel();
  }
  
  pause() {
    this.synthesis.pause();
  }
  
  resume() {
    this.synthesis.resume();
  }
}