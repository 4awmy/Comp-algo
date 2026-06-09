import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_ARRAY = [38, 27, 43, 3, 9, 82, 10];
const CODE_LINES = [
  'QuickSort(A, l, r)',
  'if l >= r return',
  'p <- Partition(A, l, r)',
  'QuickSort(A, l, p - 1)',
  'QuickSort(A, p + 1, r)',
  'Partition: pivot <- A[l]',
  'scan i right while A[i] <= pivot',
  'scan j left while A[j] > pivot',
  'if i < j swap A[i], A[j]',
  'swap pivot with A[j]'
];

const QuickSortTracer = ({ style }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => {
    const s = [];
    const arr = [...INITIAL_ARRAY];

    const record = (a, pivotIdx, left, right, description, line) => {
      s.push({
        arr: [...a],
        pivotIdx,
        left,
        right,
        description,
        line
      });
    };

    record(arr, -1, -1, -1, 'Quick Sort begins by partitioning the current subarray around a pivot.', 0);

    const pivotVal = arr[0];
    record(arr, 0, -1, -1, `Choose the first element (${pivotVal}) as the pivot.`, 5);

    let i = 1;
    let j = arr.length - 1;
    record(arr, 0, i, j, `Initialize i to 1 and j to ${j}.`, 2);

    while (true) {
      while (i < arr.length && arr[i] <= pivotVal) {
        record(arr, 0, i, j, `A[${i}] (${arr[i]}) <= pivot (${pivotVal}), so i moves right.`, 6);
        i += 1;
      }

      if (i < arr.length) {
        record(arr, 0, i, j, `A[${i}] (${arr[i]}) > pivot (${pivotVal}), so i stops.`, 6);
      } else {
        record(arr, 0, i - 1, j, 'i reached the end of the array.', 6);
      }

      while (j >= 0 && arr[j] > pivotVal) {
        record(arr, 0, i < arr.length ? i : i - 1, j, `A[${j}] (${arr[j]}) > pivot (${pivotVal}), so j moves left.`, 7);
        j -= 1;
      }

      record(arr, 0, i < arr.length ? i : i - 1, j, `A[${j}] (${arr[j]}) <= pivot (${pivotVal}), so j stops.`, 7);

      if (i < j) {
        record(arr, 0, i, j, `Since i < j, swap A[${i}] (${arr[i]}) and A[${j}] (${arr[j]}).`, 8);
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        record(arr, 0, i, j, 'Swap complete.', 8);
      } else {
        record(arr, 0, i, j, 'The pointers crossed, so partitioning is ready for the final pivot swap.', 2);
        break;
      }
    }

    record(arr, 0, -1, j, `Swap pivot A[0] (${arr[0]}) with A[j] (${arr[j]}).`, 9);
    const temp = arr[0];
    arr[0] = arr[j];
    arr[j] = temp;
    record(arr, j, -1, -1, `Pivot ${pivotVal} is now in final position ${j}.`, 3);

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => {
          if (prev >= steps.length - 2) {
            setIsPlaying(false);
          }
          return Math.min(steps.length - 1, prev + 1);
        });
      }, 1200);
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
        className={styles.controlBtn}
        onClick={() => setIsPlaying(!isPlaying)}
        style={{ minWidth: '90px' }}
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
    <VisualStage
      style={style}
      title="Quick Sort: Hoare Partitioning"
      description={step.description}
      actions={actions}
    >
      <div className={styles.dualPane}>
        <div className={styles.codePane}>
          <div className={styles.codeHeader}>Pseudocode</div>
          {CODE_LINES.map((line, idx) => (
            <span key={line} className={`${styles.codeLine} ${step.line === idx ? styles.codeLineActive : ''}`}>
              {line}
            </span>
          ))}
        </div>

        <div className={styles.vizPane} style={{ minHeight: '320px', flexDirection: 'column', gap: '1rem' }}>
          <div className={styles.arrayContainer}>
            {step.arr.map((val, idx) => {
              let stateClass = '';
              if (idx === step.pivotIdx) stateClass = styles.barPivot;
              else if (idx === step.left || idx === step.right) stateClass = styles.barActive;

              if (currentStepIdx === steps.length - 2 && (idx === 0 || idx === step.right)) {
                stateClass = styles.barComparing;
              }

              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div className={`${styles.bar} ${stateClass}`} style={{ height: `${val * 1.5 + 40}px` }}>
                    {val}
                  </div>
                  <div className={styles.pointerLabel}>
                    <span>{idx}</span>
                    <div className={styles.pointerIndices}>
                      {idx === step.left && (
                        <span className={styles.pointerI}>i</span>
                      )}
                      {idx === step.right && (
                        <span className={styles.pointerJ}>j</span>
                      )}
                      {idx === step.pivotIdx && (
                        <span className={styles.pointerP}>P</span>
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
      </div>
    </VisualStage>
  );
};

export default QuickSortTracer;
