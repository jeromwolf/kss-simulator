export const moduleMetadata = {
  title: 'Quantum Computing & 양자 알고리즘',
  description: '양자역학 기초부터 양자 머신러닝까지 차세대 컴퓨팅 기술 완전 정복',
  duration: '24시간',
  level: 'advanced' as const,
  themeColor: 'from-purple-500 to-violet-600',
  chapters: [
    {
      id: 1,
      title: '양자역학과 큐비트 기초',
      description: '양자 상태, 중첩, 얽힘의 기본 개념과 큐비트 표현',
      duration: '3시간',
      learningObjectives: [
        '양자역학의 기본 원리와 고전 컴퓨팅과의 차이점',
        '큐비트의 정의와 블로흐 구면 표현',
        '양자 중첩과 측정의 개념',
        'Dirac 표기법과 양자 상태 벡터'
      ]
    },
    {
      id: 2,
      title: '양자 게이트와 회로 설계',
      description: '기본 양자 게이트들과 양자 회로 구성 원리',
      duration: '3시간 30분',
      learningObjectives: [
        'Pauli 게이트(X, Y, Z)와 Hadamard 게이트',
        'CNOT, Toffoli 등 다중 큐비트 게이트',
        '양자 회로 다이어그램 읽기와 작성',
        '유니터리 행렬과 양자 연산의 가역성'
      ]
    },
    {
      id: 3,
      title: '양자 알고리즘 I: Deutsch-Jozsa & Grover',
      description: '고전적 탐색 알고리즘을 넘어서는 양자 알고리즘',
      duration: '3시간',
      learningObjectives: [
        'Deutsch-Jozsa 알고리즘과 양자 병렬성',
        'Grover 알고리즘의 탐색 증폭 원리',
        '양자 오라클 함수 설계',
        '양자 우위(Quantum Advantage) 개념'
      ]
    },
    {
      id: 4,
      title: '양자 알고리즘 II: Shor의 소인수분해',
      description: '암호학을 위협하는 양자 소인수분해 알고리즘',
      duration: '3시간 30분',
      learningObjectives: [
        '모듈러 지수 연산과 주기 찾기 문제',
        '양자 푸리에 변환(QFT)의 원리',
        'Shor 알고리즘의 단계별 구현',
        'RSA 암호화에 대한 양자 위협'
      ]
    },
    {
      id: 5,
      title: '양자 오류 정정과 내결함성',
      description: '양자 컴퓨터의 노이즈 문제와 오류 정정 기법',
      duration: '3시간',
      learningObjectives: [
        '양자 디코히어런스와 노이즈 모델',
        '3-큐비트 비트 플립 코드',
        '7-큐비트 Steane 코드',
        'Surface Code와 Topological 양자 컴퓨팅'
      ]
    },
    {
      id: 6,
      title: '양자 머신러닝과 NISQ 알고리즘',
      description: '근미래 양자 컴퓨터를 위한 머신러닝 응용',
      duration: '3시간',
      learningObjectives: [
        'NISQ(Noisy Intermediate-Scale Quantum) 시대',
        'Variational Quantum Eigensolver (VQE)',
        'Quantum Approximate Optimization Algorithm (QAOA)',
        'Quantum Neural Networks와 PennyLane'
      ]
    },
    {
      id: 7,
      title: '양자 컴퓨팅 하드웨어와 플랫폼',
      description: '양자 컴퓨터의 물리적 구현과 클라우드 플랫폼',
      duration: '2시간 30분',
      learningObjectives: [
        '초전도 큐비트와 IBM Quantum 시스템',
        '이온 트랩과 IonQ 플랫폼',
        '광자 기반 양자 컴퓨팅',
        'Qiskit, Cirq, Amazon Braket 비교'
      ]
    },
    {
      id: 8,
      title: '양자 컴퓨팅의 미래와 응용 분야',
      description: '양자 컴퓨팅이 가져올 혁신과 산업 응용',
      duration: '2시간 30분',
      learningObjectives: [
        '양자 시뮬레이션과 화학/신약 개발',
        '양자 금융 모델링과 리스크 분석',
        '양자 암호학과 양자 인터넷',
        '양자 우위 달성 로드맵과 투자 동향'
      ]
    }
  ],
  simulators: [
    {
      id: 'quantum-circuit-builder',
      title: '양자 회로 빌더',
      description: '드래그앤드롭으로 양자 회로를 설계하고 시뮬레이션'
    },
    {
      id: 'qubit-visualizer',
      title: '큐비트 상태 시각화',
      description: '블로흐 구면에서 큐비트 상태와 연산 실시간 시각화'
    },
    {
      id: 'quantum-algorithm-lab',
      title: '양자 알고리즘 실험실',
      description: 'Grover, Shor 등 주요 양자 알고리즘 단계별 실행'
    },
    {
      id: 'quantum-error-correction',
      title: '양자 오류 정정 시뮬레이터',
      description: '노이즈 모델과 오류 정정 코드 성능 비교 분석'
    }
  ]
}