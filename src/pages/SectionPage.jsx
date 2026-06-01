/* eslint-disable */
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getLectureById, LECTURES } from '../data/lectures'
import AlgorithmVisualizer from '../components/visualization/AlgorithmVisualizer'
import styles from './SectionPage.module.css'

// Map section/lecture ID to visualizer settings
const getVisualizerConfig = (lectureId) => {
  switch (lectureId) {
    case 'lec04':
      return { algorithm: 'bubbleSort', title: 'Bubble Sort Visualizer' }
    case 'lec05':
      return { algorithm: 'stringMatching', title: 'String Matching Visualizer', targetKey: 'CAD' }
    case 'lec06':
      return { algorithm: 'insertionSort', title: 'Insertion Sort Visualizer' }
    case 'lec09':
      return { algorithm: 'selectionSort', title: 'Sorting Demo (Divide & Conquer)' }
    default:
      return null
  }
}

export default function SectionPage() {
  const { id } = useParams()
  const lectureMeta = getLectureById(id)
  
  const [sheetData, setSheetData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeProblemIdx, setActiveProblemIdx] = useState(0)
  const [activeTabMap, setActiveTabMap] = useState({}) // maps problem index to active tab ('solution' | 'explanation' | 'demo')
  const [viewMode, setViewMode] = useState('interactive') // 'interactive' | 'original'

   
  useEffect(() => {
    setLoading(true)
    setActiveProblemIdx(0)
    setActiveTabMap({})
    
    import(`../data/sheets/sheet${id}.json`)
      .then(res => {
        setSheetData(res.default)
        // Default to original scanned sheet view if no questions parsed but images exist
        if ((!res.default?.problems || res.default.problems.length === 0) && lectureMeta?.sheetImagesCount > 0) {
          setViewMode('original')
        } else {
          setViewMode('interactive')
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load sheet JSON data:", err)
        if (lectureMeta?.sheetImagesCount > 0) {
          setViewMode('original')
        }
        setLoading(false)
      })
  }, [id, lectureMeta])

  if (!lectureMeta) {
    return (
      <div className={styles.container}>
        <div className={styles.noProblems}>Section not found</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.noProblems}>
          <div className={styles.spinner}></div>
          <p style={{ marginTop: '16px' }}>Extracting sheet contents and generating explanations...</p>
        </div>
      </div>
    )
  }

  const problems = sheetData?.problems || []
  const activeProblem = problems[activeProblemIdx]
  
  // Navigation
  const prevProblem = () => setActiveProblemIdx(i => Math.max(0, i - 1))
  const nextProblem = () => setActiveProblemIdx(i => Math.min(problems.length - 1, i + 1))

  // Tab control per problem
  const getActiveTab = (probIdx) => activeTabMap[probIdx] || 'solution'
  const setActiveTab = (probIdx, tab) => {
    setActiveTabMap(prev => ({ ...prev, [probIdx]: tab }))
  }

  // Next / Prev Sections
  const activeLecturesWithSheets = LECTURES.filter(l => l.hasSection)
  const currentIdx = activeLecturesWithSheets.findIndex(l => l.id === id)
  const prevSection = activeLecturesWithSheets[currentIdx - 1]
  const nextSection = activeLecturesWithSheets[currentIdx + 1]

  const visualizerConfig = getVisualizerConfig(`lec${id}`)

  // Scanned images list
  const getImageUrl = (imgNum) => {
    const base = import.meta.env.BASE_URL || '/'
    return `${base}images/sheets/sheet${id}/image${imgNum}.png`
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Practice Sheet {parseInt(id)}</span>
        <h1 className={styles.title}>{sheetData?.title || lectureMeta.title}</h1>
        <p className={styles.meta}>Course by Dr. Moheeb • {lectureMeta.week}</p>
      </div>

      {/* Global View Mode Switcher */}
      {lectureMeta.sheetImagesCount > 0 && problems.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
          <button 
            className={`btn ${viewMode === 'interactive' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setViewMode('interactive')}
          >
            📝 Interactive Problems
          </button>
          <button 
            className={`btn ${viewMode === 'original' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setViewMode('original')}
          >
            🖼️ Original Scanned Sheets
          </button>
        </div>
      )}

      {viewMode === 'original' && lectureMeta.sheetImagesCount > 0 ? (
        /* Scanned pages list view */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center', marginBottom: '40px' }}>
          {Array.from({ length: lectureMeta.sheetImagesCount }, (_, i) => (
            <div 
              key={i} 
              style={{
                width: '100%',
                maxWidth: '850px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>Page {i + 1} of {lectureMeta.sheetImagesCount}</span>
                <span>AAST — Computing Algorithms</span>
              </div>
              <img 
                src={getImageUrl(i + 1)} 
                alt={`Sheet ${id} Page ${i + 1}`} 
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-sm)', objectFit: 'contain' }} 
              />
            </div>
          ))}
        </div>
      ) : (
        /* Interactive Problems view */
        problems.length === 0 ? (
          <div className={styles.noProblems}>
            <h3>No problems found in this sheet.</h3>
            {lectureMeta.sheetImagesCount > 0 ? (
              <p>Text extraction is currently unavailable. Try switching to "Original Scanned Sheets" mode!</p>
            ) : (
              <p>The sheet content is currently being parsed or extracted. Check back in a moment!</p>
            )}
          </div>
        ) : (
          <div>
            {/* Main Problem Details */}
            <div className={styles.problemsList}>
              <div className={styles.problemCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.questionGroup}>
                    <span className={styles.problemNumber}>{activeProblem?.number}</span>
                    <div className={styles.questionText}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {activeProblem?.question || "No question text available."}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>

                {/* Sub Tabs for Solution, Explanations, Visualizer */}
                <div className={styles.cardTabs}>
                  <button
                    className={`${styles.tabBtn} ${getActiveTab(activeProblemIdx) === 'solution' ? styles.tabBtnActive : ''}`}
                    onClick={() => setActiveTab(activeProblemIdx, 'solution')}
                  >
                    📝 Reference Answer
                  </button>
                  <button
                    className={`${styles.tabBtn} ${getActiveTab(activeProblemIdx) === 'explanation' ? styles.tabBtnActive : ''}`}
                    onClick={() => setActiveTab(activeProblemIdx, 'explanation')}
                  >
                    🤖 Step-by-Step AI Explanation
                  </button>
                  {visualizerConfig && (
                    <button
                      className={`${styles.tabBtn} ${getActiveTab(activeProblemIdx) === 'demo' ? styles.tabBtnActive : ''}`}
                      onClick={() => setActiveTab(activeProblemIdx, 'demo')}
                    >
                      ⚡ Interactive Visual Demo
                    </button>
                  )}
                </div>

                {/* Tab Content */}
                <div className={styles.tabContent}>
                  {getActiveTab(activeProblemIdx) === 'solution' && (
                    <div className={styles.solutionBox}>
                      {activeProblem?.answer ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {activeProblem.answer}
                        </ReactMarkdown>
                      ) : (
                        <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                          No reference answer text provided in sheet. Use the AI Explanation tab for step-by-step guidance!
                        </p>
                      )}
                    </div>
                  )}

                  {getActiveTab(activeProblemIdx) === 'explanation' && (
                    <div className={styles.explanationTimeline}>
                      {activeProblem?.explanation && activeProblem.explanation.length > 0 ? (
                        activeProblem.explanation.map((stepObj) => (
                          <div key={stepObj.step} className={styles.timelineStep}>
                            <div className={styles.stepMarker} />
                            <h4 className={styles.stepTitle}>Step {stepObj.step}</h4>
                            <p className={styles.stepText}>{stepObj.text}</p>
                          </div>
                        ))
                      ) : (
                        <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                          AI explanation is currently being generated. Run 'generate_explanations.py' to populate this tab!
                        </p>
                      )}
                    </div>
                  )}

                  {getActiveTab(activeProblemIdx) === 'demo' && visualizerConfig && (
                    <div className={styles.visualizerWrapper}>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: 'var(--accent-cyan)' }}>
                        {visualizerConfig.title}
                      </h3>
                      <AlgorithmVisualizer 
                        algorithm={visualizerConfig.algorithm} 
                        targetKey={visualizerConfig.targetKey} 
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Problem Pager Navigation */}
            <div className="flex justify-between items-center" style={{ margin: '20px 0 40px' }}>
              <button
                onClick={prevProblem}
                disabled={activeProblemIdx === 0}
                className="btn btn-outline"
              >
                ◀ Prev Problem
              </button>
              <span className={styles.meta}>
                Problem {activeProblemIdx + 1} of {problems.length}
              </span>
              <button
                onClick={nextProblem}
                disabled={activeProblemIdx === problems.length - 1}
                className="btn btn-primary"
              >
                Next Problem ▶
              </button>
            </div>
          </div>
        )
      )}

      {/* Nav bar for sections */}
      <div className={styles.navBar}>
        {prevSection ? (
          <Link to={`/section/${prevSection.id}`} className="btn btn-outline">
            ◀ Previous Practice Sheet (Lec {parseInt(prevSection.id)})
          </Link>
        ) : <div />}
        
        <Link to={`/lecture/${id}`} className="btn btn-outline">
          📖 Back to Lecture {parseInt(id)} Notes
        </Link>

        {nextSection ? (
          <Link to={`/section/${nextSection.id}`} className="btn btn-outline">
            Next Practice Sheet (Lec {parseInt(nextSection.id)}) ▶
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
