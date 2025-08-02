'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Route, Settings, Play, Pause, RotateCcw, Target, Navigation, Clock, Zap } from 'lucide-react'

interface Point {
  x: number
  y: number
}

interface Obstacle {
  id: string
  x: number
  y: number
  radius: number
  isStatic: boolean
  velocity?: Point
}

interface PathNode {
  point: Point
  parent?: PathNode
  gCost: number
  hCost: number
  fCost: number
}

interface PathPlanningState {
  start: Point
  goal: Point
  obstacles: Obstacle[]
  path: Point[]
  explored: Point[]
  algorithm: 'astar' | 'rrt' | 'dijkstra' | 'rrtstar'
  isPlanning: boolean
  planningTime: number
  pathLength: number
  nodesExplored: number
}

export default function PathPlanningVisualizerPage() {
  const [state, setState] = useState<PathPlanningState>({
    start: { x: 50, y: 50 },
    goal: { x: 750, y: 550 },
    obstacles: [],
    path: [],
    explored: [],
    algorithm: 'astar',
    isPlanning: false,
    planningTime: 0,
    pathLength: 0,
    nodesExplored: 0
  })
  
  const [settings, setSettings] = useState({
    gridSize: 10,
    allowDiagonal: true,
    dynamicObstacles: true,
    showExplored: true,
    animationSpeed: 50
  })
  
  const [editMode, setEditMode] = useState<'start' | 'goal' | 'obstacle' | 'none'>('none')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // 장애물 초기화
  useEffect(() => {
    generateRandomObstacles()
  }, [])

  const generateRandomObstacles = () => {
    const obstacles: Obstacle[] = []
    for (let i = 0; i < 15; i++) {
      obstacles.push({
        id: `obs_${i}`,
        x: Math.random() * 700 + 50,
        y: Math.random() * 500 + 50,
        radius: Math.random() * 20 + 10,
        isStatic: Math.random() > 0.3,
        velocity: Math.random() > 0.3 ? undefined : {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        }
      })
    }
    setState(prev => ({ ...prev, obstacles }))
  }

  // A* 알고리즘
  const astarPlanning = async (start: Point, goal: Point, obstacles: Obstacle[]): Promise<{path: Point[], explored: Point[]}> => {
    const openSet: PathNode[] = []
    const closedSet: Set<string> = new Set()
    const explored: Point[] = []
    
    const startNode: PathNode = {
      point: start,
      gCost: 0,
      hCost: heuristic(start, goal),
      fCost: 0
    }
    startNode.fCost = startNode.gCost + startNode.hCost
    openSet.push(startNode)
    
    while (openSet.length > 0) {
      // F cost가 가장 낮은 노드 선택
      openSet.sort((a, b) => a.fCost - b.fCost)
      const current = openSet.shift()!
      
      const pointKey = `${Math.round(current.point.x)},${Math.round(current.point.y)}`
      if (closedSet.has(pointKey)) continue
      
      closedSet.add(pointKey)
      explored.push(current.point)
      
      // 목표 도달 확인
      if (distance(current.point, goal) < settings.gridSize) {
        const path: Point[] = []
        let node: PathNode | undefined = current
        while (node) {
          path.unshift(node.point)
          node = node.parent
        }
        return { path, explored }
      }
      
      // 이웃 노드 탐색
      const neighbors = getNeighbors(current.point, settings.gridSize, settings.allowDiagonal)
      for (const neighbor of neighbors) {
        if (isColliding(neighbor, obstacles)) continue
        
        const neighborKey = `${Math.round(neighbor.x)},${Math.round(neighbor.y)}`
        if (closedSet.has(neighborKey)) continue
        
        const gCost = current.gCost + distance(current.point, neighbor)
        const hCost = heuristic(neighbor, goal)
        const fCost = gCost + hCost
        
        const existingNode = openSet.find(n => 
          Math.abs(n.point.x - neighbor.x) < 5 && Math.abs(n.point.y - neighbor.y) < 5
        )
        
        if (!existingNode || gCost < existingNode.gCost) {
          const neighborNode: PathNode = {
            point: neighbor,
            parent: current,
            gCost,
            hCost,
            fCost
          }
          
          if (!existingNode) {
            openSet.push(neighborNode)
          } else {
            existingNode.parent = current
            existingNode.gCost = gCost
            existingNode.fCost = fCost
          }
        }
      }
      
      // 애니메이션을 위한 딜레이
      await new Promise(resolve => setTimeout(resolve, settings.animationSpeed))
    }
    
    return { path: [], explored }
  }

  // RRT 알고리즘
  const rrtPlanning = async (start: Point, goal: Point, obstacles: Obstacle[]): Promise<{path: Point[], explored: Point[]}> => {
    const tree: PathNode[] = [{ point: start, gCost: 0, hCost: 0, fCost: 0 }]
    const explored: Point[] = []
    const maxIterations = 1000
    const stepSize = 20
    
    for (let i = 0; i < maxIterations; i++) {
      // 랜덤 포인트 생성 (목표점으로 편향)
      const randomPoint = Math.random() < 0.1 ? goal : {
        x: Math.random() * 800,
        y: Math.random() * 600
      }
      
      // 가장 가까운 트리 노드 찾기
      let nearestNode = tree[0]
      let minDist = distance(tree[0].point, randomPoint)
      
      for (const node of tree) {
        const dist = distance(node.point, randomPoint)
        if (dist < minDist) {
          minDist = dist
          nearestNode = node
        }
      }
      
      // 새로운 포인트를 stepSize만큼 연장
      const direction = {
        x: randomPoint.x - nearestNode.point.x,
        y: randomPoint.y - nearestNode.point.y
      }
      const dist = Math.sqrt(direction.x ** 2 + direction.y ** 2)
      
      if (dist === 0) continue
      
      const newPoint = {
        x: nearestNode.point.x + (direction.x / dist) * Math.min(stepSize, dist),
        y: nearestNode.point.y + (direction.y / dist) * Math.min(stepSize, dist)
      }
      
      // 충돌 검사
      if (isColliding(newPoint, obstacles) || isPathColliding(nearestNode.point, newPoint, obstacles)) {
        continue
      }
      
      const newNode: PathNode = {
        point: newPoint,
        parent: nearestNode,
        gCost: 0,
        hCost: 0,
        fCost: 0
      }
      
      tree.push(newNode)
      explored.push(newPoint)
      
      // 목표 도달 확인
      if (distance(newPoint, goal) < stepSize && !isPathColliding(newPoint, goal, obstacles)) {
        const finalNode: PathNode = {
          point: goal,
          parent: newNode,
          gCost: 0,
          hCost: 0,
          fCost: 0
        }
        
        // 경로 재구성
        const path: Point[] = []
        let node: PathNode | undefined = finalNode
        while (node) {
          path.unshift(node.point)
          node = node.parent
        }
        
        return { path, explored }
      }
      
      // 애니메이션을 위한 딜레이
      if (i % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, settings.animationSpeed))
      }
    }
    
    return { path: [], explored }
  }

  // 유틸리티 함수들
  const heuristic = (a: Point, b: Point): number => {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
  }

  const distance = (a: Point, b: Point): number => {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
  }

  const getNeighbors = (point: Point, gridSize: number, allowDiagonal: boolean): Point[] => {
    const neighbors: Point[] = []
    const directions = allowDiagonal ? 
      [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]] :
      [[-1,0], [0,-1], [0,1], [1,0]]
    
    for (const [dx, dy] of directions) {
      const newPoint = {
        x: point.x + dx * gridSize,
        y: point.y + dy * gridSize
      }
      
      if (newPoint.x >= 0 && newPoint.x <= 800 && newPoint.y >= 0 && newPoint.y <= 600) {
        neighbors.push(newPoint)
      }
    }
    
    return neighbors
  }

  const isColliding = (point: Point, obstacles: Obstacle[]): boolean => {
    return obstacles.some(obs => distance(point, obs) < obs.radius + 5)
  }

  const isPathColliding = (start: Point, end: Point, obstacles: Obstacle[]): boolean => {
    const steps = Math.ceil(distance(start, end) / 5)
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const point = {
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t
      }
      if (isColliding(point, obstacles)) return true
    }
    return false
  }

  // 경로 계획 실행
  const planPath = async () => {
    setState(prev => ({ ...prev, isPlanning: true, path: [], explored: [], nodesExplored: 0 }))
    
    const startTime = performance.now()
    let result: {path: Point[], explored: Point[]}
    
    switch (state.algorithm) {
      case 'astar':
        result = await astarPlanning(state.start, state.goal, state.obstacles)
        break
      case 'rrt':
        result = await rrtPlanning(state.start, state.goal, state.obstacles)
        break
      default:
        result = { path: [], explored: [] }
    }
    
    const endTime = performance.now()
    const pathLength = result.path.reduce((sum, point, i) => {
      if (i === 0) return 0
      return sum + distance(result.path[i-1], point)
    }, 0)
    
    setState(prev => ({
      ...prev,
      path: result.path,
      explored: result.explored,
      isPlanning: false,
      planningTime: endTime - startTime,
      pathLength,
      nodesExplored: result.explored.length
    }))
  }

  // 동적 장애물 업데이트
  useEffect(() => {
    if (settings.dynamicObstacles) {
      const interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          obstacles: prev.obstacles.map(obs => {
            if (!obs.isStatic && obs.velocity) {
              let newX = obs.x + obs.velocity.x
              let newY = obs.y + obs.velocity.y
              
              // 경계 반사
              if (newX <= obs.radius || newX >= 800 - obs.radius) {
                obs.velocity.x *= -1
                newX = Math.max(obs.radius, Math.min(800 - obs.radius, newX))
              }
              if (newY <= obs.radius || newY >= 600 - obs.radius) {
                obs.velocity.y *= -1
                newY = Math.max(obs.radius, Math.min(600 - obs.radius, newY))
              }
              
              return { ...obs, x: newX, y: newY }
            }
            return obs
          })
        }))
      }, 100)
      
      return () => clearInterval(interval)
    }
  }, [settings.dynamicObstacles])

  // Canvas 렌더링
  const renderScene = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 그리드 배경
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 0.5
    for (let x = 0; x <= canvas.width; x += settings.gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y <= canvas.height; y += settings.gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    
    // 탐색된 노드 표시
    if (settings.showExplored && state.explored.length > 0) {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
      state.explored.forEach(point => {
        ctx.fillRect(point.x - 2, point.y - 2, 4, 4)
      })
    }
    
    // 장애물 렌더링
    state.obstacles.forEach(obstacle => {
      ctx.fillStyle = obstacle.isStatic ? '#6b7280' : '#f59e0b'
      ctx.beginPath()
      ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, 2 * Math.PI)
      ctx.fill()
      
      if (!obstacle.isStatic) {
        ctx.strokeStyle = '#f59e0b'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    })
    
    // 경로 렌더링
    if (state.path.length > 1) {
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(state.path[0].x, state.path[0].y)
      for (let i = 1; i < state.path.length; i++) {
        ctx.lineTo(state.path[i].x, state.path[i].y)
      }
      ctx.stroke()
      
      // 경로 방향 표시
      ctx.fillStyle = '#ef4444'
      for (let i = 1; i < state.path.length; i++) {
        const prev = state.path[i-1]
        const curr = state.path[i]
        const angle = Math.atan2(curr.y - prev.y, curr.x - prev.x)
        
        ctx.save()
        ctx.translate(curr.x, curr.y)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.moveTo(-5, -3)
        ctx.lineTo(5, 0)
        ctx.lineTo(-5, 3)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }
    
    // 시작점
    ctx.fillStyle = '#10b981'
    ctx.beginPath()
    ctx.arc(state.start.x, state.start.y, 8, 0, 2 * Math.PI)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('S', state.start.x, state.start.y + 4)
    
    // 목표점
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(state.goal.x, state.goal.y, 8, 0, 2 * Math.PI)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('G', state.goal.x, state.goal.y + 4)
    
    ctx.textAlign = 'left'
  }

  useEffect(() => {
    renderScene()
  }, [state, settings])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    if (editMode === 'start') {
      setState(prev => ({ ...prev, start: { x, y }, path: [], explored: [] }))
    } else if (editMode === 'goal') {
      setState(prev => ({ ...prev, goal: { x, y }, path: [], explored: [] }))
    } else if (editMode === 'obstacle') {
      const newObstacle: Obstacle = {
        id: `obs_${Date.now()}`,
        x,
        y,
        radius: 20,
        isStatic: true
      }
      setState(prev => ({ 
        ...prev, 
        obstacles: [...prev.obstacles, newObstacle],
        path: [],
        explored: []
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/modules/autonomous-mobility"
                className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>자율주행 모듈로 돌아가기</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={planPath}
                disabled={state.isPlanning}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                경로 계획
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, path: [], explored: [] }))}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Pause className="w-4 h-4" />
                지우기
              </button>
              <button
                onClick={generateRandomObstacles}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                <RotateCcw className="w-4 h-4" />
                재생성
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🗺️ 경로 계획 시각화 도구
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A*, RRT 알고리즘으로 동적 장애물 환경에서 최적 경로를 계획하고 비교합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Controls */}
          <div className="xl:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                알고리즘 설정
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    경로 계획 알고리즘
                  </label>
                  <select
                    value={state.algorithm}
                    onChange={(e) => setState(prev => ({ ...prev, algorithm: e.target.value as any, path: [], explored: [] }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="astar">A* (A-Star)</option>
                    <option value="rrt">RRT (Rapidly-exploring Random Tree)</option>
                    <option value="dijkstra">Dijkstra</option>
                    <option value="rrtstar">RRT* (RRT Star)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    그리드 크기: {settings.gridSize}px
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={settings.gridSize}
                    onChange={(e) => setSettings(prev => ({ ...prev, gridSize: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.allowDiagonal}
                      onChange={(e) => setSettings(prev => ({ ...prev, allowDiagonal: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-gray-900 dark:text-white">대각선 이동 허용</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.dynamicObstacles}
                      onChange={(e) => setSettings(prev => ({ ...prev, dynamicObstacles: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-gray-900 dark:text-white">동적 장애물</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.showExplored}
                      onChange={(e) => setSettings(prev => ({ ...prev, showExplored: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-gray-900 dark:text-white">탐색 노드 표시</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    애니메이션 속도: {settings.animationSpeed}ms
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={settings.animationSpeed}
                    onChange={(e) => setSettings(prev => ({ ...prev, animationSpeed: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Edit Mode */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                편집 모드
              </h3>
              
              <div className="space-y-2">
                {[
                  { mode: 'start', label: '시작점 설정', icon: '🟢' },
                  { mode: 'goal', label: '목표점 설정', icon: '🔴' },
                  { mode: 'obstacle', label: '장애물 추가', icon: '⚫' },
                  { mode: 'none', label: '편집 안함', icon: '👆' }
                ].map(({ mode, label, icon }) => (
                  <button
                    key={mode}
                    onClick={() => setEditMode(mode as any)}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                      editMode === mode
                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <span className="mr-2">{icon}</span>
                    <span className={`text-sm ${
                      editMode === mode ? 'text-cyan-700 dark:text-cyan-300 font-medium' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                성능 통계
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">계획 시간</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {state.planningTime.toFixed(1)}ms
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">경로 길이</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {state.pathLength.toFixed(1)}px
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">탐색 노드</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {state.nodesExplored}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">장애물 수</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {state.obstacles.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">상태</span>
                  <span className={`text-sm font-medium ${
                    state.isPlanning ? 'text-yellow-600 dark:text-yellow-400' :
                    state.path.length > 0 ? 'text-green-600 dark:text-green-400' :
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                    {state.isPlanning ? '계획 중...' : 
                     state.path.length > 0 ? '경로 발견' : '대기 중'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Canvas */}
          <div className="xl:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                경로 계획 시각화
              </h3>
              
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onClick={handleCanvasClick}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg cursor-crosshair"
              />
              
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">시작점</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">목표점</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">정적 장애물</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-yellow-600"></div>
                  <span className="text-gray-600 dark:text-gray-400">동적 장애물</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500"></div>
                  <span className="text-gray-600 dark:text-gray-400">계획된 경로</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-300"></div>
                  <span className="text-gray-600 dark:text-gray-400">탐색 영역</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                💡 편집 모드를 선택하고 캔버스를 클릭하여 시작점, 목표점, 장애물을 설정하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}