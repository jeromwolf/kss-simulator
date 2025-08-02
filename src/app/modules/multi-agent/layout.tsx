import { Metadata } from 'next';
import { multiAgentMetadata } from './metadata';

export const metadata: Metadata = {
  title: `${multiAgentMetadata.title} - KSS`,
  description: multiAgentMetadata.description,
};

export default function MultiAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-orange-950/10 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}