# KSS Module Template

This template provides a standardized structure for creating new learning modules in the KSS platform.

## Quick Start

To create a new module:

1. Copy this `template` folder and rename it to your module name (e.g., `quantum`, `rag`, `blockchain`)
2. Update the module metadata in `metadata.ts`
3. Create your chapter content in `content/chapters/`
4. Customize components as needed
5. Add the module to the main navigation

## Module Structure

```
your-module/
├── components/           # Module-specific components
│   ├── simulators/      # Interactive simulators
│   └── ...             # Other components
├── content/             # Module content
│   └── chapters/       # MDX chapter files
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── metadata.ts         # Module configuration
├── layout.tsx          # Module layout
├── page.tsx           # Module landing page
└── [chapterId]/       # Dynamic chapter pages
    └── page.tsx
```

## Key Files to Update

### 1. metadata.ts

Update with your module information:

```typescript
export const YOUR_MODULE_METADATA: ModuleMetadata = {
  id: 'your-module',
  title: 'Your Module Title',
  description: 'Module description',
  icon: 'icon-name',
  color: '#hex-color',
  // ... other fields
};
```

### 2. Chapter Content (MDX)

Create chapter files in `content/chapters/`:

```mdx
---
title: "Chapter Title"
description: "Chapter description"
estimatedTime: 45
objectives:
  - "Learning objective 1"
  - "Learning objective 2"
---

# Chapter Content

Your content here...
```

### 3. Custom Components

Add module-specific components in the `components/` directory.

## Available Components

The template includes these reusable components:

- `<Alert>` - Important messages
- `<Callout>` - Highlighted information
- `<Quiz>` - Interactive quizzes
- `<Exercise>` - Coding exercises
- `<CodeBlock>` - Syntax-highlighted code
- Custom simulators as needed

## Styling Guidelines

- Use Tailwind CSS classes
- Follow the existing color scheme
- Maintain dark mode support
- Keep responsive design in mind

## Best Practices

1. **Content Quality**
   - Write clear, concise explanations
   - Use plenty of examples
   - Include interactive elements

2. **Code Organization**
   - Keep components small and focused
   - Use TypeScript for type safety
   - Document complex logic

3. **User Experience**
   - Add progress tracking
   - Include navigation aids
   - Provide feedback on interactions

## Testing Checklist

Before deploying your module:

- [ ] All chapters load correctly
- [ ] Navigation works properly
- [ ] Progress tracking functions
- [ ] Interactive components work
- [ ] Dark mode displays correctly
- [ ] Mobile responsive design
- [ ] No TypeScript errors
- [ ] Content is accurate and clear