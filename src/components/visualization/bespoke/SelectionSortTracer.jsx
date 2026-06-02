import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_ARRAY = [64, 25, 12, 22, 11, 45, 33, 50];

/**
 * SelectionSortTracer - A premium, standalone visualizer for Selection Sort.
 * Optimized for Lecture 04 (Brute Force).
 */
const SelectionSortTracer = () => {
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
      sortedIdx: -1,
      targetIdx: -1,
      comparingIdx: -1,
      minIdx: -1,
      description: "Selection Sort repeatedly finds the minimum element from the unsorted part and swaps it to the front."
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      
      s.push({
        arr: [...arr],
        sortedIdx: i - 1,
        targetIdx: i,
        comparingIdx: -1,
        minIdx: minIdx,
        description: `Iteration ${i + 1}: Assume A[${i}] (${arr[i]}) is the current minimum.`
      });

      for (let j = i + 1; j < n; j++) {
        s.push({
          arr: [...arr],
          sortedIdx: i - 1,
          targetIdx: i,
          comparingIdx: j,
          minIdx: minIdx,
          description: `Compare current minimum A[${minIdx}] (${arr[minIdx]}) with A[${j}] (${arr[j]}).`
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          s.push({
            arr: [...arr],
            sortedIdx: i - 1,
            targetIdx: i,
            comparingIdx: j,
            minIdx: minIdx,
            description: `Found a new minimum: ${arr[minIdx]} at index ${minIdx}.`
          });
        }
      }

      if (minIdx !== i) {
        s.push({
          arr: [...arr],
          sortedIdx: i - 1,
          targetIdx: i,
          comparingIdx: -1,
          minIdx: minIdx,
          description: `Swap the found minimum A[${minIdx}] (${arr[minIdx]}) with A[${i}] (${arr[i]}).`
        });
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
      } else {
        s.push({
          arr: [...arr],
          sortedIdx: i - 1,
          targetIdx: i,
          comparingIdx: -1,
          minIdx: minIdx,
          description: `A[${i}] was already the minimum. No swap needed.`
        });
      }

      s.push({
        arr: [...arr],
        sortedIdx: i,
        targetIdx: -1,
        comparingIdx: -1,
        minIdx: -1,
        description: `A[${i}] is now in its final sorted position.`
      });
    }

    s.push({
      arr: [...arr],
      sortedIdx: n - 1,
      targetIdx: -1,
      comparingIdx: -1,
      minIdx: -1,
      description: "All elements have been processed. The array is fully sorted."
    });

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 800);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
      <button 
        className="btn btn-outline btn-sm"
        onClick={() => {
          setCurrentStepIdx(0);
          setIsPlaying(false);
        }}
        disabled={currentStepIdx === 0}
      >
        Reset
      </button>
      <button 
        className="btn btn-outline btn-sm"
        onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
        disabled={currentStepIdx === 0}
      >
        Prev
      </button>
      <button 
        className="btn btn-primary btn-sm"
        onClick={() => setIsPlaying(!isPlaying)}
        style={{ minWidth: '80px' }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button 
        className="btn btn-outline btn-sm"
        onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))}
        disabled={currentStepIdx === steps.length - 1}
      >
        Next
      </button>
    </div>
  );

  return (
    <VisualStage 
      title="Selection Sort" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        <div className={styles.arrayContainer}>
          {step.arr.map((val, idx) => {
            let stateClass = styles.unsorted;
            if (idx === step.minIdx) stateClass = styles.minimum;
            else if (idx === step.targetIdx) stateClass = styles.active;
            else if (idx === step.comparingIdx) stateClass = styles.comparing;
            else if (idx <= step.sortedIdx) stateClass = styles.sorted;

            return (
              <div key={idx} className={`${styles.element} ${stateClass}`}>
                <div 
                  className={styles.bar} 
                  style={{ height: `${val * 2 + 40}px` }}
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

export default SelectionSortTracer;
