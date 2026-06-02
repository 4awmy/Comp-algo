/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import MathBlock from '../../ui/Premium/MathBlock';
import styles from './Bespoke.module.css';

const ComplexityCounterTracer = () => {
  const [n, setN] = useState(5);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('single'); // 'single' | 'multiple' | 'conditional' | 'nested'

  const steps = useMemo(() => {
    const s = [];
    if (mode === 'single') {
      let count = 0;
      s.push({ count: 0, active: -1, desc: `Initialize loop. n=${n}` });
      for (let i = 0; i < n; i++) {
        count++;
        s.push({ count, active: i, desc: `Iteration ${i+1}: x ← x + 4 executed.` });
      }
      s.push({ count, active: -1, desc: `Final count: ${count} basic operations (exactly n).` });
    } else if (mode === 'multiple') {
      let count = 0;
      s.push({ count: 0, active: -1, desc: `3 operations per loop. n=${n}` });
      for (let i = 0; i < n; i++) {
        count += 3;
        s.push({ count, active: i, desc: `Iteration ${i+1}: 3 assignments executed (+3).` });
      }
      s.push({ count, active: -1, desc: `Final count: ${count} operations (exactly 3n).` });
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
      s.push({ count: 0, i: -1, j: -1, desc: `n x n grid execution. n=${n}` });
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          count++;
          s.push({ count, i, j, desc: `Inner loop (${i}, ${j}): operation executed.` });
        }
      }
      s.push({ count, i: -1, j: -1, desc: `Final count: ${count} operations (exactly n²).` });
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
    <VisualStage 
      title="Basic Operation Counter"
      description={current.desc}
      actions={
        <div className={styles.tracerActions}>
           <select className="select select-xs select-bordered" value={mode} onChange={e => {setMode(e.target.value); setCurrentStepIdx(0);}}>
             <option value="single">Simple Loop (n)</option>
             <option value="multiple">3 Ops per Loop (3n)</option>
             <option value="conditional">Conditional Op</option>
             <option value="nested">Nested Loop (n²)</option>
           </select>
           <div className={styles.stepControls}>
             <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}>Prev</button>
             <button className="btn btn-primary btn-sm" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
             <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(Math.min(steps.length - 1, currentStepIdx + 1))}>Next</button>
           </div>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-6 w-full p-4">
        {/* Visual representation */}
        <div className="flex gap-2 h-20 items-end">
           {mode === 'nested' ? (
             <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${n}, 20px)` }}>
                {Array.from({ length: n * n }).map((_, idx) => {
                   const row = Math.floor(idx / n);
                   const col = idx % n;
                   const isPast = row < current.i || (row === current.i && col <= current.j);
                   const isCurrent = row === current.i && col === current.j;
                   return <div key={idx} className={`w-5 h-5 rounded ${isCurrent ? 'bg-accent-cyan shadow-[0_0_10px_var(--accent-cyan)]' : isPast ? 'bg-accent-blue/40' : 'bg-white/5'}`} />
                })}
             </div>
           ) : mode === 'conditional' ? (
             <div className="flex gap-2">
                {current.arr?.map((v, idx) => (
                  <div key={idx} className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg border-2 transition-all ${idx === current.active ? 'border-accent-yellow scale-110' : 'border-white/10'}`}>
                    <span className="text-lg font-bold">{v}</span>
                    {idx === current.active && current.cond && <span className="text-[8px] text-green-400 font-bold">COUNT!</span>}
                  </div>
                ))}
             </div>
           ) : (
             <div className="flex gap-1">
                {Array.from({ length: n }).map((_, idx) => (
                  <div key={idx} className={`w-8 h-8 rounded-md transition-all ${idx === current.active ? 'bg-accent-cyan shadow-[0_0_15px_var(--accent-cyan)] scale-110' : idx < current.active ? 'bg-accent-blue/40' : 'bg-white/5'}`} />
                ))}
             </div>
           )}
        </div>

        {/* Counter Display */}
        <div className="flex flex-col items-center p-4 rounded-xl bg-black/40 border border-white/10 min-w-[200px]">
           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Basic Operations</span>
           <span className="text-4xl font-black text-accent-cyan">{current.count}</span>
        </div>
      </div>
    </VisualStage>
  );
};

export default ComplexityCounterTracer;
