#!/bin/bash

# KSS Standalone 서버 시작 스크립트

echo "🚀 KSS Standalone 서버를 시작합니다..."

# 현재 디렉토리 확인
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# 기존 프로세스 확인 및 종료
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️  포트 3000에서 실행 중인 프로세스를 종료합니다..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
fi

# .next 캐시 정리 (선택사항)
if [ "$1" == "--clean" ]; then
    echo "🧹 캐시를 정리합니다..."
    rm -rf .next
fi

# 서버 시작
echo "✅ 서버를 시작합니다..."
echo "📍 URL: http://localhost:3000"
echo ""
echo "주요 페이지:"
echo "  - 메인: http://localhost:3000"
echo "  - 온톨로지: http://localhost:3000/ontology"
echo "  - LLM 모듈: http://localhost:3000/modules/llm"
echo "  - 주식투자분석: http://localhost:3000/stock-analysis"
echo "  - RDF 에디터: http://localhost:3000/rdf-editor"
echo "  - SPARQL: http://localhost:3000/sparql-playground"
echo "  - 3D 그래프: http://localhost:3000/3d-graph"
echo ""
echo "종료하려면 Ctrl+C를 누르거나 stop.sh를 실행하세요."
echo "================================================"
echo ""

npm run dev