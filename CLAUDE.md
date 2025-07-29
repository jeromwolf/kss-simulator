# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Korean-language educational platform called KSS (Knowledge Space Simulator) - a next-generation learning platform that simulates and experiences complex technical concepts. Currently focused on Ontology education with 16 chapters of comprehensive content.

## Project Structure

The project has evolved through multiple iterations:
- `index.html` - Original single-page ontology education site
- `kss-standalone/` - Current active Next.js 14 project
- `cognosphere/` - Future monorepo structure (planned)
- `chapters/` - Original HTML content files

## Current Focus: kss-standalone

### Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS modules
- **UI Components**: Radix UI, Lucide Icons
- **Visualization**: D3.js (planned)
- **Font**: Inter + Noto Sans KR

### Key Features Implemented
1. **Learning Experience**
   - 16 chapters of ontology content
   - Dark mode support
   - Progress tracking (localStorage)
   - Table of Contents with scroll tracking
   - Responsive design

2. **UI Components**
   - Sidebar navigation with chapter numbers
   - Progress tracker
   - Dark mode toggle
   - Enhanced code blocks

### Development Commands
```bash
cd kss-standalone
npm install
npm run dev   # Development server
npm run build # Production build
npm start     # Production server
```

## Architecture Decisions

### Hybrid Approach
1. **Phase 1**: Minimal structure design (3 days) ✅
2. **Phase 2**: Ontology MVP development (2-3 weeks) - IN PROGRESS
3. **Phase 3**: Structure expansion (1-2 months)

### Development Methodology
- **A2A (Agent to Agent)**: Divide large tasks into independent agents
- **Task Master MCP**: Complex task division and management
- **Microservices**: Future scalability preparation

## Important Context

### Vision
- Building a platform like Jensen Huang's COSMOS for Physical AI
- Aiming for a large-scale platform with multiple domain simulators
- Starting with ontology, expanding to LLM, Quantum Computing, RAG simulators

### Next Steps
1. RDF Triple visual editor
2. SPARQL query playground
3. Real-time inference visualization
4. 3D knowledge graphs
5. YouTube content generation with Remotion

### GitHub Repository
https://github.com/jeromwolf/kss-simulator

## Session Notes
- Last updated: 2025-07-29 (Session 3 - Reconnected)
- Main working directory: `/Users/kelly/Desktop/Space/project/Ontology/kss-standalone`
- Content preservation: Keep original HTML structure while enhancing styles
- Focus on learning experience over pure technical implementation

### Current Session Status (2025-07-30)
- **Session 4**: UI/UX Style Unification
- **Completed tasks**:
  - Homepage style unification with Enterprise Knowledge Simulators theme
  - Ontology page style improvements:
    - Reduced excessive whitespace across all sections
    - Fixed text visibility issues in dark mode
    - Optimized layout for better content density
    - Made learning roadmap and tools display in single rows
    - Increased CTA button font size for better readability
  - Fixed chapter navigation system with CustomEvent integration
- **Next tasks**:
  - Continue style optimization for other pages (stock analysis, tools)
  - Enhance content depth for all modules
  - Implement remaining interactive features
- **Technical notes**:
  - Using CustomEvent for HTML→React component communication
  - Maintaining professional, enterprise-style design language
  - Focus on compact, efficient layouts without sacrificing readability
  - Fixed tool links to navigate to actual pages (/rdf-editor, /sparql-playground, /3d-graph, /video-creator)