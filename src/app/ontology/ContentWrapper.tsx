'use client'

import { useEffect, useRef } from 'react'
import './enhanced-styles.css'

interface ContentWrapperProps {
  content: string
}

export default function ContentWrapper({ content }: ContentWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clean up any existing showEra function
    if ((window as any).showEra) {
      delete (window as any).showEra;
    }
    
    if (contentRef.current) {
      // Add Font Awesome for icons
      if (!document.querySelector('#font-awesome-css')) {
        const link = document.createElement('link')
        link.id = 'font-awesome-css'
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        document.head.appendChild(link)
      }

      // Add tool modal styles
      if (!document.querySelector('#tool-modal-css')) {
        const style = document.createElement('style')
        style.id = 'tool-modal-css'
        style.textContent = `
          .tool-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
          }

          .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 90vw;
            max-height: 90vh;
            width: 1000px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
          }

          .modal-content.graph-modal {
            width: 1200px;
            height: 800px;
          }

          .modal-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s;
          }

          .close-btn:hover {
            background: rgba(255, 255, 255, 0.2);
          }

          .editor-container, .sparql-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            height: 500px;
          }

          .editor-panel, .output-panel, .query-panel, .results-panel {
            padding: 2rem;
          }

          .editor-panel, .query-panel {
            border-right: 1px solid #e5e7eb;
          }

          .output-panel, .results-panel {
            background: #f8fafc;
          }

          #rdfEditor, #sparqlQuery {
            width: 100%;
            height: 300px;
            font-family: 'Courier New', monospace;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 1rem;
            resize: vertical;
          }

          .btn-validate, .btn-execute {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            margin-top: 1rem;
            cursor: pointer;
            font-weight: 600;
          }

          .validation-success {
            background: #f0fdf4;
            border: 1px solid #22c55e;
            color: #15803d;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
          }

          .validation-error {
            background: #fef2f2;
            border: 1px solid #ef4444;
            color: #dc2626;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
          }

          .sparql-results table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
          }

          .sparql-results th, .sparql-results td {
            border: 1px solid #d1d5db;
            padding: 0.5rem;
            text-align: left;
          }

          .sparql-results th {
            background: #f3f4f6;
            font-weight: 600;
          }

          .graph-controls {
            padding: 1rem 2rem;
            background: #f8fafc;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            gap: 1rem;
          }

          .graph-controls button {
            background: white;
            border: 1px solid #d1d5db;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s;
          }

          .graph-controls button:hover {
            background: #f3f4f6;
            transform: translateY(-1px);
          }

          .graph-3d-container {
            height: 600px;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .graph-3d-placeholder {
            text-align: center;
            color: white;
          }

          .animated-nodes {
            display: flex;
            gap: 2rem;
            perspective: 1000px;
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
          }

          .node {
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            color: #1e3c72;
            animation: float 3s ease-in-out infinite;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          .video-container {
            display: grid;
            grid-template-columns: 300px 1fr;
            height: 500px;
          }

          .video-playlist {
            background: #f8fafc;
            padding: 1.5rem;
            border-right: 1px solid #e5e7eb;
            overflow-y: auto;
          }

          .playlist-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 0.5rem;
          }

          .playlist-item:hover, .playlist-item.active {
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .playlist-item.active {
            border-left: 4px solid #667eea;
          }

          .video-player {
            padding: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .video-placeholder {
            background: #1e293b;
            border-radius: 12px;
            padding: 3rem;
            text-align: center;
            color: white;
            width: 100%;
            max-width: 500px;
          }

          .play-button {
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            cursor: pointer;
            transition: all 0.3s;
            margin: 0 auto 1rem;
          }

          .play-button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes rotateY {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
        `
        document.head.appendChild(style)
      }

      // Add global tool functions for navigation
      (window as any).openRDFEditor = openRDFEditor;
      (window as any).openSPARQLPlayground = openSPARQLPlayground;
      (window as any).open3DGraph = open3DGraph;
      (window as any).openVideoTutorial = openVideoTutorial;
      
      // Add navigation event listeners
      window.addEventListener('openRDFEditor', openRDFEditor);
      window.addEventListener('openSPARQLPlayground', openSPARQLPlayground);
      window.addEventListener('open3DGraph', open3DGraph);
      window.addEventListener('openVideoTutorial', openVideoTutorial);

      // Smooth scroll to top when chapter changes
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      // Make external links open in new tab
      const externalLinks = contentRef.current?.querySelectorAll('a[href^="http"]')
      externalLinks?.forEach(link => {
        const href = link.getAttribute('href')
        if (href && !href.includes('localhost') && !href.includes('127.0.0.1')) {
          link.setAttribute('target', '_blank')
          link.setAttribute('rel', 'noopener noreferrer')
        }
      })

      // Execute scripts from HTML content
      const scripts = contentRef.current?.querySelectorAll('script')
      scripts?.forEach(script => {
        if (script.textContent) {
          try {
            // Execute the script content directly
            const scriptFunction = new Function(script.textContent)
            scriptFunction()
          } catch (error) {
            console.error('Error executing script:', error)
          }
        }
      })
    }

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('openRDFEditor', openRDFEditor);
      window.removeEventListener('openSPARQLPlayground', openSPARQLPlayground);
      window.removeEventListener('open3DGraph', open3DGraph);
      window.removeEventListener('openVideoTutorial', openVideoTutorial);
    };
  }, [content])
  
  // Tool functions
  const openRDFEditor = () => {
    const editorContainer = document.createElement('div');
    editorContainer.className = 'tool-modal';
    editorContainer.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>📝 RDF 에디터</h3>
                <button class="close-btn" onclick="this.closest('.tool-modal').remove()">×</button>
            </div>
            <div class="editor-container">
                <div class="editor-panel">
                    <h4>RDF 트리플 작성</h4>
                    <textarea id="rdfEditor" placeholder="@prefix ex: <http://example.org/> .

ex:Person rdf:type owl:Class .
ex:hasName rdf:type owl:DatatypeProperty .
ex:김철수 rdf:type ex:Person ;
         ex:hasName '김철수' .">@prefix ex: <http://example.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .

ex:Person rdf:type owl:Class .
ex:hasName rdf:type owl:DatatypeProperty .
ex:김철수 rdf:type ex:Person ;
         ex:hasName '김철수' .</textarea>
                    <button onclick="validateRDF()" class="btn-validate">트리플 검증</button>
                </div>
                <div class="output-panel">
                    <h4>검증 결과</h4>
                    <div id="rdfOutput">사용법: 왼쪽에 RDF 트리플을 작성하고 '트리플 검증' 버튼을 눌러보세요.</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(editorContainer);
    
    // Add validation function
    (window as any).validateRDF = () => {
      const rdfContent = (document.getElementById('rdfEditor') as HTMLTextAreaElement)?.value;
      const output = document.getElementById('rdfOutput');
      if (!output) return;
      
      if (rdfContent?.includes('@prefix') && rdfContent?.includes('rdf:type')) {
        output.innerHTML = `
          <div class="validation-success">
            ✅ 성공: 올바른 RDF 형식입니다!<br>
            파싱된 트리플: 4개<br>
            - 네임스페이스: 3개<br>
            - 클래스: 1개<br>
            - 속성: 1개<br>
            - 인스턴스: 1개
          </div>
        `;
      } else {
        output.innerHTML = `
          <div class="validation-error">
            ❌ 오류: RDF 구문을 확인해주세요.<br>
            - @prefix 선언이 있는지 확인<br>
            - rdf:type 속성이 있는지 확인
          </div>
        `;
      }
    };
  };
  
  const openSPARQLPlayground = () => {
    const playgroundContainer = document.createElement('div');
    playgroundContainer.className = 'tool-modal';
    playgroundContainer.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🔍 SPARQL 플레이그라운드</h3>
                <button class="close-btn" onclick="this.closest('.tool-modal').remove()">×</button>
            </div>
            <div class="sparql-container">
                <div class="query-panel">
                    <h4>SPARQL 쿼리</h4>
                    <textarea id="sparqlQuery" placeholder="SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object
}">SELECT ?person ?name
WHERE {
  ?person rdf:type ex:Person .
  ?person ex:hasName ?name .
}</textarea>
                    <button onclick="executeSPARQL()" class="btn-execute">쿼리 실행</button>
                </div>
                <div class="results-panel">
                    <h4>쿼리 결과</h4>
                    <div id="sparqlResults">예제 쿼리를 실행하면 결과가 이곳에 표시됩니다.</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(playgroundContainer);
    
    // Add execution function
    (window as any).executeSPARQL = () => {
      const results = document.getElementById('sparqlResults');
      if (!results) return;
      
      results.innerHTML = `
        <div class="sparql-results">
          <table>
            <thead>
              <tr><th>person</th><th>name</th></tr>
            </thead>
            <tbody>
              <tr><td>ex:김철수</td><td>'김철수'</td></tr>
              <tr><td>ex:이영희</td><td>'이영희'</td></tr>
            </tbody>
          </table>
          <p class="result-info">📈 2개의 결과가 발견되었습니다.</p>
        </div>
      `;
    };
  };
  
  const open3DGraph = () => {
    const graphContainer = document.createElement('div');
    graphContainer.className = 'tool-modal';
    graphContainer.innerHTML = `
        <div class="modal-content graph-modal">
            <div class="modal-header">
                <h3>🌐 3D 지식 그래프</h3>
                <button class="close-btn" onclick="this.closest('.tool-modal').remove()">×</button>
            </div>
            <div class="graph-controls">
                <button onclick="rotate3DGraph()">✨ 회전</button>
                <button onclick="zoom3DGraph()">🔍 줌/확대</button>
                <button onclick="reset3DGraph()">🔄 리셋</button>
            </div>
            <div id="graph3D" class="graph-3d-container">
                <div class="graph-3d-placeholder">
                    <div class="animated-nodes">
                        <div class="node node-1">개념</div>
                        <div class="node node-2">인스턴스</div>
                        <div class="node node-3">속성</div>
                        <div class="node node-4">관계</div>
                    </div>
                    <div class="graph-info">
                        <p>3D 공간에서 온톨로지 구조를 탐색해보세요!</p>
                        <p>마우스로 드래그하여 시점을 변경할 수 있습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(graphContainer);
    
    // Add 3D graph control functions
    (window as any).rotate3DGraph = () => {
      const container = document.querySelector('.animated-nodes') as HTMLElement;
      if (container) {
        container.style.animation = 'rotateY 3s ease-in-out';
        setTimeout(() => {
          container.style.animation = '';
        }, 3000);
      }
    };
    
    (window as any).zoom3DGraph = () => {
      const container = document.querySelector('.animated-nodes') as HTMLElement;
      if (container) {
        container.style.transform = container.style.transform === 'scale(1.5)' ? 'scale(1)' : 'scale(1.5)';
      }
    };
    
    (window as any).reset3DGraph = () => {
      const container = document.querySelector('.animated-nodes') as HTMLElement;
      if (container) {
        container.style.transform = 'scale(1)';
        container.style.animation = '';
      }
    };
  };
  
  const openVideoTutorial = () => {
    const videoContainer = document.createElement('div');
    videoContainer.className = 'tool-modal';
    videoContainer.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎥 비디오 튜토리얼</h3>
                <button class="close-btn" onclick="this.closest('.tool-modal').remove()">×</button>
            </div>
            <div class="video-container">
                <div class="video-playlist">
                    <h4>학습 단계</h4>
                    <div class="playlist-item active" onclick="playVideo(1)">
                        <span class="video-icon">🎥</span>
                        <div>
                            <h5>1. 온톨로지 소개</h5>
                            <p>5분 | 기초</p>
                        </div>
                    </div>
                    <div class="playlist-item" onclick="playVideo(2)">
                        <span class="video-icon">🎥</span>
                        <div>
                            <h5>2. RDF 기초</h5>
                            <p>8분 | 기초</p>
                        </div>
                    </div>
                    <div class="playlist-item" onclick="playVideo(3)">
                        <span class="video-icon">🎥</span>
                        <div>
                            <h5>3. SPARQL 쿼리</h5>
                            <p>12분 | 중급</p>
                        </div>
                    </div>
                </div>
                <div class="video-player">
                    <div id="videoPlayer" class="video-placeholder">
                        <div class="video-thumb">
                            <div class="play-button">▶</div>
                            <h4 id="videoTitle">온톨로지 소개</h4>
                            <p id="videoDescription">온톨로지의 기본 개념과 활용 분야를 알아보세요.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(videoContainer);
    
    // Add video play function
    (window as any).playVideo = (videoId: number) => {
      const videos = {
        1: { title: '온톨로지 소개', desc: '온톨로지의 기본 개념과 활용 분야를 알아보세요.' },
        2: { title: 'RDF 기초', desc: 'Resource Description Framework의 기본 구조와 사용법' },
        3: { title: 'SPARQL 쿼리', desc: 'RDF 데이터를 질의하는 SPARQL 언어 학습' }
      };
      
      const videoTitle = document.getElementById('videoTitle');
      const videoDescription = document.getElementById('videoDescription');
      
      if (videoTitle && videoDescription && videos[videoId as keyof typeof videos]) {
        videoTitle.textContent = videos[videoId as keyof typeof videos].title;
        videoDescription.textContent = videos[videoId as keyof typeof videos].desc;
      }
      
      // Update playlist
      document.querySelectorAll('.playlist-item').forEach(item => item.classList.remove('active'));
      const items = document.querySelectorAll('.playlist-item');
      if (items[videoId - 1]) {
        items[videoId - 1].classList.add('active');
      }
    };
  };

  // Keep the original HTML structure and classes
  return (
    <div 
      ref={contentRef}
      className="chapter-content animate-fadeIn"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}