'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { posts as initialPosts } from '@/data/mock'
import type { Post } from '@/data/mock'
import PostCard from './PostCard'
import PostComposer from './PostComposer'
import { Layers, Zap } from 'lucide-react'

const tabs = ['Pour vous', 'Tendances', 'Abonnements']

export default function Feed() {
  const [activeTab, setActiveTab] = useState(0)
  const [feedPosts, setFeedPosts] = useState<Post[]>(initialPosts)

  const handleLike = (postId: string) => {
    setFeedPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    )
  }

  const handleNewPost = (post: Post) => {
    setFeedPosts(prev => [post, ...prev])
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-void/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 pt-4 pb-0">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-violet-bright" fill="currentColor" />
            <h1 className="font-display font-800 text-lg gradient-text">Fil Inexora</h1>
          </div>
          <button className="p-2 text-text-muted hover:text-text-primary transition-colors">
            <Layers size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 relative py-3 text-sm font-display font-600 transition-colors duration-300 ${
                activeTab === i ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {tab}
              {activeTab === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-violet-glow to-cyan-glow rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1 pb-20 lg:pb-0">
        {/* Composer */}
        <PostComposer onPost={handleNewPost} />

        {/* Posts */}
        <AnimatePresence initial={false}>
          {feedPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ delay: i < 6 ? i * 0.08 : 0, duration: 0.4 }}
            >
              <PostCard post={post} onLike={handleLike} />
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="text-center py-12 text-text-muted">
          <div className="inline-flex items-center gap-2 font-mono text-xs">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            Fin du fil
            <div className="w-20 h-px bg-gradient-to-r from-border via-border to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
