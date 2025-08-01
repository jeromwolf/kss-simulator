'use client'

import { useState, useCallback } from 'react'
import { Upload, FileText, File, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: 'uploading' | 'processing' | 'completed' | 'error'
  chunks?: number
  tokens?: number
  error?: string
}

export default function DocumentUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const processFile = async (file: File) => {
    const fileId = Math.random().toString(36).substring(7)
    const uploadedFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading'
    }

    // 파일 추가
    setFiles(prev => [...prev, uploadedFile])

    // 업로드 시뮬레이션
    setTimeout(() => {
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, status: 'processing' } : f
      ))
    }, 1000)

    // 처리 시뮬레이션
    setTimeout(() => {
      const chunks = Math.floor(Math.random() * 20) + 10
      const tokens = chunks * Math.floor(Math.random() * 200) + 500
      
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'completed', chunks, tokens } 
          : f
      ))
    }, 3000)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    droppedFiles.forEach(file => processFile(file))
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    selectedFiles.forEach(file => processFile(file))
  }

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('word') || type.includes('document')) return '📝'
    if (type.includes('text')) return '📃'
    return '📎'
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging 
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.txt,.md"
          onChange={handleFileSelect}
        />
        
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            파일을 드래그하거나 클릭하여 업로드
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            PDF, Word, TXT, Markdown 지원 (최대 10MB)
          </p>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            업로드된 파일 ({files.length})
          </h3>
          {files.map(file => (
            <div
              key={file.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="text-2xl">{getFileIcon(file.type)}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {file.name}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{formatFileSize(file.size)}</span>
                    {file.chunks && <span>{file.chunks} 청크</span>}
                    {file.tokens && <span>{file.tokens.toLocaleString()} 토큰</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Status */}
                {file.status === 'uploading' && (
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">업로드 중...</span>
                  </div>
                )}
                {file.status === 'processing' && (
                  <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">처리 중...</span>
                  </div>
                )}
                {file.status === 'completed' && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">완료</span>
                  </div>
                )}
                {file.status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">오류</span>
                  </div>
                )}

                {/* Remove button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      {files.filter(f => f.status === 'completed').length > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
            처리 완료 요약
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {files.filter(f => f.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">문서</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {files.reduce((sum, f) => sum + (f.chunks || 0), 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">총 청크</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {files.reduce((sum, f) => sum + (f.tokens || 0), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">총 토큰</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}