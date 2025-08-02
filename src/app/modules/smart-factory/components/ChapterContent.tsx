'use client'

import { Factory, Settings, Cpu, Eye, Bot, Shield, Activity, Gauge, Cog, Clock } from 'lucide-react'

export default function ChapterContent({ chapterId }: { chapterId: number }) {
  const content = getChapterContent(chapterId)
  return <div className="prose prose-lg dark:prose-invert max-w-none">{content}</div>
}

function getChapterContent(chapterId: number) {
  switch (chapterId) {
    case 1:
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border-l-4 border-amber-500">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
              <Factory className="w-8 h-8" />
              Industry 4.0과 스마트 팩토리란?
            </h2>
            <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
              4차 산업혁명(Industry 4.0)은 독일에서 시작된 개념으로, 사이버-물리 시스템(CPS)을 기반으로 한 
              스마트 제조 혁신을 의미합니다. 스마트 팩토리는 이러한 개념을 실현한 지능형 생산 시설입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Industry 4.0 핵심 기술</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong>IoT (Internet of Things):</strong> 모든 장비와 센서의 연결
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong>빅데이터 & AI:</strong> 데이터 기반 의사결정과 예측
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Bot className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong>로봇 자동화:</strong> 유연하고 지능적인 생산 자동화
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong>증강현실(AR):</strong> 작업자 지원과 교육 시스템
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">글로벌 스마트 팩토리 동향</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-400">🇩🇪 독일 Industrie 4.0</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    지멘스, BMW, 보쉬 등이 주도하는 제조업 디지털 전환
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-400">🇺🇸 Advanced Manufacturing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    GE, IBM, 인텔이 선도하는 스마트 제조 이니셔티브
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-400">🇰🇷 스마트 제조혁신 2025</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    삼성, LG, 현대차 중심의 K-스마트 팩토리 구축
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">스마트 팩토리 핵심 구성 요소</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">연결 (Connectivity)</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">IoT, 5G, 산업 네트워크</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Cpu className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">지능 (Intelligence)</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">AI, 머신러닝, 예측 분석</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bot className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">자동화 (Automation)</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">로봇, AGV, 자율 시스템</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">실제 사례: 현대차 울산공장</h3>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                현대자동차 울산공장은 국내 대표적인 스마트 팩토리 사례입니다. 
                AI 기반 품질 검사, 협동 로봇 도입, 실시간 생산 모니터링 시스템을 통해 
                생산성 30% 향상과 불량률 50% 감소를 달성했습니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">주요 성과</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 생산성 30% 향상</li>
                    <li>• 불량률 50% 감소</li>
                    <li>• 에너지 효율 20% 개선</li>
                    <li>• 작업자 안전사고 70% 감소</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">핵심 기술</h4>
                  <ul className="text-sm space-y-1">
                    <li>• AI 품질 검사 시스템</li>
                    <li>• 협동 로봇 200대 도입</li>
                    <li>• IoT 센서 10,000개 설치</li>
                    <li>• 디지털 트윈 시뮬레이션</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case 2:
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-orange-800 dark:text-orange-200 mb-4 flex items-center gap-2">
              <Settings className="w-8 h-8" />
              Industrial IoT & 센서 네트워크
            </h2>
            <p className="text-orange-700 dark:text-orange-300 leading-relaxed">
              산업용 IoT(IIoT)는 제조 현장의 모든 장비와 센서를 연결하여 실시간 데이터를 수집하고 
              분석하는 핵심 기술입니다. 이를 통해 생산 효율성과 품질을 극대화할 수 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">산업용 센서 종류</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">온도 센서</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">열전대, RTD, 적외선 센서로 장비 온도 모니터링</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-600 dark:text-green-400">진동 센서</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">가속도계, 자이로스코프로 장비 진동 측정</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">압력 센서</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">피에조저항, 정전용량 방식 압력 측정</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-600 dark:text-red-400">유량 센서</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">전자기, 초음파 방식 유체 흐름 측정</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">산업 통신 프로토콜</h3>
              <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-600 dark:text-amber-400">MQTT</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    경량 메시징 프로토콜, IoT 디바이스 간 효율적 통신
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">OPC-UA</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    산업 자동화 표준 프로토콜, 보안과 상호 운용성 제공
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-600 dark:text-green-400">Modbus</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    산업 현장에서 가장 널리 사용되는 통신 프로토콜
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">EtherNet/IP</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    이더넷 기반 산업용 네트워크 프로토콜
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">엣지 컴퓨팅 아키텍처</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-blue-800 p-4 rounded-lg text-center">
                <Activity className="w-8 h-8 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">센서 레이어</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                  물리적 데이터 수집
                </p>
              </div>
              <div className="bg-white dark:bg-blue-800 p-4 rounded-lg text-center">
                <Cpu className="w-8 h-8 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">엣지 레이어</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                  실시간 데이터 처리
                </p>
              </div>
              <div className="bg-white dark:bg-blue-800 p-4 rounded-lg text-center">
                <Factory className="w-8 h-8 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">클라우드 레이어</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                  고급 분석 및 AI
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white dark:bg-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">엣지 컴퓨팅의 장점</h4>
              <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
                <li>• 지연 시간(Latency) 최소화: 1ms 이하 응답 시간</li>
                <li>• 대역폭 효율성: 필요한 데이터만 클라우드 전송</li>
                <li>• 실시간 의사결정: 현장에서 즉시 제어 명령 실행</li>
                <li>• 보안 강화: 민감한 데이터의 로컬 처리</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">실습: MQTT 메시지 시뮬레이션</h3>
            <div className="bg-black p-4 rounded-lg font-mono text-sm">
              <div className="text-green-400"># MQTT Publisher (센서 데이터 전송)</div>
              <div className="text-white mt-2">
                {`import paho.mqtt.client as mqtt
import json
import time
import random

def publish_sensor_data():
    client = mqtt.Client()
    client.connect("localhost", 1883, 60)
    
    while True:
        # 센서 데이터 시뮬레이션
        data = {
            "timestamp": time.time(),
            "temperature": round(random.uniform(20, 80), 2),
            "vibration": round(random.uniform(0, 10), 2),
            "pressure": round(random.uniform(1, 5), 2)
        }
        
        # MQTT 토픽으로 데이터 전송
        topic = "factory/machine/001/sensors"
        client.publish(topic, json.dumps(data))
        
        time.sleep(1)  # 1초마다 전송`}
              </div>
            </div>
          </div>
        </div>
      )

    case 3:
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
              <Gauge className="w-8 h-8" />
              MES & ERP 시스템 통합
            </h2>
            <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
              MES(Manufacturing Execution System)와 ERP(Enterprise Resource Planning)의 통합은 
              스마트 팩토리의 핵심입니다. 생산 현장과 경영진 간의 실시간 정보 공유를 가능하게 합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">MES 주요 기능</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">생산 스케줄링</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">작업 순서와 자원 할당 최적화</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">작업 지시 관리</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">실시간 작업 지시와 진행 상황 추적</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">품질 관리</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">실시간 품질 모니터링과 불량 추적</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">성과 분석</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">OEE, 생산성 등 KPI 실시간 계산</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">ERP 핵심 모듈</h3>
              <div className="space-y-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">재무 관리 (FI)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">회계, 자산, 비용 관리</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">생산 계획 (PP)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">MRP, 생산 스케줄링</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">자재 관리 (MM)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">구매, 재고, 창고 관리</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300">영업 관리 (SD)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">주문, 배송, 고객 관리</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4">MES-ERP 통합 아키텍처</h3>
            <div className="space-y-4">
              <div className="bg-white dark:bg-amber-800 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">데이터 흐름</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="bg-amber-100 dark:bg-amber-700 p-3 rounded-lg mb-2">
                      <strong>ERP → MES</strong>
                    </div>
                    <ul className="text-left space-y-1 text-amber-700 dark:text-amber-300">
                      <li>• 생산 계획</li>
                      <li>• 작업 지시</li>
                      <li>• BOM 정보</li>
                      <li>• 자재 정보</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="bg-amber-100 dark:bg-amber-700 p-3 rounded-lg mb-2">
                      <strong>MES → ERP</strong>
                    </div>
                    <ul className="text-left space-y-1 text-amber-700 dark:text-amber-300">
                      <li>• 생산 실적</li>
                      <li>• 자재 소비</li>
                      <li>• 품질 데이터</li>
                      <li>• 설비 현황</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="bg-amber-100 dark:bg-amber-700 p-3 rounded-lg mb-2">
                      <strong>실시간 동기화</strong>
                    </div>
                    <ul className="text-left space-y-1 text-amber-700 dark:text-amber-300">
                      <li>• API 연동</li>
                      <li>• 메시지 큐</li>
                      <li>• 데이터베이스 동기화</li>
                      <li>• 웹서비스</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">실제 사례: 삼성전자 화성캠퍼스</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">통합 시스템 구성</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>SAP ERP와 자체 개발 MES 연동</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>실시간 생산 데이터 수집 시스템</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>AI 기반 생산 계획 최적화</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>모바일 기반 작업자 인터페이스</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">성과 지표</h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">25%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">생산 리드타임 단축</div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">40%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">재고 수준 최적화</div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">99.5%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">데이터 정확도</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case 4:
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border-l-4 border-red-500">
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
              <Activity className="w-8 h-8" />
              예측 유지보수 (Predictive Maintenance)
            </h2>
            <p className="text-red-700 dark:text-red-300 leading-relaxed">
              예측 유지보수는 AI와 센서 데이터를 활용하여 장비 고장을 사전에 예측하고 
              최적의 유지보수 시점을 결정하는 혁신적인 기술입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">예방 유지보수</h3>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  정기적 스케줄 기반
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  과도한 유지보수 비용
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  예상치 못한 고장 발생
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">사후 유지보수</h3>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-red-600 dark:text-red-300" />
                </div>
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  고장 발생 후 대응
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  높은 다운타임 비용
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  생산 중단 위험
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">예측 유지보수</h3>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                  <Cpu className="w-8 h-8 text-green-600 dark:text-green-300" />
                </div>
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  AI 기반 고장 예측
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  최적 유지보수 시점
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  비용 절감 & 효율성
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">핵심 센서 데이터</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">물리적 신호</h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-blue-800 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      <div>
                        <h5 className="font-semibold text-blue-800 dark:text-blue-200">진동 분석</h5>
                        <p className="text-sm text-blue-600 dark:text-blue-300">베어링, 기어박스 상태 진단</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-blue-800 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Gauge className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      <div>
                        <h5 className="font-semibold text-blue-800 dark:text-blue-200">온도 모니터링</h5>
                        <p className="text-sm text-blue-600 dark:text-blue-300">과열, 마찰 상태 감지</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-blue-800 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      <div>
                        <h5 className="font-semibold text-blue-800 dark:text-blue-200">압력 측정</h5>
                        <p className="text-sm text-blue-600 dark:text-blue-300">유압, 공압 시스템 상태</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">운영 데이터</h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-blue-800 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      <div>
                        <h5 className="font-semibold text-blue-800 dark:text-blue-200">운전 시간</h5>
                        <p className="text-sm text-blue-600 dark:text-blue-300">가동률, 사이클 타임</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-blue-800 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      <div>
                        <h5 className="font-semibold text-blue-800 dark:text-blue-200">품질 지표</h5>
                        <p className="text-sm text-blue-600 dark:text-blue-300">불량률, 정밀도 변화</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-blue-800 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Factory className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      <div>
                        <h5 className="font-semibold text-blue-800 dark:text-blue-200">환경 조건</h5>
                        <p className="text-sm text-blue-600 dark:text-blue-300">습도, 먼지, 진동 환경</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">RUL (Remaining Useful Life) 예측 모델</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">LSTM 기반 시계열 모델</h4>
                <div className="bg-black p-4 rounded-lg font-mono text-sm">
                  <div className="text-green-400"># LSTM 모델 구현</div>
                  <div className="text-white mt-2">
                    {`from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# LSTM 모델 정의
model = Sequential([
    LSTM(50, return_sequences=True, 
         input_shape=(time_steps, features)),
    LSTM(50, return_sequences=False),
    Dense(25),
    Dense(1)  # RUL 예측값
])

model.compile(optimizer='adam', loss='mse')
model.fit(X_train, y_train, epochs=100)`}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">CNN 기반 신호 분석</h4>
                <div className="bg-black p-4 rounded-lg font-mono text-sm">
                  <div className="text-green-400"># CNN 진동 분석 모델</div>
                  <div className="text-white mt-2">
                    {`from tensorflow.keras.layers import Conv1D, MaxPooling1D

# 1D CNN 모델 (진동 신호 분석)
model = Sequential([
    Conv1D(filters=64, kernel_size=3, 
           activation='relu'),
    MaxPooling1D(pool_size=2),
    Conv1D(filters=32, kernel_size=3, 
           activation='relu'),
    Flatten(),
    Dense(50, activation='relu'),
    Dense(1, activation='sigmoid')  # 고장 확률
])`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">실제 사례: 포스코 광양제철소</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-3">AI 예측 유지보수 시스템</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>압연기 롤 교체 시점 예측 (오차 ±3일)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>가열로 내화물 수명 예측 모델</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>냉각수 펌프 고장 6개월 전 예측</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>베어링 교체 최적 타이밍 제시</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">경제적 효과</h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">30%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">유지보수 비용 절감</div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">예상치 못한 고장 감소</div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">95%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">설비 가동률 향상</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case 5:
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border-l-4 border-purple-500">
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4 flex items-center gap-2">
              <Eye className="w-8 h-8" />
              AI 기반 품질 관리 시스템
            </h2>
            <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
              컴퓨터 비전과 머신러닝을 활용한 자동 품질 검사는 인간의 주관적 판단을 대체하여 
              일관되고 정확한 품질 관리를 가능하게 합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">머신 비전 시스템 구성</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">고해상도 카메라</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      산업용 CCD/CMOS 센서, 최대 12MP 해상도
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">조명 시스템</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      LED 백라이트, 링라이트, 구조광 조명
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">영상 처리 장치</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      GPU 기반 실시간 이미지 처리
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-orange-600 dark:text-orange-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">자동화 장비</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      로봇 암, 컨베이어 벨트, 분류 시스템
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">결함 유형별 검출 방법</h3>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-700 dark:text-red-300">표면 결함</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    스크래치, 균열, 오염 → 엣지 검출, 텍스처 분석
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">치수 불량</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    길이, 폭, 두께 측정 → 캘리퍼 알고리즘
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">형상 불량</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    변형, 휨 → 윤곽 분석, 기하학적 매칭
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">조립 불량</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    부품 누락, 위치 오류 → 템플릿 매칭
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4">딥러닝 기반 결함 검출</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-3">YOLO 객체 검출</h4>
                <div className="bg-black p-4 rounded-lg font-mono text-sm">
                  <div className="text-green-400"># YOLOv5 결함 검출 모델</div>
                  <div className="text-white mt-2">
                    {`import torch
from yolov5 import YOLOv5

# 사전 훈련된 모델 로드
model = YOLOv5('yolov5s.pt', device='gpu')

# 사용자 데이터로 파인튜닝
model.train(data='defect_dataset.yaml', 
           epochs=100, 
           imgsz=640)

# 실시간 결함 검출
def detect_defects(image):
    results = model(image)
    defects = results.pandas().xyxy[0]
    return defects`}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-3">CNN 분류 모델</h4>
                <div className="bg-black p-4 rounded-lg font-mono text-sm">
                  <div className="text-green-400"># 결함 분류 CNN 모델</div>
                  <div className="text-white mt-2">
                    {`from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D

# ResNet50 기반 전이학습
base_model = ResNet50(weights='imagenet', 
                     include_top=False,
                     input_shape=(224, 224, 3))

# 분류 헤드 추가
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
predictions = Dense(num_classes, 
                   activation='softmax')(x)`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">SPC (Statistical Process Control) 차트</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">관리도 종류</h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-blue-800 p-3 rounded-lg">
                    <h5 className="font-semibold text-blue-800 dark:text-blue-200">X̄-R 관리도</h5>
                    <p className="text-sm text-blue-600 dark:text-blue-300">평균과 범위 관리</p>
                  </div>
                  <div className="bg-white dark:bg-blue-800 p-3 rounded-lg">
                    <h5 className="font-semibold text-blue-800 dark:text-blue-200">p 관리도</h5>
                    <p className="text-sm text-blue-600 dark:text-blue-300">불량률 관리</p>
                  </div>
                  <div className="bg-white dark:bg-blue-800 p-3 rounded-lg">
                    <h5 className="font-semibold text-blue-800 dark:text-blue-200">c 관리도</h5>
                    <p className="text-sm text-blue-600 dark:text-blue-300">결점 수 관리</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">관리 한계선</h4>
                <div className="bg-white dark:bg-blue-800 p-4 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">UCL (상한 관리선):</span>
                      <span className="font-mono text-blue-600 dark:text-blue-300">μ + 3σ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">CL (중심선):</span>
                      <span className="font-mono text-blue-600 dark:text-blue-300">μ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">LCL (하한 관리선):</span>
                      <span className="font-mono text-blue-600 dark:text-blue-300">μ - 3σ</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-700 rounded">
                    <p className="text-xs text-blue-700 dark:text-blue-200">
                      3σ 범위 내 99.7% 데이터 포함
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">실제 사례: LG디스플레이 파주공장</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">AI 품질 검사 시스템</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>OLED 패널 미세 결함 검출 (0.1mm 이하)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>실시간 픽셀 불량 자동 분류</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>검사 속도 초당 1,000장 처리</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>99.9% 정확도의 결함 검출</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">품질 향상 결과</h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">85%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">검사 시간 단축</div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">95%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">검사 정확도 향상</div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">60%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">인력 비용 절감</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case 6:
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-xl border-l-4 border-cyan-500">
            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 flex items-center gap-2">
              <Cog className="w-8 h-8" />
              디지털 트윈 (Digital Twin)
            </h2>
            <p className="text-cyan-700 dark:text-cyan-300 leading-relaxed">
              디지털 트윈은 물리적 시스템의 가상 복제본으로, 실시간 데이터를 통해 동기화되어 
              시뮬레이션, 분석, 최적화를 가능하게 하는 핵심 기술입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">디지털 트윈 구성 요소</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Factory className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">물리적 시스템</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">실제 생산 설비, 센서, 작업자</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400">가상 모델</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">3D 모델, 시뮬레이션 엔진</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400">데이터 연결</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">실시간 동기화, 양방향 통신</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-amber-600 dark:text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-600 dark:text-amber-400">분석 서비스</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">AI 분석, 예측, 최적화</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">주요 플랫폼 비교</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">Unity 3D</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                    <li>• 게임 엔진 기반의 고성능 렌더링</li>
                    <li>• C# 스크립팅 지원</li>
                    <li>• VR/AR 통합 환경</li>
                  </ul>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">Unreal Engine</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                    <li>• 포토리얼리스틱 그래픽</li>
                    <li>• 블루프린트 비주얼 스크립팅</li>
                    <li>• 대규모 환경 최적화</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-600 dark:text-green-400">NVIDIA Omniverse</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                    <li>• 협업 플랫폼 통합</li>
                    <li>• RTX 기반 실시간 레이트레이싱</li>
                    <li>• 물리 시뮬레이션 특화</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-6">디지털 트윈 구현 예시</h3>
            <div className="bg-black p-4 rounded-lg font-mono text-sm mb-4">
              <div className="text-green-400"># Unity C# 스크립트 - 실시간 데이터 동기화</div>
              <div className="text-white mt-2">
{`using UnityEngine;
using System.Collections;

public class DigitalTwinSync : MonoBehaviour 
{
    private MachineController machine;
    private float temperature;
    private float pressure;
    private bool isRunning;
    
    void Start()
    {
        machine = GetComponent<MachineController>();
        // MQTT 클라이언트 초기화
        StartCoroutine(SyncWithPhysicalMachine());
    }
    
    IEnumerator SyncWithPhysicalMachine()
    {
        while (true)
        {
            // 실제 기계로부터 센서 데이터 수신
            var sensorData = await GetSensorData();
            
            // 가상 모델 상태 업데이트
            UpdateVirtualMachine(sensorData);
            
            // What-if 시나리오 실행
            RunPredictiveAnalysis();
            
            yield return new WaitForSeconds(0.1f); // 10Hz 업데이트
        }
    }
    
    void UpdateVirtualMachine(SensorData data)
    {
        temperature = data.temperature;
        pressure = data.pressure;
        isRunning = data.isRunning;
        
        // 시각적 표현 업데이트
        machine.SetTemperature(temperature);
        machine.SetPressure(pressure);
        machine.SetRunningState(isRunning);
        
        // 이상 상태 감지
        if (temperature > 80f)
        {
            machine.ShowWarning("과열 위험");
        }
    }
}`}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-blue-800 p-4 rounded-lg text-center">
                <Eye className="w-8 h-8 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">실시간 모니터링</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">센서 데이터 시각화</p>
              </div>
              <div className="bg-white dark:bg-blue-800 p-4 rounded-lg text-center">
                <Gauge className="w-8 h-8 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">예측 분석</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">고장 예측 및 알림</p>
              </div>
              <div className="bg-white dark:bg-blue-800 p-4 rounded-lg text-center">
                <Settings className="w-8 h-8 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">최적화</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">생산 라인 개선</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">성공 사례: BMW 레겐스부르크 공장</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  BMW는 레겐스부르크 공장에서 전체 생산 라인의 디지털 트윈을 구축하여 
                  생산 효율성과 품질을 크게 향상시켰습니다.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">가상 생산 라인에서 시나리오 테스트</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">실시간 품질 예측 및 조치</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">작업자 훈련을 위한 가상 환경</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">성과 지표</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">30%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">계획 수립 시간 단축</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">15%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">생산성 향상</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">50%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">시뮬레이션 시간 단축</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">25%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">에너지 소비 절감</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case 7:
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border-l-4 border-purple-500">
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4 flex items-center gap-2">
              <Bot className="w-8 h-8" />
              로봇 공학과 자동화
            </h2>
            <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
              산업용 로봇과 협동 로봇(Collaborative Robot)을 활용한 스마트 팩토리 자동화는 
              생산성 향상과 작업자 안전을 동시에 실현하는 핵심 기술입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">산업용 로봇</h3>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
                  <Bot className="w-8 h-8 text-red-600 dark:text-red-300" />
                </div>
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  6축 다관절 로봇
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  높은 정밀도와 반복 정확도
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  대용량 페이로드 처리
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  용접, 도장, 조립 작업
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">협동 로봇 (Cobot)</h3>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                  <Settings className="w-8 h-8 text-green-600 dark:text-green-300" />
                </div>
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  인간과 안전한 협업
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  직관적인 프로그래밍
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  유연한 작업 재배치
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  조립, 검사, 포장 작업
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">AGV 시스템</h3>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                  <Factory className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  자동 물류 운반
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  LiDAR/카메라 내비게이션
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  스마트 경로 최적화
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  창고 자동화 연동
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-6">ROS 기반 로봇 제어</h3>
            <div className="bg-black p-4 rounded-lg font-mono text-sm mb-4">
              <div className="text-green-400"># ROS (Robot Operating System) - 협동 로봇 제어</div>
              <div className="text-white mt-2">
{`#!/usr/bin/env python3
import rospy
from sensor_msgs.msg import JointState
from geometry_msgs.msg import Twist
from std_msgs.msg import Bool

class CobotController:
    def __init__(self):
        rospy.init_node('cobot_controller')
        
        # 관절 상태 구독
        self.joint_sub = rospy.Subscriber(
            '/joint_states', JointState, self.joint_callback
        )
        
        # 안전 센서 구독
        self.safety_sub = rospy.Subscriber(
            '/safety_sensor', Bool, self.safety_callback
        )
        
        # 로봇 제어 퍼블리셔
        self.cmd_pub = rospy.Publisher(
            '/robot_command', Twist, queue_size=10
        )
        
        self.is_safe = True
        self.current_pose = None
        
    def joint_callback(self, msg):
        # 현재 관절 위치 업데이트
        self.current_pose = msg.position
        
        # 작업 공간 안전성 체크
        if self.check_workspace_safety():
            self.execute_task()
        else:
            self.emergency_stop()
    
    def safety_callback(self, msg):
        self.is_safe = msg.data
        if not self.is_safe:
            self.emergency_stop()
            rospy.logwarn("Human detected - stopping robot")
    
    def execute_task(self):
        if self.is_safe:
            # 협업 작업 실행
            cmd = Twist()
            cmd.linear.x = 0.1  # 안전한 속도로 이동
            self.cmd_pub.publish(cmd)
    
    def emergency_stop(self):
        # 즉시 정지
        cmd = Twist()
        self.cmd_pub.publish(cmd)

if __name__ == '__main__':
    controller = CobotController()
    rospy.spin()`}
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-purple-800 p-4 rounded-lg text-center">
                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-800 dark:text-purple-200">안전 제어</h4>
              </div>
              <div className="bg-white dark:bg-purple-800 p-4 rounded-lg text-center">
                <Eye className="w-8 h-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-800 dark:text-purple-200">센서 융합</h4>
              </div>
              <div className="bg-white dark:bg-purple-800 p-4 rounded-lg text-center">
                <Cpu className="w-8 h-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-800 dark:text-purple-200">실시간 제어</h4>
              </div>
              <div className="bg-white dark:bg-purple-800 p-4 rounded-lg text-center">
                <Activity className="w-8 h-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-800 dark:text-purple-200">경로 계획</h4>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">현대차 스마트 팩토리 로봇 도입 사례</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  현대차 울산공장은 350대의 산업용 로봇과 150대의 협동 로봇을 도입하여 
                  완전 자동화된 생산 라인을 구축했습니다.
                </p>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400">용접 로봇</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      차체 용접 작업 100% 자동화, 용접 품질 균일성 99.8% 달성
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-600 dark:text-green-400">조립 협동 로봇</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      작업자와 협업하여 정밀 부품 조립, 작업 효율성 40% 향상
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">AGV 물류 시스템</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      부품 운반 자동화로 물류 비용 30% 절감, 무인 야간 운영
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">도입 효과</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">40%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">생산성 향상</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">60%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">품질 불량률 감소</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">80%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">안전사고 감소</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">24/7</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">무인 운영</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">로봇 기술 트렌드</h4>
                  <ul className="text-sm space-y-1">
                    <li>• AI 기반 자율 학습 로봇</li>
                    <li>• 5G 연결 원격 제어</li>
                    <li>• 디지털 트윈 시뮬레이션</li>
                    <li>• 예측 유지보수 통합</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case 8:
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-xl border-l-4 border-red-500">
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
              <Shield className="w-8 h-8" />
              스마트 팩토리 보안과 미래 전망
            </h2>
            <p className="text-red-700 dark:text-red-300 leading-relaxed">
              스마트 팩토리의 디지털화가 진행됨에 따라 사이버 보안 위협이 증가하고 있으며, 
              OT(Operational Technology) 보안과 IT 보안의 통합이 필수적입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">사이버 보안 위협</h3>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-600 dark:text-red-400">랜섬웨어 공격</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    생산 중단을 목표로 하는 제조업 특화 랜섬웨어
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400">산업 스파이</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    핵심 제조 기술과 영업 비밀 탈취 시도
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-600 dark:text-yellow-400">공급망 공격</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    협력업체를 통한 간접적인 침입 경로
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">IoT 취약점</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    수많은 IoT 디바이스의 보안 관리 복잡성
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">보안 표준 및 프레임워크</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">IEC 62443</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    산업 자동화 및 제어 시스템 보안 국제 표준
                  </p>
                  <ul className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    <li>• 보안 수준(SL) 1-4 단계 정의</li>
                    <li>• 위험 평가 및 대응 방법론</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-600 dark:text-green-400">ISO 27001</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    정보보안 관리 시스템(ISMS) 인증 표준
                  </p>
                  <ul className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    <li>• 133개 보안 통제 항목</li>
                    <li>• 연속적인 개선 프로세스</li>
                  </ul>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">NIST Cybersecurity Framework</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    식별-보호-탐지-대응-복구 5단계 프레임워크
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-6">미래 스마트 팩토리 기술</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-green-800 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                    <Activity className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-green-800 dark:text-green-200 mb-3 text-center">5G/6G 네트워킹</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    초저지연 1ms 이하 통신
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    대용량 IoT 디바이스 연결
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    네트워크 슬라이싱 기술
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    실시간 원격 제어 가능
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-green-800 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                    <Cpu className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-green-800 dark:text-green-200 mb-3 text-center">AI/ML 고도화</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    자율 학습 생산 시스템
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    예측 정확도 99% 이상
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    멀티모달 AI 융합
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    설명 가능한 AI 도입
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-green-800 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                    <Factory className="w-8 h-8 text-green-600 dark:text-green-300" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-green-800 dark:text-green-200 mb-3 text-center">지속가능 제조</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    탄소 중립 생산 달성
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    순환 경제 모델 적용
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    재생 에너지 100% 활용
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    폐기물 제로 목표
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">글로벌 스마트 팩토리 로드맵 2030</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">2025년</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 5G 네트워크 완전 구축</li>
                    <li>• AI 예측 정확도 95%</li>
                    <li>• 디지털 트윈 표준화</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">2027년</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 완전 자율 생산 라인</li>
                    <li>• 탄소 배출 50% 감소</li>
                    <li>• 글로벌 공급망 연결</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">2029년</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 6G 초연결 네트워크</li>
                    <li>• 양자 컴퓨팅 도입</li>
                    <li>• 완전 무인 공장 운영</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">2030년</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 탄소 중립 달성</li>
                    <li>• 순환 경제 완성</li>
                    <li>• 지속가능 제조업 확립</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">🚀 혁신적 변화 전망</h4>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  스마트 팩토리는 단순한 자동화를 넘어 지능형 생태계로 진화하며, 
                  인간과 기계가 완벽하게 협업하는 새로운 제조업 패러다임을 만들어갈 것입니다. 
                  지속가능성과 효율성을 동시에 달성하는 미래 제조업의 모델이 될 것입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )

    default:
      return (
        <div className="text-center py-12">
          <Factory className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            챕터 {chapterId}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            이 챕터의 콘텐츠가 준비 중입니다.
          </p>
        </div>
      )
  }
}