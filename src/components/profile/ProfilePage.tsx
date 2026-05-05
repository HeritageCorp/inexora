'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, BadgeCheck, Link2, MapPin, Calendar, Grid3X3, List } from 'lucide-react'
import { currentUser, posts, formatNumber } from '@/data/mock'
import PostCard from '@/components/feed/PostCard'
import type { Post } from '@/data/mock'
import Image from 'next/image'

const profilePosts = posts.filter(p => p.author.id === 'u1' || p.author.id === 'u2').slice(0, 4)

export default function ProfilePage() {
  const [feedPosts, setFeedPosts] = useState<Post[]>(profilePosts)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState('Publications')

  const handleLike = (postId: string) => {
    setFeedPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    )
  }

  const tabs = ['Publications', 'Médias', 'J\'aime', 'Favoris']

  return (
    <div className="flex flex-col min-h-full">
      {/* Banner */}
      <div className="relative h-40 sm:h-52 overflow-hidden bg-gradient-to-br from-violet-dim to-cyan-dim">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-dim/80 via-surface to-cyan-dim/60" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-bright/60 rounded-full"
            style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-10, 10], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
        <button className="absolute top-4 right-4 p-2 bg-void/60 rounded-lg backdrop-blur-sm border border-border/50 text-text-secondary hover:text-text-primary transition-colors">
          <Settings size={16} />
        </button>
      </div>

      {/* Profile info */}
      <div className="px-4 pb-4 relative">
        {/* Avatar */}
        <div className="absolute -top-14 left-4">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-void shadow-violet-glow">
            <Image src={currentUser.avatar} alt={currentUser.displayName} fill className="object-cover" />
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-cyan-glow rounded-full border-2 border-void pulse-dot" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-3 gap-2">
          <button className="p-2 border border-border/60 rounded-xl text-text-secondary hover:border-violet-glow/40 hover:text-violet-soft transition-all duration-300">
            <Link2 size={15} />
          </button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFollowing(f => !f)}
            className={`px-4 py-1.5 rounded-xl text-sm font-display font-700 transition-all duration-300 ${
              isFollowing
                ? 'border border-violet-glow/40 text-violet-soft hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/10'
                : 'bg-gradient-to-r from-violet-glow to-cyan-dim text-white hover:shadow-violet-glow'
            }`}
          >
            {isFollowing ? 'Abonné ✓' : 'Suivre'}
          </motion.button>
        </div>

        {/* Name & username */}
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <h1 className="font-display font-800 text-xl text-text-primary">{currentUser.displayName}</h1>
            {currentUser.verified && (
              <BadgeCheck size={18} className="text-violet-bright" fill="currentColor" />
            )}
          </div>
          <p className="text-sm text-text-muted font-mono">@{currentUser.username}</p>
        </div>

        {/* Bio */}
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          {currentUser.bio}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {currentUser.tags.map(tag => (
            <span key={tag} className="text-xs bg-violet-dim/15 text-violet-soft px-2 py-1 rounded-full border border-violet-glow/15 font-mono">
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <MapPin size={12} />
            <span>Paris, France</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Calendar size={12} />
            <span>Depuis janvier 2025</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-5 mt-4">
          {[
            { label: 'Publications', value: formatNumber(currentUser.posts) },
            { label: 'Abonnés', value: formatNumber(currentUser.followers) },
            { label: 'Abonnements', value: formatNumber(currentUser.following) },
          ].map(({ label, value }) => (
            <button key={label} className="text-left hover:text-violet-soft transition-colors group">
              <span className="font-display font-800 text-base text-text-primary group-hover:text-violet-soft transition-colors">{value}</span>
              <span className="text-xs text-text-muted ml-1.5">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-20 border-y border-border/30 bg-void/90 backdrop-blur-xl">
        <div className="flex items-center">
          <div className="flex flex-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-display font-600 relative transition-colors ${
                  activeTab === tab ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="profile-tab"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-violet-glow to-cyan-glow rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-1 pr-4">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'text-violet-bright bg-violet-glow/10' : 'text-text-muted'}`}
            >
              <List size={15} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'text-violet-bright bg-violet-glow/10' : 'text-text-muted'}`}
            >
              <Grid3X3 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="flex-1 pb-20 lg:pb-0">
        {viewMode === 'list' ? (
          feedPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <PostCard post={post} onLike={handleLike} />
            </motion.div>
          ))
        ) : (
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {feedPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="relative aspect-square bg-panel overflow-hidden group cursor-pointer"
              >
                {post.image ? (
                  <Image src={post.image} alt="" fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-3 bg-gradient-to-br from-violet-dim/20 to-surface">
                    <p className="text-[10px] text-text-muted text-center line-clamp-4 leading-relaxed">{post.content}</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-void/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs text-white font-mono">❤ {formatNumber(post.likes)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
