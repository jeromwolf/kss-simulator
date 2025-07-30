'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './LLMSimulators.module.css';

// Dynamic imports for better performance
const EnhancedTokenizer = dynamic(() => import('./EnhancedTokenizer'), {
  loading: () => <div className={styles.loading}>토크나이저 로딩 중...</div>
});

const AttentionVisualizer = dynamic(() => import('./AttentionVisualizer'), {
  loading: () => <div className={styles.loading}>Attention 시각화 로딩 중...</div>
});

const TransformerStepByStep = dynamic(() => import('./TransformerStepByStep'), {
  loading: () => <div className={styles.loading}>Transformer 시뮬레이터 로딩 중...</div>
});

const TrainingSimulator = dynamic(() => import('./TrainingSimulator'), {
  loading: () => <div className={styles.loading}>학습 시뮬레이터 로딩 중...</div>
});

const PromptPlayground = dynamic(() => import('./PromptPlayground'), {
  loading: () => <div className={styles.loading}>프롬프트 플레이그라운드 로딩 중...</div>
});

const ModelComparison = dynamic(() => import('./ModelComparison'), {
  loading: () => <div className={styles.loading}>모델 비교 도구 로딩 중...</div>
});

type SimulatorType = 'tokenizer' | 'attention' | 'transformer' | 'training' | 'prompt' | 'comparison';

interface Simulator {
  id: SimulatorType;
  title: string;
  description: string;
  icon: string;
  component: React.ComponentType;
}

const LLMSimulators = () => {
  const [activeSimulator, setActiveSimulator] = useState<SimulatorType>('tokenizer');

  const simulators: Simulator[] = [
    {
      id: 'tokenizer',
      title: 'Tokenizer 시뮬레이터',
      description: '텍스트가 토큰으로 변환되는 과정을 시각화',
      icon: '🔤',
      component: EnhancedTokenizer
    },
    {
      id: 'attention',
      title: 'Attention 메커니즘',
      description: '토큰 간의 attention 가중치를 시각적으로 탐색',
      icon: '👁️',
      component: AttentionVisualizer
    },
    {
      id: 'transformer',
      title: 'Transformer 단계별',
      description: '데이터 처리 과정을 단계별로 이해',
      icon: '📊',
      component: TransformerStepByStep
    },
    {
      id: 'training',
      title: '학습 과정',
      description: 'LLM 학습 과정을 실시간으로 관찰',
      icon: '🎯',
      component: TrainingSimulator
    },
    {
      id: 'prompt',
      title: '프롬프트 플레이그라운드',
      description: '효과적인 프롬프트 작성법 실습',
      icon: '💬',
      component: PromptPlayground
    },
    {
      id: 'comparison',
      title: '모델 비교',
      description: '주요 LLM 모델들의 성능과 특징 비교',
      icon: '⚖️',
      component: ModelComparison
    }
  ];

  const ActiveComponent = simulators.find(s => s.id === activeSimulator)?.component || EnhancedTokenizer;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>🤖 LLM 인터랙티브 시뮬레이터</h2>
        <p>LLM의 핵심 개념을 직접 체험하고 실습해보세요</p>
      </div>

      <div className={styles.simulatorNav}>
        {simulators.map((simulator) => (
          <button
            key={simulator.id}
            className={`${styles.navButton} ${activeSimulator === simulator.id ? styles.active : ''}`}
            onClick={() => setActiveSimulator(simulator.id)}
          >
            <span className={styles.icon}>{simulator.icon}</span>
            <div className={styles.navContent}>
              <strong>{simulator.title}</strong>
              <span>{simulator.description}</span>
            </div>
          </button>
        ))}
      </div>

      <div className={styles.simulatorContent}>
        <ActiveComponent />
      </div>

      <div className={styles.tips}>
        <h3>💡 시뮬레이터 활용 팁</h3>
        <div className={styles.tipGrid}>
          <div className={styles.tip}>
            <strong>순차적 학습</strong>
            <p>Tokenizer부터 시작하여 단계별로 진행하면 LLM의 작동 원리를 체계적으로 이해할 수 있습니다.</p>
          </div>
          <div className={styles.tip}>
            <strong>실습 중심</strong>
            <p>각 시뮬레이터의 파라미터를 직접 조정하면서 변화를 관찰해보세요.</p>
          </div>
          <div className={styles.tip}>
            <strong>비교 분석</strong>
            <p>모델 비교 도구를 활용하여 각 모델의 장단점을 파악해보세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLMSimulators;