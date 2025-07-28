'use client';

import React, { useState } from 'react';
import { Play, FileText, Loader } from 'lucide-react';

interface QueryEditorProps {
  onExecute: (query: string) => void;
  isLoading?: boolean;
  exampleQueries?: Array<{
    title: string;
    query: string;
  }>;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({
  onExecute,
  isLoading = false,
  exampleQueries = []
}) => {
  const [query, setQuery] = useState(`PREFIX : <http://example.org/>

SELECT ?subject ?object
WHERE {
  ?subject :hasName ?object .
}`);

  const handleExecute = () => {
    if (query.trim()) {
      onExecute(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleExecute();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">SPARQL 쿼리 에디터</h3>
        <button
          onClick={handleExecute}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              실행 중...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              실행 (Ctrl+Enter)
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-64 p-4 font-mono text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="SPARQL 쿼리를 입력하세요..."
          spellCheck={false}
        />
        <div className="absolute top-2 right-2 text-xs text-gray-500">
          SPARQL
        </div>
      </div>

      {exampleQueries.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            예제 쿼리:
          </h4>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => setQuery(example.query)}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                {example.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>💡 지원되는 쿼리 형식:</p>
        <ul className="list-disc list-inside ml-2">
          <li>SELECT 쿼리 (변수 조회)</li>
          <li>기본 트리플 패턴 매칭</li>
          <li>변수 바인딩</li>
        </ul>
      </div>
    </div>
  );
};