'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Vote, Gavel, TrendingUp, TrendingDown, 
  CheckCircle, XCircle, Clock, Play, RefreshCw,
  BarChart, PieChart, Activity, AlertTriangle
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  preference: number;
  vote?: string;
  weight: number;
  reputation: number;
  isLeader?: boolean;
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  options: string[];
  votes: Record<string, number>;
}

interface ConsensusResult {
  winner: string;
  votes: Record<string, number>;
  percentage: Record<string, number>;
  consensus: boolean;
  rounds: number;
}

const CONSENSUS_ALGORITHMS = [
  { id: 'majority', name: 'Majority Voting', threshold: 50 },
  { id: 'supermajority', name: 'Super Majority', threshold: 67 },
  { id: 'weighted', name: 'Weighted Voting', threshold: 50 },
  { id: 'byzantine', name: 'Byzantine Fault Tolerance', threshold: 67 },
  { id: 'raft', name: 'Raft Consensus', threshold: 50 }
];

const SAMPLE_PROPOSALS: Proposal[] = [
  {
    id: 'prop-1',
    title: '시스템 업그레이드 전략',
    description: '다음 분기 시스템 업그레이드 방향을 결정합니다',
    options: ['즉시 업그레이드', '단계적 업그레이드', '현상 유지', '재검토'],
    votes: {}
  },
  {
    id: 'prop-2',
    title: '자원 할당 우선순위',
    description: '제한된 자원을 어떤 작업에 우선 할당할지 결정합니다',
    options: ['성능 최적화', '보안 강화', '신기능 개발', '유지보수'],
    votes: {}
  }
];

export default function ConsensusSimulator() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<Proposal>(SAMPLE_PROPOSALS[0]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(CONSENSUS_ALGORITHMS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [result, setResult] = useState<ConsensusResult | null>(null);
  const [votingHistory, setVotingHistory] = useState<Array<{round: number, votes: Record<string, number>}>>([]);

  // Initialize agents
  useEffect(() => {
    const initialAgents: Agent[] = Array.from({ length: 7 }, (_, i) => ({
      id: `agent-${i + 1}`,
      name: `Agent ${i + 1}`,
      preference: Math.random(),
      weight: Math.random() * 0.5 + 0.5,
      reputation: Math.random() * 0.3 + 0.7,
      isLeader: i === 0
    }));
    setAgents(initialAgents);
  }, []);

  // Run consensus simulation
  const runSimulation = async () => {
    setIsSimulating(true);
    setResult(null);
    setVotingHistory([]);
    setCurrentRound(0);

    // Reset proposal votes
    const proposal = { ...selectedProposal, votes: {} as Record<string, number> };
    selectedProposal.options.forEach(option => {
      proposal.votes[option] = 0;
    });

    let consensusReached = false;
    let rounds = 0;
    const maxRounds = 5;

    while (!consensusReached && rounds < maxRounds) {
      rounds++;
      setCurrentRound(rounds);

      // Simulate voting
      const roundVotes: Record<string, number> = {};
      selectedProposal.options.forEach(option => {
        roundVotes[option] = 0;
      });

      // Each agent votes
      for (const agent of agents) {
        await new Promise(resolve => setTimeout(resolve, 200));

        // Simulate agent decision making
        let chosenOption: string;
        if (selectedAlgorithm.id === 'raft' && agent.isLeader) {
          // Leader proposes first option
          chosenOption = selectedProposal.options[0];
        } else {
          // Random weighted choice based on preference
          const randomIndex = Math.floor(Math.random() * selectedProposal.options.length);
          chosenOption = selectedProposal.options[randomIndex];
        }

        // Apply vote weight
        const voteWeight = selectedAlgorithm.id === 'weighted' 
          ? agent.weight * agent.reputation 
          : 1;

        roundVotes[chosenOption] += voteWeight;

        // Update agent vote
        setAgents(prev => prev.map(a => 
          a.id === agent.id ? { ...a, vote: chosenOption } : a
        ));
      }

      // Update voting history
      setVotingHistory(prev => [...prev, { round: rounds, votes: roundVotes }]);

      // Check for consensus
      const totalVotes = Object.values(roundVotes).reduce((sum, v) => sum + v, 0);
      const percentages: Record<string, number> = {};
      
      Object.entries(roundVotes).forEach(([option, votes]) => {
        percentages[option] = (votes / totalVotes) * 100;
      });

      const winner = Object.entries(percentages).reduce((a, b) => 
        a[1] > b[1] ? a : b
      )[0];

      if (percentages[winner] >= selectedAlgorithm.threshold) {
        consensusReached = true;
        setResult({
          winner,
          votes: roundVotes,
          percentage: percentages,
          consensus: true,
          rounds
        });
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (!consensusReached) {
      // No consensus reached
      const totalVotes = Object.values(proposal.votes).reduce((sum, v) => sum + v, 0);
      const percentages: Record<string, number> = {};
      
      Object.entries(proposal.votes).forEach(([option, votes]) => {
        percentages[option] = (votes / totalVotes) * 100;
      });

      const winner = Object.entries(percentages).reduce((a, b) => 
        a[1] > b[1] ? a : b
      )[0];

      setResult({
        winner: winner || 'No consensus',
        votes: proposal.votes,
        percentage: percentages,
        consensus: false,
        rounds
      });
    }

    setIsSimulating(false);
  };

  // Reset simulation
  const resetSimulation = () => {
    setResult(null);
    setVotingHistory([]);
    setCurrentRound(0);
    setAgents(prev => prev.map(a => ({ ...a, vote: undefined })));
  };

  // Calculate vote distribution
  const getVoteDistribution = () => {
    if (votingHistory.length === 0) return null;
    
    const latestVotes = votingHistory[votingHistory.length - 1].votes;
    const total = Object.values(latestVotes).reduce((sum, v) => sum + v, 0);
    
    return Object.entries(latestVotes).map(([option, votes]) => ({
      option,
      votes,
      percentage: ((votes / total) * 100).toFixed(1)
    }));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Distributed Consensus Simulator
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          다양한 합의 알고리즘을 통한 분산 의사결정 과정을 시뮬레이션합니다
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Configuration Panel */}
        <div className="col-span-4 space-y-4">
          {/* Proposal Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Proposal
            </h4>
            <select
              value={selectedProposal.id}
              onChange={(e) => {
                const proposal = SAMPLE_PROPOSALS.find(p => p.id === e.target.value);
                if (proposal) setSelectedProposal(proposal);
              }}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
              disabled={isSimulating}
            >
              {SAMPLE_PROPOSALS.map(proposal => (
                <option key={proposal.id} value={proposal.id}>
                  {proposal.title}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {selectedProposal.description}
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Options:</p>
              {selectedProposal.options.map((option, idx) => (
                <div key={idx} className="text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  {idx + 1}. {option}
                </div>
              ))}
            </div>
          </div>

          {/* Algorithm Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Consensus Algorithm
            </h4>
            <div className="space-y-2">
              {CONSENSUS_ALGORITHMS.map(algo => (
                <button
                  key={algo.id}
                  onClick={() => setSelectedAlgorithm(algo)}
                  disabled={isSimulating}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    selectedAlgorithm.id === algo.id
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  } disabled:opacity-50`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{algo.name}</span>
                    <span className="text-xs text-gray-500">≥{algo.threshold}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Simulating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={resetSimulation}
              disabled={isSimulating}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Agents Visualization */}
        <div className="col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Agent Network ({agents.length} agents)
            </h4>
            
            <div className="grid grid-cols-3 gap-3">
              {agents.map(agent => (
                <div
                  key={agent.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    agent.vote 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    {agent.isLeader && (
                      <Gavel className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {agent.name}
                  </p>
                  {selectedAlgorithm.id === 'weighted' && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      W: {agent.weight.toFixed(2)}
                    </p>
                  )}
                  {agent.vote && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 truncate">
                      → {agent.vote}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {currentRound > 0 && (
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-orange-700 dark:text-orange-300">
                    Round {currentRound}/5
                  </span>
                  <Activity className="w-4 h-4 text-orange-600 dark:text-orange-400 animate-pulse" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="col-span-4 space-y-4">
          {/* Vote Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Vote Distribution
            </h4>
            
            {getVoteDistribution() ? (
              <div className="space-y-2">
                {getVoteDistribution()!.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{item.option}</span>
                      <span className="font-semibold">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-8">
                투표 결과가 여기에 표시됩니다
              </p>
            )}
          </div>

          {/* Consensus Result */}
          {result && (
            <div className={`rounded-lg p-4 ${
              result.consensus 
                ? 'bg-green-50 dark:bg-green-900/20' 
                : 'bg-red-50 dark:bg-red-900/20'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Consensus Result
                </h4>
                {result.consensus ? (
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={result.consensus ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                    {result.consensus ? 'Consensus Reached' : 'No Consensus'}
                  </span>
                </p>
                <p>
                  <strong>Winner:</strong> {result.winner}
                </p>
                <p>
                  <strong>Support:</strong> {result.percentage[result.winner]?.toFixed(1)}%
                </p>
                <p>
                  <strong>Rounds:</strong> {result.rounds}
                </p>
              </div>
            </div>
          )}

          {/* Voting History */}
          {votingHistory.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Voting History
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {votingHistory.map((history, idx) => (
                  <div key={idx} className="text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      Round {history.round}
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {Object.entries(history.votes).map(([option, votes]) => (
                        <span key={option} className="text-gray-600 dark:text-gray-400">
                          {option}: {votes.toFixed(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="mt-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5" />
          <div className="text-xs text-orange-700 dark:text-orange-300 space-y-1">
            <p><strong>{selectedAlgorithm.name}</strong> 알고리즘 특징:</p>
            {selectedAlgorithm.id === 'majority' && (
              <p>가장 많은 표를 받은 옵션이 50% 이상일 때 합의 도달</p>
            )}
            {selectedAlgorithm.id === 'supermajority' && (
              <p>2/3 이상의 동의가 필요한 강화된 합의 메커니즘</p>
            )}
            {selectedAlgorithm.id === 'weighted' && (
              <p>에이전트의 가중치와 평판을 고려한 투표 시스템</p>
            )}
            {selectedAlgorithm.id === 'byzantine' && (
              <p>악의적 노드가 있어도 안전한 합의를 보장 (BFT)</p>
            )}
            {selectedAlgorithm.id === 'raft' && (
              <p>리더 선출을 통한 효율적인 합의 알고리즘</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}