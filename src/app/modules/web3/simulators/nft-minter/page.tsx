'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Image, Upload, Sparkles, Copy, ExternalLink, Palette, Tag, Grid, Layers } from 'lucide-react'

interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string | number
    max_value?: number
  }>
  external_url?: string
  animation_url?: string
}

interface Collection {
  name: string
  symbol: string
  totalSupply: number
  maxSupply: number
  mintPrice: string
  royalty: number
}

export default function NFTMinterPage() {
  const [activeTab, setActiveTab] = useState<'single' | 'collection' | 'gallery'>('single')
  
  // Single NFT state
  const [nftName, setNftName] = useState('')
  const [nftDescription, setNftDescription] = useState('')
  const [imagePreview, setImagePreview] = useState('/api/placeholder/400/400')
  const [attributes, setAttributes] = useState([
    { trait_type: 'Background', value: 'Gradient' },
    { trait_type: 'Rarity', value: 'Common' }
  ])
  const [mintedTokenId, setMintedTokenId] = useState<number | null>(null)
  const [isMinting, setIsMinting] = useState(false)
  
  // Collection state
  const [collection, setCollection] = useState<Collection>({
    name: '',
    symbol: '',
    totalSupply: 0,
    maxSupply: 10000,
    mintPrice: '0.08',
    royalty: 2.5
  })
  const [collectionImage, setCollectionImage] = useState('/api/placeholder/400/400')
  
  // Gallery state
  const [mintedNFTs] = useState([
    { id: 1, name: 'Cosmic Explorer #1', image: '/api/placeholder/200/200', owner: '0x1234...5678', price: '1.5 ETH' },
    { id: 2, name: 'Digital Dream #42', image: '/api/placeholder/200/200', owner: '0xabcd...efgh', price: '0.8 ETH' },
    { id: 3, name: 'Pixel Art #99', image: '/api/placeholder/200/200', owner: '0x9876...5432', price: '2.0 ETH' }
  ])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In real app, upload to IPFS
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addAttribute = () => {
    setAttributes([...attributes, { trait_type: '', value: '' }])
  }

  const updateAttribute = (index: number, field: 'trait_type' | 'value', value: string) => {
    const newAttributes = [...attributes]
    newAttributes[index][field] = value
    setAttributes(newAttributes)
  }

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index))
  }

  const mintSingleNFT = async () => {
    setIsMinting(true)
    
    // Simulate minting
    setTimeout(() => {
      const tokenId = Math.floor(Math.random() * 10000)
      setMintedTokenId(tokenId)
      setIsMinting(false)
    }, 3000)
  }

  const generateMetadata = (): NFTMetadata => {
    return {
      name: nftName,
      description: nftDescription,
      image: `ipfs://QmXxx.../${nftName.replace(/\s/g, '_')}.png`,
      attributes: attributes.filter(attr => attr.trait_type && attr.value),
      external_url: 'https://example.com/nft'
    }
  }

  const deployCollection = () => {
    // Simulate collection deployment
    setTimeout(() => {
      alert('Collection deployed successfully!')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-indigo-900/10 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/modules/web3"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Web3 & Blockchain으로 돌아가기
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Image className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                NFT 민팅 스튜디오
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                NFT 생성과 메타데이터 관리
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'single'
                  ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400'
                  : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Single NFT
            </button>
            <button
              onClick={() => setActiveTab('collection')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'collection'
                  ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400'
                  : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Collection
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'gallery'
                  ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400'
                  : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Gallery
            </button>
          </div>

          {/* Single NFT Tab */}
          {activeTab === 'single' && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Upload */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">NFT 이미지</h3>
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="NFT Preview"
                    className="w-full aspect-square rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                  <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center cursor-pointer">
                    <div className="text-white text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-sm">클릭하여 업로드</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    파일 요구사항
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 권장 크기: 1000x1000px</li>
                    <li>• 최대 파일 크기: 100MB</li>
                    <li>• 지원 형식: PNG, JPG, GIF, SVG</li>
                    <li>• IPFS에 자동 업로드</li>
                  </ul>
                </div>
              </div>

              {/* NFT Details */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">NFT 정보</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      value={nftName}
                      onChange={(e) => setNftName(e.target.value)}
                      placeholder="My Awesome NFT"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      설명
                    </label>
                    <textarea
                      value={nftDescription}
                      onChange={(e) => setNftDescription(e.target.value)}
                      placeholder="이 NFT에 대한 설명을 입력하세요..."
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  {/* Attributes */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        속성
                      </label>
                      <button
                        onClick={addAttribute}
                        className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                      >
                        + 속성 추가
                      </button>
                    </div>
                    <div className="space-y-2">
                      {attributes.map((attr, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={attr.trait_type}
                            onChange={(e) => updateAttribute(idx, 'trait_type', e.target.value)}
                            placeholder="Trait"
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="text"
                            value={attr.value}
                            onChange={(e) => updateAttribute(idx, 'value', e.target.value)}
                            placeholder="Value"
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <button
                            onClick={() => removeAttribute(idx)}
                            className="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mint Button */}
                  <button
                    onClick={mintSingleNFT}
                    disabled={!nftName || isMinting}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isMinting ? (
                      <>
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        민팅 중...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        NFT 민팅
                      </>
                    )}
                  </button>

                  {/* Minted NFT Info */}
                  {mintedTokenId && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                        민팅 성공! 🎉
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Token ID:</span>
                          <span className="font-mono text-gray-900 dark:text-white">#{mintedTokenId}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Contract:</span>
                          <span className="font-mono text-gray-900 dark:text-white">0x1234...5678</span>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <button className="flex-1 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1">
                            <ExternalLink className="w-4 h-4" />
                            OpenSea
                          </button>
                          <button className="flex-1 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1">
                            <Copy className="w-4 h-4" />
                            Copy URL
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Collection Tab */}
          {activeTab === 'collection' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">컬렉션 설정</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      컬렉션 이름
                    </label>
                    <input
                      type="text"
                      value={collection.name}
                      onChange={(e) => setCollection({ ...collection, name: e.target.value })}
                      placeholder="My NFT Collection"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      심볼
                    </label>
                    <input
                      type="text"
                      value={collection.symbol}
                      onChange={(e) => setCollection({ ...collection, symbol: e.target.value })}
                      placeholder="MNC"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Max Supply
                      </label>
                      <input
                        type="number"
                        value={collection.maxSupply}
                        onChange={(e) => setCollection({ ...collection, maxSupply: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mint Price (ETH)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={collection.mintPrice}
                        onChange={(e) => setCollection({ ...collection, mintPrice: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      로열티: {collection.royalty}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={collection.royalty}
                      onChange={(e) => setCollection({ ...collection, royalty: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <button
                    onClick={deployCollection}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors"
                  >
                    컬렉션 배포
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">컬렉션 프리뷰</h3>
                
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <div className="relative mb-4">
                    <img
                      src={collectionImage}
                      alt="Collection"
                      className="w-full aspect-video rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-2xl font-bold">{collection.name || 'Collection Name'}</h4>
                      <p className="text-sm opacity-90">by Creator</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-xs text-gray-600 dark:text-gray-400">Items</div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {collection.totalSupply} / {collection.maxSupply}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-xs text-gray-600 dark:text-gray-400">Floor Price</div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {collection.mintPrice} ETH
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-xs text-gray-600 dark:text-gray-400">Royalty</div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {collection.royalty}%
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-xs text-gray-600 dark:text-gray-400">Chain</div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        Ethereum
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata JSON */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    메타데이터 JSON
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-48 overflow-y-auto">
                    <pre className="text-xs text-gray-700 dark:text-gray-300">
                      {JSON.stringify(generateMetadata(), null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white">민팅된 NFT</h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <Grid className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <Layers className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mintedNFTs.map((nft) => (
                  <div
                    key={nft.id}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-square">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white text-xs">
                        #{nft.id}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {nft.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                        Owner: {nft.owner}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-purple-600 dark:text-purple-400">
                          {nft.price}
                        </span>
                        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}