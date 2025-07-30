'use client';

import React from 'react';
import { LayoutType } from '../types';
import styles from '../KnowledgeGraph.module.css';

interface LayoutSelectorProps {
  layoutType: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
}

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  layoutType,
  onLayoutChange
}) => {
  const layouts: Array<{ type: LayoutType; label: string; icon: string }> = [
    { type: 'force-directed', label: 'Force-directed', icon: '⚡' },
    { type: 'hierarchical', label: 'Hierarchical', icon: '🌳' },
    { type: 'circular', label: 'Circular', icon: '⭕' },
    { type: 'grid', label: 'Grid', icon: '⚏' }
  ];

  return (
    <div className={styles.panelSection}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>레이아웃</h3>
      </div>
      
      <div className={styles.layoutGrid}>
        {layouts.map(layout => (
          <button
            key={layout.type}
            className={`${styles.layoutOption} ${layoutType === layout.type ? styles.active : ''}`}
            onClick={() => onLayoutChange(layout.type)}
          >
            <span className={styles.layoutIcon}>{layout.icon}</span>
            <span>{layout.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};