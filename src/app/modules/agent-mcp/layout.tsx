import { Metadata } from 'next';
import { MODULE_METADATA } from './metadata';

export const metadata: Metadata = {
  title: `${MODULE_METADATA.name} - KSS`,
  description: MODULE_METADATA.description,
};

export default function AgentMCPA2ALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-purple-950/10 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}