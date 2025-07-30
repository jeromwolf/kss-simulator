'use client';

import { useState } from 'react';
import styles from './Simulators.module.css';

interface ModelInfo {
  name: string;
  company: string;
  parameters: string;
  releaseDate: string;
  architecture: string;
  contextLength: number;
  trainingData: string;
  strengths: string[];
  weaknesses: string[];
  benchmarks: {
    mmlu: number;
    humanEval: number;
    gsm8k: number;
    hellaSwag: number;
  };
}

const ModelComparison = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>(['GPT-4', 'Claude 3']);
  const [comparisonMode, setComparisonMode] = useState<'overview' | 'benchmarks' | 'detailed'>('overview');

  const models: Record<string, ModelInfo> = {
    'GPT-4': {
      name: 'GPT-4',
      company: 'OpenAI',
      parameters: '~1.7T',
      releaseDate: '2023.03',
      architecture: 'Transformer (Sparse MoE)',
      contextLength: 128000,
      trainingData: '웹 데이터, 책, 논문 (2021년까지)',
      strengths: ['다목적 성능', '긴 컨텍스트', '추론 능력', '코드 생성'],
      weaknesses: ['최신 정보 부족', '높은 비용', '속도'],
      benchmarks: {
        mmlu: 86.4,
        humanEval: 87.1,
        gsm8k: 92.0,
        hellaSwag: 95.3
      }
    },
    'Claude 3': {
      name: 'Claude 3 Opus',
      company: 'Anthropic',
      parameters: '비공개',
      releaseDate: '2024.03',
      architecture: 'Constitutional AI',
      contextLength: 200000,
      trainingData: '헌법적 AI 학습',
      strengths: ['안전성', '매우 긴 컨텍스트', '정확성', '윤리적 추론'],
      weaknesses: ['창의성 제한', '보수적 응답'],
      benchmarks: {
        mmlu: 88.7,
        humanEval: 84.9,
        gsm8k: 95.0,
        hellaSwag: 94.8
      }
    },
    'Gemini Ultra': {
      name: 'Gemini Ultra',
      company: 'Google',
      parameters: '비공개',
      releaseDate: '2023.12',
      architecture: 'Multimodal Transformer',
      contextLength: 32000,
      trainingData: '텍스트, 이미지, 오디오, 비디오',
      strengths: ['멀티모달', '추론 능력', '과학 문제'],
      weaknesses: ['접근성', '일관성'],
      benchmarks: {
        mmlu: 90.0,
        humanEval: 85.8,
        gsm8k: 94.4,
        hellaSwag: 93.7
      }
    },
    'LLaMA 3': {
      name: 'LLaMA 3',
      company: 'Meta',
      parameters: '8B-70B',
      releaseDate: '2024.04',
      architecture: 'Transformer',
      contextLength: 8192,
      trainingData: '15T 토큰',
      strengths: ['오픈소스', '효율성', '다국어'],
      weaknesses: ['짧은 컨텍스트', '상업적 제한'],
      benchmarks: {
        mmlu: 82.0,
        humanEval: 81.8,
        gsm8k: 88.9,
        hellaSwag: 92.1
      }
    },
    'Mixtral 8x7B': {
      name: 'Mixtral 8x7B',
      company: 'Mistral AI',
      parameters: '47B (8x7B MoE)',
      releaseDate: '2023.12',
      architecture: 'Sparse MoE',
      contextLength: 32000,
      trainingData: '오픈 웹 데이터',
      strengths: ['효율적 MoE', '오픈소스', '다국어'],
      weaknesses: ['메모리 요구량', '한국어 성능'],
      benchmarks: {
        mmlu: 70.6,
        humanEval: 74.4,
        gsm8k: 81.3,
        hellaSwag: 88.2
      }
    }
  };

  const toggleModel = (modelName: string) => {
    if (selectedModels.includes(modelName)) {
      setSelectedModels(selectedModels.filter(m => m !== modelName));
    } else if (selectedModels.length < 3) {
      setSelectedModels([...selectedModels, modelName]);
    }
  };

  const getBenchmarkColor = (score: number) => {
    if (score >= 90) return '#22c55e';
    if (score >= 80) return '#3b82f6';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const renderRadarChart = () => {
    const benchmarkTypes = ['MMLU', 'HumanEval', 'GSM8K', 'HellaSwag'];
    const maxRadius = 100;
    const centerX = 150;
    const centerY = 150;

    return (
      <svg width="300" height="300" className={styles.radarChart}>
        {/* Grid */}
        {[20, 40, 60, 80, 100].map(radius => (
          <circle
            key={radius}
            cx={centerX}
            cy={centerY}
            r={(radius / 100) * maxRadius}
            fill="none"
            stroke="#334155"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {benchmarkTypes.map((_, index) => {
          const angle = (index * Math.PI * 2) / benchmarkTypes.length - Math.PI / 2;
          const x = centerX + Math.cos(angle) * maxRadius;
          const y = centerY + Math.sin(angle) * maxRadius;
          
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="#334155"
              strokeWidth="1"
            />
          );
        })}

        {/* Labels */}
        {benchmarkTypes.map((label, index) => {
          const angle = (index * Math.PI * 2) / benchmarkTypes.length - Math.PI / 2;
          const x = centerX + Math.cos(angle) * (maxRadius + 20);
          const y = centerY + Math.sin(angle) * (maxRadius + 20);
          
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="#94a3b8"
            >
              {label}
            </text>
          );
        })}

        {/* Data */}
        {selectedModels.map((modelName, modelIndex) => {
          const model = models[modelName];
          const benchmarks = [
            model.benchmarks.mmlu,
            model.benchmarks.humanEval,
            model.benchmarks.gsm8k,
            model.benchmarks.hellaSwag
          ];

          const points = benchmarks.map((score, index) => {
            const angle = (index * Math.PI * 2) / benchmarks.length - Math.PI / 2;
            const radius = (score / 100) * maxRadius;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            return `${x},${y}`;
          }).join(' ');

          const color = ['#3b82f6', '#ef4444', '#22c55e'][modelIndex];

          return (
            <g key={modelName}>
              <polygon
                points={points}
                fill={color}
                fillOpacity="0.2"
                stroke={color}
                strokeWidth="2"
              />
              {benchmarks.map((score, index) => {
                const angle = (index * Math.PI * 2) / benchmarks.length - Math.PI / 2;
                const radius = (score / 100) * maxRadius;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={color}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className={styles.simulator}>
      <div className={styles.header}>
        <h3>⚖️ 모델 비교 도구</h3>
        <p>주요 LLM 모델들의 성능과 특징을 비교해보세요</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.modelSelection}>
          <h4>모델 선택 (최대 3개)</h4>
          <div className={styles.modelGrid}>
            {Object.keys(models).map(modelName => (
              <button
                key={modelName}
                className={`${styles.modelSelectBtn} ${selectedModels.includes(modelName) ? styles.selected : ''}`}
                onClick={() => toggleModel(modelName)}
                disabled={!selectedModels.includes(modelName) && selectedModels.length >= 3}
              >
                <span className={styles.modelCompany}>{models[modelName].company}</span>
                <span className={styles.modelName}>{modelName}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.viewModes}>
          <button
            className={comparisonMode === 'overview' ? styles.active : ''}
            onClick={() => setComparisonMode('overview')}
          >
            개요
          </button>
          <button
            className={comparisonMode === 'benchmarks' ? styles.active : ''}
            onClick={() => setComparisonMode('benchmarks')}
          >
            벤치마크
          </button>
          <button
            className={comparisonMode === 'detailed' ? styles.active : ''}
            onClick={() => setComparisonMode('detailed')}
          >
            상세 비교
          </button>
        </div>
      </div>

      <div className={styles.results}>
        {selectedModels.length === 0 ? (
          <div className={styles.emptyState}>
            비교할 모델을 선택해주세요
          </div>
        ) : (
          <>
            {comparisonMode === 'overview' && (
              <div className={styles.overviewComparison}>
                <table className={styles.comparisonTable}>
                  <thead>
                    <tr>
                      <th>특성</th>
                      {selectedModels.map(model => (
                        <th key={model}>{model}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>회사</td>
                      {selectedModels.map(model => (
                        <td key={model}>{models[model].company}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>파라미터</td>
                      {selectedModels.map(model => (
                        <td key={model}>{models[model].parameters}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>출시일</td>
                      {selectedModels.map(model => (
                        <td key={model}>{models[model].releaseDate}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>컨텍스트 길이</td>
                      {selectedModels.map(model => (
                        <td key={model}>{models[model].contextLength.toLocaleString()} 토큰</td>
                      ))}
                    </tr>
                    <tr>
                      <td>아키텍처</td>
                      {selectedModels.map(model => (
                        <td key={model}>{models[model].architecture}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {comparisonMode === 'benchmarks' && (
              <div className={styles.benchmarkComparison}>
                <div className={styles.benchmarkGrid}>
                  <div className={styles.radarSection}>
                    <h4>성능 레이더 차트</h4>
                    {renderRadarChart()}
                    <div className={styles.legend}>
                      {selectedModels.map((model, index) => (
                        <div key={model} className={styles.legendItem}>
                          <span 
                            className={styles.legendColor}
                            style={{ backgroundColor: ['#3b82f6', '#ef4444', '#22c55e'][index] }}
                          />
                          {model}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.benchmarkBars}>
                    <h4>벤치마크 점수</h4>
                    {['mmlu', 'humanEval', 'gsm8k', 'hellaSwag'].map(benchmark => (
                      <div key={benchmark} className={styles.benchmarkRow}>
                        <span className={styles.benchmarkName}>
                          {benchmark === 'mmlu' ? 'MMLU' :
                           benchmark === 'humanEval' ? 'HumanEval' :
                           benchmark === 'gsm8k' ? 'GSM8K' : 'HellaSwag'}
                        </span>
                        <div className={styles.benchmarkBarsContainer}>
                          {selectedModels.map(model => {
                            const score = models[model].benchmarks[benchmark as keyof typeof models[typeof model]['benchmarks']];
                            return (
                              <div key={model} className={styles.benchmarkBar}>
                                <div
                                  className={styles.benchmarkFill}
                                  style={{
                                    width: `${score}%`,
                                    backgroundColor: getBenchmarkColor(score)
                                  }}
                                />
                                <span className={styles.benchmarkScore}>{score}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {comparisonMode === 'detailed' && (
              <div className={styles.detailedComparison}>
                {selectedModels.map(modelName => {
                  const model = models[modelName];
                  return (
                    <div key={modelName} className={styles.modelDetail}>
                      <h4>{modelName}</h4>
                      <div className={styles.detailSection}>
                        <h5>강점</h5>
                        <ul>
                          {model.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.detailSection}>
                        <h5>약점</h5>
                        <ul>
                          {model.weaknesses.map((weakness, index) => (
                            <li key={index}>{weakness}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.detailSection}>
                        <h5>학습 데이터</h5>
                        <p>{model.trainingData}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        <div className={styles.explanation}>
          <h4>벤치마크 설명</h4>
          <ul>
            <li><strong>MMLU:</strong> 다양한 학문 분야의 지식 평가</li>
            <li><strong>HumanEval:</strong> 코드 생성 능력 평가</li>
            <li><strong>GSM8K:</strong> 수학 문제 해결 능력</li>
            <li><strong>HellaSwag:</strong> 상식적 추론 능력</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;