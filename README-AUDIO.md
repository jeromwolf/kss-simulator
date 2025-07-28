# KSS 비디오 오디오 구현 가이드

## 문제 상황
현재 비디오 생성 시스템에서 오디오가 재생되지 않는 이유:
1. 실제 MP3 파일이 `/public/sounds/` 디렉토리에 존재하지 않음
2. TTS(Text-to-Speech) API 연동이 구현되지 않음
3. 현재는 플레이스홀더 구현만 있음

## 해결 방법

### 1. 즉시 테스트 가능한 방법
```bash
# 무음 파일 생성 (테스트용)
cd kss-standalone/public/sounds
# Mac에서 무음 파일 생성
ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t 3 -acodec mp3 silence.mp3

# 또는 온라인에서 무료 음원 다운로드
# - https://freesound.org/
# - https://www.zapsplat.com/
```

### 2. TTS 구현 방법

#### Google Cloud Text-to-Speech 사용
```typescript
// 1. Google Cloud 프로젝트 생성 및 API 키 발급
// 2. .env.local에 API 키 추가
GOOGLE_TTS_API_KEY=your-api-key

// 3. API 엔드포인트 구현 (/app/api/generate-audio/route.ts)
const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.GOOGLE_TTS_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    input: { text: "안녕하세요" },
    voice: {
      languageCode: 'ko-KR',
      name: 'ko-KR-Wavenet-A', // 여성 음성
    },
    audioConfig: {
      audioEncoding: 'MP3',
    },
  }),
});
```

#### Naver Clova Voice 사용 (한국어 특화)
```typescript
// 네이버 클라우드 플랫폼에서 API 키 발급
const response = await fetch('https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts', {
  method: 'POST',
  headers: {
    'X-NCP-APIGW-API-KEY-ID': clientId,
    'X-NCP-APIGW-API-KEY': clientSecret,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    speaker: 'nara', // 나라(여성) 또는 nsinu(남성)
    text: '안녕하세요',
    format: 'mp3',
  }),
});
```

### 3. 오디오 테스트 방법
1. 비디오 생성기 페이지로 이동: http://localhost:3000/video-creator
2. "오디오 테스트" 탭 클릭
3. 테스트 오디오 재생 및 TTS 생성 테스트

### 4. Remotion에서 오디오 사용
```tsx
// ChapterExplainerWithAudio.tsx에서
import { Audio, staticFile } from 'remotion';

// 실제 오디오 파일 사용
<Audio 
  src={staticFile('sounds/narration-1.mp3')} 
  volume={0.8}
  startFrom={30} // 30프레임부터 시작
/>

// 배경음악
<Audio 
  src={staticFile('sounds/background-music.mp3')} 
  volume={0.1}
  loop
/>
```

### 5. 전체 구현 플로우
1. 사용자가 챕터 선택
2. 챕터 내용을 섹션별로 분할
3. 각 섹션의 나레이션 텍스트를 TTS API로 전송
4. 생성된 MP3 파일을 public/sounds/에 저장
5. Remotion 컴포지션에서 해당 파일 경로 사용
6. 최종 비디오 렌더링 시 오디오 포함

### 6. 추천 무료 리소스
- **배경음악**: YouTube Audio Library (https://www.youtube.com/audiolibrary)
- **효과음**: Freesound.org (https://freesound.org/)
- **한국어 TTS**: Typecast (https://typecast.ai/) - 무료 체험 가능

## 현재 구현 상태
- ✅ 오디오 설정 UI
- ✅ 나레이션 시각적 표시 (🔊)
- ✅ TTS API 엔드포인트 준비
- ✅ 오디오 테스트 컴포넌트
- ❌ 실제 MP3 파일
- ❌ TTS API 연동
- ❌ 오디오 파일 자동 생성

## 다음 단계
1. 무음 MP3 파일이라도 추가하여 테스트
2. TTS 서비스 선택 및 API 키 발급
3. 오디오 생성 API 구현
4. 비디오 렌더링 시 오디오 통합