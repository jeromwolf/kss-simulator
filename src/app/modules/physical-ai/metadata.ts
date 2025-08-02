export const moduleMetadata = {
  id: 'physical-ai',
  title: 'Physical AI & 실세계 지능',
  description: '현실 세계와 상호작용하는 AI 시스템의 설계와 구현',
  category: '물리AI',
  difficulty: 'advanced' as const,
  duration: '20시간',
  chapters: [
    {
      id: 1,
      title: 'Physical AI 개요와 미래',
      description: 'Physical AI의 개념, 역사, 그리고 미래 전망',
      duration: '2.5시간',
      learningObjectives: [
        'Physical AI의 정의와 핵심 개념 이해',
        'Digital AI vs Physical AI 차이점 분석',
        '젠슨 황의 COSMOS 비전과 Physical AI 생태계',
        '실세계 AI 응용 분야별 사례 연구',
        'Physical AI 기술 로드맵과 발전 방향'
      ]
    },
    {
      id: 2,
      title: '로보틱스와 제어 시스템',
      description: '로봇 제어, 센서 융합, 그리고 실시간 의사결정',
      duration: '3시간',
      learningObjectives: [
        '로봇 운동학과 동역학 기초',
        '센서 데이터 융합 및 상태 추정',
        'PID, MPC 등 고급 제어 알고리즘',
        'ROS 기반 로봇 프로그래밍',
        '실시간 시스템과 안전성 보장'
      ]
    },
    {
      id: 3,
      title: '컴퓨터 비전과 인식',
      description: '실시간 객체 인식, 3D 인식, 그리고 시각적 SLAM',
      duration: '2.5시간',
      learningObjectives: [
        'CNN, Transformer 기반 실시간 객체 탐지',
        '3D 점군 처리와 깊이 추정',
        'Visual SLAM과 동시 위치추정-매핑',
        'Edge AI와 경량화 모델 최적화',
        '다중 센서 융합과 센서 캘리브레이션'
      ]
    },
    {
      id: 4,
      title: '강화학습과 제어',
      description: '실세계 환경에서의 강화학습 적용과 sim2real',
      duration: '3시간',
      learningObjectives: [
        '실세계 강화학습의 도전과제',
        'Sim2Real: 시뮬레이션에서 현실로',
        'Model-based vs Model-free RL',
        'Safe RL과 제약 조건 하 학습',
        'Multi-agent RL과 협력 제어'
      ]
    },
    {
      id: 5,
      title: 'IoT와 엣지 컴퓨팅',
      description: 'IoT 네트워크, 엣지 AI, 그리고 분산 인텔리전스',
      duration: '2.5시간',
      learningObjectives: [
        'IoT 아키텍처와 통신 프로토콜',
        'Edge AI 하드웨어와 최적화',
        '분산 AI와 연합 학습',
        '실시간 데이터 처리와 스트리밍',
        'Digital Twin과 CPS(Cyber-Physical Systems)'
      ]
    },
    {
      id: 6,
      title: '자율주행과 모빌리티',
      description: '자율주행 기술과 스마트 모빌리티 시스템',
      duration: '2.5시간',
      learningObjectives: [
        '자율주행 인식-판단-제어 파이프라인',
        'HD 맵과 위치추정 기술',
        'V2X 통신과 협력 주행',
        '경로 계획과 행동 예측',
        '자율주행 안전성과 검증'
      ]
    },
    {
      id: 7,
      title: '산업 자동화와 스마트 팩토리',
      description: '제조업에서의 Physical AI 적용과 Industry 4.0',
      duration: '2시간',
      learningObjectives: [
        'Industry 4.0과 스마트 팩토리',
        '예측 유지보수와 품질 관리',
        '협동 로봇(Cobot)과 인간-로봇 협업',
        '디지털 트윈과 가상 시운전',
        '공급망 최적화와 물류 자동화'
      ]
    },
    {
      id: 8,
      title: '휴머노이드와 미래 AI',
      description: '휴머노이드 로봇과 AGI로의 발전',
      duration: '2시간',
      learningObjectives: [
        '휴머노이드 로봇의 현재와 미래',
        'Tesla Bot, Boston Dynamics의 기술',
        '멀티모달 AI와 실세계 상호작용',
        'AGI와 Physical AI의 융합',
        '윤리적 고려사항과 사회적 영향'
      ]
    }
  ],
  simulators: [
    {
      id: 'robot-control-lab',
      title: '로봇 제어 실험실',
      description: '로봇 팔 제어와 경로 계획 시뮬레이션',
      difficulty: 'intermediate'
    },
    {
      id: 'sensor-fusion-sim',
      title: '센서 융합 시뮬레이터',
      description: '다중 센서 데이터 융합과 칼만 필터링',
      difficulty: 'advanced'
    },
    {
      id: 'edge-ai-optimizer',
      title: 'Edge AI 최적화 도구',
      description: '모델 경량화와 하드웨어 가속 최적화',
      difficulty: 'intermediate'
    },
    {
      id: 'digital-twin-builder',
      title: '디지털 트윈 빌더',
      description: 'CPS 시스템과 디지털 트윈 구성',
      difficulty: 'advanced'
    }
  ],
  prerequisites: ['AI/ML 기초', '파이썬 프로그래밍', '선형대수', '확률/통계'],
  outcomes: [
    'Physical AI 시스템 설계 및 구현 능력',
    '로봇 제어와 센서 융합 기술 습득',
    'Edge AI와 실시간 시스템 개발 경험',
    '실세계 AI 응용 프로젝트 완성'
  ],
  tools: [
    'ROS/ROS2', 'OpenCV', 'PyTorch/TensorFlow', 
    'Gazebo', 'CARLA', 'Unity ML-Agents',
    'TensorRT', 'OpenVINO', 'ONNX'
  ]
}