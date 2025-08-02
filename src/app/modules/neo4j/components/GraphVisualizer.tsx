'use client'

import { useState, useEffect, useRef } from 'react'
import { Network, Plus, Minus, RotateCw, Search, Layers, ZoomIn, ZoomOut, Move } from 'lucide-react'

interface Node {
  id: string
  label: string
  type: string
  x: number
  y: number
  properties: Record<string, any>
}

interface Edge {
  id: string
  source: string
  target: string
  type: string
  properties: Record<string, any>
}

export default function GraphVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [activeDataset, setActiveDataset] = useState<'social' | 'knowledge' | 'transaction'>('social')

  // Sample datasets
  const datasets = {
    social: {
      nodes: [
        { id: '1', label: 'Alice', type: 'Person', x: 200, y: 200, properties: { age: 30, city: 'Seoul' } },
        { id: '2', label: 'Bob', type: 'Person', x: 400, y: 200, properties: { age: 25, city: 'Busan' } },
        { id: '3', label: 'Carol', type: 'Person', x: 300, y: 350, properties: { age: 28, city: 'Seoul' } },
        { id: '4', label: 'TechCorp', type: 'Company', x: 500, y: 350, properties: { industry: 'IT', employees: 500 } },
        { id: '5', label: 'David', type: 'Person', x: 150, y: 350, properties: { age: 35, city: 'Daegu' } },
      ],
      edges: [
        { id: 'e1', source: '1', target: '2', type: 'KNOWS', properties: { since: 2020 } },
        { id: 'e2', source: '1', target: '3', type: 'KNOWS', properties: { since: 2019 } },
        { id: 'e3', source: '2', target: '3', type: 'KNOWS', properties: { since: 2021 } },
        { id: 'e4', source: '1', target: '4', type: 'WORKS_AT', properties: { position: 'Developer' } },
        { id: 'e5', source: '2', target: '4', type: 'WORKS_AT', properties: { position: 'Designer' } },
        { id: 'e6', source: '5', target: '1', type: 'FOLLOWS', properties: {} },
      ]
    },
    knowledge: {
      nodes: [
        { id: '1', label: 'Neo4j', type: 'Technology', x: 300, y: 200, properties: { category: 'Database' } },
        { id: '2', label: 'Graph DB', type: 'Concept', x: 300, y: 100, properties: { type: 'NoSQL' } },
        { id: '3', label: 'Cypher', type: 'Language', x: 450, y: 200, properties: { paradigm: 'Declarative' } },
        { id: '4', label: 'Node', type: 'Component', x: 200, y: 300, properties: {} },
        { id: '5', label: 'Relationship', type: 'Component', x: 400, y: 300, properties: {} },
      ],
      edges: [
        { id: 'e1', source: '1', target: '2', type: 'IS_A', properties: {} },
        { id: 'e2', source: '1', target: '3', type: 'USES', properties: {} },
        { id: 'e3', source: '1', target: '4', type: 'HAS', properties: {} },
        { id: 'e4', source: '1', target: '5', type: 'HAS', properties: {} },
        { id: 'e5', source: '4', target: '5', type: 'CONNECTS_TO', properties: {} },
      ]
    },
    transaction: {
      nodes: [
        { id: '1', label: 'Account A', type: 'Account', x: 150, y: 200, properties: { balance: 50000 } },
        { id: '2', label: 'Account B', type: 'Account', x: 450, y: 200, properties: { balance: 30000 } },
        { id: '3', label: 'Account C', type: 'Account', x: 300, y: 100, properties: { balance: 100000 } },
        { id: '4', label: 'Merchant X', type: 'Merchant', x: 300, y: 350, properties: { category: 'Retail' } },
        { id: '5', label: 'ATM 001', type: 'ATM', x: 500, y: 300, properties: { location: 'Downtown' } },
      ],
      edges: [
        { id: 'e1', source: '1', target: '2', type: 'TRANSFER', properties: { amount: 5000, date: '2024-01-15' } },
        { id: 'e2', source: '2', target: '3', type: 'TRANSFER', properties: { amount: 10000, date: '2024-01-16' } },
        { id: 'e3', source: '1', target: '4', type: 'PAYMENT', properties: { amount: 2000, date: '2024-01-17' } },
        { id: 'e4', source: '2', target: '5', type: 'WITHDRAWAL', properties: { amount: 3000, date: '2024-01-18' } },
        { id: 'e5', source: '3', target: '1', type: 'TRANSFER', properties: { amount: 15000, date: '2024-01-19' } },
      ]
    }
  }

  useEffect(() => {
    const dataset = datasets[activeDataset]
    setNodes(dataset.nodes)
    setEdges(dataset.edges)
    setSelectedNode(null)
  }, [activeDataset])

  useEffect(() => {
    drawGraph()
  }, [nodes, edges, selectedNode, zoom, offset])

  const drawGraph = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Save context
    ctx.save()

    // Apply zoom and offset
    ctx.translate(offset.x, offset.y)
    ctx.scale(zoom, zoom)

    // Draw edges
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source)
      const targetNode = nodes.find(n => n.id === edge.target)
      if (!sourceNode || !targetNode) return

      ctx.beginPath()
      ctx.moveTo(sourceNode.x, sourceNode.y)
      ctx.lineTo(targetNode.x, targetNode.y)
      ctx.strokeStyle = '#94a3b8'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw edge label
      const midX = (sourceNode.x + targetNode.x) / 2
      const midY = (sourceNode.y + targetNode.y) / 2
      ctx.fillStyle = '#64748b'
      ctx.font = '12px sans-serif'
      ctx.fillText(edge.type, midX - 20, midY - 5)

      // Draw arrow
      const angle = Math.atan2(targetNode.y - sourceNode.y, targetNode.x - sourceNode.x)
      const arrowLength = 10
      const arrowAngle = Math.PI / 6
      const endX = targetNode.x - 30 * Math.cos(angle)
      const endY = targetNode.y - 30 * Math.sin(angle)

      ctx.beginPath()
      ctx.moveTo(endX, endY)
      ctx.lineTo(
        endX - arrowLength * Math.cos(angle - arrowAngle),
        endY - arrowLength * Math.sin(angle - arrowAngle)
      )
      ctx.moveTo(endX, endY)
      ctx.lineTo(
        endX - arrowLength * Math.cos(angle + arrowAngle),
        endY - arrowLength * Math.sin(angle + arrowAngle)
      )
      ctx.stroke()
    })

    // Draw nodes
    nodes.forEach(node => {
      const isSelected = selectedNode?.id === node.id

      // Node circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI)
      
      // Different colors for different types
      const colors: Record<string, string> = {
        Person: '#3b82f6',
        Company: '#10b981',
        Technology: '#8b5cf6',
        Concept: '#f59e0b',
        Language: '#ef4444',
        Component: '#06b6d4',
        Account: '#3b82f6',
        Merchant: '#10b981',
        ATM: '#f59e0b'
      }
      
      ctx.fillStyle = colors[node.type] || '#6b7280'
      ctx.fill()
      
      if (isSelected) {
        ctx.strokeStyle = '#fbbf24'
        ctx.lineWidth = 4
        ctx.stroke()
      }

      // Node label
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 14px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.label, node.x, node.y)

      // Node type
      ctx.fillStyle = '#64748b'
      ctx.font = '10px sans-serif'
      ctx.fillText(node.type, node.x, node.y + 45)
    })

    // Restore context
    ctx.restore()
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left - offset.x) / zoom
    const y = (e.clientY - rect.top - offset.y) / zoom

    // Check if click is on a node
    const clickedNode = nodes.find(node => {
      const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2))
      return distance <= 30
    })

    setSelectedNode(clickedNode || null)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.shiftKey) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5))
  const handleReset = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDataset('social')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeDataset === 'social'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            소셜 네트워크
          </button>
          <button
            onClick={() => setActiveDataset('knowledge')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeDataset === 'knowledge'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            지식 그래프
          </button>
          <button
            onClick={() => setActiveDataset('transaction')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeDataset === 'transaction'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            거래 네트워크
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="확대"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="축소"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="초기화"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="w-full border border-gray-200 dark:border-gray-700 cursor-pointer"
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        
        {/* Instructions */}
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-lg px-3 py-2 text-xs text-gray-600 dark:text-gray-400">
          <p>🖱️ 노드 클릭: 상세 정보 | Shift + 드래그: 화면 이동</p>
        </div>

        {/* Stats */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-lg px-3 py-2 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            노드: {nodes.length} | 관계: {edges.length}
          </p>
        </div>
      </div>

      {/* Selected Node Info */}
      {selectedNode && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            선택된 노드: {selectedNode.label}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">타입:</span>
              <span className="ml-2 text-gray-900 dark:text-white">{selectedNode.type}</span>
            </div>
            {Object.entries(selectedNode.properties).map(([key, value]) => (
              <div key={key}>
                <span className="text-gray-600 dark:text-gray-400">{key}:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">범례</h3>
        <div className="grid grid-cols-3 gap-2 text-sm">
          {activeDataset === 'social' && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Person</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Company</span>
              </div>
            </>
          )}
          {activeDataset === 'knowledge' && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Technology</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Concept</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Language</span>
              </div>
            </>
          )}
          {activeDataset === 'transaction' && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Account</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Merchant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">ATM</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}