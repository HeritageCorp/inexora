'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Eye, Repeat2, BadgeCheck } from 'lucide-react'
import type { Post } from '@/data/mock'
import { formatNumber, formatTimeAgo } from '@/data/mock'
import Image from 'next/image'
import clsx from 'clsx'

export default function PostCard({ post, onLike }: { post: Post; onLike: (id: string) => void }) {
  const [saved, setSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [shareCount, setShareCount] = useState(post.shares)
  const [sharedAnim, setSharedAnim] = useState(false)

  const handleShare = () => {
    setShareCount(s => s + 1)
    setSharedAnim(true)
    setTimeout(() => setSharedAnim(false), 1000)
  }

  return (
    <article className="border-b border-border/30 hover:bg-surface/30 transition-colors duration-200 group">
      <div className="px-4 py-4">
        {/* Author row */}
        <div className="flex items-start gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border flex-shrink-0 mt-0.5">
            <Image src={post.author.avatar} alt={post.author.displayName} fill className="object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Author info */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-display font-700 text-sm text-text-primary truncate">
                  {post.author.displayName}
                </span>
                {post.author.verified && (
                  <BadgeCheck size={14} className="text-violet-bright flex-shrink-0" fill="currentColor" />
                )}
                <span className="text-xs text-text-muted truncate">@{post.author.username}</span>
                <span className="text-xs text-text-muted flex-shrink-0">· {formatTimeAgo(post.timestamp)}</span>
              </div>
              <button className="p-1 text-text-muted hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0">
                <MoreHorizontal size={15} />
              </button>
            </div>

            {/* Content */}
            <p className="mt-2 text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {post.content.split(/(#\w+)/g).map((part, i) =>
                part.startsWith('#') ? (
                  <span key={i} className="text-violet-soft hover:text-violet-bright cursor-pointer transition-colors">
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </p>

            {/* Image */}
            {post.image && (
              <div className="mt-3 rounded-xl overflow-hidden border border-border/50 relative aspect-video">
                <Image
                  src={post.image}
                  alt="Post image"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/20 to-transparent" />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-3 -ml-2">
              {/* Like */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => onLike(post.id)}
                className={clsx(
                  'flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 group/like',
                  post.liked
                    ? 'text-pink-400'
                    : 'text-text-muted hover:text-pink-400 hover:bg-pink-500/10'
                )}
              >
                <motion.div animate={post.liked ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.3 }}>
                  <Heart
                    size={16}
                    className="transition-all"
                    fill={post.liked ? 'currentColor' : 'none'}
                    strokeWidth={post.liked ? 0 : 1.5}
                  />
                </motion.div>
                <span>{formatNumber(post.likes)}</span>
              </motion.button>

              {/* Comment */}
              <button
                onClick={() => setShowComments(s => !s)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-mono text-text-muted hover:text-cyan-bright hover:bg-cyan-glow/10 transition-all duration-300"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                <span>{formatNumber(post.comments)}</span>
              </button>

              {/* Share */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={handleShare}
                className={clsx(
                  'flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-mono transition-all duration-300',
                  sharedAnim
                    ? 'text-green-400 bg-green-500/10'
                    : 'text-text-muted hover:text-green-400 hover:bg-green-500/10'
                )}
              >
                <Repeat2 size={16} strokeWidth={1.5} />
                <span>{formatNumber(shareCount)}</span>
              </motion.button>

              {/* Views */}
              <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-mono text-text-muted">
                <Eye size={15} strokeWidth={1.5} />
                <span>{formatNumber(post.views)}</span>
              </div>

              {/* Save */}
              <button
                onClick={() => setSaved(s => !s)}
                className={clsx(
                  'p-1.5 rounded-lg transition-all duration-300',
                  saved
                    ? 'text-violet-bright'
                    : 'text-text-muted hover:text-violet-bright hover:bg-violet-glow/10'
                )}
              >
                <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} strokeWidth={saved ? 0 : 1.5} />
              </button>
            </div>

            {/* Comment section (expandable) */}
            <AnimatePresence>
              {showComments && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 border-t border-border/30 pt-3">
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-violet-dim/30 border border-violet-glow/20 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Ajouter un commentaire..."
                        className="flex-1 bg-panel/50 border border-border/50 rounded-lg px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-violet-glow/50 transition-all font-body"
                      />
                    </div>
                    <div className="mt-3 space-y-2">
                      {[
                        { user: 'axiom_drift', text: 'Fascinant. La complexité comme esthétique.', time: '2h' },
                        { user: 'neon_phantom', text: 'On devrait collaborer sur ce concept. 🔮', time: '1h' },
                      ].map((c) => (
                        <div key={c.user} className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-muted/50 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-display font-600 text-text-secondary mr-2">@{c.user}</span>
                            <span className="text-xs text-text-muted">{c.text}</span>
                            <span className="text-[10px] text-text-muted ml-2">{c.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </article>
  )
}
