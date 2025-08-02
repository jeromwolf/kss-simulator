export const moduleMetadata = {
  title: '자율주행 & 미래 모빌리티',
  description: 'AI 기반 자율주행 기술과 차세대 모빌리티 생태계를 완전 정복하는 실전 학습 플랫폼',
  duration: '16시간',
  level: 'advanced' as const,
  themeColor: 'from-cyan-500 to-blue-600',
  chapters: [
    {
      id: 1,
      title: '자율주행의 진화와 미래',
      description: '자율주행 기술의 역사와 레벨별 분류, 글로벌 트렌드',
      duration: '90분',
      learningObjectives: [
        'SAE 자율주행 레벨 0-5 완전 이해',
        '글로벌 자율주행 기업 생태계 분석',
        '기술 발전 로드맵과 상용화 전망',
        '법규 및 윤리적 이슈 고찰'
      ]
    },
    {
      id: 2,
      title: '센서 융합과 인지 시스템',
      description: 'LiDAR, 카메라, 레이더 센서 융합 기술',
      duration: '2시간',
      learningObjectives: [
        'LiDAR 포인트 클라우드 처리',
        '컴퓨터 비전 기반 객체 인식',
        '레이더 신호 처리와 FMCW',
        '센서 퓨전 알고리즘 구현',
        'HD맵과 실시간 매핑'
      ]
    },
    {
      id: 3,
      title: 'AI & 딥러닝 응용',
      description: '자율주행을 위한 딥러닝 모델과 실시간 추론',
      duration: '2시간 30분',
      learningObjectives: [
        'YOLO, R-CNN 객체 탐지 모델',
        'Semantic Segmentation',
        '행동 예측과 경로 계획 AI',
        'End-to-End 학습 접근법',
        'Edge Computing과 최적화'
      ]
    },
    {
      id: 4,
      title: '경로 계획과 제어',
      description: '동적 환경에서의 실시간 경로 계획과 차량 제어',
      duration: '2시간',
      learningObjectives: [
        'A* 및 RRT 경로 계획 알고리즘',
        '동적 장애물 회피',
        'PID 제어와 MPC 모델',
        '차량 동역학 모델링',
        '실시간 의사결정 시스템'
      ]
    },
    {
      id: 5,
      title: 'V2X 통신과 스마트 인프라',
      description: 'Vehicle-to-Everything 통신과 스마트 교통 시스템',
      duration: '90분',
      learningObjectives: [
        'V2V, V2I, V2P 통신 프로토콜',
        '5G와 C-V2X 기술',
        '스마트 신호등과 교통 최적화',
        'Cooperative Driving',
        '사이버보안과 데이터 프라이버시'
      ]
    },
    {
      id: 6,
      title: '시뮬레이션과 검증',
      description: 'CARLA, AirSim을 활용한 가상 테스트 환경',
      duration: '2시간',
      learningObjectives: [
        'CARLA 시뮬레이터 활용',
        'AirSim과 Unreal Engine',
        '시나리오 기반 테스트',
        'Digital Twin 구축',
        'Hardware-in-the-Loop 테스트'
      ]
    },
    {
      id: 7,
      title: '전동화와 배터리 관리',
      description: 'EV 기술과 배터리 최적화, 충전 인프라',
      duration: '90분',
      learningObjectives: [
        'EV 파워트레인 시스템',
        'BMS와 배터리 상태 추정',
        '급속충전과 무선충전 기술',
        '에너지 효율 최적화',
        '배터리 열관리 시스템'
      ]
    },
    {
      id: 8,
      title: 'MaaS와 미래 모빌리티',
      description: 'Mobility as a Service와 새로운 교통 패러다임',
      duration: '2시간',
      learningObjectives: [
        'MaaS 플랫폼 아키텍처',
        '공유 모빌리티 최적화',
        'Urban Air Mobility (UAM)',
        '하이퍼루프와 차세대 교통',
        '지속가능한 모빌리티 생태계'
      ]
    }
  ],
  simulators: [
    {
      id: 'sensor-fusion-lab',
      title: '센서 퓨전 실험실',
      description: 'LiDAR, 카메라, 레이더 데이터를 실시간으로 융합하여 3D 환경 인식'
    },
    {
      id: 'autonomous-driving-sim',
      title: '자율주행 시뮬레이터',
      description: 'CARLA 기반 가상 환경에서 자율주행 알고리즘 테스트'
    },
    {
      id: 'path-planning-visualizer',
      title: '경로 계획 시각화 도구',
      description: 'A*, RRT 알고리즘으로 동적 장애물 환경에서 최적 경로 계획'
    },
    {
      id: 'v2x-network-sim',
      title: 'V2X 네트워크 시뮬레이터',
      description: '차량간 통신과 스마트 인프라 연동 시뮬레이션'
    }
  ]
}