'use client'

import { motion } from 'framer-motion'
import { TrendingUp, UserPlus, Search } from 'lucide-react'
import { users, formatNumber } from '@/data/mock'
import Image from 'next/image'
import { ActivePage } from '@/app/page'

const trending = [
  { tag: '#ArtGénératif', posts: 12400 },
  { tag: '#Inexora', posts: 8900 },
  { tag: '#ConscienceIA', posts: 7200 },
  { tag: '#Modular', posts: 5100 },
  { tag: '#CyberEthique', posts: 4300 },
  { tag: '#FuturCode', posts: 3800 },
]

export default function RightPanel({ setActivePage }: { setActivePage: (p: ActivePage) => void }) {
  return (
    <div className="sticky top-0 h-screen overflow-y-auto py-6 px-4 flex flex-col gap-6">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={15} />
        <input
          type="text"
          placeholder="Explorer l'inexorable..."
          className="w-full bg-panel border border-border/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-violet-glow/50 focus:shadow-violet-glow transition-all duration-300 font-body"
        />
      </motion.div>

      {/* Trending */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-panel border border-border/50 rounded-2xl overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
          <TrendingUp size={14} className="text-violet-bright" />
          <h3 className="font-display font-700 text-sm text-text-primary">Tendances</h3>
        </div>
        <div className="divide-y divide-border/30">
          {trending.map((t, i) => (
            <motion.button
              key={t.tag}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-muted/20 transition-colors duration-200 group"
            >
              <div className="text-left">
                <p className="text-xs text-text-muted font-mono">#{i + 1} — Tendance</p>
                <p className="text-sm font-display font-600 text-text-primary group-hover:text-violet-soft transition-colors">
                  {t.tag}
                </p>
              </div>
              <span className="text-[11px] text-text-muted">{formatNumber(t.posts)} posts</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-panel border border-border/50 rounded-2xl overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-border/50">
          <h3 className="font-display font-700 text-sm text-text-primary">Qui suivre</h3>
        </div>
        <div className="divide-y divide-border/30">
          {users.slice(0, 3).map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border flex-shrink-0">
                <Image src={user.avatar} alt={user.displayName} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-display font-600 text-text-primary truncate flex items-center gap-1">
                  {user.displayName}
                  {user.verified && <span className="text-[9px] text-violet-soft">✓</span>}
                </p>
                <p className="text-xs text-text-muted truncate">@{user.username}</p>
              </div>
              <button className="flex-shrink-0 flex items-center gap-1 text-xs font-display font-600 px-3 py-1.5 bg-violet-glow/10 border border-violet-glow/20 text-violet-soft rounded-lg hover:bg-violet-glow/20 transition-all duration-300">
                <UserPlus size={11} />
                Suivre
              </button>
            </motion.div>
          ))}
        </div>
        <button className="w-full text-center text-xs text-violet-soft py-3 hover:text-violet-bright transition-colors font-display">
          Voir plus →
        </button>
      </motion.div>

      {/* Footer */}
      <div className="text-center text-[10px] text-text-muted font-mono leading-relaxed">
        <p>Inexora © 2025</p>
        <p>Conditions · Confidentialité · Cookies</p>
        <p className="mt-1 gradient-text">Le réseau qui pense.</p>
      </div>
    </div>
  )
}
