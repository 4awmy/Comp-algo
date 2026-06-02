/* eslint-disable */
import React, { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

/**
 * Visualizes the arithmetic series summation formula (n(n+1)/2) using boxes.
 */
export const StackedTriangleDemo = () => {
  const [n, setN] = useState(5);
  const total = (n * (n + 1)) / 2;

  return (
    <VisualStage 
      title="Summation Visualization"
      description={`Visualizing the sum 1 + 2 + ... + n. The total area of the triangle is n(n+1)/2 = ${total}.`}
      actions={
        <div className="flex items-center gap-4">
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={n} 
            onChange={(e) => setN(parseInt(e.target.value))}
            className="range range-xs range-primary"
          />
          <span className="text-xs font-mono text-white/60">n = {n}</span>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center p-4 min-h-[200px]">
        <div className="flex flex-col gap-1 items-center">
          {Array.from({ length: n }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {Array.from({ length: rowIndex + 1 }).map((_, colIndex) => (
                <div 
                  key={colIndex} 
                  className="w-6 h-6 rounded border border-accent-cyan bg-accent-cyan/10 flex items-center justify-center animate-in fade-in zoom-in duration-300"
                  style={{ animationDelay: `${(rowIndex * 50) + (colIndex * 20)}ms` }}
                >
                  <span className="text-[8px] text-accent-cyan opacity-40">{rowIndex + 1}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-6 text-sm font-mono text-accent-cyan">
          Total Boxes: <span className="text-white">{total}</span>
        </div>
      </div>
    </VisualStage>
  );
};

/**
 * Visualizes a call stack for T(n) building up and then returning values.
 */
export const RecursiveCallStackDemo = () => {
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
    <VisualStage 
      title="Recursive Call Stack"
      description={current.desc}
      actions={
        <div className="flex items-center gap-2">
          <button className="btn btn-xs btn-outline" onClick={() => { setStep(0); setIsPlaying(true); }}>Reset & Play</button>
          <button className="btn btn-xs btn-outline" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Resume'}</button>
          <div className="divider divider-horizontal mx-0"></div>
          <button className="btn btn-xs btn-outline" onClick={() => setStep(Math.max(0, step - 1))}>Prev</button>
          <button className="btn btn-xs btn-outline" onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>Next</button>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-end p-8 min-h-[300px] w-full relative">
        <div className="flex flex-col-reverse gap-2 w-48 border-x-2 border-b-2 border-white/10 p-2 min-h-[200px]">
          {current.stack.map((val, idx) => (
            <div 
              key={idx} 
              className={`h-10 rounded border flex items-center justify-center transition-all duration-300 ${idx === current.stack.length - 1 ? 'border-accent-cyan bg-accent-cyan/20 scale-105' : 'border-white/10 bg-white/5 opacity-40'}`}
            >
              <span className="text-xs font-mono">T({val})</span>
            </div>
          ))}
        </div>
        <div className="absolute top-10 right-10 flex flex-col gap-2 p-4 bg-white/5 rounded border border-white/10 backdrop-blur-sm">
           <span className="text-[10px] uppercase tracking-widest text-white/40">Status</span>
           <span className={`text-sm font-bold ${current.phase === 'down' ? 'text-accent-cyan' : 'text-green-400'}`}>
              {current.phase === 'down' ? 'Descending (Winding)' : 'Returning (Unwinding)'}
           </span>
           {current.phase === 'up' && (
             <div className="mt-2 text-xs">
                Result: <span className="text-white font-mono">{current.result}</span>
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
export const HalvingBarChartDemo = () => {
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
    <VisualStage 
      title="Logarithmic Halving"
      description="Visualizing O(log n) where the problem size halves at each step."
      actions={
        <div className="flex items-center gap-4">
          <button className="btn btn-xs btn-outline" onClick={() => setInitialSize(128)}>128</button>
          <button className="btn btn-xs btn-outline" onClick={() => setInitialSize(256)}>256</button>
          <button className="btn btn-xs btn-outline" onClick={() => setInitialSize(512)}>512</button>
        </div>
      }
    >
      <div className="flex items-end justify-center gap-2 p-8 min-h-[200px] w-full">
        {points.map((val, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
             <div 
               className="w-8 bg-accent-cyan/20 border-t-2 border-accent-cyan transition-all duration-500" 
               style={{ height: `${(val / initialSize) * 150}px` }}
             ></div>
             <span className="text-[10px] font-mono opacity-60">{Math.round(val)}</span>
             <span className="text-[8px] text-white/20">Step {idx}</span>
          </div>
        ))}
      </div>
    </VisualStage>
  );
};

/**
 * A mock "Scientific Experiment Lab" showing a race between two algorithms.
 */
export const EmpiricalDashboardDemo = () => {
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
    <VisualStage 
      title="Empirical Measurement Lab"
      description="Observe how hardware latency and noise affect real-world execution time compared to asymptotic curves."
      actions={
        <div className="flex items-center gap-2">
           <button 
             className={`btn btn-xs ${isRunning ? 'btn-error' : 'btn-primary'}`} 
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-full h-full">
         <div className="col-span-2 relative h-48 border border-white/10 rounded bg-black/20 p-2">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               {/* Grid */}
               <line x1="0" y1="25" x2="100" y2="25" stroke="white" strokeWidth="0.1" opacity="0.1" />
               <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.1" opacity="0.1" />
               <line x1="0" y1="75" x2="100" y2="75" stroke="white" strokeWidth="0.1" opacity="0.1" />
               
               {/* Alg 1: O(n) */}
               <polyline 
                 points={data.map(d => `${d.n * 2},${100 - d.t1}`).join(' ')}
                 fill="none" stroke="#60a5fa" strokeWidth="1"
               />
               {/* Alg 2: O(n^2) */}
               <polyline 
                 points={data.map(d => `${d.n * 2},${100 - d.t2}`).join(' ')}
                 fill="none" stroke="#f472b6" strokeWidth="1"
               />
            </svg>
            <div className="absolute top-2 right-2 flex flex-col gap-1 text-[8px] font-bold">
               <span className="text-blue-400">--- Algorithm A (Linear)</span>
               <span className="text-pink-400">--- Algorithm B (Quadratic)</span>
            </div>
         </div>

         <div className="flex flex-col gap-2">
            <div className="p-3 rounded bg-white/5 border border-white/10">
               <span className="text-[10px] text-white/40 uppercase">Current N</span>
               <div className="text-xl font-mono text-white">{n}</div>
            </div>
            <div className="p-3 rounded bg-white/5 border border-white/10">
               <span className="text-[10px] text-white/40 uppercase">Samples Recorded</span>
               <div className="text-xl font-mono text-white">{data.length}</div>
            </div>
            <div className="flex-1 p-2 overflow-y-auto max-h-24 bg-black/40 rounded border border-white/5 font-mono text-[8px]">
               {data.slice(-5).reverse().map((d, i) => (
                 <div key={i} className="flex justify-between border-b border-white/5 py-1">
                    <span>n={d.n}</span>
                    <span className="text-blue-400">{d.t1.toFixed(1)}ms</span>
                    <span className="text-pink-400">{d.t2.toFixed(1)}ms</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </VisualStage>
  );
};
