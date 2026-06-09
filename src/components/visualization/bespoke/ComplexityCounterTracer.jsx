/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import MathBlock from '../../ui/Premium/MathBlock';
import styles from './Bespoke.module.css';

const ComplexityCounterTracer = ({ style }) => {
  const [n, setN] = useState(5);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('single'); // 'single' | 'multiple' | 'conditional' | 'nested'

  const steps = useMemo(() => {
    const s = [];
    if (mode === 'single') {
      let count = 0;
      s.push({ count: 0, active: -1, desc: <span>Initialize loop. <MathBlock math="n" />={n}</span> });
      for (let i = 0; i < n; i++) {
        count++;
        s.push({ count, active: i, desc: `Iteration ${i+1}: x ← x + 4 executed.` });
      }
      s.push({ count, active: -1, desc: <span>Final count: {count} basic operations (exactly <MathBlock math="n" />).</span> });
    } else if (mode === 'multiple') {
      let count = 0;
      s.push({ count: 0, active: -1, desc: <span>3 operations per loop. <MathBlock math="n" />={n}</span> });
      for (let i = 0; i < n; i++) {
        count += 3;
        s.push({ count, active: i, desc: `Iteration ${i+1}: 3 assignments executed (+3).` });
      }
      s.push({ count, active: -1, desc: <span>Final count: {count} operations (exactly <MathBlock math="3n" />).</span> });
    } else if (mode === 'conditional') {
      const arr = [10, 20, 5, 30, 15];
      let count = 0;
      s.push({ count: 0, arr, active: -1, desc: "Count only if A[i] > 15." });
      for (let i = 0; i < arr.length; i++) {
        const cond = arr[i] > 15;
        if (cond) count++;
        s.push({ 
          count, arr, active: i, cond, 
          desc: `Checking ${arr[i]} > 15? ${cond ? 'YES: x ← A[i] - 2 (+1)' : 'NO: Skip.'}` 
        });
      }
      s.push({ count, arr, active: -1, desc: `Final count: ${count} operations executed.` });
    } else if (mode === 'nested') {
      let count = 0;
      s.push({ count: 0, i: -1, j: -1, desc: <span><MathBlock math="n \times n" /> grid execution. <MathBlock math="n" />={n}</span> });
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          count++;
          s.push({ count, i, j, desc: `Inner loop (${i}, ${j}): operation executed.` });
        }
      }
      s.push({ count, i: -1, j: -1, desc: <span>Final count: {count} operations (exactly <MathBlock math="n^2" />).</span> });
    }
    return s;
  }, [mode, n]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => setCurrentStepIdx(prev => prev + 1), 500);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const current = steps[currentStepIdx] || steps[0];

  return (
    <VisualStage style={style}
      title="Basic Operation Counter"
      description={current.desc}
      actions={
        <div className={styles.tracerActions}>
           <select className={styles.tracerSelect} value={mode} onChange={e => {setMode(e.target.value); setCurrentStepIdx(0);}}>
             <option value="single">Simple Loop (n)</option>
             <option value="multiple">3 Ops per Loop (3n)</option>
             <option value="conditional">Conditional Op</option>
             <option value="nested">Nested Loop (n²)</option>
           </select>
           <div className={styles.stepControls}>
             <button className={`${styles.btnOutline} ${styles.btnSm}`} onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}>Prev</button>
             <button className={`${styles.btnPrimary} ${styles.btnSm}`} onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
             <button className={`${styles.btnOutline} ${styles.btnSm}`} onClick={() => setCurrentStepIdx(Math.min(steps.length - 1, currentStepIdx + 1))}>Next</button>
           </div>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%', padding: '1rem' }}>
        {/* Visual representation */}
        <div style={{ display: 'flex', gap: '0.5rem', height: '5rem', alignItems: 'flex-end' }}>
           {mode === 'nested' ? (
             <div style={{ display: 'grid', gap: '4px', gridTemplateColumns: `repeat(${n}, 20px)` }}>
                {Array.from({ length: n * n }).map((_, idx) => {
                   const row = Math.floor(idx / n);
                   const col = idx % n;
                   const isPast = row < current.i || (row === current.i && col <= current.j);
                   const isCurrent = row === current.i && col === current.j;
                   return <div key={idx} style={{ 
                     width: '20px', 
                     height: '20px', 
                     borderRadius: '4px',
                     background: isCurrent ? 'var(--accent-purple)' : isPast ? 'var(--accent-blue)' : 'var(--bg-elevated)',
                     opacity: isCurrent ? 1 : isPast ? 0.4 : 1,
                     boxShadow: isCurrent ? '0 0 10px var(--accent-purple)' : 'none',
                     transition: 'all 0.3s'
                   }} />
                })}
             </div>
           ) : mode === 'conditional' ? (
             <div style={{ display: 'flex', gap: '0.5rem' }}>
                {current.arr?.map((v, idx) => (
                  <div key={idx} className={styles.infoCard} style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    border: idx === current.active ? '2px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                    transform: idx === current.active ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.3s',
                    padding: 0
                  }}>
                    <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold' }}>{v}</span>
                    {idx === current.active && current.cond && <span style={{ fontSize: '8px', color: 'var(--color-success)', fontWeight: 'bold', position: 'absolute', top: '-15px' }}>COUNT!</span>}
                  </div>
                ))}
             </div>
           ) : (
             <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: n }).map((_, idx) => (
                  <div key={idx} style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    borderRadius: '4px',
                    background: idx === current.active ? 'var(--accent-purple)' : idx < current.active ? 'var(--accent-blue)' : 'var(--bg-elevated)',
                    opacity: idx === current.active ? 1 : idx < current.active ? 0.4 : 1,
                    transform: idx === current.active ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.3s'
                  }} />
                ))}
             </div>
           )}
        </div>

        {/* Counter Display */}
        <div className={styles.infoCard} style={{ alignItems: 'center', minWidth: '200px' }}>
           <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Basic Operations</span>
           <span className={styles.resultValue} style={{ fontSize: 'var(--text-4xl)' }}>{current.count}</span>
        </div>
      </div>
    </VisualStage>
  );
};

export default ComplexityCounterTracer;
