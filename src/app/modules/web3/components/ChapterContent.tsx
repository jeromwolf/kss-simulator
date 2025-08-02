'use client'

import { Blocks, Lock, Coins, Image, Code, Layers, Users, Shield, Zap } from 'lucide-react'

export default function ChapterContent({ chapterId }: { chapterId: number }) {
  const content = getChapterContent(chapterId)
  return <div className="prose prose-lg dark:prose-invert max-w-none">{content}</div>
}

function getChapterContent(chapterId: number) {
  switch (chapterId) {
    case 1:
      return <Chapter1 />
    case 2:
      return <Chapter2 />
    case 3:
      return <Chapter3 />
    case 4:
      return <Chapter4 />
    case 5:
      return <Chapter5 />
    case 6:
      return <Chapter6 />
    case 7:
      return <Chapter7 />
    case 8:
      return <Chapter8 />
    default:
      return <div>챕터 콘텐츠를 준비 중입니다.</div>
  }
}

function Chapter1() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          블록체인의 탄생과 진화
        </h2>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            2008년 사토시 나카모토의 비트코인 백서로 시작된 블록체인 혁명은
            단순한 디지털 화폐를 넘어 신뢰의 인터넷(Internet of Trust)을 구현하는
            핵심 기술로 발전했습니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🔗 블록체인의 핵심 구조
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">블록 구조</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div>
                  <span className="font-semibold">블록 헤더</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    이전 블록 해시, 타임스탬프, 논스, 머클 루트
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div>
                  <span className="font-semibold">트랜잭션 데이터</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    송신자, 수신자, 금액, 서명 정보
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">체인 연결</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <span className="font-semibold">암호학적 연결</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    각 블록은 이전 블록의 해시를 포함
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <span className="font-semibold">불변성 보장</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    과거 블록 수정 시 모든 후속 블록 재계산 필요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ⚡ 합의 메커니즘
        </h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              Proof of Work (PoW)
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              컴퓨팅 파워를 사용해 복잡한 수학 문제를 해결하여 블록을 생성
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <code className="text-sm text-indigo-600 dark:text-indigo-400">
                {`// PoW 예시: 특정 난이도의 해시 찾기
while (hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
  nonce++;
  hash = sha256(blockData + nonce);
}`}
              </code>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="text-green-600 dark:text-green-400">✓ 높은 보안성</span>
              <span className="text-red-600 dark:text-red-400">✗ 높은 에너지 소비</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              Proof of Stake (PoS)
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              보유한 토큰 양과 기간에 비례하여 블록 생성 권한 획득
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <code className="text-sm text-indigo-600 dark:text-indigo-400">
                {`// PoS 검증자 선택
validator = selectValidator(stakingPool, {
  stake: validator.stakedAmount,
  age: validator.stakingDuration,
  randomSeed: currentBlock.hash
});`}
              </code>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="text-green-600 dark:text-green-400">✓ 에너지 효율적</span>
              <span className="text-green-600 dark:text-green-400">✓ 빠른 처리</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          💰 토큰 이코노미
        </h3>
        
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">유틸리티 토큰</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                플랫폼 내 서비스 이용, 거버넌스 참여, 스테이킹 보상
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">거버넌스 토큰</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                프로토콜 업그레이드 투표, 파라미터 조정, 자금 운용 결정
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">보상 메커니즘</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                블록 보상, 트랜잭션 수수료, 유동성 마이닝
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter2() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Ethereum과 스마트 컨트랙트
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Ethereum은 "월드 컴퓨터"를 목표로 하는 프로그래밍 가능한 블록체인입니다.
            스마트 컨트랙트를 통해 탈중앙화된 애플리케이션(DApp)을 구축할 수 있습니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🖥️ Ethereum Virtual Machine (EVM)
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">EVM 특징</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• 튜링 완전한 가상 머신</li>
                <li>• 결정론적 실행 환경</li>
                <li>• Gas 기반 실행 비용 계산</li>
                <li>• 256비트 워드 크기</li>
                <li>• 스택 기반 아키텍처</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">EVM 호환 체인</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Polygon (MATIC)</li>
                <li>• Binance Smart Chain</li>
                <li>• Avalanche C-Chain</li>
                <li>• Fantom</li>
                <li>• Arbitrum</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          📝 Solidity 프로그래밍
        </h3>
        
        <div className="space-y-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              기본 스마트 컨트랙트 구조
            </h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    // State variables
    uint256 private storedData;
    address public owner;
    
    // Events
    event DataStored(uint256 indexed data, address indexed user);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    // Constructor
    constructor() {
        owner = msg.sender;
    }
    
    // Functions
    function set(uint256 _data) public onlyOwner {
        storedData = _data;
        emit DataStored(_data, msg.sender);
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              Gas 최적화 패턴
            </h4>
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                  1. Storage 최적화
                </h5>
                <pre className="text-sm text-gray-700 dark:text-gray-300">
{`// ❌ 비효율적
contract Inefficient {
    uint8 a;   // Slot 0
    uint256 b; // Slot 1
    uint8 c;   // Slot 2
}

// ✅ 효율적 (Packing)
contract Efficient {
    uint8 a;   // Slot 0
    uint8 c;   // Slot 0
    uint256 b; // Slot 1
}`}
                </pre>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                  2. 루프 최적화
                </h5>
                <pre className="text-sm text-gray-700 dark:text-gray-300">
{`// ❌ 비효율적
for (uint i = 0; i < array.length; i++) {
    // array.length를 매번 읽음
}

// ✅ 효율적
uint256 length = array.length;
for (uint i = 0; i < length; ++i) {
    // 한 번만 읽고, ++i 사용
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚀 배포와 상호작용
        </h3>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">
            컨트랙트 배포 프로세스
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <span>Solidity 코드 작성 및 컴파일</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <span>테스트넷에서 테스트 (Goerli, Sepolia)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <span>보안 감사 수행</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <span>메인넷 배포</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
              <span>Etherscan 검증</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter3() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          DeFi (탈중앙화 금융)의 세계
        </h2>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            DeFi는 전통 금융 서비스를 블록체인 위에 구현한 혁신적인 금융 시스템입니다.
            중개자 없이 대출, 거래, 투자가 가능한 개방형 금융 인프라를 제공합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          💵 스테이블코인 (Stablecoins)
        </h3>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">
            스테이블코인 유형과 메커니즘
          </h4>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                법정화폐 담보형
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                1:1 USD 담보 보유
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>USDT (Tether)</span>
                  <span className="text-gray-500">$83B</span>
                </div>
                <div className="flex justify-between">
                  <span>USDC (Circle)</span>
                  <span className="text-gray-500">$32B</span>
                </div>
                <div className="flex justify-between">
                  <span>BUSD (Binance)</span>
                  <span className="text-gray-500">$5B</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                암호화폐 담보형
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                초과 담보 (150%+)
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>DAI (MakerDAO)</span>
                  <span className="text-gray-500">$5B</span>
                </div>
                <div className="flex justify-between">
                  <span>LUSD (Liquity)</span>
                  <span className="text-gray-500">$300M</span>
                </div>
                <div className="flex justify-between">
                  <span>sUSD (Synthetix)</span>
                  <span className="text-gray-500">$100M</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                알고리즘형
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                수요-공급 조절
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>FRAX (부분담보)</span>
                  <span className="text-gray-500">$1B</span>
                </div>
                <div className="flex justify-between">
                  <span>UST (실패 사례)</span>
                  <span className="text-red-500">Collapsed</span>
                </div>
                <div className="flex justify-between">
                  <span>USDD (TRON)</span>
                  <span className="text-gray-500">$700M</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
              🔍 DAI 생성 메커니즘 (CDP/Vault)
            </h5>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-3">
              <pre className="text-xs text-gray-700 dark:text-gray-300">
{`// MakerDAO DAI 생성 프로세스
1. ETH를 Vault에 예치 (예: $1500 상당)
2. 최대 66% DAI 대출 가능 (1000 DAI)
3. Stability Fee 지불 (연 5-10%)
4. 청산 비율: 150% (ETH 가격 하락 시 위험)
5. DAI 상환 후 ETH 회수`}
              </pre>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              ⚠️ 담보 가치가 청산 비율 이하로 떨어지면 13% 페널티와 함께 청산
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          💱 AMM (Automated Market Maker)
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">
            Constant Product Formula: x * y = k
          </h4>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
            <pre className="text-sm text-gray-700 dark:text-gray-300">
{`// Uniswap V2 스왑 로직
function swap(uint amountIn, address tokenIn) returns (uint amountOut) {
    uint reserveIn = getReserve(tokenIn);
    uint reserveOut = getReserve(tokenOut);
    
    // 0.3% 수수료 적용
    uint amountInWithFee = amountIn * 997;
    uint numerator = amountInWithFee * reserveOut;
    uint denominator = (reserveIn * 1000) + amountInWithFee;
    
    amountOut = numerator / denominator;
    
    // 실제 스왑 실행
    executeSwap(amountIn, amountOut);
}`}
            </pre>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">장점</h5>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• 24/7 거래 가능</li>
                <li>• 무허가형 접근</li>
                <li>• 즉각적인 유동성</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">위험</h5>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Impermanent Loss</li>
                <li>• 슬리피지</li>
                <li>• 프론트러닝</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🏦 Lending & Borrowing
        </h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              Compound/Aave 모델
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  대출자 (Lender)
                </h5>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• 자산 예치 → cToken/aToken 수령</li>
                  <li>• 실시간 이자 수익</li>
                  <li>• 언제든 인출 가능</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  차입자 (Borrower)
                </h5>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• 담보 제공 (초과 담보)</li>
                  <li>• 변동 금리로 차입</li>
                  <li>• 청산 위험 관리</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              ⚠️ 청산 메커니즘
            </h4>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
{`Health Factor = (담보 가치 * LTV) / 대출 가치

if (healthFactor < 1) {
    // 청산 트리거
    liquidate(borrower, collateral, debt);
    // 청산자에게 보너스 지급 (일반적으로 5-10%)
}`}
              </pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🌾 Yield Farming & 스테이킹
        </h3>
        
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                유동성 마이닝 전략
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <h5 className="font-semibold text-sm mb-1">단일 자산</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    USDC → Compound<br/>
                    APY: 3-5%
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <h5 className="font-semibold text-sm mb-1">LP 토큰</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    ETH-USDC LP → Farm<br/>
                    APY: 10-30%
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <h5 className="font-semibold text-sm mb-1">레버리지</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    순환 대출 전략<br/>
                    APY: 20-50%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter4() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          NFT와 디지털 자산
        </h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            NFT(Non-Fungible Token)는 블록체인 상의 고유한 디지털 자산입니다.
            예술, 게임, 메타버스, 신원 증명 등 다양한 분야에서 활용되고 있습니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🎨 NFT 표준과 구현
        </h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              ERC-721 표준
            </h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
{`interface IERC721 {
    // 소유권 관련
    function ownerOf(uint256 tokenId) external view returns (address);
    function balanceOf(address owner) external view returns (uint256);
    
    // 전송 관련
    function transferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    
    // 승인 관련
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address);
    function setApprovalForAll(address operator, bool approved) external;
    
    // 이벤트
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              ERC-1155 Multi-Token
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">장점</h5>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Fungible + Non-Fungible</li>
                  <li>• 배치 전송 지원</li>
                  <li>• Gas 효율적</li>
                  <li>• 게임 아이템에 최적</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">사용 사례</h5>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• 게임 아이템 (검, 포션)</li>
                  <li>• 티켓 시스템</li>
                  <li>• 멤버십 토큰</li>
                  <li>• 에디션 아트</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          💾 메타데이터와 IPFS
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">
            NFT 메타데이터 구조
          </h4>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <pre className="text-sm text-gray-700 dark:text-gray-300">
{`{
  "name": "Cosmic Explorer #1337",
  "description": "A rare cosmic explorer from the metaverse",
  "image": "ipfs://QmXxx.../image.png",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Nebula"
    },
    {
      "trait_type": "Rarity",
      "value": "Legendary"
    },
    {
      "trait_type": "Power",
      "value": 9500,
      "max_value": 10000
    }
  ],
  "animation_url": "ipfs://QmYyy.../animation.mp4",
  "external_url": "https://example.com/nft/1337"
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🏪 NFT 마켓플레이스
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">주요 마켓플레이스</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">OpenSea</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">종합 마켓</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Blur</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">프로 트레이더</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Rarible</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">커뮤니티 중심</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Foundation</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">아트 특화</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">로열티 메커니즘</h4>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
{`// EIP-2981 로열티 표준
function royaltyInfo(uint256 tokenId, uint256 salePrice)
    external view returns (
        address receiver,
        uint256 royaltyAmount
    ) {
    uint256 royalty = (salePrice * royaltyBps) / 10000;
    return (creator, royalty);
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter5() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Web3 개발 스택
        </h2>
        
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Web3 애플리케이션 개발에는 스마트 컨트랙트, 프론트엔드, 
            블록체인 상호작용을 위한 다양한 도구와 라이브러리가 필요합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🛠️ 개발 프레임워크
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Hardhat</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-3">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
{`// hardhat.config.js
module.exports = {
  solidity: "0.8.19",
  networks: {
    mainnet: {
      url: process.env.MAINNET_RPC,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};`}
              </pre>
            </div>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>✓ 로컬 노드 내장</li>
              <li>✓ 콘솔 디버깅</li>
              <li>✓ 플러그인 시스템</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Foundry</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-3">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
{`// Solidity로 테스트 작성
contract TokenTest is Test {
    function testTransfer() public {
        token.transfer(alice, 100);
        assertEq(token.balanceOf(alice), 100);
    }
}`}
              </pre>
            </div>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>✓ 빠른 컴파일 속도</li>
              <li>✓ Solidity 테스트</li>
              <li>✓ Fuzzing 지원</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🔗 Web3 라이브러리
        </h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              Ethers.js vs Web3.js
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Ethers.js</h5>
                <pre className="text-sm text-gray-700 dark:text-gray-300">
{`import { ethers } from 'ethers';

// 프로바이더 연결
const provider = new ethers.providers.Web3Provider(
  window.ethereum
);

// 컨트랙트 인스턴스
const contract = new ethers.Contract(
  address, 
  abi, 
  provider.getSigner()
);

// 트랜잭션 실행
const tx = await contract.transfer(to, amount);
await tx.wait();`}
                </pre>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold text-green-600 dark:text-green-400 mb-2">Web3.js</h5>
                <pre className="text-sm text-gray-700 dark:text-gray-300">
{`import Web3 from 'web3';

// 프로바이더 연결
const web3 = new Web3(window.ethereum);

// 컨트랙트 인스턴스
const contract = new web3.eth.Contract(
  abi, 
  address
);

// 트랜잭션 실행
await contract.methods.transfer(to, amount)
  .send({ from: account });`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🦊 지갑 통합
        </h3>
        
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">
            MetaMask 연결 구현
          </h4>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <pre className="text-sm text-gray-700 dark:text-gray-300">
{`async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // 계정 요청
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      // 체인 ID 확인
      const chainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });
      
      // 체인 전환 (필요시)
      if (chainId !== '0x1') {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }],
        });
      }
      
      // 이벤트 리스너
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return accounts[0];
    } catch (error) {
      console.error('Connection failed:', error);
    }
  } else {
    alert('Please install MetaMask!');
  }
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          📊 The Graph 프로토콜
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">
            서브그래프 쿼리
          </h4>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-gray-700 dark:text-gray-300">
{`# GraphQL 쿼리
query GetUserTokens($user: String!) {
  tokens(where: { owner: $user }) {
    id
    tokenURI
    transfers(orderBy: timestamp, orderDirection: desc) {
      from
      to
      timestamp
      txHash
    }
  }
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter6() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Layer 2와 확장성 솔루션
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            블록체인의 확장성 트릴레마를 해결하기 위한 Layer 2 솔루션들은
            메인체인의 보안성을 유지하면서 처리량과 속도를 대폭 개선합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🔄 Rollup 기술
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              Optimistic Rollups
            </h4>
            <div className="space-y-3">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>원리:</strong> 트랜잭션을 일단 유효하다고 가정
                </p>
              </div>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Fraud Proof 기반 검증</li>
                <li>• 7일 챌린지 기간</li>
                <li>• EVM 호환성 우수</li>
                <li>• Arbitrum, Optimism</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              ZK Rollups
            </h4>
            <div className="space-y-3">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>원리:</strong> 영지식 증명으로 유효성 검증
                </p>
              </div>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Validity Proof 생성</li>
                <li>• 즉시 최종성</li>
                <li>• 높은 보안성</li>
                <li>• zkSync, StarkNet</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🌉 브릿지와 크로스체인
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">
            브릿지 메커니즘
          </h4>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
            <pre className="text-sm text-gray-700 dark:text-gray-300">
{`// Lock & Mint 방식
contract Bridge {
    // L1 → L2
    function deposit(uint256 amount) external {
        // L1에서 토큰 잠금
        token.transferFrom(msg.sender, address(this), amount);
        
        // L2에 메시지 전송
        messenger.sendMessage(
            l2Bridge,
            abi.encode(msg.sender, amount)
        );
    }
    
    // L2 → L1
    function withdraw(uint256 amount) external {
        // L2에서 토큰 소각
        token.burn(msg.sender, amount);
        
        // L1 인출 요청
        initiateWithdrawal(msg.sender, amount);
    }
}`}
            </pre>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <h5 className="font-semibold text-sm mb-1">Native Bridge</h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                공식 브릿지, 높은 보안, 느린 속도
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
              <h5 className="font-semibold text-sm mb-1">Third-party</h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                빠른 속도, 유동성 풀, 추가 위험
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
              <h5 className="font-semibold text-sm mb-1">Atomic Swap</h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                P2P 교환, 신뢰 불필요, 제한적
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ⚖️ 확장성 트릴레마
        </h3>
        
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">보안성</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                네트워크 공격 저항력
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">확장성</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                처리량과 속도
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">탈중앙화</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                노드 분산과 접근성
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter7() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          DAO와 거버넌스
        </h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            DAO(Decentralized Autonomous Organization)는 스마트 컨트랙트로 운영되는
            탈중앙화 자율 조직으로, 커뮤니티가 직접 의사결정에 참여합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🏛️ DAO 구조와 운영
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">
            거버넌스 스마트 컨트랙트
          </h4>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-gray-700 dark:text-gray-300">
{`contract GovernorDAO {
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 startBlock;
        uint256 endBlock;
        bool executed;
        mapping(address => bool) hasVoted;
    }
    
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    uint256 public quorum = 4%; // 4% of total supply
    uint256 public votingPeriod = 3 days;
    
    function propose(string memory description) external returns (uint256) {
        require(getVotingPower(msg.sender) >= proposalThreshold, "Insufficient voting power");
        
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.proposer = msg.sender;
        newProposal.description = description;
        newProposal.startBlock = block.number;
        newProposal.endBlock = block.number + votingPeriod;
        
        emit ProposalCreated(proposalCount, msg.sender, description);
        return proposalCount;
    }
    
    function vote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.number <= proposal.endBlock, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        
        uint256 votingPower = getVotingPower(msg.sender);
        proposal.hasVoted[msg.sender] = true;
        
        if (support) {
            proposal.forVotes += votingPower;
        } else {
            proposal.againstVotes += votingPower;
        }
        
        emit VoteCast(msg.sender, proposalId, support, votingPower);
    }
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🗳️ 투표 메커니즘
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">투표 방식</h4>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <h5 className="font-semibold text-sm mb-1">Token Voting</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  1 토큰 = 1 투표권
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <h5 className="font-semibold text-sm mb-1">Quadratic Voting</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  투표 비용 = 투표수²
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <h5 className="font-semibold text-sm mb-1">Delegation</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  투표권 위임 가능
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">제안 프로세스</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">1</div>
                <span className="text-sm">제안 제출 (최소 토큰 필요)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">2</div>
                <span className="text-sm">토론 기간</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">3</div>
                <span className="text-sm">투표 기간</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">4</div>
                <span className="text-sm">타임락 (보안)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">5</div>
                <span className="text-sm">실행</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          💼 Treasury 관리
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">
            DAO Treasury 운영
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">수입원</h5>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• 프로토콜 수수료</li>
                <li>• NFT 판매</li>
                <li>• 투자 수익</li>
                <li>• 기부금</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">지출 항목</h5>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• 개발자 보상</li>
                <li>• 마케팅 비용</li>
                <li>• 감사 비용</li>
                <li>• 그랜트 프로그램</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-green-600 dark:text-green-400 mb-2">관리 도구</h5>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Gnosis Safe</li>
                <li>• Snapshot</li>
                <li>• Tally</li>
                <li>• Boardroom</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter8() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Web3 보안과 감사
        </h2>
        
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            스마트 컨트랙트는 불변성을 가지므로 배포 전 철저한 보안 감사가 필수입니다.
            수십억 달러의 해킹 사례들을 통해 보안의 중요성을 배웁니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ⚠️ 주요 취약점과 공격 벡터
        </h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-red-600 dark:text-red-400 mb-3">
              Reentrancy Attack
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-sm mb-2">❌ 취약한 코드</h5>
                <pre className="text-xs text-gray-700 dark:text-gray-300">
{`function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount);
    
    // 외부 호출 먼저 (위험!)
    msg.sender.call{value: amount}("");
    
    // 상태 변경 나중에
    balances[msg.sender] -= amount;
}`}
                </pre>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-sm mb-2">✅ 안전한 코드</h5>
                <pre className="text-xs text-gray-700 dark:text-gray-300">
{`function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount);
    
    // CEI 패턴: Check-Effects-Interactions
    balances[msg.sender] -= amount;
    
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
}`}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-orange-600 dark:text-orange-400 mb-3">
              Flash Loan Attack
            </h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
{`// Flash Loan 공격 시나리오
contract FlashLoanAttack {
    function executeAttack() external {
        // 1. Flash Loan으로 대량 자금 대출
        uint256 loanAmount = 1000000 * 10**18;
        flashLender.flashLoan(loanAmount);
    }
    
    function onFlashLoan(uint256 amount) external {
        // 2. 가격 조작
        manipulatePrice(amount);
        
        // 3. 차익 거래
        arbitrage();
        
        // 4. 대출 상환
        repayLoan(amount);
    }
}`}
              </pre>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>방어:</strong> 오라클 사용, 가격 평균화, 시간 지연
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🛡️ 보안 베스트 프랙티스
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">개발 단계</h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✓ 최신 Solidity 버전 사용</li>
              <li>✓ OpenZeppelin 라이브러리 활용</li>
              <li>✓ 단위 테스트 100% 커버리지</li>
              <li>✓ Fuzzing 테스트 수행</li>
              <li>✓ 형식 검증 (Formal Verification)</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">배포 전</h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✓ 내부 코드 리뷰</li>
              <li>✓ 외부 감사 (2개 이상)</li>
              <li>✓ Bug Bounty 프로그램</li>
              <li>✓ 테스트넷 장기 운영</li>
              <li>✓ 단계적 배포 전략</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🔍 감사 도구와 방법론
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">
            자동화 도구
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Slither</h5>
              <pre className="text-xs text-gray-600 dark:text-gray-400">
{`# 정적 분석
slither . --print human-summary
slither . --detect reentrancy-eth`}
              </pre>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Mythril</h5>
              <pre className="text-xs text-gray-600 dark:text-gray-400">
{`# 심볼릭 실행
myth analyze Contract.sol
myth --execution-timeout 60`}
              </pre>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-green-600 dark:text-green-400 mb-2">Echidna</h5>
              <pre className="text-xs text-gray-600 dark:text-gray-400">
{`# Fuzzing
echidna-test . --contract Test
echidna-test . --test-limit 50000`}
              </pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          💰 Bug Bounty 프로그램
        </h3>
        
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">보상 체계</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Critical</span>
                  <span className="font-bold text-red-600">$50,000 - $1,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">High</span>
                  <span className="font-bold text-orange-600">$10,000 - $50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Medium</span>
                  <span className="font-bold text-yellow-600">$1,000 - $10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Low</span>
                  <span className="font-bold text-green-600">$100 - $1,000</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">플랫폼</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Immunefi</li>
                <li>• HackerOne</li>
                <li>• Code4rena</li>
                <li>• Sherlock</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}