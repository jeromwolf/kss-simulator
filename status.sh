#!/bin/bash

# KSS Standalone 서버 상태 확인 스크립트

echo "📊 KSS Standalone 서버 상태 확인"
echo "================================"

# Next.js 프로세스 확인
NEXT_PIDS=$(pgrep -f "next dev")

if [ -z "$NEXT_PIDS" ]; then
    echo "❌ 서버가 실행되고 있지 않습니다."
else
    echo "✅ 서버가 실행 중입니다."
    echo ""
    echo "실행 중인 프로세스:"
    ps -p $NEXT_PIDS -o pid,ppid,%cpu,%mem,start,command | grep -E "(PID|next)"
fi

echo ""

# 포트 상태 확인
echo "포트 상태:"
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "✅ 포트 3000: 사용 중"
    lsof -i:3000 | grep LISTEN
else
    echo "❌ 포트 3000: 사용 가능"
fi

echo ""

# 프로젝트 정보
echo "프로젝트 정보:"
echo "📁 위치: $(pwd)"
if [ -d ".next" ]; then
    echo "📦 빌드 캐시: 있음"
else
    echo "📦 빌드 캐시: 없음"
fi

echo ""
echo "================================"