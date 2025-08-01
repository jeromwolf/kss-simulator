import { NextRequest, NextResponse } from 'next/server';

interface TTSRequest {
  text: string;
  voice?: {
    languageCode: string;
    name: string;
    ssmlGender: 'FEMALE' | 'MALE' | 'NEUTRAL';
  };
  audioConfig?: {
    audioEncoding: 'MP3' | 'LINEAR16' | 'OGG_OPUS';
    speakingRate: number;
    pitch: number;
    volumeGainDb: number;
  };
}

const DEFAULT_VOICE = {
  languageCode: 'ko-KR',
  name: 'ko-KR-Wavenet-A',
  ssmlGender: 'FEMALE' as const
};

const DEFAULT_AUDIO_CONFIG = {
  audioEncoding: 'MP3' as const,
  speakingRate: 0.9,
  pitch: 0.0,
  volumeGainDb: 0.0
};

export async function POST(request: NextRequest) {
  try {
    const body: TTSRequest = await request.json();
    const { text, voice = DEFAULT_VOICE, audioConfig = DEFAULT_AUDIO_CONFIG } = body;

    // 🚨 안전장치: 텍스트 길이 제한
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: '유효하지 않은 텍스트입니다.' },
        { status: 400 }
      );
    }

    if (text.length > 1000) {
      return NextResponse.json(
        { error: '텍스트가 너무 깁니다. (최대 1000자)' },
        { status: 400 }
      );
    }

    // API 키 확인
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Cloud API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    console.log('Google TTS API 호출 시작:', { 
      textLength: text.length, 
      preview: text.substring(0, 50) + '...' 
    });

    // Google Cloud Text-to-Speech API 호출
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text },
        voice,
        audioConfig
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google TTS API 오류:', response.status, errorText);
      return NextResponse.json(
        { error: `Google TTS API 오류: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (data.audioContent) {
      console.log('Google TTS 성공, 오디오 길이:', data.audioContent.length);
      return NextResponse.json({
        success: true,
        audioContent: data.audioContent,
        contentType: 'audio/mp3'
      });
    }

    return NextResponse.json(
      { error: '오디오 콘텐츠가 생성되지 않았습니다.' },
      { status: 500 }
    );

  } catch (error) {
    console.error('TTS API 서버 오류:', error);
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// SSML 지원을 위한 별도 엔드포인트
export async function PUT(request: NextRequest) {
  try {
    const body: TTSRequest & { ssml: string } = await request.json();
    const { ssml, voice = DEFAULT_VOICE, audioConfig = DEFAULT_AUDIO_CONFIG } = body;

    // 🚨 안전장치: SSML 길이 및 유효성 검사
    if (!ssml || typeof ssml !== 'string') {
      return NextResponse.json(
        { error: '유효하지 않은 SSML입니다.' },
        { status: 400 }
      );
    }

    if (ssml.length > 2000) {
      return NextResponse.json(
        { error: 'SSML이 너무 깁니다. (최대 2000자)' },
        { status: 400 }
      );
    }

    // 🚨 위험한 SSML 태그 차단
    const dangerousTags = ['<audio', '<media', '<mark', '<break time="'];
    if (dangerousTags.some(tag => ssml.toLowerCase().includes(tag))) {
      return NextResponse.json(
        { error: '지원하지 않는 SSML 태그가 포함되어 있습니다.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Cloud API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    console.log('Google TTS SSML API 호출 시작:', {
      ssmlLength: ssml.length,
      preview: ssml.substring(0, 100) + '...'
    });

    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { ssml },
        voice,
        audioConfig
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google TTS SSML API 오류:', response.status, errorText);
      return NextResponse.json(
        { error: `Google TTS API 오류: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (data.audioContent) {
      console.log('Google TTS SSML 성공');
      return NextResponse.json({
        success: true,
        audioContent: data.audioContent,
        contentType: 'audio/mp3'
      });
    }

    return NextResponse.json(
      { error: '오디오 콘텐츠가 생성되지 않았습니다.' },
      { status: 500 }
    );

  } catch (error) {
    console.error('TTS SSML API 서버 오류:', error);
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}