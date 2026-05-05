'use client'

import { motion } from 'framer-motion'
import {
  Home, Compass, Bell, MessageCircle, User,
  Zap, Settings, LogOut, Sparkles
} from 'lucide-react'
import { ActivePage } from '@/app/page'
import { currentUser, formatNumber } from '@/data/mock'
import Image from 'next/image'
import clsx from 'clsx'

interface NavItem {
  icon: React.ElementType
  label: string
  page: ActivePage
  badge?: number
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Accueil', page: 'home' },
  { icon: Compass, label: 'Exploration', page: 'explore' },
  { icon: Bell, label: 'Notifications', page: 'notifications', badge: 3 },
  { icon: MessageCircle, label: 'Messages', page: 'messages', badge: 4 },
  { icon: User, label: 'Profil', page: 'profile' },
]

export default function Sidebar({
  activePage,
  setActivePage,
}: {
  activePage: ActivePage
  setActivePage: (p: ActivePage) => void
}) {
  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 sticky top-0 h-screen overflow-y-auto py-6 px-4 gap-1">
      {/* Logo */}
      <motion.div
        className="px-3 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 bg-violet-glow rounded-lg glow-violet" />
            <div className="relative flex items-center justify-center w-full h-full">
              <Zap className="w-5 h-5 text-white" fill="currentColor" />
            </div>
          </div>
          <span className="font-display text-2xl font-800 gradient-text tracking-tight">
            Inexora
          </span>
        </div>
        <p className="text-xs text-text-muted mt-1 font-mono pl-11">v0.1.0 — MVP</p>
      </motion.div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item, i) => {
          const Icon = item.icon
          const isActive = activePage === item.page
          return (
            <motion.button
              key={item.page}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              onClick={() => setActivePage(item.page)}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full text-left group relative',
                isActive
                  ? 'bg-gradient-to-r from-violet-dim/30 to-transparent border border-violet-glow/20 text-text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-panel/50'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-violet-glow rounded-r-full"
                />
              )}
              <div className={clsx(
                'relative transition-all duration-300',
                isActive ? 'text-violet-bright' : 'text-text-secondary group-hover:text-violet-soft'
              )}>
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-violet-glow text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={clsx(
                'font-display font-600 text-sm',
                isActive ? 'text-text-primary' : ''
              )}>
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </nav>

      {/* Compose button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="my-4 px-1"
      >
        <button
          onClick={() => setActivePage('home')}
          className="w-full py-3 px-4 bg-gradient-to-r from-violet-glow to-cyan-dim rounded-xl font-display font-700 text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-violet-glow hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles size={16} />
          Publier
        </button>
      </motion.div>

      {/* User card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="border-t border-border/50 pt-4 mt-2"
      >
        <button
          onClick={() => setActivePage('profile')}
          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-panel/50 transition-all duration-300 group"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-violet-glow/30 flex-shrink-0">
            <Image
              src={currentUser.avatar}
              alt={currentUser.displayName}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-cyan-glow rounded-full border border-void pulse-dot" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-display font-600 text-text-primary truncate flex items-center gap-1">
              {currentUser.displayName}
              {currentUser.verified && (
                <span className="text-[9px] bg-violet-glow/20 text-violet-soft px-1 py-0.5 rounded font-mono">✓</span>
              )}
            </p>
            <p className="text-xs text-text-muted truncate">@{currentUser.username}</p>
          </div>
          <div className="flex flex-col items-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Settings size={14} className="text-text-muted" />
          </div>
        </button>

        <div className="flex justify-between text-center mt-2 px-3">
          {[
            { label: 'Publications', value: formatNumber(currentUser.posts) },
            { label: 'Abonnés', value: formatNumber(currentUser.followers) },
            { label: 'Abonnements', value: formatNumber(currentUser.following) },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs font-display font-700 text-text-primary">{value}</p>
              <p className="text-[10px] text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </aside>
  )
}
