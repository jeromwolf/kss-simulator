'use client';

import dynamic from 'next/dynamic';
import { Loader } from 'lucide-react';

// Remotion은 클라이언트 사이드에서만 작동
const OntologyShortsCreator = dynamic(
  () => import('@/components/video-creator/OntologyShortsCreator').then(mod => ({ default: mod.OntologyShortsCreator })),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }
);

export default function OntologyShortsPage() {
  return <OntologyShortsCreator />;
}