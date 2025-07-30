'use client';

import React, { useState } from 'react';
import { Triple } from '../types';
import { Edit2, Trash2, Plus, Check, X } from 'lucide-react';
import styles from '../KnowledgeGraph.module.css';

interface NodePropertiesProps {
  nodeId: string;
  triples: Triple[];
  onPropertyAdd: (property: string, value: string) => void;
  onPropertyUpdate: (oldProp: string, newProp: string, newValue: string) => void;
  onPropertyDelete: (property: string) => void;
}

export const NodeProperties: React.FC<NodePropertiesProps> = ({
  nodeId,
  triples,
  onPropertyAdd,
  onPropertyUpdate,
  onPropertyDelete
}) => {
  const nodeProperties = triples.filter(t => t.subject === nodeId);
  const [editingProperty, setEditingProperty] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [newProperty, setNewProperty] = useState('');
  const [newValue, setNewValue] = useState('');

  const startEditing = (predicate: string, currentValue: string) => {
    setEditingProperty(predicate);
    setEditingValue(currentValue);
  };

  const saveEdit = () => {
    if (editingProperty && editingValue.trim()) {
      const property = nodeProperties.find(p => p.predicate === editingProperty);
      if (property) {
        onPropertyUpdate(editingProperty, editingProperty, editingValue);
      }
    }
    setEditingProperty(null);
    setEditingValue('');
  };

  const cancelEdit = () => {
    setEditingProperty(null);
    setEditingValue('');
  };

  const addNewProperty = () => {
    if (newProperty.trim() && newValue.trim()) {
      onPropertyAdd(newProperty, newValue);
      setNewProperty('');
      setNewValue('');
      setIsAddingProperty(false);
    }
  };

  const cancelAddProperty = () => {
    setNewProperty('');
    setNewValue('');
    setIsAddingProperty(false);
  };

  return (
    <div className={styles.panelSection}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>노드 속성</h3>
      </div>
      
      <div className={styles.propertyList}>
        <div className={styles.propertyItem}>
          <span className={styles.propertyPredicate}>ID</span>
          <span className={styles.propertyValue}>{nodeId}</span>
        </div>
        
        {nodeProperties.map((property, index) => (
          <div key={index} className={styles.propertyItem}>
            <span className={styles.propertyPredicate}>{property.predicate}</span>
            
            {editingProperty === property.predicate ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1 }}>
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className={styles.queryTextarea}
                  style={{ 
                    fontSize: '0.875rem', 
                    padding: '0.25rem 0.5rem', 
                    height: 'auto',
                    minHeight: 'unset',
                    resize: 'none'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit();
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  autoFocus
                />
                <button 
                  className={styles.iconButton}
                  onClick={saveEdit}
                  style={{ color: '#10b981' }}
                >
                  <Check size={14} />
                </button>
                <button 
                  className={styles.iconButton}
                  onClick={cancelEdit}
                  style={{ color: '#ef4444' }}
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <span className={styles.propertyValue}>{property.object}</span>
                <div className={styles.propertyActions}>
                  <button 
                    className={styles.iconButton}
                    onClick={() => startEditing(property.predicate, property.object)}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    className={styles.iconButton}
                    onClick={() => onPropertyDelete(property.predicate)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        
        {/* Add new property form */}
        {isAddingProperty && (
          <div className={styles.propertyItem} style={{ flexDirection: 'column', gap: '0.5rem', padding: '0.75rem', background: '#f8fafc', border: '1px dashed #d1d5db', borderRadius: '4px' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="속성명 (예: hasProperty)"
                value={newProperty}
                onChange={(e) => setNewProperty(e.target.value)}
                className={styles.queryTextarea}
                style={{ 
                  fontSize: '0.875rem', 
                  padding: '0.25rem 0.5rem', 
                  height: 'auto',
                  minHeight: 'unset',
                  flex: 1
                }}
              />
              <input
                type="text"
                placeholder="값 (예: value123)"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className={styles.queryTextarea}
                style={{ 
                  fontSize: '0.875rem', 
                  padding: '0.25rem 0.5rem', 
                  height: 'auto',
                  minHeight: 'unset',
                  flex: 1
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addNewProperty();
                  if (e.key === 'Escape') cancelAddProperty();
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button 
                className={styles.queryButton}
                onClick={addNewProperty}
                style={{ 
                  padding: '0.25rem 0.75rem', 
                  fontSize: '0.75rem',
                  background: '#10b981',
                  border: 'none'
                }}
              >
                <Check size={12} style={{ marginRight: '0.25rem' }} />
                추가
              </button>
              <button 
                className={styles.queryButton}
                onClick={cancelAddProperty}
                style={{ 
                  padding: '0.25rem 0.75rem', 
                  fontSize: '0.75rem',
                  background: '#6b7280',
                  border: 'none'
                }}
              >
                <X size={12} style={{ marginRight: '0.25rem' }} />
                취소
              </button>
            </div>
          </div>
        )}
      </div>
      
      {!isAddingProperty && (
        <button 
          className={styles.queryButton} 
          onClick={() => setIsAddingProperty(true)}
          style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          <Plus size={16} />
          속성 추가
        </button>
      )}
    </div>
  );
};