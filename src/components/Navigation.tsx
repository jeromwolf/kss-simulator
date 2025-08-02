'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, TrendingUp, Home, Network, Video } from 'lucide-react';
import KSSLogo from './icons/KSSLogo';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/ontology', label: '온톨로지', icon: Brain },
    { href: '/stock-analysis', label: '주식투자분석', icon: TrendingUp },
    { href: '/video-creator', label: '비디오 생성', icon: Video },
    { href: '/modules/neo4j', label: 'Neo4j', icon: Network },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <KSSLogo className="w-8 h-8" />
              <span className="font-bold text-xl">KSS</span>
            </Link>
            
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                                (item.href !== '/' && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* 온톨로지 페이지에서만 도구 링크 표시 */}
            {pathname.startsWith('/ontology') && (
              <>
                <Link
                  href="/rdf-editor"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  RDF 에디터
                </Link>
                <Link
                  href="/sparql-playground"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  SPARQL
                </Link>
                <Link
                  href="/3d-graph"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  3D 그래프
                </Link>
                <Link
                  href="/video-creator"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  비디오
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}