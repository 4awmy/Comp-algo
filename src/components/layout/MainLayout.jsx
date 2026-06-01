import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import styles from './MainLayout.module.css'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={styles.layout}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        className={styles.main}
        style={{ '--sidebar-offset': sidebarOpen ? 'var(--sidebar-width)' : '0px' }}
      >
        <TopBar onMenuClick={() => setSidebarOpen(o => !o)} sidebarOpen={sidebarOpen} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
