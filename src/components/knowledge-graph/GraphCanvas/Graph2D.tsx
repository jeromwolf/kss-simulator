'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';
import { Triple, GraphNode, GraphEdge, LayoutType, FilterOptions } from '../types';
import { applyLayout } from '../utils/graphLayouts';
import { tripleToGraph } from '../utils/graphUtils';
import styles from './Graph2D.module.css';

interface Graph2DProps {
  triples: Triple[];
  layoutType: LayoutType;
  filters: FilterOptions;
  selectedNode: string | null;
  selectedEdge: string | null;
  onNodeSelect: (nodeId: string | null) => void;
  onEdgeSelect: (edgeId: string | null) => void;
  onNodeAdd: (node: any) => void;
  onNodeUpdate: (nodeId: string, updates: any) => void;
  onNodeDelete: (nodeId: string) => void;
  onEdgeAdd: (edge: any) => void;
  onEdgeDelete: (edgeId: string) => void;
}

export const Graph2D: React.FC<Graph2DProps> = ({
  triples,
  layoutType,
  filters,
  selectedNode,
  selectedEdge,
  onNodeSelect,
  onEdgeSelect,
  onNodeAdd,
  onNodeUpdate,
  onNodeDelete,
  onEdgeAdd,
  onEdgeDelete
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for edge creation
  const [isCreatingEdge, setIsCreatingEdge] = useState(false);
  const [edgeStartNode, setEdgeStartNode] = useState<string | null>(null);
  const [tempEdge, setTempEdge] = useState<{ x1: number, y1: number, x2: number, y2: number } | null>(null);

  // Convert triples to graph data
  const graphData = useMemo(() => {
    return tripleToGraph(triples, filters);
  }, [triples, filters]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Get container dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create groups for layering
    const g = svg.append('g');
    const linkGroup = g.append('g').attr('class', 'links');
    const nodeGroup = g.append('g').attr('class', 'nodes');
    const labelGroup = g.append('g').attr('class', 'labels');

    // Apply layout
    const { nodes, edges } = applyLayout(graphData, layoutType, width, height);

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 10])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create arrow markers for directed edges
    svg.append('defs').selectAll('marker')
      .data(['arrow', 'arrow-inferred'])
      .enter().append('marker')
      .attr('id', d => d)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 25)
      .attr('refY', 0)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', d => d === 'arrow-inferred' ? '#9ca3af' : '#6b7280');

    // Draw edges
    const links = linkGroup.selectAll('.link')
      .data(edges)
      .enter().append('g')
      .attr('class', 'link-group');

    links.append('line')
      .attr('class', styles.link)
      .attr('x1', d => d.source.x!)
      .attr('y1', d => d.source.y!)
      .attr('x2', d => d.target.x!)
      .attr('y2', d => d.target.y!)
      .attr('stroke', d => d.isInferred ? '#9ca3af' : '#6b7280')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', d => d.isInferred ? '5,5' : 'none')
      .attr('marker-end', d => `url(#${d.isInferred ? 'arrow-inferred' : 'arrow'})`)
      .on('click', (event, d) => {
        event.stopPropagation();
        onEdgeSelect(d.id);
      });

    // Edge labels
    links.append('text')
      .attr('class', styles.edgeLabel)
      .attr('x', d => (d.source.x! + d.target.x!) / 2)
      .attr('y', d => (d.source.y! + d.target.y!) / 2)
      .attr('text-anchor', 'middle')
      .attr('dy', -5)
      .text(d => d.label)
      .style('font-size', '12px')
      .style('fill', '#6b7280');

    // Draw temporary edge during creation
    if (tempEdge) {
      g.selectAll('.temp-edge').remove();
      g.append('line')
        .attr('class', 'temp-edge')
        .attr('x1', tempEdge.x1)
        .attr('y1', tempEdge.y1)
        .attr('x2', tempEdge.x2)
        .attr('y2', tempEdge.y2)
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '10,5')
        .attr('opacity', 0.7)
        .attr('pointer-events', 'none');
    } else {
      g.selectAll('.temp-edge').remove();
    }

    // Draw nodes
    const nodeElements = nodeGroup.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node-group')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Node shapes based on type
    nodeElements.each(function(d) {
      const group = d3.select(this);
      
      if (d.type === 'class') {
        // Classes as circles
        group.append('circle')
          .attr('r', 20)
          .attr('class', styles.nodeClass)
          .attr('fill', '#3b82f6');
      } else if (d.type === 'individual') {
        // Individuals as circles (smaller)
        group.append('circle')
          .attr('r', 15)
          .attr('class', styles.nodeIndividual)
          .attr('fill', '#10b981');
      } else if (d.type === 'literal') {
        // Literals as rectangles
        group.append('rect')
          .attr('x', -20)
          .attr('y', -10)
          .attr('width', 40)
          .attr('height', 20)
          .attr('rx', 4)
          .attr('class', styles.nodeLiteral)
          .attr('fill', '#f59e0b');
      } else {
        // Properties as diamonds
        group.append('path')
          .attr('d', 'M0,-15 L15,0 L0,15 L-15,0 Z')
          .attr('class', styles.nodeProperty)
          .attr('fill', '#8b5cf6');
      }
    });

    // Node interaction
    nodeElements
      .style('cursor', 'pointer')
      .classed(styles.selected, d => d.id === selectedNode)
      .on('click', (event, d) => {
        event.stopPropagation();
        
        // Handle edge creation mode
        if (event.shiftKey) {
          if (!isCreatingEdge) {
            // Start creating edge
            setIsCreatingEdge(true);
            setEdgeStartNode(d.id);
            const startNode = nodes.find(n => n.id === d.id);
            if (startNode) {
              setTempEdge({ x1: startNode.x!, y1: startNode.y!, x2: startNode.x!, y2: startNode.y! });
            }
          } else if (edgeStartNode && edgeStartNode !== d.id) {
            // Complete edge creation
            const predicate = prompt('관계명을 입력하세요:', 'hasRelation');
            if (predicate) {
              const newEdge = {
                id: `${edgeStartNode}|${predicate}|${d.id}`,
                source: edgeStartNode,
                target: d.id,
                predicate: predicate,
                label: predicate
              };
              onEdgeAdd(newEdge);
            }
            
            // Reset edge creation state
            setIsCreatingEdge(false);
            setEdgeStartNode(null);
            setTempEdge(null);
          }
        } else {
          // Normal node selection
          onNodeSelect(d.id);
          
          // Reset edge creation if active
          if (isCreatingEdge) {
            setIsCreatingEdge(false);
            setEdgeStartNode(null);
            setTempEdge(null);
          }
        }
      })
      .on('mouseover', function(event, d) {
        d3.select(this).classed(styles.hover, true);
      })
      .on('mouseout', function(event, d) {
        d3.select(this).classed(styles.hover, false);
      });

    // Drag behavior
    const drag = d3.drag<SVGGElement, GraphNode>()
      .on('start', function(event, d) {
        d3.select(this).raise().classed(styles.dragging, true);
      })
      .on('drag', function(event, d) {
        d.x = event.x;
        d.y = event.y;
        d3.select(this).attr('transform', `translate(${d.x},${d.y})`);
        
        // Update connected edges
        links.filter(l => l.source.id === d.id || l.target.id === d.id)
          .select('line')
          .attr('x1', l => l.source.x!)
          .attr('y1', l => l.source.y!)
          .attr('x2', l => l.target.x!)
          .attr('y2', l => l.target.y!);
        
        links.filter(l => l.source.id === d.id || l.target.id === d.id)
          .select('text')
          .attr('x', l => (l.source.x! + l.target.x!) / 2)
          .attr('y', l => (l.source.y! + l.target.y!) / 2);
      })
      .on('end', function(event, d) {
        d3.select(this).classed(styles.dragging, false);
        onNodeUpdate(d.id, { x: d.x, y: d.y });
      });

    nodeElements.call(drag);

    // Node labels
    labelGroup.selectAll('.label')
      .data(nodes)
      .enter().append('text')
      .attr('class', styles.nodeLabel)
      .attr('x', d => d.x!)
      .attr('y', d => d.y! + (d.type === 'literal' ? 0 : 30))
      .attr('text-anchor', 'middle')
      .text(d => d.label)
      .style('font-size', '12px')
      .style('fill', '#374151')
      .style('pointer-events', 'none');

    // Click on background to deselect
    svg.on('click', () => {
      onNodeSelect(null);
      onEdgeSelect(null);
      
      // Reset edge creation if active
      if (isCreatingEdge) {
        setIsCreatingEdge(false);
        setEdgeStartNode(null);
        setTempEdge(null);
      }
    });

    // Mouse move for temp edge tracking
    svg.on('mousemove', (event) => {
      if (isCreatingEdge && tempEdge) {
        const [x, y] = d3.pointer(event, g.node());
        setTempEdge(prev => prev ? { ...prev, x2: x, y2: y } : null);
      }
    });

    // Double-click on background to add new node
    svg.on('dblclick', (event) => {
      event.preventDefault();
      const [x, y] = d3.pointer(event, g.node());
      
      // Create new node with default properties
      const newNode = {
        id: `node_${Date.now()}`,
        label: '새 노드',
        type: 'class' as const,
        x,
        y
      };
      
      onNodeAdd(newNode);
    });

    // Fit to view
    const bounds = g.node()?.getBBox();
    if (bounds) {
      const fullWidth = bounds.width;
      const fullHeight = bounds.height;
      const widthScale = width / fullWidth;
      const heightScale = height / fullHeight;
      const scale = Math.min(widthScale, heightScale) * 0.9;
      
      const transform = d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(scale)
        .translate(-bounds.x - fullWidth / 2, -bounds.y - fullHeight / 2);
      
      svg.call(zoom.transform, transform);
    }

    // Keyboard event handling for delete
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        if (selectedNode) {
          onNodeDelete(selectedNode);
          onNodeSelect(null);
        } else if (selectedEdge) {
          onEdgeDelete(selectedEdge);
          onEdgeSelect(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [graphData, layoutType, selectedNode, selectedEdge, onNodeSelect, onEdgeSelect, onNodeUpdate, onNodeDelete, onEdgeDelete, isCreatingEdge, tempEdge]);

  return (
    <div ref={containerRef} className={styles.container}>
      <svg ref={svgRef} className={styles.svg} />
    </div>
  );
};