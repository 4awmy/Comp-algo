/* eslint-disable */
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getLectureById, LECTURES } from '../data/lectures'
import ProblemSolver from '../components/ui/Premium/ProblemSolver'
import styles from './SectionPage.module.css'

// Premium Bespoke Tracers
import AnalysisWorkspace from '../components/visualization/bespoke/AnalysisWorkspace'
import AvlTreeTracer from '../components/visualization/bespoke/AvlTreeTracer'
import BubbleSortTracer from '../components/visualization/bespoke/BubbleSortTracer'
import ComparisonCountingSortTracer from '../components/visualization/bespoke/ComparisonCountingSortTracer'
import DfsTracer from '../components/visualization/bespoke/DfsTracer'
import DynamicProgTracer from '../components/visualization/bespoke/DynamicProgTracer'
import EuclidTracer from '../components/visualization/bespoke/EuclidTracer'
import ExhaustiveSearchTracer from '../components/visualization/bespoke/ExhaustiveSearchTracer'
import FakeCoinTracer from '../components/visualization/bespoke/FakeCoinTracer'
import GreedyTracer from '../components/visualization/bespoke/GreedyTracer'
import HashingTracer from '../components/visualization/bespoke/HashingTracer'
import HeapsortTracer from '../components/visualization/bespoke/HeapsortTracer'
import HornersTracer from '../components/visualization/bespoke/HornersTracer'
import HorspoolTracer from '../components/visualization/bespoke/HorspoolTracer'
import InsertionSortTracer from '../components/visualization/bespoke/InsertionSortTracer'
import JosephusTracer from '../components/visualization/bespoke/JosephusTracer'
import MergeSortTracer from '../components/visualization/bespoke/MergeSortTracer'
import QuickSortTracer from '../components/visualization/bespoke/QuickSortTracer'
import SelectionSortTracer from '../components/visualization/bespoke/SelectionSortTracer'
import SieveTracer from '../components/visualization/bespoke/SieveTracer'
import StringMatchTracer from '../components/visualization/bespoke/StringMatchTracer'
import TopologicalSortTracer from '../components/visualization/bespoke/TopologicalSortTracer'
import TreeTraversalTracer from '../components/visualization/bespoke/TreeTraversalTracer'

const TRACER_MAP = {
  'analysisWorkspace': AnalysisWorkspace,
  'avlTree': AvlTreeTracer,
  'bubbleSort': BubbleSortTracer,
  'comparisonCountingSort': ComparisonCountingSortTracer,
  'dfs': DfsTracer,
  'dynamicProgramming': DynamicProgTracer,
  'euclidGcd': EuclidTracer,
  'exhaustiveSearch': ExhaustiveSearchTracer,
  'fakeCoin': FakeCoinTracer,
  'greedy': GreedyTracer,
  'hashing': HashingTracer,
  'heapsort': HeapsortTracer,
  'hornersMethod': HornersTracer,
  'horspoolSearch': HorspoolTracer,
  'insertionSort': InsertionSortTracer,
  'josephus': JosephusTracer,
  'mergeSort': MergeSortTracer,
  'quickSort': QuickSortTracer,
  'selectionSort': SelectionSortTracer,
  'sieveEratosthenes': SieveTracer,
  'stringMatching': StringMatchTracer,
  'topologicalSort': TopologicalSortTracer,
  'topological-sort': TopologicalSortTracer,
  'treeTraversal': TreeTraversalTracer
}

export default function SectionPage() {
  const { id } = useParams()
  const lectureMeta = getLectureById(id)
  
  const [sheetData, setSheetData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    
    import(`../data/sheets/sheet${id}.json`)
      .then(res => {
        setSheetData(res.default)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load sheet JSON data:", err)
        setLoading(false)
      })
  }, [id])

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
          <p style={{ marginTop: '16px' }}>Preparing Interactive Workbook...</p>
        </div>
      </div>
    )
  }

  const problems = sheetData?.problems || []

  // Next / Prev Sections
  const activeLecturesWithSheets = LECTURES.filter(l => l.hasSection)
  const currentIdx = activeLecturesWithSheets.findIndex(l => l.id === id)
  const prevSection = activeLecturesWithSheets[currentIdx - 1]
  const nextSection = activeLecturesWithSheets[currentIdx + 1]

  const getImageUrl = (imgNum) => {
    const base = import.meta.env.BASE_URL || '/'
    return `${base}images/sheets/sheet${id}/image${imgNum}.png`
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Interactive Workbook {parseInt(id)}</span>
        <h1 className={styles.title}>{sheetData?.title || lectureMeta.title}</h1>
        <p className={styles.meta}>Practice Session • {lectureMeta.week}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-20)', marginBottom: 'var(--space-20)' }}>
        {Array.from({ length: lectureMeta.sheetImagesCount || 0 }, (_, i) => {
          const pageNum = i + 1;
          const pageProblems = problems.filter(p => p.pageNumber === pageNum);

          return (
            <div key={pageNum} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
              <div style={{ 
                background: 'var(--bg-elevated)', 
                border: '1px solid var(--border-default)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-6)', 
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '11px', 
                  color: 'var(--text-muted)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  marginBottom: 'var(--space-4)' 
                }}>
                  <span>Original Scanned Sheet — Page {pageNum}</span>
                </div>
                <img 
                  src={getImageUrl(pageNum)} 
                  alt={`Sheet ${id} Page ${pageNum}`} 
                  style={{ width: '100%', borderRadius: 'var(--radius-sm)', display: 'block', objectFit: 'contain', background: 'white' }} 
                  loading="lazy"
                />
              </div>

              {pageProblems.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', padding: '0 var(--space-4)' }}>
                  {pageProblems.map(prob => (
                    <ProblemSolver 
                      key={prob.number}
                      number={prob.number}
                      question={prob.question}
                      BespokeTracer={TRACER_MAP[prob.algorithm || prob.visualizationType]}
                      algorithm={prob.algorithm || prob.visualizationType}
                      data={prob.data}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {problems.length === 0 && lectureMeta.sheetImagesCount === 0 && (
          <div className={styles.noProblems}>
            <h3>No content found for this sheet.</h3>
            <p>Check back later as we extract more content!</p>
          </div>
        )}
      </div>

      {/* Nav bar for sections */}
      <div className={styles.navBar}>
        {prevSection ? (
          <Link to={`/section/${prevSection.id}`} className="btn btn-outline">
            ◀ Previous Workbook (Lec {parseInt(prevSection.id)})
          </Link>
        ) : <div />}
        
        <Link to={`/lecture/${id}`} className="btn btn-outline">
          📖 Back to Lecture {parseInt(id)} Notes
        </Link>

        {nextSection ? (
          <Link to={`/section/${nextSection.id}`} className="btn btn-outline">
            Next Workbook (Lec {parseInt(nextSection.id)}) ▶
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
