import Link from 'next/link';
import { Home, FileCode2, Play } from 'lucide-react';

export default function Graph3DLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">KSS - 3D Graph Visualization</h1>
            <nav className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                홈으로
              </Link>
              <Link
                href="/rdf-editor"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex items-center gap-2"
              >
                <FileCode2 className="w-4 h-4" />
                RDF 에디터
              </Link>
              <Link
                href="/sparql-playground"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                SPARQL
              </Link>
              <Link
                href="/ontology"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                온톨로지 학습
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}