'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, UserPlus, MessageCircle, AtSign, Repeat2, BellOff } from 'lucide-react'
import { notifications as initialNotifs, formatTimeAgo } from '@/data/mock'
import Image from 'next/image'

const iconMap = {
  like: { Icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  follow: { Icon: UserPlus, color: 'text-cyan-bright', bg: 'bg-cyan-glow/10' },
  comment: { Icon: MessageCircle, color: 'text-violet-bright', bg: 'bg-violet-glow/10' },
  mention: { Icon: AtSign, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  share: { Icon: Repeat2, color: 'text-green-400', bg: 'bg-green-500/10' },
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifs)

  const markAllRead = () => setNotifs(n => n.map(n => ({ ...n, read: true })))

  const unreadCount = notifs.filter(n => !n.read).length

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-void/80 backdrop-blur-xl border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-display font-800 text-lg text-text-primary">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-xs text-text-muted">{unreadCount} non lues</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs text-violet-soft hover:text-violet-bright transition-colors font-display font-600"
          >
            <BellOff size={13} />
            Tout marquer comme lu
          </button>
        )}
      </div>

      <div className="flex-1 divide-y divide-border/30 pb-20 lg:pb-0">
        {notifs.map((notif, i) => {
          const { Icon, color, bg } = iconMap[notif.type]
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-start gap-3 px-4 py-4 hover:bg-surface/30 transition-colors cursor-pointer ${
                !notif.read ? 'bg-violet-dim/5' : ''
              }`}
            >
              {/* Unread indicator */}
              {!notif.read && (
                <div className="absolute left-0 w-0.5 h-full bg-violet-glow" />
              )}

              {/* Avatar + icon overlay */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                  <Image src={notif.user.avatar} alt={notif.user.displayName} width={40} height={40} className="object-cover" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${bg} border border-void flex items-center justify-center`}>
                  <Icon size={10} className={color} strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-secondary leading-snug">
                  <span className="font-display font-700 text-text-primary">{notif.user.displayName}</span>
                  {' '}
                  <span className={!notif.read ? 'text-text-primary' : ''}>{notif.content}</span>
                </p>
                <p className="text-xs text-text-muted font-mono mt-0.5">{formatTimeAgo(notif.timestamp)}</p>
              </div>

              {!notif.read && (
                <div className="w-2 h-2 bg-violet-glow rounded-full flex-shrink-0 mt-1.5" />
              )}
            </motion.div>
          )
        })}

        {notifs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-text-muted">
            <BellOff size={40} strokeWidth={1} />
            <p className="mt-4 font-display font-600">Aucune notification</p>
          </div>
        )}
      </div>
    </div>
  )
}
