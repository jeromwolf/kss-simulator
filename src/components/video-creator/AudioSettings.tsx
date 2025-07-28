'use client';

import React, { useState } from 'react';
import { Volume2, Mic, Music, Settings } from 'lucide-react';

interface AudioSettingsProps {
  onSettingsChange: (settings: AudioSettings) => void;
}

export interface AudioSettings {
  narrationEnabled: boolean;
  narrationVoice: 'male' | 'female';
  narrationSpeed: number;
  backgroundMusicEnabled: boolean;
  backgroundMusicVolume: number;
  soundEffectsEnabled: boolean;
  soundEffectsVolume: number;
}

export const AudioSettingsPanel: React.FC<AudioSettingsProps> = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState<AudioSettings>({
    narrationEnabled: true,
    narrationVoice: 'female',
    narrationSpeed: 1.0,
    backgroundMusicEnabled: true,
    backgroundMusicVolume: 0.3,
    soundEffectsEnabled: true,
    soundEffectsVolume: 0.5,
  });

  const updateSettings = (updates: Partial<AudioSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Volume2 className="w-5 h-5" />
        오디오 설정
      </h2>

      {/* 내레이션 설정 */}
      <div className="space-y-4">
        <div className="border-b pb-4">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              <span className="font-medium">내레이션</span>
            </label>
            <input
              type="checkbox"
              checked={settings.narrationEnabled}
              onChange={(e) => updateSettings({ narrationEnabled: e.target.checked })}
              className="w-5 h-5"
            />
          </div>
          
          {settings.narrationEnabled && (
            <div className="space-y-3 ml-6">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">음성 선택</label>
                <select
                  value={settings.narrationVoice}
                  onChange={(e) => updateSettings({ narrationVoice: e.target.value as 'male' | 'female' })}
                  className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="female">여성 (기본)</option>
                  <option value="male">남성</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  속도: {settings.narrationSpeed}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.narrationSpeed}
                  onChange={(e) => updateSettings({ narrationSpeed: parseFloat(e.target.value) })}
                  className="w-full mt-1"
                />
              </div>
            </div>
          )}
        </div>

        {/* 배경음악 설정 */}
        <div className="border-b pb-4">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              <span className="font-medium">배경음악</span>
            </label>
            <input
              type="checkbox"
              checked={settings.backgroundMusicEnabled}
              onChange={(e) => updateSettings({ backgroundMusicEnabled: e.target.checked })}
              className="w-5 h-5"
            />
          </div>
          
          {settings.backgroundMusicEnabled && (
            <div className="ml-6">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                볼륨: {Math.round(settings.backgroundMusicVolume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.backgroundMusicVolume}
                onChange={(e) => updateSettings({ backgroundMusicVolume: parseFloat(e.target.value) })}
                className="w-full mt-1"
              />
            </div>
          )}
        </div>

        {/* 효과음 설정 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="font-medium">효과음</span>
            </label>
            <input
              type="checkbox"
              checked={settings.soundEffectsEnabled}
              onChange={(e) => updateSettings({ soundEffectsEnabled: e.target.checked })}
              className="w-5 h-5"
            />
          </div>
          
          {settings.soundEffectsEnabled && (
            <div className="ml-6">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                볼륨: {Math.round(settings.soundEffectsVolume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.soundEffectsVolume}
                onChange={(e) => updateSettings({ soundEffectsVolume: parseFloat(e.target.value) })}
                className="w-full mt-1"
              />
            </div>
          )}
        </div>
      </div>

      {/* TTS 안내 */}
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 내레이션은 AI 음성 합성(TTS)을 사용합니다. 
          실제 생성 시 자연스러운 한국어 음성으로 변환됩니다.
        </p>
      </div>
    </div>
  );
};