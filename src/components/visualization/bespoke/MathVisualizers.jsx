/* eslint-disable */
import React, { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

/**
 * Visualizes the arithmetic series summation formula (n(n+1)/2) using boxes.
 */
export const StackedTriangleDemo = ({ style }) => {
  const [n, setN] = useState(5);
  const total = (n * (n + 1)) / 2;

  return (
    <VisualStage style={style}
      title="Summation Visualization"
      description={`Visualizing the sum 1 + 2 + ... + n. The total area of the triangle is n(n+1)/2 = ${total}.`}
      actions={
        <div className={styles.tracerActions}>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={n} 
            onChange={(e) => setN(parseInt(e.target.value))}
            className={styles.rangeInput}
          />
          <span className={styles.halvingLabel}>n = {n}</span>
        </div>
      }
    >
      <div className={styles.mathContainer}>
        <div className={styles.triangleGrid}>
          {Array.from({ length: n }).map((_, rowIndex) => (
            <div key={rowIndex} className={styles.triangleRow}>
              {Array.from({ length: rowIndex + 1 }).map((_, colIndex) => (
                <div 
                  key={colIndex} 
                  className={styles.triangleCell}
                  style={{ animationDelay: `${(rowIndex * 50) + (colIndex * 20)}ms` }}
                >
                  <span className={styles.triangleCellText}>{rowIndex + 1}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.mathTotal}>
          Total Boxes: <span className={styles.mathTotalValue}>{total}</span>
        </div>
      </div>
    </VisualStage>
  );
};

/**
 * Visualizes a call stack for T(n) building up and then returning values.
 */
export const RecursiveCallStackDemo = ({ style }) => {
  const [maxN, setMaxN] = useState(4);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => {
    const s = [];
    // Downwards
    for (let i = maxN; i >= 0; i--) {
      s.push({ 
        n: i, 
        phase: 'down', 
        stack: Array.from({ length: maxN - i + 1 }).map((_, idx) => maxN - idx),
        desc: i > 0 ? `Calling T(${i-1}). Adding T(${i}) to stack.` : `Base case reached at T(0).`
      });
    }
    // Upwards
    for (let i = 1; i <= maxN; i++) {
      s.push({ 
        n: i, 
        phase: 'up', 
        stack: Array.from({ length: maxN - i }).map((_, idx) => maxN - idx),
        result: i,
        desc: `T(${i-1}) returned. T(${i}) = T(${i-1}) + 1 = ${i}.`
      });
    }
    return s;
  }, [maxN]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep((s) => {
          if (s >= steps.length - 1) {
            setIsPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const current = steps[step] || steps[0];

  return (
    <VisualStage style={style}
      title="Recursive Call Stack"
      description={current.desc}
      actions={
        <div className={styles.tracerActions}>
          <button className={styles.btnOutline} onClick={() => { setStep(0); setIsPlaying(true); }}>Reset & Play</button>
          <button className={styles.btnOutline} onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Resume'}</button>
          <div className={styles.divider}></div>
          <button className={styles.btnOutline} onClick={() => setStep(Math.max(0, step - 1))}>Prev</button>
          <button className={styles.btnOutline} onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>Next</button>
        </div>
      }
    >
      <div className={styles.stackContainer}>
        <div className={styles.stackVisual}>
          {current.stack.map((val, idx) => (
            <div 
              key={idx} 
              className={`${styles.stackFrame} ${idx === current.stack.length - 1 ? styles.stackFrameActive : ''}`}
            >
              <span className={styles.halvingLabel}>T({val})</span>
            </div>
          ))}
        </div>
        <div className={styles.stackStatus}>
           <span className={styles.statusLabel}>Status</span>
           <span className={`${styles.statusValue} ${current.phase === 'down' ? styles.statusValueDown : styles.statusValueUp}`}>
              {current.phase === 'down' ? 'Descending (Winding)' : 'Returning (Unwinding)'}
           </span>
           {current.phase === 'up' && (
             <div className={styles.halvingStep}>
                Result: <span className={styles.mathTotalValue}>{current.result}</span>
             </div>
           )}
        </div>
      </div>
    </VisualStage>
  );
};

/**
 * Visualizes a bar shrinking by half repeatedly for logarithmic complexity.
 */
export const HalvingBarChartDemo = ({ style }) => {
  const [initialSize, setInitialSize] = useState(128);
  
  const points = useMemo(() => {
    const p = [];
    let cur = initialSize;
    while (cur >= 1) {
      p.push(cur);
      cur /= 2;
    }
    return p;
  }, [initialSize]);

  return (
    <VisualStage style={style}
      title="Logarithmic Halving"
      description="Visualizing O(log n) where the problem size halves at each step."
      actions={
        <div className={styles.tracerActions}>
          <button className={styles.btnOutline} onClick={() => setInitialSize(128)}>128</button>
          <button className={styles.btnOutline} onClick={() => setInitialSize(256)}>256</button>
          <button className={styles.btnOutline} onClick={() => setInitialSize(512)}>512</button>
        </div>
      }
    >
      <div className={styles.halvingContainer}>
        {points.map((val, idx) => (
          <div key={idx} className={styles.halvingBarWrapper}>
             <div 
               className={styles.halvingBar} 
               style={{ height: `${(val / initialSize) * 150}px` }}
             ></div>
             <span className={styles.halvingLabel}>{Math.round(val)}</span>
             <span className={styles.halvingStep}>Step {idx}</span>
          </div>
        ))}
      </div>
    </VisualStage>
  );
};

/**
 * A mock "Scientific Experiment Lab" showing a race between two algorithms.
 */
export const EmpiricalDashboardDemo = ({ style }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState([]);
  const [n, setN] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setN(prevN => {
          if (prevN >= 50) {
            setIsRunning(false);
            return prevN;
          }
          const newN = prevN + 2;
          setData(d => [
            ...d, 
            { n: newN, t1: newN * 1.5 + (Math.random() * 5), t2: (newN * newN) / 10 + (Math.random() * 5) }
          ]);
          return newN;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <VisualStage style={style}
      title="Empirical Measurement Lab"
      description="Observe how hardware latency and noise affect real-world execution time compared to asymptotic curves."
      actions={
        <div className={styles.tracerActions}>
           <button 
             className={`${styles.btnPrimary} ${isRunning ? styles.btnError : ''}`} 
             onClick={() => {
               if (!isRunning) { setData([]); setN(0); }
               setIsRunning(!isRunning);
             }}
           >
             {isRunning ? 'Stop Lab' : 'Start Experiment'}
           </button>
        </div>
      }
    >
      <div className={styles.empiricalGrid}>
         <div className={styles.graphContainer}>
            <svg className={styles.svgContainer} viewBox="0 0 100 100" preserveAspectRatio="none">
               {/* Grid */}
               <line x1="0" y1="25" x2="100" y2="25" stroke="white" strokeWidth="0.1" opacity="0.1" />
               <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.1" opacity="0.1" />
               <line x1="0" y1="75" x2="100" y2="75" stroke="white" strokeWidth="0.1" opacity="0.1" />
               
               {/* Alg 1: O(n) */}
               <polyline 
                 points={data.map(d => `${d.n * 2},${100 - d.t1}`).join(' ')}
                 fill="none" stroke="var(--accent-blue)" strokeWidth="1"
               />
               {/* Alg 2: O(n^2) */}
               <polyline 
                 points={data.map(d => `${d.n * 2},${100 - d.t2}`).join(' ')}
                 fill="none" stroke="var(--color-error)" strokeWidth="1"
               />
            </svg>
            <div className={styles.graphLegend}>
               <span className={styles.legendLinear}>--- Algorithm A (Linear)</span>
               <span className={styles.legendQuadratic}>--- Algorithm B (Quadratic)</span>
            </div>
         </div>

         <div className={styles.statsContainer}>
            <div className={styles.statBox}>
               <span className={styles.statLabel}>Current N</span>
               <div className={styles.statValue}>{n}</div>
            </div>
            <div className={styles.statBox}>
               <span className={styles.statLabel}>Samples Recorded</span>
               <div className={styles.statValue}>{data.length}</div>
            </div>
            <div className={styles.logContainer}>
               {data.slice(-5).reverse().map((d, i) => (
                 <div key={i} className={styles.logRow}>
                    <span>n={d.n}</span>
                    <span className={styles.logT1}>{d.t1.toFixed(1)}ms</span>
                    <span className={styles.logT2}>{d.t2.toFixed(1)}ms</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </VisualStage>
  );
};
