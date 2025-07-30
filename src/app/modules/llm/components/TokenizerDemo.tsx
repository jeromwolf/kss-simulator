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
    <div className="demo-container">
      <div className="demo-controls">
        <select 
          className="tokenizer-select" 
          value={tokenizer}
          onChange={(e) => setTokenizer(e.target.value)}
        >
          <option value="gpt">GPT-3/4 Tokenizer</option>
          <option value="claude">Claude Tokenizer</option>
          <option value="bert">BERT Tokenizer</option>
        </select>
        <textarea 
          className="demo-input" 
          placeholder="여기에 텍스트를 입력하세요..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="demo-output">
        <div className="token-count">토큰 수: <span className="font-bold">{tokenCount}</span></div>
        <div className="tokenized-result">
          {tokens.map((token, index) => (
            <span key={index} className="token">
              {token}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 토크나이저별 특징</h4>
        <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <li><strong>GPT:</strong> BPE(Byte Pair Encoding) 방식, 한글은 주로 글자 단위로 분할</li>
          <li><strong>Claude:</strong> 개선된 BPE, 문맥을 고려한 더 효율적인 토큰화</li>
          <li><strong>BERT:</strong> WordPiece 방식, 서브워드 단위로 분할 (## 프리픽스 사용)</li>
        </ul>
      </div>
    </div>
  )
}