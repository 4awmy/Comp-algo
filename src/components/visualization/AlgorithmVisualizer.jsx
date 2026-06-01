import { useState, useEffect, useRef } from 'react'
import styles from './AlgorithmVisualizer.module.css'

// ── PSEUDOCODE DEFINITIONS ──────────────────────────────────────
const PSEUDOCODE = {
  bubbleSort: [
    "for i = 0 to n - 2 do",
    "  for j = 0 to n - 2 - i do",
    "    if A[j+1] < A[j] swap A[j] and A[j+1]"
  ],
  selectionSort: [
    "for i = 0 to n - 2 do",
    "  min_index = i",
    "  for j = i + 1 to n - 1 do",
    "    if A[j] < A[min_index] min_index = j",
    "  swap A[i] and A[min_index]"
  ],
  insertionSort: [
    "for i = 1 to n - 1 do",
    "  v = A[i]",
    "  j = i - 1",
    "  while j >= 0 and A[j] > v do",
    "    A[j + 1] = A[j]",
    "    j = j - 1",
    "  A[j + 1] = v"
  ],
  binarySearch: [
    "low = 0, high = n - 1",
    "while low <= high do",
    "  mid = (low + high) / 2",
    "  if A[mid] == key return mid",
    "  else if A[mid] < key low = mid + 1",
    "  else high = mid - 1",
    "return -1"
  ],
  stringMatching: [
    "for i = 0 to n - m do",
    "  j = 0",
    "  while j < m and P[j] == T[i + j] do",
    "    j = j + 1",
    "  if j == m return i",
    "return -1"
  ]
}

export default function AlgorithmVisualizer({ algorithm, targetKey }) {
  const [array, setArray] = useState([])
  const [steps, setSteps] = useState([])
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(600) // ms per step
  
  const timerRef = useRef(null)

  // Initialize visualization steps
  useEffect(() => {
    generateInitialData()
  }, [algorithm, targetKey])

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((idx) => {
          if (idx >= steps.length - 1) {
            setIsPlaying(false)
            return idx
          }
          return idx + 1
        })
      }, speed)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, steps, speed])

  const generateInitialData = () => {
    setIsPlaying(false)
    setCurrentStepIdx(0)

    if (algorithm === 'bubbleSort' || algorithm === 'selectionSort' || algorithm === 'insertionSort') {
      const initialArray = [45, 12, 89, 34, 67, 23, 56, 78].slice(0, 7)
      setArray(initialArray)
      
      const newSteps = []
      // Clone original state
      newSteps.push({
        arr: [...initialArray],
        active: [],
        comparing: [],
        swapping: [],
        sorted: [],
        line: 0,
        desc: "Initial array generated."
      })

      if (algorithm === 'bubbleSort') {
        const arr = [...initialArray]
        const n = arr.length
        for (let i = 0; i < n - 1; i++) {
          newSteps.push({ arr: [...arr], comparing: [], line: 0, desc: `Pass ${i + 1} starting.` })
          for (let j = 0; j < n - 1 - i; j++) {
            newSteps.push({ arr: [...arr], comparing: [j, j + 1], line: 1, desc: `Compare A[${j}] (${arr[j]}) and A[${j + 1}] (${arr[j + 1]})` })
            if (arr[j] > arr[j + 1]) {
              const temp = arr[j]
              arr[j] = arr[j + 1]
              arr[j + 1] = temp
              newSteps.push({ arr: [...arr], swapping: [j, j + 1], line: 2, desc: `Swap A[${j}] and A[${j + 1}]` })
            }
          }
          newSteps.push({ arr: [...arr], comparing: [], sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k), line: 0, desc: `Element A[${n - 1 - i}] is in its final sorted position.` })
        }
        newSteps.push({ arr: [...arr], comparing: [], sorted: Array.from({ length: n }, (_, k) => k), line: 0, desc: "Array fully sorted!" })
      } 
      else if (algorithm === 'selectionSort') {
        const arr = [...initialArray]
        const n = arr.length
        for (let i = 0; i < n - 1; i++) {
          let minIdx = i
          newSteps.push({ arr: [...arr], active: [minIdx], comparing: [], line: 0, desc: `Pass ${i + 1}: Set A[${i}] (${arr[i]}) as starting minimum.` })
          for (let j = i + 1; j < n; j++) {
            newSteps.push({ arr: [...arr], active: [minIdx], comparing: [j], line: 2, desc: `Compare A[${j}] (${arr[j]}) with current minimum A[${minIdx}] (${arr[minIdx]}).` })
            if (arr[j] < arr[minIdx]) {
              minIdx = j
              newSteps.push({ arr: [...arr], active: [minIdx], comparing: [], line: 3, desc: `New minimum found at index ${minIdx} (${arr[minIdx]}).` })
            }
          }
          if (minIdx !== i) {
            const temp = arr[i]
            arr[i] = arr[minIdx]
            arr[minIdx] = temp
            newSteps.push({ arr: [...arr], swapping: [i, minIdx], line: 4, desc: `Swap A[${i}] and A[${minIdx}].` })
          }
          newSteps.push({ arr: [...arr], comparing: [], sorted: Array.from({ length: i + 1 }, (_, k) => k), line: 0, desc: `Position A[${i}] is now sorted.` })
        }
        newSteps.push({ arr: [...arr], comparing: [], sorted: Array.from({ length: n }, (_, k) => k), line: 0, desc: "Array fully sorted!" })
      }
      else if (algorithm === 'insertionSort') {
        const arr = [...initialArray]
        const n = arr.length
        for (let i = 1; i < n; i++) {
          const v = arr[i]
          let j = i - 1
          newSteps.push({ arr: [...arr], active: [i], comparing: [], line: 1, desc: `Pick value v = A[${i}] (${v}) to insert.` })
          while (j >= 0 && arr[j] > v) {
            newSteps.push({ arr: [...arr], active: [i], comparing: [j], line: 3, desc: `A[${j}] (${arr[j]}) > v (${v}), shift A[${j}] right.` })
            arr[j + 1] = arr[j]
            j--
            newSteps.push({ arr: [...arr], active: [i], swapping: [j + 2], line: 4, desc: `Shifted value to index ${j + 2}.` })
          }
          arr[j + 1] = v
          newSteps.push({ arr: [...arr], active: [j + 1], line: 6, desc: `Place v (${v}) at index ${j + 1}.` })
        }
        newSteps.push({ arr: [...arr], comparing: [], sorted: Array.from({ length: n }, (_, k) => k), line: 0, desc: "Array fully sorted!" })
      }

      setSteps(newSteps)
    }
    else if (algorithm === 'binarySearch') {
      const searchArray = [12, 23, 34, 45, 56, 67, 78, 89]
      const key = parseInt(targetKey) || 56
      setArray(searchArray)

      const newSteps = []
      const n = searchArray.length
      let low = 0
      let high = n - 1
      let found = -1

      newSteps.push({
        arr: [...searchArray],
        low, high, mid: -1,
        active: [],
        line: 0,
        desc: `Searching for key ${key} in sorted array.`
      })

      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        newSteps.push({
          arr: [...searchArray],
          low, high, mid,
          line: 2,
          desc: `Calculate mid = (${low} + ${high}) / 2 = ${mid}. A[mid] = ${searchArray[mid]}.`
        })

        if (searchArray[mid] === key) {
          found = mid
          newSteps.push({
            arr: [...searchArray],
            low, high, mid,
            active: [mid],
            line: 3,
            desc: `Key found at index ${mid}! Return ${mid}.`
          })
          break
        } else if (searchArray[mid] < key) {
          low = mid + 1
          newSteps.push({
            arr: [...searchArray],
            low, high, mid,
            line: 4,
            desc: `A[mid] (${searchArray[mid]}) < key (${key}). Shift low to mid + 1 = ${low}.`
          })
        } else {
          high = mid - 1
          newSteps.push({
            arr: [...searchArray],
            low, high, mid,
            line: 5,
            desc: `A[mid] (${searchArray[mid]}) > key (${key}). Shift high to mid - 1 = ${high}.`
          })
        }
      }

      if (found === -1) {
        newSteps.push({
          arr: [...searchArray],
          low, high, mid: -1,
          line: 6,
          desc: `Search range empty. Key ${key} not found. Return -1.`
        })
      }

      setSteps(newSteps)
    }
    else if (algorithm === 'stringMatching') {
      const text = "AABRACADABRA"
      const pattern = targetKey || "CAD"
      
      const newSteps = []
      const n = text.length
      const m = pattern.length

      newSteps.push({
        text, pattern,
        i: 0, j: 0,
        comparing: [],
        matched: [],
        line: 0,
        desc: `Matching Pattern "${pattern}" against Text "${text}".`
      })

      let foundIdx = -1
      for (let i = 0; i <= n - m; i++) {
        newSteps.push({
          text, pattern, i, j: 0, comparing: [], line: 0,
          desc: `Align pattern at index i = ${i} of text.`
        })

        let j = 0
        while (j < m && pattern[j] === text[i + j]) {
          newSteps.push({
            text, pattern, i, j,
            comparing: [i + j],
            line: 2,
            desc: `Compare text[${i + j}] ('${text[i + j]}') with pattern[${j}] ('${pattern[j]}') — MATCH.`
          })
          j++
        }

        if (j < m) {
          newSteps.push({
            text, pattern, i, j,
            comparing: [i + j],
            line: 2,
            desc: `Compare text[${i + j}] ('${text[i + j]}') with pattern[${j}] ('${pattern[j]}') — MISMATCH.`
          })
        }

        if (j === m) {
          foundIdx = i
          newSteps.push({
            text, pattern, i, j: m,
            matched: Array.from({ length: m }, (_, k) => i + k),
            line: 4,
            desc: `Pattern fully matched at index ${i}!`
          })
          break
        }
      }

      if (foundIdx === -1) {
        newSteps.push({
          text, pattern, i: n - m + 1, j: 0,
          line: 5,
          desc: "Search complete. Pattern not found."
        })
      }

      setSteps(newSteps)
    }
  }

  const currentStep = steps[currentStepIdx] || { arr: [], desc: "" }
  const codeLines = PSEUDOCODE[algorithm] || []

  // Stepper functions
  const handleStepForward = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(c => c + 1)
    }
  }

  const handleStepBackward = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(c => c - 1)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStepIdx(0)
  }

  return (
    <div className={styles.container}>
      <div className={styles.visualizerArea}>
        {/* Render Array for Sorting and Binary Search */}
        {(algorithm.includes('Sort') || algorithm === 'binarySearch') && (
          <div className={styles.arrayContainer}>
            {currentStep.arr?.map((val, idx) => {
              // Color styles
              let statusClass = styles.barNormal
              if (algorithm === 'binarySearch') {
                if (idx === currentStep.mid) statusClass = styles.barMid
                else if (idx >= currentStep.low && idx <= currentStep.high) statusClass = styles.barRange
                if (currentStep.active?.includes(idx)) statusClass = styles.barSorted
              } else {
                if (currentStep.comparing?.includes(idx)) statusClass = styles.barComparing
                else if (currentStep.swapping?.includes(idx)) statusClass = styles.barSwapping
                else if (currentStep.sorted?.includes(idx)) statusClass = styles.barSorted
                else if (currentStep.active?.includes(idx)) statusClass = styles.barMin
              }

              return (
                <div key={idx} className={styles.barWrap}>
                  <div 
                    className={`${styles.bar} ${statusClass}`}
                    style={{ height: `${val * 2}px` }}
                  >
                    <span className={styles.barVal}>{val}</span>
                  </div>
                  <span className={styles.barIdx}>{idx}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Render String Matching Visualizer */}
        {algorithm === 'stringMatching' && (
          <div className={styles.stringContainer}>
            <div className={styles.textString}>
              <span className={styles.rowLabel}>Text:</span>
              {currentStep.text?.split('').map((char, idx) => {
                let matchClass = ''
                if (currentStep.comparing?.includes(idx)) matchClass = styles.charComparing
                if (currentStep.matched?.includes(idx)) matchClass = styles.charMatched
                return (
                  <span key={idx} className={`${styles.charBox} ${matchClass}`}>
                    {char}
                    <span className={styles.charIdx}>{idx}</span>
                  </span>
                )
              })}
            </div>
            
            <div 
              className={styles.patternString}
              style={{ marginLeft: `${(currentStep.i || 0) * 36 + 65}px`, transition: 'margin-left 0.3s ease' }}
            >
              <span className={styles.rowLabelPattern}>Pattern:</span>
              {currentStep.pattern?.split('').map((char, idx) => {
                let matchClass = ''
                if (idx < (currentStep.j || 0)) matchClass = styles.charMatched
                return (
                  <span key={idx} className={`${styles.charBoxPattern} ${matchClass}`}>
                    {char}
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Description and Pseudocode panel */}
      <div className={styles.controlPanel}>
        <div className={styles.descPanel}>
          <h4 className={styles.panelTitle}>💡 Step Description</h4>
          <p className={styles.stepDesc}>{currentStep.desc}</p>
          
          {/* Simulation Controls */}
          <div className={styles.playbackControls}>
            <button className="btn btn-outline" onClick={handleReset}>Reset</button>
            <button className="btn btn-outline" onClick={handleStepBackward} disabled={currentStepIdx === 0}>◀ Step</button>
            <button 
              className="btn btn-primary" 
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button className="btn btn-outline" onClick={handleStepForward} disabled={currentStepIdx === steps.length - 1}>Step ▶</button>
          </div>

          {/* Speed slider */}
          <div className={styles.speedSliderWrap}>
            <label className={styles.sliderLabel}>Animation Speed:</label>
            <input 
              type="range" 
              min="150" 
              max="1500" 
              value={1650 - speed} 
              onChange={(e) => setSpeed(1650 - parseInt(e.target.value))}
              className={styles.speedSlider}
            />
          </div>
        </div>

        <div className={styles.codePanel}>
          <h4 className={styles.panelTitle}>💻 Algorithm Code</h4>
          <div className={styles.codeLines}>
            {codeLines.map((line, idx) => (
              <div 
                key={idx} 
                className={`${styles.codeLine} ${currentStep.line === idx ? styles.activeCodeLine : ''}`}
              >
                <span className={styles.lineNumber}>{idx + 1}</span>
                <span className={styles.lineText}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
