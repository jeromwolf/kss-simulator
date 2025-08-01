'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Calculator, BarChart3, PieChart, Activity, Brain } from 'lucide-react'
import { stockAnalysisModule } from '../../metadata'
import FinancialAnalyzer from '../../components/FinancialAnalyzer'
import ChartAnalyzer from '../../components/ChartAnalyzer'
import PortfolioOptimizer from '../../components/PortfolioOptimizer'
import BacktestingEngine from '../../components/BacktestingEngine'
import AIMentor from '../../components/AIMentor'

export default function StockAnalysisSimulatorPage() {
  const params = useParams()
  const router = useRouter()
  const simulatorId = params.simulatorId as string
  
  const currentSimulator = stockAnalysisModule.simulators.find(sim => sim.id === simulatorId)

  if (!currentSimulator) {
    router.push('/modules/stock-analysis')
    return null
  }

  const renderSimulator = () => {
    switch (simulatorId) {
      case 'financial-calculator':
        return <FinancialAnalyzer />
      case 'chart-analyzer':
        return <ChartAnalyzer />
      case 'portfolio-optimizer':
        return <PortfolioOptimizer />
      case 'backtesting-engine':
        return <BacktestingEngine />
      case 'ai-mentor':
        return <AIMentor />
      default:
        return (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              시뮬레이터 준비 중
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              이 시뮬레이터는 곧 업데이트될 예정입니다.
            </p>
          </div>
        )
    }
  }

  const getSimulatorIcon = (id: string) => {
    switch (id) {
      case 'financial-calculator':
        return Calculator
      case 'chart-analyzer':
        return BarChart3
      case 'portfolio-optimizer':
        return PieChart
      case 'backtesting-engine':
        return Activity
      case 'ai-mentor':
        return Brain
      default:
        return Calculator
    }
  }

  const Icon = getSimulatorIcon(simulatorId)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Link href="/modules/stock-analysis" className="hover:text-red-600 dark:hover:text-red-400">
            주식투자분석 모듈
          </Link>
          <span>/</span>
          <span>시뮬레이터</span>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {currentSimulator.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentSimulator.description}
            </p>
          </div>
        </div>
        
        <Link
          href="/modules/stock-analysis"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>모듈 홈으로 돌아가기</span>
        </Link>
      </div>

      {/* Simulator Content */}
      <div className="mb-8">
        {renderSimulator()}
      </div>

      {/* Other Simulators */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          다른 시뮬레이터
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stockAnalysisModule.simulators.filter(sim => sim.id !== simulatorId).map((simulator) => {
            const SimIcon = getSimulatorIcon(simulator.id)
            return (
              <Link
                key={simulator.id}
                href={`/modules/stock-analysis/simulators/${simulator.id}`}
                className="group bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-red-300 dark:hover:border-red-600 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <SimIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {simulator.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {simulator.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}