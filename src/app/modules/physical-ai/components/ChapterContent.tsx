'use client'

import { Bot, Eye, Cpu, Zap, Wifi, Car, Factory, Brain } from 'lucide-react'

interface ChapterContentProps {
  chapterId: number
}

export default function ChapterContent({ chapterId }: ChapterContentProps) {
  const chapterComponents: Record<number, () => JSX.Element> = {
    1: Chapter1Content,
    2: Chapter2Content,
    3: Chapter3Content,
    4: Chapter4Content,
    5: Chapter5Content,
    6: Chapter6Content,
    7: Chapter7Content,
    8: Chapter8Content
  }

  const ContentComponent = chapterComponents[chapterId]

  if (!ContentComponent) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          챕터 {chapterId} 콘텐츠 준비 중
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          이 챕터의 콘텐츠가 곧 추가될 예정입니다.
        </p>
      </div>
    )
  }

  return <ContentComponent />
}

// Chapter 1: Physical AI 개요와 미래
function Chapter1Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Bot className="w-8 h-8 text-slate-600" />
          Physical AI란 무엇인가?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🧠 Digital AI</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              정보 처리와 의사결정에 집중하는 전통적인 AI
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• ChatGPT, GPT-4와 같은 언어 모델</li>
              <li>• 컴퓨터 비전, 추천 시스템</li>
              <li>• 데이터 분석과 패턴 인식</li>
              <li>• 가상 환경에서의 작업</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🤖 Physical AI</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              물리적 세계와 직접 상호작용하는 체화된 AI
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 로봇, 자율주행차, 드론</li>
              <li>• 실시간 환경 인식과 제어</li>
              <li>• 센서-액추에이터 통합</li>
              <li>• 현실 세계의 불확실성 대응</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">💡 핵심 차이점</h4>
          <p className="text-yellow-700 dark:text-yellow-300">
            Digital AI는 "생각하는" AI라면, Physical AI는 "행동하는" AI입니다. 
            실세계의 물리 법칙, 시간 제약, 안전성 요구사항을 모두 고려해야 합니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚀 젠슨 황의 COSMOS 비전</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">NVIDIA COSMOS: Physical AI의 미래</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              젠슨 황 CEO가 제시한 COSMOS는 물리 세계를 이해하고 상호작용할 수 있는 AI 시스템입니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-b from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-lg">
              <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <div className="font-bold text-purple-700 dark:text-purple-400">World Model</div>
              <div className="text-sm text-purple-600 dark:text-purple-300">물리 세계 이해</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg">
              <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <div className="font-bold text-blue-700 dark:text-blue-400">Perception</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">실시간 인식</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-b from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-lg">
              <Zap className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <div className="font-bold text-green-700 dark:text-green-400">Action</div>
              <div className="text-sm text-green-600 dark:text-green-300">지능적 행동</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">COSMOS의 3대 핵심 기술</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>1. Foundation Models for Robotics:</strong> 로봇을 위한 범용 AI 모델</li>
              <li><strong>2. Sim2Real Transfer:</strong> 시뮬레이션에서 현실로의 완벽한 전이</li>
              <li><strong>3. Omniverse Integration:</strong> 디지털 트윈과 메타버스 연결</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🌍 주요 응용 분야</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-xl p-6">
            <Car className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">자율주행 모빌리티</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div><strong>Tesla FSD:</strong> 카메라 기반 end-to-end 자율주행</div>
              <div><strong>Waymo:</strong> LiDAR + HD맵 기반 완전 자율주행</div>
              <div><strong>Cruise:</strong> 도시 환경 자율주행 서비스</div>
              <div><strong>현대차 Level 4:</strong> 고속도로 자율주행 상용화</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-xl p-6">
            <Bot className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">휴머노이드 로봇</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div><strong>Tesla Bot Optimus:</strong> 범용 휴머노이드 로봇</div>
              <div><strong>Boston Dynamics Atlas:</strong> 고급 이족보행과 조작</div>
              <div><strong>Honda ASIMO:</strong> 인간 환경 적응형 로봇</div>
              <div><strong>Figure 01:</strong> 산업용 휴머노이드</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-xl p-6">
            <Factory className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">스마트 제조업</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div><strong>BMW iFactory:</strong> AI 기반 스마트 팩토리</div>
              <div><strong>Siemens Digital Factory:</strong> 디지털 트윈 생산 시스템</div>
              <div><strong>ABB Robotics:</strong> 협동 로봇과 AI 통합</div>
              <div><strong>삼성 반도체:</strong> AI 기반 품질 관리</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-xl p-6">
            <Wifi className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">IoT & Edge AI</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div><strong>AWS IoT Greengrass:</strong> 엣지 AI 플랫폼</div>
              <div><strong>Google Edge TPU:</strong> 모바일 AI 가속기</div>
              <div><strong>Intel OpenVINO:</strong> 엣지 추론 최적화</div>
              <div><strong>NVIDIA Jetson:</strong> 로봇용 AI 컴퓨팅</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📈 기술 발전 로드맵</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 mb-3">2024-2025: 기반 기술 성숙</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• 멀티모달 Foundation Models (GPT-4V, Gemini) 상용화</li>
              <li>• 로봇 학습을 위한 대규모 데이터셋 구축</li>
              <li>• Sim2Real 기술의 정확도 향상</li>
              <li>• Edge AI 하드웨어 성능 2배 향상</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-3">2025-2027: 상용화 가속</h3>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• 자율주행 Level 4 대중화</li>
              <li>• 휴머노이드 로봇 상업적 배치</li>
              <li>• 스마트 팩토리 AI 통합률 50% 달성</li>
              <li>• 개인용 로봇 어시스턴트 등장</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-purple-800 dark:text-purple-400 mb-3">2027-2030: AGI와 융합</h3>
            <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
              <li>• AGI 수준의 Physical AI 시스템</li>
              <li>• 완전 자율 로봇 사회 인프라</li>
              <li>• 인간-로봇 협업 표준화</li>
              <li>• 물리-디지털 통합 생태계 완성</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ Physical AI의 핵심 도전과제</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-3">기술적 도전</h3>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-2">
              <li>• <strong>실시간 처리:</strong> 밀리초 단위 의사결정 요구</li>
              <li>• <strong>불확실성:</strong> 예측 불가능한 환경 변화</li>
              <li>• <strong>안전성:</strong> 물리적 피해 방지 필수</li>
              <li>• <strong>효율성:</strong> 제한된 컴퓨팅 자원 활용</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-800 dark:text-orange-400 mb-3">사회적 도전</h3>
            <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-2">
              <li>• <strong>윤리적 판단:</strong> 자율 시스템의 도덕적 결정</li>
              <li>• <strong>일자리 변화:</strong> 자동화로 인한 고용 영향</li>
              <li>• <strong>규제 체계:</strong> 새로운 기술에 맞는 법률</li>
              <li>• <strong>사회적 수용:</strong> 인간-AI 공존 방식</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 2: 로보틱스와 제어 시스템
function Chapter2Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Bot className="w-8 h-8 text-slate-600" />
          로봇 운동학과 동역학
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📐 순방향 운동학 (Forward Kinematics)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              관절 각도가 주어졌을 때 끝점(end-effector)의 위치와 방향을 계산
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <code className="text-sm text-blue-600 dark:text-blue-400">
                T = T₁(θ₁) × T₂(θ₂) × ... × Tₙ(θₙ)<br/>
                여기서 Tᵢ는 i번째 관절의 변환 행렬
              </code>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🎯 역방향 운동학 (Inverse Kinematics)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              원하는 끝점 위치/방향이 주어졌을 때 필요한 관절 각도를 계산
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <code className="text-sm text-green-600 dark:text-green-400">
                θ = IK(x, y, z, roll, pitch, yaw)<br/>
                주로 반복적 수치해법이나 해석적 해법 사용
              </code>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">ROS 로봇 제어 예제</h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`import rospy
from geometry_msgs.msg import Twist
from sensor_msgs.msg import JointState
import numpy as np

class RobotController:
    def __init__(self):
        rospy.init_node('robot_controller')
        self.cmd_pub = rospy.Publisher('/cmd_vel', Twist, queue_size=1)
        self.joint_sub = rospy.Subscriber('/joint_states', JointState, self.joint_callback)
        
        # PID 제어기 파라미터
        self.kp = 1.0
        self.ki = 0.1
        self.kd = 0.05
        self.prev_error = 0.0
        self.integral = 0.0
    
    def joint_callback(self, msg):
        # 현재 관절 상태 처리
        current_positions = msg.position
        self.update_control(current_positions)
    
    def pid_control(self, target, current):
        error = target - current
        self.integral += error
        derivative = error - self.prev_error
        
        output = self.kp * error + self.ki * self.integral + self.kd * derivative
        self.prev_error = error
        return output
    
    def move_to_target(self, target_x, target_y):
        cmd = Twist()
        cmd.linear.x = self.pid_control(target_x, self.current_x)
        cmd.angular.z = self.pid_control(target_y, self.current_y)
        self.cmd_pub.publish(cmd)`}
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔍 센서 데이터 융합</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl p-6">
            <Eye className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">카메라</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• RGB, 깊이, 적외선</li>
              <li>• 객체 인식, 추적</li>
              <li>• Visual SLAM</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl p-6">
            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">LiDAR</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 3D 점군 데이터</li>
              <li>• 정확한 거리 측정</li>
              <li>• 환경 매핑</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl p-6">
            <Wifi className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">IMU/GPS</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 관성 측정 장치</li>
              <li>• 위치, 자세 추정</li>
              <li>• 모션 추적</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">🔗 칼만 필터를 이용한 센서 융합</h4>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            여러 센서의 불확실한 측정값을 최적으로 결합하여 정확한 상태 추정을 수행합니다.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <code className="text-sm text-yellow-700 dark:text-yellow-400">
              예측: x̂⁻ = Fx̂ + Bu<br/>
              업데이트: x̂ = x̂⁻ + K(z - Hx̂⁻)<br/>
              여기서 K는 칼만 게인, z는 센서 측정값
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚙️ 고급 제어 알고리즘</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">PID 제어</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              비례-적분-미분 제어로 가장 널리 사용되는 피드백 제어 방식
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">비례 제어 (P):</span>
                <code className="text-blue-600 dark:text-blue-400">Kp × error</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">적분 제어 (I):</span>
                <code className="text-green-600 dark:text-green-400">Ki × ∫error dt</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">미분 제어 (D):</span>
                <code className="text-purple-600 dark:text-purple-400">Kd × d(error)/dt</code>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">모델 예측 제어 (MPC)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              미래 상태를 예측하고 최적화를 통해 제어 입력을 결정
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• 제약 조건 고려 가능</li>
              <li>• 다변수 시스템에 효과적</li>
              <li>• 예측 호라이즌 내 최적화</li>
              <li>• 자율주행, 로봇 경로 계획에 활용</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛡️ 실시간 시스템과 안전성</h2>
        
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-3">⏱️ 실시간 제약사항</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Hard Real-time</h4>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                <li>• 데드라인 초과 시 시스템 실패</li>
                <li>• 자율주행 긴급 제동</li>
                <li>• 로봇 충돌 회피</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Soft Real-time</h4>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                <li>• 가끔 데드라인 초과 허용</li>
                <li>• 비디오 스트리밍</li>
                <li>• 사용자 인터페이스</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-3">🔒 안전성 보장 메커니즘</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Fail-Safe 설계</h4>
              <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <li>• 시스템 실패 시 안전한 상태로 전환</li>
                <li>• 중복 센서와 액추에이터</li>
                <li>• 긴급 정지 메커니즘</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">형식 검증</h4>
              <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <li>• 수학적 모델을 통한 안전성 증명</li>
                <li>• 모델 체킹과 정리 증명</li>
                <li>• 인증 기관의 승인 필요</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 3: 컴퓨터 비전과 인식
function Chapter3Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Eye className="w-8 h-8 text-slate-600" />
          실시간 객체 인식
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🎯 YOLO (You Only Look Once)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              이미지를 한 번만 보고 여러 객체를 동시에 탐지하는 실시간 객체 탐지 알고리즘
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• YOLOv8: 최신 버전, 정확도와 속도 향상</li>
              <li>• 실시간 처리: 30-60 FPS</li>
              <li>• 자율주행, 보안, 로봇에 활용</li>
              <li>• Edge 디바이스 최적화 가능</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔄 Transformer 기반 인식</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Attention 메커니즘을 활용한 차세대 컴퓨터 비전 모델
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• ViT (Vision Transformer): 이미지를 패치로 분할</li>
              <li>• DETR: End-to-end 객체 탐지</li>
              <li>• Swin Transformer: 계층적 구조</li>
              <li>• 멀티모달 학습 가능</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">OpenCV 실시간 객체 탐지 예제</h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`import cv2
import numpy as np

class RealTimeDetector:
    def __init__(self, model_path, config_path, classes_path):
        # YOLO 모델 로드
        self.net = cv2.dnn.readNetFromDarknet(config_path, model_path)
        self.net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
        self.net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)
        
        # 클래스 이름 로드
        with open(classes_path, 'r') as f:
            self.classes = f.read().strip().split('\\n')
        
        self.output_layers = self.net.getUnconnectedOutLayersNames()
    
    def detect_objects(self, frame):
        height, width = frame.shape[:2]
        
        # 전처리: 블롭 생성
        blob = cv2.dnn.blobFromImage(frame, 1/255.0, (416, 416), swapRB=True, crop=False)
        self.net.setInput(blob)
        
        # 추론 실행
        outputs = self.net.forward(self.output_layers)
        
        # 결과 후처리
        boxes, confidences, class_ids = [], [], []
        
        for output in outputs:
            for detection in output:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                
                if confidence > 0.5:  # 신뢰도 임계값
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * height)
                    w = int(detection[2] * width)
                    h = int(detection[3] * height)
                    
                    x = int(center_x - w/2)
                    y = int(center_y - h/2)
                    
                    boxes.append([x, y, w, h])
                    confidences.append(float(confidence))
                    class_ids.append(class_id)
        
        # Non-Maximum Suppression
        indices = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
        
        return boxes, confidences, class_ids, indices
    
    def run_camera(self):
        cap = cv2.VideoCapture(0)
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            # 객체 탐지
            boxes, confidences, class_ids, indices = self.detect_objects(frame)
            
            # 결과 시각화
            if len(indices) > 0:
                for i in indices.flatten():
                    x, y, w, h = boxes[i]
                    label = f"{self.classes[class_ids[i]]}: {confidences[i]:.2f}"
                    
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                    cv2.putText(frame, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            
            cv2.imshow('Real-time Detection', frame)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        
        cap.release()
        cv2.destroyAllWindows()`}
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📏 3D 인식과 깊이 추정</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">스테레오 비전</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              두 카메라의 시차를 이용한 깊이 계산
            </p>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              depth = (focal × baseline) / disparity
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">LiDAR 점군</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              레이저를 이용한 정밀한 3D 측정
            </p>
            <div className="text-xs text-blue-600 dark:text-blue-400">
              거리 = (빛의 속도 × 시간) / 2
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">단안 깊이 추정</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              딥러닝으로 단일 이미지에서 깊이 예측
            </p>
            <div className="text-xs text-green-600 dark:text-green-400">
              MiDaS, DPT, AdaBins 등
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 mb-3">🗺️ Visual SLAM (동시 위치추정-매핑)</h3>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            로봇이 미지의 환경에서 동시에 지도를 작성하고 자신의 위치를 추정하는 기술
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">주요 알고리즘</h4>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                <li>• <strong>ORB-SLAM3:</strong> 특징점 기반 SLAM</li>
                <li>• <strong>DSO:</strong> Direct Sparse Odometry</li>
                <li>• <strong>Kimera:</strong> 실시간 메트릭-시맨틱 SLAM</li>
                <li>• <strong>Neural SLAM:</strong> 딥러닝 기반 SLAM</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">응용 분야</h4>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                <li>• 자율주행차 내비게이션</li>
                <li>• 드론 자율 비행</li>
                <li>• 실내 로봇 청소기</li>
                <li>• AR/VR 위치 추적</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ Edge AI 최적화</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">모델 경량화 기법</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📊 양자화 (Quantization)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  32비트 부동소수점을 8비트 정수로 변환하여 모델 크기와 추론 시간 감소
                </p>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  모델 크기: 75% 감소, 추론 속도: 2-4배 향상
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">✂️ 가지치기 (Pruning)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  중요하지 않은 가중치나 뉴런을 제거하여 모델 복잡도 감소
                </p>
                <div className="text-xs text-green-600 dark:text-green-400">
                  정확도 유지하며 90% 이상 파라미터 제거 가능
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📚 지식 증류 (Knowledge Distillation)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  큰 교사 모델의 지식을 작은 학생 모델로 전달
                </p>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  성능 손실 최소화하며 모델 크기 대폭 감소
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">하드웨어 가속</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">NVIDIA Jetson</h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  로봇과 임베디드 AI 애플리케이션을 위한 고성능 컴퓨팅 플랫폼
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Google Edge TPU</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  TensorFlow Lite 모델을 위한 전용 AI 추론 가속기
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Intel OpenVINO</h4>
                <p className="text-sm text-purple-600 dark:text-purple-300">
                  다양한 Intel 하드웨어에서 AI 추론 최적화 도구킷
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Qualcomm AI Engine</h4>
                <p className="text-sm text-orange-600 dark:text-orange-300">
                  모바일 디바이스용 AI 가속 솔루션
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔧 센서 캘리브레이션</h2>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-orange-800 dark:text-orange-400 mb-3">📷 카메라-LiDAR 융합 캘리브레이션</h3>
          <p className="text-orange-700 dark:text-orange-300 mb-4">
            정확한 3D 인식을 위해 서로 다른 센서 간의 좌표계를 정렬하는 과정
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">내부 캘리브레이션</h4>
              <ul className="text-sm text-orange-600 dark:text-orange-400 space-y-1">
                <li>• 카메라 내부 파라미터 (초점거리, 주점)</li>
                <li>• 렌즈 왜곡 보정</li>
                <li>• 체스보드 패턴 사용</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">외부 캘리브레이션</h4>
              <ul className="text-sm text-orange-600 dark:text-orange-400 space-y-1">
                <li>• 센서 간 상대 위치/방향</li>
                <li>• 3D-2D 대응점 활용</li>
                <li>• ICP (Iterative Closest Point) 알고리즘</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 4: 강화학습과 제어
function Chapter4Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Brain className="w-8 h-8 text-slate-600" />
          실세계 강화학습의 도전과제
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">⚠️ 주요 도전과제</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <div>
                  <strong>샘플 효율성:</strong> 실제 환경에서는 시행착오 비용이 매우 높음
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <div>
                  <strong>안전성:</strong> 탐험 과정에서 시스템이나 환경에 손상 위험
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <div>
                  <strong>부분 관측성:</strong> 완전한 상태 정보를 얻기 어려움
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <div>
                  <strong>환경 변화:</strong> 예측 불가능한 외부 요인들
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">✅ 해결 접근법</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <div>
                  <strong>사전 훈련:</strong> 시뮬레이션에서 기본 정책 학습
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <div>
                  <strong>Safe RL:</strong> 제약 조건을 고려한 안전한 탐험
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <div>
                  <strong>Model-based RL:</strong> 환경 모델을 학습하여 효율성 향상
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <div>
                  <strong>인간 피드백:</strong> RLHF로 안전하고 유용한 행동 유도
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔄 Sim2Real: 시뮬레이션에서 현실로</h2>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 mb-3">🎯 Domain Gap 문제</h3>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            시뮬레이션과 현실 세계 간의 차이로 인해 학습된 정책이 실제 환경에서 제대로 작동하지 않는 문제
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">물리적 차이</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 마찰력, 관성</li>
                <li>• 센서 노이즈</li>
                <li>• 액추에이터 지연</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">시각적 차이</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 조명 조건</li>
                <li>• 텍스처, 재질</li>
                <li>• 카메라 특성</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">동역학 차이</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 제어 정확도</li>
                <li>• 시간 지연</li>
                <li>• 비선형성</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Domain Randomization 예제</h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`import numpy as np
import gym
from gym import spaces

class DomainRandomizedEnv(gym.Env):
    def __init__(self, base_env):
        self.base_env = base_env
        self.action_space = base_env.action_space
        self.observation_space = base_env.observation_space
        
        # 물리 파라미터 랜덤화 범위
        self.physics_params = {
            'gravity': (9.8, 11.8),          # 중력 변화
            'friction': (0.1, 1.0),          # 마찰 계수
            'mass_ratio': (0.8, 1.2),        # 질량 변화
            'damping': (0.01, 0.1),          # 감쇠 계수
        }
        
        # 시각적 랜덤화 범위
        self.visual_params = {
            'lighting': (0.5, 1.5),          # 조명 강도
            'texture_scale': (0.8, 1.2),     # 텍스처 크기
            'color_hue': (-0.1, 0.1),        # 색상 변화
            'camera_noise': (0.0, 0.05),     # 카메라 노이즈
        }
    
    def randomize_physics(self):
        """물리 파라미터 랜덤화"""
        for param, (min_val, max_val) in self.physics_params.items():
            random_val = np.random.uniform(min_val, max_val)
            self.base_env.set_physics_param(param, random_val)
    
    def randomize_visuals(self):
        """시각적 요소 랜덤화"""
        for param, (min_val, max_val) in self.visual_params.items():
            random_val = np.random.uniform(min_val, max_val)
            self.base_env.set_visual_param(param, random_val)
    
    def add_sensor_noise(self, observation):
        """센서 노이즈 추가"""
        noise_level = np.random.uniform(0.0, 0.02)
        noise = np.random.normal(0, noise_level, observation.shape)
        return observation + noise
    
    def reset(self):
        # 에피소드마다 환경 랜덤화
        self.randomize_physics()
        self.randomize_visuals()
        
        obs = self.base_env.reset()
        return self.add_sensor_noise(obs)
    
    def step(self, action):
        # 액션에 랜덤 노이즈 추가 (액추에이터 불확실성 모델링)
        action_noise = np.random.normal(0, 0.01, action.shape)
        noisy_action = action + action_noise
        
        obs, reward, done, info = self.base_env.step(noisy_action)
        
        # 관측에 센서 노이즈 추가
        noisy_obs = self.add_sensor_noise(obs)
        
        return noisy_obs, reward, done, info

# 사용 예제
def train_robust_policy():
    # 기본 환경 생성
    base_env = gym.make('RobotArm-v1')
    
    # Domain Randomization 적용
    randomized_env = DomainRandomizedEnv(base_env)
    
    # 강화학습 에이전트 훈련
    # (PPO, SAC 등의 알고리즘 사용)
    agent = PPO(randomized_env)
    
    for episode in range(10000):
        agent.train_episode()
        
        # 주기적으로 실제 환경에서 테스트
        if episode % 1000 == 0:
            real_performance = test_on_real_robot(agent)
            print(f"Episode {episode}: Real performance = {real_performance}")
    
    return agent`}
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🧠 Model-based vs Model-free RL</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🎯 Model-free RL</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              환경 모델 없이 직접 가치 함수나 정책을 학습
            </p>
            
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">장점</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 구현이 상대적으로 간단</li>
                  <li>• 모델 편향 없음</li>
                  <li>• 복잡한 환경에 유연하게 적응</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">단점</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 높은 샘플 복잡도</li>
                  <li>• 탐험에 많은 시간 필요</li>
                  <li>• 실제 환경에서 비효율적</li>
                </ul>
              </div>
              
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-1">대표 알고리즘</h4>
                <div className="text-sm text-purple-600 dark:text-purple-300">
                  PPO, SAC, TD3, DDPG
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔮 Model-based RL</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              환경의 동역학 모델을 학습하고 이를 활용하여 정책 학습
            </p>
            
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">장점</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 높은 샘플 효율성</li>
                  <li>• 계획과 예측 가능</li>
                  <li>• 안전한 탐험 가능</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">단점</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 모델 편향 위험</li>
                  <li>• 복잡한 구현</li>
                  <li>• 모델 정확도에 의존</li>
                </ul>
              </div>
              
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-1">대표 알고리즘</h4>
                <div className="text-sm text-blue-600 dark:text-blue-300">
                  MuZero, Dreamer, PETS, MB-MPO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛡️ Safe RL과 제약 조건</h2>
        
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-3">⚠️ 안전성이 중요한 이유</h3>
          <p className="text-red-700 dark:text-red-300 mb-4">
            Physical AI에서는 잘못된 행동이 물리적 손상이나 인명 피해를 초래할 수 있어 안전성이 최우선 고려사항입니다.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">로봇 조작</h4>
              <ul className="text-sm text-red-600 dark:text-red-300 space-y-1">
                <li>• 관절 한계 초과 방지</li>
                <li>• 충돌 회피</li>
                <li>• 힘/토크 제한</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">자율주행</h4>
              <ul className="text-sm text-red-600 dark:text-red-300 space-y-1">
                <li>• 교통법규 준수</li>
                <li>• 안전 거리 유지</li>
                <li>• 급가속/급제동 방지</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">드론</h4>
              <ul className="text-sm text-red-600 dark:text-red-300 space-y-1">
                <li>• 비행 금지 구역 회피</li>
                <li>• 배터리 안전 마진</li>
                <li>• 기상 조건 고려</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-3">✅ Safe RL 기법들</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Constrained Policy Optimization (CPO)</h4>
              <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                제약 조건을 만족하면서 정책을 최적화하는 방법
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <code className="text-xs text-green-700 dark:text-green-400">
                  maximize E[Σ r(s,a)]<br/>
                  subject to E[Σ c(s,a)] ≤ δ
                </code>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Safety Shield</h4>
              <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                RL 정책의 출력을 안전성 검증기가 필터링
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <code className="text-xs text-green-700 dark:text-green-400">
                  if is_safe(π(s)):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;return π(s)<br/>
                  else:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;return safe_action(s)
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🤝 Multi-agent RL과 협력 제어</h2>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 mb-3">🌐 다중 에이전트 시나리오</h3>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            여러 로봇이나 자율 시스템이 함께 작업하거나 상호작용하는 환경에서의 학습과 제어
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">협력적 환경</h4>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-2">
                <li>• <strong>창고 로봇:</strong> 다중 로봇이 협력하여 물류 작업</li>
                <li>• <strong>편대 비행:</strong> 드론들의 협력적 임무 수행</li>
                <li>• <strong>협동 조작:</strong> 여러 로봇 팔이 큰 물체 이동</li>
                <li>• <strong>군집 로봇:</strong> 탐색, 구조 작업</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">경쟁적 환경</h4>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-2">
                <li>• <strong>로봇 축구:</strong> 팀 대 팀 경기</li>
                <li>• <strong>자율주행:</strong> 교차로에서의 협상</li>
                <li>• <strong>자원 경쟁:</strong> 제한된 자원 확보</li>
                <li>• <strong>게임 이론:</strong> 전략적 상호작용</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">핵심 도전과제</h4>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
              <li>• <strong>비정상성:</strong> 다른 에이전트의 정책 변화로 환경이 계속 변함</li>
              <li>• <strong>통신 제약:</strong> 대역폭 제한, 지연, 신뢰성 문제</li>
              <li>• <strong>확장성:</strong> 에이전트 수 증가에 따른 복잡도 폭발</li>
              <li>• <strong>신용 할당:</strong> 팀 성과에서 개별 기여도 파악</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 5-8은 비슷한 패턴으로 구현...
// 간단하게 placeholder로 처리
function Chapter5Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Wifi className="w-8 h-8 text-slate-600" />
          IoT와 엣지 컴퓨팅
        </h2>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
          <p className="text-gray-700 dark:text-gray-300">
            IoT 아키텍처, Edge AI 하드웨어 최적화, 분산 AI와 연합 학습, 
            실시간 데이터 처리, Digital Twin과 CPS 시스템에 대한 상세 내용이 포함됩니다.
          </p>
        </div>
      </section>
    </div>
  )
}

function Chapter6Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Car className="w-8 h-8 text-slate-600" />
          자율주행과 모빌리티
        </h2>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
          <p className="text-gray-700 dark:text-gray-300">
            자율주행 인식-판단-제어 파이프라인, HD 맵과 위치추정, V2X 통신과 협력 주행,
            경로 계획과 행동 예측, 자율주행 안전성과 검증에 대한 상세 내용이 포함됩니다.
          </p>
        </div>
      </section>
    </div>
  )
}

function Chapter7Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Factory className="w-8 h-8 text-slate-600" />
          산업 자동화와 스마트 팩토리
        </h2>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
          <p className="text-gray-700 dark:text-gray-300">
            Industry 4.0과 스마트 팩토리, 예측 유지보수와 품질 관리, 협동 로봇과 인간-로봇 협업,
            디지털 트윈과 가상 시운전, 공급망 최적화와 물류 자동화에 대한 상세 내용이 포함됩니다.
          </p>
        </div>
      </section>
    </div>
  )
}

function Chapter8Content() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Bot className="w-8 h-8 text-slate-600" />
          휴머노이드와 미래 AI
        </h2>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
          <p className="text-gray-700 dark:text-gray-300">
            휴머노이드 로봇의 현재와 미래, Tesla Bot과 Boston Dynamics의 기술,
            멀티모달 AI와 실세계 상호작용, AGI와 Physical AI의 융합,
            윤리적 고려사항과 사회적 영향에 대한 상세 내용이 포함됩니다.
          </p>
        </div>
      </section>
    </div>
  )
}