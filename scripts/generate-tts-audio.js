const fs = require('fs');
const path = require('path');

// .env.local 파일 로드
require('dotenv').config({ path: '.env.local' });

// Google Cloud TTS API 설정
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY;
const TTS_API_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

// 나레이션 텍스트 정의
const narrations = [
  {
    id: 'title-narration',
    text: '안녕하세요. KSS 온톨로지 강의 1장, 온톨로지란 무엇인가편입니다.',
    voice: 'female',
    language: 'ko'
  },
  {
    id: 'section1-narration',
    text: '온톨로지는 지식을 체계적으로 표현하는 방법입니다. 개념과 개념 간의 관계를 명확하게 정의합니다.',
    voice: 'female',
    language: 'ko'
  },
  {
    id: 'section2-narration',
    text: 'RDF 트리플은 주어, 술어, 목적어로 구성됩니다. 이는 지식을 표현하는 가장 기본적인 단위입니다.',
    voice: 'female',
    language: 'ko'
  },
  {
    id: 'summary-narration',
    text: '오늘 배운 내용을 KSS 플랫폼에서 직접 실습해보세요. 다음 강의에서 만나요!',
    voice: 'female',
    language: 'ko'
  }
];

// 챕터별 나레이션 생성 함수
async function generateChapterNarrations(chapterNumber, chapterTitle, sections) {
  const chapterNarrations = [
    {
      id: `chapter${chapterNumber}-title`,
      text: `안녕하세요. KSS 온톨로지 강의 ${chapterNumber}장, ${chapterTitle}편입니다.`,
      voice: 'female',
      language: 'ko'
    }
  ];

  // 섹션별 나레이션 추가
  sections.forEach((section, index) => {
    chapterNarrations.push({
      id: `chapter${chapterNumber}-section${index + 1}`,
      text: section.narration,
      voice: 'female',
      language: 'ko'
    });
  });

  // 마무리 나레이션
  chapterNarrations.push({
    id: `chapter${chapterNumber}-summary`,
    text: '오늘 배운 내용을 KSS 플랫폼에서 직접 실습해보세요. 다음 강의에서 만나요!',
    voice: 'female',
    language: 'ko'
  });

  return chapterNarrations;
}

// TTS 생성 함수
async function generateTTS(narration) {
  console.log(`Generating TTS for: ${narration.id}`);
  
  try {
    const response = await fetch(TTS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text: narration.text },
        voice: {
          languageCode: narration.language === 'ko' ? 'ko-KR' : 'en-US',
          name: narration.language === 'ko' 
            ? (narration.voice === 'male' ? 'ko-KR-Neural2-C' : 'ko-KR-Neural2-A')
            : (narration.voice === 'male' ? 'en-US-Neural2-J' : 'en-US-Neural2-F'),
          ssmlGender: narration.voice === 'male' ? 'MALE' : 'FEMALE'
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 1.0,
          pitch: 0.0,
          volumeGainDb: 0.0
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`TTS API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const audioContent = data.audioContent;
    
    // Base64 디코딩 및 파일 저장
    const audioBuffer = Buffer.from(audioContent, 'base64');
    const outputPath = path.join(__dirname, '..', 'public', 'sounds', 'narrations', `${narration.id}.mp3`);
    
    // narrations 디렉토리 생성
    const narrationsDir = path.join(__dirname, '..', 'public', 'sounds', 'narrations');
    if (!fs.existsSync(narrationsDir)) {
      fs.mkdirSync(narrationsDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, audioBuffer);
    console.log(`✅ Saved: ${narration.id}.mp3`);
    
    return outputPath;
  } catch (error) {
    console.error(`❌ Error generating TTS for ${narration.id}:`, error);
    throw error;
  }
}

// 모든 나레이션 생성
async function generateAllNarrations() {
  console.log('🎙️ Starting TTS generation...\n');
  
  // 기본 나레이션 생성
  for (const narration of narrations) {
    try {
      await generateTTS(narration);
      // API 제한을 피하기 위한 딜레이
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to generate ${narration.id}:`, error);
    }
  }
  
  // 챕터 1 나레이션 생성 예시
  const chapter1Sections = [
    {
      title: "온톨로지의 정의",
      narration: "온톨로지는 특정 도메인의 개념과 그들 간의 관계를 명시적으로 정의한 것입니다."
    },
    {
      title: "RDF 트리플 기초",
      narration: "RDF 트리플은 주어, 술어, 목적어로 구성되며, 지식을 표현하는 기본 단위입니다."
    },
    {
      title: "실제 예시",
      narration: "예를 들어, '홍길동은 사람이다'라는 지식은 홍길동, rdf:type, 사람으로 표현됩니다."
    }
  ];
  
  const chapter1Narrations = await generateChapterNarrations(1, "온톨로지란 무엇인가", chapter1Sections);
  
  for (const narration of chapter1Narrations) {
    try {
      await generateTTS(narration);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to generate ${narration.id}:`, error);
    }
  }
  
  console.log('\n✨ TTS generation completed!');
}

// 실행
generateAllNarrations().catch(console.error);