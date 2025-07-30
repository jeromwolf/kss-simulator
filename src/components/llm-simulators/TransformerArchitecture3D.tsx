'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Simulators.module.css';

interface Layer {
  name: string;
  type: 'input' | 'embedding' | 'attention' | 'ffn' | 'norm' | 'output';
  description: string;
  color: string;
}

const TransformerArchitecture3D = () => {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'encoder' | 'decoder' | 'full'>('full');
  const [animating, setAnimating] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const rotationRef = useRef({ x: 0, y: 0 });

  const encoderLayers: Layer[] = [
    { name: 'Input Embedding', type: 'embedding', description: '입력 토큰을 벡터로 변환', color: '#FF6B6B' },
    { name: 'Positional Encoding', type: 'embedding', description: '위치 정보 추가', color: '#F9844A' },
    { name: 'Multi-Head Attention', type: 'attention', description: '토큰 간 관계 계산', color: '#4ECDC4' },
    { name: 'Add & Norm', type: 'norm', description: '잔차 연결과 정규화', color: '#45B7D1' },
    { name: 'Feed Forward', type: 'ffn', description: '비선형 변환', color: '#9B5DE5' },
    { name: 'Add & Norm', type: 'norm', description: '잔차 연결과 정규화', color: '#45B7D1' },
  ];

  const decoderLayers: Layer[] = [
    { name: 'Output Embedding', type: 'embedding', description: '출력 토큰 임베딩', color: '#FF6B6B' },
    { name: 'Positional Encoding', type: 'embedding', description: '위치 정보 추가', color: '#F9844A' },
    { name: 'Masked Self-Attention', type: 'attention', description: '이전 토큰만 참조', color: '#4ECDC4' },
    { name: 'Add & Norm', type: 'norm', description: '잔차 연결과 정규화', color: '#45B7D1' },
    { name: 'Cross-Attention', type: 'attention', description: '인코더 출력 참조', color: '#00BBF9' },
    { name: 'Add & Norm', type: 'norm', description: '잔차 연결과 정규화', color: '#45B7D1' },
    { name: 'Feed Forward', type: 'ffn', description: '비선형 변환', color: '#9B5DE5' },
    { name: 'Add & Norm', type: 'norm', description: '잔차 연결과 정규화', color: '#45B7D1' },
    { name: 'Linear & Softmax', type: 'output', description: '확률 분포 생성', color: '#F15BB5' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      draw3DArchitecture(ctx, canvas);
      if (animating) {
        rotationRef.current.y += 0.01;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [viewMode, selectedLayer, animating]);

  const draw3DArchitecture = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Clear canvas
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const layerHeight = 40;
    const layerWidth = 200;
    const layerDepth = 30;
    const spacing = 50;

    // 3D transformation
    const project3D = (x: number, y: number, z: number) => {
      const scale = 1 / (1 + z * 0.001);
      const rotatedX = x * Math.cos(rotationRef.current.y) - z * Math.sin(rotationRef.current.y);
      const rotatedZ = x * Math.sin(rotationRef.current.y) + z * Math.cos(rotationRef.current.y);
      
      return {
        x: centerX + rotatedX * scale,
        y: centerY + y * scale,
        scale
      };
    };

    // Draw based on view mode
    if (viewMode === 'encoder' || viewMode === 'full') {
      // Draw encoder
      encoderLayers.forEach((layer, index) => {
        const y = -encoderLayers.length * spacing / 2 + index * spacing;
        const x = viewMode === 'full' ? -150 : 0;
        drawLayer(ctx, layer, x, y, 0, index, project3D, layerWidth, layerHeight, layerDepth);
      });
    }

    if (viewMode === 'decoder' || viewMode === 'full') {
      // Draw decoder
      decoderLayers.forEach((layer, index) => {
        const y = -decoderLayers.length * spacing / 2 + index * spacing;
        const x = viewMode === 'full' ? 150 : 0;
        drawLayer(ctx, layer, x, y, 0, index + (viewMode === 'full' ? encoderLayers.length : 0), 
                 project3D, layerWidth, layerHeight, layerDepth);
      });
    }

    // Draw connections
    if (viewMode === 'full') {
      // Cross-attention connection
      const encoderOutput = project3D(-150, encoderLayers.length * spacing / 2 - spacing, 0);
      const crossAttention = project3D(150, -decoderLayers.length * spacing / 2 + 4 * spacing, 0);
      
      ctx.strokeStyle = '#00BBF9';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(encoderOutput.x, encoderOutput.y);
      ctx.lineTo(crossAttention.x, crossAttention.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  const drawLayer = (
    ctx: CanvasRenderingContext2D,
    layer: Layer,
    x: number,
    y: number,
    z: number,
    index: number,
    project3D: Function,
    width: number,
    height: number,
    depth: number
  ) => {
    const isSelected = selectedLayer === index;
    
    // Calculate 3D corners
    const corners = [
      project3D(x - width/2, y - height/2, z - depth/2),
      project3D(x + width/2, y - height/2, z - depth/2),
      project3D(x + width/2, y + height/2, z - depth/2),
      project3D(x - width/2, y + height/2, z - depth/2),
      project3D(x - width/2, y - height/2, z + depth/2),
      project3D(x + width/2, y - height/2, z + depth/2),
      project3D(x + width/2, y + height/2, z + depth/2),
      project3D(x - width/2, y + height/2, z + depth/2),
    ];

    // Draw faces
    ctx.fillStyle = layer.color + (isSelected ? 'FF' : 'CC');
    ctx.strokeStyle = layer.color;
    ctx.lineWidth = isSelected ? 3 : 1;

    // Front face
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    ctx.lineTo(corners[1].x, corners[1].y);
    ctx.lineTo(corners[2].x, corners[2].y);
    ctx.lineTo(corners[3].x, corners[3].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Top face
    ctx.fillStyle = layer.color + (isSelected ? 'DD' : 'AA');
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    ctx.lineTo(corners[1].x, corners[1].y);
    ctx.lineTo(corners[5].x, corners[5].y);
    ctx.lineTo(corners[4].x, corners[4].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right face
    ctx.fillStyle = layer.color + (isSelected ? 'BB' : '88');
    ctx.beginPath();
    ctx.moveTo(corners[1].x, corners[1].y);
    ctx.lineTo(corners[2].x, corners[2].y);
    ctx.lineTo(corners[6].x, corners[6].y);
    ctx.lineTo(corners[5].x, corners[5].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw label
    const center = project3D(x, y, z);
    ctx.fillStyle = '#000000';
    ctx.font = `${12 * center.scale}px Inter`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(layer.name, center.x, center.y);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Simple hit detection (would need improvement for accurate 3D picking)
    const totalLayers = viewMode === 'encoder' ? encoderLayers.length :
                       viewMode === 'decoder' ? decoderLayers.length :
                       encoderLayers.length + decoderLayers.length;

    const layerHeight = canvas.height / (totalLayers + 2);
    const clickedLayer = Math.floor(y / layerHeight);

    if (clickedLayer >= 0 && clickedLayer < totalLayers) {
      setSelectedLayer(clickedLayer === selectedLayer ? null : clickedLayer);
    }
  };

  const getCurrentLayers = () => {
    if (viewMode === 'encoder') return encoderLayers;
    if (viewMode === 'decoder') return decoderLayers;
    return [...encoderLayers, ...decoderLayers];
  };

  return (
    <div className={styles.simulator}>
      <div className={styles.header}>
        <h3>🏗️ Transformer 아키텍처 3D</h3>
        <p>Transformer의 구조를 3D로 탐색해보세요</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.viewControls}>
          <label>뷰 모드:</label>
          <button
            className={viewMode === 'full' ? styles.active : ''}
            onClick={() => setViewMode('full')}
          >
            전체 구조
          </button>
          <button
            className={viewMode === 'encoder' ? styles.active : ''}
            onClick={() => setViewMode('encoder')}
          >
            인코더만
          </button>
          <button
            className={viewMode === 'decoder' ? styles.active : ''}
            onClick={() => setViewMode('decoder')}
          >
            디코더만
          </button>
        </div>

        <div className={styles.animationControls}>
          <button
            className={styles.toggleBtn}
            onClick={() => setAnimating(!animating)}
          >
            {animating ? '회전 중지' : '회전 시작'}
          </button>
          <button
            className={styles.resetBtn}
            onClick={() => {
              rotationRef.current = { x: 0, y: 0 };
              setSelectedLayer(null);
            }}
          >
            뷰 초기화
          </button>
        </div>
      </div>

      <div className={styles.results}>
        <div className={styles.architectureContainer}>
          <canvas
            ref={canvasRef}
            className={styles.architectureCanvas}
            onClick={handleCanvasClick}
            width={800}
            height={600}
          />
          
          {selectedLayer !== null && (
            <div className={styles.layerInfo}>
              <h4>{getCurrentLayers()[selectedLayer].name}</h4>
              <p>{getCurrentLayers()[selectedLayer].description}</p>
            </div>
          )}
        </div>

        <div className={styles.layerList}>
          <h4>레이어 구성</h4>
          <div className={styles.layers}>
            {getCurrentLayers().map((layer, index) => (
              <div
                key={index}
                className={`${styles.layerItem} ${selectedLayer === index ? styles.selected : ''}`}
                onClick={() => setSelectedLayer(index === selectedLayer ? null : index)}
                style={{ borderColor: layer.color }}
              >
                <div className={styles.layerDot} style={{ backgroundColor: layer.color }} />
                <div>
                  <strong>{layer.name}</strong>
                  <p>{layer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.explanation}>
          <h4>Transformer 아키텍처</h4>
          <p>
            Transformer는 self-attention 메커니즘을 기반으로 하는 딥러닝 아키텍처입니다.
            인코더는 입력을 처리하고, 디코더는 출력을 생성합니다.
          </p>
          <ul>
            <li><strong>Multi-Head Attention:</strong> 여러 관점에서 동시에 관계 파악</li>
            <li><strong>Feed Forward:</strong> 각 위치에서 독립적인 비선형 변환</li>
            <li><strong>Residual Connection:</strong> 기울기 소실 문제 해결</li>
            <li><strong>Layer Normalization:</strong> 학습 안정성 향상</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransformerArchitecture3D;