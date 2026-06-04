import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './SharedTracers.module.css';

const INITIAL_ARRAY = [38, 27, 43, 3, 9, 82, 10];

/**
 * QuickSortTracer - Standardized with shared styles and granular steps.
 */
const QuickSortTracer = ({ style }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => {
    const s = [];
    const arr = [...INITIAL_ARRAY];

    const record = (a, pivotIdx, left, right, description) => {
      s.push({
        arr: [...a],
        pivotIdx,
        left,
        right,
        description
      });
    };

    // 1. Initial State
    record(arr, -1, -1, -1, "Quick Sort: Partitioning the array around a pivot.");

    // 2. Pick Pivot
    const pivotVal = arr[0];
    record(arr, 0, -1, -1, `We pick the first element (${pivotVal}) as the pivot.`);

    // 3. Initialize Pointers
    let i = 1;
    let j = arr.length - 1;
    record(arr, 0, i, j, `Initialize i to 1 and j to n-1 (${j}).`);

    // 4. Partition Loop
    while (true) {
      // Find element > pivot from left
      while (i < arr.length && arr[i] <= pivotVal) {
        record(arr, 0, i, j, `A[${i}] (${arr[i]}) ≤ pivot (${pivotVal}), incrementing i.`);
        i++;
      }
      if (i < arr.length) {
        record(arr, 0, i, j, `A[${i}] (${arr[i]}) > pivot (${pivotVal}), i stops.`);
      } else {
        record(arr, 0, i - 1, j, `i reached the end of the array.`);
      }

      // Find element < pivot from right
      while (j >= 0 && arr[j] > pivotVal) {
        record(arr, 0, i < arr.length ? i : i - 1, j, `A[${j}] (${arr[j]}) > pivot (${pivotVal}), decrementing j.`);
        j--;
      }
      record(arr, 0, i < arr.length ? i : i - 1, j, `A[${j}] (${arr[j]}) ≤ pivot (${pivotVal}), j stops.`);

      if (i < j) {
        record(arr, 0, i, j, `Since i < j, we swap A[${i}] (${arr[i]}) and A[${j}] (${arr[j]}).`);
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        record(arr, 0, i, j, `Swap complete.`);
      } else {
        record(arr, 0, i, j, `Pointers have crossed (i ≥ j). Partition loop terminates.`);
        break;
      }
    }

    // 5. Final Swap
    record(arr, 0, -1, j, `Finally, swap pivot A[0] (${arr[0]}) with A[j] (${arr[j]}).`);
    const temp = arr[0];
    arr[0] = arr[j];
    arr[j] = temp;
    record(arr, j, -1, -1, `Pivot is now at its final sorted position (index ${j}). Elements to the left are ≤ pivot, elements to the right are > pivot.`);

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1200);
    } else if (currentStepIdx === steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
      <button 
        className={styles.controlBtn}
        onClick={() => {
          setCurrentStepIdx(0);
          setIsPlaying(false);
        }}
        disabled={currentStepIdx === 0}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 4v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2z"/>
          <path d="M8 12h8"/><path d="M12 8l-4 4 4 4"/>
        </svg>
        Reset
      </button>
      <button 
        className={styles.controlBtn}
        onClick={() => {
          setCurrentStepIdx(prev => Math.max(0, prev - 1));
          setIsPlaying(false);
        }}
        disabled={currentStepIdx === 0}
      >
        Prev
      </button>
      <button 
        className={`${styles.controlBtn} btn-primary`}
        onClick={() => setIsPlaying(!isPlaying)}
        style={{ minWidth: '100px' }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button 
        className={styles.controlBtn}
        onClick={() => {
          setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1));
          setIsPlaying(false);
        }}
        disabled={currentStepIdx === steps.length - 1}
      >
        Next
      </button>
    </div>
  );

  return (
    <VisualStage style={style} 
      title="Quick Sort: Hoare Partitioning" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        <div className={styles.arrayContainer}>
          {step.arr.map((val, idx) => {
            let stateClass = '';
            if (idx === step.pivotIdx) stateClass = styles.barPivot;
            else if (idx === step.left || idx === step.right) stateClass = styles.barActive;
            
            // If pointers cross and loop ends, mark pivot swap candidate
            if (currentStepIdx === steps.length - 2 && (idx === 0 || idx === step.right)) {
               stateClass = styles.barComparing;
            }

            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div 
                  className={`${styles.bar} ${stateClass}`} 
                  style={{ height: `${val * 1.5 + 40}px` }}
                >
                  {val}
                </div>
                <div style={{ position: 'relative', width: '30px', textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    <span>{idx}</span>
                    <div style={{ position: 'absolute', top: '15px', left: '0', width: '100%', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {idx === step.left && (
                            <span style={{ color: 'var(--accent-purple)', fontWeight: 'bold' }}>i</span>
                        )}
                        {idx === step.right && (
                            <span style={{ color: 'var(--accent-purple)', fontWeight: 'bold' }}>j</span>
                        )}
                        {idx === step.pivotIdx && (
                             <span style={{ color: 'var(--accent-red)', fontWeight: 'bold', fontSize: '9px' }}>P</span>
                        )}
                    </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.stepInfo}>
          Step {currentStepIdx + 1} of {steps.length}
        </div>
      </div>
    </VisualStage>
  );
};

export default QuickSortTracer;
