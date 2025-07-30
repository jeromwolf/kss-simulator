'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Eye, EyeOff, Zap } from 'lucide-react';
import { FilterOptions, Triple } from '../types';
import styles from '../KnowledgeGraph.module.css';

interface AdvancedFilterOptions extends FilterOptions {
  searchQuery: string;
  predicateFilter: string;
  connectionThreshold: number;
  showOrphaned: boolean;
  highlightSubgraph: string;
}

interface FilterPanelProps {
  filters: FilterOptions;
  triples: Triple[];
  onFiltersChange: (filters: FilterOptions) => void;
  onSearchResults?: (results: { nodes: string[], edges: string[] }) => void;
}

type FilterCategory = 'basic' | 'advanced' | 'search' | 'analytics';

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  triples,
  onFiltersChange,
  onSearchResults
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [predicateFilter, setPredicateFilter] = useState('');
  const [connectionThreshold, setConnectionThreshold] = useState(1);
  const [showOrphaned, setShowOrphaned] = useState(true);
  const [highlightSubgraph, setHighlightSubgraph] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('basic');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Advanced analytics
  const analytics = useMemo(() => {
    const nodeConnections = new Map<string, number>();
    const predicateCount = new Map<string, number>();
    const uniqueNodes = new Set<string>();
    
    triples.forEach(triple => {
      uniqueNodes.add(triple.subject);
      uniqueNodes.add(triple.object);
      
      nodeConnections.set(triple.subject, (nodeConnections.get(triple.subject) || 0) + 1);
      nodeConnections.set(triple.object, (nodeConnections.get(triple.object) || 0) + 1);
      
      predicateCount.set(triple.predicate, (predicateCount.get(triple.predicate) || 0) + 1);
    });
    
    const hubNodes = Array.from(nodeConnections.entries())
      .filter(([_, count]) => count >= connectionThreshold)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 10);
    
    const topPredicates = Array.from(predicateCount.entries())
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 5);
    
    return {
      totalNodes: uniqueNodes.size,
      totalEdges: triples.length,
      hubNodes,
      topPredicates,
      averageConnections: nodeConnections.size > 0 ? 
        Array.from(nodeConnections.values()).reduce((a, b) => a + b, 0) / nodeConnections.size : 0
    };
  }, [triples, connectionThreshold]);

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { nodes: [], edges: [] };
    
    const query = searchQuery.toLowerCase();
    const matchingNodes = new Set<string>();
    const matchingEdges = new Set<string>();
    
    triples.forEach(triple => {
      const edgeId = `${triple.subject}|${triple.predicate}|${triple.object}`;
      
      if (triple.subject.toLowerCase().includes(query) ||
          triple.predicate.toLowerCase().includes(query) ||
          triple.object.toLowerCase().includes(query)) {
        matchingNodes.add(triple.subject);
        matchingNodes.add(triple.object);
        matchingEdges.add(edgeId);
      }
    });
    
    return {
      nodes: Array.from(matchingNodes),
      edges: Array.from(matchingEdges)
    };
  }, [searchQuery, triples]);

  // Notify parent of search results
  React.useEffect(() => {
    onSearchResults?.(searchResults);
  }, [searchResults, onSearchResults]);

  const handleFilterChange = (key: keyof FilterOptions) => {
    onFiltersChange({
      ...filters,
      [key]: !filters[key]
    });
  };

  const handlePredicateFilterChange = (predicate: string) => {
    setPredicateFilter(prev => prev === predicate ? '' : predicate);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setPredicateFilter('');
    setHighlightSubgraph('');
    onFiltersChange({
      showClasses: true,
      showProperties: true,
      showIndividuals: true,
      showLiterals: true,
      showInferred: true
    });
  };

  const categoryTabs = [
    { id: 'basic' as FilterCategory, label: '기본', icon: Filter },
    { id: 'search' as FilterCategory, label: '검색', icon: Search },
    { id: 'advanced' as FilterCategory, label: '고급', icon: Zap },
    { id: 'analytics' as FilterCategory, label: '분석', icon: Eye }
  ];

  return (
    <div className={styles.panelSection}>
      <div className={styles.panelHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} />
          <h3 className={styles.panelTitle}>필터 & 검색</h3>
        </div>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={clearAllFilters}
            style={{
              padding: '0.25rem',
              background: 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#64748b',
              fontSize: '0.75rem'
            }}
            title="모든 필터 초기화"
          >
            <X size={14} />
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              padding: '0.25rem',
              background: 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            {isCollapsed ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
        </div>
      </div>
      
      {!isCollapsed && (
        <>
          {/* Category Tabs */}
          <div className={styles.filterTabs}>
            {categoryTabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`${styles.filterTab} ${activeCategory === id ? styles.filterTabActive : ''}`}
              >
                <Icon size={12} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Basic Filters */}
          {activeCategory === 'basic' && (
            <div className={styles.filterList}>
              <label className={styles.filterItem}>
                <input
                  type="checkbox"
                  className={styles.filterCheckbox}
                  checked={filters.showClasses}
                  onChange={() => handleFilterChange('showClasses')}
                />
                <span className={styles.filterLabel}>클래스 표시</span>
                <span className={styles.filterCount}>
                  ({triples.filter(t => !t.type || t.type === 'resource').length})
                </span>
              </label>
              
              <label className={styles.filterItem}>
                <input
                  type="checkbox"
                  className={styles.filterCheckbox}
                  checked={filters.showProperties}
                  onChange={() => handleFilterChange('showProperties')}
                />
                <span className={styles.filterLabel}>속성 표시</span>
                <span className={styles.filterCount}>
                  ({new Set(triples.map(t => t.predicate)).size})
                </span>
              </label>
              
              <label className={styles.filterItem}>
                <input
                  type="checkbox"
                  className={styles.filterCheckbox}
                  checked={filters.showIndividuals}
                  onChange={() => handleFilterChange('showIndividuals')}
                />
                <span className={styles.filterLabel}>개체 표시</span>
                <span className={styles.filterCount}>
                  ({triples.filter(t => t.type === 'resource').length})
                </span>
              </label>
              
              <label className={styles.filterItem}>
                <input
                  type="checkbox"
                  className={styles.filterCheckbox}
                  checked={filters.showLiterals}
                  onChange={() => handleFilterChange('showLiterals')}
                />
                <span className={styles.filterLabel}>리터럴 표시</span>
                <span className={styles.filterCount}>
                  ({triples.filter(t => t.type === 'literal').length})
                </span>
              </label>
              
              <label className={styles.filterItem}>
                <input
                  type="checkbox"
                  className={styles.filterCheckbox}
                  checked={filters.showInferred}
                  onChange={() => handleFilterChange('showInferred')}
                />
                <span className={styles.filterLabel}>추론된 관계</span>
                <span className={styles.filterCount}>
                  ({triples.filter(t => t.isInferred).length})
                </span>
              </label>
            </div>
          )}

          {/* Search */}
          {activeCategory === 'search' && (
            <div className={styles.searchPanel}>
              <div className={styles.searchInput}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="노드, 속성, 관계 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchField}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={styles.searchClear}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              
              {searchResults.nodes.length > 0 && (
                <div className={styles.searchResults}>
                  <p className={styles.searchSummary}>
                    {searchResults.nodes.length}개 노드, {searchResults.edges.length}개 관계 발견
                  </p>
                  <div className={styles.searchMatches}>
                    {searchResults.nodes.slice(0, 5).map(node => (
                      <div key={node} className={styles.searchMatch}>
                        {node.replace(/^:/, '')}
                      </div>
                    ))}
                    {searchResults.nodes.length > 5 && (
                      <div className={styles.searchMore}>
                        +{searchResults.nodes.length - 5}개 더
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Advanced Filters */}
          {activeCategory === 'advanced' && (
            <div className={styles.advancedFilters}>
              <div className={styles.filterGroup}>
                <label className={styles.filterGroupLabel}>속성별 필터</label>
                <div className={styles.predicateFilters}>
                  {analytics.topPredicates.map(([predicate, count]) => (
                    <button
                      key={predicate}
                      onClick={() => handlePredicateFilterChange(predicate)}
                      className={`${styles.predicateFilter} ${
                        predicateFilter === predicate ? styles.predicateFilterActive : ''
                      }`}
                    >
                      <span>{predicate.replace(/^:/, '')}</span>
                      <span className={styles.predicateCount}>({count})</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.filterGroup}>
                <label className={styles.filterGroupLabel}>
                  연결 임계값: {connectionThreshold}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={connectionThreshold}
                  onChange={(e) => setConnectionThreshold(parseInt(e.target.value))}
                  className={styles.connectionSlider}
                />
              </div>
              
              <label className={styles.filterItem}>
                <input
                  type="checkbox"
                  checked={showOrphaned}
                  onChange={(e) => setShowOrphaned(e.target.checked)}
                />
                <span className={styles.filterLabel}>고립된 노드 표시</span>
              </label>
            </div>
          )}

          {/* Analytics */}
          {activeCategory === 'analytics' && (
            <div className={styles.analyticsPanel}>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{analytics.totalNodes}</span>
                  <span className={styles.statLabel}>총 노드</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{analytics.totalEdges}</span>
                  <span className={styles.statLabel}>총 관계</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{analytics.averageConnections.toFixed(1)}</span>
                  <span className={styles.statLabel}>평균 연결</span>
                </div>
              </div>
              
              <div className={styles.hubNodes}>
                <h4 className={styles.analyticsSectionTitle}>허브 노드</h4>
                {analytics.hubNodes.map(([node, connections]) => (
                  <div key={node} className={styles.hubNode}>
                    <span className={styles.hubNodeName}>{node.replace(/^:/, '')}</span>
                    <span className={styles.hubNodeConnections}>{connections}개 연결</span>
                  </div>
                ))}
              </div>
              
              <div className={styles.topPredicates}>
                <h4 className={styles.analyticsSectionTitle}>주요 속성</h4>
                {analytics.topPredicates.map(([predicate, count]) => (
                  <div key={predicate} className={styles.topPredicate}>
                    <span className={styles.predicateName}>{predicate.replace(/^:/, '')}</span>
                    <span className={styles.predicateUsage}>{count}회 사용</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};