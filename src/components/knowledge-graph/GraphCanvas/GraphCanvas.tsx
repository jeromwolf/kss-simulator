'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Graph2D } from './Graph2D';
import { Triple, ViewMode, LayoutType, FilterOptions } from '../types';
import styles from './GraphCanvas.module.css';

// 3D 컴포넌트는 동적으로 로드 (SSR 방지)
const Graph3D = dynamic(
  () => import('./Graph3D').then(mod => ({ default: mod.Graph3D })),
  { 
    ssr: false,
    loading: () => (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>3D 뷰 로딩중...</p>
      </div>
    )
  }
);

interface GraphCanvasProps {
  triples: Triple[];
  viewMode: ViewMode;
  layoutType: LayoutType;
  filters: FilterOptions;
  selectedNode: string | null;
  selectedEdge: string | null;
  onNodeSelect: (nodeId: string | null) => void;
  onEdgeSelect: (edgeId: string | null) => void;
  onNodeAdd: (node: any) => void;
  onNodeUpdate: (nodeId: string, updates: any) => void;
  onNodeDelete: (nodeId: string) => void;
  onEdgeAdd: (edge: any) => void;
  onEdgeDelete: (edgeId: string) => void;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  triples,
  viewMode,
  layoutType,
  filters,
  selectedNode,
  selectedEdge,
  onNodeSelect,
  onEdgeSelect,
  onNodeAdd,
  onNodeUpdate,
  onNodeDelete,
  onEdgeAdd,
  onEdgeDelete
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle view mode transitions
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [viewMode]);

  return (
    <div className={`${styles.canvas} ${isTransitioning ? styles.transitioning : ''}`}>
      {viewMode === '2D' ? (
        <Graph2D
          triples={triples}
          layoutType={layoutType}
          filters={filters}
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          onNodeSelect={onNodeSelect}
          onEdgeSelect={onEdgeSelect}
          onNodeAdd={onNodeAdd}
          onNodeUpdate={onNodeUpdate}
          onNodeDelete={onNodeDelete}
          onEdgeAdd={onEdgeAdd}
          onEdgeDelete={onEdgeDelete}
        />
      ) : (
        <Graph3D
          triples={triples}
          layoutType={layoutType}
          filters={filters}
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          onNodeSelect={onNodeSelect}
          onEdgeSelect={onEdgeSelect}
          onNodeAdd={onNodeAdd}
          onNodeUpdate={onNodeUpdate}
          onNodeDelete={onNodeDelete}
          onEdgeAdd={onEdgeAdd}
          onEdgeDelete={onEdgeDelete}
        />
      )}
      
      {/* Graph Statistics Overlay */}
      <div className={styles.statsOverlay}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>노드</span>
          <span className={styles.statValue}>
            {new Set([...triples.map(t => t.subject), ...triples.map(t => t.object)]).size}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>엣지</span>
          <span className={styles.statValue}>{triples.length}</span>
        </div>
      </div>
      
      {/* View Controls */}
      <div className={styles.viewControls}>
        <button className={styles.controlButton} title="확대">+</button>
        <button className={styles.controlButton} title="축소">-</button>
        <button className={styles.controlButton} title="화면 맞춤">⊡</button>
      </div>
    </div>
  );
};