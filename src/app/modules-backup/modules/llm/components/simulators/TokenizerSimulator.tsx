/**
 * Tokenizer Simulator Component
 * Interactive tokenizer visualization for understanding how text is tokenized
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Hash, Type, Sparkles, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SimulatorProps, Token } from '../../types';

// Simple BPE-like tokenizer simulation
class SimpleTokenizer {
  private vocabulary: Map<string, number>;
  private reverseVocab: Map<number, string>;
  private nextId: number;

  constructor() {
    this.vocabulary = new Map();
    this.reverseVocab = new Map();
    this.nextId = 1;
    
    // Initialize with common Korean characters and subwords
    this.initializeVocabulary();
  }

  private initializeVocabulary() {
    // Special tokens
    this.addToken('[PAD]', 'special');
    this.addToken('[UNK]', 'special');
    this.addToken('[CLS]', 'special');
    this.addToken('[SEP]', 'special');
    this.addToken('[MASK]', 'special');

    // Common Korean syllables
    const commonSyllables = ['이', '가', '을', '를', '의', '에', '는', '은', '다', '고', '하', '나', '서', '로', '지', '리', '기', '시', '어', '자'];
    commonSyllables.forEach(syllable => this.addToken(syllable, 'subword'));

    // Common English words/subwords
    const commonEnglish = ['the', 'is', 'at', 'which', 'on', 'ing', 'ed', 'ion', 'er', 'est', 'ly', 'ity'];
    commonEnglish.forEach(word => this.addToken(word, 'subword'));

    // Single characters
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!? '.split('');
    chars.forEach(char => this.addToken(char, 'subword'));
  }

  private addToken(text: string, type: 'word' | 'subword' | 'special'): void {
    if (!this.vocabulary.has(text)) {
      this.vocabulary.set(text, this.nextId);
      this.reverseVocab.set(this.nextId, text);
      this.nextId++;
    }
  }

  tokenize(text: string): Token[] {
    const tokens: Token[] = [];
    let remaining = text;
    let position = 0;

    while (remaining.length > 0) {
      let found = false;
      
      // Try to find the longest matching token
      for (let length = Math.min(remaining.length, 10); length > 0; length--) {
        const substr = remaining.substring(0, length);
        
        if (this.vocabulary.has(substr)) {
          const tokenId = this.vocabulary.get(substr)!;
          tokens.push({
            id: tokenId,
            text: substr,
            type: this.getTokenType(substr)
          });
          remaining = remaining.substring(length);
          position += length;
          found = true;
          break;
        }
      }

      // If no match found, use unknown token
      if (!found) {
        const char = remaining[0];
        tokens.push({
          id: this.vocabulary.get('[UNK]')!,
          text: char,
          type: 'subword'
        });
        remaining = remaining.substring(1);
        position += 1;
      }
    }

    return tokens;
  }

  private getTokenType(text: string): 'word' | 'subword' | 'special' {
    if (text.startsWith('[') && text.endsWith(']')) {
      return 'special';
    }
    return text.length > 3 ? 'word' : 'subword';
  }

  getVocabularySize(): number {
    return this.vocabulary.size;
  }
}

export function TokenizerSimulator({ className, onComplete }: SimulatorProps) {
  const [inputText, setInputText] = useState('안녕하세요, LLM을 배워봅시다!');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [showIds, setShowIds] = useState(false);
  const [tokenizer] = useState(() => new SimpleTokenizer());
  const [stats, setStats] = useState({
    charCount: 0,
    tokenCount: 0,
    compressionRatio: 0
  });

  useEffect(() => {
    if (inputText) {
      const tokenized = tokenizer.tokenize(inputText);
      setTokens(tokenized);
      
      const charCount = inputText.length;
      const tokenCount = tokenized.length;
      const compressionRatio = charCount > 0 ? (tokenCount / charCount) : 0;
      
      setStats({
        charCount,
        tokenCount,
        compressionRatio: Math.round(compressionRatio * 100) / 100
      });
    } else {
      setTokens([]);
      setStats({ charCount: 0, tokenCount: 0, compressionRatio: 0 });
    }
  }, [inputText, tokenizer]);

  const getTokenColor = (type: Token['type']) => {
    switch (type) {
      case 'special':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'word':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700';
      case 'subword':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700';
    }
  };

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700", className)}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Hash className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          토크나이저 시뮬레이터
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          텍스트가 어떻게 토큰으로 분해되는지 실시간으로 확인해보세요
        </p>
      </div>

      {/* Input Section */}
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            입력 텍스트
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="텍스트를 입력하세요..."
            className="w-full h-24 px-4 py-3 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Type className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">문자 수</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.charCount}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Hash className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">토큰 수</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.tokenCount}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">압축률</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.compressionRatio}
            </p>
          </div>
        </div>

        {/* Token Display Options */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showIds}
              onChange={(e) => setShowIds(e.target.checked)}
              className="text-purple-600 focus:ring-purple-500 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">토큰 ID 표시</span>
          </label>
        </div>

        {/* Tokenized Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              토큰화 결과
            </label>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-100 dark:bg-purple-900 border border-purple-300 dark:border-purple-700 rounded"></div>
                특수 토큰
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded"></div>
                단어
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded"></div>
                서브워드
              </span>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg min-h-[100px]">
            {tokens.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tokens.map((token, index) => (
                  <div
                    key={index}
                    className={cn(
                      "px-3 py-1.5 rounded-md border text-sm font-mono",
                      getTokenColor(token.type)
                    )}
                  >
                    <span>{token.text}</span>
                    {showIds && (
                      <span className="ml-1 opacity-60">#{token.id}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 text-center">
                텍스트를 입력하면 토큰화 결과가 여기에 표시됩니다
              </p>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">토크나이저란?</p>
              <p>
                토크나이저는 텍스트를 모델이 이해할 수 있는 작은 단위(토큰)로 분해합니다. 
                각 토큰은 고유한 ID를 가지며, 이 ID들이 모델의 입력이 됩니다. 
                효율적인 토크나이제이션은 모델 성능과 처리 속도에 큰 영향을 미칩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Vocabulary Info */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          현재 어휘 크기: {tokenizer.getVocabularySize()}개 토큰
        </div>
      </div>
    </div>
  );
}