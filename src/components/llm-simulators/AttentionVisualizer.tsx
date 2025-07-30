'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Simulators.module.css';

interface AttentionScore {
  from: number;
  to: number;
  score: number;
}

const AttentionVisualizer = () => {
  const [inputTokens, setInputTokens] = useState(['나는', '오늘', '학교에', '갔다']);
  const [attentionScores, setAttentionScores] = useState<AttentionScore[]>([]);
  const [selectedToken, setSelectedToken] = useState<number | null>(null);
  const [attentionType, setAttentionType] = useState<'self' | 'cross'>('self');
  const [animating, setAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateAttentionScores = () => {
    const scores: AttentionScore[] = [];
    const numTokens = inputTokens.length;

    for (let i = 0; i < numTokens; i++) {
      for (let j = 0; j < numTokens; j++) {
        // Simulate attention patterns
        let score = Math.random();
        
        // Make diagonal stronger for self-attention
        if (i === j) score = Math.min(score + 0.5, 1);
        
        // Make nearby tokens have higher attention
        const distance = Math.abs(i - j);
        score = score * (1 - distance * 0.1);
        
        scores.push({ from: i, to: j, score: Math.max(0.1, score) });
      }
    }

    setAttentionScores(scores);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);
  };

  useEffect(() => {
    generateAttentionScores();
  }, [inputTokens]);

  useEffect(() => {
    drawAttentionMatrix();
  }, [attentionScores, selectedToken]);

  const drawAttentionMatrix = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = 60;
    const padding = 60;
    const numTokens = inputTokens.length;

    canvas.width = numTokens * cellSize + padding * 2;
    canvas.height = numTokens * cellSize + padding * 2;

    // Clear canvas
    const isDarkMode = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDarkMode ? '#1f2937' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid and scores
    for (let i = 0; i < numTokens; i++) {
      for (let j = 0; j < numTokens; j++) {
        const score = attentionScores.find(s => s.from === i && s.to === j)?.score || 0;
        const x = j * cellSize + padding;
        const y = i * cellSize + padding;

        // Highlight if selected
        const isHighlighted = selectedToken !== null && (i === selectedToken || j === selectedToken);
        
        // Draw cell
        const opacity = isHighlighted ? score : score * 0.7;
        ctx.fillStyle = `rgba(37, 99, 235, ${opacity})`;
        ctx.fillRect(x, y, cellSize - 2, cellSize - 2);

        // Draw score text
        ctx.fillStyle = score > 0.5 ? '#ffffff' : '#000000';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(score.toFixed(2), x + cellSize / 2, y + cellSize / 2);
      }
    }

    // Draw labels
    ctx.fillStyle = isDarkMode ? '#e5e7eb' : '#000000';
    ctx.font = '14px "Noto Sans KR", Inter, sans-serif';
    
    // Top labels
    for (let i = 0; i < numTokens; i++) {
      ctx.save();
      ctx.translate(i * cellSize + padding + cellSize / 2, padding - 15);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(inputTokens[i], 0, 0);
      ctx.restore();
    }

    // Left labels
    for (let i = 0; i < numTokens; i++) {
      ctx.save();
      ctx.translate(padding - 15, i * cellSize + padding + cellSize / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(inputTokens[i], 0, 0);
      ctx.restore();
    }
  };

  const handleTokensChange = (text: string) => {
    const tokens = text.split(' ').filter(t => t.length > 0);
    if (tokens.length > 0 && tokens.length <= 8) {
      setInputTokens(tokens);
    }
  };

  const exampleSentences = [
    '나는 오늘 학교에 갔다',
    'The cat sat on mat',
    'AI가 세상을 바꾼다',
    '코딩은 정말 재미있다'
  ];

  return (
    <div className={styles.simulator}>
      <div className={styles.header}>
        <h3>👁️ Attention 메커니즘 시각화</h3>
        <p>토큰 간의 attention 가중치를 시각적으로 확인해보세요</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.inputSection}>
          <label>입력 토큰 (공백으로 구분, 최대 8개):</label>
          <input
            type="text"
            value={inputTokens.join(' ')}
            onChange={(e) => handleTokensChange(e.target.value)}
            placeholder="토큰을 입력하세요..."
          />
          <div className={styles.exampleButtons}>
            {exampleSentences.map((sentence, index) => (
              <button
                key={index}
                className={styles.exampleBtn}
                onClick={() => handleTokensChange(sentence)}
              >
                {sentence}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.optionsRow}>
          <button 
            className={styles.regenerateBtn}
            onClick={generateAttentionScores}
          >
            Attention 재생성
          </button>
        </div>
      </div>

      <div className={styles.results}>
        <div className={styles.attentionContainer}>
          <div className={styles.matrixSection}>
            <h4>Attention Matrix</h4>
            <canvas 
              ref={canvasRef}
              className={`${styles.attentionCanvas} ${animating ? styles.animating : ''}`}
            />
            <p className={styles.matrixExplanation}>
              각 셀은 행 토큰이 열 토큰에 주는 attention 점수를 나타냅니다.
              진한 파란색일수록 높은 attention을 의미합니다.
            </p>
          </div>

          <div className={styles.tokenInteraction}>
            <h4>토큰별 Attention 분석</h4>
            <div className={styles.tokenButtons}>
              {inputTokens.map((token, index) => (
                <button
                  key={index}
                  className={`${styles.tokenBtn} ${selectedToken === index ? styles.selected : ''}`}
                  onClick={() => setSelectedToken(selectedToken === index ? null : index)}
                >
                  {token}
                </button>
              ))}
            </div>
            {selectedToken !== null && (
              <div className={styles.tokenAnalysis}>
                <h5>"{inputTokens[selectedToken]}" 토큰 분석:</h5>
                <div className={styles.attentionDetails}>
                  <div>
                    <strong>이 토큰이 주목하는 토큰들:</strong>
                    {attentionScores
                      .filter(s => s.from === selectedToken)
                      .sort((a, b) => b.score - a.score)
                      .slice(0, 3)
                      .map((s, i) => (
                        <div key={i} className={styles.scoreItem}>
                          {inputTokens[s.to]}: {(s.score * 100).toFixed(1)}%
                        </div>
                      ))}
                  </div>
                  <div>
                    <strong>이 토큰에 주목하는 토큰들:</strong>
                    {attentionScores
                      .filter(s => s.to === selectedToken)
                      .sort((a, b) => b.score - a.score)
                      .slice(0, 3)
                      .map((s, i) => (
                        <div key={i} className={styles.scoreItem}>
                          {inputTokens[s.from]}: {(s.score * 100).toFixed(1)}%
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.explanation}>
          <h4>Attention 메커니즘이란?</h4>
          <p>
            Attention은 모델이 입력 시퀀스의 어떤 부분에 "주목"해야 하는지 학습하는 메커니즘입니다.
            각 토큰은 다른 모든 토큰과의 관계를 계산하여, 문맥을 이해하는 데 필요한 정보를 선택적으로 활용합니다.
          </p>
          <ul>
            <li><strong>Self-Attention:</strong> 같은 시퀀스 내의 토큰들 간의 관계</li>
            <li><strong>높은 점수:</strong> 두 토큰 간의 강한 연관성</li>
            <li><strong>Multi-Head:</strong> 여러 관점에서 동시에 attention 계산</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttentionVisualizer;