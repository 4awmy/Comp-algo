import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_ARRAY = [45, 23, 89, 12, 56, 34, 78, 67];

/**
 * InsertionSortTracer - A premium, standalone visualizer for Insertion Sort.
 * Optimized for Lecture 06 (Decrease-and-Conquer).
 */
const InsertionSortTracer = ({ style }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Pre-generate steps for smooth scrubbing
  const steps = useMemo(() => {
    const s = [];
    const arr = [...INITIAL_ARRAY];
    const n = arr.length;

    // Initial state
    s.push({
      arr: [...arr],
      sortedIdx: 0,
      activeIdx: -1,
      comparingIdx: -1,
      description: "Insertion Sort treats the first element as a sorted sub-array of size 1."
    });

    for (let i = 1; i < n; i++) {
      let v = arr[i];
      let j = i - 1;

      s.push({
        arr: [...arr],
        sortedIdx: i - 1,
        activeIdx: i,
        comparingIdx: -1,
        description: `Decrease phase: Pick A[${i}] (${v}) to insert into the sorted portion.`
      });

      while (j >= 0 && arr[j] > v) {
        s.push({
          arr: [...arr],
          sortedIdx: i - 1,
          activeIdx: j + 1,
          comparingIdx: j,
          description: `Compare ${v} with A[${j}] (${arr[j]}). Since ${arr[j]} > ${v}, shift ${arr[j]} right.`
        });
        
        arr[j + 1] = arr[j];
        j = j - 1;
      }

      arr[j + 1] = v;
      s.push({
        arr: [...arr],
        sortedIdx: i,
        activeIdx: j + 1,
        comparingIdx: -1,
        description: `Conquer phase: Place ${v} in its correct relative position.`
      });
    }

    s.push({
      arr: [...arr],
      sortedIdx: n - 1,
      activeIdx: -1,
      comparingIdx: -1,
      description: "All elements have been processed. The array is fully sorted."
    });

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
      <button 
        className={`${styles.btnOutline} ${styles.btnSm}`}
        onClick={() => {
          setCurrentStepIdx(0);
          setIsPlaying(false);
        }}
        disabled={currentStepIdx === 0}
      >
        Reset
      </button>
      <button 
        className={`${styles.btnOutline} ${styles.btnSm}`}
        onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
        disabled={currentStepIdx === 0}
      >
        Prev
      </button>
      <button 
        className={`${styles.btnPrimary} ${styles.btnSm}`}
        onClick={() => setIsPlaying(!isPlaying)}
        style={{ minWidth: '80px' }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button 
        className={`${styles.btnOutline} ${styles.btnSm}`}
        onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))}
        disabled={currentStepIdx === steps.length - 1}
      >
        Next
      </button>
    </div>
  );

  return (
    <VisualStage style={style} 
      title="Insertion Sort" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        <div className={styles.arrayContainer}>
          {step.arr.map((val, idx) => {
            let stateClass = styles.unsorted;
            if (idx === step.activeIdx) stateClass = styles.barActive;
            else if (idx === step.comparingIdx) stateClass = styles.barComparing;
            else if (idx <= step.sortedIdx) stateClass = styles.sorted;

            return (
              <div key={idx} className={`${styles.element} ${stateClass}`}>
                <div 
                  className={styles.bar} 
                  style={{ height: `${val * 1.5 + 40}px` }}
                >
                  {val}
                </div>
                <span className={styles.label}>A[{idx}]</span>
              </div>
            );
          })}
        </div>
        
        <div className={styles.stepInfo}>
          <span className={styles.label}>Step {currentStepIdx + 1} of {steps.length}</span>
        </div>
      </div>
    </VisualStage>
  );
};

export default InsertionSortTracer;
