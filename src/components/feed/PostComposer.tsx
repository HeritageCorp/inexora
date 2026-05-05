'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Hash, AtSign, Smile, Send, X, Sparkles } from 'lucide-react'
import { currentUser } from '@/data/mock'
import type { Post } from '@/data/mock'
import Image from 'next/image'

export default function PostComposer({ onPost }: { onPost: (post: Post) => void }) {
  const [content, setContent] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const maxChars = 500
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    if (val.length <= maxChars) {
      setContent(val)
      setCharCount(val.length)
    }
    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }

  const handlePost = async () => {
    if (!content.trim()) return
    setIsPosting(true)
    await new Promise(r => setTimeout(r, 600))

    const newPost: Post = {
      id: `p${Date.now()}`,
      author: currentUser,
      content: content.trim(),
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      liked: false,
      tags: [],
      views: 1,
    }

    onPost(newPost)
    setContent('')
    setCharCount(0)
    setIsFocused(false)
    setIsPosting(false)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const pct = (charCount / maxChars) * 100
  const charColor = pct > 90 ? '#ef4444' : pct > 75 ? '#f59e0b' : '#7c3aed'

  return (
    <div className="border-b border-border/30 px-4 py-4">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-violet-glow/30 flex-shrink-0">
          <Image src={currentUser.avatar} alt={currentUser.displayName} fill className="object-cover" />
        </div>

        {/* Composer */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            placeholder="Qu'est-ce qui vous traverse l'esprit ?"
            className="w-full bg-transparent text-text-primary placeholder:text-text-muted text-sm resize-none focus:outline-none font-body leading-relaxed min-h-[48px] max-h-[240px]"
            rows={2}
          />

          <AnimatePresence>
            {(isFocused || content) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                {/* Preview of tags */}
                {content.match(/#\w+/g) && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {content.match(/#\w+/g)?.map((tag, i) => (
                      <span key={i} className="text-xs bg-violet-dim/20 text-violet-soft px-2 py-0.5 rounded-full border border-violet-glow/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  {/* Toolbar */}
                  <div className="flex items-center gap-0">
                    {[
                      { Icon: ImageIcon, label: 'Image' },
                      { Icon: Hash, label: 'Tag' },
                      { Icon: AtSign, label: 'Mention' },
                      { Icon: Smile, label: 'Emoji' },
                      { Icon: Sparkles, label: 'IA' },
                    ].map(({ Icon, label }) => (
                      <button
                        key={label}
                        title={label}
                        className="p-2 text-text-muted hover:text-violet-bright transition-colors rounded-lg hover:bg-violet-glow/10"
                      >
                        <Icon size={16} strokeWidth={1.5} />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Char counter */}
                    {charCount > 0 && (
                      <div className="relative w-7 h-7">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 28 28">
                          <circle cx="14" cy="14" r="11" fill="none" stroke="#1e1b33" strokeWidth="2.5" />
                          <circle
                            cx="14" cy="14" r="11"
                            fill="none"
                            stroke={charColor}
                            strokeWidth="2.5"
                            strokeDasharray={`${2 * Math.PI * 11}`}
                            strokeDashoffset={`${2 * Math.PI * 11 * (1 - pct / 100)}`}
                            className="transition-all duration-300"
                          />
                        </svg>
                        {pct > 75 && (
                          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono" style={{ color: charColor }}>
                            {maxChars - charCount}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Cancel */}
                    {content && (
                      <button
                        onClick={() => { setContent(''); setCharCount(0); setIsFocused(false) }}
                        className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}

                    {/* Post button */}
                    <motion.button
                      whileTap={{ scale: 0.93 }}
                      onClick={handlePost}
                      disabled={!content.trim() || isPosting}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-violet-glow to-cyan-dim rounded-lg text-sm font-display font-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-violet-glow"
                    >
                      {isPosting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                        >
                          <Sparkles size={14} />
                        </motion.div>
                      ) : (
                        <Send size={14} />
                      )}
                      {isPosting ? 'Envoi...' : 'Publier'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
