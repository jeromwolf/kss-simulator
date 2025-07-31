'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Triple } from '../types';
import { performInference, getInferenceRules } from '../utils/inferenceEngine';
import { Brain, Zap, Info } from 'lucide-react';
import styles from '../KnowledgeGraph.module.css';

interface InferenceResultsProps {
  triples: Triple[];
  onInferredTriplesChange?: (inferredTriples: Triple[]) => void;
}

export const InferenceResults: React.FC<InferenceResultsProps> = ({
  triples,
  onInferredTriplesChange
}) => {
  const [isInferring, setIsInferring] = useState(false);
  const [showRules, setShowRules] = useState(false);
  
  // Perform inference automatically when triples change
  const inferredTriples = useMemo(() => {
    if (triples.length === 0) return [];
    
    try {
      const inferred = performInference(triples);
      return inferred;
    } catch (error) {
      console.error('Inference failed:', error);
      return [];
    }
  }, [triples]);

  // Notify parent component of inferred triples
  useEffect(() => {
    onInferredTriplesChange?.(inferredTriples);
  }, [inferredTriples, onInferredTriplesChange]);

  const runInference = async () => {
    setIsInferring(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsInferring(false);
  };

  const inferenceRules = getInferenceRules();
  return (
    <div className={styles.panelSection}>
      <div className={styles.panelHeader}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Brain size={16} />
            <h3 className={styles.panelTitle}>추론 엔진</h3>
          </div>
          <button
            onClick={() => setShowRules(!showRules)}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Info size={12} />
            규칙 ({inferenceRules.length})
          </button>
        </div>
      </div>
      
      {/* Inference Rules */}
      {showRules && (
        <div style={{ 
          marginBottom: '0.75rem', 
          padding: '0.75rem', 
          background: '#f8fafc', 
          border: '1px solid #e2e8f0', 
          borderRadius: '4px' 
        }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>
            활성 추론 규칙:
          </p>
          {inferenceRules.map((rule, index) => (
            <div key={rule.id} style={{ marginBottom: '0.5rem' }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#334155' }}>
                {index + 1}. {rule.name}
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '0.125rem' }}>
                {rule.description}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Inference Status */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '0.75rem',
        padding: '0.75rem',
        gap: '1rem',
        background: inferredTriples.length > 0 ? '#ecfdf5' : '#f9fafb',
        border: `1px solid ${inferredTriples.length > 0 ? '#d1fae5' : '#e5e7eb'}`,
        borderRadius: '4px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={14} color={inferredTriples.length > 0 ? '#10b981' : '#6b7280'} />
          <span style={{ 
            fontSize: '0.875rem', 
            color: inferredTriples.length > 0 ? '#065f46' : '#374151',
            fontWeight: 500
          }}>
            {inferredTriples.length > 0 
              ? `${inferredTriples.length}개 관계 추론됨` 
              : '추론된 관계 없음'
            }
          </span>
        </div>
        
        <button
          onClick={runInference}
          disabled={isInferring}
          className="flex items-center gap-1 px-4 py-1.5 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isInferring ? '추론 중...' : '재실행'}
        </button>
      </div>
      
      {/* Inferred Triples */}
      <div className={styles.inferenceList} style={{ maxHeight: '150px', overflowY: 'auto' }}>
        {inferredTriples.length > 0 ? (
          inferredTriples.map((triple, index) => (
            <div key={index} style={{
              padding: '0.5rem',
              marginBottom: '0.25rem',
              background: '#fefefe',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              borderLeft: '3px solid #10b981'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ 
                  color: '#1e40af', 
                  fontWeight: 500,
                  padding: '0.125rem 0.25rem',
                  background: '#dbeafe',
                  borderRadius: '2px',
                  fontFamily: 'Monaco, monospace'
                }}>
                  {triple.subject}
                </span>
                <span style={{ 
                  color: '#7c2d12',
                  fontWeight: 500,
                  padding: '0.125rem 0.25rem',
                  background: '#fed7aa',
                  borderRadius: '2px',
                  fontFamily: 'Monaco, monospace'
                }}>
                  {triple.predicate}
                </span>
                <span style={{ 
                  color: triple.type === 'literal' ? '#7c2d12' : '#1e40af',
                  fontWeight: 500,
                  padding: '0.125rem 0.25rem',
                  background: triple.type === 'literal' ? '#fef3c7' : '#dbeafe',
                  borderRadius: '2px',
                  fontFamily: 'Monaco, monospace'
                }}>
                  {triple.object}
                </span>
              </div>
              <div style={{ 
                fontSize: '0.6875rem', 
                color: '#6b7280', 
                marginTop: '0.25rem',
                fontStyle: 'italic'
              }}>
                자동 추론됨
              </div>
            </div>
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '1.5rem',
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            <Brain size={24} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
            <p>현재 데이터에서 추론할 수 있는 새로운 관계가 없습니다.</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
              더 많은 트리플을 추가하면 추론 엔진이 새로운 관계를 발견할 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};