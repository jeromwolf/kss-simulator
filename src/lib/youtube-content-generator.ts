// Type definitions (these would normally come from @/types)
interface ChapterContent {
  id: string;
  title: string;
  content: string;
  description?: string;
  learningObjectives?: string[];
  estimatedMinutes?: number;
  keywords?: string[];
  hasSimulator?: boolean;
}

interface Module {
  id: string;
  name: string;
  nameKo?: string;
  description?: string;
  keywords?: string[];
  learningObjectives?: string[];
  chapters: ChapterContent[];
  simulators?: any[];
}

interface YouTubeVideo {
  title: string;
  description: string;
  tags: string[];
  thumbnail: {
    title: string;
    subtitle: string;
  };
  script: VideoScript;
}

interface VideoScript {
  sections: {
    title: string;
    content: string;
    duration: number; // seconds
    visuals?: {
      type: 'code' | 'diagram' | 'simulator' | 'text';
      content: any;
    };
  }[];
}

export class YouTubeContentGenerator {
  // 모듈별 비디오 시리즈 생성
  static generateModuleSeries(module: Module): YouTubeVideo[] {
    const videos: YouTubeVideo[] = [];
    
    // 1. 모듈 소개 비디오
    videos.push(this.generateIntroVideo(module));
    
    // 2. 각 챕터별 비디오
    module.chapters.forEach((chapter, index) => {
      videos.push(this.generateChapterVideo(module, chapter, index + 1));
    });
    
    // 3. 시뮬레이터 튜토리얼 비디오
    if (module.simulators) {
      module.simulators.forEach(simulator => {
        videos.push(this.generateSimulatorVideo(module, simulator));
      });
    }
    
    // 4. 전체 요약 비디오
    videos.push(this.generateSummaryVideo(module));
    
    return videos;
  }

  // 모듈 소개 비디오
  private static generateIntroVideo(module: Module): YouTubeVideo {
    const moduleNameKo = module.nameKo || module.name;
    return {
      title: `[KSS] ${moduleNameKo} 완벽 가이드 - 소개편`,
      description: `
${module.description || ''}

📚 이 시리즈에서 배우게 될 내용:
${module.chapters.map((ch, i) => `${i + 1}. ${ch.title}`).join('\n')}

🔗 KSS 플랫폼에서 직접 체험하기: https://kss-platform.com/modules/${module.id}

#${moduleNameKo} #KSS #온라인교육 #AI학습
      `.trim(),
      tags: [moduleNameKo, 'KSS', '온라인교육', ...(module.keywords || [])],
      thumbnail: {
        title: moduleNameKo,
        subtitle: '완벽 가이드 시작하기'
      },
      script: {
        sections: [
          {
            title: '인사 및 소개',
            content: `안녕하세요! KSS 플랫폼의 ${moduleNameKo} 모듈에 오신 것을 환영합니다.`,
            duration: 10,
            visuals: { type: 'text', content: moduleNameKo }
          },
          {
            title: '학습 목표',
            content: '이 시리즈를 통해 여러분이 달성하게 될 학습 목표를 소개합니다.',
            duration: 20,
            visuals: { type: 'diagram', content: module.learningObjectives }
          },
          {
            title: '커리큘럼 소개',
            content: `총 ${module.chapters.length}개의 챕터로 구성되어 있으며...`,
            duration: 30,
            visuals: { type: 'text', content: module.chapters }
          }
        ]
      }
    };
  }

  // 챕터별 비디오
  private static generateChapterVideo(
    module: Module, 
    chapter: ChapterContent, 
    chapterNumber: number
  ): YouTubeVideo {
    // 챕터 콘텐츠를 분석하여 섹션 생성
    const sections = this.analyzeChapterContent(chapter);
    
    return {
      title: `[KSS ${module.nameKo || module.name}] ${chapterNumber}강. ${chapter.title}`,
      description: `
${chapter.description}

📌 이번 강의에서 배울 내용:
${chapter.learningObjectives?.map(obj => `• ${obj}`).join('\n') || ''}

⏱️ 예상 학습 시간: ${chapter.estimatedMinutes}분

🔗 KSS에서 시뮬레이터 체험하기: https://kss-platform.com/modules/${module.id}/${chapter.id}

#${module.nameKo || module.name} #${chapter.title} #KSS
      `.trim(),
      tags: [module.nameKo || module.name, chapter.title, ...(chapter.keywords || [])],
      thumbnail: {
        title: `${chapterNumber}강. ${chapter.title}`,
        subtitle: module.nameKo || module.name
      },
      script: {
        sections: sections
      }
    };
  }

  // 시뮬레이터 비디오
  private static generateSimulatorVideo(module: Module, simulator: any): YouTubeVideo {
    return {
      title: `[KSS 실습] ${simulator.name} 사용법 - ${module.nameKo || module.name}`,
      description: `
${simulator.description}

🛠️ 이 시뮬레이터로 할 수 있는 것:
• 실시간 데이터 분석
• 인터랙티브 학습
• 실전 문제 해결

🔗 직접 체험하기: https://kss-platform.com/modules/${module.id}/simulators/${simulator.id}
      `.trim(),
      tags: [module.nameKo || module.name, '시뮬레이터', simulator.name, '실습'],
      thumbnail: {
        title: simulator.name,
        subtitle: '시뮬레이터 튜토리얼'
      },
      script: {
        sections: [
          {
            title: '시뮬레이터 소개',
            content: `${simulator.name}의 주요 기능을 소개합니다.`,
            duration: 20,
            visuals: { type: 'simulator', content: simulator }
          },
          {
            title: '실습 따라하기',
            content: '실제로 시뮬레이터를 사용하는 방법을 단계별로 알아봅니다.',
            duration: 60,
            visuals: { type: 'simulator', content: simulator }
          }
        ]
      }
    };
  }

  // 요약 비디오
  private static generateSummaryVideo(module: Module): YouTubeVideo {
    return {
      title: `[KSS] ${module.nameKo || module.name} 전체 정리 - 핵심 요약`,
      description: `
${module.nameKo || module.name} 시리즈를 마무리하며 핵심 내용을 정리합니다.

📚 전체 커리큘럼 복습
🎯 핵심 개념 정리
💡 실전 활용 팁

🔗 KSS 플랫폼: https://kss-platform.com
      `.trim(),
      tags: [module.nameKo || module.name, '요약', '정리', 'KSS'],
      thumbnail: {
        title: `${module.nameKo || module.name} 핵심 정리`,
        subtitle: '10분 요약'
      },
      script: {
        sections: [
          {
            title: '전체 복습',
            content: '지금까지 배운 내용을 빠르게 복습합니다.',
            duration: 180,
            visuals: { type: 'diagram', content: 'summary' }
          },
          {
            title: '다음 단계',
            content: '이제 여러분이 할 수 있는 것들과 추천 학습 경로를 소개합니다.',
            duration: 60,
            visuals: { type: 'text', content: 'next-steps' }
          }
        ]
      }
    };
  }

  // 챕터 콘텐츠 분석
  private static analyzeChapterContent(chapter: ChapterContent): any[] {
    // React 컴포넌트나 HTML을 파싱하여 비디오 섹션으로 변환
    const sections = [];
    
    // 도입부
    sections.push({
      title: '학습 목표',
      content: chapter.description,
      duration: 20,
      visuals: { type: 'text', content: chapter.learningObjectives }
    });
    
    // 메인 콘텐츠 (실제로는 더 정교한 파싱 필요)
    sections.push({
      title: '핵심 개념',
      content: '이번 챕터의 핵심 개념을 살펴봅니다.',
      duration: 120,
      visuals: { type: 'diagram', content: 'main-content' }
    });
    
    // 예제/실습
    if (chapter.hasSimulator) {
      sections.push({
        title: '실습하기',
        content: '시뮬레이터를 통해 직접 체험해봅니다.',
        duration: 90,
        visuals: { type: 'simulator', content: 'demo' }
      });
    }
    
    return sections;
  }
}

// 배치 처리를 위한 유틸리티
export class YouTubeBatchProcessor {
  static async processAllModules() {
    const modules = ['ontology', 'rag', 'llm', 'stock-analysis'];
    const allVideos: YouTubeVideo[] = [];
    
    for (const moduleId of modules) {
      // 모듈 데이터 로드
      const module = await this.loadModule(moduleId);
      
      // 비디오 생성
      const videos = YouTubeContentGenerator.generateModuleSeries(module);
      allVideos.push(...videos);
      
      // 메타데이터 저장
      await this.saveVideoMetadata(moduleId, videos);
    }
    
    return allVideos;
  }
  
  private static async loadModule(moduleId: string): Promise<Module> {
    // 실제 구현에서는 모듈 데이터를 로드
    return {} as Module;
  }
  
  private static async saveVideoMetadata(moduleId: string, videos: YouTubeVideo[]) {
    // 생성된 비디오 메타데이터를 저장
    console.log(`${moduleId}: ${videos.length}개 비디오 생성됨`);
  }
}