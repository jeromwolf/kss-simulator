// Basic RDF Triple
export interface Triple {
  subject: string;
  predicate: string;
  object: string;
  type?: 'resource' | 'literal';
  isInferred?: boolean;
}

// Graph visualization types
export interface GraphNode {
  id: string;
  label: string;
  type: 'class' | 'property' | 'individual' | 'literal';
  x?: number;
  y?: number;
  z?: number;
  color?: string;
  size?: number;
  isSelected?: boolean;
  isHovered?: boolean;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type?: 'object' | 'datatype' | 'subclass' | 'type';
  isInferred?: boolean;
  color?: string;
}

// View and layout types
export type ViewMode = '2D' | '3D';
export type LayoutType = 'force-directed' | 'hierarchical' | 'circular' | 'grid';

// Tool types
export type ToolType = 'select' | 'add-node' | 'add-edge' | 'delete' | 'pan';

// Filter types
export interface FilterOptions {
  showClasses: boolean;
  showProperties: boolean;
  showIndividuals: boolean;
  showLiterals: boolean;
  showInferred: boolean;
}

// SPARQL query result
export interface QueryResult {
  head: { vars: string[] };
  results: {
    bindings: Array<{
      [key: string]: {
        type: 'uri' | 'literal' | 'bnode';
        value: string;
        datatype?: string;
        'xml:lang'?: string;
      };
    }>;
  };
}

// Node property
export interface NodeProperty {
  predicate: string;
  value: string;
  type: 'resource' | 'literal';
}

// Graph statistics
export interface GraphStats {
  nodeCount: number;
  edgeCount: number;
  classCount: number;
  individualCount: number;
  propertyCount: number;
  literalCount: number;
}