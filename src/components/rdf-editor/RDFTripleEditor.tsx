'use client';

import React, { useState } from 'react';
import { TripleForm } from './TripleForm';
import { TripleList } from './TripleList';
import { TripleVisualization } from './TripleVisualization';
import { InferenceEngine } from './components/InferenceEngine';
import { useTripleStore } from './hooks/useTripleStore';
import { Download, Upload, Trash2, Play, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { RDFEditorHelp } from './RDFEditorHelp';

export const RDFTripleEditor: React.FC = () => {
  const {
    triples,
    selectedTriple,
    setSelectedTriple,
    addTriple,
    updateTriple,
    deleteTriple,
    clearTriples,
    exportTriples,
    importTriples,
  } = useTripleStore();

  const [editingTriple, setEditingTriple] = useState<any>(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleExport = () => {
    const data = exportTriples();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rdf-triples-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (Array.isArray(data)) {
          importTriples(data);
        }
      } catch (error) {
        alert('파일을 읽는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">RDF Triple 비주얼 에디터</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowHelp(true)}
            className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-md hover:bg-green-200 dark:hover:bg-green-900/50 flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            도움말
          </button>
          <Link
            href="/sparql-playground"
            className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/50 flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            SPARQL 쿼리
          </Link>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            내보내기
          </button>
          <label className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            가져오기
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <button
            onClick={() => {
              if (confirm('모든 트리플을 삭제하시겠습니까?')) {
                clearTriples();
              }
            }}
            className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            전체 삭제
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">트리플 입력</h2>
            <TripleForm
              onSubmit={(triple) => {
                if (editingTriple) {
                  updateTriple(editingTriple.id, triple);
                  setEditingTriple(null);
                } else {
                  addTriple(triple);
                }
              }}
              initialValues={editingTriple}
              onCancel={editingTriple ? () => setEditingTriple(null) : undefined}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">트리플 목록</h2>
            <div className="max-h-96 overflow-y-auto">
              <TripleList
                triples={triples}
                selectedTriple={selectedTriple}
                onSelect={setSelectedTriple}
                onEdit={setEditingTriple}
                onDelete={deleteTriple}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">시각화</h2>
            <div className="w-full overflow-x-auto">
              <TripleVisualization
                triples={triples}
                selectedTriple={selectedTriple}
                width={Math.min(600, typeof window !== 'undefined' ? window.innerWidth - 80 : 600)}
                height={400}
              />
            </div>
          </div>
          
          <div>
            <InferenceEngine triples={triples} />
          </div>
        </div>
      </div>

      {triples.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">통계</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">전체 트리플:</span>
              <span className="ml-2 font-semibold">{triples.length}개</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">고유 주어:</span>
              <span className="ml-2 font-semibold">
                {new Set(triples.map(t => t.subject)).size}개
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">고유 서술어:</span>
              <span className="ml-2 font-semibold">
                {new Set(triples.map(t => t.predicate)).size}개
              </span>
            </div>
          </div>
        </div>
      )}
      
      <RDFEditorHelp isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};