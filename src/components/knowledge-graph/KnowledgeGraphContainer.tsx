'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { GraphCanvas } from './GraphCanvas/GraphCanvas';
import { ToolPanel } from './Controls/ToolPanel';
import { NodeProperties } from './DataPanel/NodeProperties';
import { QueryEditor } from './DataPanel/QueryEditor';
import { InferenceResults } from './DataPanel/InferenceResults';
import { FilterPanel } from './Controls/FilterPanel';
import { LayoutSelector } from './Controls/LayoutSelector';
import { Triple, GraphNode, GraphEdge, ViewMode, LayoutType } from './types';
import styles from './KnowledgeGraph.module.css';

interface KnowledgeGraphContainerProps {
  initialTriples?: Triple[];
  onTriplesChange?: (triples: Triple[]) => void;
}

const STORAGE_KEY = 'knowledge-graph-data';

export const KnowledgeGraphContainer: React.FC<KnowledgeGraphContainerProps> = ({
  initialTriples = [],
  onTriplesChange
}) => {
  // Load from localStorage on mount
  const loadFromStorage = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data = JSON.parse(stored);
          return data.triples || [];
        }
      } catch (error) {
        console.warn('Failed to load from localStorage:', error);
      }
    }
    return initialTriples;
  }, [initialTriples]);

  // State management
  const [triples, setTriples] = useState<Triple[]>(loadFromStorage);
  const [viewMode, setViewMode] = useState<ViewMode>('2D');
  const [layoutType, setLayoutType] = useState<LayoutType>('force-directed');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    showClasses: true,
    showProperties: true,
    showIndividuals: true,
    showLiterals: true,
    showInferred: true
  });

  // Mobile panel visibility state
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  
  // Fullscreen mode state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // History for undo/redo
  const [history, setHistory] = useState<Triple[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Auto-save to localStorage
  const saveToStorage = useCallback((triplesData: Triple[]) => {
    if (typeof window !== 'undefined') {
      try {
        const dataToSave = {
          triples: triplesData,
          timestamp: new Date().toISOString(),
          version: '1.0'
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        console.log('Auto-saved to localStorage:', triplesData.length, 'triples');
      } catch (error) {
        console.warn('Failed to save to localStorage:', error);
      }
    }
  }, []);

  // Auto-save whenever triples change
  useEffect(() => {
    saveToStorage(triples);
  }, [triples, saveToStorage]);

  // History management
  const addToHistory = useCallback((newTriples: Triple[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push([...newTriples]);
      return newHistory.slice(-50); // Keep last 50 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setTriples([...previousState]);
      setHistoryIndex(prev => prev - 1);
      onTriplesChange?.(previousState);
    }
  }, [history, historyIndex, onTriplesChange]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setTriples([...nextState]);
      setHistoryIndex(prev => prev + 1);
      onTriplesChange?.(nextState);
    }
  }, [history, historyIndex, onTriplesChange]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Initialize history with current triples
  useEffect(() => {
    if (history.length === 0) {
      setHistory([triples]);
      setHistoryIndex(0);
    }
  }, [triples, history.length]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
        event.preventDefault();
        redo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Triple management
  const addTriple = useCallback((triple: Triple) => {
    const newTriples = [...triples, triple];
    addToHistory(triples); // Save current state before change
    setTriples(newTriples);
    onTriplesChange?.(newTriples);
  }, [triples, onTriplesChange, addToHistory]);

  const updateTriple = useCallback((oldTriple: Triple, newTriple: Triple) => {
    const newTriples = triples.map(t => 
      t.subject === oldTriple.subject && 
      t.predicate === oldTriple.predicate && 
      t.object === oldTriple.object 
        ? newTriple 
        : t
    );
    addToHistory(triples); // Save current state before change
    setTriples(newTriples);
    onTriplesChange?.(newTriples);
  }, [triples, onTriplesChange, addToHistory]);

  const deleteTriple = useCallback((triple: Triple) => {
    const newTriples = triples.filter(t => 
      !(t.subject === triple.subject && 
        t.predicate === triple.predicate && 
        t.object === triple.object)
    );
    addToHistory(triples); // Save current state before change
    setTriples(newTriples);
    onTriplesChange?.(newTriples);
  }, [triples, onTriplesChange, addToHistory]);

  // Node management functions
  const addNode = useCallback((node: { id: string, label: string, type: string, x?: number, y?: number }) => {
    // Add a default triple to represent the node
    const nodeTriple: Triple = {
      subject: node.id,
      predicate: 'type',
      object: node.type
    };
    
    // Also add a label triple
    const labelTriple: Triple = {
      subject: node.id,
      predicate: 'label',
      object: node.label,
      type: 'literal'
    };

    const newTriples = [...triples, nodeTriple, labelTriple];
    setTriples(newTriples);
    onTriplesChange?.(newTriples);
  }, [triples, onTriplesChange]);

  const updateNode = useCallback((nodeId: string, updates: any) => {
    // Update can include position changes or property changes
    // For now, we'll handle position updates by not creating new triples
    // Position is handled at the visualization level
    console.log('Node updated:', nodeId, updates);
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    // Remove all triples that involve this node
    const newTriples = triples.filter(t => 
      t.subject !== nodeId && t.object !== nodeId
    );
    setTriples(newTriples);
    onTriplesChange?.(newTriples);
    
    // Clear selection if deleted node was selected
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  }, [triples, onTriplesChange, selectedNode]);

  const deleteEdge = useCallback((edgeId: string) => {
    // Edge ID format is typically "source|predicate|target"
    const [source, predicate, target] = edgeId.split('|');
    const newTriples = triples.filter(t => 
      !(t.subject === source && t.predicate === predicate && t.object === target)
    );
    setTriples(newTriples);
    onTriplesChange?.(newTriples);
    
    // Clear selection if deleted edge was selected
    if (selectedEdge === edgeId) {
      setSelectedEdge(null);
    }
  }, [triples, onTriplesChange, selectedEdge]);

  // Export functions
  const exportToJSON = useCallback(() => {
    const dataToExport = {
      triples,
      metadata: {
        exportDate: new Date().toISOString(),
        tripleCount: triples.length,
        version: '1.0'
      }
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `knowledge-graph-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [triples]);

  const exportToTurtle = useCallback(() => {
    // Convert triples to Turtle format
    const turtleContent = triples.map(triple => {
      const subject = triple.subject.startsWith(':') ? triple.subject : `<${triple.subject}>`;
      const predicate = triple.predicate.startsWith(':') ? triple.predicate : `<${triple.predicate}>`;
      let object = triple.object;
      
      if (triple.type === 'literal') {
        object = `"${triple.object}"`;
      } else if (!triple.object.startsWith(':')) {
        object = `<${triple.object}>`;
      }
      
      return `${subject} ${predicate} ${object} .`;
    }).join('\n');

    const fullTurtle = `@prefix : <http://example.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

${turtleContent}`;

    const blob = new Blob([fullTurtle], { type: 'text/turtle' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `knowledge-graph-${new Date().toISOString().split('T')[0]}.ttl`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [triples]);

  // Import function
  const importFromFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let importedTriples: Triple[] = [];

        if (file.name.endsWith('.json')) {
          const data = JSON.parse(content);
          importedTriples = data.triples || data;
        } else if (file.name.endsWith('.ttl') || file.name.endsWith('.turtle')) {
          // Basic Turtle parsing (simplified)
          const lines = content.split('\n').filter(line => 
            line.trim() && !line.trim().startsWith('@') && !line.trim().startsWith('#')
          );
          
          importedTriples = lines.map(line => {
            const parts = line.trim().replace(/\s+/g, ' ').split(' ');
            if (parts.length >= 3) {
              const subject = parts[0].replace(/[<>]/g, '').replace('http://example.org/', ':');
              const predicate = parts[1].replace(/[<>]/g, '').replace('http://example.org/', ':');
              let object = parts.slice(2).join(' ').replace(/\s+\.$/, '');
              
              const isLiteral = object.startsWith('"') && object.endsWith('"');
              if (isLiteral) {
                object = object.slice(1, -1);
              } else {
                object = object.replace(/[<>]/g, '').replace('http://example.org/', ':');
              }

              return {
                subject,
                predicate,
                object,
                type: isLiteral ? 'literal' as const : undefined
              };
            }
            return null;
          }).filter(Boolean) as Triple[];
        }

        if (importedTriples.length > 0) {
          setTriples(importedTriples);
          onTriplesChange?.(importedTriples);
          console.log('Imported', importedTriples.length, 'triples');
        }
      } catch (error) {
        console.error('Failed to import file:', error);
        alert('파일 가져오기에 실패했습니다. 파일 형식을 확인해주세요.');
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  }, [onTriplesChange]);

  // Clear data function
  const clearAllData = useCallback(() => {
    if (confirm('모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      setTriples([]);
      onTriplesChange?.([]);
      setSelectedNode(null);
      setSelectedEdge(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [onTriplesChange]);

  const addEdge = useCallback((edge: { id: string, source: string, target: string, predicate: string, label: string }) => {
    // Create a new triple from the edge
    const newTriple: Triple = {
      subject: edge.source,
      predicate: edge.predicate,
      object: edge.target
    };

    // Check if this triple already exists
    const exists = triples.some(t => 
      t.subject === newTriple.subject && 
      t.predicate === newTriple.predicate && 
      t.object === newTriple.object
    );

    if (!exists) {
      const newTriples = [...triples, newTriple];
      setTriples(newTriples);
      onTriplesChange?.(newTriples);
    }
  }, [triples, onTriplesChange]);

  return (
    <div className={isFullscreen ? styles.fullscreenContainer : styles.container}>
      {/* Mobile Toggle Buttons */}
      <div className={styles.mobileToggles}>
        <button 
          className={`${styles.mobileToggle} ${showLeftPanel ? styles.active : ''}`}
          onClick={() => setShowLeftPanel(!showLeftPanel)}
          aria-label="Toggle tools panel"
        >
          🛠️
        </button>
        <button 
          className={`${styles.mobileToggle} ${showRightPanel ? styles.active : ''}`}
          onClick={() => setShowRightPanel(!showRightPanel)}
          aria-label="Toggle properties panel"
        >
          📋
        </button>
        <button 
          className={`${styles.mobileToggle} ${isFullscreen ? styles.active : ''}`}
          onClick={() => setIsFullscreen(!isFullscreen)}
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? '🪟' : '⛶'}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {(showLeftPanel || showRightPanel) && (
        <div 
          className={styles.mobileBackdrop} 
          onClick={() => {
            setShowLeftPanel(false);
            setShowRightPanel(false);
          }}
        />
      )}

      {/* Left Panel - Tools */}
      <div className={`${styles.leftPanel} ${showLeftPanel ? styles.visible : ''}`}>
        <ToolPanel 
          onAddNode={() => {/* Manual node add - Phase 3-1 */}}
          onAddEdge={() => {
            alert('엣지 추가 방법:\n1. Shift + 클릭으로 시작 노드 선택\n2. Shift + 클릭으로 끝 노드 선택\n3. 관계명 입력');
          }}
          onDelete={() => {
            if (selectedNode) {
              deleteNode(selectedNode);
            } else if (selectedEdge) {
              deleteEdge(selectedEdge);
            }
          }}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onExportJSON={exportToJSON}
          onExportTurtle={exportToTurtle}
          onImport={importFromFile}
          onClearAll={clearAllData}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        <LayoutSelector 
          layoutType={layoutType}
          onLayoutChange={setLayoutType}
        />
        <FilterPanel 
          filters={filters}
          triples={triples}
          onFiltersChange={setFilters}
          onSearchResults={(results) => {
            console.log('Search results:', results);
            // Could highlight matching nodes/edges in the graph
          }}
        />
      </div>

      {/* Center - Graph Canvas */}
      <div className={styles.centerPanel}>
        <GraphCanvas
          triples={triples}
          viewMode={viewMode}
          layoutType={layoutType}
          filters={filters}
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          onNodeSelect={setSelectedNode}
          onEdgeSelect={setSelectedEdge}
          onNodeAdd={addNode}
          onNodeUpdate={updateNode}
          onNodeDelete={deleteNode}
          onEdgeAdd={addEdge}
          onEdgeDelete={deleteEdge}
        />
      </div>

      {/* Right Panel - Properties & Query */}
      <div className={`${styles.rightPanel} ${showRightPanel ? styles.visible : ''}`}>
        {selectedNode && (
          <NodeProperties
            nodeId={selectedNode}
            triples={triples}
            onPropertyAdd={(property, value) => {
              addTriple({
                subject: selectedNode,
                predicate: property,
                object: value
              });
            }}
            onPropertyUpdate={(oldProp, newProp, newValue) => {
              // Find and update the specific property
              const oldTriple = triples.find(t => 
                t.subject === selectedNode && t.predicate === oldProp
              );
              if (oldTriple) {
                const newTriple = {
                  ...oldTriple,
                  predicate: newProp,
                  object: newValue
                };
                updateTriple(oldTriple, newTriple);
              }
            }}
            onPropertyDelete={(property) => {
              // Find and delete the specific property
              const tripleToDelete = triples.find(t => 
                t.subject === selectedNode && t.predicate === property
              );
              if (tripleToDelete) {
                deleteTriple(tripleToDelete);
              }
            }}
          />
        )}
        
        {selectedEdge && (
          <div className={styles.panelSection}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>엣지 속성</h3>
            </div>
            <div className={styles.propertyList}>
              {(() => {
                const [source, predicate, target] = selectedEdge.split('|');
                const relatedTriple = triples.find(t => 
                  t.subject === source && t.predicate === predicate && t.object === target
                );
                
                return (
                  <div>
                    <div className={styles.propertyItem}>
                      <span className={styles.propertyPredicate}>Source</span>
                      <span className={styles.propertyValue}>{source}</span>
                    </div>
                    <div className={styles.propertyItem}>
                      <span className={styles.propertyPredicate}>Predicate</span>
                      <span className={styles.propertyValue}>{predicate}</span>
                    </div>
                    <div className={styles.propertyItem}>
                      <span className={styles.propertyPredicate}>Target</span>
                      <span className={styles.propertyValue}>{target}</span>
                    </div>
                    {relatedTriple?.type && (
                      <div className={styles.propertyItem}>
                        <span className={styles.propertyPredicate}>Type</span>
                        <span className={styles.propertyValue}>{relatedTriple.type}</span>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
        
        <QueryEditor
          triples={triples}
          onQueryResult={(results) => {
            console.log('Query executed:', results);
            // TODO: Could highlight matching nodes/edges in the graph
          }}
        />
        
        <InferenceResults
          triples={triples}
          onInferredTriplesChange={(inferredTriples) => {
            console.log('Inferred triples updated:', inferredTriples.length);
            // Could add these to the main triples array if needed
          }}
        />
      </div>
    </div>
  );
};