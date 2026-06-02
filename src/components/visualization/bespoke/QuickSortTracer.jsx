import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_ARRAY = [38, 27, 43, 3, 9, 82, 10];

/**
 * QuickSortTracer - Highlighting the pivot and left/right scans.
 */
const QuickSortTracer = () => {
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

    // Trace Hoare-like partition for [38, 27, 43, 3, 9, 82, 10]
    // Pivot = arr[0] = 38
    record(arr, 0, -1, -1, "Quick Sort: We pick the first element (38) as the pivot.");

    let i = 1;
    let j = arr.length - 1;

    record(arr, 0, i, j, `Start partitioning. Left pointer (i) at index ${i}, Right pointer (j) at index ${j}.`);

    // Move i
    // i=1: 27 < 38 (ok)
    // i=2: 43 > 38 (stop)
    i = 2;
    record(arr, 0, i, j, `Increment i until arr[i] > pivot. arr[2] (43) > 38, so i stops here.`);

    // Move j
    // j=6: 10 < 38 (stop)
    j = 6;
    record(arr, 0, i, j, `Decrement j until arr[j] < pivot. arr[6] (10) < 38, so j stops here.`);

    // Swap i and j
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    record(arr, 0, i, j, `Swap arr[i] (43) and arr[j] (10) because i < j.`);

    // Continue
    // i=3: 3 < 38 (ok)
    // i=4: 9 < 38 (ok)
    // i=5: 82 > 38 (stop)
    i = 5;
    record(arr, 0, i, j, `Increment i again. arr[5] (82) > 38, so i stops.`);

    // j=5: 82 > 38 (ok)
    // j=4: 9 < 38 (stop)
    j = 4;
    record(arr, 0, i, j, `Decrement j again. arr[4] (9) < 38, so j stops.`);

    record(arr, 0, i, j, `Now i > j, so pointers have crossed. We swap pivot with arr[j].`);

    // Swap pivot with j
    temp = arr[0];
    arr[0] = arr[j];
    arr[j] = temp;
    record(arr, j, -1, -1, `Pivot (38) is now in its final sorted position at index ${j}.`);

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1500);
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
        onClick={() => {
          setCurrentStepIdx(prev => Math.max(0, prev - 1));
          setIsPlaying(false);
        }}
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
    <VisualStage 
      title="Quick Sort Partitioning" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        <div className={styles.arrayContainer}>
          {step.arr.map((val, idx) => {
            let stateClass = styles.unsorted;
            if (idx === step.pivotIdx) stateClass = styles.active;
            else if (idx === step.left) stateClass = styles.comparing;
            else if (idx === step.right) stateClass = styles.comparing;

            return (
              <div key={idx} className={`${styles.element} ${stateClass}`}>
                <div 
                  className={styles.bar} 
                  style={{ height: `${val * 1.5 + 40}px` }}
                >
                  {val}
                </div>
                <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
                    <span className={styles.label}>A[{idx}]</span>
                    {idx === step.left && (
                        <div style={{ position: 'absolute', top: '15px', left: '0', width: '100%', color: 'var(--accent-purple)', fontWeight: 'bold' }}>i</div>
                    )}
                    {idx === step.right && (
                        <div style={{ position: 'absolute', top: '15px', left: '0', width: '100%', color: 'var(--accent-purple)', fontWeight: 'bold' }}>j</div>
                    )}
                    {idx === step.pivotIdx && (
                         <div style={{ position: 'absolute', top: '15px', left: '0', width: '100%', color: 'var(--accent-blue)', fontWeight: 'bold', fontSize: '10px' }}>Pivot</div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.stepInfo} style={{ marginTop: '20px' }}>
          <span className={styles.label}>Step {currentStepIdx + 1} of {steps.length}</span>
        </div>
      </div>
    </VisualStage>
  );
};

export default QuickSortTracer;
