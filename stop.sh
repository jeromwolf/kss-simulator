#!/bin/bash

# KSS Standalone 서버 종료 스크립트

echo "🛑 KSS Standalone 서버를 종료합니다..."

# Next.js 개발 서버 프로세스 찾기 및 종료
NEXT_PIDS=$(pgrep -f "next dev")

if [ -z "$NEXT_PIDS" ]; then
    echo "ℹ️  실행 중인 Next.js 서버가 없습니다."
else
    echo "🔍 다음 프로세스를 종료합니다:"
    ps -p $NEXT_PIDS -o pid,command | grep -v PID
    
    # 프로세스 종료
    echo "$NEXT_PIDS" | xargs kill -9 2>/dev/null
    echo "✅ 서버가 종료되었습니다."
fi

# 포트 3000 확인
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️  포트 3000에 아직 프로세스가 남아있습니다. 강제 종료합니다..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
fi

echo "🎯 완료!"