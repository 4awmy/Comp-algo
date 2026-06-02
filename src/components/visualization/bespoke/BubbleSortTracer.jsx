import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_ARRAY = [50, 45, 33, 25, 22, 12, 11, 64];

/**
 * BubbleSortTracer - A premium, standalone visualizer for Bubble Sort.
 * Optimized for Lecture 04 (Brute Force).
 */
const BubbleSortTracer = () => {
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
      sortedFromIdx: n,
      comparingIdx: -1,
      swapped: false,
      description: "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
    });

    for (let i = 0; i < n - 1; i++) {
      let madeSwap = false;
      for (let j = 0; j < n - 1 - i; j++) {
        s.push({
          arr: [...arr],
          sortedFromIdx: n - i,
          comparingIdx: j,
          swapped: false,
          description: `Compare A[${j}] (${arr[j]}) and A[${j+1}] (${arr[j+1]}).`
        });

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          madeSwap = true;
          s.push({
            arr: [...arr],
            sortedFromIdx: n - i,
            comparingIdx: j,
            swapped: true,
            description: `Since ${arr[j+1]} > ${arr[j]}, swap them.`
          });
        }
      }
      
      s.push({
        arr: [...arr],
        sortedFromIdx: n - 1 - i,
        comparingIdx: -1,
        swapped: false,
        description: `Pass ${i + 1} complete. The element ${arr[n - 1 - i]} has 'bubbled up' to its correct position.`
      });

      if (!madeSwap) {
        s.push({
          arr: [...arr],
          sortedFromIdx: 0,
          comparingIdx: -1,
          swapped: false,
          description: "No swaps were made in this pass. The array is already sorted!"
        });
        break;
      }
    }

    s.push({
      arr: [...arr],
      sortedFromIdx: 0,
      comparingIdx: -1,
      swapped: false,
      description: "All elements have been processed. The array is fully sorted."
    });

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 600);
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
      title="Bubble Sort" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        <div className={styles.arrayContainer}>
          {step.arr.map((val, idx) => {
            let stateClass = styles.unsorted;
            if (idx >= step.sortedFromIdx) stateClass = styles.sorted;
            else if (idx === step.comparingIdx || idx === step.comparingIdx + 1) {
              stateClass = step.swapped ? styles.minimum : styles.comparing;
            }

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

export default BubbleSortTracer;
