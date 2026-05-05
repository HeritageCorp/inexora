'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Feed from '@/components/feed/Feed'
import RightPanel from '@/components/layout/RightPanel'
import ProfilePage from '@/components/profile/ProfilePage'
import NotificationsPage from '@/components/layout/NotificationsPage'
import MessagesPage from '@/components/layout/MessagesPage'
import ExplorePage from '@/components/layout/ExplorePage'
import MobileNav from '@/components/layout/MobileNav'

export type ActivePage = 'home' | 'explore' | 'notifications' | 'messages' | 'profile'

export default function Home() {
  const [activePage, setActivePage] = useState<ActivePage>('home')

  const renderContent = () => {
    switch (activePage) {
      case 'home': return <Feed />
      case 'explore': return <ExplorePage />
      case 'notifications': return <NotificationsPage />
      case 'messages': return <MessagesPage />
      case 'profile': return <ProfilePage />
      default: return <Feed />
    }
  }

  return (
    <div className="min-h-screen bg-void grid-bg relative">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-violet-dim/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-cyan-dim/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto flex min-h-screen relative">
        {/* Left Sidebar */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main Content */}
        <main className="flex-1 min-h-screen border-x border-border/50 relative overflow-hidden">
          {renderContent()}
        </main>

        {/* Right Panel - hidden on mobile */}
        <div className="hidden xl:block w-80">
          <RightPanel setActivePage={setActivePage} />
        </div>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  )
}
