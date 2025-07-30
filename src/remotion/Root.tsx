import React from 'react';
import { Composition } from 'remotion';
import { OntologyExplainer } from './compositions/OntologyExplainer';
import { ChapterExplainer } from './compositions/ChapterExplainer';
import { ChapterExplainerWithAudio } from './compositions/ChapterExplainerWithAudio';
import { ModernChapterExplainer } from './compositions/ModernChapterExplainer';
import { StockChapterExplainer } from './compositions/StockChapterExplainer';
import { TestAudio } from './compositions/TestAudio';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OntologyExplainer"
        component={OntologyExplainer as any}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "RDF 트리플 기초",
          triples: [
            {
              subject: "홍길동",
              predicate: "직업",
              object: "개발자"
            },
            {
              subject: "홍길동",
              predicate: "나이",
              object: '"30"'
            },
            {
              subject: "개발자",
              predicate: "사용언어",
              object: "JavaScript"
            }
          ]
        }}
      />
      
      <Composition
        id="ChapterExplainer"
        component={ChapterExplainer as any}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          chapterNumber: 1,
          chapterTitle: "온톨로지의 개념과 역사",
          sections: [
            {
              title: "온톨로지란 무엇인가?",
              content: "온톨로지는 특정 도메인의 개념과 관계를 명시적으로 정의한 것입니다.",
              code: ":온톨로지 :정의 :지식표현체계 ."
            },
            {
              title: "온톨로지의 구성요소",
              content: "클래스, 속성, 관계, 제약사항 등으로 구성됩니다.",
            },
            {
              title: "실습",
              content: "KSS 플랫폼에서 직접 온톨로지를 만들어보세요.",
            }
          ]
        }}
      />
      
      <Composition
        id="ChapterExplainerWithAudio"
        component={ChapterExplainerWithAudio as any}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          chapterNumber: 1,
          chapterTitle: "온톨로지의 개념과 역사",
          sections: [
            {
              title: "온톨로지란 무엇인가?",
              content: "온톨로지는 특정 도메인의 개념과 관계를 명시적으로 정의한 것입니다.",
              narration: "온톨로지는 우리가 알고 있는 지식을 체계적으로 정리하는 방법입니다.",
              code: ":온톨로지 :정의 :지식표현체계 ."
            },
            {
              title: "온톨로지의 구성요소",
              content: "클래스, 속성, 관계, 제약사항 등으로 구성됩니다.",
              narration: "온톨로지를 구성하는 핵심 요소들을 살펴보겠습니다.",
            },
            {
              title: "실습",
              content: "KSS 플랫폼에서 직접 온톨로지를 만들어보세요.",
              narration: "이제 배운 내용을 직접 실습해봅시다.",
            }
          ]
        }}
      />
      
      <Composition
        id="ModernChapterExplainer"
        component={ModernChapterExplainer as any}
        durationInFrames={2730}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          chapterNumber: 1,
          chapterTitle: "온톨로지의 개념과 역사",
          sections: [
            {
              title: "온톨로지란 무엇인가?",
              content: "온톨로지는 특정 도메인의 개념과 관계를 명시적으로 정의한 것입니다.\n지식을 컴퓨터가 이해할 수 있는 형태로 표현합니다.",
              narration: "온톨로지는 우리가 알고 있는 지식을 체계적으로 정리하는 방법입니다.",
              highlights: [
                "개념과 관계의 명시적 정의",
                "컴퓨터가 이해 가능한 지식 표현",
                "도메인별 특화된 모델링"
              ],
              code: ":온톨로지 :정의 :지식표현체계 ."
            },
            {
              title: "온톨로지의 구성요소",
              content: "클래스, 속성, 관계, 제약사항 등으로 구성됩니다.\n각 요소는 지식을 체계적으로 표현하는 역할을 합니다.",
              narration: "온톨로지를 구성하는 핵심 요소들을 살펴보겠습니다.",
              highlights: [
                "클래스: 개념의 집합",
                "속성: 개념의 특징",
                "관계: 개념 간 연결"
              ]
            },
            {
              title: "실습 가이드",
              content: "KSS 플랫폼에서 직접 온톨로지를 만들어보세요.\nRDF 에디터와 SPARQL로 실습할 수 있습니다.",
              narration: "이제 배운 내용을 직접 실습해봅시다.",
              highlights: [
                "RDF 트리플 생성",
                "SPARQL 쿼리 작성",
                "추론 엔진 활용"
              ]
            }
          ],
          backgroundMusic: "background-music.mp3"
        }}
      />
      
      <Composition
        id="StockChapterExplainer"
        component={StockChapterExplainer as any}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          topicTitle: "주식시장의 기본 구조",
          sections: [
            {
              title: "주식시장 개요",
              content: "주식시장은 기업과 투자자를 연결하는 중요한 금융 인프라입니다.",
              narration: "오늘은 주식시장의 기본 구조에 대해 알아보겠습니다.",
              keyPoints: [
                "KOSPI - 대기업 중심 시장",
                "KOSDAQ - 중소·벤처기업 시장",
                "거래 시간: 09:00 ~ 15:30"
              ]
            },
            {
              title: "시장 참여자",
              content: "개인투자자, 기관투자자, 외국인투자자가 주요 참여자입니다.",
              narration: "각 투자 주체별 특징과 투자 패턴을 이해하는 것이 중요합니다.",
              keyPoints: [
                "개인투자자 - 단기 투자 성향",
                "기관투자자 - 장기 투자 전략",
                "외국인투자자 - 시장 영향력 크다"
              ]
            }
          ],
          style: "educational",
          moduleColor: "from-blue-500 to-indigo-600"
        }}
      />
      
      <Composition
        id="TestAudio"
        component={TestAudio as any}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};