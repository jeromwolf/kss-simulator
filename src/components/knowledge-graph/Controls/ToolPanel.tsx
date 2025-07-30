'use client';

import React, { useRef } from 'react';
import { Plus, Link, Trash2, Move, Search, Download, Upload, FileText, Database, Undo, Redo } from 'lucide-react';
import { ViewMode } from '../types';
import styles from '../KnowledgeGraph.module.css';

interface ToolPanelProps {
  onAddNode: () => void;
  onAddEdge: () => void;
  onDelete: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onExportJSON?: () => void;
  onExportTurtle?: () => void;
  onImport?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearAll?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({
  onAddNode,
  onAddEdge,
  onDelete,
  viewMode,
  onViewModeChange,
  onExportJSON,
  onExportTurtle,
  onImport,
  onClearAll,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.panelSection}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>도구</h3>
      </div>
      
      <div className={styles.toolGrid}>
        <button className={styles.toolButton} onClick={onAddNode}>
          <Plus className={styles.toolIcon} />
          <span className={styles.toolLabel}>노드 추가</span>
        </button>
        
        <button className={styles.toolButton} onClick={onAddEdge}>
          <Link className={styles.toolIcon} />
          <span className={styles.toolLabel}>관계 추가</span>
        </button>
        
        <button className={styles.toolButton} onClick={onDelete}>
          <Trash2 className={styles.toolIcon} />
          <span className={styles.toolLabel}>삭제</span>
        </button>
        
        <button className={styles.toolButton}>
          <Move className={styles.toolIcon} />
          <span className={styles.toolLabel}>이동</span>
        </button>
        
        <button 
          className={styles.toolButton} 
          onClick={onUndo}
          disabled={!canUndo}
          title="실행 취소 (Ctrl+Z)"
          style={{ opacity: canUndo ? 1 : 0.5 }}
        >
          <Undo className={styles.toolIcon} />
          <span className={styles.toolLabel}>취소</span>
        </button>
        
        <button 
          className={styles.toolButton} 
          onClick={onRedo}
          disabled={!canRedo}
          title="다시 실행 (Ctrl+Y)"
          style={{ opacity: canRedo ? 1 : 0.5 }}
        >
          <Redo className={styles.toolIcon} />
          <span className={styles.toolLabel}>재실행</span>
        </button>
      </div>
      
      <div className={styles.viewModeToggle}>
        <button 
          className={`${styles.viewModeButton} ${viewMode === '2D' ? styles.active : ''}`}
          onClick={() => onViewModeChange('2D')}
        >
          2D 뷰
        </button>
        <button 
          className={`${styles.viewModeButton} ${viewMode === '3D' ? styles.active : ''}`}
          onClick={() => onViewModeChange('3D')}
        >
          3D 뷰
        </button>
      </div>
      
      {/* Data Management Section */}
      <div className={styles.panelHeader} style={{ marginTop: '1rem' }}>
        <h4 className={styles.panelTitle} style={{ fontSize: '0.875rem' }}>데이터 관리</h4>
      </div>
      
      <div className={styles.toolGrid}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.ttl,.turtle"
          onChange={onImport}
          style={{ display: 'none' }}
        />
        
        <button 
          className={styles.toolButton}
          onClick={() => fileInputRef.current?.click()}
          title="파일에서 가져오기 (JSON, Turtle)"
        >
          <Upload size={20} />
          가져오기
        </button>
        
        <button 
          className={styles.toolButton}
          onClick={onExportJSON}
          title="JSON 형식으로 내보내기"
        >
          <FileText size={20} />
          JSON 내보내기
        </button>
        
        <button 
          className={styles.toolButton}
          onClick={onExportTurtle}
          title="RDF Turtle 형식으로 내보내기"
        >
          <Database size={20} />
          Turtle 내보내기
        </button>
        
        <button 
          className={styles.toolButton}
          onClick={onClearAll}
          title="모든 데이터 삭제"
          style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}
        >
          <Trash2 size={20} />
          전체 삭제
        </button>
      </div>
    </div>
  );
};