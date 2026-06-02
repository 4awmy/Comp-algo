/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './AlgorithmVisualizer.module.css'

// ── Pseudocode Constants ───────────────────────────────────────
const PSEUDOCODE = {
  bubbleSort: [
    "for i = 0 to n - 2 do",
    "  for j = 0 to n - i - 2 do",
    "    if A[j] > A[j + 1]",
    "      swap(A[j], A[j + 1])"
  ],
  selectionSort: [
    "for i = 0 to n - 2 do",
    "  min_idx = i",
    "  for j = i + 1 to n - 1 do",
    "    if A[j] < A[min_idx]",
    "      min_idx = j",
    "  swap(A[i], A[min_idx])"
  ],
  comparisonCountingSort: [
    "for i = 0 to n - 1 do Count[i] = 0",
    "for i = 0 to n - 2 do",
    "  for j = i + 1 to n - 1 do",
    "    if A[i] < A[j] Count[j]++",
    "    else Count[i]++",
    "for i = 0 to n - 1 do S[Count[i]] = A[i]"
  ],
  horspoolSearch: [
    "Construct ShiftTable(P)",
    "i = m - 1",
    "while i <= n - 1 do",
    "  k = 0",
    "  while k <= m - 1 and P[m - 1 - k] == T[i - k] do k++",
    "  if k == m return i - m + 1",
    "  else i = i + ShiftTable[T[i]]"
  ],
  hashing: [
    "Index = hash(Key)",
    "if Collision:",
    "  handleCollision(Strategy)"
  ]
}

// ── Main Component ─────────────────────────────────────────────
export default function AlgorithmVisualizer({ algorithm, targetKey }) {
  const [steps, setSteps] = useState([])
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(800)
  const timerRef = useRef(null)

  // ── Data Generation ──────────────────────────────────────────
  const generateSteps = useCallback(() => {
    const newSteps = []
    
    if (algorithm === 'comparisonCountingSort') {
      const arr = [62, 31, 84, 96, 19, 47]
      const n = arr.length
      const counts = Array(n).fill(0)
      const sortedArr = Array(n).fill(null)
      
      newSteps.push({
        arr: [...arr],
        counts: [...counts],
        sortedArr: [...sortedArr],
        line: 0,
        desc: "Init Counts array to 0.",
        vars: { i: '-', j: '-', action: 'Initialize' }
      })

      for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
          const comp = arr[i] < arr[j]
          if (comp) counts[j]++
          else counts[i]++
          
          newSteps.push({
            arr: [...arr],
            counts: [...counts],
            sortedArr: [...sortedArr],
            comparing: [i, j],
            activeIdx: i,
            line: 3,
            desc: `Compare A[${i}](${arr[i]}) vs A[${j}](${arr[j]}). ${comp ? 'A[j]++' : 'A[i]++'}`,
            vars: { i, j, action: 'Comparing' }
          })
        }
      }

      for (let i = 0; i < n; i++) {
        const pos = counts[i]
        sortedArr[pos] = arr[i]
        newSteps.push({
          arr: [...arr],
          counts: [...counts],
          sortedArr: [...sortedArr],
          activeIdx: i,
          line: 5,
          desc: `Place ${arr[i]} at sorted position ${pos}.`,
          vars: { i, j: '-', action: `S[${pos}] = ${arr[i]}` }
        })
      }
    } 
    else if (algorithm === 'horspoolSearch') {
      const text = "JIM_SAW_ME_IN_A_BARBERSHOP"
      const pattern = targetKey || "BARBER"
      const m = pattern.length
      const n = text.length
      const shiftTable = {}
      for (let x = 0; x < 256; x++) shiftTable[String.fromCharCode(x)] = m

      for (let j = 0; j < m - 1; j++) shiftTable[pattern[j]] = m - 1 - j

      let i = m - 1
      newSteps.push({ text, pattern, i, k: 0, line: 1, desc: "Align at start.", vars: { i, k: 0, action: 'Align' } })

      while (i <= n - 1) {
        let k = 0
        while (k < m && pattern[m-1-k] === text[i-k]) {
          k++
          newSteps.push({ text, pattern, i, k, line: 4, desc: `Match: ${text[i-k+1]}`, vars: { i, k, action: 'Match' } })
        }
        if (k === m) {
          newSteps.push({ text, pattern, i, k, line: 5, desc: "Found!", vars: { i, k, action: 'FOUND' } })
          break
        } else {
          const s = shiftTable[text[i]] || m
          newSteps.push({ text, pattern, i, k, line: 6, desc: `Mismatch. Shift by ${s}.`, vars: { i, k, action: `Shift ${s}` } })
          i += s
        }
      }
    }
    else if (algorithm === 'hashing') {
      const mode = targetKey === 'chaining' ? 'chaining' : 'probing'
      const keys = [12, 19, 5, 26, 13]
      const size = 7
      const table = Array(size).fill(null).map(() => mode === 'chaining' ? [] : null)

      newSteps.push({ table: table.map(r => Array.isArray(r) ? [...r] : r), mode, line: 0, desc: "Init Table.", vars: { action: 'Init' } })
      
      keys.forEach(k => {
        const h = k % size
        newSteps.push({ table: table.map(r => Array.isArray(r) ? [...r] : r), mode, activeKey: k, activeIdx: h, line: 0, desc: `Hash ${k} % ${size} = ${h}`, vars: { key: k, hash: h, action: 'Hash' } })
        
        if (mode === 'chaining') {
          table[h].push(k)
          newSteps.push({ table: table.map(r => Array.isArray(r) ? [...r] : r), mode, activeKey: k, activeIdx: h, line: 2, desc: `Chaining: Insert ${k}`, vars: { key: k, hash: h, action: 'Insert' } })
        } else {
          let curr = h
          while (table[curr] !== null) {
            newSteps.push({ table: [...table], mode, activeKey: k, activeIdx: curr, colliding: true, line: 2, desc: "Collision!", vars: { key: k, hash: h, action: 'Collision' } })
            curr = (curr + 1) % size
          }
          table[curr] = k
          newSteps.push({ table: [...table], mode, activeKey: k, activeIdx: curr, line: 2, desc: `Probing: Insert ${k}`, vars: { key: k, hash: h, action: 'Insert' } })
        }
      })
    }
    // Simple fallback for other algorithms
    else {
      newSteps.push({ desc: "Algorithm simulation not implemented yet.", line: 0 })
    }

    setSteps(newSteps)
    setCurrentStepIdx(0)
  }, [algorithm, targetKey])

  useEffect(() => {
    generateSteps()
  }, [generateSteps])

  // ── Animation Loop ──────────────────────────────────────────
  useEffect(() => {
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timerRef.current = setTimeout(() => {
        setCurrentStepIdx(i => i + 1)
      }, speed)
    } else {
      setIsPlaying(false)
    }
    return () => clearTimeout(timerRef.current)
  }, [isPlaying, currentStepIdx, steps.length, speed])

  const currentStep = steps[currentStepIdx] || { desc: "Loading..." }
  const codeLines = PSEUDOCODE[algorithm] || []

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className={styles.container}>
      <div className={styles.visualizerArea}>
        {/* Render Hashing */}
        {algorithm === 'hashing' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '30px', width: '100%', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {currentStep.table?.map((val, idx) => {
                  const isActive = idx === currentStep.activeIdx
                  return (
                    <div key={idx} style={{
                      display: 'flex', padding: '6px 12px', background: isActive ? 'rgba(59,130,246,0.1)' : 'var(--bg-surface)',
                      border: '1px solid', borderColor: isActive ? 'var(--accent-blue)' : 'var(--border-subtle)',
                      borderRadius: '6px', width: '220px', justifyContent: 'space-between', fontFamily: 'var(--font-code)'
                    }}>
                      <span style={{ color: 'var(--text-muted)' }}>{idx}:</span>
                      {currentStep.mode === 'chaining' ? 
                        <span>{val.join(' → ') || 'null'}</span> :
                        <span>{val ?? '-'}</span>
                      }
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Render Counting Sort */}
        {algorithm === 'comparisonCountingSort' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {currentStep.arr?.map((v, i) => (
                <div key={i} style={{ 
                  width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: currentStep.comparing?.includes(i) ? 'rgba(59,130,246,0.2)' : 'var(--bg-surface)',
                  border: '1px solid', borderColor: currentStep.comparing?.includes(i) ? 'var(--accent-blue)' : 'var(--border-subtle)',
                  borderRadius: '4px', fontWeight: '700'
                }}>{v}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', color: 'var(--accent-cyan)' }}>
              {currentStep.counts?.map((c, i) => <div key={i} style={{ width: '40px', textAlign: 'center' }}>{c}</div>)}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {currentStep.sortedArr?.map((v, i) => (
                <div key={i} style={{ 
                  width: '40px', height: '40px', border: '1px dashed var(--border-subtle)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: v ? 'rgba(16,185,129,0.1)' : 'transparent', borderRadius: '4px'
                }}>{v ?? ''}</div>
              ))}
            </div>
          </div>
        )}

        {/* Render Horspool */}
        {algorithm === 'horspoolSearch' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
              {currentStep.text?.split('').map((c, idx) => (
                <div key={idx} style={{ 
                  width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: idx === currentStep.i ? 'rgba(234,179,8,0.2)' : 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)', fontSize: '12px'
                }}>{c === ' ' ? '␣' : c}</div>
              ))}
            </div>
            <div style={{ paddingLeft: `${(currentStep.i - currentStep.pattern?.length + 1) * 26}px`, display: 'flex', gap: '2px' }}>
              {currentStep.pattern?.split('').map((c, idx) => (
                <div key={idx} style={{ 
                  width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-elevated)', border: '1px solid var(--accent-purple)', color: 'var(--accent-purple)',
                  fontWeight: '700'
                }}>{c}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.controlsSection}>
        <div className={styles.stepInfo}>
          <p className={styles.stepDesc}>💡 {currentStep.desc}</p>
          <div className={styles.stepButtons}>
            <button className="btn btn-outline" onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx-1))}>◀ Step</button>
            <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '⏸ Pause' : '▶ Play'}</button>
            <button className="btn btn-outline" onClick={() => setCurrentStepIdx(Math.min(steps.length-1, currentStepIdx+1))}>Step ▶</button>
          </div>
        </div>

        <div className={styles.codePanel}>
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
