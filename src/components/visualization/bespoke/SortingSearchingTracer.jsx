/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const SortingSearchingTracer = () => {
  const [algo, setAlgo] = useState('BubbleSort'); // 'BubbleSort' | 'LinearSearch'
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => {
    const s = [];
    if (algo === 'BubbleSort') {
      let arr = [6, 3, 0, 5, 1];
      const n = arr.length;
      s.push({ arr: [...arr], comparing: [], sorted: [], desc: "Initial array: [6, 3, 0, 5, 1]. Starting Bubble Sort." });

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          s.push({ 
            arr: [...arr], 
            comparing: [j, j + 1], 
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
            desc: `Comparing A[${j}](${arr[j]}) and A[${j+1}](${arr[j+1]})` 
          });
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            s.push({ 
              arr: [...arr], 
              comparing: [j, j + 1], 
              sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
              desc: `Swap! ${arr[j+1]} is greater than ${arr[j]}.` 
            });
          }
        }
      }
      s.push({ arr: [...arr], comparing: [], sorted: [0, 1, 2, 3, 4], desc: "Array sorted!" });
    } else {
      // Linear Search
      const arr = [12, 45, 33, 7, 21, 9];
      const target = 33;
      s.push({ arr: [...arr], active: -1, desc: `Searching for key: ${target} in [${arr.join(', ')}]` });
      for (let i = 0; i < arr.length; i++) {
        s.push({ arr: [...arr], active: i, desc: `Checking index ${i}: ${arr[i]} == ${target}?` });
        if (arr[i] === target) {
          s.push({ arr: [...arr], active: i, found: true, desc: `Match found at index ${i}!` });
          break;
        }
      }
    }
    return s;
  }, [algo]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => setCurrentStepIdx(i => i + 1), 800);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const current = steps[currentStepIdx] || steps[0];

  return (
    <VisualStage 
      title={algo === 'BubbleSort' ? 'Bubble Sort Stepper' : 'Linear Search Stepper'}
      description={current.desc}
      actions={
        <div className={styles.tracerActions}>
          <div className="flex gap-1">
            <button className={`btn btn-xs ${algo === 'BubbleSort' ? 'btn-primary' : 'btn-outline'}`} onClick={() => {setAlgo('BubbleSort'); setCurrentStepIdx(0);}}>Bubble Sort</button>
            <button className={`btn btn-xs ${algo === 'LinearSearch' ? 'btn-primary' : 'btn-outline'}`} onClick={() => {setAlgo('LinearSearch'); setCurrentStepIdx(0);}}>Linear Search</button>
          </div>
          <div className={styles.stepControls}>
            <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}>Prev</button>
            <button className="btn btn-primary btn-sm" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(Math.min(steps.length - 1, currentStepIdx + 1))}>Next</button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-8 w-full p-4">
        <div className="flex gap-4">
          {current.arr.map((val, idx) => {
            let color = "var(--bg-surface)";
            let border = "var(--border-subtle)";
            if (current.comparing?.includes(idx)) { border = "var(--accent-cyan)"; color = "rgba(6, 182, 212, 0.1)"; }
            if (current.active === idx) { border = "var(--accent-yellow)"; color = "rgba(234, 179, 8, 0.1)"; }
            if (current.sorted?.includes(idx) || current.found && current.active === idx) { border = "var(--color-success)"; color = "rgba(16, 185, 129, 0.1)"; }

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold text-lg transition-all duration-300"
                  style={{ background: color, borderColor: border }}
                >
                  {val}
                </div>
                <span className="text-[10px] text-muted-foreground">i={idx}</span>
              </div>
            );
          })}
        </div>
      </div>
    </VisualStage>
  );
};

export default SortingSearchingTracer;
