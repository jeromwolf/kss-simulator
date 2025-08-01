'use client'

import { useState, useEffect } from 'react'

interface TokenizerDemoProps {
  initialText?: string
}

export default function TokenizerDemo({ initialText = '안녕하세요! LLM을 배우고 있습니다.' }: TokenizerDemoProps) {
  const [text, setText] = useState(initialText)
  const [tokenizer, setTokenizer] = useState('gpt')
  const [tokens, setTokens] = useState<string[]>([])
  const [tokenCount, setTokenCount] = useState(0)

  // 간단한 토크나이저 시뮬레이션 (실제로는 각 모델의 실제 토크나이저를 사용해야 함)
  const tokenizeText = (text: string, tokenizerType: string) => {
    let tokenized: string[] = []
    
    switch (tokenizerType) {
      case 'gpt':
        // GPT 스타일: BPE (Byte Pair Encoding) 시뮬레이션
        // 한글은 보통 글자 단위로, 영어는 서브워드 단위로
        tokenized = text.match(/[\u3131-\uD79D]|[a-zA-Z]+|[0-9]+|[^\s\w가-힣]/g) || []
        break
      
      case 'claude':
        // Claude 스타일: 조금 더 세밀한 분할
        tokenized = text.match(/[\u3131-\uD79D]|[a-zA-Z]+\'?[a-zA-Z]*|[0-9]+|[^\s\w가-힣]/g) || []
        break
      
      case 'bert':
        // BERT 스타일: WordPiece 시뮬레이션
        tokenized = text.split(/\s+/).flatMap(word => {
          if (/^[가-힣]+$/.test(word)) {
            // 한글은 음절 단위로
            return word.split('')
          } else if (/^[a-zA-Z]+$/.test(word)) {
            // 영어는 서브워드로 (간단히 시뮬레이션)
            if (word.length > 5) {
              return [word.slice(0, 3) + '##', '##' + word.slice(3)]
            }
            return [word]
          }
          return [word]
        }).filter(Boolean)
        break
      
      default:
        tokenized = text.split(/\s+/)
    }
    
    return tokenized
  }

  useEffect(() => {
    const newTokens = tokenizeText(text, tokenizer)
    setTokens(newTokens)
    setTokenCount(newTokens.length)
  }, [text, tokenizer])

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              토크나이저 선택
            </label>
            <select 
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={tokenizer}
              onChange={(e) => setTokenizer(e.target.value)}
            >
              <option value="gpt">GPT-3/4 Tokenizer</option>
              <option value="claude">Claude Tokenizer</option>
              <option value="bert">BERT Tokenizer</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">토큰 수</div>
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{tokenCount}</div>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            입력 텍스트
          </label>
          <textarea 
            className="w-full h-24 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            placeholder="여기에 텍스트를 입력하세요..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>

      {/* Token Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">토큰화 결과</h4>
        <div className="min-h-[80px] p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex flex-wrap gap-1">
            {tokens.map((token, index) => (
              <span 
                key={index} 
                className="inline-block px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded border border-indigo-200 dark:border-indigo-700"
              >
                {token}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Information */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
          💡 토크나이저별 특징
        </h4>
        <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <div><strong>GPT:</strong> BPE(Byte Pair Encoding) 방식, 한글은 주로 글자 단위로 분할</div>
          <div><strong>Claude:</strong> 개선된 BPE, 문맥을 고려한 더 효율적인 토큰화</div>
          <div><strong>BERT:</strong> WordPiece 방식, 서브워드 단위로 분할 (## 프리픽스 사용)</div>
        </div>
      </div>
    </div>
  )
}