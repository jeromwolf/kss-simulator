'use client'

import { Car, Eye, Cpu, Route, Radio, TestTube, Battery, Zap, Navigation, MapPin, Wifi, Shield } from 'lucide-react'

export default function ChapterContent({ chapterId }: { chapterId: number }) {
  const content = getChapterContent(chapterId)
  return <div className="prose prose-lg dark:prose-invert max-w-none">{content}</div>
}

function getChapterContent(chapterId: number) {
  switch (chapterId) {
    case 1:
      return <Chapter1 />
    case 2:
      return <Chapter2 />
    case 3:
      return <Chapter3 />
    case 4:
      return <Chapter4 />
    case 5:
      return <Chapter5 />
    case 6:
      return <Chapter6 />
    case 7:
      return <Chapter7 />
    case 8:
      return <Chapter8 />
    default:
      return <div>챕터 콘텐츠를 준비 중입니다.</div>
  }
}

function Chapter1() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          자율주행의 진화와 미래
        </h2>
        
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            자율주행은 단순한 기술 혁신을 넘어 인류의 이동 방식을 근본적으로 바꾸는 패러다임 시프트입니다.
            Tesla의 FSD, Waymo의 완전 무인 운행, 그리고 국내 카카오모빌리티의 상용화까지,
            우리는 SF에서나 봤던 미래가 현실이 되는 전환점에 서 있습니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚗 SAE 자율주행 레벨 체계
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Level 0-2: 운전자 중심</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-xs font-bold text-red-600 dark:text-red-400">0</div>
                <div>
                  <span className="font-semibold">No Automation</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">완전 수동 운전</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-xs font-bold text-orange-600 dark:text-orange-400">1</div>
                <div>
                  <span className="font-semibold">Driver Assistance</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">어댑티브 크루즈 컨트롤</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-xs font-bold text-yellow-600 dark:text-yellow-400">2</div>
                <div>
                  <span className="font-semibold">Partial Automation</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tesla Autopilot, 현대 HDA</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Level 3-4: 시스템 중심</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">3</div>
                <div>
                  <span className="font-semibold">Conditional Automation</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Audi Traffic Jam Pilot</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">4</div>
                <div>
                  <span className="font-semibold">High Automation</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Waymo One 상용 서비스</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-cyan-200 dark:border-cyan-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Level 5: 완전 자율</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center text-xs font-bold text-cyan-600 dark:text-cyan-400">5</div>
                <div>
                  <span className="font-semibold">Full Automation</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">운전대 없는 완전 무인차</p>
                </div>
              </div>
              <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded-lg p-3 mt-3">
                <p className="text-xs text-cyan-700 dark:text-cyan-400">
                  🎯 목표: 2030년 상용화
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🌍 글로벌 자율주행 생태계
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">🇺🇸 미국 빅테크</h4>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center">
                      <Car className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="font-bold">Tesla FSD</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    비전 중심, 뉴럴넷 end-to-end 학습
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-bold">Waymo</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    LiDAR 기반, 상용 로보택시 운영
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-bold">NVIDIA DRIVE</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    AI 컴퓨팅 플랫폼, 옴니버스 시뮬레이션
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">🇰🇷 한국 & 🇨🇳 중국</h4>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="font-bold">42dot (현대)</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    SDV OS, 아이오닉 6 기반 자율주행
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded flex items-center justify-center">
                      <Route className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="font-bold">카카오모빌리티</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    제주도 자율주행 택시 상용화
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center">
                      <Zap className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="font-bold">바이두 Apollo</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    중국 최대 자율주행 플랫폼
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          📈 기술 발전 로드맵
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-bold">2024</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white">Level 3 상용화</h4>
                <p className="text-gray-600 dark:text-gray-400">고속도로 자율주행, 조건부 무인화</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded">Mercedes EQS</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded">BMW iX</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">2027</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white">Level 4 확산</h4>
                <p className="text-gray-600 dark:text-gray-400">도심 무인 택시, 물류 자동화</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">Robotaxi</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">자율배송</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">2030</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white">Level 5 실현</h4>
                <p className="text-gray-600 dark:text-gray-400">완전 무인차, 운전대 제거</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-xs rounded">Full Autonomy</span>
                  <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-xs rounded">MaaS 통합</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          ⚖️ 법규 및 윤리적 이슈
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3">
              🚨 해결해야 할 과제들
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 사고 책임 소재 (제조사 vs 소유자)</li>
              <li>• 윤리적 딜레마 (트롤리 문제)</li>
              <li>• 사이버보안 위협</li>
              <li>• 일자리 대체 (운전업 종사자)</li>
              <li>• 데이터 프라이버시 보호</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-3">
              ✅ 기대되는 효과들
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 교통사고 90% 감소 (인적 요인 제거)</li>
              <li>• 교통 효율성 40% 향상</li>
              <li>• 고령자, 장애인 이동권 확대</li>
              <li>• 주차공간 80% 절약</li>
              <li>• 배출가스 50% 감소 (전동화 연계)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter2() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          센서 융합과 인지 시스템
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            자율주행차의 "눈"과 "뇌"에 해당하는 센서 시스템과 인지 알고리즘입니다.
            LiDAR의 정밀한 3D 스캔, 카메라의 풍부한 시각 정보, 레이더의 전천후 감지 능력을
            융합하여 인간보다 뛰어난 인지 성능을 구현합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          📡 핵심 센서 기술
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h4 className="font-bold text-gray-900 dark:text-white">LiDAR</h4>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">원리</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  레이저 펄스로 거리 측정 (Time-of-Flight)
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">장점</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  높은 정확도 (±2cm), 3D 포인트클라우드
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">기업</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Velodyne, Luminar, Ouster
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-8 h-8 text-green-600 dark:text-green-400" />
              <h4 className="font-bold text-gray-900 dark:text-white">Camera</h4>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">원리</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  RGB 이미지 + Stereo Vision
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">장점</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  색상 정보, 표지판/신호등 인식
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">AI 모델</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  YOLO, Faster R-CNN, SegNet
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <h4 className="font-bold text-gray-900 dark:text-white">Radar</h4>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">원리</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  FMCW 주파수 변조 전파
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">장점</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  전천후, 속도 측정, 장거리
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">주파수</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  77GHz, 79GHz (mmWave)
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🧠 센서 퓨전 알고리즘
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">1️⃣ 데이터 레벨 융합</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# 포인트클라우드 + RGB 이미지 융합
def sensor_fusion_early(lidar_points, camera_image):
    # 좌표계 변환
    projected_points = project_lidar_to_camera(lidar_points)
    
    # RGB-D 생성
    depth_map = create_depth_map(projected_points)
    rgbd_image = np.concatenate([camera_image, depth_map], axis=2)
    
    return rgbd_image`}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">2️⃣ 특징 레벨 융합</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# 각 센서별 특징 추출 후 융합
def sensor_fusion_feature(lidar_features, camera_features, radar_features):
    # Attention 메커니즘으로 가중치 계산
    attention_weights = calculate_attention([lidar_features, camera_features, radar_features])
    
    # 가중 평균으로 융합
    fused_features = weighted_average(features, attention_weights)
    
    return fused_features`}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">3️⃣ 결정 레벨 융합</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# 각 센서의 독립적 판단을 종합
def sensor_fusion_decision(detections_lidar, detections_camera, detections_radar):
    # Kalman Filter로 상태 추정
    for detection in all_detections:
        track = associate_with_existing_track(detection)
        if track:
            track.update(detection)
        else:
            create_new_track(detection)
    
    return validated_tracks`}</pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🗺️ HD맵과 로컬라이제이션
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              <MapPin className="inline w-5 h-5 mr-2" />
              HD맵 구성 요소
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>Lane Network:</strong> 차선 중심선, 경계선</li>
              <li>• <strong>Traffic Elements:</strong> 신호등, 표지판</li>
              <li>• <strong>Road Features:</strong> 연석, 가드레일</li>
              <li>• <strong>Semantic Info:</strong> 속도제한, 우선순위</li>
              <li>• <strong>정확도:</strong> 센티미터급 (±10cm)</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              <Navigation className="inline w-5 h-5 mr-2" />
              SLAM 기술
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>Visual SLAM:</strong> ORB-SLAM, VINS</li>
              <li>• <strong>LiDAR SLAM:</strong> LOAM, LeGO-LOAM</li>
              <li>• <strong>Multi-modal:</strong> 센서 융합 SLAM</li>
              <li>• <strong>Loop Closure:</strong> 누적 오차 보정</li>
              <li>• <strong>실시간성:</strong> 30Hz 이상 처리</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          🔬 최신 연구 동향
        </h3>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-3">
                🧪 Solid-State LiDAR
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                기계식 회전 부품 제거로 내구성 향상
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">Luminar</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">Aeye</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-3">
                🤖 Neuromorphic Vision
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                이벤트 기반 시각 센서로 초저전력 구현
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs rounded">Prophesee</span>
                <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs rounded">Intel</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter3() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          AI & 딥러닝 응용
        </h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            자율주행의 핵심은 AI입니다. 수백만 개의 파라미터를 가진 신경망이 실시간으로
            복잡한 도로 상황을 이해하고 판단합니다. Tesla의 FSD, Waymo의 PaLM 2 등
            최첨단 AI 모델들이 어떻게 운전을 학습하는지 알아봅시다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🎯 객체 탐지 모델
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Two-Stage Detectors</h4>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h5 className="font-bold text-purple-600 dark:text-purple-400 mb-2">Faster R-CNN</h5>
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# Faster R-CNN 구조
1. Backbone (ResNet/VGG)
2. RPN (Region Proposal Network)
3. ROI Pooling
4. Classification + Bbox Regression

# 장점: 높은 정확도
# 단점: 느린 속도 (5-10 FPS)`}</pre>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">One-Stage Detectors</h4>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h5 className="font-bold text-green-600 dark:text-green-400 mb-2">YOLOv8</h5>
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# YOLO 실시간 처리
class YOLO:
    def detect(self, image):
        # 그리드별 객체 예측
        predictions = self.backbone(image)
        
        # NMS로 중복 제거
        boxes = non_max_suppression(predictions)
        
        return boxes

# 장점: 빠른 속도 (30-60 FPS)
# 단점: 상대적으로 낮은 정확도`}</pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🖼️ Semantic Segmentation
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">FCN (Fully Convolutional Network)</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# FCN으로 픽셀별 분류
def semantic_segmentation(image):
    # Encoder: 특징 추출
    features = resnet_encoder(image)
    
    # Decoder: 업샘플링
    segmap = upsample_decoder(features)
    
    # 클래스별 확률 맵
    return softmax(segmap, dim=1)

# 도로, 차선, 보행자, 차량 등을 픽셀 단위로 분류`}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">DeepLab v3+</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# Atrous Convolution으로 다양한 스케일 처리
class ASPP(nn.Module):
    def __init__(self):
        self.conv1 = nn.Conv2d(in_ch, out_ch, 1)  # 1x1
        self.conv2 = nn.Conv2d(in_ch, out_ch, 3, dilation=6)
        self.conv3 = nn.Conv2d(in_ch, out_ch, 3, dilation=12)
        self.conv4 = nn.Conv2d(in_ch, out_ch, 3, dilation=18)
    
    def forward(self, x):
        return torch.cat([self.conv1(x), self.conv2(x), 
                         self.conv3(x), self.conv4(x)], dim=1)`}</pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🔮 행동 예측 AI
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              Trajectory Prediction
            </h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# LSTM 기반 궤적 예측
class TrajectoryLSTM(nn.Module):
    def __init__(self):
        self.lstm = nn.LSTM(input_size=4, 
                           hidden_size=128,
                           num_layers=2)
        self.output = nn.Linear(128, 2)  # x, y
    
    def forward(self, trajectory_history):
        # 과거 5초 궤적으로 미래 3초 예측
        out, _ = self.lstm(trajectory_history)
        future_traj = self.output(out)
        return future_traj`}</pre>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              Attention Mechanism
            </h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# Transformer로 다중 에이전트 상호작용
class MultiAgentAttention(nn.Module):
    def forward(self, agent_features):
        # 자차와 주변 차량들 간의 관계 모델링
        Q = self.query_proj(agent_features)
        K = self.key_proj(agent_features) 
        V = self.value_proj(agent_features)
        
        attention = softmax(Q @ K.T / sqrt(d_k))
        context = attention @ V
        
        return context`}</pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚀 End-to-End 학습
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Tesla FSD 접근법</h4>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-4">
              <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">Neural Network Architecture</h5>
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# Tesla HydraNets - Multi-Task Learning
class HydraNet(nn.Module):
    def __init__(self):
        self.backbone = EfficientNet()  # 공유 특징 추출기
        
        # 각 태스크별 헤드
        self.detection_head = DetectionHead()
        self.segmentation_head = SegmentationHead() 
        self.depth_head = DepthHead()
        self.planning_head = PlanningHead()
    
    def forward(self, multi_camera_input):
        # 8개 카메라 입력 융합
        features = self.backbone(multi_camera_input)
        
        # 동시 처리
        detections = self.detection_head(features)
        segmentation = self.segmentation_head(features)
        depth = self.depth_head(features)
        trajectory = self.planning_head(features)
        
        return detections, segmentation, depth, trajectory`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          ⚡ Edge Computing 최적화
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
              Model Quantization
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              FP32 → INT8 변환으로 4배 속도 향상
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">
              Neural Architecture Search
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              하드웨어 제약에 맞는 최적 구조 자동 설계
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">
              Knowledge Distillation
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              큰 모델의 지식을 작은 모델로 전이
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter4() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          경로 계획과 제어
        </h2>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            자율주행차가 목적지까지 안전하고 효율적으로 이동하는 "두뇌"에 해당합니다.
            실시간으로 변하는 도로 환경에서 최적의 경로를 계획하고, 차량의 물리적 한계를
            고려한 정밀한 제어를 수행합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🗺️ 경로 계획 알고리즘
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">
              <Route className="inline w-5 h-5 mr-2" />
              A* 알고리즘
            </h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# A* 경로 계획 구현
class AStarPlanner:
    def __init__(self, grid_map):
        self.grid_map = grid_map
        
    def plan(self, start, goal):
        open_set = PriorityQueue()
        open_set.put((0, start))
        
        g_score = {start: 0}
        f_score = {start: self.heuristic(start, goal)}
        
        while not open_set.empty():
            current = open_set.get()[1]
            
            if current == goal:
                return self.reconstruct_path(current)
            
            for neighbor in self.get_neighbors(current):
                tentative_g = g_score[current] + self.distance(current, neighbor)
                
                if tentative_g < g_score.get(neighbor, float('inf')):
                    g_score[neighbor] = tentative_g
                    f_score[neighbor] = tentative_g + self.heuristic(neighbor, goal)
                    open_set.put((f_score[neighbor], neighbor))
        
        return None  # 경로 없음
    
    def heuristic(self, node, goal):
        # 유클리드 거리
        return sqrt((node[0] - goal[0])**2 + (node[1] - goal[1])**2)`}</pre>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">
              <Navigation className="inline w-5 h-5 mr-2" />
              RRT* 알고리즘
            </h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# RRT* (Rapidly-exploring Random Tree)
class RRTStar:
    def __init__(self, start, goal, obstacle_map):
        self.start = start
        self.goal = goal
        self.obstacle_map = obstacle_map
        self.tree = [start]
        
    def plan(self, max_iter=1000):
        for i in range(max_iter):
            # 랜덤 샘플링
            rand_point = self.sample_random_point()
            
            # 가장 가까운 노드 찾기
            nearest = self.find_nearest(rand_point)
            
            # 새 노드 생성
            new_node = self.steer(nearest, rand_point)
            
            if self.collision_free(nearest, new_node):
                # 가까운 노드들 중 최적 부모 선택
                near_nodes = self.find_near_nodes(new_node)
                parent = self.choose_best_parent(new_node, near_nodes)
                
                self.tree.append(new_node)
                self.parent[new_node] = parent
                
                # 트리 재배선
                self.rewire(new_node, near_nodes)
                
                if self.distance(new_node, self.goal) < self.goal_threshold:
                    return self.extract_path(new_node)
        
        return None`}</pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ⚡ 동적 장애물 회피
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Dynamic Window Approach (DWA)</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# 실시간 동적 장애물 회피
class DynamicWindowApproach:
    def __init__(self, robot_config):
        self.max_speed = robot_config.max_speed
        self.max_angular_speed = robot_config.max_angular_speed
        self.acceleration_limit = robot_config.acceleration_limit
    
    def plan(self, current_state, goal, obstacles):
        # 현재 속도에서 도달 가능한 속도 윈도우 계산
        v_min = max(0, current_state.v - self.acceleration_limit * dt)
        v_max = min(self.max_speed, current_state.v + self.acceleration_limit * dt)
        
        w_min = max(-self.max_angular_speed, current_state.w - self.angular_acc_limit * dt)
        w_max = min(self.max_angular_speed, current_state.w + self.angular_acc_limit * dt)
        
        best_cmd = None
        best_score = float('-inf')
        
        # 속도 윈도우 내에서 최적 명령 탐색
        for v in np.arange(v_min, v_max, 0.1):
            for w in np.arange(w_min, w_max, 0.1):
                # 미래 궤적 시뮬레이션
                trajectory = self.simulate_trajectory(current_state, v, w)
                
                # 충돌 체크
                if self.collision_free(trajectory, obstacles):
                    # 목표 도달, 속도, 장애물 거리 등을 고려한 점수
                    score = self.evaluate_trajectory(trajectory, goal, obstacles)
                    
                    if score > best_score:
                        best_score = score
                        best_cmd = (v, w)
        
        return best_cmd`}</pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🎛️ 차량 제어 시스템
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">PID 제어기</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# 종방향 속도 제어
class LongitudinalPIDController:
    def __init__(self, Kp, Ki, Kd):
        self.Kp = Kp  # 비례 게인
        self.Ki = Ki  # 적분 게인  
        self.Kd = Kd  # 미분 게인
        self.prev_error = 0
        self.integral = 0
    
    def control(self, target_speed, current_speed, dt):
        error = target_speed - current_speed
        
        # 비례항
        P = self.Kp * error
        
        # 적분항 (누적 오차)
        self.integral += error * dt
        I = self.Ki * self.integral
        
        # 미분항 (오차 변화율)
        derivative = (error - self.prev_error) / dt
        D = self.Kd * derivative
        
        # 제어 입력 (가속/감속 명령)
        control_input = P + I + D
        self.prev_error = error
        
        return np.clip(control_input, -1.0, 1.0)`}</pre>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">MPC (Model Predictive Control)</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# 횡방향 조향 제어
class LateralMPCController:
    def __init__(self, prediction_horizon):
        self.N = prediction_horizon  # 예측 구간
        
    def control(self, current_state, reference_path):
        # 비용 함수 정의
        def cost_function(u_sequence):
            x = current_state
            cost = 0
            
            for i in range(self.N):
                # 차량 동역학 모델로 다음 상태 예측
                x_next = self.vehicle_model(x, u_sequence[i])
                
                # 경로 추종 오차
                path_error = self.path_tracking_error(x_next, reference_path[i])
                
                # 제어 입력 패널티
                control_penalty = u_sequence[i]**2
                
                cost += path_error + 0.1 * control_penalty
                x = x_next
            
            return cost
        
        # 최적화 문제 해결
        result = minimize(cost_function, 
                         x0=np.zeros(self.N),  # 초기 추정값
                         bounds=[(-0.5, 0.5)] * self.N)  # 조향각 제한
        
        return result.x[0]  # 첫 번째 제어 입력만 적용`}</pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚗 차량 동역학 모델
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Kinematic Bicycle Model</h4>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# 차량 운동학 모델 (저속용)
def kinematic_bicycle_model(state, control_input, dt):
    """
    state: [x, y, theta, v]  # 위치, 방향, 속도
    control_input: [a, delta]  # 가속도, 조향각
    """
    x, y, theta, v = state
    a, delta = control_input
    
    # 차량 파라미터
    L = 2.7  # 축간 거리 (wheelbase)
    
    # 운동학 방정식
    x_dot = v * cos(theta)
    y_dot = v * sin(theta)
    theta_dot = (v / L) * tan(delta)
    v_dot = a
    
    # 오일러 적분으로 다음 상태 계산
    x_next = x + x_dot * dt
    y_next = y + y_dot * dt
    theta_next = theta + theta_dot * dt
    v_next = v + v_dot * dt
    
    return [x_next, y_next, theta_next, v_next]

# 동역학 모델 (고속용) - 타이어 힘, 공기저항 등 고려
def dynamic_bicycle_model(state, control_input, dt):
    x, y, theta, v, beta, theta_dot = state  # 추가: 슬립각, 각속도
    
    # 타이어 특성, 공기 저항, 질량 등을 고려한 복잡한 모델
    # ... (상세 구현)`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          🧠 의사결정 시스템
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">
              Behavior Planning
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              차선 변경, 추월, 합류 등 고수준 행동 결정
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
              Motion Planning
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              구체적인 궤적 생성과 시공간 경로 계획
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">
              Control Execution
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              실제 액추에이터 제어 신호 생성
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter5() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          V2X 통신과 스마트 인프라
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Vehicle-to-Everything (V2X) 통신은 자율주행의 완성체입니다. 차량이 다른 차량, 인프라,
            보행자와 실시간으로 정보를 주고받아 더 안전하고 효율적인 교통 시스템을 구현합니다.
            5G 기반 C-V2X로 진화하며 스마트시티의 핵심 기술이 되고 있습니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          📡 V2X 통신 유형
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Car className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h4 className="font-bold text-gray-900 dark:text-white">V2V</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Vehicle-to-Vehicle
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <li>• 위치, 속도, 방향 공유</li>
              <li>• 긴급 브레이킹 알림</li>
              <li>• 협력 주행</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Wifi className="w-8 h-8 text-green-600 dark:text-green-400" />
              <h4 className="font-bold text-gray-900 dark:text-white">V2I</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Vehicle-to-Infrastructure
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <li>• 신호등 상태 정보</li>
              <li>• 도로 상황 업데이트</li>
              <li>• 교통 최적화</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <h4 className="font-bold text-gray-900 dark:text-white">V2P</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Vehicle-to-Pedestrian
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <li>• 보행자 위치 감지</li>
              <li>• 횡단보도 안전</li>
              <li>• 스마트폰 연동</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              <h4 className="font-bold text-gray-900 dark:text-white">V2N</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Vehicle-to-Network
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <li>• 클라우드 서비스</li>
              <li>• 교통 관제 센터</li>
              <li>• 빅데이터 분석</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🏗️ 5G C-V2X 아키텍처
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">통신 스택 구조</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# C-V2X 프로토콜 스택
class CV2XStack:
    def __init__(self):
        # 응용 계층
        self.applications = {
            'cooperative_awareness': CAMService(),
            'decentralized_notification': DENMService(),
            'basic_safety': BSMService()
        }
        
        # 전송 계층
        self.transport = {
            'geonetworking': GeoNetworking(),
            'btp': BTP()  # Basic Transport Protocol
        }
        
        # 액세스 계층
        self.access = {
            'pc5': PC5Interface(),  # Direct communication
            'uu': UuInterface()     # Network communication
        }
    
    def send_cam_message(self, vehicle_state):
        # Cooperative Awareness Message
        cam = {
            'station_id': self.vehicle_id,
            'position': vehicle_state.position,
            'speed': vehicle_state.speed,
            'heading': vehicle_state.heading,
            'timestamp': time.time()
        }
        
        # 지리적 멀티캐스트로 근거리 차량들에게 전송
        self.transport['geonetworking'].geocast(
            cam, 
            area_of_interest=Circle(vehicle_state.position, radius=300)
        )`}</pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚦 스마트 교통 인프라
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">적응형 신호 제어</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# 실시간 교통 상황 기반 신호 최적화
class AdaptiveTrafficControl:
    def __init__(self):
        self.traffic_detector = TrafficDetector()
        self.signal_optimizer = SignalOptimizer()
        
    def optimize_signals(self, intersection_id):
        # 각 방향별 교통량 측정
        traffic_data = self.traffic_detector.get_current_traffic()
        
        # 대기 큐 길이 계산
        queue_lengths = {}
        for direction in ['north', 'south', 'east', 'west']:
            queue_lengths[direction] = self.calculate_queue_length(
                traffic_data[direction]
            )
        
        # 최적 신호 시간 계산
        optimal_timing = self.signal_optimizer.optimize(
            queue_lengths,
            constraints={
                'min_green_time': 10,  # 최소 녹색등 시간
                'max_cycle_time': 120,  # 최대 사이클 시간
                'pedestrian_time': 8   # 보행자 신호 시간
            }
        )
        
        return optimal_timing`}</pre>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">교통 흐름 예측</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# LSTM 기반 교통 흐름 예측
class TrafficFlowPredictor:
    def __init__(self):
        self.model = nn.LSTM(
            input_size=4,  # 속도, 밀도, 유량, 점유율
            hidden_size=64,
            num_layers=2,
            batch_first=True
        )
        self.output_layer = nn.Linear(64, 1)
    
    def predict_traffic_flow(self, historical_data):
        # 과거 30분 데이터로 다음 15분 예측
        with torch.no_grad():
            lstm_out, _ = self.model(historical_data)
            prediction = self.output_layer(lstm_out[:, -1, :])
        
        return prediction
    
    def preemptive_signal_control(self, predicted_flow):
        # 예측된 교통량에 따라 사전 신호 조정
        if predicted_flow > self.congestion_threshold:
            return self.implement_congestion_strategy()
        else:
            return self.implement_normal_strategy()`}</pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🤝 협력 주행 (Cooperative Driving)
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">차량 군집 주행 (Platooning)</h4>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# 자동 군집 주행 시스템
class VehiclePlatooning:
    def __init__(self, vehicle_id):
        self.vehicle_id = vehicle_id
        self.platoon_members = []
        self.leader_id = None
        
    def join_platoon(self, leader_vehicle):
        # 군집 합류 프로토콜
        join_request = {
            'type': 'PLATOON_JOIN_REQUEST',
            'vehicle_id': self.vehicle_id,
            'capabilities': self.get_vehicle_capabilities(),
            'desired_position': self.calculate_optimal_position()
        }
        
        # V2V 통신으로 리더에게 요청 전송
        response = self.send_v2v_message(leader_vehicle, join_request)
        
        if response['status'] == 'ACCEPTED':
            self.leader_id = leader_vehicle
            self.follow_leader()
    
    def follow_leader(self):
        while self.in_platoon:
            # 리더로부터 주행 정보 수신
            leader_state = self.receive_leader_state()
            
            # 최적 간격 유지 (CACC: Cooperative Adaptive Cruise Control)
            target_gap = self.calculate_safe_gap(leader_state.speed)
            current_gap = self.measure_gap_to_leader()
            
            # 제어 명령 계산
            acceleration = self.cacc_controller(target_gap, current_gap)
            self.apply_control(acceleration, leader_state.steering)
            
            time.sleep(0.1)  # 10Hz 제어 주기`}</pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🔒 사이버보안과 프라이버시
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3">
              🛡️ 보안 위협
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>메시지 위조:</strong> 가짜 교통 정보 주입</li>
              <li>• <strong>중간자 공격:</strong> V2V 통신 가로채기</li>
              <li>• <strong>서비스 거부:</strong> 통신 채널 마비</li>
              <li>• <strong>프라이버시 침해:</strong> 위치 추적</li>
              <li>• <strong>차량 하이재킹:</strong> 원격 제어 탈취</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-3">
              🔐 보안 대책
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>PKI 인증:</strong> 디지털 인증서 기반</li>
              <li>• <strong>메시지 서명:</strong> 무결성 보장</li>
              <li>• <strong>익명화:</strong> 위치 프라이버시 보호</li>
              <li>• <strong>침입 탐지:</strong> 실시간 위협 모니터링</li>
              <li>• <strong>보안 업데이트:</strong> OTA 펌웨어 업데이트</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          🌏 글로벌 표준화 현황
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
              🇺🇸 미국 (DSRC)
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              5.9GHz 대역, IEEE 802.11p 기반
            </p>
            <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
              →C-V2X로 전환 중
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">
              🇪🇺 유럽 (C-ITS)
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              ETSI 표준, Hybrid 접근법
            </p>
            <div className="mt-2 text-xs text-green-600 dark:text-green-400">
              DSRC + C-V2X 병행
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">
              🇨🇳 중국 (C-V2X)
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              5G 기반, 국가 주도 표준화
            </p>
            <div className="mt-2 text-xs text-red-600 dark:text-red-400">
              상용화 선도
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// 나머지 챕터들은 비슷한 패턴으로 구현...
function Chapter6() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          시뮬레이션과 검증
        </h2>
        
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            자율주행 개발에서 시뮬레이션은 필수입니다. 실제 도로에서 위험한 시나리오를 무제한 테스트하고,
            수백만 마일의 주행 데이터를 단시간에 생성할 수 있습니다. CARLA, AirSim 등 업계 표준 시뮬레이터를
            활용한 체계적인 검증 방법론을 학습합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🏎️ CARLA 시뮬레이터
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">
              <TestTube className="inline w-5 h-5 mr-2" />
              CARLA 아키텍처
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">Server</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Unreal Engine 4 기반 3D 시뮬레이션 환경
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">Client</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Python API로 제어하는 자율주행 에이전트
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">Sensors</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  RGB/Depth 카메라, LiDAR, 레이더, GPS, IMU
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">
              <Navigation className="inline w-5 h-5 mr-2" />
              제공 맵
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">Town01</span>
                <span className="text-xs text-gray-500">간단한 도시</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">Town02</span>
                <span className="text-xs text-gray-500">고속도로</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">Town03</span>
                <span className="text-xs text-gray-500">대도시</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">Town04</span>
                <span className="text-xs text-gray-500">무한 루프</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">Town05</span>
                <span className="text-xs text-gray-500">교차로 중심</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          💻 CARLA 기본 사용법
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">환경 설정 및 차량 생성</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`import carla
import random
import time

# CARLA 서버 연결
client = carla.Client('localhost', 2000)
client.set_timeout(10.0)

# 세계 객체 가져오기
world = client.get_world()
blueprint_library = world.get_blueprint_library()

# 차량 블루프린트 선택
vehicle_bp = blueprint_library.filter('vehicle.tesla.model3')[0]

# 스폰 포인트 랜덤 선택
spawn_points = world.get_map().get_spawn_points()
spawn_point = random.choice(spawn_points)

# 차량 생성
vehicle = world.spawn_actor(vehicle_bp, spawn_point)
print(f"차량 생성 완료: {vehicle.type_id} at {spawn_point.location}")`}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">센서 부착 및 데이터 수집</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# RGB 카메라 센서 설정
camera_bp = blueprint_library.find('sensor.camera.rgb')
camera_bp.set_attribute('image_size_x', '1920')
camera_bp.set_attribute('image_size_y', '1080')
camera_bp.set_attribute('fov', '90')

# 카메라를 차량에 부착
camera_transform = carla.Transform(
    carla.Location(x=2.5, z=0.7),  # 차량 앞쪽 2.5m, 높이 0.7m
    carla.Rotation(pitch=0)
)
camera_sensor = world.spawn_actor(camera_bp, camera_transform, attach_to=vehicle)

# 이미지 수신 콜백 함수
def process_image(image):
    # 이미지를 numpy 배열로 변환
    array = np.frombuffer(image.raw_data, dtype=np.uint8)
    array = array.reshape((image.height, image.width, 4))  # RGBA
    array = array[:, :, :3]  # RGB만 사용
    
    # 여기서 이미지 처리 (객체 인식, 세그멘테이션 등)
    processed_image = your_ai_model.process(array)
    
    return processed_image

# 센서 데이터 수신 시작
camera_sensor.listen(process_image)`}</pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🧪 시나리오 기반 테스트
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">위험 시나리오 생성</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# 갑작스런 끼어들기 시나리오
def create_cut_in_scenario(world, ego_vehicle):
    # NPC 차량 생성
    npc_bp = blueprint_library.filter('vehicle.*')[0]
    
    # 자차 옆 차선에 NPC 배치
    ego_location = ego_vehicle.get_location()
    npc_spawn = carla.Transform(
        carla.Location(
            x=ego_location.x - 10,  # 뒤쪽 10m
            y=ego_location.y + 3.5,  # 옆 차선
            z=ego_location.z
        )
    )
    
    npc_vehicle = world.spawn_actor(npc_bp, npc_spawn)
    
    # 끼어들기 행동 스크립트
    def cut_in_behavior():
        time.sleep(2)  # 2초 후 끼어들기 시작
        
        # 급작스런 차선 변경
        control = carla.VehicleControl(
            throttle=0.6,
            steer=-0.3,  # 왼쪽으로 급격한 조향
            brake=0.0
        )
        npc_vehicle.apply_control(control)
    
    return npc_vehicle, cut_in_behavior`}</pre>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">날씨 조건 변경</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-x-auto">
{`# 다양한 날씨 조건 테스트
def test_weather_conditions(world):
    weather_presets = [
        # 맑은 날씨
        carla.WeatherParameters(
            cloudiness=10.0,
            precipitation=0.0,
            sun_altitude_angle=70.0
        ),
        
        # 비오는 날씨
        carla.WeatherParameters(
            cloudiness=80.0,
            precipitation=50.0,
            precipitation_deposits=50.0,
            wind_intensity=10.0
        ),
        
        # 안개 낀 날씨
        carla.WeatherParameters(
            cloudiness=100.0,
            fog_density=50.0,
            fog_distance=10.0
        ),
        
        # 밤 시간
        carla.WeatherParameters(
            sun_altitude_angle=-90.0,
            street_lights=100.0
        )
    ]
    
    for weather in weather_presets:
        world.set_weather(weather)
        # 각 날씨에서 자율주행 테스트 실행
        run_autonomous_test()
        time.sleep(60)  # 1분간 테스트`}</pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ✈️ AirSim 시뮬레이터
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">AirSim vs CARLA</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h5 className="font-bold text-green-700 dark:text-green-400 mb-2">AirSim 장점</h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Microsoft 개발, 안정성 높음</li>
                    <li>• 드론/항공기 시뮬레이션 특화</li>
                    <li>• Unreal/Unity 엔진 지원</li>
                    <li>• ROS 통합 우수</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h5 className="font-bold text-blue-700 dark:text-blue-400 mb-2">CARLA 장점</h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• 자율주행 전용 설계</li>
                    <li>• 풍부한 시나리오 API</li>
                    <li>• 활발한 커뮤니티</li>
                    <li>• 실제 센서 모델링 정확</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          🔬 Hardware-in-the-Loop (HIL) 테스트
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">
              Software-in-the-Loop
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              완전 가상 환경에서 소프트웨어만 테스트
            </p>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-2">
              Hardware-in-the-Loop
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              실제 ECU와 가상 환경을 연결하여 테스트
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">
              Vehicle-in-the-Loop
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              실제 차량과 가상 환경을 연결한 최종 테스트
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter7() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          전동화와 배터리 관리
        </h2>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            자율주행의 미래는 전동화와 함께합니다. Tesla, BYD, 현대차의 EV 혁신부터 차세대 배터리 기술,
            무선 충전까지 - 지속가능한 모빌리티를 위한 핵심 기술들을 학습합니다.
            특히 BMS(Battery Management System)는 안전하고 효율적인 EV 운영의 핵심입니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🔋 EV 파워트레인 시스템
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">
              <Battery className="inline w-5 h-5 mr-2" />
              EV 구성 요소
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">1</div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">배터리 팩</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">리튬이온, 고체전해질, 나트륨이온</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400">2</div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">인버터</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">DC→AC 변환, SiC 반도체 사용</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-400">3</div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">모터</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">PMSM, BLDC, 인휠 모터</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-xs font-bold text-orange-600 dark:text-orange-400">4</div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">충전 시스템</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AC/DC 충전, 무선 충전</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">
              <Zap className="inline w-5 h-5 mr-2" />
              주요 EV 제조사 비교
            </h4>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-red-600 dark:text-red-400">Tesla</span>
                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded">4680 셀</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">에너지 밀도: 296 Wh/kg</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400">BYD</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">Blade</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">안전성 특화: LFP 기반</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-green-600 dark:text-green-400">현대차</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">E-GMP</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">초고속 충전: 18분 80%</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🧠 BMS (Battery Management System)
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">배터리 상태 추정 알고리즘</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# SOC (State of Charge) 추정 - Kalman Filter 기반
class SOCEstimator:
    def __init__(self):
        # 칼만 필터 초기화
        self.x = np.array([1.0])  # 초기 SOC = 100%
        self.P = np.array([[0.1]])  # 초기 오차 공분산
        self.Q = np.array([[1e-5]])  # 프로세스 노이즈
        self.R = np.array([[0.01]])  # 측정 노이즈
        
    def predict(self, current, dt):
        """전류 적분으로 SOC 예측"""
        coulomb_efficiency = 0.99
        capacity = 75000  # 75kWh = 75,000Wh
        
        # SOC 변화량 계산
        dsoc = -(current * dt * coulomb_efficiency) / capacity
        
        # 상태 예측
        self.x[0] += dsoc
        self.P[0,0] += self.Q[0,0]
        
    def update(self, voltage_measurement):
        """전압 측정값으로 SOC 보정"""
        # OCV-SOC 룩업 테이블에서 예상 전압 계산
        predicted_voltage = self.ocv_lookup(self.x[0])
        
        # 칼만 필터 업데이트
        innovation = voltage_measurement - predicted_voltage
        S = self.P[0,0] + self.R[0,0]
        K = self.P[0,0] / S
        
        self.x[0] += K * innovation
        self.P[0,0] *= (1 - K)
        
        return self.x[0]  # 추정된 SOC 반환
    
    def ocv_lookup(self, soc):
        """SOC에 따른 개방전압(OCV) 계산"""
        # 실제로는 배터리별 특성 데이터 사용
        return 3.2 + 0.8 * soc  # 간단한 선형 모델`}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">배터리 안전 관리</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# 배터리 안전 감시 시스템
class BatterySafetyManager:
    def __init__(self):
        self.safety_limits = {
            'voltage_max': 4.2,      # 셀당 최대 전압 (V)
            'voltage_min': 2.5,      # 셀당 최소 전압 (V)
            'temp_max': 60,          # 최대 온도 (°C)
            'temp_min': -20,         # 최소 온도 (°C)
            'current_max': 200,      # 최대 전류 (A)
        }
        
    def check_safety(self, cell_voltages, temperatures, current):
        """실시간 안전 상태 체크"""
        alarms = []
        
        # 전압 체크
        for i, voltage in enumerate(cell_voltages):
            if voltage > self.safety_limits['voltage_max']:
                alarms.append(f"Cell {i}: Overvoltage {voltage:.2f}V")
                self.emergency_action('overvoltage', i)
            elif voltage < self.safety_limits['voltage_min']:
                alarms.append(f"Cell {i}: Undervoltage {voltage:.2f}V")
                self.emergency_action('undervoltage', i)
        
        # 온도 체크
        for i, temp in enumerate(temperatures):
            if temp > self.safety_limits['temp_max']:
                alarms.append(f"Module {i}: Overtemp {temp:.1f}°C")
                self.emergency_action('overtemp', i)
        
        # 전류 체크
        if abs(current) > self.safety_limits['current_max']:
            alarms.append(f"Overcurrent {current:.1f}A")
            self.emergency_action('overcurrent')
            
        return alarms
    
    def emergency_action(self, fault_type, module_id=None):
        """비상 상황 대응"""
        if fault_type in ['overvoltage', 'overtemp']:
            # 즉시 충전 중단
            self.stop_charging()
            # 해당 모듈 격리
            if module_id is not None:
                self.isolate_module(module_id)
        
        elif fault_type == 'overcurrent':
            # 전류 제한
            self.limit_current(self.safety_limits['current_max'] * 0.8)
        
        # 경고 신호 전송
        self.send_warning_to_vehicle_system(fault_type)`}</pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ⚡ 충전 기술
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">유선 충전</h4>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h5 className="font-bold text-blue-700 dark:text-blue-400 mb-2">DC 급속 충전</h5>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>CCS1/2:</span>
                    <span>최대 350kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CHAdeMO:</span>
                    <span>최대 400kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tesla SC:</span>
                    <span>최대 250kW</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h5 className="font-bold text-green-700 dark:text-green-400 mb-2">AC 완속 충전</h5>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Type 1:</span>
                    <span>최대 7kW (미국)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type 2:</span>
                    <span>최대 22kW (유럽)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>가정용:</span>
                    <span>3.3-11kW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">무선 충전 (WPT)</h4>
            <div className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h5 className="font-bold text-purple-700 dark:text-purple-400 mb-2">전자기 유도 방식</h5>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  • 주파수: 85kHz (SAE J2954)<br/>
                  • 효율: 90-95%<br/>
                  • 거리: 10-25cm<br/>
                  • 전력: 3.7-22kW
                </div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h5 className="font-bold text-orange-700 dark:text-orange-400 mb-2">동적 무선 충전</h5>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  • 주행 중 충전 가능<br/>
                  • 도로 매설형 송신부<br/>
                  • 100kW급 고출력 개발 중<br/>
                  • 2030년 상용화 목표
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🌡️ 배터리 열관리 시스템
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">냉각 시스템 종류</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h5 className="font-bold text-blue-700 dark:text-blue-400 mb-2">공랭식</h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• 구조 간단</li>
                    <li>• 저비용</li>
                    <li>• 냉각 효율 제한</li>
                    <li>• 소형 배터리 적합</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h5 className="font-bold text-green-700 dark:text-green-400 mb-2">수랭식</h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• 높은 냉각 효율</li>
                    <li>• 정밀한 온도 제어</li>
                    <li>• 복잡한 시스템</li>
                    <li>• 대용량 배터리 필수</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h5 className="font-bold text-purple-700 dark:text-purple-400 mb-2">직접 냉각</h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• 절연 냉매 사용</li>
                    <li>• 최고 냉각 성능</li>
                    <li>• 미래 기술</li>
                    <li>• 개발 단계</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          🔮 차세대 배터리 기술
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6">
            <h4 className="font-bold text-yellow-700 dark:text-yellow-400 mb-3">
              🔥 고체전해질 배터리
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>에너지 밀도:</strong> 500Wh/kg 이상</li>
              <li>• <strong>안전성:</strong> 화재 위험 없음</li>
              <li>• <strong>수명:</strong> 100만km 이상</li>
              <li>• <strong>상용화:</strong> 2027-2030년</li>
              <li>• <strong>주요 기업:</strong> Toyota, Samsung SDI</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-3">
              ⚡ 나트륨이온 배터리
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>원료:</strong> 풍부한 나트륨 사용</li>
              <li>• <strong>비용:</strong> 30-40% 저렴</li>
              <li>• <strong>안전성:</strong> 높은 열 안정성</li>
              <li>• <strong>상용화:</strong> 2024년 시작</li>
              <li>• <strong>주요 기업:</strong> CATL, BYD</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

function Chapter8() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          MaaS와 미래 모빌리티
        </h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Mobility as a Service(MaaS)는 단순한 이동 수단을 넘어 통합된 모빌리티 생태계를 의미합니다.
            자율주행, 공유 모빌리티, UAM(도심항공모빌리티), 하이퍼루프까지 - 도시 교통의 패러다임을
            완전히 바꿀 혁신적인 미래 모빌리티 서비스들을 탐구합니다.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚌 MaaS 플랫폼 아키텍처
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">
              <Navigation className="inline w-5 h-5 mr-2" />
              MaaS 레벨
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">0</div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">No Integration</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">독립적인 교통 서비스</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">1</div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Information Integration</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">여행 정보 통합 제공</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400">2</div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Booking Integration</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">통합 예약 플랫폼</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-400">3</div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Payment Integration</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">통합 요금 결제</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-xs font-bold text-red-600 dark:text-red-400">4</div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Full Integration</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">완전 통합 생태계</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">
              <Cpu className="inline w-5 h-5 mr-2" />
              핵심 구성 요소
            </h4>
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <span className="font-bold text-blue-700 dark:text-blue-400">여행 계획 엔진</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">최적 경로, 시간, 비용 계산</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <span className="font-bold text-green-700 dark:text-green-400">실시간 데이터</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">교통 상황, 지연 정보</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                <span className="font-bold text-purple-700 dark:text-purple-400">결제 시스템</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">멀티 모달 통합 결제</p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                <span className="font-bold text-orange-700 dark:text-orange-400">사용자 인터페이스</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">앱, 웹, 음성 인터페이스</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚁 도심항공모빌리티 (UAM)
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">eVTOL 항공기 유형</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h5 className="font-bold text-purple-600 dark:text-purple-400 mb-2">멀티로터</h5>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <div>• 구조: 4-8개 로터</div>
                    <div>• 장점: 간단한 제어</div>
                    <div>• 단점: 효율성 낮음</div>
                    <div>• 예시: EHang AAV</div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h5 className="font-bold text-blue-600 dark:text-blue-400 mb-2">틸트로터</h5>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <div>• 구조: 회전 가능 로터</div>
                    <div>• 장점: 높은 순항 효율</div>
                    <div>• 단점: 복잡한 기구</div>
                    <div>• 예시: Joby Aviation</div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h5 className="font-bold text-green-600 dark:text-green-400 mb-2">틸트윙</h5>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <div>• 구조: 회전 가능 날개</div>
                    <div>• 장점: 최고 효율</div>
                    <div>• 단점: 제어 복잡</div>
                    <div>• 예시: Lilium Jet</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">UAM 운항 관리 시스템</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
{`# UAM Traffic Management (UTM) 시스템
class UTMSystem:
    def __init__(self):
        self.active_flights = {}
        self.air_corridors = self.load_corridor_map()
        self.weather_service = WeatherService()
        self.conflict_detector = ConflictDetector()
        
    def plan_flight(self, origin, destination, departure_time):
        """UAM 비행 계획 수립"""
        # 최적 경로 계산 (3D 공간)
        route = self.calculate_optimal_route(
            origin, destination,
            constraints={
                'noise_zones': self.get_noise_restricted_areas(),
                'building_heights': self.get_building_data(),
                'weather': self.weather_service.get_forecast(departure_time),
                'traffic_density': self.get_traffic_density(departure_time)
            }
        )
        
        # 충돌 위험 분석
        conflicts = self.conflict_detector.analyze_route(route, departure_time)
        
        if conflicts:
            # 대안 경로 생성
            alternative_routes = self.generate_alternatives(route, conflicts)
            return self.select_best_route(alternative_routes)
        
        return route
    
    def real_time_monitoring(self, flight_id):
        """실시간 비행 감시"""
        flight = self.active_flights[flight_id]
        
        # GPS 위치 추적
        current_position = flight.get_position()
        
        # 예정 경로와 비교
        deviation = self.calculate_deviation(current_position, flight.planned_route)
        
        if deviation > self.safety_threshold:
            # 경로 재계획
            new_route = self.replan_route(flight, current_position)
            flight.update_route(new_route)
            
            # 주변 항공기에 알림
            self.notify_nearby_aircraft(flight_id, new_route)`}</pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🚄 하이퍼루프와 초고속 교통
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">하이퍼루프 기술</h4>
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-1">진공 튜브</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">공기 저항 99% 제거, 1000km/h 가능</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <h5 className="font-bold text-blue-600 dark:text-blue-400 mb-1">자기 부상</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">마찰 없는 추진, 정밀한 위치 제어</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <h5 className="font-bold text-green-600 dark:text-green-400 mb-1">선형 모터</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">전기적 추진, 회생 제동</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                <h5 className="font-bold text-purple-600 dark:text-purple-400 mb-1">스위칭 시스템</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">고속 분기, 네트워크 운영</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">글로벌 프로젝트 현황</h4>
            <div className="space-y-3">
              <div className="border-l-4 border-red-500 pl-3">
                <h5 className="font-bold text-red-600 dark:text-red-400">Virgin Hyperloop</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">라스베이가스 테스트 트랙 운영</p>
                <p className="text-xs text-gray-500">최고 속도: 387km/h 달성</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-3">
                <h5 className="font-bold text-blue-600 dark:text-blue-400">SpaceX</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">Boring Company 터널 프로젝트</p>
                <p className="text-xs text-gray-500">라스베이가스 컨벤션센터 운영</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-3">
                <h5 className="font-bold text-green-600 dark:text-green-400">한국형 하이퍼튜브</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">KRRI 주도 1km 테스트 베드</p>
                <p className="text-xs text-gray-500">목표: 2030년 상용화</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          🌱 지속가능한 모빌리티 생태계
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">탄소 중립 달성 전략</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Battery className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h5 className="font-bold text-green-700 dark:text-green-400 mb-1">전동화</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">2030년 EV 100%</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h5 className="font-bold text-blue-700 dark:text-blue-400 mb-1">재생 에너지</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">태양광, 풍력 충전</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Car className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h5 className="font-bold text-purple-700 dark:text-purple-400 mb-1">공유 모빌리티</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">차량 이용 효율성</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Route className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h5 className="font-bold text-orange-700 dark:text-orange-400 mb-1">최적화</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">AI 기반 경로</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          🚀 미래 모빌리티 로드맵
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 font-bold text-lg">2025</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Level 3 자율주행 확산</h4>
              <p className="text-gray-600 dark:text-gray-400">고속도로 자율주행, UAM 시범 서비스</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded">MaaS Level 2</span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded">EV 30%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">2030</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 dark:text-white">통합 모빌리티 생태계</h4>
              <p className="text-gray-600 dark:text-gray-400">Level 4 자율주행, UAM 상용화, 하이퍼루프 운영</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">MaaS Level 3</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">EV 80%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">2035</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 dark:text-white">완전 자율 모빌리티</h4>
              <p className="text-gray-600 dark:text-gray-400">Level 5 완전 자율주행, 탄소 중립 달성</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded">MaaS Level 4</span>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded">탄소 중립</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}