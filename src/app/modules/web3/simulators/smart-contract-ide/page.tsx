'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Code, Play, Save, FileCode, AlertCircle, CheckCircle, Copy, Download } from 'lucide-react'

const contractTemplates = {
  erc20: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract MyToken is IERC20 {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    uint256 private _totalSupply;
    string public name;
    string public symbol;
    uint8 public decimals;
    
    constructor(string memory _name, string memory _symbol, uint256 _supply) {
        name = _name;
        symbol = _symbol;
        decimals = 18;
        _totalSupply = _supply * 10**decimals;
        _balances[msg.sender] = _totalSupply;
    }
    
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
    
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;
        return true;
    }
    
    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }
    
    function approve(address spender, uint256 amount) public override returns (bool) {
        _allowances[msg.sender][spender] = amount;
        return true;
    }
    
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        require(_balances[sender] >= amount, "Insufficient balance");
        require(_allowances[sender][msg.sender] >= amount, "Insufficient allowance");
        
        _balances[sender] -= amount;
        _balances[recipient] += amount;
        _allowances[sender][msg.sender] -= amount;
        
        return true;
    }
}`,
  erc721: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721 {
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
}

contract MyNFT is IERC721 {
    string public name;
    string public symbol;
    
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(uint256 => string) private _tokenURIs;
    
    uint256 private _currentTokenId;
    
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }
    
    function mint(address to, string memory uri) public returns (uint256) {
        _currentTokenId++;
        _owners[_currentTokenId] = to;
        _balances[to]++;
        _tokenURIs[_currentTokenId] = uri;
        return _currentTokenId;
    }
    
    function balanceOf(address owner) public view override returns (uint256) {
        require(owner != address(0), "Invalid address");
        return _balances[owner];
    }
    
    function ownerOf(uint256 tokenId) public view override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "Token does not exist");
        return owner;
    }
    
    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(ownerOf(tokenId) == from, "Not the owner");
        require(to != address(0), "Invalid recipient");
        
        _tokenApprovals[tokenId] = address(0);
        _balances[from]--;
        _balances[to]++;
        _owners[tokenId] = to;
    }
    
    function approve(address to, uint256 tokenId) public override {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "Not the owner");
        _tokenApprovals[tokenId] = to;
    }
    
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }
}`,
  simple: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    address public owner;
    
    event DataStored(uint256 data);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    function set(uint256 data) public onlyOwner {
        storedData = data;
        emit DataStored(data);
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
    
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}`
}

interface CompilationResult {
  success: boolean
  bytecode?: string
  abi?: any[]
  errors?: string[]
  warnings?: string[]
  gasEstimate?: number
}

export default function SmartContractIDEPage() {
  const [code, setCode] = useState(contractTemplates.simple)
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null)
  const [isCompiling, setIsCompiling] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('simple')
  const [deployAddress, setDeployAddress] = useState('')

  const compile = () => {
    setIsCompiling(true)
    
    // Simulate compilation
    setTimeout(() => {
      // Basic syntax check
      const hasErrors = !code.includes('pragma solidity') || !code.includes('contract')
      
      if (hasErrors) {
        setCompilationResult({
          success: false,
          errors: ['Syntax error: Invalid contract structure'],
          warnings: []
        })
      } else {
        setCompilationResult({
          success: true,
          bytecode: '0x608060405234801561001057600080fd5b50...',
          abi: [
            {
              inputs: [],
              name: 'get',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              stateMutability: 'view',
              type: 'function'
            },
            {
              inputs: [{ internalType: 'uint256', name: 'data', type: 'uint256' }],
              name: 'set',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function'
            }
          ],
          warnings: code.length > 1000 ? ['Contract size warning: Consider optimizing for gas'] : [],
          gasEstimate: 150000 + Math.floor(code.length * 10)
        })
      }
      
      setIsCompiling(false)
    }, 1500)
  }

  const deploy = () => {
    if (compilationResult?.success) {
      // Simulate deployment
      setTimeout(() => {
        setDeployAddress(`0x${Math.random().toString(16).substr(2, 40)}`)
      }, 2000)
    }
  }

  const loadTemplate = (template: keyof typeof contractTemplates) => {
    setCode(contractTemplates[template])
    setSelectedTemplate(template)
    setCompilationResult(null)
    setDeployAddress('')
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'contract.sol'
    a.click()
    URL.revokeObjectURL(url)
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
                <Code className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  스마트 컨트랙트 IDE
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Solidity 코드 작성과 실시간 컴파일
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyCode}
                className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={downloadCode}
                className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              템플릿 선택
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => loadTemplate('simple')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTemplate === 'simple'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
                }`}
              >
                Simple Storage
              </button>
              <button
                onClick={() => loadTemplate('erc20')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTemplate === 'erc20'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
                }`}
              >
                ERC-20 Token
              </button>
              <button
                onClick={() => loadTemplate('erc721')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTemplate === 'erc721'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
                }`}
              >
                ERC-721 NFT
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Code Editor */}
            <div className="col-span-8">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-1">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      contract.sol
                    </span>
                  </div>
                  <button
                    onClick={compile}
                    disabled={isCompiling}
                    className="px-4 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    {isCompiling ? '컴파일 중...' : '컴파일'}
                  </button>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Compilation Results */}
            <div className="col-span-4 space-y-4">
              {/* Compilation Status */}
              {compilationResult && (
                <div className={`rounded-xl p-4 border ${
                  compilationResult.success
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {compilationResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {compilationResult.success ? '컴파일 성공' : '컴파일 실패'}
                    </span>
                  </div>
                  
                  {compilationResult.errors && compilationResult.errors.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-1">
                        에러:
                      </h4>
                      <ul className="text-xs text-red-600 dark:text-red-400 space-y-1">
                        {compilationResult.errors.map((error, idx) => (
                          <li key={idx}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {compilationResult.warnings && compilationResult.warnings.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 mb-1">
                        경고:
                      </h4>
                      <ul className="text-xs text-yellow-600 dark:text-yellow-400 space-y-1">
                        {compilationResult.warnings.map((warning, idx) => (
                          <li key={idx}>• {warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Gas Estimate */}
              {compilationResult?.success && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    배포 정보
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">예상 Gas:</span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {compilationResult.gasEstimate?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">바이트코드:</span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {compilationResult.bytecode?.slice(0, 10)}...
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={deploy}
                    className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
                  >
                    테스트넷 배포
                  </button>
                </div>
              )}

              {/* Deployed Contract */}
              {deployAddress && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    배포 완료!
                  </h3>
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-400">컨트랙트 주소:</span>
                    <div className="font-mono text-xs text-gray-900 dark:text-white mt-1 break-all">
                      {deployAddress}
                    </div>
                  </div>
                </div>
              )}

              {/* ABI */}
              {compilationResult?.abi && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    ABI (Application Binary Interface)
                  </h3>
                  <div className="max-h-48 overflow-y-auto">
                    <pre className="text-xs text-gray-700 dark:text-gray-300">
                      {JSON.stringify(compilationResult.abi, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            💡 Solidity 개발 팁
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                보안 고려사항
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Reentrancy 공격 방지</li>
                <li>• Integer overflow 체크</li>
                <li>• Access control 구현</li>
                <li>• Input validation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                Gas 최적화
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Storage 변수 최소화</li>
                <li>• 루프 사용 주의</li>
                <li>• 변수 패킹 활용</li>
                <li>• View/Pure 함수 활용</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                베스트 프랙티스
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 최신 Solidity 버전</li>
                <li>• 이벤트 로깅</li>
                <li>• 에러 메시지 포함</li>
                <li>• 코드 문서화</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}