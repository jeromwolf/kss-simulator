'use client';

import React, { useState } from 'react';
import { Triple, QueryResult } from '../types';
import { Play, RotateCcw, Copy } from 'lucide-react';
import styles from '../KnowledgeGraph.module.css';

interface QueryEditorProps {
  triples: Triple[];
  onQueryResult: (results: QueryResult) => void;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({
  triples,
  onQueryResult
}) => {
  const [query, setQuery] = useState(`SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object .
}
LIMIT 10`);
  const [queryResults, setQueryResults] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple SPARQL query executor (basic implementation)
  const executeSparqlQuery = (queryString: string): QueryResult => {
    try {
      // Parse basic SELECT queries
      const selectMatch = queryString.match(/SELECT\s+(.+?)\s+WHERE/i);
      const whereMatch = queryString.match(/WHERE\s*\{(.+?)\}/i);
      const limitMatch = queryString.match(/LIMIT\s+(\d+)/i);
      
      if (!selectMatch || !whereMatch) {
        throw new Error('Invalid SPARQL query format');
      }

      const variables = selectMatch[1].trim().split(/\s+/).map(v => v.replace('?', ''));
      const whereClause = whereMatch[1].trim();
      const limit = limitMatch ? parseInt(limitMatch[1]) : 100;

      // Basic triple pattern matching
      const triplePattern = whereClause.match(/\?(\w+)\s+\?(\w+)\s+\?(\w+)/);
      
      let results: any[] = [];
      
      if (triplePattern) {
        // ?subject ?predicate ?object pattern
        results = triples.slice(0, limit).map(triple => ({
          [triplePattern[1]]: {
            type: 'uri' as const,
            value: triple.subject
          },
          [triplePattern[2]]: {
            type: 'uri' as const,
            value: triple.predicate
          },
          [triplePattern[3]]: {
            type: triple.type === 'literal' ? 'literal' as const : 'uri' as const,
            value: triple.object
          }
        }));
      } else {
        // Handle specific patterns
        const specificPattern = whereClause.match(/(\??\w+|\:\w+)\s+(\??\w+|\:\w+)\s+(\??\w+|\:\w+)/);
        if (specificPattern) {
          const [, s, p, o] = specificPattern;
          
          results = triples.filter(triple => {
            const subjectMatch = s.startsWith('?') || s === triple.subject || s.replace(':', '') === triple.subject.replace(':', '');
            const predicateMatch = p.startsWith('?') || p === triple.predicate || p.replace(':', '') === triple.predicate.replace(':', '');
            const objectMatch = o.startsWith('?') || o === triple.object || o.replace(':', '') === triple.object.replace(':', '');
            
            return subjectMatch && predicateMatch && objectMatch;
          }).slice(0, limit).map(triple => {
            const binding: any = {};
            
            if (s.startsWith('?')) {
              binding[s.replace('?', '')] = { type: 'uri', value: triple.subject };
            }
            if (p.startsWith('?')) {
              binding[p.replace('?', '')] = { type: 'uri', value: triple.predicate };
            }
            if (o.startsWith('?')) {
              binding[o.replace('?', '')] = { 
                type: triple.type === 'literal' ? 'literal' : 'uri', 
                value: triple.object 
              };
            }
            
            return binding;
          });
        }
      }

      return {
        head: { vars: variables },
        results: { bindings: results }
      };
    } catch (error) {
      throw new Error(`Query execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleRunQuery = async () => {
    setIsExecuting(true);
    setError(null);
    
    try {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const results = executeSparqlQuery(query);
      setQueryResults(results);
      onQueryResult(results);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Query execution failed';
      setError(errorMessage);
      console.error('SPARQL Query Error:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleReset = () => {
    setQuery(`SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object .
}
LIMIT 10`);
    setQueryResults(null);
    setError(null);
  };

  const sampleQueries = [
    {
      name: '모든 트리플',
      query: `SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object .
}
LIMIT 10`
    },
    {
      name: '특정 타입 찾기',
      query: `SELECT ?entity
WHERE {
  ?entity :type :System .
}`
    },
    {
      name: '관계 찾기',
      query: `SELECT ?source ?target
WHERE {
  ?source :hasComponent ?target .
}`
    }
  ];

  return (
    <div className={styles.panelSection}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>SPARQL 쿼리</h3>
      </div>
      
      {/* Sample Queries */}
      <div style={{ marginBottom: '0.75rem' }}>
        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>샘플 쿼리:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {sampleQueries.map((sample, index) => (
            <button
              key={index}
              onClick={() => setQuery(sample.query)}
              style={{
                fontSize: '0.6875rem',
                padding: '0.25rem 0.5rem',
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#374151'
              }}
            >
              {sample.name}
            </button>
          ))}
        </div>
      </div>
      
      <textarea
        className={styles.queryTextarea}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="SPARQL 쿼리를 입력하세요..."
        style={{ fontFamily: 'Monaco, Menlo, monospace', fontSize: '0.8125rem' }}
      />
      
      <div className={styles.queryActions}>
        <button 
          className={styles.queryButton} 
          onClick={handleRunQuery}
          disabled={isExecuting}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            opacity: isExecuting ? 0.7 : 1 
          }}
        >
          <Play size={14} />
          {isExecuting ? '실행 중...' : '실행'}
        </button>
        <button 
          className={styles.queryButton} 
          onClick={handleReset}
          style={{ 
            background: '#6b7280', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem' 
          }}
        >
          <RotateCcw size={14} />
          초기화
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{
          marginTop: '0.75rem',
          padding: '0.75rem',
          background: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '4px',
          color: '#dc2626',
          fontSize: '0.875rem'
        }}>
          <strong>오류:</strong> {error}
        </div>
      )}

      {/* Results Display */}
      {queryResults && !error && (
        <div style={{ marginTop: '0.75rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
              결과 ({queryResults.results.bindings.length}개)
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(queryResults, null, 2));
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              <Copy size={12} />
              복사
            </button>
          </div>
          
          <div style={{
            maxHeight: '200px',
            overflow: 'auto',
            border: '1px solid #e5e7eb',
            borderRadius: '4px'
          }}>
            <table style={{ width: '100%', fontSize: '0.75rem' }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  {queryResults.head.vars.map(variable => (
                    <th key={variable} style={{ 
                      padding: '0.5rem', 
                      textAlign: 'left', 
                      borderBottom: '1px solid #e5e7eb',
                      fontWeight: 600
                    }}>
                      ?{variable}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResults.results.bindings.map((binding, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    {queryResults.head.vars.map(variable => (
                      <td key={variable} style={{ 
                        padding: '0.5rem',
                        color: binding[variable]?.type === 'literal' ? '#7c2d12' : '#1e40af'
                      }}>
                        {binding[variable]?.value || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};