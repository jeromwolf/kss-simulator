'use client';

import React from 'react';
import { Table, AlertCircle, CheckCircle } from 'lucide-react';

interface QueryResult {
  head: {
    vars: string[];
  };
  results: {
    bindings: Array<Record<string, { type: string; value: string }>>;
  };
}

interface ResultsViewProps {
  result: QueryResult | null;
  error: string | null;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, error }) => {
  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          <span className="font-semibold">오류</span>
        </div>
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        <Table className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>쿼리를 실행하면 결과가 여기에 표시됩니다.</p>
      </div>
    );
  }

  if (result.results.bindings.length === 0) {
    return (
      <div className="p-8 text-center">
        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400">
          쿼리가 성공적으로 실행되었지만 결과가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">쿼리 결과</h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {result.results.bindings.length}개 결과
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              {result.head.vars.map((varName) => (
                <th
                  key={varName}
                  className="px-4 py-2 text-left font-semibold text-sm border-b dark:border-gray-700"
                >
                  ?{varName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.results.bindings.map((binding, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {result.head.vars.map((varName) => (
                  <td
                    key={varName}
                    className="px-4 py-2 text-sm border-b dark:border-gray-700"
                  >
                    {binding[varName] ? (
                      <span
                        className={`font-mono ${
                          binding[varName].type === 'literal'
                            ? 'text-orange-600 dark:text-orange-400'
                            : 'text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {binding[varName].value}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>🔍 결과 타입: 리터럴(주황색), 리소스(파란색)</p>
      </div>
    </div>
  );
};