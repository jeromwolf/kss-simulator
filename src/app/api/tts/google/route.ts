import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, voice, language, speed } = await request.json();

    // Google Cloud TTS API 키 확인
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    if (!apiKey) {
      console.error('Google Cloud API key not found');
      console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('GOOGLE')));
      return NextResponse.json(
        { error: 'TTS 서비스가 설정되지 않았습니다. .env.local 파일을 확인하세요.' },
        { status: 500 }
      );
    }
    
    console.log('Using Google TTS with language:', language, 'voice:', voice);

    // Google Cloud TTS API 호출
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: language === 'ko' ? 'ko-KR' : 'en-US',
            name: language === 'ko' 
              ? (voice === 'male' ? 'ko-KR-Neural2-C' : 'ko-KR-Neural2-A')
              : (voice === 'male' ? 'en-US-Neural2-J' : 'en-US-Neural2-F'),
            ssmlGender: voice === 'male' ? 'MALE' : 'FEMALE'
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: speed || 1.0,
            pitch: 0.0,
            volumeGainDb: 0.0
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Google TTS API error:', error);
      throw new Error('TTS 생성 실패');
    }

    const data = await response.json();
    
    // Base64로 인코딩된 오디오를 바이너리로 변환
    const audioContent = data.audioContent;
    const audioBuffer = Buffer.from(audioContent, 'base64');

    // MP3 오디오 응답 반환
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('TTS API error:', error);
    return NextResponse.json(
      { error: 'TTS 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}