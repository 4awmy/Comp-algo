import { Link } from 'react-router-dom'
import { LECTURES, getSectionCount } from '../data/lectures'
import styles from './HomePage.module.css'

// ── Stat Card ────────────────────────────────────────────────
function StatCard({ value, label, icon, color }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statIcon} style={{ color }}>{icon}</span>
      <span className={styles.statValue} style={{ color }}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

// ── Lecture Card ─────────────────────────────────────────────
function LectureCard({ lecture, index }) {
  return (
    <div
      className={styles.lectureCard}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Gradient top accent */}
      <div
        className={styles.cardAccent}
        style={{ background: `linear-gradient(90deg, ${lecture.color}, transparent)` }}
      />

      {/* Card header */}
      <div className={styles.cardHeader}>
        <div className={styles.cardIconWrap} style={{ '--lc': lecture.color }}>
          <span className={styles.cardIcon}>{lecture.icon}</span>
        </div>
        <div className={styles.cardMeta}>
          <span className={`badge badge-blue`}>Lec {lecture.number.toString().padStart(2, '0')}</span>
          <span className={styles.weekBadge}>{lecture.week}</span>
        </div>
      </div>

      {/* Card body */}
      <h3 className={styles.cardTitle}>{lecture.title}</h3>

      <ul className={styles.topicList}>
        {lecture.topics.slice(0, 3).map((t, i) => (
          <li key={i} className={styles.topicItem}>
            <span className={styles.topicDot} style={{ background: lecture.color }} />
            {t}
          </li>
        ))}
      </ul>

      {/* Card footer links */}
      <div className={styles.cardFooter}>
        <Link to={`/lecture/${lecture.id}`} className={styles.cardLink}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          Notes
        </Link>

        {lecture.hasSection ? (
          <Link to={`/section/${lecture.id}`} className={styles.cardLink}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Sheet
          </Link>
        ) : (
          <span className={styles.cardLinkDisabled}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            No Sheet
          </span>
        )}

        {lecture.hasVisualization && (
          <Link to={`/quiz/${lecture.id}`} className={`${styles.cardLink} ${styles.cardLinkViz}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Visualize
          </Link>
        )}
      </div>
    </div>
  )
}

// ── HomePage ─────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        {/* Ambient orbs */}
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />

        {/* Grid overlay */}
        <div className={styles.heroGrid} />

        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Arab Academy for Science and Technology · AAST
          </div>

          {/* Title */}
          <h1 className={styles.heroTitle}>
            Computing
            <span className={styles.heroTitleGradient}> Algorithms</span>
          </h1>

          {/* Subtitle */}
          <p className={styles.heroSubtitle}>
            A beautifully crafted interactive learning platform for the Computing
            Algorithms course by{' '}
            <span className={styles.heroEmphasis}>Dr. Moheeb</span>.
            Master algorithm design techniques through structured lectures,
            practice sheets, and live visualizations.
          </p>

          {/* CTA buttons */}
          <div className={styles.heroCtas}>
            <Link to="/lecture/01" className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Start Learning
            </Link>
            <Link to="/cheatsheet" className="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
              Cheat Sheet
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className={styles.statsBar}>
        <StatCard value={LECTURES.length} label="Lectures" icon="📚" color="#3b82f6" />
        <div className={styles.statDivider} />
        <StatCard value={getSectionCount()} label="Practice Sheets" icon="📝" color="#8b5cf6" />
        <div className={styles.statDivider} />
        <StatCard value={LECTURES.filter(l => l.hasVisualization).length} label="Visualizations" icon="🎬" color="#10b981" />
        <div className={styles.statDivider} />
        <StatCard value="Soon™" label="AI Tutor" icon="🤖" color="#f59e0b" />
      </section>

      {/* ── LECTURES GRID ── */}
      <section className={styles.lecturesSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Course Lectures</h2>
            <p className={styles.sectionSubtitle}>
              {LECTURES.length} lectures covering algorithm design paradigms from brute force to dynamic programming
            </p>
          </div>
          <div className={styles.sectionBadge}>
            <span className="badge badge-blue">Spring 2025</span>
          </div>
        </div>

        <div className={styles.lectureGrid}>
          {LECTURES.map((lecture, i) => (
            <LectureCard key={lecture.id} lecture={lecture} index={i} />
          ))}
        </div>
      </section>

      {/* ── AI TUTOR ── */}
      <section className={styles.aiSection}>
        <div className={styles.aiCard}>
          <div className={styles.aiOrb} />
          <div className={styles.aiContent}>
            <div className={styles.aiIcon}>🤖</div>
            <div className={styles.aiText}>
              <h2 className={styles.aiTitle}>Antigravity AI Tutor — Active</h2>
              <p className={styles.aiDesc}>
                Ask anything about Computing Algorithms. Get step-by-step
                explanations, complexity analysis, and worked examples — powered
                by Gemini AI, tuned specifically to Dr. Moheeb's curriculum.
              </p>
              <div className={styles.aiFeatures}>
                {['Algorithm tracing', 'Complexity analysis', 'Pseudocode help', 'Exam prep Q&A'].map(f => (
                  <span key={f} className={styles.aiFeature}>
                    <span className={styles.aiFeatureCheck}>✓</span> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.aiComing}>
            <span className={`badge badge-blue`}>✨ Powered by Gemini</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>⚡</span>
            <div>
              <div className={styles.footerTitle}>Computing Algorithms</div>
              <div className={styles.footerSub}>Dr. Moheeb · Arab Academy for Science and Technology</div>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <Link to="/" className={styles.footerLink}>Home</Link>
            <Link to="/cheatsheet" className={styles.footerLink}>Cheat Sheet</Link>
            <Link to="/lecture/01" className={styles.footerLink}>Start Learning</Link>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>Built for AAST · Computing Algorithms · Spring 2025</span>
        </div>
      </footer>
    </div>
  )
}
