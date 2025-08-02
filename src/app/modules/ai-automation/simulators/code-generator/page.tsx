'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Code2, Copy, Download, Play, Settings, Sparkles, FileCode, Check } from 'lucide-react'

interface GeneratedCode {
  language: string
  code: string
  explanation: string
  dependencies?: string[]
  commands?: string[]
}

const codeTemplates = {
  'react-component': {
    name: 'React 컴포넌트',
    prompt: '버튼을 클릭하면 카운터가 증가하는 React 컴포넌트',
    language: 'typescript'
  },
  'api-endpoint': {
    name: 'REST API',
    prompt: 'Express.js로 CRUD API 엔드포인트 생성',
    language: 'javascript'
  },
  'python-script': {
    name: 'Python 스크립트',
    prompt: 'CSV 파일을 읽어서 데이터 분석하는 Python 스크립트',
    language: 'python'
  },
  'sql-query': {
    name: 'SQL 쿼리',
    prompt: '월별 매출 통계를 계산하는 SQL 쿼리',
    language: 'sql'
  },
  'docker-compose': {
    name: 'Docker Compose',
    prompt: 'Node.js 앱과 PostgreSQL을 위한 docker-compose.yml',
    language: 'yaml'
  }
}

export default function CodeGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [framework, setFramework] = useState('none')
  const [style, setStyle] = useState('clean')
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('')

  const generateCode = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setTimeout(() => {
      const code = generateCodeByPrompt(prompt, language, framework, style)
      setGeneratedCode(code)
      setIsGenerating(false)
    }, 2000)
  }

  const generateCodeByPrompt = (
    prompt: string,
    lang: string,
    fw: string,
    style: string
  ): GeneratedCode => {
    // Simulate different code generation based on parameters
    const codeExamples: Record<string, GeneratedCode> = {
      javascript: {
        language: 'javascript',
        code: `// ${prompt}
${fw !== 'none' ? `// Framework: ${fw}\n` : ''}
class DataProcessor {
  constructor(options = {}) {
    this.config = {
      batchSize: options.batchSize || 100,
      timeout: options.timeout || 5000,
      retries: options.retries || 3
    };
    this.queue = [];
    this.processing = false;
  }

  async process(data) {
    // Validate input data
    if (!Array.isArray(data)) {
      throw new TypeError('Data must be an array');
    }

    // Add to processing queue
    this.queue.push(...data);
    
    if (!this.processing) {
      await this.processQueue();
    }
  }

  async processQueue() {
    this.processing = true;
    
    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, this.config.batchSize);
      
      try {
        const results = await this.processBatch(batch);
        console.log(\`Processed \${results.length} items successfully\`);
      } catch (error) {
        console.error('Batch processing failed:', error);
        await this.handleError(batch, error);
      }
    }
    
    this.processing = false;
  }

  async processBatch(batch) {
    // Simulate async processing
    return Promise.all(
      batch.map(async (item) => {
        await this.delay(Math.random() * 100);
        return this.transform(item);
      })
    );
  }

  transform(item) {
    // Apply transformation logic
    return {
      ...item,
      processed: true,
      timestamp: Date.now()
    };
  }

  async handleError(batch, error) {
    console.log(\`Retrying \${batch.length} items...\`);
    // Implement retry logic
    for (let i = 0; i < this.config.retries; i++) {
      try {
        await this.delay(1000 * Math.pow(2, i)); // Exponential backoff
        return await this.processBatch(batch);
      } catch (retryError) {
        if (i === this.config.retries - 1) {
          throw retryError;
        }
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage example
const processor = new DataProcessor({
  batchSize: 50,
  timeout: 3000
});

// Process your data
const sampleData = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  value: Math.random() * 100
}));

processor.process(sampleData)
  .then(() => console.log('All data processed'))
  .catch(error => console.error('Processing failed:', error));`,
        explanation: '비동기 데이터 처리를 위한 클래스입니다. 배치 처리, 에러 핸들링, 재시도 로직이 포함되어 있습니다.',
        dependencies: [],
        commands: ['node processor.js']
      },
      typescript: {
        language: 'typescript',
        code: `// ${prompt}
${fw !== 'none' ? `// Framework: ${fw}\n` : ''}
interface Config {
  apiKey: string;
  baseUrl: string;
  timeout?: number;
  maxRetries?: number;
}

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

class APIClient {
  private config: Required<Config>;
  private rateLimiter: RateLimiter;

  constructor(config: Config) {
    this.config = {
      apiKey: config.apiKey,
      baseUrl: config.baseUrl.replace(/\\/$/, ''),
      timeout: config.timeout ?? 10000,
      maxRetries: config.maxRetries ?? 3
    };
    this.rateLimiter = new RateLimiter(10, 1000); // 10 requests per second
  }

  async request<T>(endpoint: string, options: RequestOptions): Promise<T> {
    await this.rateLimiter.acquire();
    
    const url = this.buildUrl(endpoint, options.params);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${this.config.apiKey}\`,
      ...options.headers
    };

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          method: options.method,
          headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new APIError(response.status, await response.text());
        }

        return await response.json() as T;
      } catch (error) {
        if (attempt === this.config.maxRetries) {
          throw error;
        }
        await this.delay(Math.pow(2, attempt) * 1000);
      }
    }

    throw new Error('Max retries exceeded');
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(\`\${this.config.baseUrl}\${endpoint}\`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Convenience methods
  get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

class RateLimiter {
  private queue: (() => void)[] = [];
  private running = 0;

  constructor(
    private maxConcurrent: number,
    private minTime: number
  ) {}

  async acquire(): Promise<void> {
    if (this.running < this.maxConcurrent) {
      this.running++;
      return;
    }

    return new Promise(resolve => {
      this.queue.push(resolve);
    });
  }

  release(): void {
    this.running--;
    setTimeout(() => {
      const next = this.queue.shift();
      if (next) {
        this.running++;
        next();
      }
    }, this.minTime);
  }
}

class APIError extends Error {
  constructor(
    public statusCode: number,
    public response: string
  ) {
    super(\`API Error: \${statusCode} - \${response}\`);
    this.name = 'APIError';
  }
}

// Usage
const client = new APIClient({
  apiKey: process.env.API_KEY!,
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  maxRetries: 3
});

// Example API calls
async function main() {
  try {
    const users = await client.get<User[]>('/users');
    const newUser = await client.post<User>('/users', {
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('Success:', { users, newUser });
  } catch (error) {
    console.error('API call failed:', error);
  }
}

interface User {
  id: number;
  name: string;
  email: string;
}`,
        explanation: 'TypeScript로 작성된 강력한 API 클라이언트입니다. 타입 안정성, Rate Limiting, 재시도 로직, 타임아웃 처리가 포함되어 있습니다.',
        dependencies: ['typescript', '@types/node'],
        commands: ['npm install', 'tsc', 'node dist/client.js']
      },
      python: {
        language: 'python',
        code: `# ${prompt}
${fw !== 'none' ? `# Framework: ${fw}\n` : ''}
import asyncio
import aiohttp
import pandas as pd
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class DataPoint:
    """Represents a single data point in our analysis"""
    timestamp: datetime
    value: float
    category: str
    metadata: Dict[str, Any]

class DataAnalyzer:
    """Advanced data analysis and processing class"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.session: Optional[aiohttp.ClientSession] = None
        self.cache: Dict[str, Any] = {}
        
    async def __aenter__(self):
        """Async context manager entry"""
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        if self.session:
            await self.session.close()
    
    async def fetch_data(self, url: str) -> List[DataPoint]:
        """Fetch data from API endpoint"""
        if not self.session:
            raise RuntimeError("Session not initialized")
            
        try:
            async with self.session.get(url) as response:
                response.raise_for_status()
                raw_data = await response.json()
                
                return [
                    DataPoint(
                        timestamp=datetime.fromisoformat(item['timestamp']),
                        value=float(item['value']),
                        category=item.get('category', 'unknown'),
                        metadata=item.get('metadata', {})
                    )
                    for item in raw_data
                ]
        except Exception as e:
            logger.error(f"Failed to fetch data: {e}")
            raise
    
    def analyze(self, data: List[DataPoint]) -> pd.DataFrame:
        """Perform statistical analysis on data points"""
        if not data:
            return pd.DataFrame()
        
        # Convert to DataFrame for analysis
        df = pd.DataFrame([
            {
                'timestamp': dp.timestamp,
                'value': dp.value,
                'category': dp.category,
                **dp.metadata
            }
            for dp in data
        ])
        
        # Perform various analyses
        df['rolling_mean'] = df['value'].rolling(window=5, min_periods=1).mean()
        df['rolling_std'] = df['value'].rolling(window=5, min_periods=1).std()
        df['z_score'] = (df['value'] - df['value'].mean()) / df['value'].std()
        
        # Detect anomalies (values beyond 2 standard deviations)
        df['is_anomaly'] = df['z_score'].abs() > 2
        
        # Calculate category statistics
        category_stats = df.groupby('category').agg({
            'value': ['mean', 'std', 'min', 'max', 'count']
        })
        
        logger.info(f"Analysis complete. Found {df['is_anomaly'].sum()} anomalies")
        logger.info(f"Category statistics:\\n{category_stats}")
        
        return df
    
    def generate_report(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Generate comprehensive analysis report"""
        if df.empty:
            return {"error": "No data to analyze"}
        
        report = {
            "summary": {
                "total_records": len(df),
                "date_range": {
                    "start": df['timestamp'].min().isoformat(),
                    "end": df['timestamp'].max().isoformat()
                },
                "value_statistics": {
                    "mean": float(df['value'].mean()),
                    "median": float(df['value'].median()),
                    "std": float(df['value'].std()),
                    "min": float(df['value'].min()),
                    "max": float(df['value'].max())
                }
            },
            "anomalies": {
                "count": int(df['is_anomaly'].sum()),
                "percentage": float(df['is_anomaly'].mean() * 100),
                "timestamps": df[df['is_anomaly']]['timestamp'].tolist()
            },
            "categories": df['category'].value_counts().to_dict(),
            "trends": {
                "overall_trend": "increasing" if df['value'].iloc[-1] > df['value'].iloc[0] else "decreasing",
                "volatility": float(df['value'].std() / df['value'].mean())  # Coefficient of variation
            }
        }
        
        return report
    
    async def process_pipeline(self, urls: List[str]) -> List[Dict[str, Any]]:
        """Process multiple data sources in parallel"""
        tasks = [self.fetch_data(url) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        reports = []
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                logger.error(f"Failed to process URL {urls[i]}: {result}")
                reports.append({"error": str(result), "url": urls[i]})
            else:
                df = self.analyze(result)
                report = self.generate_report(df)
                report['source_url'] = urls[i]
                reports.append(report)
        
        return reports

# Example usage
async def main():
    config = {
        "timeout": 30,
        "max_retries": 3,
        "cache_ttl": 3600
    }
    
    urls = [
        "https://api.example.com/data/source1",
        "https://api.example.com/data/source2",
        "https://api.example.com/data/source3"
    ]
    
    async with DataAnalyzer(config) as analyzer:
        reports = await analyzer.process_pipeline(urls)
        
        for report in reports:
            if 'error' not in report:
                print(f"\\nReport for {report['source_url']}:")
                print(f"Total records: {report['summary']['total_records']}")
                print(f"Anomalies found: {report['anomalies']['count']} ({report['anomalies']['percentage']:.2f}%)")
                print(f"Overall trend: {report['trends']['overall_trend']}")
            else:
                print(f"\\nError processing {report['url']}: {report['error']}")

if __name__ == "__main__":
    asyncio.run(main())`,
        explanation: 'Python 비동기 데이터 분석 파이프라인입니다. pandas를 사용한 통계 분석, 이상치 탐지, 병렬 처리가 구현되어 있습니다.',
        dependencies: ['aiohttp', 'pandas', 'numpy'],
        commands: ['pip install -r requirements.txt', 'python analyzer.py']
      }
    }

    return codeExamples[lang] || codeExamples.javascript
  }

  const copyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadCode = () => {
    if (generatedCode) {
      const extension = {
        javascript: 'js',
        typescript: 'ts',
        python: 'py',
        sql: 'sql',
        yaml: 'yml'
      }[generatedCode.language] || 'txt'

      const blob = new Blob([generatedCode.code], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `generated.${extension}`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const loadTemplate = (templateKey: string) => {
    const template = codeTemplates[templateKey as keyof typeof codeTemplates]
    if (template) {
      setPrompt(template.prompt)
      setLanguage(template.language)
      setSelectedTemplate(templateKey)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/modules/ai-automation"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          AI 자동화 도구로 돌아가기
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI 코드 생성기
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                자연어로 설명하면 즉시 코드를 생성합니다
              </p>
            </div>
          </div>

          {/* Templates */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              빠른 템플릿
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(codeTemplates).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => loadTemplate(key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedTemplate === key
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900/30'
                  }`}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                프로그래밍 언어
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="sql">SQL</option>
                <option value="yaml">YAML</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                프레임워크
              </label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="none">없음</option>
                <option value="react">React</option>
                <option value="vue">Vue.js</option>
                <option value="angular">Angular</option>
                <option value="express">Express.js</option>
                <option value="django">Django</option>
                <option value="flask">Flask</option>
                <option value="spring">Spring Boot</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                코드 스타일
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="clean">클린 코드</option>
                <option value="detailed">상세 주석</option>
                <option value="minimal">최소한</option>
                <option value="enterprise">엔터프라이즈</option>
              </select>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              코드 설명
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="예: 사용자 인증을 처리하는 API 엔드포인트를 만들어줘..."
              className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCode}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 animate-pulse" />
                코드 생성 중...
              </>
            ) : (
              <>
                <Code2 className="w-5 h-5" />
                코드 생성
              </>
            )}
          </button>
        </div>

        {/* Generated Code */}
        {generatedCode && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileCode className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  생성된 코드
                </h2>
                <span className="px-2 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 text-xs rounded-full">
                  {generatedCode.language}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyCode}
                  className="p-2 text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
                <button
                  onClick={downloadCode}
                  className="p-2 text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Code Display */}
            <div className="mb-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                  <code>{generatedCode.code}</code>
                </pre>
              </div>
            </div>

            {/* Explanation */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                코드 설명
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {generatedCode.explanation}
              </p>
            </div>

            {/* Dependencies & Commands */}
            <div className="grid md:grid-cols-2 gap-6">
              {generatedCode.dependencies && generatedCode.dependencies.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    필요한 패키지
                  </h3>
                  <div className="space-y-1">
                    {generatedCode.dependencies.map((dep, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-violet-500">•</span>
                        <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                          {dep}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {generatedCode.commands && generatedCode.commands.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    실행 명령어
                  </h3>
                  <div className="space-y-1">
                    {generatedCode.commands.map((cmd, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-violet-500" />
                        <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                          {cmd}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            💡 효과적인 코드 생성 팁
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                명확한 요구사항
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 구체적인 기능 설명</li>
                <li>• 입력과 출력 명시</li>
                <li>• 에러 처리 요구사항</li>
                <li>• 성능 고려사항</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                코드 품질
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 클린 코드 원칙 적용</li>
                <li>• 적절한 주석 포함</li>
                <li>• 테스트 가능한 구조</li>
                <li>• 확장 가능한 설계</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}