'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Coins, TrendingUp, Percent, AlertTriangle, RefreshCw, DollarSign } from 'lucide-react'

interface Pool {
  tokenA: string
  tokenB: string
  reserveA: number
  reserveB: number
  totalLiquidity: number
  apr: number
}

interface LendingMarket {
  asset: string
  totalSupply: number
  totalBorrow: number
  supplyAPY: number
  borrowAPY: number
  utilization: number
}

export default function DeFiSimulatorPage() {
  const [activeTab, setActiveTab] = useState<'swap' | 'pool' | 'lending' | 'staking'>('swap')
  
  // Swap state
  const [swapFrom, setSwapFrom] = useState('ETH')
  const [swapTo, setSwapTo] = useState('USDC')
  const [swapAmount, setSwapAmount] = useState('')
  const [swapOutput, setSwapOutput] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  
  // Pool state
  const [pools] = useState<Pool[]>([
    { tokenA: 'ETH', tokenB: 'USDC', reserveA: 1000, reserveB: 3800000, totalLiquidity: 5000000, apr: 24.5 },
    { tokenA: 'BTC', tokenB: 'USDC', reserveA: 100, reserveB: 6500000, totalLiquidity: 8000000, apr: 18.2 },
    { tokenA: 'ETH', tokenB: 'USDT', reserveA: 800, reserveB: 3040000, totalLiquidity: 4000000, apr: 22.1 }
  ])
  const [selectedPool, setSelectedPool] = useState<Pool>(pools[0])
  const [liquidityAmount, setLiquidityAmount] = useState('')
  
  // Lending state
  const [lendingMarkets] = useState<LendingMarket[]>([
    { asset: 'USDC', totalSupply: 50000000, totalBorrow: 35000000, supplyAPY: 3.2, borrowAPY: 5.8, utilization: 70 },
    { asset: 'ETH', totalSupply: 10000, totalBorrow: 7500, supplyAPY: 2.1, borrowAPY: 3.9, utilization: 75 },
    { asset: 'BTC', totalSupply: 500, totalBorrow: 300, supplyAPY: 1.8, borrowAPY: 3.2, utilization: 60 }
  ])
  const [collateral, setCollateral] = useState('')
  const [borrowAmount, setBorrowAmount] = useState('')
  
  // Staking state
  const [stakingAmount, setStakingAmount] = useState('')
  const [stakingDuration, setStakingDuration] = useState(30)
  const [stakingAPR] = useState(12.5)

  // Calculate swap output using AMM formula
  const calculateSwap = (amount: string) => {
    if (!amount || parseFloat(amount) <= 0) {
      setSwapOutput('')
      return
    }
    
    const inputAmount = parseFloat(amount)
    const pool = pools.find(p => 
      (p.tokenA === swapFrom && p.tokenB === swapTo) ||
      (p.tokenB === swapFrom && p.tokenA === swapTo)
    )
    
    if (!pool) {
      setSwapOutput('No pool available')
      return
    }
    
    const isForward = pool.tokenA === swapFrom
    const reserveIn = isForward ? pool.reserveA : pool.reserveB
    const reserveOut = isForward ? pool.reserveB : pool.reserveA
    
    // AMM formula: (x + Δx) * (y - Δy) = x * y
    const amountInWithFee = inputAmount * 997 // 0.3% fee
    const numerator = amountInWithFee * reserveOut
    const denominator = (reserveIn * 1000) + amountInWithFee
    const amountOut = numerator / denominator
    
    setSwapOutput(amountOut.toFixed(4))
  }

  const calculateImpermanentLoss = () => {
    // Simplified IL calculation
    const priceRatio = 1.5 // Assume 50% price change
    const il = (2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1) * 100
    return Math.abs(il).toFixed(2)
  }

  const calculateHealthFactor = () => {
    if (!collateral || !borrowAmount) return 'N/A'
    const collateralValue = parseFloat(collateral) * 3800 // Assume ETH price
    const borrowValue = parseFloat(borrowAmount)
    const ltv = 0.75 // 75% Loan-to-Value
    const healthFactor = (collateralValue * ltv) / borrowValue
    return healthFactor.toFixed(2)
  }

  const calculateStakingRewards = () => {
    if (!stakingAmount) return '0'
    const amount = parseFloat(stakingAmount)
    const daily = (amount * stakingAPR / 100) / 365
    const total = daily * stakingDuration
    return total.toFixed(4)
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
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Coins className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                DeFi 프로토콜 시뮬레이터
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                AMM, Lending, Staking 체험
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('swap')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'swap'
                  ? 'text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Swap
            </button>
            <button
              onClick={() => setActiveTab('pool')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'pool'
                  ? 'text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Liquidity Pool
            </button>
            <button
              onClick={() => setActiveTab('lending')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'lending'
                  ? 'text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Lending
            </button>
            <button
              onClick={() => setActiveTab('staking')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'staking'
                  ? 'text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Staking
            </button>
          </div>

          {/* Swap Tab */}
          {activeTab === 'swap' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={swapFrom}
                      onChange={(e) => {
                        setSwapFrom(e.target.value)
                        calculateSwap(swapAmount)
                      }}
                      className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="ETH">ETH</option>
                      <option value="BTC">BTC</option>
                      <option value="USDC">USDC</option>
                      <option value="USDT">USDT</option>
                    </select>
                    <input
                      type="number"
                      value={swapAmount}
                      onChange={(e) => {
                        setSwapAmount(e.target.value)
                        calculateSwap(e.target.value)
                      }}
                      placeholder="0.0"
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex justify-center my-4">
                  <button className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <RefreshCw className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={swapTo}
                      onChange={(e) => {
                        setSwapTo(e.target.value)
                        calculateSwap(swapAmount)
                      }}
                      className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="USDC">USDC</option>
                      <option value="USDT">USDT</option>
                      <option value="ETH">ETH</option>
                      <option value="BTC">BTC</option>
                    </select>
                    <input
                      type="text"
                      value={swapOutput}
                      readOnly
                      placeholder="0.0"
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Slippage Tolerance</span>
                    <span>{slippage}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={slippage}
                    onChange={(e) => setSlippage(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors">
                  Swap
                </button>

                {swapOutput && swapAmount && (
                  <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Price Impact:</span>
                        <span className="text-gray-900 dark:text-white">
                          {(Math.random() * 2).toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Fee (0.3%):</span>
                        <span className="text-gray-900 dark:text-white">
                          {(parseFloat(swapAmount) * 0.003).toFixed(4)} {swapFrom}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Liquidity Pool Tab */}
          {activeTab === 'pool' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">유동성 풀</h3>
                <div className="space-y-3">
                  {pools.map((pool, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedPool(pool)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedPool === pool
                          ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500'
                          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {pool.tokenA}/{pool.tokenB}
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-bold">
                          {pool.apr}% APR
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <div>TVL: ${(pool.totalLiquidity / 1000000).toFixed(1)}M</div>
                        <div>
                          Reserves: {pool.reserveA} {pool.tokenA} / {pool.reserveB.toLocaleString()} {pool.tokenB}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">유동성 공급</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {selectedPool.tokenA} Amount
                    </label>
                    <input
                      type="number"
                      value={liquidityAmount}
                      onChange={(e) => setLiquidityAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {liquidityAmount && (
                    <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{selectedPool.tokenB} Required:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {(parseFloat(liquidityAmount) * (selectedPool.reserveB / selectedPool.reserveA)).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Pool Share:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {((parseFloat(liquidityAmount) / selectedPool.reserveA) * 100).toFixed(3)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Estimated Daily:</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            ${((parseFloat(liquidityAmount) * 3800 * selectedPool.apr / 100) / 365).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-colors">
                    Add Liquidity
                  </button>

                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      <strong>Impermanent Loss Risk:</strong> {calculateImpermanentLoss()}% potential loss if price changes 50%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lending Tab */}
          {activeTab === 'lending' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">대출 시장</h3>
                <div className="space-y-3">
                  {lendingMarkets.map((market, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900 dark:text-white text-lg">
                          {market.asset}
                        </span>
                        <div className="text-right">
                          <div className="text-green-600 dark:text-green-400 text-sm">
                            Supply APY: {market.supplyAPY}%
                          </div>
                          <div className="text-orange-600 dark:text-orange-400 text-sm">
                            Borrow APY: {market.borrowAPY}%
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Total Supply:</span>
                          <span className="text-gray-900 dark:text-white">
                            {market.totalSupply.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Total Borrow:</span>
                          <span className="text-gray-900 dark:text-white">
                            {market.totalBorrow.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Utilization:</span>
                            <span className="text-gray-900 dark:text-white">{market.utilization}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-orange-500 h-2 rounded-full"
                              style={{ width: `${market.utilization}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">차입 포지션</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      담보 (ETH)
                    </label>
                    <input
                      type="number"
                      value={collateral}
                      onChange={(e) => setCollateral(e.target.value)}
                      placeholder="0.0"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      차입 금액 (USDC)
                    </label>
                    <input
                      type="number"
                      value={borrowAmount}
                      onChange={(e) => setBorrowAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {collateral && borrowAmount && (
                    <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Health Factor:</span>
                          <span className={`font-semibold ${
                            parseFloat(calculateHealthFactor()) > 1.5
                              ? 'text-green-600 dark:text-green-400'
                              : parseFloat(calculateHealthFactor()) > 1
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {calculateHealthFactor()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">LTV:</span>
                          <span className="text-gray-900 dark:text-white">75%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Daily Interest:</span>
                          <span className="text-orange-600 dark:text-orange-400">
                            ${(parseFloat(borrowAmount) * 0.058 / 365).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-colors">
                    Borrow
                  </button>

                  {parseFloat(calculateHealthFactor()) < 1.5 && parseFloat(calculateHealthFactor()) > 0 && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-red-700 dark:text-red-300">
                        <strong>청산 위험:</strong> Health Factor가 1 이하로 떨어지면 청산됩니다
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Staking Tab */}
          {activeTab === 'staking' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {stakingAPR}% APR
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">연간 수익률</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    스테이킹 수량 (ETH)
                  </label>
                  <input
                    type="number"
                    value={stakingAmount}
                    onChange={(e) => setStakingAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    스테이킹 기간: {stakingDuration}일
                  </label>
                  <input
                    type="range"
                    min="7"
                    max="365"
                    value={stakingDuration}
                    onChange={(e) => setStakingDuration(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {stakingAmount && (
                  <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">예상 수익</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">일일 수익:</span>
                        <span className="text-gray-900 dark:text-white">
                          {((parseFloat(stakingAmount) * stakingAPR / 100) / 365).toFixed(6)} ETH
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">기간 수익:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {calculateStakingRewards()} ETH
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">총 수령액:</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {(parseFloat(stakingAmount) + parseFloat(calculateStakingRewards())).toFixed(4)} ETH
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors">
                  Stake ETH
                </button>

                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  언스테이킹 대기 기간: 7일
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}