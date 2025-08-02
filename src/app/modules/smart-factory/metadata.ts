export const moduleMetadata = {
  title: 'Smart Factory & Industry 4.0',
  description: '스마트 팩토리 자동화와 예측 유지보수, 디지털 트윈까지 산업 AI 기술 완전 정복',
  duration: '20시간',
  level: 'intermediate' as const,
  themeColor: 'from-amber-500 to-orange-600',
  chapters: [
    {
      id: 1,
      title: 'Industry 4.0 개요와 스마트 팩토리 기초',
      description: '4차 산업혁명과 스마트 팩토리의 핵심 개념 및 글로벌 동향',
      duration: '2시간',
      learningObjectives: [
        'Industry 4.0의 핵심 기술과 특징 이해',
        '스마트 팩토리 구성 요소와 아키텍처',
        '독일 Industrie 4.0, 미국 Advanced Manufacturing 전략 분석',
        '국내 스마트 제조혁신 2025 정책 및 사례'
      ]
    },
    {
      id: 2,
      title: 'IoT & 센서 네트워크',
      description: '산업용 IoT와 센서 기술, 실시간 데이터 수집 시스템',
      duration: '2시간 30분',
      learningObjectives: [
        '산업용 IoT 센서의 종류와 특성',
        'MQTT, OPC-UA 등 산업 통신 프로토콜',
        '엣지 컴퓨팅과 실시간 데이터 처리',
        '센서 데이터 품질 관리와 노이즈 필터링'
      ]
    },
    {
      id: 3,
      title: 'MES & ERP 시스템 통합',
      description: 'Manufacturing Execution System과 Enterprise Resource Planning 연동',
      duration: '2시간',
      learningObjectives: [
        'MES 시스템의 기능과 역할',
        'ERP와 MES 간 데이터 연동',
        'SAP, Oracle 등 주요 ERP 솔루션',
        '생산 계획 최적화와 스케줄링'
      ]
    },
    {
      id: 4,
      title: '예측 유지보수 (Predictive Maintenance)',
      description: 'AI 기반 장비 고장 예측과 유지보수 최적화',
      duration: '3시간',
      learningObjectives: [
        '진동, 온도, 압력 등 센서 데이터 분석',
        '시계열 분석과 이상 감지 알고리즘',
        'RUL(Remaining Useful Life) 예측 모델',
        'LSTM, CNN 기반 고장 예측 시스템',
        'CBM(Condition Based Maintenance) 전략'
      ]
    },
    {
      id: 5,
      title: '품질 관리 AI',
      description: '컴퓨터 비전과 머신러닝을 활용한 자동 품질 검사',
      duration: '2시간 30분',
      learningObjectives: [
        '머신 비전 시스템 구성과 원리',
        'YOLO, Faster R-CNN 기반 결함 검출',
        'OCR과 바코드/QR 코드 인식',
        'SPC(Statistical Process Control) 차트',
        '6시그마와 품질 개선 방법론'
      ]
    },
    {
      id: 6,
      title: '디지털 트윈 (Digital Twin)',
      description: '실물 공장의 가상 복제본 구축과 시뮬레이션',
      duration: '3시간',
      learningObjectives: [
        '디지털 트윈의 개념과 구성 요소',
        '3D 모델링과 물리 시뮬레이션',
        'Unity 3D, Unreal Engine 활용',
        '실시간 동기화와 데이터 바인딩',
        'What-if 시나리오 분석'
      ]
    },
    {
      id: 7,
      title: '로봇 공학과 자동화',
      description: '산업용 로봇과 협동 로봇을 활용한 생산 자동화',
      duration: '2시간 30분',
      learningObjectives: [
        '산업용 로봇의 종류와 특성',
        '협동 로봇(Cobot)과 안전 시스템',
        'ROS(Robot Operating System) 기초',
        '로봇 경로 계획과 제어',
        'AGV(Automated Guided Vehicle) 시스템'
      ]
    },
    {
      id: 8,
      title: '스마트 팩토리 보안과 미래 전망',
      description: '사이버 보안, 표준화, 그리고 스마트 팩토리의 미래',
      duration: '2시간',
      learningObjectives: [
        '산업 제어 시스템 보안 위협',
        'OT(Operational Technology) 보안',
        'ISO 27001, IEC 62443 보안 표준',
        '5G, 6G 기반 스마트 팩토리',
        '지속가능한 제조업과 그린 팩토리'
      ]
    }
  ],
  simulators: [
    {
      id: 'production-line-monitor',
      title: '생산 라인 모니터링',
      description: '실시간 생산 라인 상태 모니터링과 KPI 대시보드'
    },
    {
      id: 'predictive-maintenance-lab',
      title: '예측 유지보수 실험실',
      description: '센서 데이터 기반 장비 고장 예측과 RUL 분석'
    },
    {
      id: 'quality-control-vision',
      title: '품질 관리 비전 시스템',
      description: 'AI 기반 자동 품질 검사와 결함 분류'
    },
    {
      id: 'digital-twin-factory',
      title: '디지털 트윈 팩토리',
      description: '3D 가상 공장과 실시간 시뮬레이션 환경'
    }
  ]
}