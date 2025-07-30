/**
 * MDX Utilities
 * Handles loading and processing MDX content for chapters
 */

import { compileMDX } from 'next-mdx-remote/rsc';
import { ChapterContent } from '../types';

// Custom MDX components
import { CodeBlock } from '../components/CodeBlock';
import { Quiz } from '../components/Quiz';
import { Exercise } from '../components/Exercise';
import { TokenizerSimulator } from '../components/simulators/TokenizerSimulator';
import { AttentionVisualizer } from '../components/simulators/AttentionVisualizer';
import { Alert } from '../components/Alert';
import { Callout } from '../components/Callout';

const components = {
  // Code blocks
  pre: CodeBlock,
  
  // Interactive components
  Quiz,
  Exercise,
  TokenizerSimulator,
  AttentionVisualizer,
  
  // UI components
  Alert,
  Callout,
  
  // Enhanced HTML elements
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-purple-500 pl-4 py-2 mb-4 bg-purple-50 dark:bg-purple-900/20" {...props}>
      <div className="text-gray-700 dark:text-gray-300 italic">{children}</div>
    </blockquote>
  ),
  code: ({ children, ...props }: any) => {
    // Inline code
    if (!props.className) {
      return (
        <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }
    // Block code is handled by pre/CodeBlock
    return <code {...props}>{children}</code>;
  },
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: any) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </td>
  ),
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href} 
      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline decoration-purple-300 dark:decoration-purple-700"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  hr: (props: any) => (
    <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
  ),
};

export async function loadChapterContent(chapterId: string): Promise<ChapterContent | null> {
  try {
    // Dynamically import the MDX file
    const mdxModule = await import(`../content/chapters/${chapterId}.mdx`);
    
    // Compile the MDX content
    const { content, frontmatter } = await compileMDX({
      source: mdxModule.default,
      components,
    });

    return {
      metadata: {
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        estimatedTime: frontmatter.estimatedTime || 30,
        objectives: frontmatter.objectives || [],
      },
      content,
    };
  } catch (error) {
    console.error(`Error loading chapter ${chapterId}:`, error);
    return null;
  }
}

// Utility to preload a chapter
export async function preloadChapter(chapterId: string) {
  try {
    await import(`../content/chapters/${chapterId}.mdx`);
  } catch (error) {
    console.error(`Error preloading chapter ${chapterId}:`, error);
  }
}