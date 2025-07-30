'use client';

import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html, Line, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';
import { Triple, LayoutType, FilterOptions } from '../types';
import styles from '../KnowledgeGraph.module.css';

interface Node3D {
  id: string;
  label: string;
  type: 'class' | 'property' | 'individual' | 'literal';
  position: [number, number, number];
  velocity: [number, number, number];
  color: string;
  size: number;
  isInferred?: boolean;
}

interface Edge3D {
  id: string;
  source: string;
  target: string;
  label: string;
  isInferred?: boolean;
}

interface Graph3DProps {
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

interface NodeMeshProps {
  node: Node3D;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (isHovered: boolean) => void;
  onDoubleClick: () => void;
}

function NodeMesh({ node, isSelected, isHovered, onClick, onHover, onDoubleClick }: NodeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [lastClick, setLastClick] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      // Scale animation
      const targetScale = isSelected ? 1.4 : isHovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Subtle rotation for selected nodes
      if (isSelected) {
        meshRef.current.rotation.y += 0.02;
      }
    }
  });

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClick < 300) {
      onDoubleClick();
    } else {
      onClick();
    }
    setLastClick(now);
  }, [lastClick, onClick, onDoubleClick]);

  const handlePointerOver = useCallback(() => {
    onHover(true);
    document.body.style.cursor = 'pointer';
  }, [onHover]);

  const handlePointerOut = useCallback(() => {
    onHover(false);
    document.body.style.cursor = 'auto';
  }, [onHover]);

  const nodeGeometry = useMemo(() => {
    switch (node.type) {
      case 'class':
        return <sphereGeometry args={[node.size, 32, 32]} />;
      case 'property':
        return <cylinderGeometry args={[node.size * 0.6, node.size, node.size * 1.5, 16]} />;
      case 'individual':
        return <coneGeometry args={[node.size, node.size * 1.5, 8]} />;
      case 'literal':
        return <boxGeometry args={[node.size * 1.2, node.size * 0.8, node.size * 0.8]} />;
      default:
        return <sphereGeometry args={[node.size, 16, 16]} />;
    }
  }, [node.type, node.size]);

  const nodeColor = useMemo(() => {
    if (isSelected) return '#3b82f6';
    if (node.isInferred) return '#8b5cf6';
    return node.color;
  }, [isSelected, node.isInferred, node.color]);

  return (
    <mesh
      ref={meshRef}
      position={node.position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {nodeGeometry}
      <meshStandardMaterial 
        color={nodeColor}
        emissive={isHovered ? nodeColor : '#000000'}
        emissiveIntensity={isHovered ? 0.3 : 0}
        transparent={node.isInferred}
        opacity={node.isInferred ? 0.7 : 1}
      />
      <Text
        position={[0, -node.size - 0.5, 0]}
        fontSize={0.3}
        color={isSelected ? '#3b82f6' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        font={'/fonts/Inter-Medium.woff'}
      >
        {node.label}
      </Text>
    </mesh>
  );
}

interface EdgeLineProps {
  edge: Edge3D;
  sourcePos: [number, number, number];
  targetPos: [number, number, number];
  isSelected: boolean;
  onClick: () => void;
}

function EdgeLine({ edge, sourcePos, targetPos, isSelected, onClick }: EdgeLineProps) {
  const midPoint: [number, number, number] = [
    (sourcePos[0] + targetPos[0]) / 2,
    (sourcePos[1] + targetPos[1]) / 2 + 0.5,
    (sourcePos[2] + targetPos[2]) / 2
  ];

  const lineColor = isSelected ? '#3b82f6' : edge.isInferred ? '#8b5cf6' : '#666666';
  const lineWidth = isSelected ? 4 : edge.isInferred ? 2 : 2;

  return (
    <group onClick={onClick}>
      <Line
        points={[sourcePos, targetPos]}
        color={lineColor}
        lineWidth={lineWidth}
        dashed={edge.isInferred}
        dashSize={0.1}
        gapSize={0.05}
      />
      <Text
        position={midPoint}
        fontSize={0.2}
        color={isSelected ? '#3b82f6' : '#cccccc'}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        font={'/fonts/Inter-Regular.woff'}
      >
        {edge.label}
      </Text>
    </group>
  );
}

// Advanced layout algorithms
const applyLayout = (nodes: Node3D[], edges: Edge3D[], layoutType: LayoutType): Node3D[] => {
  const nodesCopy = nodes.map(n => ({ ...n }));
  
  switch (layoutType) {
    case 'force-directed':
      return applyForceDirectedLayout(nodesCopy, edges);
    case 'hierarchical':
      return applyHierarchicalLayout(nodesCopy, edges);
    case 'circular':
      return applyCircularLayout(nodesCopy);
    case 'grid':
      return applyGridLayout(nodesCopy);
    default:
      return nodesCopy;
  }
};

const applyForceDirectedLayout = (nodes: Node3D[], edges: Edge3D[]): Node3D[] => {
  const iterations = 100;
  const k = 3; // Optimal distance
  const repulsionStrength = 50;
  const attractionStrength = 0.1;
  const dampening = 0.9;
  
  for (let iter = 0; iter < iterations; iter++) {
    // Apply repulsion between all nodes
    for (let i = 0; i < nodes.length; i++) {
      let fx = 0, fy = 0, fz = 0;
      
      for (let j = 0; j < nodes.length; j++) {
        if (i !== j) {
          const dx = nodes[i].position[0] - nodes[j].position[0];
          const dy = nodes[i].position[1] - nodes[j].position[1];
          const dz = nodes[i].position[2] - nodes[j].position[2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1;
          const force = repulsionStrength / (distance * distance);
          
          fx += (dx / distance) * force;
          fy += (dy / distance) * force;
          fz += (dz / distance) * force;
        }
      }
      
      nodes[i].velocity[0] = (nodes[i].velocity[0] + fx) * dampening;
      nodes[i].velocity[1] = (nodes[i].velocity[1] + fy) * dampening;
      nodes[i].velocity[2] = (nodes[i].velocity[2] + fz) * dampening;
    }
    
    // Apply attraction along edges
    edges.forEach(edge => {
      const source = nodes.find(n => n.id === edge.source);
      const target = nodes.find(n => n.id === edge.target);
      
      if (source && target) {
        const dx = target.position[0] - source.position[0];
        const dy = target.position[1] - source.position[1];
        const dz = target.position[2] - source.position[2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1;
        const force = attractionStrength * (distance - k);
        
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        const fz = (dz / distance) * force;
        
        source.velocity[0] += fx;
        source.velocity[1] += fy;
        source.velocity[2] += fz;
        target.velocity[0] -= fx;
        target.velocity[1] -= fy;
        target.velocity[2] -= fz;
      }
    });
    
    // Update positions
    nodes.forEach(node => {
      node.position[0] += node.velocity[0] * 0.1;
      node.position[1] += node.velocity[1] * 0.1;
      node.position[2] += node.velocity[2] * 0.1;
    });
  }
  
  return nodes;
};

const applyHierarchicalLayout = (nodes: Node3D[], edges: Edge3D[]): Node3D[] => {
  const levels = new Map<string, number>();
  const visited = new Set<string>();
  const roots = nodes.filter(node => 
    !edges.some(edge => edge.target === node.id)
  );
  
  // BFS to assign levels
  const queue = roots.map(root => ({ node: root, level: 0 }));
  
  while (queue.length > 0) {
    const { node, level } = queue.shift()!;
    
    if (!visited.has(node.id)) {
      visited.add(node.id);
      levels.set(node.id, level);
      
      const children = edges
        .filter(edge => edge.source === node.id)
        .map(edge => nodes.find(n => n.id === edge.target)!)
        .filter(child => child && !visited.has(child.id));
      
      children.forEach(child => {
        queue.push({ node: child, level: level + 1 });
      });
    }
  }
  
  // Position nodes by level
  const levelGroups = new Map<number, Node3D[]>();
  nodes.forEach(node => {
    const level = levels.get(node.id) || 0;
    if (!levelGroups.has(level)) {
      levelGroups.set(level, []);
    }
    levelGroups.get(level)!.push(node);
  });
  
  levelGroups.forEach((nodesInLevel, level) => {
    const angleStep = (2 * Math.PI) / Math.max(nodesInLevel.length, 1);
    const radius = Math.max(nodesInLevel.length * 0.8, 3);
    
    nodesInLevel.forEach((node, index) => {
      const angle = index * angleStep;
      node.position[0] = Math.cos(angle) * radius;
      node.position[1] = level * -4;
      node.position[2] = Math.sin(angle) * radius;
    });
  });
  
  return nodes;
};

const applyCircularLayout = (nodes: Node3D[]): Node3D[] => {
  const radius = Math.max(nodes.length * 0.5, 5);
  const angleStep = (2 * Math.PI) / nodes.length;
  
  nodes.forEach((node, index) => {
    const angle = index * angleStep;
    node.position[0] = Math.cos(angle) * radius;
    node.position[1] = Math.sin(index * 0.5) * 2; // Add some vertical variation
    node.position[2] = Math.sin(angle) * radius;
  });
  
  return nodes;
};

const applyGridLayout = (nodes: Node3D[]): Node3D[] => {
  const gridSize = Math.ceil(Math.cbrt(nodes.length));
  const spacing = 3;
  
  nodes.forEach((node, index) => {
    const x = index % gridSize;
    const y = Math.floor(index / gridSize) % gridSize;
    const z = Math.floor(index / (gridSize * gridSize));
    
    node.position[0] = (x - gridSize / 2) * spacing;
    node.position[1] = (y - gridSize / 2) * spacing;
    node.position[2] = (z - gridSize / 2) * spacing;
  });
  
  return nodes;
};

export const Graph3D: React.FC<Graph3DProps> = ({
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
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  
  // Filter triples based on filters
  const filteredTriples = useMemo(() => {
    return triples.filter(triple => {
      if (triple.isInferred && !filters.showInferred) return false;
      if (triple.type === 'literal' && !filters.showLiterals) return false;
      return true;
    });
  }, [triples, filters]);
  
  const { nodes, edges } = useMemo(() => {
    const nodeMap = new Map<string, Node3D>();
    const edgeList: Edge3D[] = [];
    
    // Extract nodes from triples
    filteredTriples.forEach((triple, index) => {
      // Subject node
      if (!nodeMap.has(triple.subject)) {
        nodeMap.set(triple.subject, {
          id: triple.subject,
          label: triple.subject.replace(/^:/, ''),
          type: 'class',
          position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5],
          velocity: [0, 0, 0],
          color: '#10b981',
          size: 0.6,
          isInferred: triple.isInferred
        });
      }
      
      // Object node
      if (!nodeMap.has(triple.object)) {
        const isLiteral = triple.type === 'literal';
        nodeMap.set(triple.object, {
          id: triple.object,
          label: triple.object.replace(/^:/, ''),
          type: isLiteral ? 'literal' : 'individual',
          position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5],
          velocity: [0, 0, 0],
          color: isLiteral ? '#f97316' : '#06b6d4',
          size: isLiteral ? 0.4 : 0.5,
          isInferred: triple.isInferred
        });
      }
      
      // Edge
      const edgeId = `${triple.subject}|${triple.predicate}|${triple.object}`;
      edgeList.push({
        id: edgeId,
        source: triple.subject,
        target: triple.object,
        label: triple.predicate.replace(/^:/, ''),
        isInferred: triple.isInferred
      });
    });
    
    // Apply layout algorithm
    const nodeArray = Array.from(nodeMap.values());
    const layoutedNodes = applyLayout(nodeArray, edgeList, layoutType);
    
    return { nodes: layoutedNodes, edges: edgeList };
  }, [filteredTriples, layoutType]);
  
  const handleNodeDoubleClick = useCallback(() => {
    // Could implement node expansion or property editing
    console.log('Node double clicked - implement expansion feature');
  }, []);
  
  const handleBackgroundDoubleClick = useCallback((event: any) => {
    // Add node at clicked position
    const pointer = event.point;
    if (pointer && onNodeAdd) {
      const newNode = {
        id: `node_${Date.now()}`,
        label: '새 노드',
        type: 'class',
        x: pointer.x,
        y: pointer.y,
        z: pointer.z
      };
      onNodeAdd(newNode);
    }
  }, [onNodeAdd]);
  
  return (
    <div className={styles.graph3dContainer}>
      <Canvas 
        camera={{ position: [15, 15, 15], fov: 60 }}
        onDoubleClick={handleBackgroundDoubleClick}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4f46e5" />
        <spotLight
          position={[0, 20, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        
        {/* Nodes */}
        {nodes.map(node => (
          <NodeMesh
            key={node.id}
            node={node}
            isSelected={selectedNode === node.id}
            isHovered={hoveredNode === node.id}
            onClick={() => onNodeSelect(node.id)}
            onHover={(isHovered) => setHoveredNode(isHovered ? node.id : null)}
            onDoubleClick={handleNodeDoubleClick}
          />
        ))}
        
        {/* Edges */}
        {edges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          if (sourceNode && targetNode) {
            return (
              <EdgeLine
                key={edge.id}
                edge={edge}
                sourcePos={sourceNode.position}
                targetPos={targetNode.position}
                isSelected={selectedEdge === edge.id}
                onClick={() => onEdgeSelect(edge.id)}
              />
            );
          }
          return null;
        })}
        
        {/* Controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minDistance={5}
          maxDistance={50}
        />
        
        {/* Grid */}
        {showGrid && (
          <>
            <gridHelper args={[30, 30, '#333333', '#222222']} />
            <axesHelper args={[5]} />
          </>
        )}
      </Canvas>
      
      {/* Advanced Controls Panel */}
      <div className={styles.controls3d}>
        <div className={styles.controlGroup}>
          <h4>3D 뷰 옵션</h4>
          <label className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={showLabels} 
              onChange={(e) => setShowLabels(e.target.checked)}
            />
            라벨 표시
          </label>
          <label className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={showGrid} 
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            그리드 표시
          </label>
          <label className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={autoRotate} 
              onChange={(e) => setAutoRotate(e.target.checked)}
            />
            자동 회전
          </label>
        </div>
        
        <div className={styles.statsPanel}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>노드</span>
            <span className={styles.statValue}>{nodes.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>엣지</span>
            <span className={styles.statValue}>{edges.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>레이아웃</span>
            <span className={styles.statValue}>{layoutType}</span>
          </div>
        </div>
        
        {hoveredNode && (
          <div className={styles.hoverInfo}>
            <h5>호버된 노드</h5>
            <p>{hoveredNode}</p>
          </div>
        )}
        
        <div className={styles.instructions}>
          <h5>조작법</h5>
          <ul>
            <li>좌클릭 + 드래그: 회전</li>
            <li>휠: 확대/축소</li>
            <li>우클릭 + 드래그: 이동</li>
            <li>더블클릭: 노드 추가</li>
            <li>노드 클릭: 선택</li>
          </ul>
        </div>
      </div>
    </div>
  );
};