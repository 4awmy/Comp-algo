/* eslint-disable */
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LECTURES } from '../../data/lectures'
import styles from './Sidebar.module.css'

// ── Icons ──────────────────────────────────────────────────────
const ChevronIcon = ({ open }) => (
  <svg
    className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
    width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const BookIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)

const FileIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
)

// ── Single Lecture Accordion Item ─────────────────────────────
function LectureItem({ lecture }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  // auto-expand if current route matches
  const isActive =
    location.pathname === `/lecture/${lecture.id}` ||
    location.pathname === `/section/${lecture.id}`

  return (
    <div className={`${styles.lectureItem} ${isActive ? styles.lectureItemActive : ''}`}>
      {/* Header row */}
      <button
        className={styles.lectureHeader}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={styles.lectureIcon} style={{ color: lecture.color }}>
          {lecture.icon}
        </span>
        <span className={styles.lectureMeta}>
          <span className={styles.lectureNum}>
            Lec {lecture.id.replace(/^0/, '')}
          </span>
          <span className={styles.lectureTitle}>{lecture.shortTitle}</span>
        </span>
        <ChevronIcon open={open} />
      </button>

      {/* Sub-items */}
      <div className={`${styles.subItems} ${open ? styles.subItemsOpen : ''}`}>
        <div className={styles.subItemsInner}>
          <NavLink
            to={`/lecture/${lecture.id}`}
            className={() => {
              const isNotesActive = location.pathname === `/lecture/${lecture.id}` && !location.search.includes('tab=visualizer')
              return `${styles.subItem} ${isNotesActive ? styles.subItemActive : ''}`
            }}
          >
            <span className={styles.subIcon}><BookIcon /></span>
            <span>Lecture Notes</span>
          </NavLink>

          {lecture.hasSection ? (
            <NavLink
              to={`/section/${lecture.id}`}
              className={({ isActive }) =>
                `${styles.subItem} ${isActive ? styles.subItemActive : ''}`
              }
            >
              <span className={styles.subIcon}><FileIcon /></span>
              <span>Practice Sheet</span>
            </NavLink>
          ) : (
            <span className={`${styles.subItem} ${styles.subItemDisabled}`}>
              <span className={styles.subIcon}><FileIcon /></span>
              <span>Practice Sheet</span>
              <span className={styles.noSectionBadge}>N/A</span>
            </span>
          )}

          {lecture.hasVisualization && (
            <NavLink
              to={`/lecture/${lecture.id}?tab=visualizer`}
              className={() => {
                const isVisActive = location.pathname === `/lecture/${lecture.id}` && location.search.includes('tab=visualizer')
                return `${styles.subItem} ${isVisActive ? styles.subItemActive : ''}`
              }}
            >
              <span className={styles.subIcon}><PlayIcon /></span>
              <span>Visualizations</span>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Sidebar Component ──────────────────────────────────────────
export default function Sidebar({ open, onClose }) {
  return (
    <aside
      className={`${styles.sidebar} ${open ? styles.sidebarOpen : styles.sidebarClosed}`}
      aria-label="Course navigation"
    >
      {/* ── Brand header ── */}
      <div className={styles.brand}>
        <div className={styles.brandLogo}>
          <span className={styles.brandLogoIcon}>⚡</span>
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandTitle}>Computing</span>
          <span className={styles.brandTitle}>Algorithms</span>
          <span className={styles.brandSub}>Dr. Moheeb · AAST</span>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className={styles.nav}>
        {/* Home */}
        <div className={styles.navSection}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <HomeIcon />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/cheatsheet"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <GridIcon />
            <span>Cheat Sheet</span>
          </NavLink>
        </div>

        {/* Divider + label */}
        <div className={styles.sectionLabel}>
          <span>Lectures</span>
          <span className={styles.lectureCount}>{LECTURES.length}</span>
        </div>

        {/* Lecture list */}
        <div className={styles.lectureList}>
          {LECTURES.map(lecture => (
            <LectureItem key={lecture.id} lecture={lecture} />
          ))}
        </div>
      </nav>

      {/* ── Footer ── */}
      <div className={styles.sidebarFooter}>
        <div className={styles.footerCard}>
          <span className={styles.footerIcon}>🤖</span>
          <div>
            <div className={styles.footerTitle}>AI Tutor</div>
            <div className={styles.footerSub}>Coming soon</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
