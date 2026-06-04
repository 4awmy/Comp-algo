/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const AsymptoticNotationTracer = ({ style }) => {
  const [n, setN] = useState(10);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Linear search trace for cases
  const steps = useMemo(() => {
    const arr = [12, 45, 33, 7, 21, 9, 56, 18, 2, 40];
    const n = arr.length;
    const s = [];

    // Best Case: Target is first
    s.push({ mode: 'Best Case', target: 12, active: 0, found: true, count: 1, desc: "Best Case: Key found at the very first position. T(n) = 1." });
    
    // Worst Case: Target is last or missing
    s.push({ mode: 'Worst Case', target: 99, active: n-1, found: false, count: n, desc: `Worst Case: Key missing or at end. Scanned all ${n} items. T(n) = n.` });

    // Asymptotic visualization
    s.push({ mode: 'Notations', desc: "Visualizing O (Upper Bound), Ω (Lower Bound), and Θ (Tight Bound)." });

    return s;
  }, []);

  const current = steps[currentStepIdx] || steps[0];

  return (
    <VisualStage style={style} 
      title="Best, Worst Case & Notations"
      description={current.desc}
      actions={
        <div className={styles.tracerActions}>
           <div className={styles.stepControls}>
             <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}>Prev</button>
             <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(Math.min(steps.length - 1, currentStepIdx + 1))}>Next</button>
           </div>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-8 w-full p-4">
        {current.mode === 'Notations' ? (
          <div className="relative w-full h-48 border-l border-b border-white/20">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Lower bound Omega */}
                <path d="M0,100 Q30,95 100,85" fill="none" stroke="var(--color-success)" strokeWidth="1" strokeDasharray="2,2" />
                {/* Upper bound O */}
                <path d="M0,100 Q30,50 100,0" fill="none" stroke="var(--color-error)" strokeWidth="1" strokeDasharray="2,2" />
                {/* Tight bound Theta */}
                <path d="M0,100 Q30,80 100,60" fill="none" stroke="var(--accent-purple)" strokeWidth="2" />
                {/* Actual random-ish complexity */}
                <polyline points="0,100 10,95 20,85 30,88 40,82 50,75 60,78 70,70 80,65 90,68 100,62" fill="none" stroke="white" strokeWidth="0.5" opacity="0.6" />
             </svg>
             <div className="absolute top-2 right-2 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[8px] text-red-400 font-bold">--- O(g(n)) - Upper Bound</div>
                <div className="flex items-center gap-2 text-[8px] text-purple-400 font-bold">--- Θ(g(n)) - Tight Bound</div>
                <div className="flex items-center gap-2 text-[8px] text-green-400 font-bold">--- Ω(g(n)) - Lower Bound</div>
             </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
             <div className="flex gap-2">
                {[12, 45, 33, 7, 21, 9, 56, 18, 2, 40].map((v, i) => (
                   <div key={i} className={`w-8 h-8 flex items-center justify-center rounded border transition-all ${v === current.target && current.found ? 'border-green-400 bg-green-400/10' : i <= current.active ? 'border-accent-cyan bg-accent-cyan/10' : 'border-white/5'}`}>
                      <span className="text-xs font-mono">{v}</span>
                   </div>
                ))}
             </div>
             <div className="text-center font-bold text-accent-cyan">Operations: {current.count}</div>
          </div>
        )}
      </div>
    </VisualStage>
  );
};

export default AsymptoticNotationTracer;
