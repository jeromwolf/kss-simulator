'use client';

import { useState, useEffect } from 'react';
import styles from './Simulators.module.css';

interface Token {
  text: string;
  id: number;
  type: 'word' | 'subword' | 'char' | 'special';
  color: string;
}

const EnhancedTokenizer = () => {
  const [inputText, setInputText] = useState('안녕하세요! LLM이 텍스트를 어떻게 이해하는지 알아봅시다.');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [tokenizationType, setTokenizationType] = useState<'char' | 'word' | 'subword'>('subword');
  const [showIds, setShowIds] = useState(true);
  const [animating, setAnimating] = useState(false);

  const colorPalette = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#F9844A', '#9B5DE5',
    '#00F5FF', '#00BBF9', '#FEE77A', '#F15BB5', '#9BDE7E'
  ];

  const tokenize = () => {
    setAnimating(true);
    const newTokens: Token[] = [];
    let tokenId = 1;

    if (tokenizationType === 'char') {
      // Character-level tokenization
      inputText.split('').forEach((char, index) => {
        if (char !== ' ') {
          newTokens.push({
            text: char,
            id: tokenId++,
            type: 'char',
            color: colorPalette[index % colorPalette.length]
          });
        }
      });
    } else if (tokenizationType === 'word') {
      // Word-level tokenization
      const words = inputText.match(/[\w가-힣]+|[^\w가-힣\s]+|\s+/g) || [];
      words.forEach((word, index) => {
        if (word.trim()) {
          newTokens.push({
            text: word,
            id: tokenId++,
            type: 'word',
            color: colorPalette[index % colorPalette.length]
          });
        }
      });
    } else {
      // Subword tokenization (BPE-style simulation)
      const words = inputText.match(/[\w가-힣]+|[^\w가-힣\s]+|\s+/g) || [];
      words.forEach((word, wordIndex) => {
        if (word.trim()) {
          // Simulate subword breaking
          if (word.length > 3 && Math.random() > 0.3) {
            const breakPoint = Math.floor(word.length / 2);
            newTokens.push({
              text: word.slice(0, breakPoint),
              id: tokenId++,
              type: 'subword',
              color: colorPalette[tokenId % colorPalette.length]
            });
            newTokens.push({
              text: word.slice(breakPoint),
              id: tokenId++,
              type: 'subword',
              color: colorPalette[tokenId % colorPalette.length]
            });
          } else {
            newTokens.push({
              text: word,
              id: tokenId++,
              type: 'subword',
              color: colorPalette[wordIndex % colorPalette.length]
            });
          }
        }
      });
    }

    // Add special tokens
    newTokens.unshift({
      text: '[CLS]',
      id: 0,
      type: 'special',
      color: '#6B7280'
    });
    newTokens.push({
      text: '[SEP]',
      id: tokenId,
      type: 'special',
      color: '#6B7280'
    });

    setTokens(newTokens);
    setTimeout(() => setAnimating(false), 300);
  };

  useEffect(() => {
    tokenize();
  }, [tokenizationType]);

  const exampleTexts = [
    '안녕하세요! LLM이 텍스트를 어떻게 이해하는지 알아봅시다.',
    'The quick brown fox jumps over the lazy dog.',
    'ChatGPT는 OpenAI가 개발한 대화형 AI 모델입니다.',
    '기계학습(Machine Learning)은 인공지능의 한 분야입니다.',
    '🚀 이모지와 특수문자도 토큰화됩니다! 💡'
  ];

  return (
    <div className={styles.simulator}>
      <div className={styles.header}>
        <h3>🔤 향상된 토크나이저 시뮬레이터</h3>
        <p>텍스트가 어떻게 토큰으로 분해되는지 실시간으로 확인해보세요</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.inputSection}>
          <label>입력 텍스트:</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="토큰화할 텍스트를 입력하세요..."
            rows={3}
          />
          <div className={styles.exampleButtons}>
            {exampleTexts.map((text, index) => (
              <button
                key={index}
                className={styles.exampleBtn}
                onClick={() => setInputText(text)}
              >
                예제 {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.optionsRow}>
          <div className={styles.tokenizationTypes}>
            <label>토큰화 방식:</label>
            <button
              className={tokenizationType === 'char' ? styles.active : ''}
              onClick={() => setTokenizationType('char')}
            >
              문자 단위
            </button>
            <button
              className={tokenizationType === 'word' ? styles.active : ''}
              onClick={() => setTokenizationType('word')}
            >
              단어 단위
            </button>
            <button
              className={tokenizationType === 'subword' ? styles.active : ''}
              onClick={() => setTokenizationType('subword')}
            >
              서브워드 (BPE)
            </button>
          </div>

          <div className={styles.toggles}>
            <label>
              <input
                type="checkbox"
                checked={showIds}
                onChange={(e) => setShowIds(e.target.checked)}
              />
              토큰 ID 표시
            </label>
          </div>
        </div>

        <button className={styles.tokenizeBtn} onClick={tokenize}>
          토큰화 실행
        </button>
      </div>

      <div className={styles.results}>
        <div className={styles.tokenStats}>
          <span>총 토큰 수: <strong>{tokens.length}</strong></span>
          <span>특수 토큰: <strong>{tokens.filter(t => t.type === 'special').length}</strong></span>
          <span>일반 토큰: <strong>{tokens.filter(t => t.type !== 'special').length}</strong></span>
        </div>

        <div className={`${styles.tokenDisplay} ${animating ? styles.animating : ''}`}>
          {tokens.map((token, index) => (
            <div
              key={index}
              className={`${styles.token} ${styles[token.type]}`}
              style={{
                backgroundColor: token.type === 'special' ? '#e0e0e0' : token.color + '20',
                borderColor: token.type === 'special' ? '#999' : token.color,
                animationDelay: `${index * 50}ms`
              }}
            >
              <span className={styles.tokenText}>{token.text}</span>
              {showIds && <span className={styles.tokenId}>{token.id}</span>}
            </div>
          ))}
        </div>

        <div className={styles.explanation}>
          <h4>토큰화 방식 설명</h4>
          <div className={styles.methodExplanation}>
            {tokenizationType === 'char' && (
              <p>
                <strong>문자 단위 토큰화:</strong> 각 문자를 하나의 토큰으로 처리합니다. 
                간단하지만 시퀀스가 길어지고 의미 파악이 어려울 수 있습니다.
              </p>
            )}
            {tokenizationType === 'word' && (
              <p>
                <strong>단어 단위 토큰화:</strong> 공백과 구두점을 기준으로 단어를 분리합니다. 
                직관적이지만 어휘 크기가 커지고 OOV(Out of Vocabulary) 문제가 발생할 수 있습니다.
              </p>
            )}
            {tokenizationType === 'subword' && (
              <p>
                <strong>서브워드 토큰화 (BPE):</strong> 빈도 기반으로 단어를 더 작은 단위로 분해합니다. 
                GPT와 BERT 같은 모델이 사용하는 방식으로, OOV 문제를 해결하면서도 효율적입니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTokenizer;