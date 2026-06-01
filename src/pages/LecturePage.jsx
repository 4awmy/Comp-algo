/* eslint-disable */
import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getLectureById, LECTURES } from '../data/lectures'
import { chatWithTutor } from '../services/geminiService'

// Portal Redesign Imports
import useLectureSync from '../hooks/useLectureSync'
import { LECTURE_MAPPINGS } from '../data/mappings'
import ExampleDrawer from '../components/lectures/ExampleDrawer'
import LessonBlock from '../components/lectures/LessonBlock'
import AITutorBubble from '../components/chat/AITutorBubble'

import styles from './LecturePage.module.css'

const LECTURE_PSEUDOCODE = {
  '04': [
    "for i = 0 to n - 2 do",
    "  min_index = i",
    "  for j = i + 1 to n - 1 do",
    "    if A[j] < A[min_index] min_index = j",
    "  swap A[i] and A[min_index]"
  ],
  '05': [
    "for i = 0 to n - m do",
    "  j = 0",
    "  while j < m and P[j] == T[i + j] do",
    "    j = j + 1",
    "  if j == m return i",
    "return -1"
  ],
  '06': [
    "for i = 1 to n - 1 do",
    "  v = A[i]",
    "  j = i - 1",
    "  while j >= 0 and A[j] > v do",
    "    A[j + 1] = A[j]",
    "    j = j - 1",
    "  A[j + 1] = v"
  ]
}

const LECTURE_VISUALIZERS = {
  '04': [
    { algorithm: 'bubbleSort', title: 'Bubble Sort' },
    { algorithm: 'selectionSort', title: 'Selection Sort' }
  ],
  '05': [
    { algorithm: 'stringMatching', title: 'Brute-Force String Matching', targetKey: 'CAD' }
  ],
  '06': [
    { algorithm: 'insertionSort', title: 'Insertion Sort' },
    { algorithm: 'binarySearch', title: 'Binary Search', targetKey: '56' }
  ],
  '09': [
    { algorithm: 'mergeSort', title: 'Merge Sort (Divide & Conquer)' },
    { algorithm: 'quickSort', title: 'Quick Sort (Divide & Conquer)' }
  ],

}

const collapseSlides = (lectureId, rawSlides) => {
  if (!rawSlides || rawSlides.length === 0) return []
  
  const slides = []
  
  if (lectureId === '01') {
    for (let idx = 0; idx < rawSlides.length; idx++) {
      const slide = rawSlides[idx]
      if (slide.slideNumber >= 11 && slide.slideNumber <= 15) {
        if (slide.slideNumber === 11) {
          slides.push({
            slideNumber: 11,
            title: "Euclid's GCD Algorithm (Visual Iterator)",
            content: ["Instead of scrolling through static slides, step through the live division algorithm below:"],
            notes: "Euclid's algorithm calculates GCD by recursively taking remainder: m = n, n = m % n.",
            embedVisualizer: "euclidGcd"
          })
        }
        continue
      }
      if (slide.slideNumber >= 17 && slide.slideNumber <= 21) {
        if (slide.slideNumber === 17) {
          slides.push({
            slideNumber: 17,
            title: "Sieve of Eratosthenes (Visual Iterator)",
            content: ["Step through the grid to see prime numbers highlighted and non-primes crossed out:"],
            notes: "The Sieve of Eratosthenes is a classic algorithm that crosses out multiples of each prime.",
            embedVisualizer: "sieveEratosthenes"
          })
        }
        continue
      }
      slides.push(slide)
    }
    return slides
  }
  
  if (lectureId === '02' || lectureId === '03') {
    const lastSlide = rawSlides[rawSlides.length - 1]
    const list = rawSlides.slice(0, rawSlides.length - 1)
    list.push({
      slideNumber: lastSlide.slideNumber - 0.5,
      title: "Interactive Growth Rates Chart (Visual Iterator)",
      content: ["Use the visualizer below to step through values of input size n and watch growth functions diverge:"],
      notes: "Compare the growth of constant O(1), logarithmic O(log n), linear O(n), quadratic O(n^2), and exponential O(2^n).",
      embedVisualizer: "bigOCurves"
    })
    list.push(lastSlide)
    return list
  }
  
  if (lectureId === '04') {
    for (let idx = 0; idx < rawSlides.length; idx++) {
      const slide = rawSlides[idx]
      if (slide.slideNumber >= 9 && slide.slideNumber <= 15) {
        if (slide.slideNumber === 9) {
          slides.push({
            slideNumber: 9,
            title: "Selection Sort Tracing (Visual Iterator)",
            content: ["Interactive step-by-step trace of Selection Sort loop states:"],
            notes: "Selection Sort searches for the minimum element in the remaining array and swaps it with the front.",
            embedVisualizer: "selectionSort"
          })
        }
        continue
      }
      if (slide.slideNumber >= 17 && slide.slideNumber <= 29) {
        if (slide.slideNumber === 17) {
          slides.push({
            slideNumber: 17,
            title: "Bubble Sort Tracing (Visual Iterator)",
            content: ["Interactive step-by-step trace of Bubble Sort comparisons and swaps:"],
            notes: "Bubble Sort bubbles the largest elements to the end of the array by comparing and swapping adjacent items.",
            embedVisualizer: "bubbleSort"
          })
        }
        continue
      }
      slides.push(slide)
    }
    return slides
  }
  
  if (lectureId === '05') {
    for (let idx = 0; idx < rawSlides.length; idx++) {
      const slide = rawSlides[idx]
      if (slide.slideNumber >= 39 && slide.slideNumber <= 76) {
        if (slide.slideNumber === 39) {
          slides.push({
            slideNumber: 39,
            title: "Brute-Force String Matching Tracing (Visual Iterator)",
            content: ["Step through pattern alignments and matching scans dynamically:"],
            notes: "Brute-force string matching shifts the pattern index i by 1 on every mismatch and restarts scanning.",
            embedVisualizer: "stringMatching"
          })
        }
        continue
      }
      slides.push(slide)
    }
    return slides
  }
  
  if (lectureId === '06') {
    for (let idx = 0; idx < rawSlides.length; idx++) {
      const slide = rawSlides[idx]
      if (slide.slideNumber >= 8 && slide.slideNumber <= 22) {
        if (slide.slideNumber === 8) {
          slides.push({
            slideNumber: 8,
            title: "Insertion Sort Tracing (Visual Iterator)",
            content: ["Step through elements shifting and insertion positions:"],
            notes: "Insertion Sort inserts the element into its sorted position in the sub-array A[0..i-1].",
            embedVisualizer: "insertionSort"
          })
        }
        continue
      }
      if (slide.slideNumber >= 24 && slide.slideNumber <= 34) {
        if (slide.slideNumber === 24) {
          slides.push({
            slideNumber: 24,
            title: "Binary Search Tracing (Visual Iterator)",
            content: ["Step through binary search bounds adjustments:"],
            notes: "Binary Search halves the search space at each iteration by checking low, high, and mid index elements.",
            embedVisualizer: "binarySearch"
          })
        }
        continue
      }
      slides.push(slide)
    }
    return slides
  }
  
  if (lectureId === '09') {
    for (let idx = 0; idx < rawSlides.length; idx++) {
      const slide = rawSlides[idx]
      if (slide.title?.toLowerCase().includes('merge sort') && slide.content?.join('').toLowerCase().includes('trace')) {
        slides.push(slide)
        slides.push({
          slideNumber: slide.slideNumber + 0.1,
          title: "Merge Sort Partitioning (Visual Iterator)",
          content: ["Animate array divisions and sorting merges:"],
          notes: "Merge Sort splits the array recursively, then merges and sorts sub-arrays.",
          embedVisualizer: "mergeSort"
        })
        continue
      }
      if (slide.title?.toLowerCase().includes('quick sort') && slide.content?.join('').toLowerCase().includes('trace')) {
        slides.push(slide)
        slides.push({
          slideNumber: slide.slideNumber + 0.1,
          title: "Quick Sort Partitioning (Visual Iterator)",
          content: ["Animate partition scanning pointers i and j crossing:"],
          notes: "Quick Sort partitions the array around a pivot element so that items smaller are left and larger are right.",
          embedVisualizer: "quickSort"
        })
        continue
      }
      slides.push(slide)
    }
    return listToUniqueSlideNumbers(slides)
  }
  
  if (lectureId === '11') {
    for (let idx = 0; idx < rawSlides.length; idx++) {
      const slide = rawSlides[idx]
      if (slide.title?.toLowerCase().includes('linear probing') && slide.slideNumber >= 15 && slide.slideNumber <= 22) {
        if (slide.slideNumber === 15) {
          slides.push({
            slideNumber: 15,
            title: "Hash Table & Linear Probing (Visual Iterator)",
            content: ["Observe key insertions, modular mapping, and linear collisions:"],
            notes: "Linear Probing probes consecutive slots index = (index + 1) % size when collisions occur.",
            embedVisualizer: "hashingProbing"
          })
        }
        continue
      }
      slides.push(slide)
    }
    return slides
  }
  
  if (lectureId === '13') {
    for (let idx = 0; idx < rawSlides.length; idx++) {
      const slide = rawSlides[idx]
      if (slide.title?.toLowerCase().includes('knapsack') && slide.slideNumber >= 18 && slide.slideNumber <= 28) {
        if (slide.slideNumber === 18) {
          slides.push({
            slideNumber: 18,
            title: "Knapsack DP Table Calculation (Visual Iterator)",
            content: ["Animate dynamic programming sub-capacity calculations:"],
            notes: "The Knapsack DP grid solves subproblems for items 1..i and capacity w, copying or maximizing values.",
            embedVisualizer: "knapsackDP"
          })
        }
        continue
      }
      slides.push(slide)
    }
    return slides
  }

  return rawSlides
}

const listToUniqueSlideNumbers = (arr) => {
  const seen = new Set()
  return arr.filter(item => {
    const duplicate = seen.has(item.slideNumber)
    seen.add(item.slideNumber)
    return !duplicate
  })
}

export default function LecturePage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const lectureMeta = getLectureById(id)
  
  const [lectureData, setLectureData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('visuals') // 'visuals' | 'tutor'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Portal Sync Hook
  const {
    activeCodeLine,
    activeSlide,
    handleLineClick,
    handleSlideChange,
  } = useLectureSync(0)

  // Reset on lecture change
  useEffect(() => {
    setIsDrawerOpen(false)
  }, [id])

  // Sync tab active state from URL params
  useEffect(() => {
    if (tabParam === 'visualizer' && lectureMeta?.hasVisualization) {
      setActiveTab('visuals')
    }
  }, [tabParam, id, lectureMeta])
  
  // AI Tutor Chat state
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [sendingChat, setSendingChat] = useState(false)
  const messagesEndRef = useRef(null)

  // Dynamically load the lecture JSON file
  useEffect(() => {
    setLoading(true)
    handleSlideChange(0)
    setChatMessages([
      {
        sender: 'bot',
        text: `Hi! I'm your Antigravity AI Tutor. Ask me anything about Dr. Moheeb's lecture: "${lectureMeta?.title || 'this lecture'}".`
      }
    ])
    
    import(`../data/lectures/lec${id}.json`)
      .then(res => {
        const collapsed = collapseSlides(id, res.default.slides || [])
        setLectureData({ ...res.default, slides: collapsed })
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load lecture JSON data:", err)
        setLoading(false)
      })
  }, [id, lectureMeta, handleSlideChange])

  // Scroll chat messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  if (!lectureMeta) {
    return (
      <div className={styles.container}>
        <div className={styles.noNotes}>Lecture not found</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Extracting slide deck content...</p>
        </div>
      </div>
    )
  }

  const slides = lectureData?.slides || []
  const currentSlide = slides[activeSlide]
  
  // Navigation
  const prevSlide = () => handleSlideChange(Math.max(0, activeSlide - 1))
  const nextSlide = () => handleSlideChange(Math.min(slides.length - 1, activeSlide + 1))
  
  // Lecture Links
  const prevLecture = LECTURES.find(l => l.number === lectureMeta.number - 1)
  const nextLecture = LECTURES.find(l => l.number === lectureMeta.number + 1)

  // Key navigation for slides
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prevSlide()
    if (e.key === 'ArrowRight') nextSlide()
  }

  // Handle AI Tutor Chat Send
  const handleSendChat = async (e) => {
    e.preventDefault()
    if (!chatInput.trim() || sendingChat) return

    const userMsg = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }])
    setSendingChat(true)

    const context = {
      lectureTitle: lectureMeta.title,
      slideNum: currentSlide?.slideNumber || (activeSlide + 1),
      slideTitle: currentSlide?.title || '',
      slideContent: currentSlide?.content || [],
      ocrContent: currentSlide?.ocrContent || '',
      speakerNotes: currentSlide?.notes || ''
    }

    try {
      const response = await chatWithTutor(context, userMsg, chatMessages)
      setChatMessages(prev => [...prev, { sender: 'bot', text: response }])
    } catch (err) {
      setChatMessages(prev => [
        ...prev, 
        { sender: 'bot', text: `Sorry, I encountered an error: ${err.message || 'Unknown network error'}. Please try again.` }
      ])
    } finally {
      setSendingChat(false)
    }
  }

  const getImageUrl = (path) => {
    if (!path) return ''
    const base = import.meta.env.BASE_URL || '/'
    return base + path.replace(/^\//, '')
  }

  const onPseudocodeLineClick = (lineId) => {
    handleLineClick(lineId)
    const mapping = LECTURE_MAPPINGS[id]?.codeToVisual[lineId]
    if (mapping?.type === 'slide') {
      const idx = slides.findIndex(s => s.slideNumber === mapping.id)
      if (idx !== -1) handleSlideChange(idx)
    }
  }

  // Removed VisualsContainer

  const renderInterspersedView = () => {
    // If we have sections or blocks, use them (Interspersed Lesson Flow)
    if (lectureData?.sections || lectureData?.blocks) {
      const blocks = lectureData.blocks || lectureData.sections?.flatMap(s => s.blocks || []) || []
      return (
        <div className={styles.interspersedContainer}>
          {blocks.map((block, idx) => (
            <LessonBlock 
              key={idx}
              block={block}
              activeCodeLine={activeCodeLine}
              onLineClick={onPseudocodeLineClick}
              getImageUrl={getImageUrl}
            />
          ))}
          {/* Numerical Example Button for Flow */}
          <div style={{ padding: '40px 0', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <button 
              className="btn btn-outline" 
              style={{ padding: '12px 24px' }}
              onClick={() => setIsDrawerOpen(true)}
            >
              🔍 View Detailed Numerical Example
            </button>
          </div>
        </div>
      )
    }

    // Fallback for traditional slide-based lectures
    return (
      <div className={styles.interspersedContainer}>
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: '800', marginBottom: '8px' }}>
            {lectureMeta.title}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>{lectureMeta.week} &bull; Vertical Lesson Flow</p>
        </header>

        {slides.map((slide, idx) => (
          <div key={idx} className={styles.slideBlock}>
            <div className={styles.slideHeader}>
              <h2 className={styles.slideTitle}>
                {slide.title || `Slide ${slide.slideNumber}`}
              </h2>
              <span className={styles.slideNumBadge}>Slide {slide.slideNumber}</span>
            </div>
            
            <div className={styles.slideBody} style={{ overflow: 'visible', minHeight: 'auto' }}>
              {slide.embedVisualizer ? (
                <LessonBlock 
                  block={{
                    type: 'visual',
                    algorithm: slide.embedVisualizer,
                    targetKey: slide.embedVisualizer === 'stringMatching' ? 'CAD' : '56'
                  }}
                />
              ) : slide.images && slide.images.length > 0 ? (
                <LessonBlock 
                  block={{
                    type: 'visual',
                    images: slide.images
                  }}
                  getImageUrl={getImageUrl}
                />
              ) : (
                <LessonBlock 
                  block={{
                    type: 'text',
                    content: slide.content?.map(b => `- ${b}`).join('\n')
                  }}
                />
              )}
            </div>

            {slide.notes && (
              <div className={styles.notesOverlay} style={{ position: 'static', marginTop: '20px', background: 'var(--bg-elevated)' }}>
                <h4 className={styles.ocrHeader}>Speaker Notes</h4>
                <div className={styles.notesBody}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{slide.notes}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className={styles.controlsBar} style={{ position: 'sticky', bottom: 0, margin: '0 -20px -40px', zIndex: 5, borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <div className={styles.navBtnGroup}>
             {prevLecture && <Link to={`/lecture/${prevLecture.id}`} className="btn btn-outline">◀ Previous Lecture</Link>}
             {nextLecture && <Link to={`/lecture/${nextLecture.id}`} className="btn btn-primary">Next Lecture ▶</Link>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container} onKeyDown={handleKeyDown} tabIndex="0">
      {/* Sticky Header with Title */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        zIndex: 10,
        position: 'sticky',
        top: 0
      }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          {lectureMeta.title}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {renderInterspersedView()}
      </div>

      <ExampleDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        title={`Numerical Example: ${lectureMeta.title}`}
      >
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <p>This drawer will contain detailed numerical examples and worked solutions for {lectureMeta.title}.</p>
          <div style={{ marginTop: '20px', padding: '15px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--accent-blue)', marginBottom: '10px' }}>Sample Trace</h4>
            <pre style={{ fontSize: '12px', fontFamily: 'var(--font-code)' }}>
              {`Input: [21, 14, 1, 12, 14]\nPass 1: [1, 14, 21, 12, 14]\nPass 2: [1, 12, 21, 14, 14]\nPass 3: [1, 12, 14, 21, 14]\nPass 4: [1, 12, 14, 14, 21]`}
            </pre>
          </div>
        </div>
      </ExampleDrawer>
      
      <AITutorBubble 
        chatMessages={chatMessages}
        onSendMessage={handleSendChat}
        sendingChat={sendingChat}
        chatInput={chatInput}
        setChatInput={setChatInput}
      />
    </div>
  )
}
