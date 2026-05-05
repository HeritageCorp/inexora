'use client'

import { Home, Compass, Bell, MessageCircle, User } from 'lucide-react'
import { ActivePage } from '@/app/page'
import clsx from 'clsx'

const navItems = [
  { icon: Home, page: 'home' as ActivePage },
  { icon: Compass, page: 'explore' as ActivePage },
  { icon: Bell, page: 'notifications' as ActivePage, badge: 3 },
  { icon: MessageCircle, page: 'messages' as ActivePage, badge: 4 },
  { icon: User, page: 'profile' as ActivePage },
]

export default function MobileNav({
  activePage,
  setActivePage,
}: {
  activePage: ActivePage
  setActivePage: (p: ActivePage) => void
}) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-t border-border/50 flex items-center justify-around px-4 py-2 pb-safe">
      {navItems.map(({ icon: Icon, page, badge }) => {
        const isActive = activePage === page
        return (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={clsx(
              'relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300',
              isActive ? 'text-violet-bright' : 'text-text-muted'
            )}
          >
            <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
            {badge && (
              <span className="absolute top-1 right-1 min-w-[14px] h-3.5 bg-violet-glow text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                {badge}
              </span>
            )}
            {isActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-glow rounded-full" />
            )}
          </button>
        )
      })}
    </nav>
  )
}
