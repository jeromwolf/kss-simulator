'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  type?: 'resource' | 'literal';
}

interface Node {
  id: string;
  label: string;
  type: 'resource' | 'literal';
  position: [number, number, number];
  color: string;
}

interface Edge {
  source: string;
  target: string;
  label: string;
}

interface NodeMeshProps {
  node: Node;
  isSelected: boolean;
  onClick: () => void;
  onHover: (isHovered: boolean) => void;
}

function NodeMesh({ node, isSelected, onClick, onHover }: NodeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // 호버 또는 선택 시 크기 애니메이션
      const scale = hovered || isSelected ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      
      // 부드러운 회전 애니메이션
      meshRef.current.rotation.y += 0.01;
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(false);
    document.body.style.cursor = 'auto';
  };

  const geometry = node.type === 'literal' ? 
    <boxGeometry args={[1, 1, 1]} /> : 
    <sphereGeometry args={[0.6, 32, 32]} />;

  return (
    <mesh
      ref={meshRef}
      position={node.position}
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {geometry}
      <meshStandardMaterial 
        color={isSelected ? '#3b82f6' : node.color}
        emissive={hovered ? node.color : '#000000'}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
      <Html
        position={[0, -1, 0]}
        center
        distanceFactor={5}
        style={{
          fontSize: '12px',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '2px 6px',
          borderRadius: '4px',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        {node.label}
      </Html>
    </mesh>
  );
}

interface EdgeLineProps {
  sourcePos: [number, number, number];
  targetPos: [number, number, number];
  label: string;
}

function EdgeLine({ sourcePos, targetPos, label }: EdgeLineProps) {
  const midPoint: [number, number, number] = [
    (sourcePos[0] + targetPos[0]) / 2,
    (sourcePos[1] + targetPos[1]) / 2,
    (sourcePos[2] + targetPos[2]) / 2
  ];

  return (
    <>
      <Line
        points={[sourcePos, targetPos]}
        color="#666666"
        lineWidth={2}
      />
      <Html
        position={midPoint}
        center
        distanceFactor={5}
        style={{
          fontSize: '10px',
          color: '#999999',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '1px 4px',
          borderRadius: '3px',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        {label}
      </Html>
    </>
  );
}

interface Graph3DProps {
  triples: Triple[];
  selectedNode?: string | null;
  onNodeSelect?: (nodeId: string | null) => void;
}

export const Graph3D: React.FC<Graph3DProps> = ({
  triples,
  selectedNode,
  onNodeSelect
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const { nodes, edges } = useMemo(() => {
    const nodeMap = new Map<string, Node>();
    const edgeList: Edge[] = [];

    // 노드 수집
    triples.forEach((triple, index) => {
      if (!nodeMap.has(triple.subject)) {
        const angle = (index * 2 * Math.PI) / triples.length;
        const radius = 5;
        nodeMap.set(triple.subject, {
          id: triple.subject,
          label: triple.subject,
          type: 'resource',
          position: [
            Math.cos(angle) * radius,
            Math.random() * 2 - 1,
            Math.sin(angle) * radius
          ],
          color: '#10b981'
        });
      }

      if (!nodeMap.has(triple.object)) {
        const angle = ((index + 0.5) * 2 * Math.PI) / triples.length;
        const radius = 5;
        nodeMap.set(triple.object, {
          id: triple.object,
          label: triple.object,
          type: triple.type || 'resource',
          position: [
            Math.cos(angle) * radius,
            Math.random() * 2 - 1,
            Math.sin(angle) * radius
          ],
          color: triple.type === 'literal' ? '#f97316' : '#10b981'
        });
      }

      edgeList.push({
        source: triple.subject,
        target: triple.object,
        label: triple.predicate
      });
    });

    // 노드 위치 최적화 (간단한 force-directed 레이아웃)
    const nodeArray = Array.from(nodeMap.values());
    for (let i = 0; i < 50; i++) {
      nodeArray.forEach((node, idx) => {
        let fx = 0, fy = 0, fz = 0;
        
        // 반발력
        nodeArray.forEach((other, otherIdx) => {
          if (idx !== otherIdx) {
            const dx = node.position[0] - other.position[0];
            const dy = node.position[1] - other.position[1];
            const dz = node.position[2] - other.position[2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1;
            const force = 2 / (distance * distance);
            fx += (dx / distance) * force;
            fy += (dy / distance) * force;
            fz += (dz / distance) * force;
          }
        });
        
        // 인력 (연결된 노드들)
        edgeList.forEach(edge => {
          let other: Node | undefined;
          if (edge.source === node.id) {
            other = nodeMap.get(edge.target);
          } else if (edge.target === node.id) {
            other = nodeMap.get(edge.source);
          }
          
          if (other) {
            const dx = other.position[0] - node.position[0];
            const dy = other.position[1] - node.position[1];
            const dz = other.position[2] - node.position[2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            fx += dx * 0.01;
            fy += dy * 0.01;
            fz += dz * 0.01;
          }
        });
        
        // 위치 업데이트
        node.position[0] += fx * 0.1;
        node.position[1] += fy * 0.1;
        node.position[2] += fz * 0.1;
      });
    }

    return { nodes: nodeArray, edges: edgeList };
  }, [triples]);

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg relative">
      <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* 노드 렌더링 */}
        {nodes.map(node => (
          <NodeMesh
            key={node.id}
            node={node}
            isSelected={selectedNode === node.id}
            onClick={() => onNodeSelect?.(node.id)}
            onHover={(isHovered) => setHoveredNode(isHovered ? node.id : null)}
          />
        ))}
        
        {/* 엣지 렌더링 */}
        {edges.map((edge, index) => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          if (sourceNode && targetNode) {
            return (
              <EdgeLine
                key={index}
                sourcePos={sourceNode.position}
                targetPos={targetNode.position}
                label={edge.label}
              />
            );
          }
          return null;
        })}
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        
        {/* 그리드 */}
        <gridHelper args={[20, 20, '#333333', '#222222']} />
      </Canvas>
      
      {/* 정보 패널 */}
      <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-90 text-white p-4 rounded-lg">
        <h3 className="font-semibold mb-2">3D 지식 그래프</h3>
        <p className="text-sm text-gray-300">
          노드: {nodes.length}개 | 엣지: {edges.length}개
        </p>
        {hoveredNode && (
          <p className="text-sm text-blue-300 mt-2">
            호버: {hoveredNode}
          </p>
        )}
        <div className="mt-3 text-xs text-gray-400">
          <p>• 마우스로 회전/확대/이동</p>
          <p>• 노드 클릭으로 선택</p>
          <p>• 🟢 리소스 | 🟠 리터럴</p>
        </div>
      </div>
    </div>
  );
};