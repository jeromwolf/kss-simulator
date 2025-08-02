'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Blocks, Hash, User, Clock, Zap, ChevronRight, Search, Activity } from 'lucide-react'

interface Block {
  number: number
  hash: string
  parentHash: string
  timestamp: number
  miner: string
  transactions: Transaction[]
  gasUsed: number
  gasLimit: number
  nonce: string
}

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  gas: number
  gasPrice: string
  input: string
  status: 'success' | 'failed' | 'pending'
}

export default function BlockchainExplorerPage() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [isLive, setIsLive] = useState(true)

  // Generate mock blockchain data
  const generateBlock = (number: number): Block => {
    const txCount = Math.floor(Math.random() * 20) + 5
    const transactions: Transaction[] = []
    
    for (let i = 0; i < txCount; i++) {
      transactions.push({
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        from: `0x${Math.random().toString(16).substr(2, 40)}`,
        to: `0x${Math.random().toString(16).substr(2, 40)}`,
        value: (Math.random() * 10).toFixed(4),
        gas: Math.floor(Math.random() * 100000) + 21000,
        gasPrice: (Math.random() * 100).toFixed(0),
        input: Math.random() > 0.7 ? `0x${Math.random().toString(16).substr(2, 256)}` : '0x',
        status: Math.random() > 0.05 ? 'success' : 'failed'
      })
    }

    return {
      number,
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      parentHash: number > 0 ? blocks[0]?.hash || `0x${Math.random().toString(16).substr(2, 64)}` : '0x0',
      timestamp: Date.now() - (blocks.length * 12000),
      miner: `0x${Math.random().toString(16).substr(2, 40)}`,
      transactions,
      gasUsed: Math.floor(Math.random() * 15000000) + 5000000,
      gasLimit: 15000000,
      nonce: `0x${Math.random().toString(16).substr(2, 16)}`
    }
  }

  // Initialize with some blocks
  useEffect(() => {
    const initialBlocks: Block[] = []
    for (let i = 10; i >= 1; i--) {
      initialBlocks.push(generateBlock(1000000 - i))
    }
    setBlocks(initialBlocks)
    setSelectedBlock(initialBlocks[0])
  }, [])

  // Simulate new blocks
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setBlocks(prev => {
        const newBlock = generateBlock((prev[0]?.number || 1000000) + 1)
        return [newBlock, ...prev.slice(0, 19)]
      })
    }, 12000)

    return () => clearInterval(interval)
  }, [isLive, blocks])

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatTimestamp = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds}초 전`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`
    return `${Math.floor(seconds / 86400)}일 전`
  }

  const search = () => {
    if (searchInput.startsWith('0x')) {
      // Search for transaction or address
      for (const block of blocks) {
        const tx = block.transactions.find(t => t.hash === searchInput)
        if (tx) {
          setSelectedTx(tx)
          setSelectedBlock(block)
          return
        }
      }
    } else if (!isNaN(Number(searchInput))) {
      // Search for block number
      const block = blocks.find(b => b.number === Number(searchInput))
      if (block) {
        setSelectedBlock(block)
        setSelectedTx(null)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-indigo-900/10 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/modules/web3"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Web3 & Blockchain으로 돌아가기
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Blocks className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  블록체인 익스플로러
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  실시간 블록과 트랜잭션을 탐색하세요
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isLive
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Activity className="w-4 h-4" />
              {isLive ? 'LIVE' : 'PAUSED'}
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && search()}
                placeholder="블록 번호, 트랜잭션 해시, 주소 검색..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={search}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                검색
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Block List */}
            <div className="col-span-4 space-y-3">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">최근 블록</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {blocks.map((block) => (
                  <div
                    key={block.number}
                    onClick={() => {
                      setSelectedBlock(block)
                      setSelectedTx(null)
                    }}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedBlock?.number === block.number
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-500'
                        : 'bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-900 dark:text-white">
                        #{block.number}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimestamp(block.timestamp)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <div>Miner: {formatAddress(block.miner)}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span>{block.transactions.length} txns</span>
                        <span>{(block.gasUsed / 1000000).toFixed(2)}M gas</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Block Details */}
            <div className="col-span-8">
              {selectedBlock && (
                <div className="space-y-6">
                  {/* Block Header */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Blocks className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      블록 #{selectedBlock.number}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-24">Hash:</span>
                        <span className="text-sm font-mono text-gray-900 dark:text-white break-all">
                          {selectedBlock.hash}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-24">Parent:</span>
                        <span className="text-sm font-mono text-gray-900 dark:text-white break-all">
                          {selectedBlock.parentHash}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-24">Miner:</span>
                        <span className="text-sm font-mono text-gray-900 dark:text-white">
                          {selectedBlock.miner}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                          <div className="text-xs text-gray-600 dark:text-gray-400">Gas Used</div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {selectedBlock.gasUsed.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {((selectedBlock.gasUsed / selectedBlock.gasLimit) * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                          <div className="text-xs text-gray-600 dark:text-gray-400">Transactions</div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {selectedBlock.transactions.length}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {selectedBlock.transactions.filter(t => t.status === 'success').length} succeeded
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transaction List */}
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                      트랜잭션 목록
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {selectedBlock.transactions.map((tx) => (
                        <div
                          key={tx.hash}
                          onClick={() => setSelectedTx(tx)}
                          className={`p-3 bg-white dark:bg-gray-800 rounded-lg border cursor-pointer transition-all ${
                            selectedTx?.hash === tx.hash
                              ? 'border-indigo-500'
                              : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Hash className="w-4 h-4 text-gray-400" />
                              <span className="font-mono text-sm text-indigo-600 dark:text-indigo-400">
                                {formatAddress(tx.hash)}
                              </span>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                tx.status === 'success'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                              }`}
                            >
                              {tx.status}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                            <span>{formatAddress(tx.from)}</span>
                            <ChevronRight className="w-3 h-3 inline mx-1" />
                            <span>{formatAddress(tx.to)}</span>
                            <span className="ml-3 font-semibold">{tx.value} ETH</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transaction Details */}
                  {selectedTx && (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                        트랜잭션 상세
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-600 dark:text-gray-400 w-20">Hash:</span>
                          <span className="font-mono text-gray-900 dark:text-white break-all">
                            {selectedTx.hash}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-600 dark:text-gray-400 w-20">From:</span>
                          <span className="font-mono text-gray-900 dark:text-white">
                            {selectedTx.from}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-600 dark:text-gray-400 w-20">To:</span>
                          <span className="font-mono text-gray-900 dark:text-white">
                            {selectedTx.to}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-600 dark:text-gray-400 w-20">Value:</span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {selectedTx.value} ETH
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-600 dark:text-gray-400 w-20">Gas:</span>
                          <span className="text-gray-900 dark:text-white">
                            {selectedTx.gas.toLocaleString()} @ {selectedTx.gasPrice} Gwei
                          </span>
                        </div>
                        {selectedTx.input !== '0x' && (
                          <div className="flex items-start gap-2">
                            <span className="text-gray-600 dark:text-gray-400 w-20">Input:</span>
                            <span className="font-mono text-xs text-gray-700 dark:text-gray-300 break-all">
                              {selectedTx.input.slice(0, 66)}...
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Blocks className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">최신 블록</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              #{blocks[0]?.number || 0}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">평균 Gas</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.floor(blocks.reduce((acc, b) => acc + b.gasUsed, 0) / blocks.length / 1000000)}M
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">TPS</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {(blocks[0]?.transactions.length / 12).toFixed(1)}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">블록 시간</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              12s
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}