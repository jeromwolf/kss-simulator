export const moduleMetadata = {
  title: 'Web3 & Blockchain',
  description: '블록체인 기술과 Web3 생태계를 체험하는 실전 학습 플랫폼',
  duration: '12시간',
  level: 'intermediate',
  chapters: [
    {
      id: 1,
      title: '블록체인 기초',
      description: '블록체인의 핵심 개념과 작동 원리',
      duration: '90분',
      learningObjectives: [
        '블록체인의 기본 구조와 원리 이해',
        '합의 메커니즘 (PoW, PoS) 학습',
        '암호화폐와 토큰 이코노미',
        '분산 원장 기술의 장단점'
      ]
    },
    {
      id: 2,
      title: 'Ethereum & Smart Contracts',
      description: '이더리움과 스마트 컨트랙트 개발',
      duration: '120분',
      learningObjectives: [
        'Ethereum Virtual Machine (EVM) 이해',
        'Solidity 프로그래밍 기초',
        '스마트 컨트랙트 작성과 배포',
        'Gas 최적화 전략'
      ]
    },
    {
      id: 3,
      title: 'DeFi (탈중앙화 금융)',
      description: 'DeFi 프로토콜의 이해와 활용',
      duration: '90분',
      learningObjectives: [
        '스테이블코인 유형과 메커니즘',
        'AMM과 유동성 풀 메커니즘',
        'Lending/Borrowing 프로토콜',
        'Yield Farming과 스테이킹',
        'Impermanent Loss 이해'
      ]
    },
    {
      id: 4,
      title: 'NFT & Digital Assets',
      description: 'NFT 생태계와 디지털 자산',
      duration: '90분',
      learningObjectives: [
        'ERC-721과 ERC-1155 표준',
        'NFT 민팅과 마켓플레이스',
        'IPFS와 메타데이터 저장',
        'NFT 유틸리티와 활용 사례'
      ]
    },
    {
      id: 5,
      title: 'Web3 개발 스택',
      description: 'Web3 애플리케이션 개발 도구와 프레임워크',
      duration: '90분',
      learningObjectives: [
        'Web3.js와 Ethers.js 사용법',
        'Hardhat과 Truffle 개발 환경',
        'MetaMask 통합과 지갑 연결',
        'The Graph와 인덱싱'
      ]
    },
    {
      id: 6,
      title: 'Layer 2 & Scaling',
      description: '확장성 솔루션과 Layer 2 기술',
      duration: '60분',
      learningObjectives: [
        'Rollups (Optimistic vs ZK)',
        'Polygon, Arbitrum, Optimism',
        '브릿지와 크로스체인',
        '확장성 트릴레마'
      ]
    },
    {
      id: 7,
      title: 'DAO & Governance',
      description: '탈중앙화 자율 조직과 거버넌스',
      duration: '60분',
      learningObjectives: [
        'DAO의 구조와 운영 방식',
        '온체인 거버넌스 메커니즘',
        '투표 시스템과 제안 프로세스',
        'Treasury 관리'
      ]
    },
    {
      id: 8,
      title: 'Web3 보안 & 감사',
      description: '스마트 컨트랙트 보안과 감사',
      duration: '90분',
      learningObjectives: [
        '일반적인 취약점과 공격 벡터',
        'Reentrancy, Flash Loan 공격',
        '보안 감사 도구와 방법론',
        'Bug Bounty와 보안 베스트 프랙티스'
      ]
    }
  ],
  simulators: [
    {
      id: 'blockchain-explorer',
      title: '블록체인 익스플로러',
      description: '실시간 블록체인 트랜잭션과 블록 탐색'
    },
    {
      id: 'smart-contract-ide',
      title: '스마트 컨트랙트 IDE',
      description: 'Solidity 코드 작성과 실시간 컴파일'
    },
    {
      id: 'defi-simulator',
      title: 'DeFi 프로토콜 시뮬레이터',
      description: 'AMM, Lending, Staking 체험'
    },
    {
      id: 'nft-minter',
      title: 'NFT 민팅 스튜디오',
      description: 'NFT 생성과 메타데이터 관리'
    },
    {
      id: 'gas-optimizer',
      title: 'Gas 최적화 도구',
      description: '스마트 컨트랙트 Gas 사용량 분석 및 최적화'
    }
  ]
}