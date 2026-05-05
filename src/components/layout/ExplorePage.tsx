'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, Flame, Clock, Users } from 'lucide-react'
import { posts, users, formatNumber } from '@/data/mock'
import Image from 'next/image'

const categories = ['Tout', 'Art & Design', 'Science', 'Technologie', 'Musique', 'Philosophie']

export default function ExplorePage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tout')

  const featured = posts[0]

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-void/80 backdrop-blur-xl border-b border-border/50 px-4 py-3 space-y-3">
        <h1 className="font-display font-800 text-lg gradient-text">Exploration</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={15} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Explorer des idées, des créateurs..."
            className="w-full bg-panel border border-border/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-violet-glow/50 transition-all font-body"
          />
        </div>
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-display font-600 transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-violet-glow text-white shadow-violet-glow'
                  : 'bg-panel border border-border/50 text-text-muted hover:border-violet-glow/40 hover:text-violet-soft'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        {/* Featured post */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={14} className="text-orange-400" />
            <span className="text-xs font-display font-600 text-text-secondary uppercase tracking-wider">En ce moment</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden border border-border/50 group cursor-pointer"
          >
            <div className="relative h-48">
              {featured.image && (
                <Image src={featured.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-violet-glow/40">
                  <Image src={featured.author.avatar} alt="" width={24} height={24} className="object-cover" />
                </div>
                <span className="text-xs font-display font-600 text-violet-soft">{featured.author.displayName}</span>
              </div>
              <p className="text-sm font-display font-700 text-text-primary line-clamp-2 leading-snug">
                {featured.content.split('\n')[0]}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-text-muted font-mono">❤ {formatNumber(featured.likes)}</span>
                <span className="text-xs text-text-muted font-mono">👁 {formatNumber(featured.views)}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trending topics */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-violet-bright" />
            <span className="text-xs font-display font-600 text-text-secondary uppercase tracking-wider">Tendances</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { tag: '#ArtGénératif', count: '12.4k', gradient: 'from-violet-dim/30 to-transparent' },
              { tag: '#ConscienceIA', count: '7.2k', gradient: 'from-cyan-dim/20 to-transparent' },
              { tag: '#CyberÉthique', count: '5.1k', gradient: 'from-violet-dim/20 to-transparent' },
              { tag: '#FuturCode', count: '3.8k', gradient: 'from-cyan-dim/15 to-transparent' },
            ].map((t, i) => (
              <motion.button
                key={t.tag}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className={`p-3 bg-gradient-to-br ${t.gradient} border border-border/50 rounded-xl text-left hover:border-violet-glow/30 transition-all duration-300`}
              >
                <p className="text-sm font-display font-700 text-text-primary">{t.tag}</p>
                <p className="text-xs text-text-muted font-mono mt-0.5">{t.count} publications</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* People to discover */}
        <div className="px-4">
          <div className="flex items-center gap-2 mb-3">
            <Users size={14} className="text-cyan-bright" />
            <span className="text-xs font-display font-600 text-text-secondary uppercase tracking-wider">Créateurs à découvrir</span>
          </div>
          <div className="space-y-3">
            {users.map((user, i) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3 bg-panel border border-border/50 rounded-xl hover:border-violet-glow/20 transition-all duration-300 group"
              >
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border flex-shrink-0">
                  <Image src={user.avatar} alt={user.displayName} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-700 text-sm text-text-primary truncate">
                    {user.displayName}
                    {user.verified && <span className="text-violet-soft ml-1 text-[10px]">✓</span>}
                  </p>
                  <p className="text-xs text-text-muted truncate">{user.bio.split('.')[0]}.</p>
                  <div className="flex gap-2 mt-1">
                    {user.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] text-violet-soft font-mono">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-display font-700 text-text-primary">{formatNumber(user.followers)}</p>
                  <p className="text-[10px] text-text-muted">abonnés</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
