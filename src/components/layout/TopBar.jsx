import { useLocation, NavLink } from 'react-router-dom'
import { LECTURES } from '../../data/lectures'
import styles from './TopBar.module.css'

const MenuIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ) : (
      <>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    )}
  </svg>
)

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

function useBreadcrumb() {
  const location = useLocation()
  const path = location.pathname

  if (path === '/') return [{ label: 'Home', to: '/' }]
  if (path === '/cheatsheet') return [{ label: 'Home', to: '/' }, { label: 'Cheat Sheet' }]

  const match = path.match(/\/(lecture|section|quiz)\/(\d+)/)
  if (!match) return [{ label: 'Home', to: '/' }]

  const [, type, id] = match
  const lecture = LECTURES.find(l => l.id === id)
  const lectureLabel = lecture ? `Lec ${parseInt(id)} — ${lecture.shortTitle}` : `Lecture ${id}`

  const typeMap = { lecture: 'Lecture Notes', section: 'Practice Sheet', quiz: 'Visualizations' }

  return [
    { label: 'Home', to: '/' },
    { label: lectureLabel, to: `/lecture/${id}` },
    { label: typeMap[type] },
  ]
}

export default function TopBar({ onMenuClick, sidebarOpen }) {
  const crumbs = useBreadcrumb()

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <MenuIcon open={sidebarOpen} />
        </button>

        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          {crumbs.map((crumb, i) => (
            <span key={i} className={styles.crumbGroup}>
              {i > 0 && <span className={styles.crumbSep}><ChevronRight /></span>}
              {crumb.to ? (
                <NavLink to={crumb.to} className={styles.crumbLink}>
                  {crumb.label}
                </NavLink>
              ) : (
                <span className={styles.crumbCurrent}>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      <div className={styles.right}>
        <span className={styles.courseBadge}>
          <span className={styles.courseDot} />
          Computing Algorithms
        </span>
      </div>
    </header>
  )
}
