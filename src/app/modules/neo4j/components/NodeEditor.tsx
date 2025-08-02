'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, Save, X, GitBranch, Database, Link2 } from 'lucide-react'

interface Node {
  id: string
  label: string
  type: string
  properties: Record<string, any>
}

interface Relationship {
  id: string
  source: string
  target: string
  type: string
  properties: Record<string, any>
}

export default function NodeEditor() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', label: 'Alice', type: 'Person', properties: { age: 30, city: 'Seoul' } },
    { id: '2', label: 'Bob', type: 'Person', properties: { age: 25, city: 'Busan' } }
  ])
  
  const [relationships, setRelationships] = useState<Relationship[]>([
    { id: 'r1', source: '1', target: '2', type: 'KNOWS', properties: { since: 2020 } }
  ])
  
  const [editingNode, setEditingNode] = useState<string | null>(null)
  const [editingRel, setEditingRel] = useState<string | null>(null)
  const [showNodeForm, setShowNodeForm] = useState(false)
  const [showRelForm, setShowRelForm] = useState(false)
  
  const [newNode, setNewNode] = useState({
    label: '',
    type: 'Person',
    properties: {}
  })
  
  const [newRel, setNewRel] = useState({
    source: '',
    target: '',
    type: 'KNOWS',
    properties: {}
  })

  const nodeTypes = ['Person', 'Company', 'Product', 'Location', 'Event']
  const relationshipTypes = ['KNOWS', 'WORKS_AT', 'LIVES_IN', 'OWNS', 'FOLLOWS', 'LIKES']

  const handleAddNode = () => {
    if (!newNode.label) return
    
    const node: Node = {
      id: Date.now().toString(),
      label: newNode.label,
      type: newNode.type,
      properties: newNode.properties
    }
    
    setNodes([...nodes, node])
    setNewNode({ label: '', type: 'Person', properties: {} })
    setShowNodeForm(false)
  }

  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id))
    // Also remove relationships connected to this node
    setRelationships(relationships.filter(r => r.source !== id && r.target !== id))
  }

  const handleAddRelationship = () => {
    if (!newRel.source || !newRel.target) return
    
    const rel: Relationship = {
      id: 'r' + Date.now(),
      source: newRel.source,
      target: newRel.target,
      type: newRel.type,
      properties: newRel.properties
    }
    
    setRelationships([...relationships, rel])
    setNewRel({ source: '', target: '', type: 'KNOWS', properties: {} })
    setShowRelForm(false)
  }

  const handleDeleteRelationship = (id: string) => {
    setRelationships(relationships.filter(r => r.id !== id))
  }

  const generateCypher = () => {
    let cypher = '// Create nodes\n'
    nodes.forEach(node => {
      const props = Object.entries(node.properties)
        .map(([k, v]) => `${k}: ${typeof v === 'string' ? `'${v}'` : v}`)
        .join(', ')
      cypher += `CREATE (${node.label.toLowerCase()}:${node.type} {name: '${node.label}'${props ? ', ' + props : ''}})\n`
    })
    
    cypher += '\n// Create relationships\n'
    relationships.forEach(rel => {
      const sourceNode = nodes.find(n => n.id === rel.source)
      const targetNode = nodes.find(n => n.id === rel.target)
      if (sourceNode && targetNode) {
        const props = Object.entries(rel.properties)
          .map(([k, v]) => `${k}: ${typeof v === 'string' ? `'${v}'` : v}`)
          .join(', ')
        cypher += `MATCH (a:${sourceNode.type} {name: '${sourceNode.label}'}), (b:${targetNode.type} {name: '${targetNode.label}'})\n`
        cypher += `CREATE (a)-[:${rel.type}${props ? ' {' + props + '}' : ''}]->(b)\n`
      }
    })
    
    return cypher
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNodeForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            노드 추가
          </button>
          <button
            onClick={() => setShowRelForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Link2 className="w-4 h-4" />
            관계 추가
          </button>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          노드: {nodes.length} | 관계: {relationships.length}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nodes Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            노드 ({nodes.length})
          </h3>
          
          <div className="space-y-3">
            {nodes.map(node => (
              <div key={node.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                {editingNode === node.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={node.label}
                      onChange={(e) => {
                        const updated = nodes.map(n => 
                          n.id === node.id ? {...n, label: e.target.value} : n
                        )
                        setNodes(updated)
                      }}
                      className="w-full px-3 py-1 border rounded dark:bg-gray-600 dark:border-gray-500"
                    />
                    <select
                      value={node.type}
                      onChange={(e) => {
                        const updated = nodes.map(n => 
                          n.id === node.id ? {...n, type: e.target.value} : n
                        )
                        setNodes(updated)
                      }}
                      className="w-full px-3 py-1 border rounded dark:bg-gray-600 dark:border-gray-500"
                    >
                      {nodeTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingNode(null)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setEditingNode(null)}
                        className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {node.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {node.type}
                      </div>
                      {Object.entries(node.properties).length > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {Object.entries(node.properties).map(([k, v]) => (
                            <span key={k} className="mr-2">{k}: {v}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingNode(node.id)}
                        className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNode(node.id)}
                        className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Relationships Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            관계 ({relationships.length})
          </h3>
          
          <div className="space-y-3">
            {relationships.map(rel => {
              const sourceNode = nodes.find(n => n.id === rel.source)
              const targetNode = nodes.find(n => n.id === rel.target)
              
              return (
                <div key={rel.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {sourceNode?.label}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400">
                        →[{rel.type}]→
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {targetNode?.label}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteRelationship(rel.id)}
                      className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {Object.entries(rel.properties).length > 0 && (
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {Object.entries(rel.properties).map(([k, v]) => (
                        <span key={k} className="mr-2">{k}: {v}</span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Generated Cypher */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">생성된 Cypher 쿼리</h3>
        <pre className="bg-white dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
          <code className="text-gray-800 dark:text-gray-200">
            {generateCypher()}
          </code>
        </pre>
      </div>

      {/* Add Node Modal */}
      {showNodeForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">새 노드 추가</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  레이블
                </label>
                <input
                  type="text"
                  value={newNode.label}
                  onChange={(e) => setNewNode({...newNode, label: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="예: Alice"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  타입
                </label>
                <select
                  value={newNode.type}
                  onChange={(e) => setNewNode({...newNode, type: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  {nodeTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddNode}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  추가
                </button>
                <button
                  onClick={() => setShowNodeForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Relationship Modal */}
      {showRelForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">새 관계 추가</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  시작 노드
                </label>
                <select
                  value={newRel.source}
                  onChange={(e) => setNewRel({...newRel, source: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">선택하세요</option>
                  {nodes.map(node => (
                    <option key={node.id} value={node.id}>{node.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  관계 타입
                </label>
                <select
                  value={newRel.type}
                  onChange={(e) => setNewRel({...newRel, type: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  {relationshipTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  대상 노드
                </label>
                <select
                  value={newRel.target}
                  onChange={(e) => setNewRel({...newRel, target: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">선택하세요</option>
                  {nodes.map(node => (
                    <option key={node.id} value={node.id}>{node.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddRelationship}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  추가
                </button>
                <button
                  onClick={() => setShowRelForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}