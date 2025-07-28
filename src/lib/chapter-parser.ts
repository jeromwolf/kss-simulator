// 챕터 HTML 파싱 및 상세 섹션 생성

export interface DetailedSection {
  title: string;
  content: string;
  narration: string;
  highlights?: string[];
  code?: string;
  examples?: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: number;
  };
}

export function parseChapterContent(chapterNumber: number): DetailedSection[] {
  // 실제로는 HTML 파일을 파싱하여 섹션을 추출
  // 여기서는 챕터별로 풍부한 콘텐츠를 하드코딩
  
  const chapterContents: Record<number, DetailedSection[]> = {
    4: [ // RDF 챕터
      {
        title: "도입: RDF의 세계로",
        content: "이번 시간에는 시맨틱 웹의 핵심 기술인 RDF에 대해 알아보겠습니다.\nRDF는 Resource Description Framework의 약자로, 웹 상의 자원을 기술하는 표준입니다.",
        narration: "안녕하세요! 오늘은 시맨틱 웹의 핵심 기술인 RDF에 대해 깊이 있게 알아보겠습니다. RDF는 우리가 웹에서 정보를 표현하는 방식을 혁신적으로 바꾸어 놓았습니다.",
        highlights: [
          "W3C 표준 프레임워크",
          "기계가 이해 가능한 데이터 모델",
          "트리플 기반 지식 표현"
        ]
      },
      {
        title: "RDF의 탄생 배경",
        content: "1990년대 후반, 웹이 급속도로 성장하면서 문제가 발생했습니다.\n웹 페이지는 인간이 읽기에는 좋지만, 컴퓨터가 내용을 이해하기는 어려웠습니다.",
        narration: "1990년대 후반, 팀 버너스 리는 한 가지 문제를 발견했습니다. 웹 페이지가 아무리 많아져도, 컴퓨터는 그 내용의 의미를 전혀 이해하지 못한다는 것이었죠. 이것이 바로 RDF가 탄생하게 된 배경입니다.",
        highlights: [
          "웹의 급속한 성장",
          "기계 가독성의 부재",
          "의미 정보의 필요성"
        ],
        examples: [
          "HTML: <p>홍길동은 개발자입니다</p> - 사람은 이해하지만 기계는 모름",
          "RDF: :홍길동 :직업 :개발자 - 기계도 이해 가능한 구조화된 데이터"
        ]
      },
      {
        title: "트리플: 지식의 원자 단위",
        content: "RDF의 핵심은 모든 지식을 주어-서술어-목적어의 트리플로 표현하는 것입니다.\n이는 인간의 언어 구조와 유사하여 직관적입니다.",
        narration: "RDF의 천재적인 발상은 모든 지식을 세 가지 요소로 표현한다는 것입니다. 주어, 서술어, 목적어. 우리가 말하는 방식과 똑같죠. 예를 들어 '홍길동은 개발자다'라는 문장을 생각해보세요.",
        highlights: [
          "주어(Subject): 설명하려는 대상",
          "서술어(Predicate): 속성이나 관계",
          "목적어(Object): 값이나 다른 자원"
        ],
        code: "# 기본 트리플 구조\n:홍길동 :직업 :개발자 .\n:홍길동 :나이 \"30\" .\n:홍길동 :거주지 :서울 .",
        quiz: {
          question: "다음 중 올바른 RDF 트리플은?",
          options: [
            "홍길동 개발자",
            ":홍길동 :직업 :개발자 .",
            "직업 = 개발자",
            "홍길동(개발자)"
          ],
          answer: 1
        }
      },
      {
        title: "URI: 고유한 식별자",
        content: "RDF에서는 모든 자원을 URI(Uniform Resource Identifier)로 식별합니다.\n이를 통해 전 세계적으로 고유한 식별이 가능합니다.",
        narration: "RDF의 또 다른 핵심은 URI입니다. 웹 주소처럼 생긴 이 식별자는 전 세계에서 유일합니다. 마치 주민등록번호처럼, 각 개념과 관계를 명확하게 구분할 수 있게 해줍니다.",
        highlights: [
          "전역적으로 고유한 식별자",
          "네임스페이스를 통한 충돌 방지",
          "웹 기반 분산 시스템 지원"
        ],
        code: "# 전체 URI 사용\n<http://example.org/people/홍길동>\n  <http://example.org/ontology/직업>\n  <http://example.org/jobs/개발자> .\n\n# 축약형 (PREFIX 사용)\n@prefix ex: <http://example.org/> .\nex:홍길동 ex:직업 ex:개발자 .",
        examples: [
          "http://example.org/people/홍길동 - 사람을 나타내는 URI",
          "http://xmlns.com/foaf/0.1/knows - 표준 관계 URI",
          "http://dbpedia.org/resource/Seoul - DBpedia의 서울 URI"
        ]
      },
      {
        title: "리터럴: 실제 값 표현",
        content: "모든 것이 URI일 필요는 없습니다. 숫자, 문자열, 날짜 같은 실제 값은 리터럴로 표현합니다.",
        narration: "이제 실제 값을 표현하는 방법을 알아봅시다. 나이가 30이라고 할 때, 30이라는 숫자 자체는 URI가 아닌 리터럴로 표현합니다. RDF는 다양한 데이터 타입을 지원합니다.",
        highlights: [
          "문자열 리터럴: \"홍길동\"",
          "숫자 리터럴: 30, 3.14",
          "타입이 있는 리터럴: \"30\"^^xsd:integer",
          "언어 태그: \"Hello\"@en, \"안녕\"@ko"
        ],
        code: "# 다양한 리터럴 예제\n:홍길동 :이름 \"홍길동\"@ko .\n:홍길동 :나이 \"30\"^^xsd:integer .\n:홍길동 :키 \"175.5\"^^xsd:float .\n:홍길동 :생일 \"1994-01-15\"^^xsd:date .\n:홍길동 :소개 \"안녕하세요\"@ko .\n:홍길동 :소개 \"Hello\"@en ."
      },
      {
        title: "RDF 직렬화: 다양한 표현 방식",
        content: "RDF는 추상적인 데이터 모델입니다. 이를 실제로 저장하고 전송하기 위해 다양한 직렬화 형식을 사용합니다.",
        narration: "RDF 데이터를 실제로 파일에 저장하거나 네트워크로 전송하려면 어떻게 해야 할까요? RDF는 여러 가지 직렬화 형식을 제공합니다. 각각의 장단점을 알아봅시다.",
        highlights: [
          "Turtle: 가장 읽기 쉬운 형식",
          "RDF/XML: 초기 표준, XML 기반",
          "JSON-LD: 웹 개발자 친화적",
          "N-Triples: 가장 단순한 형식"
        ],
        code: "# Turtle 형식\n@prefix : <http://example.org/> .\n:홍길동 :직업 :개발자 ;\n       :나이 30 ;\n       :knows :김철수 .\n\n# JSON-LD 형식\n{\n  \"@context\": \"http://example.org/\",\n  \"@id\": \"홍길동\",\n  \"직업\": {\"@id\": \"개발자\"},\n  \"나이\": 30,\n  \"knows\": {\"@id\": \"김철수\"}\n}",
        examples: [
          "Turtle: 간결하고 읽기 쉬움, 교육용으로 최적",
          "JSON-LD: JavaScript 개발자에게 친숙",
          "RDF/XML: 기업 시스템에서 많이 사용"
        ]
      },
      {
        title: "실전 예제: 소셜 네트워크 모델링",
        content: "지금까지 배운 내용을 활용하여 간단한 소셜 네트워크를 RDF로 모델링해봅시다.",
        narration: "이제 실제로 RDF를 사용해볼 시간입니다. 우리 주변의 소셜 네트워크를 RDF로 표현해보겠습니다. 사람들 간의 관계, 그들의 정보를 트리플로 나타내는 과정을 함께 해봅시다.",
        highlights: [
          "사람과 사람의 관계 표현",
          "개인 정보 모델링",
          "FOAF 온톨로지 활용"
        ],
        code: "@prefix : <http://example.org/people/> .\n@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n\n:홍길동 a foaf:Person ;\n    foaf:name \"홍길동\"@ko ;\n    foaf:age \"30\"^^xsd:integer ;\n    foaf:knows :김철수, :이영희 ;\n    foaf:workplaceHomepage <http://example.com> .\n\n:김철수 a foaf:Person ;\n    foaf:name \"김철수\"@ko ;\n    foaf:knows :홍길동 .\n\n:이영희 a foaf:Person ;\n    foaf:name \"이영희\"@ko ;\n    foaf:knows :홍길동, :김철수 ."
      },
      {
        title: "빈 노드: 익명 자원",
        content: "때로는 URI를 부여할 필요가 없는 중간 노드가 필요합니다. 이를 빈 노드(Blank Node)라고 합니다.",
        narration: "RDF에는 특별한 개념이 하나 더 있습니다. 바로 빈 노드입니다. 예를 들어, 누군가의 주소를 표현할 때, 주소 자체에 URI를 부여하기보다는 익명으로 처리하는 것이 낫습니다.",
        highlights: [
          "URI가 필요 없는 중간 구조",
          "복잡한 정보의 그룹화",
          "_:로 시작하는 로컬 식별자"
        ],
        code: "# 빈 노드를 사용한 주소 표현\n:홍길동 :주소 [\n    :도시 \"서울\" ;\n    :구 \"강남구\" ;\n    :도로명 \"테헤란로 123\" ;\n    :우편번호 \"06234\"\n] .\n\n# 빈 노드 식별자 사용\n:홍길동 :주소 _:addr1 .\n_:addr1 :도시 \"서울\" ;\n        :구 \"강남구\" ."
      },
      {
        title: "RDF 그래프: 시각적 이해",
        content: "RDF 트리플들은 함께 모여 그래프를 형성합니다. 이를 시각화하면 데이터의 관계를 직관적으로 이해할 수 있습니다.",
        narration: "여러 개의 트리플이 모이면 무엇이 될까요? 바로 그래프입니다. 노드와 엣지로 이루어진 네트워크 구조가 되는 것이죠. 이것이 바로 지식 그래프의 기초입니다.",
        highlights: [
          "노드: 주어와 목적어 (자원, 리터럴)",
          "엣지: 서술어 (관계, 속성)",
          "방향성 그래프 구조"
        ],
        examples: [
          "소셜 네트워크: 사람들과 그들의 관계",
          "조직도: 회사 구조와 직원 정보",
          "제품 카탈로그: 상품과 카테고리 관계"
        ]
      },
      {
        title: "실습: KSS RDF 에디터 활용",
        content: "이제 KSS 플랫폼의 RDF 에디터를 사용하여 직접 트리플을 만들어봅시다.",
        narration: "자, 이제 이론은 충분합니다. KSS 플랫폼의 RDF 에디터를 열고 직접 트리플을 만들어보세요. 여러분이 만든 첫 번째 지식 그래프가 될 것입니다!",
        highlights: [
          "RDF 에디터에서 트리플 생성",
          "시각화로 관계 확인",
          "SPARQL로 데이터 검색"
        ],
        code: "# 실습 과제\n# 1. 자신의 정보를 RDF로 표현하기\n:나 :이름 \"[여러분의 이름]\" .\n:나 :직업 \"[여러분의 직업]\" .\n:나 :관심분야 \"온톨로지\" .\n\n# 2. 친구 관계 추가하기\n:나 :knows :친구1 .\n:친구1 :이름 \"[친구 이름]\" .",
        quiz: {
          question: "RDF 에디터에서 트리플을 만들 때 가장 먼저 입력해야 하는 것은?",
          options: [
            "목적어 (Object)",
            "주어 (Subject)",
            "서술어 (Predicate)",
            "네임스페이스 (Namespace)"
          ],
          answer: 1
        }
      },
      {
        title: "마무리: RDF의 미래",
        content: "RDF는 단순한 데이터 형식이 아닙니다. 이는 지식을 표현하는 새로운 패러다임입니다.",
        narration: "오늘 우리는 RDF의 기초를 배웠습니다. 트리플이라는 단순한 구조가 어떻게 복잡한 지식을 표현할 수 있는지 보셨죠? 다음 시간에는 RDF를 더욱 강력하게 만드는 RDFS에 대해 알아보겠습니다.",
        highlights: [
          "지식 그래프의 기초",
          "시맨틱 웹의 핵심 기술",
          "AI와 데이터 통합의 미래"
        ],
        examples: [
          "Google Knowledge Graph",
          "Facebook Open Graph",
          "DBpedia 프로젝트"
        ]
      }
    ],
    
    // 다른 챕터들도 비슷하게 상세하게 구성
    1: [ // 온톨로지의 개념과 역사
      {
        title: "온톨로지의 어원과 정의",
        content: "온톨로지(Ontology)라는 단어는 그리스어 'ontos(존재)'와 'logos(학문)'에서 유래했습니다.\n철학에서 시작된 이 개념이 어떻게 컴퓨터 과학으로 왔을까요?",
        narration: "온톨로지. 이 낯선 단어가 21세기 지식 사회의 핵심이 되었습니다. 원래는 '존재론'이라는 철학 용어였지만, 이제는 인공지능과 데이터 과학의 중심에 있습니다.",
        highlights: [
          "그리스어 어원: ontos(존재) + logos(학문)",
          "철학적 정의: 존재하는 것들의 본질 연구",
          "컴퓨터 과학적 정의: 공유된 개념의 명시적 명세"
        ]
      },
      {
        title: "철학에서 컴퓨터 과학으로",
        content: "아리스토텔레스의 범주론부터 현대의 지식 표현까지, 온톨로지는 긴 여정을 거쳤습니다.",
        narration: "2400년 전, 아리스토텔레스는 세상의 모든 것을 10가지 범주로 나누려 했습니다. 이것이 온톨로지의 시작이었죠. 그리고 지금, 우리는 컴퓨터에게 세상을 이해시키기 위해 같은 작업을 하고 있습니다.",
        highlights: [
          "아리스토텔레스의 범주론",
          "17세기 라이프니츠의 보편 언어",
          "20세기 인공지능 연구의 필요성"
        ],
        examples: [
          "아리스토텔레스: 실체, 양, 질, 관계 등 10개 범주",
          "칸트: 12개의 판단 형식",
          "현대: 수천 개의 개념을 포함하는 온톨로지"
        ]
      },
      // ... 더 많은 섹션들
    ]
  };

  return chapterContents[chapterNumber] || getDefaultSections(chapterNumber);
}

function getDefaultSections(chapterNumber: number): DetailedSection[] {
  // 기본 섹션 구조
  return [
    {
      title: "도입",
      content: "이번 챕터의 주요 내용을 소개합니다.",
      narration: "안녕하세요! 이번 시간에는 온톨로지의 중요한 개념들을 함께 살펴보겠습니다.",
      highlights: [
        "핵심 개념 소개",
        "학습 목표 제시",
        "실습 예고"
      ]
    },
    {
      title: "이론적 배경",
      content: "이 개념이 왜 중요한지, 어떤 문제를 해결하는지 알아봅니다.",
      narration: "먼저 이론적 배경부터 차근차근 살펴보겠습니다. 이 개념이 등장하게 된 배경과 필요성을 이해하는 것이 중요합니다.",
      highlights: [
        "역사적 맥락",
        "문제 정의",
        "해결 방안"
      ]
    },
    {
      title: "핵심 개념 설명",
      content: "본격적으로 핵심 개념들을 하나씩 자세히 살펴봅니다.",
      narration: "이제 본격적으로 핵심 개념들을 알아보겠습니다. 어렵게 느껴질 수 있지만, 예제와 함께 차근차근 따라오시면 충분히 이해하실 수 있습니다.",
      highlights: [
        "주요 용어 정의",
        "개념 간 관계",
        "실제 적용 사례"
      ]
    },
    {
      title: "실습과 응용",
      content: "배운 내용을 직접 실습하고 응용해봅니다.",
      narration: "이론만으로는 부족합니다. 이제 직접 hands-on 실습을 통해 배운 내용을 체득해보겠습니다.",
      highlights: [
        "단계별 실습",
        "문제 해결",
        "응용 예제"
      ]
    },
    {
      title: "정리와 다음 단계",
      content: "오늘 배운 내용을 정리하고 다음 학습을 준비합니다.",
      narration: "오늘 배운 내용을 정리해보겠습니다. 그리고 다음 시간에 배울 내용도 미리 살펴보면서 마무리하겠습니다.",
      highlights: [
        "핵심 내용 요약",
        "추가 학습 자료",
        "다음 챕터 예고"
      ]
    }
  ];
}