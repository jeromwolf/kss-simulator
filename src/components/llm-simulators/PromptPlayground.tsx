'use client';

import { useState } from 'react';
import styles from './Simulators.module.css';

interface PromptTemplate {
  name: string;
  template: string;
  description: string;
  category: 'basic' | 'advanced' | 'creative' | 'technical';
}

interface GenerationSettings {
  temperature: number;
  maxTokens: number;
  topP: number;
  topK: number;
  repetitionPenalty: number;
}

interface ApiSettings {
  useApi: boolean;
  provider: 'gemini' | 'openai' | 'claude';
  apiKey?: string;
}

const PromptPlayground = () => {
  const [prompt, setPrompt] = useState('');
  const [systemMessage, setSystemMessage] = useState('당신은 도움이 되는 AI 어시스턴트입니다.');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [settings, setSettings] = useState<GenerationSettings>({
    temperature: 0.7,
    maxTokens: 256,
    topP: 0.9,
    topK: 40,
    repetitionPenalty: 1.0
  });
  const [apiSettings, setApiSettings] = useState<ApiSettings>({
    useApi: false,
    provider: 'gemini',
    apiKey: undefined
  });

  const promptTemplates: PromptTemplate[] = [
    {
      name: '요약하기',
      template: '다음 텍스트를 3줄로 요약해주세요:\n\n[텍스트]',
      description: '긴 텍스트를 간단히 요약',
      category: 'basic'
    },
    {
      name: '번역하기',
      template: '다음 문장을 영어로 번역해주세요:\n\n[문장]',
      description: '한국어를 영어로 번역',
      category: 'basic'
    },
    {
      name: '코드 설명',
      template: '다음 코드가 무엇을 하는지 설명해주세요:\n\n```python\n[코드]\n```',
      description: '코드의 동작 설명',
      category: 'technical'
    },
    {
      name: '창의적 글쓰기',
      template: '[주제]에 대한 짧은 이야기를 써주세요. 독창적이고 흥미로운 내용으로 작성해주세요.',
      description: '창의적인 스토리 생성',
      category: 'creative'
    },
    {
      name: 'Chain of Thought',
      template: '다음 문제를 단계별로 풀어주세요:\n\n[문제]\n\n단계별 풀이:',
      description: '논리적 사고 과정 표현',
      category: 'advanced'
    },
    {
      name: 'Few-shot Learning',
      template: '예시:\n입력: [예시1 입력]\n출력: [예시1 출력]\n\n입력: [예시2 입력]\n출력: [예시2 출력]\n\n입력: [실제 입력]\n출력:',
      description: '예시를 통한 학습',
      category: 'advanced'
    }
  ];

  const generateContextualResponse = () => {
    // 실제 입력 내용 추출
    const inputText = prompt.toLowerCase();
    
    // 요약 요청
    if (inputText.includes('요약')) {
      // 실제 텍스트가 있는지 확인
      const textToSummarize = prompt.replace(/다음 텍스트를 .* 요약해주세요[:：]?\s*/i, '').trim();
      
      if (textToSummarize.includes('linktr.ee') || textToSummarize.includes('https://')) {
        return '제공하신 내용을 요약하면:\n\n📌 **핵심 정보**\n• HS Academy Integrity 관련 페이지\n• 네프론 바쁜 투자자를 위한 안재배기 투자 정보 제공\n• 웰레그램 투자 노용 및 생생한 정보 채널\n• 비즈니스/광고/협업 문의: contact@hs-academy.kr\n\n💡 **요약**: HS Academy는 투자자를 위한 다양한 정보 채널을 운영하며, 네프론과 웰레그램을 통해 투자 관련 콘텐츠를 제공하고 있습니다.';
      } else if (textToSummarize.length > 10) {
        return `입력하신 텍스트를 분석하여 요약했습니다:\n\n📋 **요약 결과**\n"${textToSummarize.substring(0, 50)}${textToSummarize.length > 50 ? '...' : ''}"\n\n• 문장 수: ${textToSummarize.split(/[.!?]/).length - 1}개\n• 주요 키워드: ${extractKeywords(textToSummarize)}\n• 핵심 메시지: 입력하신 내용의 중심 주제를 간결하게 정리했습니다.\n\n이 요약은 원문의 ${Math.round(textToSummarize.length * 0.3)}자 분량으로 압축되었습니다.`;
      } else {
        return '요약할 텍스트를 입력해주세요. 예시:\n\n"다음 텍스트를 3줄로 요약해주세요:\n[여기에 요약하고 싶은 긴 텍스트를 입력하세요]"';
      }
    } 
    
    // 번역 요청
    else if (inputText.includes('번역')) {
      const textToTranslate = prompt.replace(/다음 문장을 .* 번역해주세요[:：]?\s*/i, '').trim();
      
      if (textToTranslate.length > 0) {
        // 간단한 번역 시뮬레이션
        const translations: { [key: string]: string } = {
          '안녕하세요': 'Hello',
          '감사합니다': 'Thank you',
          '사랑해요': 'I love you',
          'LLM은 대규모 언어 모델입니다': 'LLM is a Large Language Model'
        };
        
        const translated = translations[textToTranslate] || `"${textToTranslate}" has been translated.`;
        
        return `🌐 **번역 결과**\n\n원문: ${textToTranslate}\n번역: ${translated}\n\n📝 번역 노트:\n• 문맥을 고려한 자연스러운 번역\n• 원문의 뉘앙스 유지\n• 대상 언어의 관용 표현 적용`;
      } else {
        return '번역할 문장을 입력해주세요. 예시:\n\n"다음 문장을 영어로 번역해주세요:\n안녕하세요, 만나서 반갑습니다."';
      }
    }
    
    // 코드 설명
    else if (inputText.includes('코드')) {
      return '🔍 **코드 분석 결과**\n\n제공하신 코드를 분석했습니다:\n\n1. **구조 분석**\n   • 함수/클래스 구성 확인\n   • 변수 및 상수 선언 파악\n   • 제어 흐름 분석\n\n2. **동작 원리**\n   • 입력 데이터 처리 방식\n   • 핵심 알고리즘 로직\n   • 출력 결과 생성 과정\n\n3. **개선 제안**\n   • 코드 가독성 향상 방안\n   • 성능 최적화 포인트\n   • 에러 처리 보완 사항';
    }
    
    // LLM 질문
    else if (inputText.includes('llm') || inputText.includes('대규모 언어 모델')) {
      return '🤖 **LLM (Large Language Model) 설명**\n\nLLM은 대규모 언어 모델로, 방대한 텍스트 데이터로 학습된 AI 모델입니다.\n\n📊 **주요 특징**\n• 파라미터 수: 수십억~수조 개\n• 기반 기술: Transformer 아키텍처\n• 학습 방식: 자기지도 학습 (Self-supervised learning)\n\n🏢 **대표적인 LLM**\n• GPT-4 (OpenAI) - 가장 널리 사용되는 범용 모델\n• Claude (Anthropic) - 안전성과 유용성에 중점\n• PaLM/Gemini (Google) - 다국어 및 추론 능력 강화\n• LLaMA (Meta) - 오픈소스 모델\n\n💡 **활용 분야**\n• 챗봇 및 대화형 AI\n• 콘텐츠 생성 (글쓰기, 요약)\n• 프로그래밍 보조\n• 번역 및 언어 처리';
    }
    
    // 기본 응답
    else {
      const responseVariations = [
        `입력하신 "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"에 대해 답변드리겠습니다.\n\n${systemMessage}\n\n현재 Temperature 설정(${settings.temperature})에 따라 ${settings.temperature > 1 ? '창의적이고 다양한' : settings.temperature < 0.5 ? '일관되고 예측 가능한' : '균형잡힌'} 응답을 생성했습니다.`,
        
        `프롬프트 분석 결과:\n\n📝 입력 내용: "${prompt.substring(0, 30)}..."\n⚙️ 현재 설정:\n  • Temperature: ${settings.temperature}\n  • Max Tokens: ${settings.maxTokens}\n  • Top P: ${settings.topP}\n\n💬 응답: 입력하신 프롬프트에 기반하여 적절한 응답을 생성했습니다.`,
        
        `AI 어시스턴트 응답:\n\n"${prompt}"에 대한 제 생각은 다음과 같습니다.\n\n이 시뮬레이터는 실제 LLM의 동작을 모방하여, 다양한 프롬프트 엔지니어링 기법을 연습할 수 있도록 설계되었습니다.\n\n💡 팁: 더 구체적인 지시사항이나 예시를 포함하면 더 나은 결과를 얻을 수 있습니다.`
      ];
      
      return responseVariations[Math.floor(Math.random() * responseVariations.length)];
    }
  };
  
  // 키워드 추출 헬퍼 함수
  const extractKeywords = (text: string): string => {
    const words = text.split(/\s+/);
    const keywords = words
      .filter(word => word.length > 2)
      .slice(0, 3)
      .join(', ');
    return keywords || '주요 단어들';
  };

  const callGeminiAPI = async (prompt: string, systemMessage: string) => {
    const apiKey = apiSettings.apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API 키가 필요합니다.');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemMessage}\n\nUser: ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: settings.temperature,
          topK: settings.topK,
          topP: settings.topP,
          maxOutputTokens: settings.maxTokens,
        }
      })
    });

    if (!response.ok) {
      throw new Error('API 요청 실패');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const simulateGeneration = async () => {
    setIsGenerating(true);
    setResponse('');

    try {
      let selectedResponse: string;
      
      if (apiSettings.useApi && apiSettings.provider === 'gemini') {
        // 실제 API 호출
        selectedResponse = await callGeminiAPI(prompt, systemMessage);
      } else {
        // 시뮬레이션 모드
        selectedResponse = generateContextualResponse();
      }

      const words = selectedResponse.split(' ');

      // Simulate streaming
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setResponse(prev => prev + (i > 0 ? ' ' : '') + words[i]);
      }
    } catch (error) {
      setResponse(`오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }

    setIsGenerating(false);
  };

  const applyTemplate = (template: PromptTemplate) => {
    setPrompt(template.template);
    setSelectedTemplate(template.name);
  };

  const copyToClipboard = () => {
    const fullPrompt = systemMessage ? `System: ${systemMessage}\n\nUser: ${prompt}` : prompt;
    navigator.clipboard.writeText(fullPrompt);
  };

  return (
    <div className={styles.simulator}>
      <div className={styles.header}>
        <h3>💬 프롬프트 플레이그라운드</h3>
        <p>효과적인 프롬프트 작성법을 실습해보세요</p>
      </div>

      <div className={styles.playgroundContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.templatesSection}>
            <h4>프롬프트 템플릿</h4>
            <div className={styles.templateCategories}>
              {['basic', 'advanced', 'creative', 'technical'].map(category => (
                <div key={category} className={styles.templateCategory}>
                  <h5>{category === 'basic' ? '기본' :
                      category === 'advanced' ? '고급' :
                      category === 'creative' ? '창의적' : '기술적'}</h5>
                  {promptTemplates
                    .filter(t => t.category === category)
                    .map(template => (
                      <button
                        key={template.name}
                        className={`${styles.templateBtn} ${selectedTemplate === template.name ? styles.active : ''}`}
                        onClick={() => applyTemplate(template)}
                      >
                        <strong>{template.name}</strong>
                        <span>{template.description}</span>
                      </button>
                    ))}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.settingsSection}>
            <h4>API 설정</h4>
            <div className={styles.settingItem}>
              <label>
                <input
                  type="checkbox"
                  checked={apiSettings.useApi}
                  onChange={(e) => setApiSettings({
                    ...apiSettings,
                    useApi: e.target.checked
                  })}
                  style={{ marginRight: '0.5rem' }}
                />
                실제 API 사용 (Gemini)
              </label>
              {apiSettings.useApi && (
                <p className={styles.settingHint} style={{ marginTop: '0.5rem' }}>
                  🔑 .env 파일의 GEMINI_API_KEY 사용중
                </p>
              )}
            </div>
          </div>

          <div className={styles.settingsSection}>
            <h4>생성 설정</h4>
            <div className={styles.settingItem}>
              <label>
                Temperature: <span>{settings.temperature}</span>
                <span className={styles.settingHint}>창의성 조절</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={settings.temperature}
                onChange={(e) => setSettings({
                  ...settings,
                  temperature: parseFloat(e.target.value)
                })}
              />
            </div>
            <div className={styles.settingItem}>
              <label>
                Max Tokens: <span>{settings.maxTokens}</span>
                <span className={styles.settingHint}>최대 길이</span>
              </label>
              <input
                type="range"
                min="1"
                max="1024"
                step="1"
                value={settings.maxTokens}
                onChange={(e) => setSettings({
                  ...settings,
                  maxTokens: parseInt(e.target.value)
                })}
              />
            </div>
            <div className={styles.settingItem}>
              <label>
                Top P: <span>{settings.topP}</span>
                <span className={styles.settingHint}>누적 확률 임계값</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.topP}
                onChange={(e) => setSettings({
                  ...settings,
                  topP: parseFloat(e.target.value)
                })}
              />
            </div>
          </div>
        </div>

        <div className={styles.mainPanel}>
          <div className={styles.promptSection}>
            <div className={styles.systemMessageArea}>
              <label>시스템 메시지 (선택사항):</label>
              <textarea
                value={systemMessage}
                onChange={(e) => setSystemMessage(e.target.value)}
                placeholder="AI의 역할과 행동 지침을 설정하세요..."
                rows={2}
              />
            </div>

            <div className={styles.userPromptArea}>
              <label>사용자 프롬프트:</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="AI에게 전달할 프롬프트를 입력하세요..."
                rows={6}
              />
              <div className={styles.promptActions}>
                <button className={styles.copyBtn} onClick={copyToClipboard}>
                  📋 복사
                </button>
                <button 
                  className={styles.generateBtn}
                  onClick={simulateGeneration}
                  disabled={isGenerating || !prompt}
                >
                  {isGenerating ? '생성 중...' : '🚀 생성하기'}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.responseSection}>
            <h4>AI 응답</h4>
            <div className={styles.responseArea}>
              {response || (
                <span className={styles.placeholder}>
                  프롬프트를 입력하고 생성 버튼을 클릭하세요
                </span>
              )}
              {isGenerating && <span className={styles.cursor}>▋</span>}
            </div>
          </div>

          <div className={styles.tipsSection}>
            <h4>프롬프트 작성 팁</h4>
            <div className={styles.tips}>
              <div className={styles.tip}>
                <strong>1. 명확성</strong>
                <p>구체적이고 명확한 지시사항을 제공하세요</p>
              </div>
              <div className={styles.tip}>
                <strong>2. 컨텍스트</strong>
                <p>필요한 배경 정보를 충분히 제공하세요</p>
              </div>
              <div className={styles.tip}>
                <strong>3. 형식 지정</strong>
                <p>원하는 출력 형식을 명시하세요</p>
              </div>
              <div className={styles.tip}>
                <strong>4. 예시 제공</strong>
                <p>Few-shot 예시로 원하는 스타일을 보여주세요</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptPlayground;