'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Simulators.module.css';

interface Step {
  id: number;
  name: string;
  component: 'input' | 'embedding' | 'positional' | 'attention' | 'norm' | 'ffn' | 'output';
  description: string;
  tensorShape: { before: string; after: string };
  details: string[];
}

const TransformerStepByStep = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'encoder' | 'decoder' | 'full'>('full');
  const flowContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const encoderSteps: Step[] = [
    {
      id: 0,
      name: '입력 토큰',
      component: 'input',
      description: '텍스트를 토큰 ID로 변환',
      tensorShape: { before: 'Text: "안녕하세요"', after: '[101, 2345, 6789, 102]' },
      details: [
        '텍스트를 토크나이저로 분해',
        '각 토큰을 고유 ID로 매핑',
        '[CLS], [SEP] 등 특수 토큰 추가'
      ]
    },
    {
      id: 1,
      name: '임베딩',
      component: 'embedding',
      description: '토큰 ID를 고차원 벡터로 변환',
      tensorShape: { before: '[batch, seq_len]', after: '[batch, seq_len, d_model]' },
      details: [
        '각 토큰 ID를 512차원 벡터로 변환',
        '학습 가능한 임베딩 테이블 사용',
        '의미적으로 유사한 토큰은 가까운 벡터'
      ]
    },
    {
      id: 2,
      name: '위치 인코딩',
      component: 'positional',
      description: '토큰의 순서 정보 추가',
      tensorShape: { before: '[batch, seq_len, d_model]', after: '[batch, seq_len, d_model]' },
      details: [
        'sin/cos 함수로 위치 정보 인코딩',
        '각 위치마다 고유한 패턴 생성',
        '임베딩에 더해서 위치 정보 주입'
      ]
    },
    {
      id: 3,
      name: 'Multi-Head Attention',
      component: 'attention',
      description: '토큰 간의 관계 계산',
      tensorShape: { before: '[batch, seq_len, d_model]', after: '[batch, seq_len, d_model]' },
      details: [
        'Q, K, V 행렬로 변환',
        '8개 헤드로 병렬 처리',
        '각 토큰이 다른 토큰에 주목하는 정도 계산'
      ]
    },
    {
      id: 4,
      name: 'Add & Norm',
      component: 'norm',
      description: '잔차 연결과 정규화',
      tensorShape: { before: '[batch, seq_len, d_model]', after: '[batch, seq_len, d_model]' },
      details: [
        '입력을 출력에 더함 (잔차 연결)',
        'Layer Normalization 적용',
        '학습 안정성과 속도 향상'
      ]
    },
    {
      id: 5,
      name: 'Feed Forward',
      component: 'ffn',
      description: '비선형 변환 적용',
      tensorShape: { before: '[batch, seq_len, d_model]', after: '[batch, seq_len, d_model]' },
      details: [
        '2개 선형 레이어 + ReLU',
        '차원을 4배로 확장 후 다시 축소',
        '각 위치에서 독립적으로 처리'
      ]
    },
    {
      id: 6,
      name: 'Add & Norm',
      component: 'norm',
      description: '최종 정규화',
      tensorShape: { before: '[batch, seq_len, d_model]', after: '[batch, seq_len, d_model]' },
      details: [
        'FFN 입력을 출력에 더함',
        '최종 Layer Normalization',
        '다음 레이어로 전달 준비 완료'
      ]
    }
  ];

  const decoderSteps: Step[] = [
    {
      id: 0,
      name: '출력 임베딩',
      component: 'embedding',
      description: '이전까지 생성된 토큰들을 임베딩',
      tensorShape: { before: '[batch, tgt_len]', after: '[batch, tgt_len, d_model]' },
      details: [
        '디코더 입력 토큰 임베딩',
        '학습 시: shifted right',
        '추론 시: 이전까지 생성된 토큰'
      ]
    },
    {
      id: 1,
      name: 'Masked Self-Attention',
      component: 'attention',
      description: '미래 토큰을 보지 못하도록 마스킹',
      tensorShape: { before: '[batch, tgt_len, d_model]', after: '[batch, tgt_len, d_model]' },
      details: [
        '현재와 이전 토큰만 참조',
        '상삼각 행렬로 마스킹',
        '자기회귀적 생성 보장'
      ]
    },
    {
      id: 2,
      name: 'Cross-Attention',
      component: 'attention',
      description: '인코더 출력을 참조',
      tensorShape: { before: '[batch, tgt_len, d_model]', after: '[batch, tgt_len, d_model]' },
      details: [
        'Query: 디코더 상태',
        'Key, Value: 인코더 출력',
        '소스 문장의 어느 부분에 주목할지 결정'
      ]
    },
    {
      id: 3,
      name: 'Linear & Softmax',
      component: 'output',
      description: '다음 토큰 확률 분포 생성',
      tensorShape: { before: '[batch, tgt_len, d_model]', after: '[batch, tgt_len, vocab_size]' },
      details: [
        '선형 변환으로 어휘 크기로 투영',
        'Softmax로 확률 분포 생성',
        '가장 높은 확률의 토큰 선택'
      ]
    }
  ];

  const fullTransformerSteps: Step[] = [
    {
      id: 0,
      name: '소스 입력',
      component: 'input',
      description: '번역할 원문 텍스트 입력',
      tensorShape: { before: '"Hello World"', after: '[101, 7592, 2088, 102]' },
      details: [
        '소스 언어 텍스트 토큰화',
        '특수 토큰 [CLS], [SEP] 추가',
        '토큰을 ID로 변환'
      ]
    },
    {
      id: 1,
      name: '인코더 임베딩',
      component: 'embedding',
      description: '소스 토큰을 벡터로 변환',
      tensorShape: { before: '[batch, src_len]', after: '[batch, src_len, d_model]' },
      details: [
        '각 토큰 ID를 고차원 벡터로 매핑',
        '위치 인코딩 추가',
        '인코더 입력 준비'
      ]
    },
    {
      id: 2,
      name: '인코더 처리',
      component: 'attention',
      description: '소스 문장 이해 및 인코딩',
      tensorShape: { before: '[batch, src_len, d_model]', after: '[batch, src_len, d_model]' },
      details: [
        'Self-Attention으로 문맥 파악',
        '6개 레이어 반복 처리',
        '소스 문장의 의미 표현 생성'
      ]
    },
    {
      id: 3,
      name: '타겟 입력',
      component: 'input',
      description: '생성 중인 타겟 텍스트',
      tensorShape: { before: '"안녕"', after: '[101, 12345]' },
      details: [
        '이전까지 생성된 타겟 토큰',
        '학습 시: Teacher forcing',
        '추론 시: 자기회귀적 생성'
      ]
    },
    {
      id: 4,
      name: '디코더 임베딩',
      component: 'embedding',
      description: '타겟 토큰 벡터화',
      tensorShape: { before: '[batch, tgt_len]', after: '[batch, tgt_len, d_model]' },
      details: [
        '타겟 토큰 임베딩',
        '위치 인코딩 추가',
        '디코더 입력 준비'
      ]
    },
    {
      id: 5,
      name: 'Masked Attention',
      component: 'attention',
      description: '미래 토큰 마스킹',
      tensorShape: { before: '[batch, tgt_len, d_model]', after: '[batch, tgt_len, d_model]' },
      details: [
        '현재와 이전 토큰만 참조',
        '미래 정보 차단',
        '자기회귀적 생성 보장'
      ]
    },
    {
      id: 6,
      name: 'Cross-Attention',
      component: 'attention',
      description: '인코더-디코더 연결',
      tensorShape: { before: '[batch, tgt_len, d_model]', after: '[batch, tgt_len, d_model]' },
      details: [
        'Query: 디코더 상태',
        'Key, Value: 인코더 출력',
        '소스의 어느 부분을 참조할지 결정',
        '번역의 정렬(alignment) 학습'
      ]
    },
    {
      id: 7,
      name: '다음 토큰 예측',
      component: 'output',
      description: '확률 분포 생성',
      tensorShape: { before: '[batch, tgt_len, d_model]', after: '[batch, tgt_len, vocab_size]' },
      details: [
        '선형 변환으로 어휘 크기로 투영',
        'Softmax로 확률 계산',
        '가장 높은 확률의 토큰 선택',
        '"세계" 토큰 생성'
      ]
    }
  ];

  const steps = mode === 'encoder' ? encoderSteps : 
                mode === 'decoder' ? decoderSteps : 
                fullTransformerSteps;

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length]);

  // 현재 단계로 자동 스크롤
  useEffect(() => {
    const container = flowContainerRef.current;
    const stepElement = stepRefs.current[currentStep];
    
    if (container && stepElement) {
      const containerRect = container.getBoundingClientRect();
      const stepRect = stepElement.getBoundingClientRect();
      
      // 스텝이 컨테이너 밖에 있는지 확인
      if (stepRect.left < containerRect.left || stepRect.right > containerRect.right) {
        // 스텝을 중앙으로 스크롤
        const scrollLeft = stepElement.offsetLeft - (container.offsetWidth / 2) + (stepElement.offsetWidth / 2);
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [currentStep]);

  const getComponentColor = (type: string) => {
    const colors = {
      input: '#FF6B6B',
      embedding: '#F9844A',
      positional: '#FEE77A',
      attention: '#4ECDC4',
      norm: '#45B7D1',
      ffn: '#9B5DE5',
      output: '#F15BB5'
    };
    return colors[type as keyof typeof colors] || '#666';
  };

  const renderFlowDiagram = () => {
    return (
      <div className={styles.flowDiagram}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isPassed = index < currentStep;
          
          return (
            <div 
              key={step.id} 
              className={styles.flowStep}
              ref={(el) => { stepRefs.current[index] = el; }}
            >
              <div className={styles.flowConnector}>
                {index > 0 && (
                  <div 
                    className={`${styles.flowLine} ${isPassed ? styles.passed : ''}`}
                  />
                )}
              </div>
              
              <div
                className={`${styles.flowBox} ${isActive ? styles.active : ''} ${isPassed ? styles.passed : ''}`}
                style={{
                  borderColor: getComponentColor(step.component),
                  backgroundColor: isActive ? getComponentColor(step.component) + '20' : 'transparent'
                }}
                onClick={() => setCurrentStep(index)}
              >
                <div 
                  className={styles.flowIcon}
                  style={{ backgroundColor: getComponentColor(step.component) }}
                >
                  {index + 1}
                </div>
                <span>{step.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const currentStepData = steps[currentStep];

  return (
    <div className={styles.simulator}>
      <div className={styles.header}>
        <h3>📊 Transformer 단계별 애니메이션</h3>
        <p>Transformer의 데이터 처리 과정을 단계별로 이해해보세요</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.modeSelection}>
          <button
            className={mode === 'full' ? styles.active : ''}
            onClick={() => {
              setMode('full');
              setCurrentStep(0);
              setIsPlaying(false);
            }}
          >
            전체 구조
          </button>
          <button
            className={mode === 'encoder' ? styles.active : ''}
            onClick={() => {
              setMode('encoder');
              setCurrentStep(0);
              setIsPlaying(false);
            }}
          >
            인코더만
          </button>
          <button
            className={mode === 'decoder' ? styles.active : ''}
            onClick={() => {
              setMode('decoder');
              setCurrentStep(0);
              setIsPlaying(false);
            }}
          >
            디코더만
          </button>
        </div>

        <div className={styles.playbackControls}>
          <button
            className={styles.prevBtn}
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            이전
          </button>
          <button
            className={`${styles.playBtn} ${isPlaying ? styles.playing : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '일시정지' : '재생'}
          </button>
          <button
            className={styles.nextBtn}
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
          >
            다음
          </button>
          <button
            className={styles.resetBtn}
            onClick={() => {
              setCurrentStep(0);
              setIsPlaying(false);
            }}
          >
            처음으로
          </button>
        </div>
      </div>

      <div className={styles.results}>
        <div className={styles.flowContainer} ref={flowContainerRef}>
          {renderFlowDiagram()}
        </div>

        <div className={styles.stepDetails}>
          <div className={styles.stepHeader}>
            <h4 
              style={{ color: getComponentColor(currentStepData.component) }}
            >
              Step {currentStep + 1}: {currentStepData.name}
            </h4>
            <p className={styles.stepDescription}>{currentStepData.description}</p>
          </div>

          <div className={styles.tensorTransform}>
            <div className={styles.tensorBox}>
              <span className={styles.tensorLabel}>입력 텐서</span>
              <code>{currentStepData.tensorShape.before}</code>
            </div>
            <div className={styles.transformArrow}>→</div>
            <div className={styles.tensorBox}>
              <span className={styles.tensorLabel}>출력 텐서</span>
              <code>{currentStepData.tensorShape.after}</code>
            </div>
          </div>

          <div className={styles.stepDetailsList}>
            <h5>상세 설명</h5>
            <ul>
              {currentStepData.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          {currentStepData.component === 'attention' && (
            <div className={styles.attentionVisualization}>
              <h5>Attention 시각화</h5>
              <div className={styles.miniAttentionMatrix}>
                {currentStepData.name === 'Cross-Attention' ? (
                  <div className={styles.crossAttentionDisplay}>
                    <div className={styles.crossAttentionSide}>
                      <h6>디코더 (Query)</h6>
                      <div className={styles.tokenList}>
                        {['안녕', '세계'].map((token, i) => (
                          <div key={i} className={styles.tokenItem}>{token}</div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.crossAttentionMatrix}>
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className={styles.attentionRow}>
                          {[...Array(4)].map((_, j) => (
                            <div
                              key={j}
                              className={styles.attentionCell}
                              style={{
                                backgroundColor: `rgba(59, 130, 246, ${Math.random() * 0.8 + 0.2})`,
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className={styles.crossAttentionSide}>
                      <h6>인코더 (Key/Value)</h6>
                      <div className={styles.tokenList}>
                        {['Hello', 'World', '[SEP]', '[PAD]'].map((token, i) => (
                          <div key={i} className={styles.tokenItem}>{token}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.attentionGrid}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={styles.attentionRow}>
                        {[...Array(4)].map((_, j) => (
                          <div
                            key={j}
                            className={styles.attentionCell}
                            style={{
                              backgroundColor: `rgba(59, 130, 246, ${Math.random() * 0.8 + 0.2})`,
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                <p className={styles.attentionCaption}>
                  {currentStepData.name === 'Cross-Attention' 
                    ? '디코더가 인코더의 어느 부분에 주목하는지 보여줍니다'
                    : '각 셀은 토큰 간의 attention 가중치를 나타냅니다'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.progressIndicator}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {currentStep + 1} / {steps.length} 단계
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransformerStepByStep;