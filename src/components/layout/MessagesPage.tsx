'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Send, ArrowLeft, Sparkles } from 'lucide-react'
import { messages, formatTimeAgo } from '@/data/mock'
import type { Message } from '@/data/mock'
import Image from 'next/image'

export default function MessagesPage() {
  const [selected, setSelected] = useState<Message | null>(null)
  const [input, setInput] = useState('')
  const [conversation, setConversation] = useState([
    { role: 'them', text: 'On collabore sur le projet VR ? J\'ai des idées...', time: '11:30' },
    { role: 'me', text: 'Oui ! Dis-moi tout 🔮', time: '11:32' },
    { role: 'them', text: 'Je pense à un monde procédural généré par les émotions de l\'utilisateur en temps réel.', time: '11:33' },
    { role: 'me', text: 'Wow. On peut utiliser du ML pour analyser le biofeedback.', time: '11:35' },
  ])

  const handleSend = () => {
    if (!input.trim()) return
    setConversation(c => [...c, { role: 'me', text: input, time: 'Maintenant' }])
    setInput('')
  }

  return (
    <div className="flex flex-col min-h-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {!selected ? (
          /* Message list */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1"
          >
            {/* Header */}
            <div className="sticky top-0 z-30 bg-void/80 backdrop-blur-xl border-b border-border/50 px-4 py-3">
              <h1 className="font-display font-800 text-lg text-text-primary">Messages</h1>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={13} />
                <input
                  type="text"
                  placeholder="Chercher une conversation..."
                  className="w-full bg-panel border border-border/50 rounded-xl pl-8 pr-4 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-violet-glow/50 transition-all font-body"
                />
              </div>
            </div>

            <div className="flex-1 divide-y divide-border/30 overflow-y-auto pb-20 lg:pb-0">
              {messages.map((msg, i) => (
                <motion.button
                  key={msg.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setSelected(msg)}
                  className="flex items-center gap-3 w-full px-4 py-4 hover:bg-surface/30 transition-colors text-left"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-border">
                      <Image src={msg.user.avatar} alt={msg.user.displayName} width={44} height={44} className="object-cover" />
                    </div>
                    {msg.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-glow rounded-full border-2 border-void pulse-dot" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`font-display font-700 text-sm ${msg.unread ? 'text-text-primary' : 'text-text-secondary'}`}>
                        {msg.user.displayName}
                      </span>
                      <span className="text-[10px] font-mono text-text-muted flex-shrink-0">
                        {formatTimeAgo(msg.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-xs truncate ${msg.unread ? 'text-text-secondary' : 'text-text-muted'}`}>
                        {msg.lastMessage}
                      </p>
                      {msg.unread > 0 && (
                        <span className="ml-2 min-w-[18px] h-4.5 bg-violet-glow text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 flex-shrink-0">
                          {msg.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Conversation view */
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col flex-1 h-full"
          >
            {/* Chat header */}
            <div className="sticky top-0 z-30 bg-void/80 backdrop-blur-xl border-b border-border/50 px-4 py-3 flex items-center gap-3">
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border flex-shrink-0">
                <Image src={selected.user.avatar} alt={selected.user.displayName} fill className="object-cover" />
                {selected.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-cyan-glow rounded-full border border-void" />
                )}
              </div>
              <div>
                <p className="font-display font-700 text-sm text-text-primary">{selected.user.displayName}</p>
                <p className="text-[10px] text-text-muted font-mono">{selected.online ? 'En ligne' : 'Hors ligne'}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {conversation.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'me'
                      ? 'bg-gradient-to-br from-violet-glow to-cyan-dim text-white rounded-br-sm'
                      : 'bg-panel border border-border/50 text-text-secondary rounded-bl-sm'
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 font-mono ${msg.role === 'me' ? 'text-white/60' : 'text-text-muted'}`}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border/50 px-4 py-3 flex items-center gap-2 pb-20 lg:pb-3">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Écrivez un message..."
                className="flex-1 bg-panel border border-border/50 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-violet-glow/50 transition-all font-body"
              />
              <button className="p-2.5 text-text-muted hover:text-violet-bright transition-colors">
                <Sparkles size={16} strokeWidth={1.5} />
              </button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2.5 bg-gradient-to-r from-violet-glow to-cyan-dim rounded-xl text-white disabled:opacity-40 transition-all"
              >
                <Send size={15} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
