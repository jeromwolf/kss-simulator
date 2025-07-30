import { Triple, GraphNode, GraphEdge, FilterOptions } from '../types';

export function tripleToGraph(
  triples: Triple[], 
  filters: FilterOptions
): { nodes: GraphNode[], edges: GraphEdge[] } {
  const nodeMap = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  // First pass: collect all nodes
  triples.forEach((triple) => {
    // Skip if filtered out
    if (triple.isInferred && !filters.showInferred) return;

    // Process subject
    if (!nodeMap.has(triple.subject)) {
      const nodeType = inferNodeType(triple.subject, triples);
      if (shouldShowNode(nodeType, filters)) {
        nodeMap.set(triple.subject, {
          id: triple.subject,
          label: getLabel(triple.subject),
          type: nodeType,
          color: getNodeColor(nodeType)
        });
      }
    }

    // Process object (if not literal)
    if (triple.type !== 'literal' && !nodeMap.has(triple.object)) {
      const nodeType = inferNodeType(triple.object, triples);
      if (shouldShowNode(nodeType, filters)) {
        nodeMap.set(triple.object, {
          id: triple.object,
          label: getLabel(triple.object),
          type: nodeType,
          color: getNodeColor(nodeType)
        });
      }
    } else if (triple.type === 'literal' && filters.showLiterals) {
      // Add literal nodes
      const literalId = `${triple.subject}-${triple.predicate}-${triple.object}`;
      if (!nodeMap.has(literalId)) {
        nodeMap.set(literalId, {
          id: literalId,
          label: triple.object,
          type: 'literal',
          color: getNodeColor('literal')
        });
      }
    }

    // Create edge
    const targetId = triple.type === 'literal' 
      ? `${triple.subject}-${triple.predicate}-${triple.object}`
      : triple.object;

    if (nodeMap.has(triple.subject) && (nodeMap.has(targetId) || triple.type === 'literal')) {
      edges.push({
        id: `${triple.subject}-${triple.predicate}-${targetId}`,
        source: triple.subject,
        target: targetId,
        label: getLabel(triple.predicate),
        type: getEdgeType(triple.predicate),
        isInferred: triple.isInferred,
        color: getEdgeColor(triple.predicate, triple.isInferred)
      });
    }
  });

  return {
    nodes: Array.from(nodeMap.values()),
    edges
  };
}

function inferNodeType(nodeId: string, triples: Triple[]): GraphNode['type'] {
  // Check if it's used as a class
  if (triples.some(t => t.predicate === 'rdf:type' && t.object === nodeId)) {
    return 'class';
  }
  
  // Check if it's used as a property
  if (triples.some(t => t.predicate === nodeId)) {
    return 'property';
  }
  
  // Check if it has a type
  const typeTriple = triples.find(t => t.subject === nodeId && t.predicate === 'rdf:type');
  if (typeTriple) {
    return 'individual';
  }
  
  // Default to individual
  return 'individual';
}

function shouldShowNode(type: GraphNode['type'], filters: FilterOptions): boolean {
  switch (type) {
    case 'class': return filters.showClasses;
    case 'property': return filters.showProperties;
    case 'individual': return filters.showIndividuals;
    case 'literal': return filters.showLiterals;
    default: return true;
  }
}

function getLabel(uri: string): string {
  // Remove namespace prefix for display
  if (uri.includes('#')) {
    return uri.split('#').pop() || uri;
  }
  if (uri.includes('/')) {
    return uri.split('/').pop() || uri;
  }
  if (uri.startsWith(':')) {
    return uri.substring(1);
  }
  return uri;
}

function getNodeColor(type: GraphNode['type']): string {
  switch (type) {
    case 'class': return '#3b82f6'; // blue
    case 'property': return '#8b5cf6'; // purple
    case 'individual': return '#10b981'; // green
    case 'literal': return '#f59e0b'; // amber
    default: return '#6b7280'; // gray
  }
}

function getEdgeType(predicate: string): GraphEdge['type'] {
  if (predicate === 'rdf:type') return 'type';
  if (predicate === 'rdfs:subClassOf') return 'subclass';
  if (predicate.includes('datatype') || predicate.includes('literal')) return 'datatype';
  return 'object';
}

function getEdgeColor(predicate: string, isInferred?: boolean): string {
  if (isInferred) return '#9ca3af'; // gray for inferred
  if (predicate === 'rdf:type') return '#3b82f6'; // blue
  if (predicate === 'rdfs:subClassOf') return '#8b5cf6'; // purple
  return '#6b7280'; // default gray
}