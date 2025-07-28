# KSS Standalone 실행 스크립트 가이드

## 스크립트 목록

### 1. `start.sh` - 서버 시작
```bash
./start.sh          # 일반 시작
./start.sh --clean  # 캐시 삭제 후 시작
```

**기능:**
- 기존 포트 3000 프로세스 자동 종료
- 서버 시작 및 주요 URL 안내
- `--clean` 옵션으로 빌드 캐시 삭제

### 2. `stop.sh` - 서버 종료
```bash
./stop.sh
```

**기능:**
- 실행 중인 모든 Next.js 프로세스 종료
- 포트 3000 정리

### 3. `status.sh` - 서버 상태 확인
```bash
./status.sh
```

**기능:**
- 서버 실행 상태 확인
- 프로세스 정보 표시
- 포트 사용 현황
- 프로젝트 정보 표시

## 사용 예시

```bash
# 서버 시작
./start.sh

# 다른 터미널에서 상태 확인
./status.sh

# 서버 종료
./stop.sh

# 문제가 있을 때 캐시 삭제 후 재시작
./stop.sh
./start.sh --clean
```

## 주의사항

- 스크립트는 `kss-standalone` 디렉토리에서 실행해야 합니다
- 포트 3000이 다른 프로세스에서 사용 중이면 자동으로 종료됩니다
- `start.sh --clean` 옵션은 빌드가 꼬였을 때 사용하세요