const fs = require('fs');
const path = require('path');

// 나레이션 텍스트 정의
const narrations = [
  {
    id: 'chapter1-title',
    text: '안녕하세요. KSS 온톨로지 강의 1장, 온톨로지란 무엇인가편입니다.',
    voice: 'female',
    language: 'ko'
  },
  {
    id: 'chapter1-section1',
    text: '온톨로지는 특정 도메인의 개념과 그들 간의 관계를 명시적으로 정의한 것입니다.',
    voice: 'female',
    language: 'ko'
  },
  {
    id: 'chapter1-section2',
    text: 'RDF 트리플은 주어, 술어, 목적어로 구성되며, 지식을 표현하는 기본 단위입니다.',
    voice: 'female',
    language: 'ko'
  },
  {
    id: 'chapter1-section3',
    text: '예를 들어, 홍길동은 사람이다라는 지식은 홍길동, rdf:type, 사람으로 표현됩니다.',
    voice: 'female',
    language: 'ko'
  },
  {
    id: 'chapter1-summary',
    text: '오늘 배운 내용을 KSS 플랫폼에서 직접 실습해보세요. 다음 강의에서 만나요!',
    voice: 'female',
    language: 'ko'
  }
];

// TTS 생성 함수 (로컬 API 사용)
async function generateTTS(narration) {
  console.log(`Generating TTS for: ${narration.id}`);
  
  try {
    const response = await fetch('http://localhost:3000/api/tts/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: narration.text,
        voice: narration.voice,
        language: narration.language,
        speed: 1.0
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`TTS API error: ${response.status}`);
    }

    // 오디오 데이터를 ArrayBuffer로 받기
    const audioBuffer = await response.arrayBuffer();
    
    // 파일로 저장
    const outputPath = path.join(__dirname, '..', 'public', 'sounds', 'narrations', `${narration.id}.mp3`);
    
    // narrations 디렉토리 생성
    const narrationsDir = path.join(__dirname, '..', 'public', 'sounds', 'narrations');
    if (!fs.existsSync(narrationsDir)) {
      fs.mkdirSync(narrationsDir, { recursive: true });
    }
    
    // Buffer로 변환하여 저장
    fs.writeFileSync(outputPath, Buffer.from(audioBuffer));
    console.log(`✅ Saved: ${narration.id}.mp3 (${Buffer.from(audioBuffer).length} bytes)`);
    
    return outputPath;
  } catch (error) {
    console.error(`❌ Error generating TTS for ${narration.id}:`, error.message);
    throw error;
  }
}

// 모든 나레이션 생성
async function generateAllNarrations() {
  console.log('🎙️ Starting TTS generation using local API...');
  console.log('⚠️  Make sure the dev server is running (npm run dev)\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const narration of narrations) {
    try {
      await generateTTS(narration);
      successCount++;
      // API 제한을 피하기 위한 딜레이
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      errorCount++;
      console.error(`Failed to generate ${narration.id}:`, error.message);
    }
  }
  
  console.log(`\n✨ TTS generation completed!`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  
  if (successCount > 0) {
    console.log('\n📁 Audio files saved to: public/sounds/narrations/');
    console.log('🎬 You can now render videos with audio using:');
    console.log('   npm run video:render -- ChapterExplainerWithAudio');
  }
}

// 실행
generateAllNarrations().catch(console.error);