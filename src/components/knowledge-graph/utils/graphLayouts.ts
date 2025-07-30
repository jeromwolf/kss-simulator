import * as d3 from 'd3';
import { GraphNode, GraphEdge, LayoutType } from '../types';

interface LayoutResult {
  nodes: GraphNode[];
  edges: Array<GraphEdge & { source: GraphNode; target: GraphNode }>;
}

export function applyLayout(
  data: { nodes: GraphNode[], edges: GraphEdge[] },
  layoutType: LayoutType,
  width: number,
  height: number
): LayoutResult {
  const nodes = data.nodes.map(node => ({ ...node }));
  const edges = data.edges.map(edge => ({ ...edge }));
  
  // Create node map for edge resolution
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  
  // Resolve edge source/target references
  const resolvedEdges = edges.map(edge => ({
    ...edge,
    source: nodeMap.get(edge.source)!,
    target: nodeMap.get(edge.target)!
  })).filter(e => e.source && e.target);

  switch (layoutType) {
    case 'force-directed':
      return forceDirectedLayout(nodes, resolvedEdges, width, height);
    case 'hierarchical':
      return hierarchicalLayout(nodes, resolvedEdges, width, height);
    case 'circular':
      return circularLayout(nodes, resolvedEdges, width, height);
    case 'grid':
      return gridLayout(nodes, resolvedEdges, width, height);
    default:
      return forceDirectedLayout(nodes, resolvedEdges, width, height);
  }
}

function forceDirectedLayout(
  nodes: GraphNode[],
  edges: any[],
  width: number,
  height: number
): LayoutResult {
  // Create a force simulation
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink<GraphNode, any>(edges)
      .id(d => d.id)
      .distance(100))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(30))
    .stop();

  // Run the simulation
  for (let i = 0; i < 300; i++) {
    simulation.tick();
  }

  return { nodes, edges };
}

function hierarchicalLayout(
  nodes: GraphNode[],
  edges: any[],
  width: number,
  height: number
): LayoutResult {
  // Build hierarchy
  const roots = findRoots(nodes, edges);
  const levels = buildLevels(nodes, edges, roots);
  
  // Calculate positions
  const levelHeight = height / (Math.max(...Array.from(levels.values())) + 1);
  const nodesByLevel = new Map<number, GraphNode[]>();
  
  levels.forEach((level, nodeId) => {
    const node = nodes.find(n => n.id === nodeId)!;
    if (!nodesByLevel.has(level)) {
      nodesByLevel.set(level, []);
    }
    nodesByLevel.get(level)!.push(node);
  });
  
  nodesByLevel.forEach((levelNodes, level) => {
    const levelWidth = width / (levelNodes.length + 1);
    levelNodes.forEach((node, index) => {
      node.x = levelWidth * (index + 1);
      node.y = levelHeight * (level + 1);
    });
  });

  return { nodes, edges };
}

function circularLayout(
  nodes: GraphNode[],
  edges: any[],
  width: number,
  height: number
): LayoutResult {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.4;
  
  nodes.forEach((node, index) => {
    const angle = (2 * Math.PI * index) / nodes.length;
    node.x = centerX + radius * Math.cos(angle);
    node.y = centerY + radius * Math.sin(angle);
  });

  return { nodes, edges };
}

function gridLayout(
  nodes: GraphNode[],
  edges: any[],
  width: number,
  height: number
): LayoutResult {
  const cols = Math.ceil(Math.sqrt(nodes.length));
  const rows = Math.ceil(nodes.length / cols);
  const cellWidth = width / (cols + 1);
  const cellHeight = height / (rows + 1);
  
  nodes.forEach((node, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    node.x = cellWidth * (col + 1);
    node.y = cellHeight * (row + 1);
  });

  return { nodes, edges };
}

// Helper functions
function findRoots(
  nodes: GraphNode[],
  edges: Array<GraphEdge & { source: GraphNode; target: GraphNode }>
): Set<string> {
  const hasIncoming = new Set(edges.map(e => e.target.id));
  return new Set(nodes.filter(n => !hasIncoming.has(n.id)).map(n => n.id));
}

function buildLevels(
  nodes: GraphNode[],
  edges: Array<GraphEdge & { source: GraphNode; target: GraphNode }>,
  roots: Set<string>
): Map<string, number> {
  const levels = new Map<string, number>();
  const queue: Array<{ id: string, level: number }> = [];
  
  // Initialize with roots
  roots.forEach(rootId => {
    queue.push({ id: rootId, level: 0 });
    levels.set(rootId, 0);
  });
  
  // BFS to assign levels
  while (queue.length > 0) {
    const { id, level } = queue.shift()!;
    
    // Find children
    edges
      .filter(e => e.source.id === id)
      .forEach(e => {
        if (!levels.has(e.target.id) || levels.get(e.target.id)! > level + 1) {
          levels.set(e.target.id, level + 1);
          queue.push({ id: e.target.id, level: level + 1 });
        }
      });
  }
  
  // Assign level 0 to any unassigned nodes
  nodes.forEach(node => {
    if (!levels.has(node.id)) {
      levels.set(node.id, 0);
    }
  });
  
  return levels;
}