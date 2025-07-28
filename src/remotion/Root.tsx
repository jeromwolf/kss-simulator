import React from 'react';
import { Composition } from 'remotion';
import { OntologyExplainer } from './compositions/OntologyExplainer';
import { ChapterExplainer } from './compositions/ChapterExplainer';
import { ChapterExplainerWithAudio } from './compositions/ChapterExplainerWithAudio';
import { ModernChapterExplainer } from './compositions/ModernChapterExplainer';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OntologyExplainer"
        component={OntologyExplainer}
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
        component={ChapterExplainer}
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
        component={ChapterExplainerWithAudio}
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
          ],
          backgroundMusic: "background-music.mp3"
        }}
      />
      
      <Composition
        id="ModernChapterExplainer"
        component={ModernChapterExplainer}
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
    </>
  );
};