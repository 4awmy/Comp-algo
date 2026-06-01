import { useEffect } from 'react'
import styles from './Lectures.module.css'

/**
 * ExampleDrawer component for displaying deep-dive content like numerical examples or worked solutions.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the drawer is open.
 * @param {Function} props.onClose - Callback function to close the drawer.
 * @param {string} props.title - Title of the drawer.
 * @param {React.ReactNode} props.children - Content to display in the drawer.
 */
export default function ExampleDrawer({ isOpen, onClose, title = 'Numerical Example', children }) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`${styles.drawerOverlay} ${isOpen ? styles.drawerOverlayOpen : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside 
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        aria-labelledby="drawer-title"
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.drawerHeader}>
          <h2 id="drawer-title" className={styles.drawerTitle}>{title}</h2>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close drawer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.drawerContent}>
          {children}
        </div>
      </aside>
    </>
  )
}
