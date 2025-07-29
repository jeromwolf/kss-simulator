# TTS (Text-to-Speech) 설정 가이드

## Google Cloud TTS 설정 방법

### 1. Google Cloud Console 접속
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 프로젝트를 생성하거나 기존 프로젝트 선택

### 2. Text-to-Speech API 활성화
1. 메뉴에서 "API 및 서비스" → "라이브러리" 선택
2. "Cloud Text-to-Speech API" 검색
3. API 활성화 버튼 클릭

### 3. API 키 생성
1. "API 및 서비스" → "사용자 인증 정보" 선택
2. "+ 사용자 인증 정보 만들기" → "API 키" 선택
3. 생성된 API 키를 복사

### 4. 환경 변수 설정
1. 프로젝트 루트에 `.env.local` 파일 생성
2. 다음 내용 추가:
```
GOOGLE_CLOUD_API_KEY=your_api_key_here
```

### 5. 서버 재시작
```bash
npm run dev
```

## 지원되는 음성 옵션

### 한국어 (ko-KR)
- **남성**: ko-KR-Neural2-C (자연스러운 남성 음성)
- **여성**: ko-KR-Neural2-A (자연스러운 여성 음성)

### 영어 (en-US)
- **남성**: en-US-Neural2-J (자연스러운 남성 음성)
- **여성**: en-US-Neural2-F (자연스러운 여성 음성)

## 사용 방법
1. 비디오 생성기에서 원하는 섹션 선택
2. 스크립트 편집 (✏️ 버튼)
3. 음성 설정에서 성별과 언어 선택
4. 재생 버튼 (🔊) 클릭하여 미리듣기

## 주의사항
- Google Cloud TTS는 월 100만 자까지 무료
- API 키는 절대 공개 저장소에 커밋하지 마세요
- 프로덕션 환경에서는 API 키 제한 설정 권장

## 문제 해결
- "TTS 서비스가 설정되지 않았습니다" 에러: API 키 확인
- "TTS 생성 실패" 에러: API 활성화 상태 확인
- 음성이 재생되지 않는 경우: 브라우저 오디오 권한 확인